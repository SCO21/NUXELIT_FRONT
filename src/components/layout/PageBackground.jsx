import { useEffect, useRef } from 'react';
import './PageBackground.css';

function StarCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let stars = [];

        const resize = () => {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            stars = Array.from({ length: 380 }, () => ({
                x:     Math.random() * canvas.width,
                y:     Math.random() * canvas.height,
                r:     Math.random() * 1.2 + 0.3,
                speed: Math.random() * 0.25 + 0.05,
                alpha: Math.random() * 0.6 + 0.3,
            }));
        };

        const draw = () => {
            const light = document.documentElement.getAttribute('data-theme') === 'light';
            const bg    = light ? '#eeecf9' : '#0b0d11';
            const color = light ? '35,10,90' : '180,160,255';

            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            stars.forEach(s => {
                s.y -= s.speed;
                if (s.y < -2) { s.y = canvas.height + 2; s.x = Math.random() * canvas.width; }

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color},${s.alpha})`;
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener('resize', resize);
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
    );
}

export default function PageBackground() {
    return (
        <div className="page-bg" aria-hidden="true">
            <StarCanvas />
            <div className="page-bg__blob page-bg__blob--1" />
            <div className="page-bg__blob page-bg__blob--2" />
        </div>
    );
}
