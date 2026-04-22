import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import siteConfig from '../../config/siteConfig';
import './Testimonials.css';

export default function Testimonials() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [idx, setIdx] = useState(0);
    const { testimonials } = siteConfig;

    const prev = () => setIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
    const next = () => setIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1));
    const t = testimonials[idx];

    return (
        <section className="section section--alt" id="testimonials">
            <div className="container" ref={ref}>
                <div style={{ textAlign: 'center' }}>
                    <span className="badge">Testimonios</span>
                    <h2 className="section-title">Lo que dicen nuestros clientes</h2>
                    <p className="section-subtitle">
                        La confianza de nuestros clientes es nuestro mayor logro. Descubre sus experiencias.
                    </p>
                </div>

                <motion.div
                    className="testimonials__slider"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <button className="testimonials__arrow testimonials__arrow--left" onClick={prev} aria-label="Previous">
                        <FaChevronLeft />
                    </button>

                    <div className="testimonials__content glass">
                        <FaQuoteLeft className="testimonials__quote-icon" />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.3 }}
                                className="testimonials__body"
                            >
                                <p className="testimonials__text">{t.text}</p>
                                <div className="testimonials__author">
                                    <div className="testimonials__avatar">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <strong className="testimonials__name">{t.name}</strong>
                                        <span className="testimonials__role">{t.role} — {t.company}</span>
                                    </div>
                                </div>
                                <div className="testimonials__stars">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <FaStar key={i} className="testimonials__star" />
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button className="testimonials__arrow testimonials__arrow--right" onClick={next} aria-label="Next">
                        <FaChevronRight />
                    </button>
                </motion.div>

                <div className="testimonials__dots">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            className={`testimonials__dot ${i === idx ? 'testimonials__dot--active' : ''}`}
                            onClick={() => setIdx(i)}
                            aria-label={`Testimonial ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
