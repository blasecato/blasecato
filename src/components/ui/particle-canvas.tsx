import { useEffect, useRef, useState } from 'react';

const vertexShader = `
  attribute vec2 a_position;
  uniform vec2 u_resolution;
  attribute vec2 a_color;
  varying vec2 v_color;
  void main(){
    gl_Position = vec4( vec2( 1, -1 ) * ( ( a_position / u_resolution ) * 2.0 - 1.0 ), 0, 1 );
    v_color = a_color;
  }
`;

const fragmentShader = `
  precision mediump float;
  varying vec2 v_color;
  uniform float u_tick;
  float frac = 1.0/6.0;
  void main(){
    float hue = v_color.x + u_tick;
    hue = abs(hue - floor(hue));
    vec4 color = vec4( 0, 0, 0, 1 );
    if( hue < frac ){
      color.r = 1.0; color.g = hue / frac; color.b = 0.0;
    } else if( hue < frac * 2.0 ){
      color.r = 1.0 - ( hue - frac ) / frac; color.g = 1.0; color.b = 0.0;
    } else if( hue < frac * 3.0 ){
      color.r = 0.0; color.g = 1.0; color.b = ( hue - frac * 2.0 ) / frac;
    } else if( hue < frac * 4.0 ){
      color.r = 0.0; color.g = 1.0 - ( hue - frac * 3.0 ) / frac; color.b = 1.0;
    } else if( hue < frac * 5.0 ){
      color.r = ( hue - frac * 4.0 ) / frac; color.g = 0.0; color.b = 1.0;
    } else {
      color.r = 1.0; color.g = 0.0; color.b = 1.0 - ( hue - frac * 5.0 ) / frac;
    }
    color = vec4( color.rgb * v_color.y, 1.0 );
    gl_FragColor = color;
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  return program;
}

interface ParticleCanvasProps {
  maxParticles?: number;
  particleSizeMin?: number;
  particleSizeMax?: number;
  speedScale?: number;
}

export function ParticleCanvas({
  maxParticles = 1000,
  particleSizeMin = 2,
  particleSizeMax = 5,
  speedScale = 2,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true });
    if (!gl) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const dims = { width: w, height: h, cx: w / 2, cy: h / 2 };

    const program = createProgram(
      gl,
      createShader(gl, gl.VERTEX_SHADER, vertexShader),
      createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)
    );

    const attribs = {
      position: gl.getAttribLocation(program, 'a_position'),
      color: gl.getAttribLocation(program, 'a_color'),
    };
    const uniforms = {
      resolution: gl.getUniformLocation(program, 'u_resolution')!,
      tick: gl.getUniformLocation(program, 'u_tick')!,
    };
    const buffers = {
      position: gl.createBuffer()!,
      color: gl.createBuffer()!,
    };

    gl.viewport(0, 0, w, h);
    gl.useProgram(program);
    gl.enableVertexAttribArray(attribs.position);
    gl.enableVertexAttribArray(attribs.color);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(attribs.position, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(attribs.color, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(uniforms.resolution, w, h);
    gl.clearColor(0, 0, 0, 0);

    const data = { triangles: [] as number[], colors: [] as number[] };

    function getCircleTriangles(x: number, y: number, r: number) {
      const tris: number[] = [];
      const inc = (Math.PI * 2) / 6;
      let px = x + r, py = y;
      for (let i = 0; i <= Math.PI * 2 + inc; i += inc) {
        const nx = x + r * Math.cos(i);
        const ny = y + r * Math.sin(i);
        tris.push(x, y, px, py, nx, ny);
        px = nx; py = ny;
      }
      return tris;
    }

    interface IParticle {
      x: number; y: number; vx: number; vy: number;
      size: number; time: number;
      reset(): void; step(): void;
    }

    function makeParticle(): IParticle {
      const p: IParticle = {
        x: 0, y: 0, vx: 0, vy: 0, size: 0, time: 1,
        reset() {
          this.size = particleSizeMin + (particleSizeMax - particleSizeMin) * Math.random();
          this.x = dims.cx;
          this.y = dims.cy;
          this.vx = (Math.random() - 0.5) * 2 * speedScale;
          this.vy = -2 - speedScale * Math.random();
          this.time = 1;
        },
        step() {
          this.x += (this.vx *= 0.995);
          this.y += (this.vy += 0.05);
          this.time *= 0.99;
          const tris = getCircleTriangles(this.x, this.y, this.size * this.time);
          const hue = this.vy / 10;
          for (let i = 0; i < tris.length; i += 2) {
            data.triangles.push(tris[i], tris[i + 1]);
            data.colors.push(hue, this.time);
          }
          if (this.y - this.size > dims.height) this.reset();
        },
      };
      p.reset();
      return p;
    }

    const particles: IParticle[] = [];
    let tick = 0;
    let rafId: number;

    function draw() {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.triangles), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.colors), gl.STATIC_DRAW);
      gl.drawArrays(gl.TRIANGLES, 0, data.triangles.length / 2);
    }

    function animate() {
      if (!isAnimating) return;
      gl.clear(gl.COLOR_BUFFER_BIT);
      data.triangles = [];
      data.colors = [];
      tick++;
      if (particles.length < maxParticles) {
        particles.push(makeParticle(), makeParticle());
      }
      particles.sort((a, b) => a.time - b.time);
      particles.forEach((p) => p.step());
      gl.uniform1f(uniforms.tick, tick / 100);
      draw();
      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);

    const onMouseMove = (e: MouseEvent) => {
      dims.cx = e.clientX;
      dims.cy = e.clientY;
    };

    const onResize = () => {
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      canvas.width = nw;
      canvas.height = nh;
      dims.width = nw;
      dims.height = nh;
      gl.viewport(0, 0, nw, nh);
      gl.uniform2f(uniforms.resolution, nw, nh);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, [isAnimating, maxParticles, particleSizeMin, particleSizeMax, speedScale]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
