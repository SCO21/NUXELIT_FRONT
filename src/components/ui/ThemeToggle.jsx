import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import './ThemeToggle.css';

export function ThemeToggle({ className = '' }) {
    const [isDark, setIsDark] = useState(true);

    const handleToggle = () => {
        const next = !isDark;
        setIsDark(next);
        const theme = next ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    };

    return (
        <div
            className={`theme-toggle ${isDark ? 'theme-toggle--dark' : 'theme-toggle--light'} ${className}`}
            onClick={handleToggle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleToggle()}
            aria-label="Toggle theme"
        >
            {/* Moving thumb */}
            <div className={`theme-toggle__thumb ${isDark ? '' : 'theme-toggle__thumb--right'}`}>
                {isDark
                    ? <Moon size={14} strokeWidth={1.5} className="theme-toggle__icon theme-toggle__icon--active" />
                    : <Sun  size={14} strokeWidth={1.5} className="theme-toggle__icon theme-toggle__icon--active" />
                }
            </div>

            {/* Static opposite icon */}
            <div className={`theme-toggle__static ${isDark ? 'theme-toggle__static--right' : 'theme-toggle__static--left'}`}>
                {isDark
                    ? <Sun  size={14} strokeWidth={1.5} className="theme-toggle__icon" />
                    : <Moon size={14} strokeWidth={1.5} className="theme-toggle__icon" />
                }
            </div>
        </div>
    );
}
