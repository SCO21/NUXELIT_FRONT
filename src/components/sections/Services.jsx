import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaMobileAlt, FaServer, FaRobot, FaCloud, FaChartLine } from 'react-icons/fa';
import siteConfig from '../../config/siteConfig';
import './Services.css';

const iconMap = {
    FaCode, FaMobileAlt, FaServer, FaRobot, FaCloud, FaChartLine,
};

export default function Services() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="services" className="section section--alt">
            <div className="container" ref={ref}>
                <div style={{ textAlign: 'center' }}>
                    <span className="badge">Nuestros Servicios</span>
                    <h2 className="section-title">Soluciones que impulsan tu negocio</h2>
                    <p className="section-subtitle">
                        Ofrecemos un espectro completo de servicios de desarrollo para transformar tus ideas en productos digitales excepcionales.
                    </p>
                </div>

                <div className="services__grid">
                    {siteConfig.services.map((service, i) => {
                        const Icon = iconMap[service.icon] || FaCode;
                        return (
                            <motion.div
                                key={service.id}
                                className="services__card card"
                                initial={{ opacity: 0, y: 40 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                            >
                                <div className="services__icon-wrap">
                                    <Icon className="services__icon" />
                                </div>
                                <h3 className="services__title">{service.title}</h3>
                                <p className="services__desc">{service.description}</p>
                                <a href="#quote" className="services__link">
                                    Saber más →
                                </a>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
