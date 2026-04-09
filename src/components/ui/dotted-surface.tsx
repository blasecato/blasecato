import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
    const { theme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const animationIdRef = useRef<number>(0);
    const countRef = useRef<number>(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const SEPARATION = 150;
        const AMOUNTX = 40;
        const AMOUNTY = 60;

        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(60, w / h, 1, 10000);
        camera.position.set(0, 355, 1220);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(w, h);
        container.appendChild(renderer.domElement);

        // Colors in 0-1 range for Three.js
        const dotColor = theme === 'dark' ? 0.8 : 0.0;

        const positions: number[] = [];
        const colors: number[] = [];

        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                positions.push(
                    ix * SEPARATION - (AMOUNTX * SEPARATION) / 2,
                    0,
                    iy * SEPARATION - (AMOUNTY * SEPARATION) / 2,
                );
                colors.push(dotColor, dotColor, dotColor);
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 8,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
        });

        scene.add(new THREE.Points(geometry, material));

        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);

            const attr = geometry.attributes.position;
            const pos = attr.array as Float32Array;

            let i = 0;
            for (let ix = 0; ix < AMOUNTX; ix++) {
                for (let iy = 0; iy < AMOUNTY; iy++) {
                    pos[i * 3 + 1] =
                        Math.sin((ix + countRef.current) * 0.3) * 50 +
                        Math.sin((iy + countRef.current) * 0.5) * 50;
                    i++;
                }
            }

            attr.needsUpdate = true;
            renderer.render(scene, camera);
            countRef.current += 0.1;
        };

        animate();

        const handleResize = () => {
            const cw = container.clientWidth || window.innerWidth;
            const ch = container.clientHeight || window.innerHeight;
            camera.aspect = cw / ch;
            camera.updateProjectionMatrix();
            renderer.setSize(cw, ch);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationIdRef.current);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            if (renderer.domElement.parentNode === container) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [theme]);

    return (
        <div
            ref={containerRef}
            className={cn('pointer-events-none absolute inset-0', className)}
            {...props}
        />
    );
}
