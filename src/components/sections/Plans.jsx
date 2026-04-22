import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCheck, FaStar } from 'react-icons/fa';
import siteConfig from '../../config/siteConfig';
import './Plans.css';

export default function Plans() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="plans" className="section">
            <div className="container" ref={ref}>
                <div style={{ textAlign: 'center' }}>
                    <span className="badge">Planes & Precios</span>
                    <h2 className="section-title">Elige el plan perfecto</h2>
                    <p className="section-subtitle">
                        Planes flexibles diseñados para cada etapa de tu proyecto. Todos incluyen soporte y garantía de calidad.
                    </p>
                </div>

                <div className="plans__grid">
                    {siteConfig.plans.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            className={`plans__card card ${plan.highlighted ? 'plans__card--highlighted' : ''}`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                        >
                            {plan.badge && (
                                <span className="plans__badge">
                                    <FaStar style={{ fontSize: '0.65rem' }} /> {plan.badge}
                                </span>
                            )}
                            <h3 className="plans__name">{plan.name}</h3>
                            <p className="plans__subtitle">{plan.subtitle}</p>
                            <div className="plans__price-wrap">
                                {plan.currency && <span className="plans__currency">{plan.currency}</span>}
                                <span className="plans__price">{plan.price}</span>
                                {plan.period && <span className="plans__period">{plan.period}</span>}
                            </div>
                            <ul className="plans__features">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="plans__feature">
                                        <FaCheck className="plans__feature-icon" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="#quote"
                                className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                                style={{ width: '100%' }}
                            >
                                {plan.cta}
                            </a>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    className="plans__note"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                >
                    ¿Necesitas algo diferente? <a href="#quote" className="plans__custom-link">Solicita una cotización personalizada →</a>
                </motion.p>
            </div>
        </section>
    );
}
