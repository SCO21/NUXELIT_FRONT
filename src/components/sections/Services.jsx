import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaMobileAlt, FaServer, FaRobot, FaCloud, FaChartLine } from 'react-icons/fa';
import siteConfig from '../../config/siteConfig';
import { getServices } from '../../utils/api';
import './Services.css';

const iconMap = {
    FaCode, FaMobileAlt, FaServer, FaRobot, FaCloud, FaChartLine,
};

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
            } catch (error) {
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
                    <span className="badge">Nuestros Servicios</span>
                    <h2 className="section-title">Soluciones que impulsan tu negocio</h2>
                    <p className="section-subtitle">
                        Ofrecemos un espectro completo de servicios de desarrollo para transformar tus ideas en productos digitales excepcionales.
                    </p>
                </div>

                <div className="services__grid">
                    {services.map((service, i) => {
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
