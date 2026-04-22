import { FaWhatsapp } from 'react-icons/fa';
import siteConfig from '../../config/siteConfig';
import './WhatsAppFAB.css';

export default function WhatsAppFAB() {
    const { whatsapp, whatsappMessage } = siteConfig.contact;
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <a
            href={url}
            className="whatsapp-fab"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
        >
            <FaWhatsapp className="whatsapp-fab__icon" />
            <span className="whatsapp-fab__pulse" />
        </a>
    );
}
