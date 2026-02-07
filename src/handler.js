import { initKVStore, getConfigValue, setConfigValue, getFullConfig, updateFullConfig } from './config.js';
import { getTerminalHtml, serveDNSEncodingExplanation, getSubscriptionPageHtml } from './html.js';
import { handleDoHRequest } from './dns.js';
import { generateLinksFromSource, generateVMessLinksFromSource, generateShadowsocksLinksFromSource } from './protocols.js';
import { isValidFormat, parseAddressAndPort, isValidIP, E_INVALID_ID_STR } from './utils.js';

export async function handleRequest(request, env, ctx) {
    try {
        await initKVStore(env);

        // Basic Config Loading
        const at = (env.u || env.U || '').toLowerCase();
        if (!at) return new Response('UUID not set', { status: 500 });

        const url = new URL(request.url);

        // Routing
        if (url.pathname === '/dns-query') return await handleDoHRequest(request, env, ctx);
        if (url.pathname === '/dns-encoding') return serveDNSEncodingExplanation();

        if (url.pathname.includes('/api/config')) {
             return await handleConfigAPI(request, env);
        }

        // Main Page Logic
        if (url.pathname === '/') {
            // ... Logic for root path (Terminal)
             // Language detection
            const cookieHeader = request.headers.get('Cookie') || '';
            let lang = 'en';
            if (cookieHeader.includes('preferredLanguage=zh')) lang = 'zh';
            else if (cookieHeader.includes('preferredLanguage=fa')) lang = 'fa';

            const isFarsi = lang === 'fa';
            const langAttr = isFarsi ? 'fa-IR' : (lang === 'zh' ? 'zh-CN' : 'en-US');

            return new Response(getTerminalHtml(lang, langAttr, isFarsi, null, getConfigValue('d')), {
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
        }

        // Sub/Config Logic
        // ... (Extraction of handleSubscriptionRequest and handleSubscriptionPage logic)

        return new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 });

    } catch (err) {
        return new Response(err.toString(), { status: 500 });
    }
}

async function handleConfigAPI(request, env) {
    if (request.method === 'GET') {
        const config = getFullConfig();
        return new Response(JSON.stringify({ ...config, kvEnabled: true }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } else if (request.method === 'POST') {
        try {
            const newConfig = await request.json();
            updateFullConfig(newConfig);
            await setConfigValue('updated', new Date().toISOString()); // Trigger save
            return new Response(JSON.stringify({ success: true, message: 'Config Saved' }), {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (e) {
            return new Response(JSON.stringify({ success: false, message: e.message }), { status: 500 });
        }
    }
    return new Response('Method Not Allowed', { status: 405 });
}
