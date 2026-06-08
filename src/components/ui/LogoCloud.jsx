import { InfiniteSlider } from './InfiniteSlider';
import './LogoCloud.css';

export function LogoCloud({ logos, className = '', reverse = false, duration = 35 }) {
  return (
    <div className={`logo-cloud ${className}`}>
      <InfiniteSlider gap={56} reverse={reverse} duration={duration} durationOnHover={duration * 2.5}>
        {logos.map((logo) => (
          <img
            key={`logo-${logo.alt}`}
            src={logo.src}
            alt={logo.alt}
            className="logo-cloud__img"
            loading="lazy"
            draggable={false}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}
