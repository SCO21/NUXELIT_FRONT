import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import NumberFlow from '@number-flow/react';
import confetti from 'canvas-confetti';
import siteConfig from '../../config/siteConfig';
import './Plans.css';

/* ── Precios numéricos para el toggle mensual/anual ── */
const pricingData = [
    {
        id: 'starter',
        monthlyPrice: 2500000,
        yearlyPrice:  2000000,
        isCustom: false,
    },
    {
        id: 'professional',
        monthlyPrice: 8000000,
        yearlyPrice:  6400000,
        isCustom: false,
    },
    {
        id: 'enterprise',
        monthlyPrice: 0,
        yearlyPrice:  0,
        isCustom: true,
    },
];

const copFormatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

export default function Plans() {
    const [isMonthly, setIsMonthly] = useState(true);
    const switchRef = useRef(null);

    const plans = siteConfig.plans.map((plan, i) => ({
        ...plan,
        ...pricingData[i],
    }));

    const handleToggle = (checked) => {
        setIsMonthly(!checked);
        if (checked && switchRef.current) {
            const rect = switchRef.current.getBoundingClientRect();
            confetti({
                particleCount: 60,
                spread: 70,
                origin: {
                    x: (rect.left + rect.width / 2) / window.innerWidth,
                    y: (rect.top + rect.height / 2) / window.innerHeight,
                },
                colors: ['#632de1', '#7e51f8', '#3a36e4', '#5a57f2', '#ffffff'],
                ticks: 200,
                gravity: 1.2,
                decay: 0.94,
                startVelocity: 28,
                shapes: ['circle'],
            });
        }
    };

    return (
        <section id="plans" className="section">
            <div className="container">
                <div style={{ textAlign: 'center' }}>
                    <h2 className="section-title">Planes y precios</h2>
                    <p className="section-subtitle">
                        Opciones adaptadas a cada etapa de tu proyecto, con soporte incluido y precios claros desde el primer día.
                    </p>
                </div>

                {/* Toggle mensual / anual */}
                <div className="plans__toggle-wrap">
                    <span className={`plans__toggle-label${isMonthly ? ' plans__toggle-label--active' : ''}`}>
                        Mensual
                    </span>
                    <SwitchPrimitive.Root
                        ref={switchRef}
                        checked={!isMonthly}
                        onCheckedChange={handleToggle}
                        className="plans__switch"
                    >
                        <SwitchPrimitive.Thumb className="plans__switch-thumb" />
                    </SwitchPrimitive.Root>
                    <span className={`plans__toggle-label${!isMonthly ? ' plans__toggle-label--active' : ''}`}>
                        Anual <span className="plans__save-badge">Ahorra 20%</span>
                    </span>
                </div>

                {/* Cards */}
                <div className="plans__grid">
                    {plans.map((plan, i) => {
                        const isPopular = plan.highlighted;
                        const price = isMonthly ? plan.monthlyPrice : plan.yearlyPrice;

                        return (
                            <motion.div
                                key={plan.id}
                                className={`plans__card card${isPopular ? ' plans__card--popular' : ''}${i !== 1 ? ' plans__card--side' : ''}`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{
                                    opacity: 1,
                                    y: isPopular ? -16 : 0,
                                    scale: isPopular ? 1 : 0.95,
                                    x: i === 0 ? 20 : i === 2 ? -20 : 0,
                                }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 1.4,
                                    type: 'spring',
                                    stiffness: 90,
                                    damping: 28,
                                    delay: i * 0.12,
                                }}
                            >
                                {isPopular && (
                                    <div className="plans__popular-badge">
                                        <Star size={13} fill="currentColor" />
                                        Popular
                                    </div>
                                )}

                                <p className="plans__name">{plan.name}</p>
                                <p className="plans__subtitle">{plan.subtitle}</p>

                                {/* Precio */}
                                <div className="plans__price-wrap">
                                    {plan.isCustom ? (
                                        <span className="plans__price-custom">A medida</span>
                                    ) : (
                                        <>
                                            <span className="plans__currency">COP</span>
                                            <span className="plans__price">
                                                <NumberFlow
                                                    value={price}
                                                    format={{ style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }}
                                                    transformTiming={{ duration: 500, easing: 'ease-out' }}
                                                    willChange
                                                />
                                            </span>
                                        </>
                                    )}
                                </div>
                                <p className="plans__billing">
                                    {plan.isCustom ? 'Cotización personalizada' : isMonthly ? 'por proyecto' : 'con descuento anual'}
                                </p>

                                {/* Separador */}
                                <hr className="plans__divider" />

                                {/* Features */}
                                <ul className="plans__features">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="plans__feature">
                                            <Check size={14} className="plans__feature-icon" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <hr className="plans__divider" />

                                <a
                                    href="#quote"
                                    className={`plans__cta-btn${isPopular ? ' plans__cta-btn--popular' : ''}`}
                                >
                                    {plan.cta}
                                </a>

                                <p className="plans__desc">{plan.subtitle}</p>
                            </motion.div>
                        );
                    })}
                </div>

                <p className="plans__note">
                    ¿Necesitas algo diferente?{' '}
                    <a href="#quote" className="plans__custom-link">
                        Solicita una cotización personalizada →
                    </a>
                </p>
            </div>
        </section>
    );
}
