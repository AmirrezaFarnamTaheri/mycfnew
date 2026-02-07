import { initKVStore, getConfigValue, setConfigValue, getFullConfig, updateFullConfig } from './config.js';
import { getTerminalHtml, serveDNSEncodingExplanation, getSubscriptionPageHtml } from './html.js';
import { handleDoHRequest } from './dns.js';
import { generateLinksFromSource, generateVMessLinksFromSource, generateShadowsocksLinksFromSource } from './protocols.js';
import { isValidFormat, parseAddressAndPort, isValidIP, E_INVALID_ID_STR } from './utils.js';

export async function handleRequest(request, env, ctx) {
    const startTime = Date.now();
    const url = new URL(request.url);
    const method = request.method;

    // Log incoming request
    console.log(JSON.stringify({
        event: 'request_start',
        method: method,
        path: url.pathname,
        ip: request.headers.get('cf-connecting-ip') || 'unknown',
        region: request.cf?.colo || 'unknown'
    }));

    let response;
    try {
        await initKVStore(env);

        // Basic Config Loading
        const at = (env.u || env.U || '').toLowerCase();
        if (!at) {
             console.error('UUID not set in environment variables');
             response = new Response('UUID not set', { status: 500 });
        } else {
            // Routing
            if (url.pathname === '/dns-query') {
                response = await handleDoHRequest(request, env, ctx);
            } else if (url.pathname === '/dns-encoding') {
                response = serveDNSEncodingExplanation();
            } else if (url.pathname.includes('/api/config')) {
                 response = await handleConfigAPI(request, env);
            } else if (url.pathname === '/') {
                // Language detection
                const cookieHeader = request.headers.get('Cookie') || '';
                let lang = 'en';
                if (cookieHeader.includes('preferredLanguage=zh')) lang = 'zh';
                else if (cookieHeader.includes('preferredLanguage=fa')) lang = 'fa';

                const isFarsi = lang === 'fa';
                const langAttr = isFarsi ? 'fa-IR' : (lang === 'zh' ? 'zh-CN' : 'en-US');

                response = new Response(getTerminalHtml(lang, langAttr, isFarsi, null, getConfigValue('d')), {
                    headers: { 'Content-Type': 'text/html; charset=utf-8' }
                });
            } else {
                // Sub/Config Logic placeholders/handlers would be here
                // For now, returning 404 as in previous logic
                response = new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 });
            }
        }

    } catch (err) {
        console.error('Unhandled Exception:', err.stack || err);
        response = new Response(err.toString(), { status: 500 });
    } finally {
        const duration = Date.now() - startTime;
        console.log(JSON.stringify({
            event: 'request_end',
            method: method,
            path: url.pathname,
            status: response ? response.status : 500,
            duration_ms: duration
        }));
    }

    return response;
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
            console.error('Config API Error:', e);
            return new Response(JSON.stringify({ success: false, message: e.message }), { status: 500 });
        }
    }
    return new Response('Method Not Allowed', { status: 405 });
}
