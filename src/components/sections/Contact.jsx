import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { submitContact } from '../../utils/api';
import './Contact.css';

function Field({ label, children }) {
    return (
        <div className="cfield">
            <label className="cfield__label">{label}</label>
            <span className="cfield__control">
                {children}
            </span>
        </div>
    );
}

export default function Contact() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await submitContact({ ...form, subject: 'Contacto General' });
            setStatus('success');
            setForm({ name: '', email: '', message: '' });
        } catch {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="section section--alt">
            <div className="container" ref={ref}>
                <div style={{ textAlign: 'center' }}>
                    <h2 className="section-title">Hablemos</h2>
                    <p className="section-subtitle">
                        Cuéntanos tu idea o proyecto y te respondemos en menos de 24 horas con una propuesta concreta.
                    </p>
                </div>

                <motion.form
                    className="contact__form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <Field label="Nombre">
                        <input
                            className="cfield__input"
                            name="name"
                            placeholder="Tu nombre"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </Field>

                    <Field label="Email">
                        <input
                            className="cfield__input"
                            name="email"
                            type="email"
                            placeholder="tu@email.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </Field>

                    <Field label="Mensaje">
                        <textarea
                            className="cfield__textarea"
                            name="message"
                            placeholder="Cuéntanos sobre tu proyecto..."
                            value={form.message}
                            onChange={handleChange}
                            required
                        />
                    </Field>

                    <button
                        type="submit"
                        className="contact__submit btn btn-primary btn-lg"
                        disabled={status === 'sending'}
                    >
                        {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
                    </button>

                    {status === 'success' && <p className="contact__status contact__status--success">✅ ¡Mensaje enviado! Te contactaremos pronto.</p>}
                    {status === 'error'   && <p className="contact__status contact__status--error">❌ Error al enviar. Intenta de nuevo.</p>}
                </motion.form>
            </div>
        </section>
    );
}
