import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaComments, FaLightbulb, FaFileAlt, FaBrain, FaArrowRight, FaPaperPlane } from 'react-icons/fa';
import siteConfig from '../../config/siteConfig';
import { startChatbotSession, sendChatbotMessage } from '../../utils/api';
import './AIShowcase.css';

const iconMap = { FaComments, FaLightbulb, FaFileAlt, FaBrain };

export default function AIShowcase() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const messagesEndRef = useRef(null);
    
    // Chat states
    const [sessionId, setSessionId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSessionStarted, setIsSessionStarted] = useState(false);

    // Initialize session automatically when component comes into view
    useEffect(() => {
        if (inView && !isSessionStarted && !sessionId) {
            initSession();
        }
    }, [inView]);

    // Auto-scroll chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const initSession = async () => {
        setIsSessionStarted(true); // Prevent multiple calls
        setIsLoading(true);
        try {
            const res = await startChatbotSession('es');
            if (res?.data?.sessionId) {
                setSessionId(res.data.sessionId);
                setMessages([{ role: 'bot', text: res.data.welcomeMessage || `¡Hola! Soy el asistente virtual de ${siteConfig.company.name}. ¿En qué puedo ayudarte?` }]);
            }
        } catch (error) {
            console.error('Error starting session:', error);
            setMessages([{ role: 'bot', text: 'El servicio de IA no está disponible en este momento. Por favor contactanos por WhatsApp.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async (e) => {
        e?.preventDefault();
        const msgText = input.trim();
        if (!msgText || !sessionId || isLoading) return;

        // Optimistic UI update
        const userMsg = { role: 'user', text: msgText };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await sendChatbotMessage(sessionId, msgText);
            const botMsg = { role: 'bot', text: res?.data?.response || 'Ha ocurrido un error inesperado al procesar tu mensaje.' };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prev) => [...prev, { role: 'bot', text: 'Lo siento, perdí la conexión con el núcleo de IA. Intenta de nuevo más tarde.' }]);
        } finally {
            setIsLoading(false);
        }
    };

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

                    {/* Chatbot Interface */}
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
                                <span className="ai__chat-status">
                                    {sessionId ? (isLoading ? '● Escribiendo...' : '● En línea') : '○ Conectando...'}
                                </span>
                            </div>
                        </div>
                        
                        <div className="ai__chat-messages">
                            {messages.map((m, idx) => (
                                <div key={idx} className={`ai__chat-msg ai__chat-msg--${m.role}`}>
                                    <p>{m.text}</p>
                                </div>
                            ))}
                            {isLoading && messages.length > 0 && (
                                <div className="ai__chat-msg ai__chat-msg--bot">
                                    <div className="ai__typing-dots"><span>.</span><span>.</span><span>.</span></div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form className="ai__chat-input" onSubmit={handleSend}>
                            <input 
                                type="text" 
                                placeholder="Escribe un mensaje..." 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={!sessionId || isLoading} 
                            />
                            <button type="submit" className="ai__chat-send" disabled={!sessionId || !input.trim() || isLoading}>
                                <FaPaperPlane />
                            </button>
                        </form>
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
