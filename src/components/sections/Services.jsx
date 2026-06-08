import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaMobileAlt, FaServer, FaRobot, FaCloud, FaChartLine } from 'react-icons/fa';
import siteConfig from '../../config/siteConfig';
import { getServices } from '../../utils/api';
import './Services.css';

const iconMap = {
    FaCode, FaMobileAlt, FaServer, FaRobot, FaCloud, FaChartLine,
};

function TiltCard({ children, className }) {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        el.style.setProperty('--rx',  `${(-y * 12).toFixed(2)}deg`);
        el.style.setProperty('--ry',  `${ (x * 12).toFixed(2)}deg`);
        el.style.setProperty('--gx',  `${(x * 100 + 50).toFixed(1)}%`);
        el.style.setProperty('--gy',  `${(y * 100 + 50).toFixed(1)}%`);
    };

    const handleMouseLeave = () => {
        const el = cardRef.current;
        if (!el) return;
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
    };

    return (
        <div
            ref={cardRef}
            className={`tilt-card ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
}

export default function Services() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [services, setServices] = useState(siteConfig.services);

    useEffect(() => {
        let isMounted = true;
        const fetchServices = async () => {
            try {
                const res = await getServices();
                const fetchedServices = res?.data?.services || res?.data || res;
                if (isMounted && Array.isArray(fetchedServices) && fetchedServices.length > 0) {
                    setServices(fetchedServices);
                }
            } catch {
                console.log('Using mock services data (API fallback).');
            }
        };
        fetchServices();
        return () => { isMounted = false; };
    }, []);

    return (
        <section id="services" className="section section--alt">
            <div className="container" ref={ref}>
                <div style={{ textAlign: 'center' }}>
                    <h2 className="section-title">Servicios de desarrollo</h2>
                    <p className="section-subtitle">
                        Desarrollamos soluciones digitales a medida — desde aplicaciones web y móviles hasta sistemas con inteligencia artificial — con foco en rendimiento, escalabilidad y experiencia de usuario.
                    </p>
                </div>

                <div className="services__grid">
                    {services.map((service, i) => {
                        const Icon = iconMap[service.icon] || FaCode;
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                            >
                                <TiltCard className="services__card card">
                                    <div className="tilt-card__shine" />
                                    <div className="services__icon-wrap">
                                        <Icon className="services__icon" />
                                    </div>
                                    <h3 className="services__title">{service.title}</h3>
                                    <p className="services__desc">{service.description}</p>
                                    <a href="#quote" className="services__link">
                                        Saber más →
                                    </a>
                                </TiltCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
