import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import siteConfig from '../../config/siteConfig';
import logoDark  from '../../assets/logo_versions/Isotipo - BlMo.png';
import logoLight from '../../assets/logo_versions/Isotipo - Ng.png';
import { ThemeToggle } from '../ui/ThemeToggle';
import './Navbar.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isLight, setIsLight] = useState(
        document.documentElement.getAttribute('data-theme') === 'light'
    );

    useEffect(() => {
        const handler = (e) => setIsLight(e.detail.theme === 'light');
        window.addEventListener('themechange', handler);
        return () => window.removeEventListener('themechange', handler);
    }, []);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeHref, setActiveHref] = useState(siteConfig.navigation[0]?.href || '');

    // Track scroll position to highlight active section
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = siteConfig.navigation
                .map(item => document.querySelector(item.href))
                .filter(Boolean);

            let current = siteConfig.navigation[0]?.href || '';
            const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50);

            if (isAtBottom && sections.length > 0) {
                current = '#' + sections[sections.length - 1].id;
            } else {
                for (const section of sections) {
                    if (section.getBoundingClientRect().top <= 100) {
                        current = '#' + section.id;
                    }
                }
            }
            setActiveHref(current);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const handleNavClick = (href) => {
        setMobileOpen(false);
        setActiveHref(href);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className={`navbar ui-fade ui-fade--1 ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner container">
                <a href="#hero" className="navbar__logo" onClick={() => handleNavClick('#hero')}>
                    <img src={isLight ? logoLight : logoDark} alt="Nuxelit" className="navbar__logo-img" />
                    <span className="navbar__logo-text">{siteConfig.company.name}</span>
                </a>

                {/* Desktop Nav — tubelight pill */}
                <div className="navbar__pill">
                    {siteConfig.navigation.map((item) => {
                        const isActive = activeHref === item.href;
                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                className={`navbar__pill-link${isActive ? ' navbar__pill-link--active' : ''}`}
                                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                            >
                                <span>{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="tubelight"
                                        className="navbar__lamp"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                    >
                                        {/* Tube glow bar */}
                                        <div className="navbar__lamp-bar">
                                            <div className="navbar__lamp-glow navbar__lamp-glow--wide" />
                                            <div className="navbar__lamp-glow navbar__lamp-glow--mid" />
                                            <div className="navbar__lamp-glow navbar__lamp-glow--tight" />
                                        </div>
                                    </motion.div>
                                )}
                            </a>
                        );
                    })}
                </div>

                {/* Mobile Toggle */}
                <button className="navbar__toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                    {mobileOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="navbar__mobile"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                    >
                        <ul className="navbar__mobile-links">
                            {siteConfig.navigation.map((item, i) => (
                                <motion.li
                                    key={item.href}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <a
                                        href={item.href}
                                        className={`navbar__mobile-link${activeHref === item.href ? ' navbar__mobile-link--active' : ''}`}
                                        onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                                    >
                                        {item.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                        <a
                            href="#quote"
                            className="btn btn-primary btn-lg"
                            style={{ width: '100%', marginTop: '1rem' }}
                            onClick={(e) => { e.preventDefault(); handleNavClick('#quote'); }}
                        >
                            Cotizar Proyecto
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
