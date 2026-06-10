/**
 * Theme Utility — sólo establece el atributo data-theme en <html>.
 * Las CSS variables viven en index.css (:root para dark,
 * [data-theme="light"] para light). Sin inline styles.
 */
export function applyTheme(theme = 'dark') {
    document.documentElement.setAttribute('data-theme', theme);
}

export function getThemeColor(key) {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(`--color-${key}`)
        .trim();
}

export default { applyTheme, getThemeColor };
