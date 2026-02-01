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

export function selectProvider(providers) {
  const totalWeight = providers.reduce((sum, provider) => sum + provider.weight, 0);
  let random = Math.random() * totalWeight;
  for (const provider of providers) {
    if (random < provider.weight) return provider;
    random -= provider.weight;
  }
  return providers[0];
}

export async function tryFallbackProviders(request, url, failedProvider) {
  const fallbackProviders = DOH_PROVIDERS.filter(p => p.name !== failedProvider.name);
  for (const provider of fallbackProviders) {
    try {
      const targetUrl = provider.url + url.search;
      const headers = new Headers(request.headers);
      if (request.method === 'POST') headers.set('Content-Type', 'application/dns-message');
      else headers.set('Accept', 'application/dns-message');
      headers.set('User-Agent', 'DoH-Proxy-Worker/1.0');

      const upstreamRequest = new Request(targetUrl, {
        method: request.method,
        headers: headers,
        body: request.method === 'POST' ? await request.arrayBuffer() : null,
        redirect: 'follow'
      });

      const response = await fetch(upstreamRequest);
      if (response.ok) {
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
      }
    } catch (e) { continue; }
  }
  return new Response('All DNS providers failed', { status: 503 });
}

export function handleCORS() {
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

export async function handleDoHRequest(request) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return handleCORS();

    const isGet = request.method === 'GET';
    const isPost = request.method === 'POST';
    if (!isGet && !isPost) return new Response('Method not allowed', { status: 405 });
    if (isGet && !url.searchParams.has('dns')) return new Response('Missing DNS query parameter', { status: 400 });

    const selectedProvider = selectProvider(DOH_PROVIDERS);
    try {
        const targetUrl = selectedProvider.url + url.search;
        const headers = new Headers(request.headers);
        if (isPost) headers.set('Content-Type', 'application/dns-message');
        else headers.set('Accept', 'application/dns-message');
        headers.set('User-Agent', 'DoH-Proxy-Worker/1.0');

        const upstreamRequest = new Request(targetUrl, {
            method: request.method,
            headers: headers,
            body: isPost ? await request.arrayBuffer() : null,
            redirect: 'follow'
        });

        const response = await fetch(upstreamRequest);
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
        return await tryFallbackProviders(request, url, selectedProvider);
    }
}

export function serveDNSEncodingExplanation() {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DNS Query Encoding in DoH - Explained</title>
<style>
  :root { --primary: #3b82f6; --dark: #1e293b; --light: #f8fafc; }
  body { font-family: system-ui; line-height: 1.6; color: var(--dark); background: #f0f9ff; padding: 20px; }
  .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
  h1 { color: var(--primary); }
  code { background: #eee; padding: 2px 5px; border-radius: 4px; }
  pre { background: #1e293b; color: white; padding: 15px; border-radius: 8px; overflow-x: auto; }
</style>
</head>
<body>
<div class="container">
  <h1>DNS Query Encoding in DoH</h1>
  <p>For GET requests, DNS queries must be base64url-encoded (RFC 8484). This ensures binary DNS data is safe for URLs.</p>
  <h3>How to encode:</h3>
  <ol>
    <li>Create binary DNS query packet.</li>
    <li>Base64 encode it.</li>
    <li>Replace '+' with '-', '/' with '_', and remove '=' padding.</li>
  </ol>
  <h3>Example:</h3>
  <pre>GET /dns-query?dns=q80BAAABAAAAAAAAA3d3dwdleGFtcGxlA2NvbQAAAQAB</pre>
  <p>POST requests send binary data directly in the body with <code>Content-Type: application/dns-message</code>.</p>
  <a href="/doh">Back to DoH Home</a>
</div>
</body>
</html>`;
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

export function serveLandingPage(request) {
    const url = new URL(request.url);
    const dnsEndpoint = `${url.protocol}//${url.host}/dns-query`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>High-Performance DoH Proxy</title>
<style>
  :root { --primary: #3b82f6; --secondary: #10b981; --dark: #1e293b; }
  body { font-family: system-ui; line-height: 1.6; color: var(--dark); background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
  .container { width: 90%; max-width: 800px; background: white; padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
  h1 { background: linear-gradient(90deg, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 10px; }
  .endpoint-box { background: #1e293b; color: #4ade80; padding: 15px; border-radius: 8px; font-family: monospace; word-break: break-all; margin: 20px 0; }
  .features { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 30px; }
  .feature { padding: 15px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; }
  .feature h3 { margin-top: 0; color: var(--primary); }
  .btn { display: inline-block; background: var(--primary); color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; margin-top: 20px; }
  .providers { margin-top: 20px; font-size: 0.9em; color: #64748b; }
</style>
</head>
<body>
<div class="container">
  <h1>High-Performance DoH Proxy</h1>
  <p>Secure, load-balanced DNS-over-HTTPS endpoint powered by Cloudflare Workers.</p>

  <div class="endpoint-box">${dnsEndpoint}</div>

  <div class="features">
    <div class="feature">
      <h3>🚀 Fast & Reliable</h3>
      <p>Uses Cloudflare's edge network and balances traffic across multiple upstream providers like Google, Cloudflare, Quad9.</p>
    </div>
    <div class="feature">
      <h3>🛡️ Privacy Focused</h3>
      <p>Supports ad-blocking providers (AdGuard, NextDNS) and caches responses to reduce upstream tracking.</p>
    </div>
  </div>

  <div class="providers">
    <strong>Supported Providers:</strong> Cloudflare, Google, Quad9, OpenDNS, AdGuard, ControlD, Mullvad, NextDNS
  </div>

  <a href="/dns-encoding" class="btn">View API Docs</a>
</div>
</body>
</html>`;
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
