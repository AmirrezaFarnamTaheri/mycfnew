import { getConfigValue } from './config.js';
import { sha224Hash } from './utils.js';

const CF_HTTP_PORTS = [80, 8080, 8880, 2052, 2082, 2086, 2095];
const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];

// Helper to determine if Non-TLS is disabled

export function generateLinksFromSource(list, user, workerDomain, echConfig = null, options = {}) {
    const { disableNonTLS = false, enableDiverseProxies = false } = options;
    const links = [];
    const wsPath = '/?ed=2048';
    const proto = atob('dmxlc3M='); // vless

    list.forEach(item => {
        let nodeNameBase = item.isp.replace(/\s/g, '_');
        if (item.colo && item.colo.trim()) {
            nodeNameBase = `${nodeNameBase}-${item.colo.trim()}`;
        }
        const safeIP = item.ip.includes(':') ? `[${item.ip}]` : item.ip;

        let portsToGenerate = [];

        if (enableDiverseProxies) {
            CF_HTTPS_PORTS.forEach(port => {
                portsToGenerate.push({ port: port, tls: true });
            });
            if (!disableNonTLS) {
                CF_HTTP_PORTS.forEach(port => {
                    portsToGenerate.push({ port: port, tls: false });
                });
            }
        } else {
            if (item.port) {
                const port = parseInt(item.port);
                if (CF_HTTPS_PORTS.includes(port)) {
                    portsToGenerate.push({ port: port, tls: true });
                } else if (CF_HTTP_PORTS.includes(port)) {
                     if (!disableNonTLS) {
                        portsToGenerate.push({ port: port, tls: false });
                     }
                } else {
                     portsToGenerate.push({ port: port, tls: true });
                }
            } else {
                 portsToGenerate.push({ port: 443, tls: true });
                 if (!disableNonTLS) portsToGenerate.push({ port: 80, tls: false });
            }
        }

        portsToGenerate.forEach(p => {
             const { port, tls } = p;
             const suffix = tls ? '-TLS' : '';
             const wsNodeName = `${nodeNameBase}-${port}${suffix}`;
             let link = `${proto}://${user}@${safeIP}:${port}?encryption=none&security=${tls ? 'tls' : 'none'}&type=ws&host=${workerDomain}&path=${encodeURIComponent(wsPath)}`;

             if (tls) {
                 link += `&sni=${workerDomain}&fp=randomized`;
                 if (echConfig) {
                     link += `&alpn=h3,h2,http/1.1&ech=${encodeURIComponent(echConfig)}&fp=chrome`;
                 }
             }

             link += `#${encodeURIComponent(wsNodeName)}`;
             links.push(link);
        });
    });

    return links;
}

export function generateVMessLinksFromSource(list, user, workerDomain, options = {}) {
     const { disableNonTLS = false } = options;
     const links = [];
     const wsPath = '/vm?ed=2048';

     list.forEach(item => {
         let nodeName = item.isp.replace(/\s/g, '_');
         if (item.colo && item.colo.trim()) nodeName += `-${item.colo.trim()}`;
         const port = parseInt(item.port || 443);
         const isTLS = CF_HTTPS_PORTS.includes(port);

         if (!isTLS && disableNonTLS) return;

         const vmessConfig = {
             v: "2",
             ps: nodeName,
             add: item.ip,
             port: port,
             id: user,
             aid: "0",
             scy: "auto",
             net: "ws",
             type: "none",
             host: workerDomain,
             path: wsPath,
             tls: isTLS ? "tls" : "",
             sni: isTLS ? workerDomain : "",
             alpn: isTLS ? "h2,http/1.1" : ""
         };
         const b64 = btoa(JSON.stringify(vmessConfig));
         links.push(`vmess://${b64}`);
     });
     return links;
}

export function generateShadowsocksLinksFromSource(list, user, workerDomain, options = {}) {
    const { disableNonTLS = false } = options;
    const links = [];
    const method = 'chacha20-ietf-poly1305';
    const password = user;
    const wsPath = '/ss?ed=2048';

    list.forEach(item => {
        let nodeName = item.isp.replace(/\s/g, '_');
        if (item.colo && item.colo.trim()) nodeName += `-${item.colo.trim()}`;
        const port = parseInt(item.port || 443);
        const isTLS = CF_HTTPS_PORTS.includes(port);

        if (!isTLS && disableNonTLS) return;

        const userInfo = btoa(`${method}:${password}`);
        let pluginParam = `v2ray-plugin;mode=websocket;host=${workerDomain};path=${encodeURIComponent(wsPath)}`;
        if (isTLS) pluginParam += ';tls';

        links.push(`ss://${userInfo}@${item.ip}:${port}?plugin=${encodeURIComponent(pluginParam)}#${encodeURIComponent(nodeName)}`);
    });
    return links;
}

export async function generateTrojanLinksFromSource(list, user, workerDomain, echConfig = null, options = {}) {
    const { disableNonTLS = false } = options;
    const links = [];
    const passwordHash = await sha224Hash(user);
    const wsPath = '/tr?ed=2048';

    for (const item of list) {
        let nodeName = item.isp.replace(/\s/g, '_');
        if (item.colo && item.colo.trim()) nodeName += `-${item.colo.trim()}`;
        const port = parseInt(item.port || 443);

        // Trojan typically runs over TLS
        const isTLS = port === 443 || CF_HTTPS_PORTS.includes(port);

        if (!isTLS && disableNonTLS) continue;

        const safeIP = item.ip.includes(':') ? `[${item.ip}]` : item.ip;

        let link = `trojan://${passwordHash}@${safeIP}:${port}?security=tls&sni=${workerDomain}&type=ws&host=${workerDomain}&path=${encodeURIComponent(wsPath)}`;

        if (echConfig) {
             link += `&alpn=h3,h2,http/1.1&ech=${encodeURIComponent(echConfig)}&fp=chrome`;
        } else {
             link += `&alpn=h2,http/1.1&fp=chrome`;
        }

        link += `#${encodeURIComponent(nodeName)}`;
        links.push(link);
    }
    return links;
}
