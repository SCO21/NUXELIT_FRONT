import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaComments, FaLightbulb, FaFileAlt, FaBrain, FaArrowRight } from 'react-icons/fa';
import siteConfig from '../../config/siteConfig';
import './AIShowcase.css';

const iconMap = { FaComments, FaLightbulb, FaFileAlt, FaBrain };

export default function AIShowcase() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="ai-showcase" className="section section--alt">
            <div className="container" ref={ref}>
                <div className="ai__header">
                    <div className="ai__header-text">
                        <span className="badge">IA & Chatbots</span>
                        <h2 className="section-title">Potencia tu negocio con Inteligencia Artificial</h2>
                        <p className="ai__header-desc">
                            Integramos módulos de IA de última generación en tus proyectos. Desde chatbots inteligentes hasta analítica predictiva, transformamos datos en decisiones.
                        </p>
                        <a href="#quote" className="btn btn-primary">
                            Integrar IA en mi proyecto <FaArrowRight />
                        </a>
                    </div>

                    {/* Chatbot mockup */}
                    <motion.div
                        className="ai__chatbot-mock glass"
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="ai__chat-header">
                            <div className="ai__chat-avatar">🤖</div>
                            <div>
                                <strong>{siteConfig.company.name} AI</strong>
                                <span className="ai__chat-status">● En línea</span>
                            </div>
                        </div>
                        <div className="ai__chat-messages">
                            <div className="ai__chat-msg ai__chat-msg--bot">
                                <p>¡Hola! 👋 Soy el asistente virtual de {siteConfig.company.name}. ¿En qué puedo ayudarte?</p>
                            </div>
                            <div className="ai__chat-msg ai__chat-msg--user">
                                <p>Necesito un chatbot para mi e-commerce</p>
                            </div>
                            <div className="ai__chat-msg ai__chat-msg--bot">
                                <p>¡Excelente! Podemos crear un chatbot con: recomendaciones de productos, tracking de pedidos y atención 24/7. ¿Quieres una demo?</p>
                            </div>
                        </div>
                        <div className="ai__chat-input">
                            <input type="text" placeholder="Escribe un mensaje..." disabled />
                            <button className="ai__chat-send" disabled>→</button>
                        </div>
                    </motion.div>
                </div>

                {/* AI Module Cards */}
                <div className="ai__modules">
                    {siteConfig.aiModules.map((mod, i) => {
                        const Icon = iconMap[mod.icon] || FaBrain;
                        return (
                            <motion.div
                                key={mod.id}
                                className="ai__module card"
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                            >
                                <div className="ai__module-icon-wrap">
                                    <Icon className="ai__module-icon" />
                                </div>
                                <h3 className="ai__module-title">{mod.title}</h3>
                                <p className="ai__module-desc">{mod.description}</p>
                                <ul className="ai__module-features">
                                    {mod.features.map((f, j) => (
                                        <li key={j} className="tag">{f}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
