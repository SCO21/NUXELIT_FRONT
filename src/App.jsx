import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { applyTheme } from './styles/theme';
import { trackEvent } from './utils/api';

import { motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageBackground from './components/layout/PageBackground';
import SplashScreen from './components/layout/SplashScreen';
import WhatsAppFAB from './components/layout/WhatsAppFAB';
import FloatingChatbot from './components/layout/FloatingChatbot';
import { GlowyWavesHero } from './components/ui/GlowyWavesHero';
import { ThemeToggle } from './components/ui/ThemeToggle';

import Services from './components/sections/Services';
import Plans from './components/sections/Plans';
import AIShowcase from './components/sections/AIShowcase';
import Portfolio from './components/sections/Portfolio';
import Stats from './components/sections/Stats';
import Testimonials from './components/sections/Testimonials';
import TechStack from './components/sections/TechStack';
import Contact from './components/sections/Contact';
import QuoteRequest from './components/sections/QuoteRequest';

export default function App() {
    const [splashReady, setSplashReady] = useState(false);

    useEffect(() => {
        document.documentElement.style.overflow = splashReady ? '' : 'hidden';
    }, [splashReady]);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.5,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    useEffect(() => {
        applyTheme();
        if (!sessionStorage.getItem('nuxelit_session')) {
            sessionStorage.setItem('nuxelit_session', crypto.randomUUID());
        }
        trackEvent('page_view', window.location.pathname);
    }, []);

    const fadeIn = (delay = 0) => ({
        initial: { opacity: 0 },
        animate: { opacity: splashReady ? 1 : 0 },
        transition: { duration: 0.7, delay, ease: 'easeOut' },
        style: { pointerEvents: splashReady ? 'auto' : 'none' },
    });

    return (
        <>
            <SplashScreen onReady={() => setSplashReady(true)} />
            <PageBackground />

            <motion.div {...fadeIn(0)}>
                <Navbar />
            </motion.div>

            <main>
                <GlowyWavesHero />
                <Services />
                <Plans />
                <AIShowcase />
                <Portfolio />
                <TechStack />
                <Testimonials />
                <QuoteRequest />
                <Contact />
            </main>

            <Footer />

            <motion.div {...fadeIn(0.15)}>
                <WhatsAppFAB />
            </motion.div>
            <motion.div {...fadeIn(0.3)}>
                <FloatingChatbot />
            </motion.div>

            {/* Theme toggle — fixed top-right */}
            <motion.div {...fadeIn(0.1)} style={{ ...fadeIn(0.1).style, position: 'fixed', top: '1rem', right: '1.4rem', zIndex: 1001 }}>
                <ThemeToggle />
            </motion.div>
        </>
    );
}
