/**
 * Theme Utility — Generates CSS custom properties from siteConfig
 */
import siteConfig from '../config/siteConfig';

export function applyTheme() {
    const { theme } = siteConfig;
    const root = document.documentElement;

    Object.entries(theme).forEach(([key, value]) => {
        const cssVar = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        root.style.setProperty(cssVar, value);
    });
}

export function getThemeColor(key) {
    return siteConfig.theme[key] || '';
}

export default { applyTheme, getThemeColor };
