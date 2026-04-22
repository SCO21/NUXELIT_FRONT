import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaArrowRight, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { submitQuote } from '../../utils/api';
import siteConfig from '../../config/siteConfig';
import './QuoteRequest.css';

const steps = ['Servicio', 'Detalles', 'Presupuesto', 'Contacto'];

export default function QuoteRequest() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [step, setStep] = useState(0);
    const [status, setStatus] = useState(null);
    const [form, setForm] = useState({
        serviceType: '',
        projectDesc: '',
        budget: '',
        timeline: '',
        name: '',
        email: '',
        phone: '',
        company: '',
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
    const prevStep = () => setStep((s) => Math.max(s - 1, 0));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await submitQuote(form);
            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    const { quoteOptions } = siteConfig;

    return (
        <section id="quote" className="section">
            <div className="container" ref={ref}>
                <div style={{ textAlign: 'center' }}>
                    <span className="badge">Cotización</span>
                    <h2 className="section-title">Solicita tu cotización</h2>
                    <p className="section-subtitle">
                        Completa el formulario y te enviaremos una propuesta personalizada en menos de 24 horas.
                    </p>
                </div>

                <motion.div
                    className="quote__wrapper glass"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    {/* Stepper */}
                    <div className="quote__stepper">
                        {steps.map((s, i) => (
                            <div key={i} className={`quote__step ${i <= step ? 'quote__step--active' : ''} ${i < step ? 'quote__step--done' : ''}`}>
                                <div className="quote__step-circle">{i < step ? '✓' : i + 1}</div>
                                <span className="quote__step-label">{s}</span>
                            </div>
                        ))}
                        <div className="quote__step-line">
                            <div className="quote__step-fill" style={{ width: `${(step / (steps.length - 1)) * 100}%` }} />
                        </div>
                    </div>

                    {status === 'success' ? (
                        <div className="quote__success">
                            <FaCheckCircle className="quote__success-icon" />
                            <h3>¡Cotización enviada!</h3>
                            <p>Te contactaremos en las próximas 24 horas con una propuesta personalizada.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {step === 0 && (
                                        <div className="quote__step-content">
                                            <h3>¿Qué tipo de servicio necesitas?</h3>
                                            <div className="quote__options">
                                                {quoteOptions.serviceTypes.map((type) => (
                                                    <label key={type} className={`quote__option card ${form.serviceType === type ? 'quote__option--selected' : ''}`}>
                                                        <input type="radio" name="serviceType" value={type} checked={form.serviceType === type} onChange={handleChange} />
                                                        <span>{type}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {step === 1 && (
                                        <div className="quote__step-content">
                                            <h3>Cuéntanos sobre tu proyecto</h3>
                                            <div className="form-group">
                                                <label className="form-label">Descripción del proyecto</label>
                                                <textarea className="form-textarea" name="projectDesc" rows="5" placeholder="Describe las funcionalidades principales, el objetivo del proyecto y cualquier detalle relevante..." value={form.projectDesc} onChange={handleChange} />
                                            </div>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="quote__step-content">
                                            <h3>Presupuesto y tiempos</h3>
                                            <div className="form-group">
                                                <label className="form-label">Rango de presupuesto</label>
                                                <div className="quote__options quote__options--sm">
                                                    {quoteOptions.budgetRanges.map((b) => (
                                                        <label key={b} className={`quote__option card ${form.budget === b ? 'quote__option--selected' : ''}`}>
                                                            <input type="radio" name="budget" value={b} checked={form.budget === b} onChange={handleChange} />
                                                            <span>{b}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Tiempo estimado</label>
                                                <div className="quote__options quote__options--sm">
                                                    {quoteOptions.timelines.map((t) => (
                                                        <label key={t} className={`quote__option card ${form.timeline === t ? 'quote__option--selected' : ''}`}>
                                                            <input type="radio" name="timeline" value={t} checked={form.timeline === t} onChange={handleChange} />
                                                            <span>{t}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="quote__step-content">
                                            <h3>Tus datos de contacto</h3>
                                            <div className="quote__contact-grid">
                                                <div className="form-group">
                                                    <label className="form-label">Nombre</label>
                                                    <input className="form-input" name="name" placeholder="Tu nombre completo" value={form.name} onChange={handleChange} required />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Empresa</label>
                                                    <input className="form-input" name="company" placeholder="Nombre de tu empresa" value={form.company} onChange={handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Email</label>
                                                    <input className="form-input" name="email" type="email" placeholder="tu@email.com" value={form.email} onChange={handleChange} required />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Teléfono</label>
                                                    <input className="form-input" name="phone" placeholder="+57 300 000 0000" value={form.phone} onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            <div className="quote__actions">
                                {step > 0 && (
                                    <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                        <FaArrowLeft /> Anterior
                                    </button>
                                )}
                                {step < steps.length - 1 ? (
                                    <button type="button" className="btn btn-primary" onClick={nextStep} style={{ marginLeft: 'auto' }}>
                                        Siguiente <FaArrowRight />
                                    </button>
                                ) : (
                                    <button type="submit" className="btn btn-accent btn-lg" style={{ marginLeft: 'auto' }} disabled={status === 'sending'}>
                                        {status === 'sending' ? 'Enviando...' : 'Enviar Cotización'}
                                    </button>
                                )}
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
