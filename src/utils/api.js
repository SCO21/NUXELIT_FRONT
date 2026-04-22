/**
 * API Utility — Abstracted fetch wrapper
 * Currently returns mock responses. Swap to real API by setting baseUrl.
 */
import siteConfig from '../config/siteConfig';

const { apiEndpoints } = siteConfig;

const apiBase = apiEndpoints.baseUrl;

async function request(endpoint, options = {}) {
    const url = `${apiBase}${endpoint}`;

    // If no baseUrl configured, return mock
    if (!apiBase) {
        console.log(`[API Mock] ${options.method || 'GET'} ${endpoint}`, options.body);
        return { success: true, message: 'Solicitud recibida (modo demo).' };
    }

    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
}

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

export async function getChatbotResponse(message) {
    return request(apiEndpoints.chatbot, {
        method: 'POST',
        body: JSON.stringify({ message }),
    });
}

export async function subscribeNewsletter(email) {
    return request(apiEndpoints.newsletter, {
        method: 'POST',
        body: JSON.stringify({ email }),
    });
}

export default { submitQuote, submitContact, getChatbotResponse, subscribeNewsletter };
