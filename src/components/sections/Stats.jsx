import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import siteConfig from '../../config/siteConfig';
import './Stats.css';

function AnimatedCounter({ target, suffix, duration = 2000 }) {
    const [count, setCount] = useState(0);
    const [ref, inView] = useInView({ triggerOnce: true });
    const started = useRef(false);

    useEffect(() => {
        if (!inView || started.current) return;
        started.current = true;
        const step = Math.ceil(target / (duration / 16));
        let current = 0;
        const interval = setInterval(() => {
            current += step;
            if (current >= target) {
                setCount(target);
                clearInterval(interval);
            } else {
                setCount(current);
            }
        }, 16);
        return () => clearInterval(interval);
    }, [inView, target, duration]);

    return (
        <span ref={ref} className="stats__value">
            {count}{suffix}
        </span>
    );
}

export default function Stats() {
    return (
        <section className="stats section">
            <div className="container">
                <div className="stats__grid">
                    {siteConfig.stats.map((stat, i) => (
                        <div key={i} className="stats__item">
                            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                            <span className="stats__label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
