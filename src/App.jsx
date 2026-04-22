import { useEffect } from 'react';
import { applyTheme } from './styles/theme';
import { trackEvent } from './utils/api';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppFAB from './components/layout/WhatsAppFAB';

import Hero from './components/sections/Hero';
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
    useEffect(() => {
        applyTheme();
        
        // Track page view once per session load
        if (!sessionStorage.getItem('nuxelit_session')) {
            sessionStorage.setItem('nuxelit_session', crypto.randomUUID());
        }
        trackEvent('page_view', window.location.pathname);
    }, []);

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Services />
                <Stats />
                <Plans />
                <AIShowcase />
                <Portfolio />
                <TechStack />
                <Testimonials />
                <QuoteRequest />
                <Contact />
            </main>
            <Footer />
            <WhatsAppFAB />
        </>
    );
}
