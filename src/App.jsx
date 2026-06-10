import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { applyTheme } from './styles/theme';
import { trackEvent } from './utils/api';

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
import Testimonials from './components/sections/Testimonials';
import TechStack from './components/sections/TechStack';
import Contact from './components/sections/Contact';
import QuoteRequest from './components/sections/QuoteRequest';


export default function App() {
    const [splashReady, setSplashReady] = useState(false);

    useEffect(() => {
        if (splashReady) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    document.body.classList.add('ui-ready');
                });
            });
        }
    }, [splashReady]);

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
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    useEffect(() => {
        applyTheme('dark');
        if (!sessionStorage.getItem('nuxelit_session')) {
            sessionStorage.setItem('nuxelit_session', crypto.randomUUID());
        }
        trackEvent('page_view', window.location.pathname);
    }, []);

    return (
        <>
            <SplashScreen onReady={() => setSplashReady(true)} />
            <PageBackground />

            <Navbar />

            <div style={{ position: 'fixed', top: '1rem', right: '1.4rem', zIndex: 1001 }} className="ui-fade ui-fade--1">
                <ThemeToggle />
            </div>

            <WhatsAppFAB />
            <FloatingChatbot />

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
        </>
    );
}
