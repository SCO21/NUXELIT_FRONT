import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import siteConfig from '../../config/siteConfig';
import LogoMark from '../brand/LogoMark';
import './Navbar.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const handleNavClick = (href) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner container">
                <a href="#hero" className="navbar__logo" onClick={() => handleNavClick('#hero')}>
                    <LogoMark size={32} className="navbar__logo-svg" />
                    <span className="navbar__logo-text">{siteConfig.company.name}</span>
                </a>

                {/* Desktop Nav */}
                <ul className="navbar__links">
                    {siteConfig.navigation.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className="navbar__link"
                                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <a
                    href="#quote"
                    className="navbar__cta btn btn-primary btn-sm"
                    onClick={(e) => { e.preventDefault(); handleNavClick('#quote'); }}
                >
                    Cotizar Proyecto
                </a>

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
                                        className="navbar__mobile-link"
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
