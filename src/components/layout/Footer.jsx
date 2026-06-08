import { FaLinkedinIn, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import siteConfig from '../../config/siteConfig';
import logoImg from '../../assets/logo_versions/Isotipo - BlMo.png';
import './Footer.css';

export default function Footer() {
    const { company, contact, navigation } = siteConfig;
    const year = new Date().getFullYear();

    const socialLinks = [
        { Icon: MdEmail,      href: `mailto:${contact.email}`,       label: 'Email'     },
        { Icon: FaWhatsapp,   href: `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`, label: 'WhatsApp', target: '_blank' },
        { Icon: FaLinkedinIn, href: contact.social.linkedin,          label: 'LinkedIn'  },
        { Icon: FaGithub,     href: contact.social.github,            label: 'GitHub'    },
        { Icon: FaInstagram,  href: contact.social.instagram,         label: 'Instagram' },
    ];

    const mainLinks = navigation.map(item => ({ href: item.href, label: item.label }));

    const legalLinks = [
        { href: '#privacy', label: 'Política de Privacidad' },
        { href: '#terms',   label: 'Términos y Condiciones' },
    ];

    return (
        <footer className="footer">
            <div className="container">
                {/* Top row — logo + socials */}
                <div className="footer__top">
                    <a href="#hero" className="footer__brand" aria-label={company.name}>
                        <img src={logoImg} alt={company.name} className="footer__logo-img" />
                        <span className="footer__brand-name">{company.name}</span>
                    </a>
                    <ul className="footer__socials">
                        {socialLinks.map(({ Icon, href, label }) => (
                            <li key={label}>
                                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="footer__social">
                                    <Icon size={16} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Divider + bottom rows */}
                <div className="footer__bottom-wrap">
                    {/* Main nav links */}
                    <nav className="footer__main-links">
                        <ul>
                            {mainLinks.map(link => (
                                <li key={link.href}>
                                    <a href={link.href} className="footer__main-link">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Legal links */}
                    <div className="footer__legal-links">
                        <ul>
                            {legalLinks.map(link => (
                                <li key={link.href}>
                                    <a href={link.href} className="footer__legal-link">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Copyright */}
                    <div className="footer__copy">
                        <p>© {year} {company.name}</p>
                        <p>Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
