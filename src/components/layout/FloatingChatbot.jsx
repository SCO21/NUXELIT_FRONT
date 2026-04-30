import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import siteConfig from '../../config/siteConfig';
import { startChatbotSession, sendChatbotMessage } from '../../utils/api';
import './FloatingChatbot.css';

export default function FloatingChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef(null);
    
    // Chat states
    const [sessionId, setSessionId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSessionStarted, setIsSessionStarted] = useState(false);

    // Auto-scroll chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen && !isSessionStarted && !sessionId) {
            initSession();
        }
    };

    const initSession = async () => {
        setIsSessionStarted(true);
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
        <div className="floating-chatbot-container">
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="floating-chatbot-window glass"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="ai__chat-header">
                            <div className="ai__chat-avatar">🤖</div>
                            <div>
                                <strong>{siteConfig.company.name} AI</strong>
                                <span className="ai__chat-status">
                                    {sessionId ? (isLoading ? '● Escribiendo...' : '● En línea') : '○ Conectando...'}
                                </span>
                            </div>
                            <button className="floating-chatbot-close" onClick={toggleChat}>
                                <FaTimes />
                            </button>
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
                )}
            </AnimatePresence>


            <button className="chatbot-fab" onClick={toggleChat} aria-label="Abrir chat">
                <FaRobot className="chatbot-fab__icon" />
            </button>
        </div>
    );
}
