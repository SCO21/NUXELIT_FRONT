/**
 * API Utility — API wrapper for seamless backend integration
 */
import siteConfig from '../config/siteConfig';

const { apiEndpoints } = siteConfig;
const apiBase = apiEndpoints.baseUrl;

async function request(endpoint, options = {}) {
    const url = `${apiBase}${endpoint}`;

    try {
        const response = await fetch(url, {
            headers: { 
                'Content-Type': 'application/json', 
                ...options.headers 
            },
            ...options,
        });

        // Always attempt to parse JSON, even on error statuses, as the API returns standard error schemas
        const data = await response.json().catch(() => null);

        if (!response.ok) {
            const errorMessage = data?.message || `Error ${response.status}: Failed to fetch`;
            const error = new Error(errorMessage);
            error.response = data;
            error.status = response.status;
            throw error;
        }

        return data; 
    } catch (err) {
        console.error(`[API Error] ${options.method || 'GET'} ${endpoint}`, err);
        throw err;
    }
}

// ─── Contact & Quotes ───
export async function submitQuote(data) {
    return request(apiEndpoints.submitQuote, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function submitContact(data) {
    return request(apiEndpoints.submitContact, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

// ─── Newsletter ───
export async function subscribeNewsletter(email) {
    return request(apiEndpoints.newsletterSubscribe, {
        method: 'POST',
        body: JSON.stringify({ email }),
    });
}

export async function unsubscribeNewsletter(email) {
    return request(apiEndpoints.newsletterUnsubscribe, {
        method: 'POST',
        body: JSON.stringify({ email }),
    });
}

// ─── Chatbot Integration ───
export async function startChatbotSession(language = 'es') {
    return request(apiEndpoints.chatbotSession, {
        method: 'POST',
        body: JSON.stringify({ language }),
    });
}

export async function sendChatbotMessage(sessionId, message) {
    return request(apiEndpoints.chatbotMessage, {
        method: 'POST',
        body: JSON.stringify({ sessionId, message }),
    });
}

export async function sendChatbotFeedback(sessionId, messageIndex, rating, comment = '') {
    return request(apiEndpoints.chatbotFeedback, {
        method: 'POST',
        body: JSON.stringify({ sessionId, messageIndex, rating, comment }),
    });
}

// ─── Analytics ───
export async function trackEvent(event, page = window.location.pathname, metadata = {}) {
    // Only track if base URL exists to avoid unnecessary errors when running pure front
    if (apiBase) {
        // Fire and forget, don't wait or throw on tracker
        fetch(`${apiBase}${apiEndpoints.analyticsEvent}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event, page, metadata, sessionId: sessionStorage.getItem('nuxelit_session') }),
        }).catch(() => {});
    }
}

export default { 
    submitQuote, 
    submitContact, 
    subscribeNewsletter, 
    unsubscribeNewsletter,
    startChatbotSession,
    sendChatbotMessage,
    sendChatbotFeedback,
    trackEvent
};
