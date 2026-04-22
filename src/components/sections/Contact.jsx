import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaPhone, FaWhatsapp, FaMapMarkerAlt, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { submitContact } from '../../utils/api';
import siteConfig from '../../config/siteConfig';
import './Contact.css';

export default function Contact() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const { contact, services } = siteConfig;
    const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            // Map 'service' local state to 'subject' API requirement
            const apiPayload = {
                ...form,
                subject: form.service || 'Contacto General',
            };
            await submitContact(apiPayload);
            setStatus('success');
            setForm({ name: '', email: '', phone: '', service: '', message: '' });
        } catch {
            setStatus('error');
        }
    };

    const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;

    return (
        <section id="contact" className="section section--alt">
            <div className="container" ref={ref}>
                <div style={{ textAlign: 'center' }}>
                    <span className="badge">Contacto</span>
                    <h2 className="section-title">Hablemos de tu proyecto</h2>
                    <p className="section-subtitle">
                        Estamos listos para ayudarte. Contáctanos por cualquier medio y responderemos a la brevedad.
                    </p>
                </div>

                <div className="contact__grid">
                    {/* Contact Info */}
                    <motion.div
                        className="contact__info"
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="contact__channels">
                            <a href={`mailto:${contact.email}`} className="contact__channel card">
                                <FaEnvelope className="contact__channel-icon" />
                                <div>
                                    <strong>Email</strong>
                                    <span>{contact.email}</span>
                                </div>
                            </a>
                            <a href={`tel:${contact.phoneRaw}`} className="contact__channel card">
                                <FaPhone className="contact__channel-icon" />
                                <div>
                                    <strong>Teléfono</strong>
                                    <span>{contact.phone}</span>
                                </div>
                            </a>
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact__channel card contact__channel--whatsapp">
                                <FaWhatsapp className="contact__channel-icon" />
                                <div>
                                    <strong>WhatsApp</strong>
                                    <span>Chat en vivo</span>
                                </div>
                            </a>
                            <div className="contact__channel card">
                                <FaMapMarkerAlt className="contact__channel-icon" />
                                <div>
                                    <strong>Oficina</strong>
                                    <span>{contact.address}</span>
                                </div>
                            </div>
                        </div>

                        <div className="contact__social-row">
                            <a href={contact.social.linkedin} target="_blank" rel="noopener noreferrer" className="contact__social-btn">
                                <FaLinkedinIn /> LinkedIn
                            </a>
                            <a href={contact.social.github} target="_blank" rel="noopener noreferrer" className="contact__social-btn">
                                <FaGithub /> GitHub
                            </a>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.form
                        className="contact__form glass"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="contact__form-title">Envíanos un mensaje</h3>

                        <div className="contact__form-grid">
                            <div className="form-group">
                                <label className="form-label">Nombre</label>
                                <input className="form-input" name="name" placeholder="Tu nombre" value={form.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input className="form-input" name="email" type="email" placeholder="tu@email.com" value={form.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Teléfono</label>
                                <input className="form-input" name="phone" placeholder="+57 300 000 0000" value={form.phone} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Servicio</label>
                                <select className="form-select" name="service" value={form.service} onChange={handleChange}>
                                    <option value="">Seleccionar servicio</option>
                                    {services.map((s) => (
                                        <option key={s.id} value={s.id}>{s.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Mensaje</label>
                            <textarea className="form-textarea" name="message" placeholder="Cuéntanos sobre tu proyecto..." value={form.message} onChange={handleChange} required />
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={status === 'sending'}>
                            {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
                        </button>

                        {status === 'success' && <p className="contact__status contact__status--success">✅ ¡Mensaje enviado! Te contactaremos pronto.</p>}
                        {status === 'error' && <p className="contact__status contact__status--error">❌ Error al enviar. Intenta de nuevo.</p>}
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
