import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import siteConfig from '../../config/siteConfig';
import './TechStack.css';

export default function TechStack() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section className="techstack section">
            <div className="container" ref={ref}>
                <div style={{ textAlign: 'center' }}>
                    <span className="badge">Tecnologías</span>
                    <h2 className="section-title">Nuestro stack tecnológico</h2>
                    <p className="section-subtitle">
                        Trabajamos con las tecnologías más modernas y robustas del mercado.
                    </p>
                </div>

                <div className="techstack__marquee">
                    <motion.div
                        className="techstack__track"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Double the items for infinite scroll effect */}
                        {[...siteConfig.techStack, ...siteConfig.techStack].map((tech, i) => (
                            <div key={i} className="techstack__item glass-light">
                                <span className="techstack__name">{tech}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
