import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import siteConfig from '../../config/siteConfig';
import LogoMark from '../brand/LogoMark';
import './Footer.css';

const socialIcons = {
    linkedin: FaLinkedinIn,
    github: FaGithub,
    twitter: FaTwitter,
    instagram: FaInstagram,
    youtube: FaYoutube,
};

export default function Footer() {
    const { company, contact, navigation, services } = siteConfig;
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    {/* Brand */}
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <LogoMark size={30} />
                            <span className="footer__logo-text">{company.name}</span>
                        </div>
                        <p className="footer__desc">{company.description}</p>
                        <div className="footer__socials">
                            {Object.entries(contact.social).map(([key, url]) => {
                                const Icon = socialIcons[key];
                                return Icon ? (
                                    <a key={key} href={url} className="footer__social" target="_blank" rel="noopener noreferrer" aria-label={key}>
                                        <Icon />
                                    </a>
                                ) : null;
                            })}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="footer__col">
                        <h4 className="footer__heading">Navegación</h4>
                        <ul className="footer__list">
                            {navigation.map((item) => (
                                <li key={item.href}>
                                    <a href={item.href} className="footer__link">{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer__col">
                        <h4 className="footer__heading">Servicios</h4>
                        <ul className="footer__list">
                            {services.slice(0, 6).map((s) => (
                                <li key={s.id}>
                                    <a href="#services" className="footer__link">{s.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer__col">
                        <h4 className="footer__heading">Contacto</h4>
                        <ul className="footer__list footer__list--contact">
                            <li>
                                <FaEnvelope className="footer__icon" />
                                <a href={`mailto:${contact.email}`} className="footer__link">{contact.email}</a>
                            </li>
                            <li>
                                <FaPhone className="footer__icon" />
                                <a href={`tel:${contact.phoneRaw}`} className="footer__link">{contact.phone}</a>
                            </li>
                            <li>
                                <FaMapMarkerAlt className="footer__icon" />
                                <span className="footer__link">{contact.address}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>© {year} {company.name}. Todos los derechos reservados.</p>
                    <div className="footer__bottom-links">
                        <a href="#privacy">Política de Privacidad</a>
                        <a href="#terms">Términos y Condiciones</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
