export const DOH_PROVIDERS = [
  { name: "Cloudflare", url: "https://cloudflare-dns.com/dns-query", weight: 20 },
  { name: "Google", url: "https://dns.google/dns-query", weight: 15 },
  { name: "Quad9", url: "https://dns.quad9.net/dns-query", weight: 15 },
  { name: "OpenDNS", url: "https://doh.opendns.com/dns-query", weight: 10 },
  { name: "AdGuard", url: "https://dns.adguard.com/dns-query", weight: 10 },
  { name: "ControlD", url: "https://freedns.controld.com/p2", weight: 10 },
  { name: "Mullvad", url: "https://adblock.dns.mullvad.net/dns-query", weight: 10 },
  { name: "NextDNS", url: "https://dns.nextdns.io/dns-query", weight: 10 }
];

const CACHE_TTL = 300;

export async function handleDoHRequest(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return handleCORS();

    const isGet = request.method === 'GET';
    const isPost = request.method === 'POST';
    if (!isGet && !isPost) return new Response('Method not allowed', { status: 405 });
    if (isGet && !url.searchParams.has('dns')) return new Response('Missing DNS query parameter', { status: 400 });

    let body = null;
    if (isPost) {
        try {
            body = await request.arrayBuffer();
        } catch (e) {
            console.error('Failed to read request body', e);
            return new Response('Invalid request body', { status: 400 });
        }
    }

    let queryInfo = 'unknown';
    if (isGet) {
        queryInfo = url.searchParams.get('dns');
    } else if (body) {
        queryInfo = `binary(${body.byteLength} bytes)`;
    }

    const selectedProvider = selectProvider(DOH_PROVIDERS);
    console.log(JSON.stringify({
        event: 'doh_start',
        provider: selectedProvider.name,
        query: queryInfo
    }));

    const startTime = Date.now();

    try {
        const targetUrl = selectedProvider.url + url.search;
        const headers = new Headers(request.headers);
        if (isPost) headers.set('Content-Type', 'application/dns-message');
        else headers.set('Accept', 'application/dns-message');
        headers.set('User-Agent', 'DoH-Proxy-Worker/1.0');

        const upstreamRequest = new Request(targetUrl, {
            method: request.method,
            headers: headers,
            body: body,
            redirect: 'follow'
        });

        const response = await fetch(upstreamRequest);

        console.log(JSON.stringify({
            event: 'doh_response',
            provider: selectedProvider.name,
            status: response.status,
            duration_ms: Date.now() - startTime
        }));

        if (!response.ok) {
            throw new Error(`Upstream status ${response.status}`);
        }

        const responseHeaders = new Headers(response.headers);
        responseHeaders.set('Access-Control-Allow-Origin', '*');
        responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Accept');
        responseHeaders.set('Cache-Control', `public, max-age=${CACHE_TTL}`);

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders
        });

    } catch (error) {
        console.warn(JSON.stringify({
            event: 'doh_error',
            provider: selectedProvider.name,
            error: error.message,
            duration_ms: Date.now() - startTime
        }));
        return await tryFallbackProviders(request, url, selectedProvider, body);
    }
}

function handleCORS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Accept',
            'Access-Control-Max-Age': '86400'
        }
    });
}

export function selectProvider(providers) {
    if (!providers || providers.length === 0) return null;
    const totalWeight = providers.reduce((sum, provider) => sum + provider.weight, 0);
    let random = Math.random() * totalWeight;
    for (const provider of providers) {
        if (random < provider.weight) return provider;
        random -= provider.weight;
    }
    return providers[0];
}

async function tryFallbackProviders(request, url, failedProvider, body) {
    const fallbackProviders = DOH_PROVIDERS.filter(p => p.name !== failedProvider.name);
    fallbackProviders.sort(() => Math.random() - 0.5);

    for (const provider of fallbackProviders.slice(0, 2)) {
        console.log(JSON.stringify({
            event: 'doh_fallback_start',
            provider: provider.name,
            previous_failed: failedProvider.name
        }));

        const startTime = Date.now();
        try {
            const targetUrl = provider.url + url.search;
            const headers = new Headers(request.headers);
            if (request.method === 'POST') headers.set('Content-Type', 'application/dns-message');
            else headers.set('Accept', 'application/dns-message');

            const upstreamRequest = new Request(targetUrl, {
                method: request.method,
                headers: headers,
                body: body
            });

            const response = await fetch(upstreamRequest);

            console.log(JSON.stringify({
                event: 'doh_fallback_response',
                provider: provider.name,
                status: response.status,
                duration_ms: Date.now() - startTime
            }));

            if (response.ok) {
                const responseHeaders = new Headers(response.headers);
                responseHeaders.set('Access-Control-Allow-Origin', '*');
                return new Response(response.body, {
                    status: response.status,
                    headers: responseHeaders
                });
            }
        } catch (e) {
             console.warn(JSON.stringify({
                event: 'doh_fallback_error',
                provider: provider.name,
                error: e.message,
                duration_ms: Date.now() - startTime
            }));
            continue;
        }
    }

    console.error(JSON.stringify({ event: 'doh_all_failed' }));
    return new Response('All DNS providers failed', { status: 503 });
}
