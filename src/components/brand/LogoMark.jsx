/**
 * Nuxelit LogoMark — Geometric "N" composed of circuit/node lines
 * inside a hexagonal frame. Represents the nucleus of digital transformation.
 * Pass `size` and uses theme gradient for fill.
 */
export default function LogoMark({ size = 36, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Nuxelit Logo"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary, #6C3CE1)" />
          <stop offset="50%" stopColor="var(--color-secondary, #0EA5E9)" />
          <stop offset="100%" stopColor="var(--color-accent, #F97316)" />
        </linearGradient>
        <linearGradient id="logoGradSubtle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary, #6C3CE1)" />
          <stop offset="100%" stopColor="var(--color-secondary, #0EA5E9)" />
        </linearGradient>
      </defs>

      {/* Outer hexagonal frame */}
      <path
        d="M24 3L42.5 14V34L24 45L5.5 34V14L24 3Z"
        stroke="url(#logoGrad)"
        strokeWidth="2"
        fill="none"
        opacity="0.35"
      />

      {/* Inner geometric "N" shape — stylized circuit */}
      <path
        d="M15 35V13L16 13L33 31V13"
        stroke="url(#logoGradSubtle)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Circuit nodes at key vertices */}
      <circle cx="15" cy="35" r="2.5" fill="url(#logoGrad)" />
      <circle cx="15" cy="13" r="2.5" fill="url(#logoGrad)" />
      <circle cx="33" cy="13" r="2.5" fill="url(#logoGrad)" />
      <circle cx="33" cy="31" r="2" fill="url(#logoGradSubtle)" />

      {/* Center pulse — nucleus spark */}
      <circle cx="24" cy="22" r="3" fill="url(#logoGrad)" opacity="0.85" />
      <circle cx="24" cy="22" r="5" stroke="url(#logoGrad)" strokeWidth="1" fill="none" opacity="0.3">
        <animate attributeName="r" values="5;9;5" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
      </circle>

      {/* Small data-flow dots */}
      <circle cx="20" cy="18" r="1.2" fill="url(#logoGradSubtle)" opacity="0.5" />
      <circle cx="28" cy="26" r="1.2" fill="url(#logoGradSubtle)" opacity="0.5" />
    </svg>
  );
}
