import { initKVStore, getConfigValue, setConfigValue, getFullConfig, updateFullConfig } from './config.js';
import { getTerminalHtml, serveDNSEncodingExplanation, getSubscriptionPageHtml } from './html.js';
import { handleDoHRequest } from './dns.js';
import { generateLinksFromSource, generateVMessLinksFromSource, generateShadowsocksLinksFromSource, generateTrojanLinksFromSource } from './protocols.js';
import { isValidFormat, parseAddressAndPort, isValidIP, E_INVALID_ID_STR } from './utils.js';

function checkAuth(request, uuid) {
    const url = new URL(request.url);
    if (url.searchParams.get('u') === uuid) return true;
    const authHeader = request.headers.get('Authorization');
    if (authHeader && authHeader.includes(uuid)) return true;
    return false;
}

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
                 if (!checkAuth(request, at)) {
                     response = new Response(JSON.stringify({ error: 'Unauthorized' }), {
                         status: 401,
                         headers: { 'Content-Type': 'application/json' }
                     });
                 } else {
                     response = await handleConfigAPI(request, env);
                 }
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
                const pathParts = url.pathname.split('/').filter(p => p);
                const uuid = at;
                const pathUuid = pathParts[0]?.toLowerCase();

                if (pathUuid === uuid) {
                    const subPath = pathParts[1];
                    if (!subPath) {
                        // Dashboard
                        const cookieHeader = request.headers.get('Cookie') || '';
                        let lang = 'en';
                        if (cookieHeader.includes('preferredLanguage=zh')) lang = 'zh';
                        else if (cookieHeader.includes('preferredLanguage=fa')) lang = 'fa';
                        const isFarsi = lang === 'fa';
                        const langAttr = isFarsi ? 'fa-IR' : (lang === 'zh' ? 'zh-CN' : 'en-US');

                        response = new Response(getSubscriptionPageHtml(lang, langAttr, isFarsi, null, getFullConfig()), {
                             headers: { 'Content-Type': 'text/html; charset=utf-8' }
                        });
                    } else if (subPath === 'sub') {
                        // Subscription logic
                        response = await handleSubscription(request, env, uuid);
                    } else if (subPath === 'region') {
                         // Region API
                         const region = request.cf?.colo || 'Unknown';
                         response = new Response(JSON.stringify({ region: region, method: 'worker' }), {
                             headers: { 'Content-Type': 'application/json' }
                         });
                    } else {
                         response = new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 });
                    }
                } else {
                    response = new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 });
                }
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
            return new Response(JSON.stringify({ success: false, message: e.message || 'Invalid Request Body' }), { status: 500 });
        }
    }
    return new Response('Method Not Allowed', { status: 405 });
}

async function handleSubscription(request, env, uuid) {
    const url = new URL(request.url);
    const workerDomain = url.hostname;

    // Get stored preferred IPs or default
    const preferredIPs = getConfigValue('yx') || ''; // Comma separated

    let list = [];
    if (preferredIPs) {
         preferredIPs.split(',').forEach(ip => {
             if (ip.trim()) list.push({ ip: ip.trim(), port: 443, isp: 'Preferred', colo: 'UNK' });
         });
    }

    // Fallback to worker domain if no list
    if (list.length === 0) {
        list.push({ ip: '104.16.1.1', port: 443, isp: 'Cloudflare', colo: 'Auto' });
    }

    // Generate links
    let links = [];

    // VLESS
    links = links.concat(generateLinksFromSource(list, uuid, workerDomain));

    // VMess
    links = links.concat(generateVMessLinksFromSource(list, uuid, workerDomain));

    // SS
    links = links.concat(generateShadowsocksLinksFromSource(list, uuid, workerDomain));

    // Trojan
    links = links.concat(await generateTrojanLinksFromSource(list, uuid, workerDomain));

    const body = links.join('\n');
    return new Response(body, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
}
