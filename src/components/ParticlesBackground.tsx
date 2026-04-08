import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

interface ParticlesBackgroundProps {
  particleColor?: string;
}

export default function ParticlesBackground({ particleColor = '#ffffff' }: ParticlesBackgroundProps) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const { Engine, Render, World, Bodies, Runner, Events, Common } = Matter;

    const engine = Engine.create();
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    const width = sceneRef.current.offsetWidth || window.innerWidth;
    const height = sceneRef.current.offsetHeight || window.innerHeight;

    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
      },
    });

    const stars: Matter.Body[] = [];
    const starCount = 250;

    for (let i = 0; i < starCount; i++) {
      const x = Common.random(0, width);
      const y = Common.random(0, height);
      const size = Common.random(0.5, 3);

      const star = Bodies.circle(x, y, size, {
        isSensor: true,
        frictionAir: 0,
        render: { fillStyle: particleColor, opacity: 0 },
      });

      // @ts-ignore
      star.plugin = {
        baseSpeed: Common.random(0.2, 0.8),
        randomOffset: Math.random(),
      };

      stars.push(star);
    }

    World.add(engine.world, stars);

    Events.on(engine, 'beforeUpdate', () => {
      const centerX = width / 2;
      const centerY = height / 2;
      const maxDist = Math.max(width, height) / 2;

      stars.forEach((star) => {
        const dx = star.position.x - centerX;
        const dy = star.position.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const dirX = dx / dist || 0;
        const dirY = dy / dist || 0;

        // @ts-ignore
        const speed = star.plugin.baseSpeed + dist * 0.0015;
        Matter.Body.setPosition(star, {
          x: star.position.x + dirX * speed,
          y: star.position.y + dirY * speed,
        });

        let opacity = 0;
        if (dist < 150) opacity = dist / 150;
        else opacity = 1;
        if (dist > maxDist - 50) opacity = Math.max(0, (maxDist - dist) / 50);

        // @ts-ignore
        star.render.opacity = opacity * (0.3 + star.plugin.randomOffset * 0.7);

        if (
          star.position.x < -50 ||
          star.position.x > width + 50 ||
          star.position.y < -50 ||
          star.position.y > height + 50
        ) {
          Matter.Body.setPosition(star, {
            x: centerX + (Math.random() - 0.5) * 20,
            y: centerY + (Math.random() - 0.5) * 20,
          });
        }
      });
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
      if (render.canvas && render.canvas.parentNode) {
        render.canvas.parentNode.removeChild(render.canvas);
      }
    };
  }, [particleColor]);

  return (
    <div
      ref={sceneRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
