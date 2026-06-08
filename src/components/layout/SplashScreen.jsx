import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import isotipoBlMo from '../../assets/logo_versions/Isotipo - BlMo.png';
import './SplashScreen.css';

export default function SplashScreen({ onReady }) {
    const [phase, setPhase] = useState('logo'); // logo → text → bar → done

    useEffect(() => {
        const t1 = setTimeout(() => setPhase('text'),  800);
        const t2 = setTimeout(() => setPhase('bar'),   1400);
        const t3 = setTimeout(() => {
            setPhase('done');
            onReady?.();
        }, 3200);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    className="splash-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    {/* Logo + texto centrado en el overlay */}
                    <div className="splash-overlay__center">
                        <motion.img
                            src={isotipoBlMo}
                            alt="Nuxelit"
                            className="splash-hero__logo"
                            initial={{ opacity: 0, scale: 0.82 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        />
                        <AnimatePresence>
                            {phase !== 'logo' && (
                                <motion.p
                                    className="splash-hero__name"
                                    initial={{ opacity: 0, y: 12, letterSpacing: '0.4em' }}
                                    animate={{ opacity: 1, y: 0, letterSpacing: '0.22em' }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                >
                                    NUXELIT
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Barra de carga */}
                    <div className="splash-overlay__bottom">
                        <AnimatePresence mode="wait">
                            {phase === 'bar' && (
                                <motion.div
                                    key="bar"
                                    className="splash-hero__bar-wrap"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        className="splash-hero__bar"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
