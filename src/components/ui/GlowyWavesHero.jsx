import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import siteConfig from '../../config/siteConfig';
import './GlowyWavesHero.css';

const pills = ['Desarrollo Web', 'Inteligencia Artificial', 'Apps Móviles'];

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const statsVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.08 } },
};

const waveConfigs = [
  { offset: 0,              amplitude: 70, frequency: 0.003,  color: 'rgba(99,45,225,0.85)',   opacity: 0.5  },
  { offset: Math.PI / 2,   amplitude: 90, frequency: 0.0026, color: 'rgba(126,81,248,0.75)',  opacity: 0.4  },
  { offset: Math.PI,       amplitude: 60, frequency: 0.0034, color: 'rgba(58,54,228,0.7)',    opacity: 0.35 },
  { offset: Math.PI * 1.5, amplitude: 80, frequency: 0.0022, color: 'rgba(99,45,225,0.45)',   opacity: 0.28 },
  { offset: Math.PI * 2,   amplitude: 55, frequency: 0.004,  color: 'rgba(180,160,255,0.3)',  opacity: 0.22 },
];

export function GlowyWavesHero() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let time = 0;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouseInfluence = prefersReduced ? 10 : 70;
    const influenceRadius = prefersReduced ? 160 : 320;
    const smoothing = prefersReduced ? 0.04 : 0.1;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      mouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
      targetMouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
    };

    const onMouseMove = e => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      targetMouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
    };

    const drawWave = wave => {
      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / influenceRadius);
        const mouseEffect = influence * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);
        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45) +
          mouseEffect;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 35;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      time += 1;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      const light = document.documentElement.getAttribute('data-theme') === 'light';
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, light ? '#ffffff' : '#0b0d11');
      grad.addColorStop(1, light ? '#f0edfb' : '#0e1018');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      waveConfigs.forEach(drawWave);

      animId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const { company, stats } = siteConfig;

  return (
    <section className="gwh" aria-label="Hero">
      <canvas ref={canvasRef} className="gwh__canvas" aria-hidden="true" />

      <div className="gwh__content">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="gwh__inner">

          {/* Badge */}
          <motion.div variants={itemVariants} className="gwh__badge">
            <Sparkles size={14} />
            Disponibles para nuevos proyectos
          </motion.div>

          {/* Title */}
          <motion.h1 variants={itemVariants} className="gwh__title">
            {company.tagline.split(' ').slice(0, -2).join(' ')}{' '}
            <span className="gwh__title-accent">
              {company.tagline.split(' ').slice(-2).join(' ')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="gwh__subtitle">
            {company.description}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="gwh__actions">
            <a href="#quote" className="gwh__btn gwh__btn--primary">
              Solicitar Cotización <ArrowRight size={13} />
            </a>
            <a href="#portfolio" className="gwh__btn gwh__btn--secondary">
              Ver Proyectos
            </a>
          </motion.div>

          {/* Pills */}
          <motion.ul variants={itemVariants} className="gwh__pills">
            {pills.map(p => (
              <li key={p} className="gwh__pill">{p}</li>
            ))}
          </motion.ul>

          {/* Stats */}
          <motion.div variants={statsVariants} className="gwh__stats">
            {stats.map(s => (
              <motion.div key={s.label} variants={itemVariants} className="gwh__stat">
                <span className="gwh__stat-label">{s.label}</span>
                <span className="gwh__stat-value">{s.value}{s.suffix}</span>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
