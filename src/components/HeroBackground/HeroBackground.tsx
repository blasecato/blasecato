import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const HeroBackground = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Runner = Matter.Runner;
    const Events = Matter.Events;
    const Common = Matter.Common;

    // 1. Configuración del Motor
    const engine = Engine.create();
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio
      }
    });

    // 2. Crear las "Estrellas" (Más cantidad pero más sutiles)
    const stars: Matter.Body[] = [];
    const starCount = 250;

    for (let i = 0; i < starCount; i++) {
      const x = Common.random(0, width);
      const y = Common.random(0, height);

      // Tamaños muy variados: Polvo estelar (0.5px) hasta estrellas lejanas (3px)
      const size = Common.random(0.5, 3);

      const star = Bodies.circle(x, y, size, {
        isSensor: true, // Fantasmas (no chocan)
        frictionAir: 0,
        render: {
          fillStyle: '#ffffff',
          opacity: 0 // Empiezan invisibles (se calcula en el loop)
        }
      });

      // @ts-ignore: Guardamos velocidad personalizada
      star.plugin = {
        baseSpeed: Common.random(0.2, 0.8), // Velocidad MUY lenta base
        randomOffset: Math.random() // Para dar variedad al movimiento
      };

      stars.push(star);
    }

    World.add(engine.world, stars);

    // 3. Loop de Animación "Suave"
    Events.on(engine, 'beforeUpdate', () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const maxDist = Math.max(width, height) / 2; // Distancia máxima al borde

      stars.forEach((star) => {
        const dx = star.position.x - centerX;
        const dy = star.position.y - centerY;

        // Distancia actual al centro
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Dirección normalizada
        const dirX = dx / dist || 0;
        const dirY = dy / dist || 0;

        // --- MAGIA DE LA SUAVIDAD ---

        // 1. Velocidad: Aumenta MUY poco con la distancia. 
        // Antes era * 0.02, ahora es * 0.001 (20 veces más suave)
        // @ts-ignore
        const speed = star.plugin.baseSpeed + (dist * 0.0015);

        Matter.Body.setPosition(star, {
          x: star.position.x + dirX * speed,
          y: star.position.y + dirY * speed
        });

        // 2. Opacidad Dinámica (Fade In / Fade Out)
        // Cerca del centro (0px a 150px): Transparente -> Visible
        // Esto evita que veas puntos "nacer" de la nada bruscamente.
        let opacity = 0;
        if (dist < 150) {
          opacity = dist / 150; // Fade In suave
        } else {
          opacity = 1; // Totalmente visible
        }

        // Opcional: Fade out al llegar a los bordes extremos para que no desaparezcan de golpe
        if (dist > maxDist - 50) {
          opacity = Math.max(0, (maxDist - dist) / 50);
        }

        // Aplicar opacidad (con un tope aleatorio para que algunas brillen menos)
        // @ts-ignore
        star.render.opacity = opacity * (0.3 + star.plugin.randomOffset * 0.7);

        // 3. Respawn (Reinicio)
        if (
          star.position.x < -50 ||
          star.position.x > window.innerWidth + 50 ||
          star.position.y < -50 ||
          star.position.y > window.innerHeight + 50
        ) {
          // Reiniciar cerca del centro (zona aleatoria pequeña)
          Matter.Body.setPosition(star, {
            x: centerX + (Math.random() - 0.5) * 20,
            y: centerY + (Math.random() - 0.5) * 20
          });
        }
      });
    });

    // 4. Iniciar
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) render.canvas.remove();
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#000' }}>
      <div ref={sceneRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />

      <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 200, color: '#ffffff', letterSpacing: '10px', textTransform: 'uppercase' }}>
          SEBASTIAN CALDERON
        </h1>
        <p style={{ fontSize: '1rem', color: '#64748b', letterSpacing: '2px', marginTop: '10px' }}>
          @Blasecato
        </p>
      </div>
    </div>
  );
};

export default HeroBackground;