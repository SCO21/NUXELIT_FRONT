import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import siteConfig from '../../config/siteConfig';
import './Testimonials.css';

const AVATARS = [
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/women/68.jpg',
];

export default function Testimonials() {
    const testimonials = siteConfig.testimonials.map((t, i) => ({
        ...t,
        id: i,
        avatar: AVATARS[i % AVATARS.length],
    }));

    const [currentIndex, setCurrentIndex] = useState(0);
    const [exitX, setExitX] = useState(0);

    const handleDragEnd = (_, info) => {
        if (Math.abs(info.offset.x) > 80) {
            const dir = info.offset.x > 0 ? 1 : -1;
            setExitX(info.offset.x);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % testimonials.length);
                setExitX(0);
            }, 200);
        }
    };

    const next = () => {
        setExitX(-200);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            setExitX(0);
        }, 200);
    };

    const prev = () => {
        setExitX(200);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
            setExitX(0);
        }, 200);
    };

    return (
        <section className="section section--alt" id="testimonials">
            <div className="container">
                <div className="tcarousel__wrap">
                    {/* Stack de cartas */}
                    <div className="tcarousel__stack-area">
                        <div className="tcarousel__stack">
                            {testimonials.map((t, index) => {
                                const isTop    = index === currentIndex;
                                const isMid    = index === (currentIndex + 1) % testimonials.length;
                                const isBottom = index === (currentIndex + 2) % testimonials.length;

                                if (!isTop && !isMid && !isBottom) return null;

                                return (
                                    <motion.div
                                        key={t.id}
                                        className="tcarousel__card"
                                        style={{ zIndex: isTop ? 3 : isMid ? 2 : 1 }}
                                        drag={isTop ? 'x' : false}
                                        dragConstraints={{ left: 0, right: 0 }}
                                        dragElastic={0.6}
                                        onDragEnd={isTop ? handleDragEnd : undefined}
                                        animate={{
                                            scale:   isTop ? 1 : isMid ? 0.95 : 0.90,
                                            opacity: isTop ? 1 : isMid ? 0.6  : 0.3,
                                            x:       isTop ? exitX : 0,
                                            y:       isTop ? 0 : isMid ? 10 : 20,
                                            rotate:  isTop ? exitX / 22 : isMid ? -2 : -4,
                                        }}
                                        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                                    >
                                        {/* Arrows on top card */}
                                        {isTop && (
                                            <div className="tcarousel__card-arrows">
                                                <button onClick={prev} className="tcarousel__card-arrow" aria-label="Anterior">&#8592;</button>
                                                <button onClick={next} className="tcarousel__card-arrow" aria-label="Siguiente">&#8594;</button>
                                            </div>
                                        )}

                                        <div className="tcarousel__card-body">
                                            <img
                                                src={t.avatar}
                                                alt={t.name}
                                                className="tcarousel__avatar"
                                            />
                                            <strong className="tcarousel__name">{t.name}</strong>
                                            <span className="tcarousel__role">{t.role} · {t.company}</span>
                                            <div className="tcarousel__stars">
                                                {Array.from({ length: t.rating }).map((_, i) => (
                                                    <FaStar key={i} className="tcarousel__star" />
                                                ))}
                                            </div>
                                            <p className="tcarousel__text">"{t.text}"</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Dots */}
                        <div className="tcarousel__dots">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    className={`tcarousel__dot${i === currentIndex ? ' tcarousel__dot--active' : ''}`}
                                    onClick={() => setCurrentIndex(i)}
                                    aria-label={`Testimonio ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
