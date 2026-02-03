// @ts-nocheck
    // CFnew - Terminal v2.9.3
    // Version: v2.9.3
    import { connect } from 'cloudflare:sockets';
    let at = 'uuid';
    let fallbackAddress = '';
    let socks5Config = '';
    let customPreferredIPs = [];
    let customPreferredDomains = [];
    let enableSocksDowngrade = false;
    let disableNonTLS = false;
    let disablePreferred = false;

    let enableRegionMatching = true;
    let currentWorkerRegion = '';
    let manualWorkerRegion = '';
    let piu = '';
    let cp = '';

    let ev = true;
    let et = false;
    let ex = false;
    let evm = false;
    let ess = false;
    let etu = false;
    let ehy = false;
    let eg = false;
    let tp = '';
    // Enable ECH (true to enable, false to disable)
    let enableECH = false;
    // Custom DNS server (Default: https://dns.joeyblog.eu.org/joeyblog)
    let customDNS = 'https://dns.joeyblog.eu.org/joeyblog';
    // Custom ECH domain (Default: cloudflare-ech.com)
    let customECHDomain = 'cloudflare-ech.com';

    let scu = 'https://url.v1.mk/sub';
    // Remote config URL (Hardcoded)
    const remoteConfigUrl = 'https://raw.githubusercontent.com/byJoey/test/refs/heads/main/tist.ini';

    let epd = false;   // Preferred domains disabled by default
    let epi = true;
    let egi = true;
    let enableDiverseProxies = false; // Generate all supported ports for each IP

    let kvStore = null;
    let kvConfig = {};

    const regionMapping = {
        'US': ['🇺🇸 US', 'US', 'United States'],
        'SG': ['🇸🇬 SG', 'SG', 'Singapore'],
        'JP': ['🇯🇵 JP', 'JP', 'Japan'],
        'KR': ['🇰🇷 KR', 'KR', 'South Korea'],
        'DE': ['🇩🇪 DE', 'DE', 'Germany'],
        'SE': ['🇸🇪 SE', 'SE', 'Sweden'],
        'NL': ['🇳🇱 NL', 'NL', 'Netherlands'],
        'FI': ['🇫🇮 FI', 'FI', 'Finland'],
        'GB': ['🇬🇧 GB', 'GB', 'United Kingdom'],
        'FR': ['🇫🇷 FR', 'FR', 'France'],
        'CA': ['🇨🇦 CA', 'CA', 'Canada'],
        'AU': ['🇦🇺 AU', 'AU', 'Australia'],
        'HK': ['🇭🇰 HK', 'HK', 'Hong Kong'],
        'TW': ['🇹🇼 TW', 'TW', 'Taiwan'],
        'IN': ['🇮🇳 IN', 'IN', 'India'],
        'BR': ['🇧🇷 BR', 'BR', 'Brazil'],
        'PL': ['🇵🇱 PL', 'PL', 'Poland'],
        'RU': ['🇷🇺 RU', 'RU', 'Russia'],
        'LV': ['🇱🇻 LV', 'LV', 'Latvia'],
        'IR': ['🇮🇷 IR', 'IR', 'Iran'],
        'Oracle': ['Oracle', 'Oracle'],
        'DigitalOcean': ['DigitalOcean', 'DigitalOcean'],
        'Vultr': ['Vultr', 'Vultr'],
        'Multacom': ['Multacom', 'Multacom']
    };

    let backupIPs = [
        { domain: 'ProxyIP.US.CMLiussss.net', region: 'US', regionCode: 'US', port: 443 },
        { domain: 'ProxyIP.SG.CMLiussss.net', region: 'SG', regionCode: 'SG', port: 443 },
        { domain: 'ProxyIP.JP.CMLiussss.net', region: 'JP', regionCode: 'JP', port: 443 },
        { domain: 'ProxyIP.KR.CMLiussss.net', region: 'KR', regionCode: 'KR', port: 443 },
        { domain: 'ProxyIP.DE.CMLiussss.net', region: 'DE', regionCode: 'DE', port: 443 },
        { domain: 'ProxyIP.SE.CMLiussss.net', region: 'SE', regionCode: 'SE', port: 443 },
        { domain: 'ProxyIP.NL.CMLiussss.net', region: 'NL', regionCode: 'NL', port: 443 },
        { domain: 'ProxyIP.FI.CMLiussss.net', region: 'FI', regionCode: 'FI', port: 443 },
        { domain: 'ProxyIP.GB.CMLiussss.net', region: 'GB', regionCode: 'GB', port: 443 },
        { domain: 'ProxyIP.FR.CMLiussss.net', region: 'FR', regionCode: 'FR', port: 443 },
        { domain: 'ProxyIP.CA.CMLiussss.net', region: 'CA', regionCode: 'CA', port: 443 },
        { domain: 'ProxyIP.AU.CMLiussss.net', region: 'AU', regionCode: 'AU', port: 443 },
        { domain: 'ProxyIP.HK.CMLiussss.net', region: 'HK', regionCode: 'HK', port: 443 },
        { domain: 'ProxyIP.TW.CMLiussss.net', region: 'TW', regionCode: 'TW', port: 443 },
        { domain: 'ProxyIP.IN.CMLiussss.net', region: 'IN', regionCode: 'IN', port: 443 },
        { domain: 'ProxyIP.BR.CMLiussss.net', region: 'BR', regionCode: 'BR', port: 443 },
        { domain: 'ProxyIP.PL.CMLiussss.net', region: 'PL', regionCode: 'PL', port: 443 },
        { domain: 'ProxyIP.RU.CMLiussss.net', region: 'RU', regionCode: 'RU', port: 443 },
        { domain: 'ProxyIP.LV.CMLiussss.net', region: 'LV', regionCode: 'LV', port: 443 },
        { domain: 'ProxyIP.IR.CMLiussss.net', region: 'IR', regionCode: 'IR', port: 443 },
        { domain: 'ProxyIP.Oracle.cmliussss.net', region: 'Oracle', regionCode: 'Oracle', port: 443 },
        { domain: 'ProxyIP.DigitalOcean.CMLiussss.net', region: 'DigitalOcean', regionCode: 'DigitalOcean', port: 443 },
        { domain: 'ProxyIP.Vultr.CMLiussss.net', region: 'Vultr', regionCode: 'Vultr', port: 443 },
        { domain: 'ProxyIP.Multacom.CMLiussss.net', region: 'Multacom', regionCode: 'Multacom', port: 443 }
    ];

    const directDomains = [
        { name: "cloudflare.182682.xyz", domain: "cloudflare.182682.xyz" }, { name: "speed.marisalnc.com", domain: "speed.marisalnc.com" },
        { domain: "freeyx.cloudflare88.eu.org" }, { domain: "bestcf.top" }, { domain: "cdn.2020111.xyz" }, { domain: "cfip.cfcdn.vip" },
        { domain: "cf.0sm.com" }, { domain: "cf.090227.xyz" }, { domain: "cf.zhetengsha.eu.org" }, { domain: "cloudflare.9jy.cc" },
        { domain: "cf.zerone-cdn.pp.ua" }, { domain: "cfip.1323123.xyz" }, { domain: "cnamefuckxxs.yuchen.icu" }, { domain: "cloudflare-ip.mofashi.ltd" },
        { domain: "115155.xyz" }, { domain: "cname.xirancdn.us" }, { domain: "f3058171cad.002404.xyz" }, { domain: "8.889288.xyz" },
        { domain: "cdn.tzpro.xyz" }, { domain: "cf.877771.xyz" }, { domain: "xn--b6gac.eu.org" }
    ];

    const E_INVALID_DATA = atob('aW52YWxpZCBkYXRh');
    const E_INVALID_USER = atob('aW52YWxpZCB1c2Vy');
    const E_UNSUPPORTED_CMD = atob('Y29tbWFuZCBpcyBub3Qgc3VwcG9ydGVk');
    const E_UDP_DNS_ONLY = atob('VURQIHByb3h5IG9ubHkgZW5hYmxlIGZvciBETlMgd2hpY2ggaXMgcG9ydCA1Mw==');
    const E_INVALID_ADDR_TYPE = atob('aW52YWxpZCBhZGRyZXNzVHlwZQ==');
    const E_EMPTY_ADDR = atob('YWRkcmVzc1ZhbHVlIGlzIGVtcHR5');
    const E_WS_NOT_OPEN = atob('d2ViU29ja2V0LmVhZHlTdGF0ZSBpcyBub3Qgb3Blbg==');
    const E_INVALID_ID_STR = atob('U3RyaW5naWZpZWQgaWRlbnRpZmllciBpcyBpbnZhbGlk');
    const E_INVALID_SOCKS_ADDR = atob('SW52YWxpZCBTT0NLUyBhZGRyZXNzIGZvcm1hdA==');
    const E_SOCKS_NO_METHOD = atob('bm8gYWNjZXB0YWJsZSBtZXRob2Rz');
    const E_SOCKS_AUTH_NEEDED = atob('c29ja3Mgc2VydmVyIG5lZWRzIGF1dGg=');
    const E_SOCKS_AUTH_FAIL = atob('ZmFpbCB0byBhdXRoIHNvY2tzIHNlcnZlcg==');
    const E_SOCKS_CONN_FAIL = atob('ZmFpbCB0byBvcGVuIHNvY2tzIGNvbm5lY3Rpb24=');

    let parsedSocks5Config = {};
    let isSocksEnabled = false;

    const ADDRESS_TYPE_IPV4 = 1;
    const ADDRESS_TYPE_URL = 2;
    const ADDRESS_TYPE_IPV6 = 3;

    function isValidFormat(str) {
        const userRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return userRegex.test(str);
    }

    function isValidIP(ip) {
        const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (ipv4Regex.test(ip)) return true;

        const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
        if (ipv6Regex.test(ip)) return true;

        const ipv6ShortRegex = /^::1$|^::$|^(?:[0-9a-fA-F]{1,4}:)*::(?:[0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4}$/;
        if (ipv6ShortRegex.test(ip)) return true;

        return false;
    }

    async function initKVStore(env) {

        if (env.C) {
            try {
                kvStore = env.C;
                await loadKVConfig();
            } catch (error) {
                kvStore = null;
            }
        } else {
        }
    }

    async function loadKVConfig() {

        if (!kvStore) {
            return;
        }

        try {
            const configData = await kvStore.get('c');

            if (configData) {
                kvConfig = JSON.parse(configData);
            } else {
            }
        } catch (error) {
            kvConfig = {};
        }
    }

    async function saveKVConfig() {
        if (!kvStore) {
            return;
        }

        try {
            const configString = JSON.stringify(kvConfig);
            await kvStore.put('c', configString);
        } catch (error) {
            throw error;
        }
    }

    function getConfigValue(key, defaultValue = '') {

        if (kvConfig[key] !== undefined) {
            return kvConfig[key];
        }
        return defaultValue;
    }

    async function setConfigValue(key, value) {
        kvConfig[key] = value;
        await saveKVConfig();
    }

    async function detectWorkerRegion(request) {
        try {
            const cfCountry = request.cf?.country;

            if (cfCountry) {
                const countryToRegion = {
                    'US': 'US', 'SG': 'SG', 'JP': 'JP', 'KR': 'KR',
                    'DE': 'DE', 'SE': 'SE', 'NL': 'NL', 'FI': 'FI', 'GB': 'GB',
                    'FR': 'FR', 'CA': 'CA', 'AU': 'AU', 'HK': 'HK', 'TW': 'TW',
                    'IN': 'IN', 'BR': 'BR', 'PL': 'PL', 'RU': 'RU',
                    'CN': 'SG',
                    'IT': 'DE', 'ES': 'DE', 'CH': 'DE', 'AT': 'DE', // Europe fallbacks
                    'BE': 'NL', 'DK': 'SE', 'NO': 'SE', 'IE': 'GB',
                    'NZ': 'AU', 'MY': 'SG', 'ID': 'SG', 'TH': 'SG', // APAC fallbacks
                    'VN': 'SG', 'PH': 'SG',
                    'BD': 'IN', 'LK': 'IN', 'NP': 'IN', 'PK': 'IN', // South Asia -> IN
                    'AR': 'BR', 'CL': 'BR', 'CO': 'BR', 'PE': 'BR', // South America -> BR
                    'CZ': 'PL', 'SK': 'PL', 'HU': 'PL', 'UA': 'PL', 'BY': 'PL', // Eastern Europe -> PL
                    'KZ': 'RU', 'UZ': 'RU' // Central Asia -> RU
                };

                if (countryToRegion[cfCountry]) {
                    return countryToRegion[cfCountry];
                }
            }

            return 'SG';

        } catch (error) {
            return 'SG';
        }
    }

    async function checkIPAvailability(domain, port = 443, timeout = 2000) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(`https://${domain}`, {
                method: 'HEAD',
                signal: controller.signal,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; CF-IP-Checker/1.0)'
                }
            });

            clearTimeout(timeoutId);
            return response.status < 500;
        } catch (error) {
            return true;
        }
    }

    async function getBestBackupIP(workerRegion = '') {

        if (backupIPs.length === 0) {
            return null;
        }

        const availableIPs = backupIPs.map(ip => ({ ...ip, available: true }));

        if (enableRegionMatching && workerRegion) {
            const sortedIPs = getSmartRegionSelection(workerRegion, availableIPs);
            if (sortedIPs.length > 0) {
                const selectedIP = sortedIPs[0];
                return selectedIP;
            }
        }

        const selectedIP = availableIPs[0];
        return selectedIP;
    }

    function getNearbyRegions(region) {
        const nearbyMap = {
            'US': ['SG', 'JP', 'KR', 'BR'],
            'SG': ['JP', 'KR', 'US', 'IN'],
            'JP': ['SG', 'KR', 'US'],
            'KR': ['JP', 'SG', 'US'],
            'DE': ['NL', 'GB', 'SE', 'FI', 'PL', 'RU'],
            'SE': ['DE', 'NL', 'FI', 'GB', 'PL', 'RU'],
            'NL': ['DE', 'GB', 'SE', 'FI', 'PL'],
            'FI': ['SE', 'DE', 'NL', 'GB', 'RU'],
            'GB': ['DE', 'NL', 'SE', 'FI'],
            'IN': ['SG'],
            'BR': ['US'],
            'PL': ['DE', 'SE', 'FI', 'NL', 'RU'],
            'RU': ['FI', 'SE', 'DE', 'PL'],
            'LV': ['FI', 'SE', 'PL', 'RU'],
            'IR': ['LV', 'SG', 'JP', 'KR', 'DE', 'SE', 'NL', 'FI', 'GB', 'FR', 'PL', 'RU', 'US', 'CA', 'BR', 'IN', 'AU', 'HK', 'TW']
        };

        return nearbyMap[region] || [];
    }

    function getAllRegionsByPriority(region) {
        const nearbyRegions = getNearbyRegions(region);
        const allRegions = ['US', 'SG', 'JP', 'KR', 'DE', 'SE', 'NL', 'FI', 'GB', 'IN', 'BR', 'PL', 'RU', 'LV', 'IR', 'AU', 'HK', 'TW'];

        return [region, ...nearbyRegions, ...allRegions.filter(r => r !== region && !nearbyRegions.includes(r))];
    }

    function getSmartRegionSelection(workerRegion, availableIPs) {

        if (!enableRegionMatching || !workerRegion) {
            return availableIPs;
        }

        const priorityRegions = getAllRegionsByPriority(workerRegion);

        const sortedIPs = [];

        for (const region of priorityRegions) {
            const regionIPs = availableIPs.filter(ip => ip.regionCode === region);
            sortedIPs.push(...regionIPs);
        }

        return sortedIPs;
    }

    function parseAddressAndPort(input) {
        if (input.includes('[') && input.includes(']')) {
            const match = input.match(/^\[([^\]]+)\](?::(\d+))?$/);
            if (match) {
                return {
                    address: match[1],
                    port: match[2] ? parseInt(match[2], 10) : null
                };
            }
        }

        const lastColonIndex = input.lastIndexOf(':');
        if (lastColonIndex > 0) {
            const address = input.substring(0, lastColonIndex);
            const portStr = input.substring(lastColonIndex + 1);
            const port = parseInt(portStr, 10);

            if (!isNaN(port) && port > 0 && port <= 65535) {
                return { address, port };
            }
        }

        return { address: input, port: null };
    }

    function normalizePathToken(token) {
        return token ? token.trim().replace(/^\/+|\/+$/g, '') : '';
    }

    function splitPath(pathname) {
        return pathname.split('/').filter(Boolean);
    }

    function pathEndsWithSegments(pathParts, tailParts, caseInsensitive = false) {
        if (!tailParts.length || tailParts.length > pathParts.length) {
            return false;
        }

        for (let i = 1; i <= tailParts.length; i++) {
            const a = pathParts[pathParts.length - i];
            const b = tailParts[tailParts.length - i];

            if (caseInsensitive) {
                if (a.toLowerCase() !== b.toLowerCase()) {
                    return false;
                }
            } else if (a !== b) {
                return false;
            }
        }

        return true;
    }

    function matchesCustomPath(pathParts, customPath) {
        const token = normalizePathToken(customPath);
        if (!token) {
            return false;
        }

        return pathEndsWithSegments(pathParts, token.split('/'), false);
    }

    function extractUuidFromPathParts(pathParts) {
        if (!pathParts.length) {
            return null;
        }

        const last = pathParts[pathParts.length - 1];
        if (!isValidFormat(last)) {
            return null;
        }

        return last.toLowerCase();
    }

    export default {
        async fetch(request, env, ctx) {
            try {

                await initKVStore(env);

                at = (env.u || env.U || at).toLowerCase();
                const subPath = (env.d || env.D || at).toLowerCase();

                const ci = getConfigValue('p', env.p || env.P);
                let useCustomIP = false;

                const manualRegion = getConfigValue('wk', env.wk || env.WK);
                if (manualRegion && manualRegion.trim()) {
                    manualWorkerRegion = manualRegion.trim().toUpperCase();
                    currentWorkerRegion = manualWorkerRegion;
            } else if (ci && ci.trim()) {
                    useCustomIP = true;
                    currentWorkerRegion = 'CUSTOM';
                } else {
                    currentWorkerRegion = await detectWorkerRegion(request);
                }

                const regionMatchingControl = env.rm || env.RM;
                if (regionMatchingControl && regionMatchingControl.toLowerCase() === 'no') {
                    enableRegionMatching = false;
                }

                const envFallback = getConfigValue('p', env.p || env.P);
                if (envFallback) {
                    fallbackAddress = envFallback.trim();
                }

                socks5Config = getConfigValue('s', env.s || env.S) || socks5Config;
                if (socks5Config) {
                    try {
                        parsedSocks5Config = parseSocksConfig(socks5Config);
                        isSocksEnabled = true;
                    } catch (err) {
                        isSocksEnabled = false;
                    }
                }

                const customPreferred = getConfigValue('yx', env.yx || env.YX);
                if (customPreferred) {
                    try {
                        const preferredList = customPreferred.split(',').map(item => item.trim()).filter(item => item);
                        customPreferredIPs = [];
                        customPreferredDomains = [];

                        preferredList.forEach(item => {

                            let nodeName = '';
                            let addressPart = item;

                            if (item.includes('#')) {
                                const parts = item.split('#');
                                addressPart = parts[0].trim();
                                nodeName = parts[1].trim();
                            }

                            const { address, port } = parseAddressAndPort(addressPart);

                            if (!nodeName) {
                                nodeName = 'CustomPreferred-' + address + (port ? ':' + port : '');
                            }

                            if (isValidIP(address)) {
                                customPreferredIPs.push({
                                    ip: address,
                                    port: port,
                                    isp: nodeName
                                });
                            } else {
                                customPreferredDomains.push({
                                    domain: address,
                                    port: port,
                                    name: nodeName
                                });
                            }
                        });
                    } catch (err) {
                        customPreferredIPs = [];
                        customPreferredDomains = [];
                    }
                }

                const downgradeControl = getConfigValue('qj', env.qj || env.QJ);
                if (downgradeControl && downgradeControl.toLowerCase() === 'no') {
                    enableSocksDowngrade = true;
                }

                const dkbyControl = getConfigValue('dkby', env.dkby || env.DKBY);
                if (dkbyControl && dkbyControl.toLowerCase() === 'yes') {
                    disableNonTLS = true;
                }

                const yxbyControl = env.yxby || env.YXBY;
                if (yxbyControl && yxbyControl.toLowerCase() === 'yes') {
                    disablePreferred = true;
                }

                const vlessControl = getConfigValue('ev', env.ev);
                if (vlessControl !== undefined && vlessControl !== '') {
                    ev = vlessControl === 'yes' || vlessControl === true || vlessControl === 'true';
                }

            const tjControl = getConfigValue('et', env.et);
            if (tjControl !== undefined && tjControl !== '') {
                et = tjControl === 'yes' || tjControl === true || tjControl === 'true';
            }

                tp = getConfigValue('tp', env.tp) || '';

                const xhttpControl = getConfigValue('ex', env.ex);
                if (xhttpControl !== undefined && xhttpControl !== '') {
                    ex = xhttpControl === 'yes' || xhttpControl === true || xhttpControl === 'true';
                }

                const vmessControl = getConfigValue('evm', env.evm);
                if (vmessControl !== undefined && vmessControl !== '') {
                    evm = vmessControl === 'yes' || vmessControl === true || vmessControl === 'true';
                }

                const ssControl = getConfigValue('ess', env.ess);
                if (ssControl !== undefined && ssControl !== '') {
                    ess = ssControl === 'yes' || ssControl === true || ssControl === 'true';
                }

                const tuicControl = getConfigValue('etu', env.etu);
                if (tuicControl !== undefined && tuicControl !== '') {
                    etu = tuicControl === 'yes' || tuicControl === true || tuicControl === 'true';
                }

                const hyControl = getConfigValue('ehy', env.ehy);
                if (hyControl !== undefined && hyControl !== '') {
                    ehy = hyControl === 'yes' || hyControl === true || hyControl === 'true';
                }

                const grpcControl = getConfigValue('eg', env.eg);
                if (grpcControl !== undefined && grpcControl !== '') {
                    eg = grpcControl === 'yes' || grpcControl === true || grpcControl === 'true';
                }

                scu = getConfigValue('scu', env.scu) || 'https://url.v1.mk/sub';

                const preferredDomainsControl = getConfigValue('epd', env.epd || 'no');
                if (preferredDomainsControl !== undefined && preferredDomainsControl !== '') {
                    epd = preferredDomainsControl !== 'no' && preferredDomainsControl !== false && preferredDomainsControl !== 'false';
                }

                const preferredIPsControl = getConfigValue('epi', env.epi);
                if (preferredIPsControl !== undefined && preferredIPsControl !== '') {
                    epi = preferredIPsControl !== 'no' && preferredIPsControl !== false && preferredIPsControl !== 'false';
                }

                const githubIPsControl = getConfigValue('egi', env.egi);
                if (githubIPsControl !== undefined && githubIPsControl !== '') {
                    egi = githubIPsControl !== 'no' && githubIPsControl !== false && githubIPsControl !== 'false';
                }

                const diverseProxiesControl = getConfigValue('edp', env.edp);
                if (diverseProxiesControl !== undefined && diverseProxiesControl !== '') {
                    enableDiverseProxies = diverseProxiesControl === 'yes' || diverseProxiesControl === true || diverseProxiesControl === 'true';
                }

                const echControl = getConfigValue('ech', env.ech);
                if (echControl !== undefined && echControl !== '') {
                    enableECH = echControl === 'yes' || echControl === true || echControl === 'true';
                }

                // Load custom DNS and ECH domain config
                const customDNSValue = getConfigValue('customDNS', '');
                if (customDNSValue && customDNSValue.trim()) {
                    customDNS = customDNSValue.trim();
                }

                const customECHDomainValue = getConfigValue('customECHDomain', '');
                if (customECHDomainValue && customECHDomainValue.trim()) {
                    customECHDomain = customECHDomainValue.trim();
                }

                // If ECH is enabled, automatically enable TLS-only mode (avoid port 80 interference)
                // ECH requires TLS to work, so non-TLS nodes must be disabled
                if (enableECH) {
                    disableNonTLS = true;
                    // Check if dkby: yes exists in KV, if not, write it directly
                    const currentDkby = getConfigValue('dkby', '');
                    if (currentDkby !== 'yes') {
                        await setConfigValue('dkby', 'yes');
                    }
                }

                if (!ev && !et && !ex && !evm && !ess) {
                    ev = true;
                }

            piu = getConfigValue('yxURL', env.yxURL || env.YXURL) || 'https://raw.githubusercontent.com/qwer-search/bestip/refs/heads/main/kejilandbestip.txt';

            cp = getConfigValue('d', env.d || env.D) || '';

                const defaultURL = 'https://raw.githubusercontent.com/qwer-search/bestip/refs/heads/main/kejilandbestip.txt';
            if (piu !== defaultURL) {
                    directDomains.length = 0;
                    customPreferredIPs = [];
                    customPreferredDomains = [];
                }

                const url = new URL(request.url);

            if (url.pathname === '/dns-query') return await handleDoHRequest(request, env, ctx);
            if (url.pathname === '/dns-encoding') return serveDNSEncodingExplanation();

                if (url.pathname.includes('/api/config')) {
                    const pathParts = splitPath(url.pathname);
                    const apiIndex = pathParts.findIndex(p => p.toLowerCase() === 'api');

                    if (apiIndex > 0) {
                        const accessParts = pathParts.slice(0, apiIndex);

                        let isValid = false;
                        if (cp && cp.trim()) {
                            isValid = matchesCustomPath(accessParts, cp);
                        } else {
                            const user = extractUuidFromPathParts(accessParts);
                            isValid = !!user && user === at;
                        }

                        if (isValid) {
                            return await handleConfigAPI(request);
                        }

                        return new Response(JSON.stringify({ error: '路径验证失败' }), {
                            status: 403,
                            headers: { 'Content-Type': 'application/json' }
                        });
                    }

                    return new Response(JSON.stringify({ error: 'Invalid API Path' }), {
                        status: 404,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                if (url.pathname.includes('/api/preferred-ips')) {
                    const pathParts = splitPath(url.pathname);
                    const apiIndex = pathParts.findIndex(p => p.toLowerCase() === 'api');

                    if (apiIndex > 0) {
                        const accessParts = pathParts.slice(0, apiIndex);

                        let isValid = false;
                        if (cp && cp.trim()) {
                            isValid = matchesCustomPath(accessParts, cp);
                        } else {
                            const user = extractUuidFromPathParts(accessParts);
                            isValid = !!user && user === at;
                        }

                        if (isValid) {
                            return await handlePreferredIPsAPI(request);
                        }

                        return new Response(JSON.stringify({ error: '路径验证失败' }), {
                            status: 403,
                            headers: { 'Content-Type': 'application/json' }
                        });
                    }

                    return new Response(JSON.stringify({ error: 'Invalid API Path' }), {
                        status: 404,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

            if (request.method === 'POST' && request.headers.get('content-type') === 'application/grpc' && eg) {
                return await handleGrpcRequest(request);
            }

            if (request.method === 'POST' && ex) {
                const r = await handleXhttpPost(request);
                if (r instanceof Response) {
                    return r;
                }
                if (r && typeof r === 'object' && 'readable' in r && 'closed' in r) {
                    ctx.waitUntil(r.closed);
                    return new Response(r.readable, {
                        headers: {
                            'X-Accel-Buffering': 'no',
                            'Cache-Control': 'no-store',
                            Connection: 'keep-alive',
                            'User-Agent': 'Go-http-client/2.0',
                            'Content-Type': 'application/grpc',
                        },
                    });
                }
                return new Response('Internal Server Error', { status: 500 });
            }

            if (request.headers.get('Upgrade') === atob('d2Vic29ja2V0')) {
                return await handleWsRequest(request);
                }

                if (request.method === 'GET') {
                    // Handle /{UUID}/region or /{CustomPath}/region
                    if (url.pathname.endsWith('/region')) {
                        const pathParts = splitPath(url.pathname);

                        if (pathParts.length >= 2 && pathParts[pathParts.length - 1].toLowerCase() === 'region') {
                            const accessParts = pathParts.slice(0, -1);
                            let isValid = false;

                            if (cp && cp.trim()) {
                                isValid = matchesCustomPath(accessParts, cp);
                            } else {
                                const user = extractUuidFromPathParts(accessParts);
                                isValid = !!user && user === at;
                            }

                            if (isValid) {
                                const ci = getConfigValue('p', env.p || env.P);
                                const manualRegion = getConfigValue('wk', env.wk || env.WK);

                                if (manualRegion && manualRegion.trim()) {
                                    return new Response(JSON.stringify({
                                        region: manualRegion.trim().toUpperCase(),
                                        detectionMethod: 'Manual Region',
                                        manualRegion: manualRegion.trim().toUpperCase(),
                                        timestamp: new Date().toISOString()
                                    }), {
                                        headers: { 'Content-Type': 'application/json' }
                                    });
                                } else if (ci && ci.trim()) {
                                    return new Response(JSON.stringify({
                                        region: 'CUSTOM',
                                        detectionMethod: 'Custom ProxyIP Mode', ci: ci,
                                        timestamp: new Date().toISOString()
                                    }), {
                                        headers: { 'Content-Type': 'application/json' }
                                    });
                                } else {
                                    const detectedRegion = await detectWorkerRegion(request);
                                    return new Response(JSON.stringify({
                                        region: detectedRegion,
                                        detectionMethod: 'API Detection',
                                        timestamp: new Date().toISOString()
                                    }), {
                                        headers: { 'Content-Type': 'application/json' }
                                    });
                                }
                            } else {
                                return new Response(JSON.stringify({
                                    error: 'Access Denied',
                                    message: 'Path Validation Failed'
                                }), {
                                    status: 403,
                                    headers: { 'Content-Type': 'application/json' }
                                });
                            }
                        }
                    }

                    // Handle /{UUID}/test-api or /{CustomPath}/test-api
                    if (url.pathname.endsWith('/test-api')) {
                        const pathParts = splitPath(url.pathname);

                        if (pathParts.length >= 2 && pathParts[pathParts.length - 1].toLowerCase() === 'test-api') {
                            const accessParts = pathParts.slice(0, -1);
                            let isValid = false;

                            if (cp && cp.trim()) {
                                isValid = matchesCustomPath(accessParts, cp);
                            } else {
                                const user = extractUuidFromPathParts(accessParts);
                                isValid = !!user && user === at;
                            }

                            if (isValid) {
                                try {
                                    const testRegion = await detectWorkerRegion(request);
                                    return new Response(JSON.stringify({
                                        detectedRegion: testRegion,
                                        message: 'API Test Completed',
                                        timestamp: new Date().toISOString()
                                    }), {
                                        headers: { 'Content-Type': 'application/json' }
                                    });
                                } catch (error) {
                                    return new Response(JSON.stringify({
                                        error: error.message,
                                        message: 'API Test Failed'
                                    }), {
                                        status: 500,
                                        headers: { 'Content-Type': 'application/json' }
                                    });
                                }
                            } else {
                                return new Response(JSON.stringify({
                                    error: 'Access Denied',
                                    message: 'Path Validation Failed'
                                }), {
                                    status: 403,
                                    headers: { 'Content-Type': 'application/json' }
                                });
                            }
                        }
                    }

                    if (url.pathname === '/') {
                        // Check for custom homepage URL configuration
                        const customHomepage = getConfigValue('homepage', env.homepage || env.HOMEPAGE);
                        if (customHomepage && customHomepage.trim()) {
                            try {
                const homepageUrl = new URL(customHomepage.trim());
                if (homepageUrl.protocol !== 'https:') {
                    throw new Error('Invalid homepage URL protocol');
                }

            if (homepageUrl.hostname === url.hostname) {
                throw new Error('Homepage loop detected');
            }

                                // Fetch content from custom URL
                const homepageResponse = await fetch(homepageUrl.toString(), {
                                    method: 'GET',
                                    headers: {
                                        'User-Agent': request.headers.get('User-Agent') || 'Mozilla/5.0',
                                        'Accept': request.headers.get('Accept') || '*/*',
                                        'Accept-Language': request.headers.get('Accept-Language') || 'en-US,en;q=0.9',
                                    },
                                    redirect: 'follow'
                                });

                                if (homepageResponse.ok) {
                                    // 获取响应内容
                                    const contentType = homepageResponse.headers.get('Content-Type') || 'text/html; charset=utf-8';
                                    const content = await homepageResponse.text();

                                    // Return custom homepage content
                                    return new Response(content, {
                                        status: homepageResponse.status,
                                        headers: {
                                            'Content-Type': contentType,
                                            'Cache-Control': 'no-cache, no-store, must-revalidate',
                                        }
                                    });
                                }
                            } catch (error) {
                                // If fetch fails, continue using default terminal page
                                console.error('Failed to fetch custom homepage:', error);
                            }
                        }
                        // Prioritize language settings from Cookie
                        const cookieHeader = request.headers.get('Cookie') || '';
                        let langFromCookie = null;
                        if (cookieHeader) {
                            const cookies = cookieHeader.split(';').map(c => c.trim());
                            for (const cookie of cookies) {
                                if (cookie.startsWith('preferredLanguage=')) {
                                    langFromCookie = cookie.split('=')[1];
                                    break;
                                }
                            }
                        }

                        let lang = 'en';

                        if (langFromCookie) {
                            if (langFromCookie === 'fa' || langFromCookie === 'fa-IR') {
                                lang = 'fa';
                            } else if (langFromCookie === 'zh' || langFromCookie === 'zh-CN' || langFromCookie === 'zh-Hans') {
                                lang = 'zh';
                            } else {
                                lang = 'en';
                            }
                        } else {
                            // If no Cookie, use browser language detection
                            const acceptLanguage = request.headers.get('Accept-Language') || '';
                            const browserLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
                            if (browserLang === 'fa' || acceptLanguage.includes('fa-IR') || acceptLanguage.includes('fa')) {
                                lang = 'fa';
                            } else if (browserLang === 'zh' || acceptLanguage.includes('zh-CN') || acceptLanguage.includes('zh')) {
                                lang = 'zh';
                            } else {
                                lang = 'en';
                            }
                        }

                        const isFarsi = lang === 'fa';
                        const isZh = lang === 'zh';
                        const langAttr = isFarsi ? 'fa-IR' : (isZh ? 'zh-CN' : 'en-US');

                            const translations = {
                                en: {
                    title: 'Terminal',
                    congratulations: 'Congratulations, you made it!',
                    enterU: 'Please enter the value of your U variable',
                    enterD: 'Please enter the value of your D variable',
                    command: 'Command: connect [',
                    uuid: 'UUID',
                    path: 'PATH',
                    inputU: 'Enter content of U variable and press Enter...',
                    inputD: 'Enter content of D variable and press Enter...',
                    connecting: 'Connecting...',
                    invading: 'Invading...',
                    success: 'Connection successful! Returning result...',
                    error: 'Error: Invalid UUID format',
                    reenter: 'Please re-enter a valid UUID',

                    // Subscription Page Translations
                    subtitle: 'Multi-client Support • Smart Optimization • One-Click Generation',
                    selectClient: '[ Select Client ]',
                    systemStatus: '[ System Status ]',
                    configManagement: '[ Config Management ]',
                    relatedLinks: '[ Related Links ]',
                    checking: 'Checking...',
                    workerRegion: 'Worker Region: ',
                    detectionMethod: 'Detection Method: ',
                    proxyIPStatus: 'ProxyIP Status: ',
                    currentIP: 'Current IP: ',
                    regionMatch: 'Region Match: ',
                    selectionLogic: 'Selection Logic: ',
                    kvStatusChecking: 'Checking KV Status...',
                    kvEnabled: '✅ KV Storage Enabled, Config Management Available',
                    kvDisabled: '⚠️ KV Storage Disabled or Not Configured',
                    specifyRegion: 'Specify Region (wk):',
                    autoDetect: 'Auto Detect',
                    saveRegion: 'Save Region Config',
                    protocolSelection: 'Protocol Selection:',
                    enableVLESS: 'Enable VLESS Protocol',
                    enableVMess: 'Enable VMess Protocol',
                    enableShadowsocks: 'Enable Shadowsocks Protocol',
                    enableTrojan: 'Enable Trojan Protocol',
                    enableXhttp: 'Enable xhttp Protocol',
                    enableTUIC: 'Enable TUIC Protocol',
                    enableHysteria2: 'Enable Hysteria 2 Protocol',
                    enableVLESSgRPC: 'Enable VLESS gRPC Protocol',
                    linkOnlyHint: 'Requires External Backend (Link-Only)',
                    grpcHint: 'Requires Custom Domain (gRPC)',
                    trojanPassword: 'Trojan Password (Optional):',
                    customPath: 'Custom Path (d):',
                    customPathPlaceholder: 'e.g., /secret-path',
                    customIP: 'Custom ProxyIP (p):',
                    customIPPlaceholder: 'e.g., 1.2.3.4 or proxy.example.com',
                    preferredIPs: 'Preferred IP List (yx):',
                    preferredIPsPlaceholder: 'e.g., 1.1.1.1:443#HongKong, 8.8.8.8:443#USA',
                    preferredIPsURL: 'Preferred IP Source URL (yxURL):',
                    latencyTest: 'Latency Test',
                    latencyTestIP: 'Test IP/Domain:',
                    latencyTestIPPlaceholder: 'Enter IP or Domain, comma separated',
                    latencyTestPort: 'Port:',
                    startTest: 'Start Test',
                    stopTest: 'Stop Test',
                    testResult: 'Test Result:',
                    addToYx: 'Add to Preferred List',
                    addSelectedToYx: 'Add Selected to Preferred List',
                    selectAll: 'Select All',
                    deselectAll: 'Deselect All',
                    testingInProgress: 'Testing...',
                    testComplete: 'Test Complete',
                    latencyMs: 'Latency (HTTP Handshake)',
                    timeout: 'Timeout',
                    ipSource: 'IP Source:',
                    manualInput: 'Manual Input',
                    cfRandomIP: 'CF Random IP',
                    urlFetch: 'Fetch from URL',
                    randomCount: 'Generate Count:',
                    fetchURL: 'Fetch URL:',
                    fetchURLPlaceholder: 'Enter URL of IP list',
                    generateIP: 'Generate IP',
                    fetchIP: 'Fetch IP',
                    socks5Config: 'SOCKS5 Config (s):',
                    customHomepage: 'Custom Homepage URL (homepage):',
                    customHomepagePlaceholder: 'e.g., https://example.com',
                    customHomepageHint: 'Set custom URL as homepage camouflage. Content of this URL will be shown when accessing root path /. Leave empty to show default terminal page.',
                    customPathHint: 'Only accessible via this path if set. UUID access will be disabled. Suggest using complex path to prevent scanning.',
                    customIPHint: 'Hide Worker real IP, or solve Cloudflare Loop issue. Supports IP:Port or Domain:Port.',
                    preferredIPsHint: 'Manually specify preferred nodes. Highest priority. Format: IP:Port#Remark.',
                    socks5ConfigHint: 'Format: user:pass@host:port. Worker will connect to target via this proxy.',
                    saveConfig: 'Save Config',
                    advancedControl: 'Advanced Control',
                    subscriptionConverter: 'Sub Converter URL:',
                    builtinPreferred: 'Built-in Preferred Type:',
                    enablePreferredDomain: 'Enable Preferred Domain',
                    enablePreferredIP: 'Enable Preferred IP',
                    enableGitHubPreferred: 'Enable GitHub Default Preferred',
                    enableDiverseProxies: 'Enable Diverse Proxies (Generate all ports)',
                    enableDiverseProxiesHint: 'Generate nodes for all supported ports (80, 443, 2053, etc.) for each IP. Increases subscription size significantly.',
                    allowAPIManagement: 'Allow API Management (ae):',
                    regionMatching: 'Region Matching (rm):',
                    downgradeControl: 'Downgrade Control (qj):',
                    tlsControl: 'TLS Control (dkby):',
                    preferredControl: 'Preferred Control (yxby):',
                    saveAdvanced: 'Save Advanced Config',
                    loading: 'Loading...',
                    currentConfig: '📍 Current Path Config',
                    refreshConfig: 'Refresh Config',
                    resetConfig: 'Reset Config',
                    subscriptionCopied: 'Subscription Link Copied',
                    autoSubscriptionCopied: 'Auto-detected subscription link copied. Client will be recognized by User-Agent.',
                    trojanPasswordPlaceholder: 'Leave empty to use UUID',
                    trojanPasswordHint: 'Set custom Trojan password. Leave empty to use UUID. Client will auto-hash password with SHA224.',
                    protocolHint: 'Multiple protocols can be enabled.<br>• VLESS WS: Standard WebSocket protocol<br>• VMess WS: WebSocket-based VMess (link generation)<br>• Shadowsocks: WebSocket-based SS (link generation)<br>• Trojan: Uses SHA224 password auth<br>• xhttp: HTTP POST camouflage (requires custom domain & gRPC)',
                    enableECH: 'Enable ECH (Encrypted Client Hello)',
                    enableECHHint: 'When enabled, ECH config is fetched from DoH and added to links on every sub refresh',
                    customDNS: 'Custom DNS Server',
                    customDNSPlaceholder: 'e.g., https://dns.joeyblog.eu.org/joeyblog',
                    customDNSHint: 'DNS server for ECH config query (DoH format)',
                    customECHDomain: 'Custom ECH Domain',
                    customECHDomainPlaceholder: 'e.g., cloudflare-ech.com',
                    customECHDomainHint: 'Domain used in ECH config, leave empty for default',
                    saveProtocol: 'Save Protocol Config',
                    subscriptionConverterPlaceholder: 'Default: https://url.v1.mk/sub',
                    subscriptionConverterHint: 'Custom subscription converter API, leave empty for default',
                    builtinPreferredHint: 'Control which built-in preferred nodes are included. Default all enabled.',
                    apiEnabledDefault: 'Default (API Disabled)',
                    apiEnabledYes: 'Enable API Management',
                    apiEnabledHint: '⚠️ Security Warning: Enabling API allows dynamic preferred IP addition. Use only if needed.',
                    regionMatchingDefault: 'Default (Enable Region Match)',
                    regionMatchingNo: 'Disable Region Match',
                    regionMatchingHint: 'Smart region matching disabled when set to "Disable"',
                    downgradeControlDefault: 'Default (Disable Downgrade)',
                    downgradeControlNo: 'Enable Downgrade Mode',
                    downgradeControlHint: 'When enabled: CF Direct Fail -> SOCKS5 -> Fallback',
                    tlsControlDefault: 'Default (Keep All Nodes)',
                    tlsControlYes: 'TLS Nodes Only',
                    tlsControlHint: 'When set to "TLS Nodes Only", non-TLS nodes (e.g., port 80) are not generated',
                    preferredControlDefault: 'Default (Enable Preferred)',
                    preferredControlYes: 'Disable Preferred',
                    preferredControlHint: 'When set to "Disable Preferred", only native address is used',
                    regionNames: {
                        US: '🇺🇸 US', SG: '🇸🇬 Singapore', JP: '🇯🇵 Japan',
                        KR: '🇰🇷 South Korea', DE: '🇩🇪 Germany', SE: '🇸🇪 Sweden', NL: '🇳🇱 Netherlands',
                        FI: '🇫🇮 Finland', GB: '🇬🇧 UK', FR: '🇫🇷 France', CA: '🇨🇦 Canada',
                        AU: '🇦🇺 Australia', HK: '🇭🇰 Hong Kong', TW: '🇹🇼 Taiwan'
                    },
                    terminal: 'Terminal v2.9.3',
                    githubProject: 'GitHub Project',
                    autoDetectClient: 'Auto Detect',
                    selectionLogicText: 'Same Region -> Nearby Region -> Other Regions',
                    customIPDisabledHint: 'Region selection disabled when using Custom ProxyIP',
                    customIPMode: 'Custom ProxyIP Mode (p variable enabled)',
                    customIPModeDesc: 'Custom IP Mode (Region match disabled)',
                    usingCustomProxyIP: 'Using Custom ProxyIP: ',
                    customIPConfig: ' (p variable config)',
                    customIPModeDisabled: 'Custom IP Mode, region selection disabled',
                    manualRegion: 'Manual Region',
                    manualRegionDesc: ' (Manual)',
                    proxyIPAvailable: '10/10 Available (ProxyIP Domain Pre-set)',
                    smartSelection: 'Smart Nearby Selection',
                    sameRegionIP: 'Same Region IP Available (1)',
                    cloudflareDetection: 'Cloudflare Built-in Detection',
                    detectionFailed: 'Detection Failed',
                    apiTestResult: 'API Detection Result: ',
                    apiTestTime: 'Detection Time: ',
                    apiTestFailed: 'API Detection Failed: ',
                    unknownError: 'Unknown Error',
                    apiTestError: 'API Test Failed: ',
                    kvNotConfigured: 'KV Storage not configured. Config management unavailable.\\n\\nPlease in Cloudflare Workers:\\n1. Create KV Namespace\\n2. Bind variable C\\n3. Redeploy',
                    kvNotEnabled: 'KV Storage Not Configured',
                    kvCheckFailed: 'KV Check Failed: Invalid Response',
                    kvCheckFailedStatus: 'KV Check Failed - Status: ',
                    kvCheckFailedError: 'KV Check Failed - Error: ',
                    debugConsoleTitle: 'Debug Console',
                    debugShow: 'Show',
                    debugHide: 'Hide',
                    debugReady: 'Console ready',
                    debugUnknownError: 'Unknown error',
                    debugUnhandledPromise: 'Unhandled promise rejection'
                },
                                fa: {
                                    title: 'ترمینال',
                                    terminal: 'ترمینال',
                                    congratulations: 'تبریک می‌گوییم به شما',
                                    enterU: 'لطفاً مقدار متغیر U خود را وارد کنید',
                                    enterD: 'لطفاً مقدار متغیر D خود را وارد کنید',
                                    command: 'دستور: connect [',
                                    uuid: 'UUID',
                                    path: 'PATH',
                                    inputU: 'محتویات متغیر U را وارد کرده و Enter را بزنید...',
                                    inputD: 'محتویات متغیر D را وارد کرده و Enter را بزنید...',
                                    connecting: 'در حال اتصال...',
                                    invading: 'در حال نفوذ...',
                                    success: 'اتصال موفق! در حال بازگشت نتیجه...',
                                    error: 'خطا: فرمت UUID نامعتبر',
                                    reenter: 'لطفاً UUID معتبر را دوباره وارد کنید',
                                    debugConsoleTitle: 'کنسول اشکال‌زدایی',
                                    debugShow: 'نمایش',
                                    debugHide: 'پنهان کردن',
                                    debugReady: 'کنسول آماده است',
                                    debugUnknownError: 'خطای ناشناخته',
                                    debugUnhandledPromise: 'رد Promise بدون مدیریت'
                                }
                            };
                            translations.fa = Object.assign({}, translations.en, translations.fa);
                            translations.zh = Object.assign({}, translations.en, {
                                title: '终端',
                                terminal: '终端 v2.9.3',
                                congratulations: '恭喜，你成功了！',
                                enterU: '请输入你的 U 变量的值',
                                enterD: '请输入你的 D 变量的值',
                                command: '命令：connect [',
                                uuid: 'UUID',
                                path: '路径',
                                inputU: '输入 U 变量内容并回车...',
                                inputD: '输入 D 变量内容并回车...',
                                connecting: '连接中...',
                                invading: '正在连接...',
                                success: '连接成功！正在返回结果...',
                                error: '错误：UUID 格式无效',
                                reenter: '请重新输入有效的 UUID',
                                debugConsoleTitle: '调试控制台',
                                debugShow: '展开',
                                debugHide: '收起',
                                debugReady: '控制台就绪',
                                debugUnknownError: '未知错误',
                                debugUnhandledPromise: '未处理的 Promise 拒绝'
                            });

                            const t = translations[lang] || translations.en;

                        const terminalHtml = `<!DOCTYPE html>
        <html lang="${langAttr}" dir="${isFarsi ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${t.title}</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&family=Space+Mono:wght@400;700&display=swap');
            :root {
                --bg-0: #040806;
                --bg-1: #071510;
                --panel: rgba(4, 12, 8, 0.9);
                --panel-strong: rgba(2, 10, 6, 0.95);
                --accent: #2cff9a;
                --accent-2: #13d0ff;
                --accent-dim: #00aa6a;
                --text: #d8ffef;
                --muted: #86d4a5;
                --danger: #ff5a5a;
                --glow: 0 0 24px rgba(44, 255, 154, 0.35);
                --font-sans: "Space Grotesk", "Segoe UI", "Noto Sans", sans-serif;
                --font-mono: "Space Mono", "Cascadia Mono", "Consolas", "Courier New", monospace;
            }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: var(--font-mono);
                background:
                    radial-gradient(1200px 600px at 15% -10%, rgba(44, 255, 154, 0.16), transparent 60%),
                    radial-gradient(900px 500px at 90% 120%, rgba(19, 208, 255, 0.12), transparent 60%),
                    linear-gradient(180deg, var(--bg-0) 0%, var(--bg-1) 100%);
                color: var(--accent);
                min-height: 100vh;
                overflow-x: hidden;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            body::before {
                content: "";
                position: fixed;
                inset: 0;
                background-image:
                    linear-gradient(120deg, rgba(44, 255, 154, 0.06), transparent 40%),
                    repeating-linear-gradient(0deg, rgba(0, 255, 170, 0.05) 0 1px, transparent 1px 3px),
                    repeating-linear-gradient(90deg, rgba(0, 255, 170, 0.04) 0 1px, transparent 1px 4px);
                opacity: 0.35;
                pointer-events: none;
                z-index: -1;
            }
            .matrix-bg {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: var(--bg-0);
                z-index: -1;
            }
            @keyframes bg-pulse {
                0%, 100% { background: linear-gradient(45deg, #000 0%, #001100 50%, #000 100%); }
                50% { background: linear-gradient(45deg, #000 0%, #002200 50%, #000 100%); }
            }
            .matrix-rain {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: transparent;
                z-index: -1;
                display: none;
            }
            @keyframes matrix-fall {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(100vh); }
            }
            .matrix-code-rain {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                pointer-events: none; z-index: -1;
                overflow: hidden;
                display: none;
            }
            .matrix-column {
                position: absolute; top: -100%; left: 0;
                color: #00ff00; font-family: "Courier New", monospace;
                font-size: 14px; line-height: 1.2;
                text-shadow: 0 0 5px #00ff00;
            }
            @keyframes matrix-drop {
                0% { top: -100%; opacity: 1; }
                10% { opacity: 1; }
                90% { opacity: 0.3; }
                100% { top: 100vh; opacity: 0; }
            }
            .matrix-column:nth-child(odd) {
                animation-duration: 12s;
                animation-delay: -2s;
            }
            .matrix-column:nth-child(even) {
                animation-duration: 18s;
                animation-delay: -5s;
            }
            .matrix-column:nth-child(3n) {
                animation-duration: 20s;
                animation-delay: -8s;
            }
            .terminal {
                width: 90%; max-width: 800px; height: 500px;
                background: var(--panel);
                border: 1px solid rgba(44, 255, 154, 0.6);
                border-radius: 14px;
                box-shadow: var(--glow), inset 0 0 18px rgba(44, 255, 154, 0.08);
                backdrop-filter: blur(10px);
                position: relative; z-index: 1;
                overflow: hidden;
            }
            .terminal-header {
                background: var(--panel-strong);
                padding: 12px 16px;
                border-bottom: 1px solid rgba(44, 255, 154, 0.35);
                display: flex; align-items: center;
            }
            .terminal-buttons {
                display: flex; gap: 8px;
            }
            .terminal-button {
                width: 12px; height: 12px; border-radius: 50%;
                background: #ff5f57; border: none;
            }
            .terminal-button:nth-child(2) { background: #ffbd2e; }
            .terminal-button:nth-child(3) { background: #28ca42; }
            .terminal-title {
                margin-left: 15px;
                color: var(--text);
                font-size: 13px;
                font-weight: 600;
                font-family: var(--font-sans);
                letter-spacing: 0.2em;
                text-transform: uppercase;
            }
            .terminal-body {
                padding: 20px; height: calc(100% - 50px);
                overflow-y: auto; font-size: 14px;
                line-height: 1.4;
            }
            .terminal-line {
                margin-bottom: 8px; display: flex; align-items: center;
            }
            .terminal-prompt {
                color: var(--accent); margin-right: 10px;
                font-weight: bold;
            }
            .terminal-input {
                background: transparent; border: none; outline: none;
                color: var(--text); font-family: var(--font-mono);
                font-size: 14px; flex: 1;
                caret-color: var(--accent);
            }
            .terminal-input::placeholder {
                color: var(--muted); opacity: 0.75;
            }
            .terminal-input:focus-visible {
                outline: none;
                text-shadow: 0 0 8px rgba(44, 255, 154, 0.6);
            }
            .terminal-cursor {
                display: inline-block; width: 8px; height: 16px;
                background: var(--accent);
                margin-left: 2px;
            }
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
            .terminal-output {
                color: var(--muted); margin: 5px 0;
            }
            .terminal-error {
                color: var(--danger); margin: 5px 0;
            }
            .terminal-success {
                color: #44ff99; margin: 5px 0;
            }
            .matrix-text {
                position: fixed; top: 20px; right: 20px;
                color: var(--accent); font-family: var(--font-sans);
                font-size: 0.75rem; opacity: 0.75;
                letter-spacing: 0.2em;
                text-transform: uppercase;
            }
            @keyframes matrix-flicker {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
            }
            .debug-console {
                position: fixed; right: 20px; bottom: 20px;
                width: 360px; max-width: calc(100% - 40px);
                background: var(--panel-strong);
                border: 1px solid rgba(44, 255, 154, 0.5);
                color: var(--text);
                font-family: var(--font-mono);
                font-size: 12px;
                z-index: 3000;
                box-shadow: var(--glow);
            }
            .debug-console-header {
                display: flex; align-items: center; justify-content: space-between;
                padding: 6px 8px;
                border-bottom: 1px solid rgba(44, 255, 154, 0.35);
                cursor: pointer;
                user-select: none;
            }
            .debug-console-title {
                font-weight: bold;
            }
            .debug-console-toggle {
                background: transparent;
                border: 1px solid rgba(44, 255, 154, 0.6);
                color: var(--accent);
                font-size: 11px;
                padding: 2px 6px;
                cursor: pointer;
            }
            .debug-console-body {
                display: none;
                max-height: 200px;
                overflow-y: auto;
                padding: 8px;
            }
            .debug-console.open .debug-console-body {
                display: block;
            }
            .debug-console-line {
                margin-bottom: 6px;
                white-space: pre-wrap;
                word-break: break-word;
            }
            .debug-console-line.error { color: #ff6666; }
            .debug-console-line.warn { color: #ffaa00; }
            .debug-console-line.info { color: #66ff66; }
            @media (max-width: 720px) {
                .terminal { height: 460px; }
                .matrix-text { display: none; }
            }
            @media (prefers-reduced-motion: reduce) {
                * { animation: none !important; transition: none !important; }
            }
        </style>
    </head>
    <body>
        <div class="matrix-bg"></div>
        <div class="matrix-rain"></div>
        <div class="matrix-code-rain" id="matrixCodeRain"></div>
            <div class="matrix-text">${t.terminal}</div>
            <div style="position: fixed; top: 20px; left: 20px; z-index: 1000;">
                <select id="languageSelector" style="background: rgba(0, 20, 0, 0.9); border: 2px solid #00ff00; color: #00ff00; padding: 8px 12px; font-family: 'Courier New', monospace; font-size: 14px; cursor: pointer; text-shadow: 0 0 5px #00ff00; box-shadow: 0 0 15px rgba(0, 255, 0, 0.4);" onchange="changeLanguage(this.value)">
                    <option value="en" ${lang === 'en' ? 'selected' : ''}>🇺🇸 English</option>
                    <option value="zh" ${lang === 'zh' ? 'selected' : ''}>🇨🇳 中文</option>
                    <option value="fa" ${lang === 'fa' ? 'selected' : ''}>🇮🇷 فارسی</option>
                </select>
            </div>
        <div class="terminal">
            <div class="terminal-header">
                <div class="terminal-buttons">
                    <div class="terminal-button"></div>
                    <div class="terminal-button"></div>
                    <div class="terminal-button"></div>
                </div>
                    <div class="terminal-title">${t.terminal}</div>
            </div>
            <div class="terminal-body" id="terminalBody">
                <div class="terminal-line">
                    <span class="terminal-prompt">root:~$</span>
                        <span class="terminal-output">${t.congratulations}</span>
                </div>
                <div class="terminal-line">
                    <span class="terminal-prompt">root:~$</span>
                        <span class="terminal-output">${cp && cp.trim() ? t.enterD : t.enterU}</span>
                </div>
                <div class="terminal-line">
                    <span class="terminal-prompt">root:~$</span>
                        <span class="terminal-output">${t.command}${cp && cp.trim() ? t.path : t.uuid}]</span>
                </div>
                <div class="terminal-line">
                    <span class="terminal-prompt">root:~$</span>
                        <input type="text" class="terminal-input" id="uuidInput" placeholder="${cp && cp.trim() ? t.inputD : t.inputU}" autofocus>
                    <span class="terminal-cursor"></span>
                </div>
            </div>
        </div>
        <div id="debugConsole" class="debug-console">
            <div class="debug-console-header" id="debugConsoleHeader">
                <span class="debug-console-title">${t.debugConsoleTitle}</span>
                <button type="button" class="debug-console-toggle" id="debugConsoleToggle">${t.debugShow}</button>
            </div>
            <div class="debug-console-body" id="debugConsoleBody"></div>
        </div>
        <script>
            const translations = ${JSON.stringify(translations)};

            function getCookie(name) {
                const value = '; ' + document.cookie;
                const parts = value.split('; ' + name + '=');
                if (parts.length === 2) return parts.pop()?.split(';').shift();
                return null;
            }

            function getPreferredLanguage() {
                const savedLang = localStorage.getItem('preferredLanguage') || getCookie('preferredLanguage') || '';
                const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();

                if (savedLang) {
                    if (savedLang === 'fa' || savedLang === 'fa-IR') return 'fa';
                    if (savedLang === 'zh' || savedLang === 'zh-CN' || savedLang === 'zh-Hans') return 'zh';
                    return 'en';
                }

                if (browserLang.startsWith('fa')) return 'fa';
                if (browserLang.startsWith('zh')) return 'zh';
                return 'en';
            }

            function getTranslations() {
                const lang = getPreferredLanguage();
                const base = translations.en || {};
                const current = translations[lang] || {};
                return Object.assign({}, base, current);
            }

            const t = getTranslations();
            var DEBUG_LOG_QUEUE = [];
            var DEBUG_CONSOLE_READY = false;
            var DEBUG_AUTO_OPEN = false;

            function stringifyConsoleValue(value) {
                if (value === null) return 'null';
                if (value === undefined) return 'undefined';
                if (value instanceof Error) return value.stack || value.message || String(value);
                if (typeof value === 'string') return value;
                if (typeof value === 'object') {
                    try { return JSON.stringify(value); } catch (error) { return String(value); }
                }
                return String(value);
            }

            function formatConsoleArgs(args) {
                return Array.prototype.map.call(args, stringifyConsoleValue).join(' ');
            }

            function ensureDebugConsoleOpen(level) {
                if (level !== 'error' && level !== 'warn') return;
                var consoleEl = document.getElementById('debugConsole');
                var toggleBtn = document.getElementById('debugConsoleToggle');
                if (!consoleEl || !toggleBtn) {
                    DEBUG_AUTO_OPEN = true;
                    return;
                }
                if (!consoleEl.classList.contains('open')) {
                    consoleEl.classList.add('open');
                    toggleBtn.textContent = t.debugHide || 'Hide';
                }
            }

            function debugConsolePush(message, level) {
                var entry = {
                    time: new Date().toISOString(),
                    level: level || 'info',
                    message: typeof message === 'string' ? message : stringifyConsoleValue(message)
                };
                DEBUG_LOG_QUEUE.push(entry);
                ensureDebugConsoleOpen(entry.level);
                if (DEBUG_CONSOLE_READY) {
                    debugConsoleFlush();
                }
            }

            function debugConsoleFlush() {
                if (!DEBUG_CONSOLE_READY) return;
                var body = document.getElementById('debugConsoleBody');
                if (!body) return;
                while (DEBUG_LOG_QUEUE.length) {
                    var entry = DEBUG_LOG_QUEUE.shift();
                    var line = document.createElement('div');
                    line.className = 'debug-console-line ' + entry.level;
                    line.textContent = '[' + entry.time + '] ' + entry.message;
                    body.appendChild(line);
                }
                body.scrollTop = body.scrollHeight;
            }

            function initDebugConsole() {
                var consoleEl = document.getElementById('debugConsole');
                var body = document.getElementById('debugConsoleBody');
                var toggleBtn = document.getElementById('debugConsoleToggle');
                var header = document.getElementById('debugConsoleHeader');
                if (!consoleEl || !body || !toggleBtn || !header) return;

                function toggle() {
                    consoleEl.classList.toggle('open');
                    toggleBtn.textContent = consoleEl.classList.contains('open') ? t.debugHide : t.debugShow;
                }

                header.addEventListener('click', toggle);
                toggleBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    toggle();
                });

                DEBUG_CONSOLE_READY = true;
                debugConsoleFlush();
                debugConsolePush(t.debugReady, 'info');
                if (DEBUG_AUTO_OPEN) {
                    consoleEl.classList.add('open');
                    toggleBtn.textContent = t.debugHide || 'Hide';
                }
            }

            window.addEventListener('error', function(event) {
                var message = event.message || t.debugUnknownError || 'Unknown error';
                var location = '';
                if (event.filename) {
                    location = event.filename + ':' + (event.lineno || 0) + ':' + (event.colno || 0);
                }
                debugConsolePush(message + (location ? ' @ ' + location : ''), 'error');
                if (event.error && event.error.stack) {
                    debugConsolePush(event.error.stack, 'error');
                }
            });

            window.addEventListener('unhandledrejection', function(event) {
                var reason = event.reason;
                if (reason && reason.stack) {
                    debugConsolePush(reason.stack, 'error');
                } else {
                    debugConsolePush(String(reason || t.debugUnhandledPromise), 'error');
                }
            });

            (function() {
                if (!window.console) return;
                var originalLog = console.log;
                var originalInfo = console.info;
                var originalDebug = console.debug;
                var originalError = console.error;
                var originalWarn = console.warn;
                console.log = function() {
                    debugConsolePush(formatConsoleArgs(arguments), 'info');
                    if (originalLog) originalLog.apply(console, arguments);
                };
                console.info = function() {
                    debugConsolePush(formatConsoleArgs(arguments), 'info');
                    if (originalInfo) originalInfo.apply(console, arguments);
                };
                console.debug = function() {
                    debugConsolePush(formatConsoleArgs(arguments), 'info');
                    if (originalDebug) originalDebug.apply(console, arguments);
                };
                console.error = function() {
                    debugConsolePush(formatConsoleArgs(arguments), 'error');
                    if (originalError) originalError.apply(console, arguments);
                };
                console.warn = function() {
                    debugConsolePush(formatConsoleArgs(arguments), 'warn');
                    if (originalWarn) originalWarn.apply(console, arguments);
                };
            })();
            function createMatrixRain() {
                const matrixContainer = document.getElementById('matrixCodeRain');
                const matrixChars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                const columns = Math.floor(window.innerWidth / 18);

                for (let i = 0; i < columns; i++) {
                    const column = document.createElement('div');
                    column.className = 'matrix-column';
                    column.style.left = (i * 18) + 'px';
                    column.style.animationDelay = Math.random() * 15 + 's';
                    column.style.animationDuration = (Math.random() * 15 + 8) + 's';
                    column.style.fontSize = (Math.random() * 4 + 12) + 'px';
                    column.style.opacity = Math.random() * 0.8 + 0.2;

                    let text = '';
                    const charCount = Math.floor(Math.random() * 30 + 20);
                    for (let j = 0; j < charCount; j++) {
                        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                        const brightness = Math.random() > 0.1 ? '#00ff00' : '#00aa00';
                        text += '<span style="color: ' + brightness + ';">' + char + '</span><br>';
                    }
                    column.innerHTML = text;
                    matrixContainer.appendChild(column);
                }

                setInterval(function() {
                    const columns = matrixContainer.querySelectorAll('.matrix-column');
                    columns.forEach(function(column) {
                        if (Math.random() > 0.95) {
                            const chars = column.querySelectorAll('span');
                            if (chars.length > 0) {
                                const randomChar = chars[Math.floor(Math.random() * chars.length)];
                                randomChar.style.color = '#ffffff';
                                setTimeout(function() {
                                    randomChar.style.color = '#00ff00';
                                }, 200);
                            }
                        }
                    });
                }, 100);
            }

            function isValidUUID(uuid) {
                const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                return uuidRegex.test(uuid);
            }

            function addTerminalLine(content, type = 'output') {
                const terminalBody = document.getElementById('terminalBody');
                const line = document.createElement('div');
                line.className = 'terminal-line';

                const prompt = document.createElement('span');
                prompt.className = 'terminal-prompt';
                prompt.textContent = 'root:~$';

                const output = document.createElement('span');
                output.className = 'terminal-' + type;
                output.textContent = content;

                line.appendChild(prompt);
                line.appendChild(output);
                terminalBody.appendChild(line);

                terminalBody.scrollTop = terminalBody.scrollHeight;
            }

            function handleUUIDInput() {
                const input = document.getElementById('uuidInput');
                const inputValue = input.value.trim();
                const cp = '${ cp }';

                if (inputValue) {
                    const basePath = window.location.pathname.replace(/\/$/, '');
                    const prefixPath = basePath === '/' ? '' : basePath;
                    const buildTarget = (suffix) => (prefixPath || '') + suffix;

                    addTerminalLine(atob('Y29ubmVjdCA=') + inputValue, 'output');

                        const translations = {
                            en: {
                    title: 'Terminal',
                    congratulations: 'Congratulations, you made it!',
                    enterU: 'Please enter the value of your U variable',
                    enterD: 'Please enter the value of your D variable',
                    command: 'Command: connect [',
                    uuid: 'UUID',
                    path: 'PATH',
                    inputU: 'Enter content of U variable and press Enter...',
                    inputD: 'Enter content of D variable and press Enter...',
                    connecting: 'Connecting...',
                    invading: 'Invading...',
                    success: 'Connection successful! Returning result...',
                    error: 'Error: Invalid UUID format',
                    reenter: 'Please re-enter a valid UUID',

                    // Subscription Page Translations
                    subtitle: 'Multi-client Support • Smart Optimization • One-Click Generation',
                    selectClient: '[ Select Client ]',
                    systemStatus: '[ System Status ]',
                    configManagement: '[ Config Management ]',
                    relatedLinks: '[ Related Links ]',
                    checking: 'Checking...',
                    workerRegion: 'Worker Region: ',
                    detectionMethod: 'Detection Method: ',
                    proxyIPStatus: 'ProxyIP Status: ',
                    currentIP: 'Current IP: ',
                    regionMatch: 'Region Match: ',
                    selectionLogic: 'Selection Logic: ',
                    kvStatusChecking: 'Checking KV Status...',
                    kvEnabled: '✅ KV Storage Enabled, Config Management Available',
                    kvDisabled: '⚠️ KV Storage Disabled or Not Configured',
                    specifyRegion: 'Specify Region (wk):',
                    autoDetect: 'Auto Detect',
                    saveRegion: 'Save Region Config',
                    protocolSelection: 'Protocol Selection:',
                    enableVLESS: 'Enable VLESS Protocol',
                    enableVMess: 'Enable VMess Protocol',
                    enableShadowsocks: 'Enable Shadowsocks Protocol',
                    enableTrojan: 'Enable Trojan Protocol',
                    enableXhttp: 'Enable xhttp Protocol',
                    enableTUIC: 'Enable TUIC Protocol',
                    enableHysteria2: 'Enable Hysteria 2 Protocol',
                    enableVLESSgRPC: 'Enable VLESS gRPC Protocol',
                    linkOnlyHint: 'Requires External Backend (Link-Only)',
                    grpcHint: 'Requires Custom Domain (gRPC)',
                    trojanPassword: 'Trojan Password (Optional):',
                    customPath: 'Custom Path (d):',
                    customPathPlaceholder: 'e.g., /secret-path',
                    customIP: 'Custom ProxyIP (p):',
                    customIPPlaceholder: 'e.g., 1.2.3.4 or proxy.example.com',
                    preferredIPs: 'Preferred IP List (yx):',
                    preferredIPsPlaceholder: 'e.g., 1.1.1.1:443#HongKong, 8.8.8.8:443#USA',
                    preferredIPsURL: 'Preferred IP Source URL (yxURL):',
                    latencyTest: 'Latency Test',
                    latencyTestIP: 'Test IP/Domain:',
                    latencyTestIPPlaceholder: 'Enter IP or Domain, comma separated',
                    latencyTestPort: 'Port:',
                    startTest: 'Start Test',
                    stopTest: 'Stop Test',
                    testResult: 'Test Result:',
                    addToYx: 'Add to Preferred List',
                    addSelectedToYx: 'Add Selected to Preferred List',
                    selectAll: 'Select All',
                    deselectAll: 'Deselect All',
                    testingInProgress: 'Testing...',
                    testComplete: 'Test Complete',
                    latencyMs: 'Latency (HTTP Handshake)',
                    timeout: 'Timeout',
                    ipSource: 'IP Source:',
                    manualInput: 'Manual Input',
                    cfRandomIP: 'CF Random IP',
                    urlFetch: 'Fetch from URL',
                    randomCount: 'Generate Count:',
                    fetchURL: 'Fetch URL:',
                    fetchURLPlaceholder: 'Enter URL of IP list',
                    generateIP: 'Generate IP',
                    fetchIP: 'Fetch IP',
                    socks5Config: 'SOCKS5 Config (s):',
                    customHomepage: 'Custom Homepage URL (homepage):',
                    customHomepagePlaceholder: 'e.g., https://example.com',
                    customHomepageHint: 'Set custom URL as homepage camouflage. Content of this URL will be shown when accessing root path /. Leave empty to show default terminal page.',
                    customPathHint: 'Only accessible via this path if set. UUID access will be disabled. Suggest using complex path to prevent scanning.',
                    customIPHint: 'Hide Worker real IP, or solve Cloudflare Loop issue. Supports IP:Port or Domain:Port.',
                    preferredIPsHint: 'Manually specify preferred nodes. Highest priority. Format: IP:Port#Remark.',
                    socks5ConfigHint: 'Format: user:pass@host:port. Worker will connect to target via this proxy.',
                    saveConfig: 'Save Config',
                    advancedControl: 'Advanced Control',
                    subscriptionConverter: 'Sub Converter URL:',
                    builtinPreferred: 'Built-in Preferred Type:',
                    enablePreferredDomain: 'Enable Preferred Domain',
                    enablePreferredIP: 'Enable Preferred IP',
                    enableGitHubPreferred: 'Enable GitHub Default Preferred',
                    allowAPIManagement: 'Allow API Management (ae):',
                    regionMatching: 'Region Matching (rm):',
                    downgradeControl: 'Downgrade Control (qj):',
                    tlsControl: 'TLS Control (dkby):',
                    preferredControl: 'Preferred Control (yxby):',
                    saveAdvanced: 'Save Advanced Config',
                    loading: 'Loading...',
                    currentConfig: '📍 Current Path Config',
                    refreshConfig: 'Refresh Config',
                    resetConfig: 'Reset Config',
                    subscriptionCopied: 'Subscription Link Copied',
                    autoSubscriptionCopied: 'Auto-detected subscription link copied. Client will be recognized by User-Agent.',
                    trojanPasswordPlaceholder: 'Leave empty to use UUID',
                    trojanPasswordHint: 'Set custom Trojan password. Leave empty to use UUID. Client will auto-hash password with SHA224.',
                    protocolHint: 'Multiple protocols can be enabled.<br>• VLESS WS: Standard WebSocket protocol<br>• VMess WS: WebSocket-based VMess (link generation)<br>• Shadowsocks: WebSocket-based SS (link generation)<br>• Trojan: Uses SHA224 password auth<br>• xhttp: HTTP POST camouflage (requires custom domain & gRPC)',
                    enableECH: 'Enable ECH (Encrypted Client Hello)',
                    enableECHHint: 'When enabled, ECH config is fetched from DoH and added to links on every sub refresh',
                    customDNS: 'Custom DNS Server',
                    customDNSPlaceholder: 'e.g., https://dns.joeyblog.eu.org/joeyblog',
                    customDNSHint: 'DNS server for ECH config query (DoH format)',
                    customECHDomain: 'Custom ECH Domain',
                    customECHDomainPlaceholder: 'e.g., cloudflare-ech.com',
                    customECHDomainHint: 'Domain used in ECH config, leave empty for default',
                    saveProtocol: 'Save Protocol Config',
                    subscriptionConverterPlaceholder: 'Default: https://url.v1.mk/sub',
                    subscriptionConverterHint: 'Custom subscription converter API, leave empty for default',
                    builtinPreferredHint: 'Control which built-in preferred nodes are included. Default all enabled.',
                    apiEnabledDefault: 'Default (API Disabled)',
                    apiEnabledYes: 'Enable API Management',
                    apiEnabledHint: '⚠️ Security Warning: Enabling API allows dynamic preferred IP addition. Use only if needed.',
                    regionMatchingDefault: 'Default (Enable Region Match)',
                    regionMatchingNo: 'Disable Region Match',
                    regionMatchingHint: 'Smart region matching disabled when set to "Disable"',
                    downgradeControlDefault: 'Default (Disable Downgrade)',
                    downgradeControlNo: 'Enable Downgrade Mode',
                    downgradeControlHint: 'When enabled: CF Direct Fail -> SOCKS5 -> Fallback',
                    tlsControlDefault: 'Default (Keep All Nodes)',
                    tlsControlYes: 'TLS Nodes Only',
                    tlsControlHint: 'When set to "TLS Nodes Only", non-TLS nodes (e.g., port 80) are not generated',
                    preferredControlDefault: 'Default (Enable Preferred)',
                    preferredControlYes: 'Disable Preferred',
                    preferredControlHint: 'When set to "Disable Preferred", only native address is used',
                    regionNames: {
                        US: '🇺🇸 US', SG: '🇸🇬 Singapore', JP: '🇯🇵 Japan',
                        KR: '🇰🇷 South Korea', DE: '🇩🇪 Germany', SE: '🇸🇪 Sweden', NL: '🇳🇱 Netherlands',
                        FI: '🇫🇮 Finland', GB: '🇬🇧 UK', FR: '🇫🇷 France', CA: '🇨🇦 Canada',
                        AU: '🇦🇺 Australia', HK: '🇭🇰 Hong Kong', TW: '🇹🇼 Taiwan'
                    },
                    terminal: 'Terminal v2.9.3',
                    githubProject: 'GitHub Project',
                    autoDetectClient: 'Auto Detect',
                    selectionLogicText: 'Same Region -> Nearby Region -> Other Regions',
                    customIPDisabledHint: 'Region selection disabled when using Custom ProxyIP',
                    customIPMode: 'Custom ProxyIP Mode (p variable enabled)',
                    customIPModeDesc: 'Custom IP Mode (Region match disabled)',
                    usingCustomProxyIP: 'Using Custom ProxyIP: ',
                    customIPConfig: ' (p variable config)',
                    customIPModeDisabled: 'Custom IP Mode, region selection disabled',
                    manualRegion: 'Manual Region',
                    manualRegionDesc: ' (Manual)',
                    proxyIPAvailable: '10/10 Available (ProxyIP Domain Pre-set)',
                    smartSelection: 'Smart Nearby Selection',
                    sameRegionIP: 'Same Region IP Available (1)',
                    cloudflareDetection: 'Cloudflare Built-in Detection',
                    detectionFailed: 'Detection Failed',
                    apiTestResult: 'API Detection Result: ',
                    apiTestTime: 'Detection Time: ',
                    apiTestFailed: 'API Detection Failed: ',
                    unknownError: 'Unknown Error',
                    apiTestError: 'API Test Failed: ',
                    kvNotConfigured: 'KV Storage not configured. Config management unavailable.\n\nPlease in Cloudflare Workers:\n1. Create KV Namespace\n2. Bind variable C\n3. Redeploy',
                    kvNotEnabled: 'KV Storage Not Configured',
                    kvCheckFailed: 'KV Check Failed: Invalid Response',
                    kvCheckFailedStatus: 'KV Check Failed - Status: ',
                    kvCheckFailedError: 'KV Check Failed - Error: ',
                    preferredIPsURLPlaceholder: 'e.g., https://example.com/ips.txt',
                    preferredIPsURLHint: 'Fetch preferred IPs from a URL; supports plain text or CSV.',
                    preferredIPFilterTitle: 'Preferred IP Filters',
                    ipVersionSelection: 'IP Version',
                    ispSelection: 'ISP',
                    ispMobile: 'Mobile',
                    ispUnicom: 'Unicom',
                    ispTelecom: 'Telecom',
                    ipFilterHint: 'Filters only apply to parsed lists; manual entries are unaffected.',
                    threadsLabel: 'Threads',
                    cityFilterAll: 'All cities',
                    cityFilterFastest10: 'Fastest 10',
                    overwriteAdd: 'Replace',
                    appendAdd: 'Append',
                    socks5ConfigPlaceholder: 'e.g., user:pass@host:port',
                    generated: 'Generated',
                    cfRandomIPs: 'CF Random IPs',
                    pleaseEnterUrl: 'Please enter a URL',
                    fetching: 'Fetching...',
                    fetched: 'Fetched',
                    ipCountSuffix: 'IPs',
                    noDataFound: 'No data found',
                    fetchFailed: 'Fetch failed',
                    pleaseEnterIPOrDomain: 'Please enter an IP or domain',
                    testing: 'Testing',
                    testStopped: 'Test stopped',
                    selectAtLeastOne: 'Please select at least one option',
                    saving: 'Saving...',
                    overwritten: 'Replaced',
                    itemsSaved: ' items',
                    appended: 'Appended',
                    saveFailed: 'Save failed',
                    timeoutLabel: 'Timeout',
                    configNotConfigured: 'KV storage not configured. Unable to load config.',
                    configLoadFailed: 'Failed to load config',
                    configLoadFailedStatus: 'Failed to load config: ',
                    currentConfigLabel: 'Current config:\\n',
                    currentConfigEmpty: '(No config)',
                    currentConfigUnset: '(Unset)',
                    pathTypeCustom: 'Usage: Custom Path (d)',
                    pathTypeUUID: 'Usage: UUID Path (u)',
                    currentPathLabel: 'Current path',
                    accessUrlLabel: 'Access URL',
                    echStatusLabel: 'ECH status:',
                    statusEnabled: 'Enabled',
                    statusDisabled: 'Disabled',
                    statusCheckFailed: 'Check failed',
                    configLengthLabel: 'Config length',
                    debugConsoleTitle: 'Debug Console',
                    debugShow: 'Show',
                    debugHide: 'Hide',
                    debugReady: 'Console ready',
                    debugUnknownError: 'Unknown error',
                    debugUnhandledPromise: 'Unhandled promise rejection',
                    kvNotConfiguredSave: 'KV not configured, cannot save. Please configure KV in Cloudflare Workers.',
                    kvNotConfiguredReset: 'KV not configured, cannot reset.',
                    resetConfirm: 'Are you sure you want to reset all configs? This clears KV and reverts to env vars.',
                    resetFailed: 'Reset failed',
                    resetSuccess: 'Config reset',
                    unknown: 'Unknown'
                },
                            fa: {
                                connecting: 'در حال اتصال...',
                                invading: 'در حال نفوذ...',
                                success: 'اتصال موفق! در حال بازگشت نتیجه...',
                                error: 'خطا: فرمت UUID نامعتبر',
                                reenter: 'لطفاً UUID معتبر را دوباره وارد کنید'
                            }
                        };
                        const browserLang = navigator.language || navigator.userLanguage || '';
                        const isFarsi = browserLang.includes('fa') || browserLang.includes('fa-IR');
                        const t = getTranslations();

                    if (cp) {
                        const cleanInput = inputValue.startsWith('/') ? inputValue : '/' + inputValue;
                        addTerminalLine(t.connecting, 'output');
                        setTimeout(() => {
                            addTerminalLine(t.success, 'success');
                            setTimeout(() => {
                                window.location.href = buildTarget(cleanInput);
                            }, 1000);
                        }, 500);
                    } else {
                        const normalizedInput = inputValue.toLowerCase();
                        if (isValidUUID(normalizedInput)) {
                            addTerminalLine(t.invading, 'output');
                            setTimeout(() => {
                                addTerminalLine(t.success, 'success');
                                setTimeout(() => {
                                    window.location.href = buildTarget('/' + normalizedInput);
                                }, 1000);
                            }, 500);
                        } else {
                            addTerminalLine(t.error, 'error');
                            addTerminalLine(t.reenter, 'output');
                        }
                    }

                    input.value = '';
                }
            }

                function changeLanguage(lang) {
                    localStorage.setItem('preferredLanguage', lang);
                    // Set Cookie (valid for 1 year)
                    const expiryDate = new Date();
                    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                    document.cookie = 'preferredLanguage=' + lang + '; path=/; expires=' + expiryDate.toUTCString() + '; SameSite=Lax';
                    // Reload page, do not use URL parameters
                    window.location.reload();
                }

                // Check localStorage and Cookie on page load, and clean up URL parameters
                window.addEventListener('DOMContentLoaded', function() {
                    function getCookie(name) {
                        const value = '; ' + document.cookie;
                        const parts = value.split('; ' + name + '=');
                        if (parts.length === 2) return parts.pop()?.split(';').shift();
                        return null;
                    }

                    const savedLang = localStorage.getItem('preferredLanguage') || getCookie('preferredLanguage');
                    const urlParams = new URLSearchParams(window.location.search);
                    const urlLang = urlParams.get('lang');

                    // If URL has language parameter, remove it and set Cookie
                    if (urlLang) {
                        const currentUrl = new URL(window.location.href);
                        currentUrl.searchParams.delete('lang');
                        const newUrl = currentUrl.toString();

                        // 设置Cookie
                        const expiryDate = new Date();
                        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                        document.cookie = 'preferredLanguage=' + urlLang + '; path=/; expires=' + expiryDate.toUTCString() + '; SameSite=Lax';
                        localStorage.setItem('preferredLanguage', urlLang);

                        // Use history API to remove URL parameter, do not reload page
                        window.history.replaceState({}, '', newUrl);
                    } else if (savedLang) {
                        // If present in localStorage but not in Cookie, sync to Cookie
                        const expiryDate = new Date();
                        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                        document.cookie = 'preferredLanguage=' + savedLang + '; path=/; expires=' + expiryDate.toUTCString() + '; SameSite=Lax';
                    }
                });

            document.addEventListener('DOMContentLoaded', function() {
                initDebugConsole();
                createMatrixRain();
                const input = document.getElementById('uuidInput');
                input.focus();
                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.keyCode === 13) {
                        handleUUIDInput();
                    }
                });
            });
        </script>
    </body>
    </html>`;
                        return new Response(terminalHtml, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
                    }

            if (cp && cp.trim()) {
                const pathParts = splitPath(url.pathname.replace(/\/+$/, ''));
                const isSubRequest = pathParts.length > 0 && pathParts[pathParts.length - 1].toLowerCase() === 'sub';

                if (isSubRequest) {
                    const accessParts = pathParts.slice(0, -1);
                    if (matchesCustomPath(accessParts, cp)) {
                        return await handleSubscriptionRequest(request, at, url);
                    }
                }

                if (matchesCustomPath(pathParts, cp)) {
                    return await handleSubscriptionPage(request, at);
                }

                const user = extractUuidFromPathParts(pathParts);
                if (user) {
                    return new Response(JSON.stringify({
                        error: 'Access Denied',
                        message: 'Custom path mode enabled, UUID access disabled'
                    }), {
                        status: 403,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }
            } else {
                const pathParts = splitPath(url.pathname.replace(/\/+$/, ''));
                const isSubRequest = pathParts.length > 0 && pathParts[pathParts.length - 1].toLowerCase() === 'sub';

                if (isSubRequest) {
                    const user = extractUuidFromPathParts(pathParts.slice(0, -1));
                    if (user) {
                        if (user === at) {
                            return await handleSubscriptionRequest(request, user, url);
                        } else {
                            return new Response(JSON.stringify({ error: 'UUID Error' }), {
                                status: 403,
                                headers: { 'Content-Type': 'application/json' }
                            });
                        }
                    }
                } else if (pathParts.length > 0) {
                    const user = extractUuidFromPathParts(pathParts);
                    if (user) {
                        if (user === at) {
                            return await handleSubscriptionPage(request, user);
                        } else {
                            return new Response(JSON.stringify({ error: 'UUID Error: Please note the variable name is u, not uuid' }), {
                                status: 403,
                                headers: { 'Content-Type': 'application/json' }
                            });
                        }
                    }
                }
            }
                    const normalizedPathname = url.pathname.replace(/\/+$/, '').toLowerCase();
                    const normalizedSubPath = `/${subPath}`.toLowerCase();
                    if (normalizedPathname === normalizedSubPath) {
                        return await handleSubscriptionRequest(request, at);
                    }
                }
                return new Response(JSON.stringify({ error: 'Not Found' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (err) {
                return new Response(err.toString(), { status: 500 });
            }
        },
    };

    function generateQuantumultConfig(links) {
        return btoa(links.join('\n'));
    }

    // Parse VLESS/Trojan links and generate Clash node config
    function parseLinkToClashNode(link) {
        try {
            // Parse VLESS link
            if (link.startsWith('vless://')) {
                const url = new URL(link);
                const name = decodeURIComponent(url.hash.substring(1));
                const uuid = url.username;
                const server = url.hostname;
                const port = parseInt(url.port) || 443;
                const params = new URLSearchParams(url.search);

                const tls = params.get('security') === 'tls' || params.get('tls') === 'true';
                const network = params.get('type') || 'ws';
                const path = params.get('path') || '/?ed=2048';
                const host = params.get('host') || server;
                const servername = params.get('sni') || host;
                const alpn = params.get('alpn') || 'h3,h2,http/1.1';
                const fingerprint = params.get('fp') || params.get('client-fingerprint') || 'chrome';
                const ech = params.get('ech');

                const node = {
                    name: name,
                    type: 'vless',
                    server: server,
                    port: port,
                    uuid: uuid,
                    tls: tls,
                    network: network,
                    'client-fingerprint': fingerprint
                };

                if (tls) {
                    node.servername = servername;
                    node.alpn = alpn.split(',').map(a => a.trim());
                    node['skip-cert-verify'] = false;
                }

                if (network === 'ws') {
                    node['ws-opts'] = {
                        path: path,
                        headers: {
                            Host: host
                        }
                    };
                }

                if (ech) {
                    const echDomain = customECHDomain || 'cloudflare-ech.com';
                    node['ech-opts'] = {
                        enable: true,
                        'query-server-name': echDomain
                    };
                }

                return node;
            }

            // Parse Trojan link
            if (link.startsWith('trojan://')) {
                const url = new URL(link);
                const name = decodeURIComponent(url.hash.substring(1));
                const password = url.username;
                const server = url.hostname;
                const port = parseInt(url.port) || 443;
                const params = new URLSearchParams(url.search);

                const network = params.get('type') || 'ws';
                const path = params.get('path') || '/?ed=2048';
                const host = params.get('host') || server;
                const sni = params.get('sni') || host;
                const alpn = params.get('alpn') || 'h3,h2,http/1.1';
                const ech = params.get('ech');

                const node = {
                    name: name,
                    type: 'trojan',
                    server: server,
                    port: port,
                    password: password,
                    network: network,
                    sni: sni,
                    alpn: alpn.split(',').map(a => a.trim()),
                    'skip-cert-verify': false
                };

                if (network === 'ws') {
                    node['ws-opts'] = {
                        path: path,
                        headers: {
                            Host: host
                        }
                    };
                }

                if (ech) {
                    const echDomain = customECHDomain || 'cloudflare-ech.com';
                    node['ech-opts'] = {
                        enable: true,
                        'query-server-name': echDomain
                    };
                }

                return node;
            }
        } catch (e) {
            return null;
        }
        return null;
    }

    // Generate Clash config
    async function generateClashConfig(links, request, user) {
        // Get Clash config via subscription converter
        const subscriptionUrl = new URL(request.url);
        subscriptionUrl.pathname = subscriptionUrl.pathname.replace(/\/sub$/, '') + '/sub';
        subscriptionUrl.searchParams.set('target', 'base64');
        const encodedUrl = encodeURIComponent(subscriptionUrl.toString());
        const converterUrl = `${scu}?target=clash&url=${encodedUrl}&insert=false&emoji=true&list=false&xudp=false&udp=false&tfo=false&expand=true&scv=false&fdn=false&new_name=true`;

        try {
            const response = await fetch(converterUrl);
            if (!response.ok) {
                throw new Error('订阅转换服务失败');
            }

            let clashConfig = await response.text();

            // If ECH is enabled, add ECH parameters to all nodes
            if (enableECH) {
                // Handle single-line format nodes: - {name: ..., server: ..., ...}
                // Correctly handle nested braces (e.g., ws-opts: {path: "...", headers: {Host: ...}})
                clashConfig = clashConfig.split('\n').map(line => {
                    // Check if it is a node line (starts with "  - {" and contains name: and server:)
                    if (/^\s*-\s*\{/.test(line) && line.includes('name:') && line.includes('server:')) {
                        // Check if ech-opts already exists
                        if (line.includes('ech-opts')) {
                            return line; // 已有 ech-opts，不修改
                        }
                        // Find the position of the last } (search from right to left, handle nested braces)
                        const lastBraceIndex = line.lastIndexOf('}');
                        if (lastBraceIndex > 0) {
                            // Check if there is content before the last }, ensure correct format
                            const beforeBrace = line.substring(0, lastBraceIndex).trim();
                            if (beforeBrace.length > 0) {
                                // Add , ech-opts: {enable: true, query-server-name: ...} before the last }
                                // Ensure there is a space before the comma
                                const echDomain = customECHDomain || 'cloudflare-ech.com';
                                const needsComma = !beforeBrace.endsWith(',') && !beforeBrace.endsWith('{');
                                return line.substring(0, lastBraceIndex) + (needsComma ? ', ' : ' ') + `ech-opts: {enable: true, query-server-name: ${echDomain}}` + line.substring(lastBraceIndex);
                            }
                        }
                    }
                    return line;
                }).join('\n');

                // Handle multi-line format nodes (if any)
                // Only handle single-line format, multi-line format is handled by subscription converter, no extra modification needed
                // If subscription converter returns multi-line format, it is usually already correct
            }

            // Replace DNS nameserver with AliDNS DoH
            clashConfig = clashConfig.replace(/^(\s*nameserver:\s*\n)((?:\s*-\s*[^\n]+\n)*)/m, (match, header, items) => {
                // Replace all nameserver items with AliDNS DoH
                const dnsServer = customDNS || 'https://dns.joeyblog.eu.org/joeyblog';
                return header + `    - ${dnsServer}\n`;
            });

            return clashConfig;
        } catch (e) {
            // If subscription conversion fails, return error
            throw new Error('无法获取 Clash 配置: ' + e.message);
        }
    }

    function generateBase64Config(links) {
        const joinedLinks = links.join('\n');
        // To handle Unicode characters, first encode the string to UTF-8 percent-encoding,
        // then convert the percent-encodings into raw bytes that btoa can process.
        const utf8Bytes = encodeURIComponent(joinedLinks).replace(/%([0-9A-F]{2})/g,
            (match, p1) => String.fromCharCode(parseInt(p1, 16))
        );
        return btoa(utf8Bytes);
    }

    const generateSurgeConfig = generateBase64Config;
    const generateSSConfig = generateBase64Config;
    const generateV2RayConfig = generateBase64Config;
    const generateLoonConfig = generateBase64Config;

    // Global variable to store ECH debug info
    let echDebugInfo = '';

    async function fetchECHConfig(domain) {
        if (!enableECH) {
            echDebugInfo = 'ECH功能已禁用';
            return null;
        }

        echDebugInfo = '';
        const debugSteps = [];

        try {
            // Prioritize using Google DNS to query ECH config for cloudflare-ech.com
            debugSteps.push('尝试使用 Google DNS 查询 cloudflare-ech.com...');
            const echDomainUrl = `https://v.recipes/dns/dns.google/dns-query?name=cloudflare-ech.com&type=65`;
            const echResponse = await fetch(echDomainUrl, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            debugSteps.push(`Google DNS 响应状态: ${echResponse.status}`);

            if (echResponse.ok) {
                const echData = await echResponse.json();
                debugSteps.push(`Google DNS 返回数据: ${JSON.stringify(echData).substring(0, 200)}...`);

                if (echData.Answer && echData.Answer.length > 0) {
                    debugSteps.push(`找到 ${echData.Answer.length} 条答案记录`);
                    for (const answer of echData.Answer) {
                        if (answer.data) {
                            debugSteps.push(`解析答案数据: ${typeof answer.data}, 长度: ${String(answer.data).length}`);
                            // Google DNS 返回的数据格式可能不同，需要解析
                            const dataStr = typeof answer.data === 'string' ? answer.data : JSON.stringify(answer.data);
                            const echMatch = dataStr.match(/ech=([^\s"']+)/);
                            if (echMatch && echMatch[1]) {
                                echDebugInfo = debugSteps.join('\\n') + '\\n✅ 成功从 Google DNS 获取 ECH 配置';
                                return echMatch[1];
                            }
                            // If not found, try using data directly (might be base64 encoded)
                            if (answer.data && !dataStr.includes('ech=')) {
                                try {
                                    const decoded = atob(answer.data);
                                    debugSteps.push(`尝试 base64 解码，解码后长度: ${decoded.length}`);
                                    const decodedMatch = decoded.match(/ech=([^\s"']+)/);
                                    if (decodedMatch && decodedMatch[1]) {
                                        echDebugInfo = debugSteps.join('\\n') + '\\n✅ 成功从 Google DNS (base64解码) 获取 ECH 配置';
                                        return decodedMatch[1];
                                    }
                                } catch (e) {
                                    debugSteps.push(`base64 解码失败: ${e.message}`);
                                }
                            }
                        }
                    }
                } else {
                    debugSteps.push('Google DNS 未返回答案记录');
                }
            } else {
                debugSteps.push(`Google DNS 请求失败: ${echResponse.status}`);
            }

            // If cloudflare-ech.com query fails, try using Google DNS to query HTTPS record of target domain
            debugSteps.push(`尝试使用 Google DNS 查询目标域名 ${domain}...`);
            const dohUrl = `https://v.recipes/dns/dns.google/dns-query?name=${encodeURIComponent(domain)}&type=65`;
            const response = await fetch(dohUrl, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            debugSteps.push(`Google DNS (目标域名) 响应状态: ${response.status}`);

            if (response.ok) {
                const data = await response.json();
                debugSteps.push(`Google DNS (目标域名) 返回数据: ${JSON.stringify(data).substring(0, 200)}...`);

                if (data.Answer && data.Answer.length > 0) {
                    debugSteps.push(`找到 ${data.Answer.length} 条答案记录`);
                    for (const answer of data.Answer) {
                        if (answer.data) {
                            const dataStr = typeof answer.data === 'string' ? answer.data : JSON.stringify(answer.data);
                            const echMatch = dataStr.match(/ech=([^\s"']+)/);
                            if (echMatch && echMatch[1]) {
                                echDebugInfo = debugSteps.join('\\n') + '\\n✅ 成功从 Google DNS (目标域名) 获取 ECH 配置';
                                return echMatch[1];
                            }
                            // Try base64 decoding
                            try {
                                const decoded = atob(answer.data);
                                const decodedMatch = decoded.match(/ech=([^\s"']+)/);
                                if (decodedMatch && decodedMatch[1]) {
                                    echDebugInfo = debugSteps.join('\\n') + '\\n✅ 成功从 Google DNS (目标域名, base64解码) 获取 ECH 配置';
                                    return decodedMatch[1];
                                }
                            } catch (e) {
                                debugSteps.push(`base64 解码失败: ${e.message}`);
                            }
                        }
                    }
                } else {
                    debugSteps.push('Google DNS (目标域名) 未返回答案记录');
                }
            } else {
                debugSteps.push(`Google DNS (目标域名) 请求失败: ${response.status}`);
            }

            // If Google DNS fails, try Cloudflare DNS as fallback
            debugSteps.push('尝试使用 Cloudflare DNS 作为备选...');
            const cfEchUrl = `https://cloudflare-dns.com/dns-query?name=cloudflare-ech.com&type=65`;
            const cfResponse = await fetch(cfEchUrl, {
                headers: {
                    'Accept': 'application/dns-json'
                }
            });

            debugSteps.push(`Cloudflare DNS 响应状态: ${cfResponse.status}`);

            if (cfResponse.ok) {
                const cfData = await cfResponse.json();
                debugSteps.push(`Cloudflare DNS 返回数据: ${JSON.stringify(cfData).substring(0, 200)}...`);

                if (cfData.Answer && cfData.Answer.length > 0) {
                    debugSteps.push(`找到 ${cfData.Answer.length} 条答案记录`);
                    for (const answer of cfData.Answer) {
                        if (answer.data) {
                            const echMatch = answer.data.match(/ech=([^\s"']+)/);
                            if (echMatch && echMatch[1]) {
                                echDebugInfo = debugSteps.join('\\n') + '\\n✅ 成功从 Cloudflare DNS 获取 ECH 配置';
                                return echMatch[1];
                            }
                        }
                    }
                } else {
                    debugSteps.push('Cloudflare DNS 未返回答案记录');
                }
            } else {
                debugSteps.push(`Cloudflare DNS 请求失败: ${cfResponse.status}`);
            }

            echDebugInfo = debugSteps.join('\\n') + '\\n❌ 所有DNS查询均失败，未获取到ECH配置';
            return null;
        } catch (error) {
            echDebugInfo = debugSteps.join('\\n') + '\\n❌ 获取ECH配置时发生错误: ' + error.message;
            return null;
        }
    }

    async function handleSubscriptionRequest(request, user, url = null) {
        if (!url) url = new URL(request.url);

        const finalLinks = [];
        const workerDomain = url.hostname;
        const target = url.searchParams.get('target') || 'base64';

        // If ECH is enabled, use custom value
        let echConfig = null;
        if (enableECH) {
            const dnsServer = customDNS || 'https://dns.joeyblog.eu.org/joeyblog';
            const echDomain = customECHDomain || 'cloudflare-ech.com';
            echConfig = `${echDomain}+${dnsServer}`;
        }

        async function addNodesFromList(list) {
            if (ev) {
                finalLinks.push(...generateLinksFromSource(list, user, workerDomain, echConfig));
            }
            if (et) {
                finalLinks.push(...await generateTrojanLinksFromSource(list, user, workerDomain, echConfig));
            }
            if (ex) {
                finalLinks.push(...generateXhttpLinksFromSource(list, user, workerDomain, echConfig));
            }
            if (evm) {
                finalLinks.push(...generateVMessLinksFromSource(list, user, workerDomain));
            }
            if (ess) {
                finalLinks.push(...generateShadowsocksLinksFromSource(list, user, workerDomain));
            }
            if (etu) {
                finalLinks.push(...generateTuicLinksFromSource(list, user, workerDomain));
            }
            if (ehy) {
                finalLinks.push(...generateHysteria2LinksFromSource(list, user, workerDomain));
            }
            if (eg) {
                finalLinks.push(...generateVlessGrpcLinksFromSource(list, user, workerDomain));
            }
        }

        if (currentWorkerRegion === 'CUSTOM') {
            const nativeList = [{ ip: workerDomain, isp: 'Native Address' }];
            await addNodesFromList(nativeList);
        } else {
            try {
                const nativeList = [{ ip: workerDomain, isp: 'Native Address' }];
                await addNodesFromList(nativeList);
            } catch (error) {
                if (!currentWorkerRegion) {
                    currentWorkerRegion = await detectWorkerRegion(request);
                }

                const bestBackupIP = await getBestBackupIP(currentWorkerRegion);
                if (bestBackupIP) {
                    fallbackAddress = bestBackupIP.domain + ':' + bestBackupIP.port;
                    const backupList = [{ ip: bestBackupIP.domain, isp: 'ProxyIP-' + currentWorkerRegion }];
                    await addNodesFromList(backupList);
                } else {
                    const nativeList = [{ ip: workerDomain, isp: 'Native Address' }];
                    await addNodesFromList(nativeList);
                }
            }
        }

        const hasCustomPreferred = customPreferredIPs.length > 0 || customPreferredDomains.length > 0;

        if (!disablePreferred && hasCustomPreferred) {

            if (customPreferredIPs.length > 0 && epi) {
                await addNodesFromList(customPreferredIPs);
            }

            if (customPreferredDomains.length > 0 && epd) {
                const customDomainList = customPreferredDomains.map(d => ({ ip: d.domain, isp: d.name || d.domain }));
                await addNodesFromList(customDomainList);
            }
        } else if (!disablePreferred) {

            if (epd) {
            const domainList = directDomains.map(d => ({ ip: d.domain, isp: d.name || d.domain }));
                await addNodesFromList(domainList);
            }

            if (epi) {
            const defaultURL = 'https://raw.githubusercontent.com/qwer-search/bestip/refs/heads/main/kejilandbestip.txt';
                if (piu === defaultURL) {
                try {
                    const dynamicIPList = await fetchDynamicIPs();
                    if (dynamicIPList.length > 0) {
                            await addNodesFromList(dynamicIPList);
                    }
                } catch (error) {
                    if (!currentWorkerRegion) {
                        currentWorkerRegion = await detectWorkerRegion(request);
                    }

                    const bestBackupIP = await getBestBackupIP(currentWorkerRegion);
                    if (bestBackupIP) {
                        fallbackAddress = bestBackupIP.domain + ':' + bestBackupIP.port;

                        const backupList = [{ ip: bestBackupIP.domain, isp: 'ProxyIP-' + currentWorkerRegion }];
                            await addNodesFromList(backupList);
                        }
                    }
                }
            }

            if (egi) {
            try {
                const newIPList = await fetchAndParseNewIPs();
                if (newIPList.length > 0) {
                        if (ev) {
                    finalLinks.push(...generateLinksFromNewIPs(newIPList, user, workerDomain, echConfig));
                        }
                        if (et) {
                            finalLinks.push(...await generateTrojanLinksFromNewIPs(newIPList, user, workerDomain, echConfig));
                        }
                        if (evm) {
                            finalLinks.push(...generateVMessLinksFromNewIPs(newIPList, user, workerDomain));
                        }
                        if (ess) {
                            finalLinks.push(...generateShadowsocksLinksFromNewIPs(newIPList, user, workerDomain));
                        }
                        if (etu) {
                            finalLinks.push(...generateTuicLinksFromNewIPs(newIPList, user, workerDomain));
                        }
                        if (ehy) {
                            finalLinks.push(...generateHysteria2LinksFromNewIPs(newIPList, user, workerDomain));
                        }
                        if (eg) {
                            finalLinks.push(...generateVlessGrpcLinksFromNewIPs(newIPList, user, workerDomain));
                        }
                }
            } catch (error) {
                if (!currentWorkerRegion) {
                    currentWorkerRegion = await detectWorkerRegion(request);
                }

                const bestBackupIP = await getBestBackupIP(currentWorkerRegion);
                if (bestBackupIP) {
                    fallbackAddress = bestBackupIP.domain + ':' + bestBackupIP.port;

                    const backupList = [{ ip: bestBackupIP.domain, isp: 'ProxyIP-' + currentWorkerRegion }];
                        await addNodesFromList(backupList);
                    }
                }
            }
        }

        if (finalLinks.length === 0) {
            const errorRemark = "所有节点获取失败";
            const proto = atob('dmxlc3M=');
            const errorLink = `${proto}://00000000-0000-0000-0000-000000000000@127.0.0.1:80?encryption=none&security=none&type=ws&host=error.com&path=%2F#${encodeURIComponent(errorRemark)}`;
            finalLinks.push(errorLink);
        }

        let subscriptionContent;
        let contentType = 'text/plain; charset=utf-8';

        switch (target.toLowerCase()) {
            case atob('Y2xhc2g='):
            case atob('Y2xhc2hy'):
                subscriptionContent = await generateClashConfig(finalLinks, request, user);
                contentType = 'text/yaml; charset=utf-8';
                break;
            case atob('c3VyZ2U='):
            case atob('c3VyZ2Uy'):
            case atob('c3VyZ2Uz'):
            case atob('c3VyZ2U0'):
                subscriptionContent = generateSurgeConfig(finalLinks);
                break;
            case atob('cXVhbnR1bXVsdA=='):
            case atob('cXVhbng='):
            case 'quanx':
                subscriptionContent = generateQuantumultConfig(finalLinks);
                break;
            case atob('c3M='):
            case atob('c3Ny'):
                subscriptionContent = generateSSConfig(finalLinks);
                break;
            case atob('djJyYXk='):
                subscriptionContent = generateV2RayConfig(finalLinks);
                break;
            case atob('bG9vbg=='):
                subscriptionContent = generateLoonConfig(finalLinks);
                break;
            default:
                subscriptionContent = btoa(finalLinks.join('\n'));
        }

        const responseHeaders = {
            'Content-Type': contentType,
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        };

        // 添加ECH状态到响应头
        if (enableECH) {
            responseHeaders['X-ECH-Status'] = 'ENABLED';
            if (echConfig) {
                responseHeaders['X-ECH-Config-Length'] = String(echConfig.length);
            }
        }

        return new Response(subscriptionContent, {
            headers: responseHeaders,
        });
    }

    function generateLinksFromSource(list, user, workerDomain, echConfig = null) {

        const CF_HTTP_PORTS = [80, 8080, 8880, 2052, 2082, 2086, 2095];
        const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];

        const defaultHttpsPorts = [443];
        const defaultHttpPorts = disableNonTLS ? [] : [80];
        const links = [];
        const wsPath = '/?ed=2048';
        const proto = atob('dmxlc3M=');

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
                    const port = item.port;
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
                    defaultHttpsPorts.forEach(port => {
                        portsToGenerate.push({ port: port, tls: true });
                    });
                    defaultHttpPorts.forEach(port => {
                        portsToGenerate.push({ port: port, tls: false });
                    });
                }
            }

            portsToGenerate.forEach(({ port, tls }) => {
                if (tls) {

                    const wsNodeName = `${nodeNameBase}-${port}-WS-TLS`;
                    const wsParams = new URLSearchParams({
                        encryption: 'none',
                        security: 'tls',
                        sni: workerDomain,
                        fp: enableECH ? 'chrome' : 'randomized',
                        type: 'ws',
                        host: workerDomain,
                        path: wsPath
                    });

                    // If ECH is enabled, add ech parameter (ECH requires masquerading as Chrome browser)
                    if (enableECH) {
                        const dnsServer = customDNS || 'https://dns.joeyblog.eu.org/joeyblog';
                        const echDomain = customECHDomain || 'cloudflare-ech.com';
                        wsParams.set('alpn', 'h3,h2,http/1.1');
                        wsParams.set('ech', `${echDomain}+${dnsServer}`);
                    }

                    links.push(`${proto}://${user}@${safeIP}:${port}?${wsParams.toString()}#${encodeURIComponent(wsNodeName)}`);
                } else {

                    const wsNodeName = `${nodeNameBase}-${port}-WS`;
                    const wsParams = new URLSearchParams({
                        encryption: 'none',
                        security: 'none',
                        type: 'ws',
                        host: workerDomain,
                        path: wsPath
                    });
                    links.push(`${proto}://${user}@${safeIP}:${port}?${wsParams.toString()}#${encodeURIComponent(wsNodeName)}`);
                }
            });
        });
        return links;
    }

    function generateTuicLinksFromSource(list, user, workerDomain) {
        const links = [];
        list.forEach(item => {
            const nodeName = item.isp.replace(/\s/g, '_') + (item.colo ? `-${item.colo}` : '');
            const port = item.port || 443;
            links.push(`tuic://${user}:${user}@${item.ip}:${port}?congestion_control=bbr&alpn=h3&sni=${workerDomain}&udp_relay_mode=native&allow_insecure=1#${encodeURIComponent(nodeName)}`);
        });
        return links;
    }

    function generateTuicLinksFromNewIPs(list, user, workerDomain) {
        const links = [];
        list.forEach(item => {
            const nodeName = item.name.replace(/\s/g, '_');
            const port = item.port || 443;
            links.push(`tuic://${user}:${user}@${item.ip}:${port}?congestion_control=bbr&alpn=h3&sni=${workerDomain}&udp_relay_mode=native&allow_insecure=1#${encodeURIComponent(nodeName)}`);
        });
        return links;
    }

    function generateHysteria2LinksFromSource(list, user, workerDomain) {
        const links = [];
        list.forEach(item => {
            const nodeName = item.isp.replace(/\s/g, '_') + (item.colo ? `-${item.colo}` : '');
            const port = item.port || 443;
            links.push(`hy2://${user}@${item.ip}:${port}?insecure=1&sni=${workerDomain}#${encodeURIComponent(nodeName)}`);
        });
        return links;
    }

    function generateHysteria2LinksFromNewIPs(list, user, workerDomain) {
        const links = [];
        list.forEach(item => {
            const nodeName = item.name.replace(/\s/g, '_');
            const port = item.port || 443;
            links.push(`hy2://${user}@${item.ip}:${port}?insecure=1&sni=${workerDomain}#${encodeURIComponent(nodeName)}`);
        });
        return links;
    }

    function generateVlessGrpcLinksFromSource(list, user, workerDomain) {
        const links = [];
        const serviceName = 'grpc';
        const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];

        list.forEach(item => {
            let nodeName = item.isp.replace(/\s/g, '_');
            if (item.colo && item.colo.trim()) nodeName += `-${item.colo.trim()}`;
            const port = parseInt(item.port || 443);

            if (CF_HTTPS_PORTS.includes(port)) {
                const link = `vless://${user}@${item.ip}:${port}?encryption=none&security=tls&type=grpc&serviceName=${serviceName}&sni=${workerDomain}&fp=chrome#${encodeURIComponent(nodeName + '-gRPC')}`;
                links.push(link);
            }
        });
        return links;
    }

    function generateVlessGrpcLinksFromNewIPs(list, user, workerDomain) {
        const links = [];
        const serviceName = 'grpc';
        const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];

        list.forEach(item => {
            const nodeName = item.name.replace(/\s/g, '_');
            const port = parseInt(item.port);

            if (CF_HTTPS_PORTS.includes(port)) {
                const link = `vless://${user}@${item.ip}:${port}?encryption=none&security=tls&type=grpc&serviceName=${serviceName}&sni=${workerDomain}&fp=chrome#${encodeURIComponent(nodeName + '-gRPC')}`;
                links.push(link);
            }
        });
        return links;
    }

    async function handleGrpcRequest(request) {
        if (!fallbackAddress) return new Response('No backend for gRPC', { status: 503 });

        const url = new URL(request.url);
        const { address, port } = parseAddressAndPort(fallbackAddress);

        const targetUrl = `https://${address}:${port || 443}${url.pathname}${url.search}`;

        try {
            const proxyReq = new Request(targetUrl, {
                method: request.method,
                headers: request.headers,
                body: request.body,
                redirect: 'follow'
            });

            const response = await fetch(proxyReq);
            return response;
        } catch (e) {
            return new Response('gRPC Proxy Error: ' + e.message, { status: 502 });
        }
    }

    async function generateTrojanLinksFromSource(list, user, workerDomain, echConfig = null) {

        const CF_HTTP_PORTS = [80, 8080, 8880, 2052, 2082, 2086, 2095];
        const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];

        const defaultHttpsPorts = [443];
        const defaultHttpPorts = disableNonTLS ? [] : [80];
        const links = [];
        const wsPath = '/?ed=2048';

        const password = tp || user;

        list.forEach(item => {
            let nodeNameBase = item.isp.replace(/\s/g, '_');
            if (item.colo && item.colo.trim()) {
                nodeNameBase = `${nodeNameBase}-${item.colo.trim()}`;
            }
            const safeIP = item.ip.includes(':') ? `[${item.ip}]` : item.ip;

            let portsToGenerate = [];

            if (item.port) {
                const port = item.port;

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
                defaultHttpsPorts.forEach(port => {
                    portsToGenerate.push({ port: port, tls: true });
                });
                defaultHttpPorts.forEach(port => {
                    portsToGenerate.push({ port: port, tls: false });
                });
            }

            portsToGenerate.forEach(({ port, tls }) => {
                if (tls) {

                    const wsNodeName = `${nodeNameBase}-${port}-${atob('VHJvamFu')}-WS-TLS`;
                    const wsParams = new URLSearchParams({
                        security: 'tls',
                        sni: workerDomain,
                        fp: 'chrome',
                        type: 'ws',
                        host: workerDomain,
                        path: wsPath
                    });

                    // If ECH is enabled, add ech parameter (ECH requires masquerading as Chrome browser)
                    if (enableECH) {
                        const dnsServer = customDNS || 'https://dns.joeyblog.eu.org/joeyblog';
                        const echDomain = customECHDomain || 'cloudflare-ech.com';
                        wsParams.set('alpn', 'h3,h2,http/1.1');
                        wsParams.set('ech', `${echDomain}+${dnsServer}`);
                    }

                    links.push(`${atob('dHJvamFuOi8v')}${password}@${safeIP}:${port}?${wsParams.toString()}#${encodeURIComponent(wsNodeName)}`);
                } else {

                    const wsNodeName = `${nodeNameBase}-${port}-${atob('VHJvamFu')}-WS`;
                    const wsParams = new URLSearchParams({
                        security: 'none',
                        type: 'ws',
                        host: workerDomain,
                        path: wsPath
                    });
                    links.push(`${atob('dHJvamFuOi8v')}${password}@${safeIP}:${port}?${wsParams.toString()}#${encodeURIComponent(wsNodeName)}`);
                }
            });
        });
        return links;
    }

    async function fetchDynamicIPs() {
        const v4Url1 = "https://www.wetest.vip/page/cloudflare/address_v4.html";
        const v6Url1 = "https://www.wetest.vip/page/cloudflare/address_v6.html";
        let results = [];

        // Read filter config (default all enabled)
        const ipv4Enabled = getConfigValue('ipv4', '') === '' || getConfigValue('ipv4', 'yes') !== 'no';
        const ipv6Enabled = getConfigValue('ipv6', '') === '' || getConfigValue('ipv6', 'yes') !== 'no';
        const ispMobile = getConfigValue('ispMobile', '') === '' || getConfigValue('ispMobile', 'yes') !== 'no';
        const ispUnicom = getConfigValue('ispUnicom', '') === '' || getConfigValue('ispUnicom', 'yes') !== 'no';
        const ispTelecom = getConfigValue('ispTelecom', '') === '' || getConfigValue('ispTelecom', 'yes') !== 'no';

        try {
            const fetchPromises = [];
            if (ipv4Enabled) {
                fetchPromises.push(fetchAndParseWetest(v4Url1));
            } else {
                fetchPromises.push(Promise.resolve([]));
            }
            if (ipv6Enabled) {
                fetchPromises.push(fetchAndParseWetest(v6Url1));
            } else {
                fetchPromises.push(Promise.resolve([]));
            }

            const [ipv4List, ipv6List] = await Promise.all(fetchPromises);
            results = [...ipv4List, ...ipv6List];

            // Filter by ISP
            if (results.length > 0) {
                results = results.filter(item => {
                    const isp = item.isp || '';
                    if (isp.includes('移动') && !ispMobile) return false;
                    if (isp.includes('联通') && !ispUnicom) return false;
                    if (isp.includes('电信') && !ispTelecom) return false;
                    return true;
                });
            }

            if (results.length > 0) {
                return results;
            }
        } catch (e) {
        }

                return [];
            }

    async function fetchAndParseWetest(url) {
        try {
            const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
            if (!response.ok) {
                return [];
            }
            const html = await response.text();
            const results = [];
            const rowRegex = /<tr[\s\S]*?<\/tr>/g;
            const cellRegex = /<td data-label="线路名称">(.+?)<\/td>[\s\S]*?<td data-label="优选地址">([\d.:a-fA-F]+)<\/td>[\s\S]*?<td data-label="数据中心">(.+?)<\/td>/;

            let match;
            while ((match = rowRegex.exec(html)) !== null) {
                const rowHtml = match[0];
                const cellMatch = rowHtml.match(cellRegex);
                if (cellMatch && cellMatch[1] && cellMatch[2]) {
                    const colo = cellMatch[3] ? cellMatch[3].trim().replace(/<.*?>/g, '') : '';
                    let isp = cellMatch[1].trim().replace(/<.*?>/g, '');
                    if (isp === '移动') isp = 'Mobile';
                    if (isp === '联通') isp = 'Unicom';
                    if (isp === '电信') isp = 'Telecom';
                    results.push({
                        isp: isp,
                        ip: cellMatch[2].trim(),
                        colo: colo
                    });
                }
            }

            if (results.length === 0) {
            }

            return results;
        } catch (error) {
            return [];
        }
    }

    async function handleWsRequest(request) {
        // Detect and set current Worker region, ensure WebSocket requests are correctly matched to nearest region
        if (!currentWorkerRegion || currentWorkerRegion === '') {
            if (manualWorkerRegion && manualWorkerRegion.trim()) {
                currentWorkerRegion = manualWorkerRegion.trim().toUpperCase();
            } else {
                currentWorkerRegion = await detectWorkerRegion(request);
            }
        }

        const wsPair = new WebSocketPair();
        const [clientSock, serverSock] = Object.values(wsPair);
        serverSock.accept();

        let remoteConnWrapper = { socket: null };
        let isDnsQuery = false;
        let protocolType = null;

        const earlyData = request.headers.get(atob('c2VjLXdlYnNvY2tldC1wcm90b2NvbA==')) || '';
        const readable = makeReadableStream(serverSock, earlyData);
        const url = new URL(request.url);

        readable.pipeTo(new WritableStream({
            async write(chunk) {
                if (isDnsQuery) return await forwardUDP(chunk, serverSock, null);
                if (remoteConnWrapper.socket) {
                    const writer = remoteConnWrapper.socket.writable.getWriter();
                    await writer.write(chunk);
                    writer.releaseLock();
                    return;
                }

                if (!protocolType) {

                    // VMess and Shadowsocks fallback handling (Reverse Proxy Mode)
                    // If EVM/ESS is enabled and path matches, forward traffic directly to fallbackAddress
                    const isVMess = evm && url.pathname.startsWith('/vm');
                    const isSS = ess && url.pathname.startsWith('/ss');

                    if (isVMess || isSS) {
                        protocolType = isVMess ? 'vmess' : 'shadowsocks';

                        let targetAddress = fallbackAddress;
                        // If fallbackAddress is not configured, try using preferred IP (might be incompatible, but as a last resort)
                        if (!targetAddress && currentWorkerRegion) {
                            const best = await getBestBackupIP(currentWorkerRegion);
                            if (best) targetAddress = best.domain + ':' + best.port;
                        }

                        if (targetAddress) {
                            const { address, port } = parseAddressAndPort(targetAddress);
                            // Use URL type (2) as generic fallback
                            await forwardTCP(2, address, port || 80, chunk, serverSock, null, remoteConnWrapper);
                            return;
                        } else {
                            throw new Error('No backend configured for VMess/SS relay');
                        }
                    }

                    if (ev && chunk.byteLength >= 24) {
                        const vlessResult = parseWsPacketHeader(chunk, at);
                        if (!vlessResult.hasError) {
                            protocolType = 'vless';
                            const { addressType, port, hostname, rawIndex, version, isUDP } = vlessResult;
                if (isUDP) {
                    if (port === 53) isDnsQuery = true;
                    else throw new Error(E_UDP_DNS_ONLY);
                }
                const respHeader = new Uint8Array([version[0], 0]);
                const rawData = chunk.slice(rawIndex);
                if (isDnsQuery) return forwardUDP(rawData, serverSock, respHeader);
                await forwardTCP(addressType, hostname, port, rawData, serverSock, respHeader, remoteConnWrapper);
                            return;
                        }
                    }

                    if (et && chunk.byteLength >= 56) {
                        const tjResult = await parseTrojanHeader(chunk, at);
                        if (!tjResult.hasError) {
                            protocolType = atob('dHJvamFu');
                            const { addressType, port, hostname, rawClientData } = tjResult;
                            await forwardTCP(addressType, hostname, port, rawClientData, serverSock, null, remoteConnWrapper);
                            return;
                        }
                    }

                    throw new Error('Invalid protocol or authentication failed');
                }
            },
        })).catch((err) => { });

        return new Response(null, { status: 101, webSocket: clientSock });
    }

    async function forwardTCP(addrType, host, portNum, rawData, ws, respHeader, remoteConnWrapper) {
        async function connectAndSend(address, port, useSocks = false) {
            const remoteSock = useSocks ?
                await establishSocksConnection(addrType, address, port) :
                connect({ hostname: address, port: port });
            const writer = remoteSock.writable.getWriter();
            await writer.write(rawData);
            writer.releaseLock();
            return remoteSock;
        }

        async function retryConnection() {
            if (enableSocksDowngrade && isSocksEnabled) {
                try {
                    const socksSocket = await connectAndSend(host, portNum, true);
                    remoteConnWrapper.socket = socksSocket;
                    socksSocket.closed.catch(() => {}).finally(() => closeSocketQuietly(ws));
                    connectStreams(socksSocket, ws, respHeader, null);
                    return;
                } catch (socksErr) {
                    let backupHost, backupPort;
                    if (fallbackAddress && fallbackAddress.trim()) {
                        const parsed = parseAddressAndPort(fallbackAddress);
                        backupHost = parsed.address;
                        backupPort = parsed.port || portNum;
                    } else {
                        const bestBackupIP = await getBestBackupIP(currentWorkerRegion);
                        backupHost = bestBackupIP ? bestBackupIP.domain : host;
                        backupPort = bestBackupIP ? bestBackupIP.port : portNum;
                    }

                    try {
                        const fallbackSocket = await connectAndSend(backupHost, backupPort, false);
                        remoteConnWrapper.socket = fallbackSocket;
                        fallbackSocket.closed.catch(() => {}).finally(() => closeSocketQuietly(ws));
                        connectStreams(fallbackSocket, ws, respHeader, null);
                    } catch (fallbackErr) {
                        closeSocketQuietly(ws);
                    }
                }
            } else {
                let backupHost, backupPort;
                if (fallbackAddress && fallbackAddress.trim()) {
                    const parsed = parseAddressAndPort(fallbackAddress);
                    backupHost = parsed.address;
                    backupPort = parsed.port || portNum;
                } else {
                    const bestBackupIP = await getBestBackupIP(currentWorkerRegion);
                    backupHost = bestBackupIP ? bestBackupIP.domain : host;
                    backupPort = bestBackupIP ? bestBackupIP.port : portNum;
                }

                try {
                    const fallbackSocket = await connectAndSend(backupHost, backupPort, isSocksEnabled);
                    remoteConnWrapper.socket = fallbackSocket;
                    fallbackSocket.closed.catch(() => {}).finally(() => closeSocketQuietly(ws));
                    connectStreams(fallbackSocket, ws, respHeader, null);
                } catch (fallbackErr) {
                    closeSocketQuietly(ws);
                }
            }
        }

        try {
            const initialSocket = await connectAndSend(host, portNum, enableSocksDowngrade ? false : isSocksEnabled);
            remoteConnWrapper.socket = initialSocket;
            connectStreams(initialSocket, ws, respHeader, retryConnection);
        } catch (err) {
            retryConnection();
        }
    }

    function parseWsPacketHeader(chunk, token) {
        if (chunk.byteLength < 24) return { hasError: true, message: E_INVALID_DATA };
        const version = new Uint8Array(chunk.slice(0, 1));
        if (formatIdentifier(new Uint8Array(chunk.slice(1, 17))) !== token) return { hasError: true, message: E_INVALID_USER };
        const optLen = new Uint8Array(chunk.slice(17, 18))[0];
        const cmd = new Uint8Array(chunk.slice(18 + optLen, 19 + optLen))[0];
        let isUDP = false;
        if (cmd === 2) {
            isUDP = true;
        } else if (cmd !== 1) {
            return { hasError: true, message: E_UNSUPPORTED_CMD };
        }
        const portIdx = 19 + optLen;
        const port = new DataView(chunk.slice(portIdx, portIdx + 2)).getUint16(0);
        let addrIdx = portIdx + 2, addrLen = 0, addrValIdx = addrIdx + 1, hostname = '';
        const addressType = new Uint8Array(chunk.slice(addrIdx, addrValIdx))[0];
        switch (addressType) {
            case ADDRESS_TYPE_IPV4: addrLen = 4; hostname = new Uint8Array(chunk.slice(addrValIdx, addrValIdx + addrLen)).join('.'); break;
            case ADDRESS_TYPE_URL: addrLen = new Uint8Array(chunk.slice(addrValIdx, addrValIdx + 1))[0]; addrValIdx += 1; hostname = new TextDecoder().decode(chunk.slice(addrValIdx, addrValIdx + addrLen)); break;
            case ADDRESS_TYPE_IPV6: addrLen = 16; const ipv6 = []; const ipv6View = new DataView(chunk.slice(addrValIdx, addrValIdx + addrLen)); for (let i = 0; i < 8; i++) ipv6.push(ipv6View.getUint16(i * 2).toString(16)); hostname = ipv6.join(':'); break;
            default: return { hasError: true, message: `${E_INVALID_ADDR_TYPE}: ${addressType}` };
        }
        if (!hostname) return { hasError: true, message: `${E_EMPTY_ADDR}: ${addressType}` };
        return { hasError: false, addressType, port, hostname, isUDP, rawIndex: addrValIdx + addrLen, version };
    }

    function makeReadableStream(socket, earlyDataHeader) {
        let cancelled = false;
        return new ReadableStream({
            start(controller) {
                socket.addEventListener('message', (event) => { if (!cancelled) controller.enqueue(event.data); });
                socket.addEventListener('close', () => { if (!cancelled) { closeSocketQuietly(socket); controller.close(); } });
                socket.addEventListener('error', (err) => controller.error(err));
                const { earlyData, error } = base64ToArray(earlyDataHeader);
                if (error) controller.error(error); else if (earlyData) controller.enqueue(earlyData);
            },
            cancel() { cancelled = true; closeSocketQuietly(socket); }
        });
    }

    async function connectStreams(remoteSocket, webSocket, headerData, retryFunc) {
        let header = headerData, hasData = false;
        await remoteSocket.readable.pipeTo(
            new WritableStream({
                async write(chunk, controller) {
                    hasData = true;
                    if (webSocket.readyState !== 1) controller.error(E_WS_NOT_OPEN);
                    if (header) { webSocket.send(await new Blob([header, chunk]).arrayBuffer()); header = null; }
                    else { webSocket.send(chunk); }
                },
                abort(reason) { },
            })
        ).catch((error) => { closeSocketQuietly(webSocket); });
        if (!hasData && retryFunc) retryFunc();
    }

    async function forwardUDP(udpChunk, webSocket, respHeader) {
        try {
            const tcpSocket = connect({ hostname: '8.8.4.4', port: 53 });
            let header = respHeader;
            const writer = tcpSocket.writable.getWriter();
            await writer.write(udpChunk);
            writer.releaseLock();
            await tcpSocket.readable.pipeTo(new WritableStream({
                async write(chunk) {
                    if (webSocket.readyState === 1) {
                        if (header) { webSocket.send(await new Blob([header, chunk]).arrayBuffer()); header = null; }
                        else { webSocket.send(chunk); }
                    }
                },
            }));
        } catch (error) { }
    }

    async function establishSocksConnection(addrType, address, port) {
        const { username, password, hostname, socksPort } = parsedSocks5Config;
        const socket = connect({ hostname, port: socksPort });
        const writer = socket.writable.getWriter();
        await writer.write(new Uint8Array(username ? [5, 2, 0, 2] : [5, 1, 0]));
        const reader = socket.readable.getReader();
        let res = (await reader.read()).value;
        if (res[0] !== 5 || res[1] === 255) throw new Error(E_SOCKS_NO_METHOD);
        if (res[1] === 2) {
            if (!username || !password) throw new Error(E_SOCKS_AUTH_NEEDED);
            const encoder = new TextEncoder();
            const authRequest = new Uint8Array([1, username.length, ...encoder.encode(username), password.length, ...encoder.encode(password)]);
            await writer.write(authRequest);
            res = (await reader.read()).value;
            if (res[0] !== 1 || res[1] !== 0) throw new Error(E_SOCKS_AUTH_FAIL);
        }
        const encoder = new TextEncoder(); let DSTADDR;
        switch (addrType) {
            case ADDRESS_TYPE_IPV4: DSTADDR = new Uint8Array([1, ...address.split('.').map(Number)]); break;
            case ADDRESS_TYPE_URL: DSTADDR = new Uint8Array([3, address.length, ...encoder.encode(address)]); break;
            case ADDRESS_TYPE_IPV6: DSTADDR = new Uint8Array([4, ...address.split(':').flatMap(x => [parseInt(x.slice(0, 2), 16), parseInt(x.slice(2), 16)])]); break;
            default: throw new Error(E_INVALID_ADDR_TYPE);
        }
        await writer.write(new Uint8Array([5, 1, 0, ...DSTADDR, port >> 8, port & 255]));
        res = (await reader.read()).value;
        if (res[1] !== 0) throw new Error(E_SOCKS_CONN_FAIL);
        writer.releaseLock(); reader.releaseLock();
        return socket;
    }

    function parseSocksConfig(address) {
        let [latter, former] = address.split("@").reverse();
        let username, password, hostname, socksPort;

        if (former) {
            const formers = former.split(":");
            if (formers.length !== 2) throw new Error(E_INVALID_SOCKS_ADDR);
            [username, password] = formers;
        }

        const latters = latter.split(":");
        socksPort = Number(latters.pop());
        if (isNaN(socksPort)) throw new Error(E_INVALID_SOCKS_ADDR);

        hostname = latters.join(":");
        if (hostname.includes(":") && !/^\[.*\]$/.test(hostname)) throw new Error(E_INVALID_SOCKS_ADDR);

        return { username, password, hostname, socksPort };
    }

    async function handleSubscriptionPage(request, user = null) {
        if (!user) user = at;

        const url = new URL(request.url);
        // Prioritize language settings from Cookie
        const cookieHeader = request.headers.get('Cookie') || '';
        let langFromCookie = null;
        if (cookieHeader) {
            const cookies = cookieHeader.split(';').map(c => c.trim());
            for (const cookie of cookies) {
                if (cookie.startsWith('preferredLanguage=')) {
                    langFromCookie = cookie.split('=')[1];
                    break;
                }
            }
        }

        let lang = 'en';

        if (langFromCookie) {
            if (langFromCookie === 'fa' || langFromCookie === 'fa-IR') {
                lang = 'fa';
            } else if (langFromCookie === 'zh' || langFromCookie === 'zh-CN' || langFromCookie === 'zh-Hans') {
                lang = 'zh';
            } else {
                lang = 'en';
            }
        } else {
            // If no Cookie, use browser language detection
            const acceptLanguage = request.headers.get('Accept-Language') || '';
            const browserLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
            if (browserLang === 'fa' || acceptLanguage.includes('fa-IR') || acceptLanguage.includes('fa')) {
                lang = 'fa';
            } else if (browserLang === 'zh' || acceptLanguage.includes('zh-CN') || acceptLanguage.includes('zh')) {
                lang = 'zh';
            } else {
                lang = 'en';
            }
        }

        const isFarsi = lang === 'fa';
        const isZh = lang === 'zh';
        const langAttr = isFarsi ? 'fa-IR' : (isZh ? 'zh-CN' : 'en-US');

            const translations = {
                en: {
                    title: 'Terminal',
                    congratulations: 'Congratulations, you made it!',
                    enterU: 'Please enter the value of your U variable',
                    enterD: 'Please enter the value of your D variable',
                    command: 'Command: connect [',
                    uuid: 'UUID',
                    path: 'PATH',
                    inputU: 'Enter content of U variable and press Enter...',
                    inputD: 'Enter content of D variable and press Enter...',
                    connecting: 'Connecting...',
                    invading: 'Invading...',
                    success: 'Connection successful! Returning result...',
                    error: 'Error: Invalid UUID format',
                    reenter: 'Please re-enter a valid UUID',

                    // Subscription Page Translations
                    subtitle: 'Multi-client Support • Smart Optimization • One-Click Generation',
                    selectClient: '[ Select Client ]',
                    systemStatus: '[ System Status ]',
                    configManagement: '[ Config Management ]',
                    relatedLinks: '[ Related Links ]',
                    checking: 'Checking...',
                    workerRegion: 'Worker Region: ',
                    detectionMethod: 'Detection Method: ',
                    proxyIPStatus: 'ProxyIP Status: ',
                    currentIP: 'Current IP: ',
                    regionMatch: 'Region Match: ',
                    selectionLogic: 'Selection Logic: ',
                    kvStatusChecking: 'Checking KV Status...',
                    kvEnabled: '✅ KV Storage Enabled, Config Management Available',
                    kvDisabled: '⚠️ KV Storage Disabled or Not Configured',
                    specifyRegion: 'Specify Region (wk):',
                    autoDetect: 'Auto Detect',
                    saveRegion: 'Save Region Config',
                    protocolSelection: 'Protocol Selection:',
                    enableVLESS: 'Enable VLESS Protocol',
                    enableVMess: 'Enable VMess Protocol',
                    enableShadowsocks: 'Enable Shadowsocks Protocol',
                    enableTrojan: 'Enable Trojan Protocol',
                    enableXhttp: 'Enable xhttp Protocol',
                    enableTUIC: 'Enable TUIC Protocol',
                    enableHysteria2: 'Enable Hysteria 2 Protocol',
                    enableVLESSgRPC: 'Enable VLESS gRPC Protocol',
                    linkOnlyHint: 'Requires External Backend (Link-Only)',
                    grpcHint: 'Requires Custom Domain (gRPC)',
                    trojanPassword: 'Trojan Password (Optional):',
                    customPath: 'Custom Path (d):',
                    customPathPlaceholder: 'e.g., /secret-path',
                    customIP: 'Custom ProxyIP (p):',
                    customIPPlaceholder: 'e.g., 1.2.3.4 or proxy.example.com',
                    preferredIPs: 'Preferred IP List (yx):',
                    preferredIPsPlaceholder: 'e.g., 1.1.1.1:443#HongKong, 8.8.8.8:443#USA',
                    preferredIPsURL: 'Preferred IP Source URL (yxURL):',
                    latencyTest: 'Latency Test',
                    latencyTestIP: 'Test IP/Domain:',
                    latencyTestIPPlaceholder: 'Enter IP or Domain, comma separated',
                    latencyTestPort: 'Port:',
                    startTest: 'Start Test',
                    stopTest: 'Stop Test',
                    testResult: 'Test Result:',
                    addToYx: 'Add to Preferred List',
                    addSelectedToYx: 'Add Selected to Preferred List',
                    selectAll: 'Select All',
                    deselectAll: 'Deselect All',
                    testingInProgress: 'Testing...',
                    testComplete: 'Test Complete',
                    latencyMs: 'Latency (HTTP Handshake)',
                    timeout: 'Timeout',
                    ipSource: 'IP Source:',
                    manualInput: 'Manual Input',
                    cfRandomIP: 'CF Random IP',
                    urlFetch: 'Fetch from URL',
                    randomCount: 'Generate Count:',
                    fetchURL: 'Fetch URL:',
                    fetchURLPlaceholder: 'Enter URL of IP list',
                    generateIP: 'Generate IP',
                    fetchIP: 'Fetch IP',
                    socks5Config: 'SOCKS5 Config (s):',
                    customHomepage: 'Custom Homepage URL (homepage):',
                    customHomepagePlaceholder: 'e.g., https://example.com',
                    customHomepageHint: 'Set custom URL as homepage camouflage. Content of this URL will be shown when accessing root path /. Leave empty to show default terminal page.',
                    customPathHint: 'Only accessible via this path if set. UUID access will be disabled. Suggest using complex path to prevent scanning.',
                    customIPHint: 'Hide Worker real IP, or solve Cloudflare Loop issue. Supports IP:Port or Domain:Port.',
                    preferredIPsHint: 'Manually specify preferred nodes. Highest priority. Format: IP:Port#Remark.',
                    socks5ConfigHint: 'Format: user:pass@host:port. Worker will connect to target via this proxy.',
                    saveConfig: 'Save Config',
                    advancedControl: 'Advanced Control',
                    subscriptionConverter: 'Sub Converter URL:',
                    builtinPreferred: 'Built-in Preferred Type:',
                    enablePreferredDomain: 'Enable Preferred Domain',
                    enablePreferredIP: 'Enable Preferred IP',
                    enableGitHubPreferred: 'Enable GitHub Default Preferred',
                    allowAPIManagement: 'Allow API Management (ae):',
                    regionMatching: 'Region Matching (rm):',
                    downgradeControl: 'Downgrade Control (qj):',
                    tlsControl: 'TLS Control (dkby):',
                    preferredControl: 'Preferred Control (yxby):',
                    saveAdvanced: 'Save Advanced Config',
                    loading: 'Loading...',
                    currentConfig: '📍 Current Path Config',
                    refreshConfig: 'Refresh Config',
                    resetConfig: 'Reset Config',
                    subscriptionCopied: 'Subscription Link Copied',
                    autoSubscriptionCopied: 'Auto-detected subscription link copied. Client will be recognized by User-Agent.',
                    trojanPasswordPlaceholder: 'Leave empty to use UUID',
                    trojanPasswordHint: 'Set custom Trojan password. Leave empty to use UUID. Client will auto-hash password with SHA224.',
                    protocolHint: 'Multiple protocols can be enabled.<br>• VLESS WS: Standard WebSocket protocol<br>• VMess WS: WebSocket-based VMess (link generation)<br>• Shadowsocks: WebSocket-based SS (link generation)<br>• Trojan: Uses SHA224 password auth<br>• xhttp: HTTP POST camouflage (requires custom domain & gRPC)',
                    enableECH: 'Enable ECH (Encrypted Client Hello)',
                    enableECHHint: 'When enabled, ECH config is fetched from DoH and added to links on every sub refresh',
                    customDNS: 'Custom DNS Server',
                    customDNSPlaceholder: 'e.g., https://dns.joeyblog.eu.org/joeyblog',
                    customDNSHint: 'DNS server for ECH config query (DoH format)',
                    customECHDomain: 'Custom ECH Domain',
                    customECHDomainPlaceholder: 'e.g., cloudflare-ech.com',
                    customECHDomainHint: 'Domain used in ECH config, leave empty for default',
                    saveProtocol: 'Save Protocol Config',
                    subscriptionConverterPlaceholder: 'Default: https://url.v1.mk/sub',
                    subscriptionConverterHint: 'Custom subscription converter API, leave empty for default',
                    builtinPreferredHint: 'Control which built-in preferred nodes are included. Default all enabled.',
                    apiEnabledDefault: 'Default (API Disabled)',
                    apiEnabledYes: 'Enable API Management',
                    apiEnabledHint: '⚠️ Security Warning: Enabling API allows dynamic preferred IP addition. Use only if needed.',
                    regionMatchingDefault: 'Default (Enable Region Match)',
                    regionMatchingNo: 'Disable Region Match',
                    regionMatchingHint: 'Smart region matching disabled when set to "Disable"',
                    downgradeControlDefault: 'Default (Disable Downgrade)',
                    downgradeControlNo: 'Enable Downgrade Mode',
                    downgradeControlHint: 'When enabled: CF Direct Fail -> SOCKS5 -> Fallback',
                    tlsControlDefault: 'Default (Keep All Nodes)',
                    tlsControlYes: 'TLS Nodes Only',
                    tlsControlHint: 'When set to "TLS Nodes Only", non-TLS nodes (e.g., port 80) are not generated',
                    preferredControlDefault: 'Default (Enable Preferred)',
                    preferredControlYes: 'Disable Preferred',
                    preferredControlHint: 'When set to "Disable Preferred", only native address is used',
                    regionNames: {
                        US: '🇺🇸 US', SG: '🇸🇬 Singapore', JP: '🇯🇵 Japan',
                        KR: '🇰🇷 South Korea', DE: '🇩🇪 Germany', SE: '🇸🇪 Sweden', NL: '🇳🇱 Netherlands',
                        FI: '🇫🇮 Finland', GB: '🇬🇧 UK', FR: '🇫🇷 France', CA: '🇨🇦 Canada',
                        AU: '🇦🇺 Australia', HK: '🇭🇰 Hong Kong', TW: '🇹🇼 Taiwan'
                    },
                    terminal: 'Terminal v2.9.3',
                    githubProject: 'GitHub Project',
                    autoDetectClient: 'Auto Detect',
                    selectionLogicText: 'Same Region -> Nearby Region -> Other Regions',
                    customIPDisabledHint: 'Region selection disabled when using Custom ProxyIP',
                    customIPMode: 'Custom ProxyIP Mode (p variable enabled)',
                    customIPModeDesc: 'Custom IP Mode (Region match disabled)',
                    usingCustomProxyIP: 'Using Custom ProxyIP: ',
                    customIPConfig: ' (p variable config)',
                    customIPModeDisabled: 'Custom IP Mode, region selection disabled',
                    manualRegion: 'Manual Region',
                    manualRegionDesc: ' (Manual)',
                    proxyIPAvailable: '10/10 Available (ProxyIP Domain Pre-set)',
                    smartSelection: 'Smart Nearby Selection',
                    sameRegionIP: 'Same Region IP Available (1)',
                    cloudflareDetection: 'Cloudflare Built-in Detection',
                    detectionFailed: 'Detection Failed',
                    apiTestResult: 'API Detection Result: ',
                    apiTestTime: 'Detection Time: ',
                    apiTestFailed: 'API Detection Failed: ',
                    unknownError: 'Unknown Error',
                    apiTestError: 'API Test Failed: ',
                    kvNotConfigured: 'KV Storage not configured. Config management unavailable.\n\nPlease in Cloudflare Workers:\n1. Create KV Namespace\n2. Bind variable C\n3. Redeploy',
                    kvNotEnabled: 'KV Storage Not Configured',
                    kvCheckFailed: 'KV Check Failed: Invalid Response',
                    kvCheckFailedStatus: 'KV Check Failed - Status: ',
                    kvCheckFailedError: 'KV Check Failed - Error: '
                },
                fa: {
                    title: 'مرکز اشتراک',
                    subtitle: 'پشتیبانی چند کلاینت • انتخاب هوشمند • تولید یک کلیکی',
                    selectClient: '[ انتخاب کلاینت ]',
                    systemStatus: '[ وضعیت سیستم ]',
                    configManagement: '[ مدیریت تنظیمات ]',
                    relatedLinks: '[ لینک‌های مرتبط ]',
                    checking: 'در حال بررسی...',
                    workerRegion: 'منطقه Worker: ',
                    detectionMethod: 'روش تشخیص: ',
                    proxyIPStatus: 'وضعیت ProxyIP: ',
                    currentIP: 'IP فعلی: ',
                    regionMatch: 'تطبیق منطقه: ',
                    selectionLogic: 'منطق انتخاب: ',
                    kvStatusChecking: 'در حال بررسی وضعیت KV...',
                    kvEnabled: '✅ ذخیره‌سازی KV فعال است، می‌توانید از مدیریت تنظیمات استفاده کنید',
                    kvDisabled: '⚠️ ذخیره‌سازی KV فعال نیست یا پیکربندی نشده است',
                    specifyRegion: 'تعیین منطقه (wk):',
                    autoDetect: 'تشخیص خودکار',
                    saveRegion: 'ذخیره تنظیمات منطقه',
                    protocolSelection: 'انتخاب پروتکل:',
                    enableVLESS: 'فعال‌سازی پروتکل VLESS',
                    enableVMess: 'فعال‌سازی پروتکل VMess',
                    enableShadowsocks: 'فعال‌سازی پروتکل Shadowsocks',
                    enableTrojan: 'فعال‌سازی پروتکل Trojan',
                    enableXhttp: 'فعال‌سازی پروتکل xhttp',
                    enableTUIC: 'فعال‌سازی پروتکل TUIC',
                    enableHysteria2: 'فعال‌سازی پروتکل Hysteria 2',
                    enableVLESSgRPC: 'فعال‌سازی پروتکل VLESS gRPC',
                    linkOnlyHint: 'نیاز به سرور بک‌اند (Link-Only)',
                    grpcHint: 'نیازمند دامنه شخصی (gRPC)',
                    enableECH: 'فعال‌سازی ECH (Encrypted Client Hello)',
                    enableECHHint: 'پس از فعال‌سازی، در هر بار تازه‌سازی اشتراک، پیکربندی ECH به‌روز به‌طور خودکار از DoH دریافت شده و به لینک‌ها اضافه می‌شود',
                    customDNS: 'سرور DNS سفارشی',
                    customDNSPlaceholder: 'مثال: https://dns.joeyblog.eu.org/joeyblog',
                    customDNSHint: 'آدرس سرور DNS برای جستجوی پیکربندی ECH (فرمت DoH)',
                    customECHDomain: 'دامنه ECH سفارشی',
                    customECHDomainPlaceholder: 'مثال: cloudflare-ech.com',
                    customECHDomainHint: 'دامنه مورد استفاده در پیکربندی ECH، اگر خالی باشد از پیش‌فرض استفاده می‌شود',
                    trojanPassword: 'رمز عبور Trojan (اختیاری):',
                    customPath: 'مسیر سفارشی (d):',
                    customPathPlaceholder: 'مثال: /secret-path',
                    customIP: 'ProxyIP سفارشی (p):',
                    customIPPlaceholder: 'مثال: 1.2.3.4 یا proxy.example.com',
                    preferredIPs: 'لیست IP ترجیحی (yx):',
                    preferredIPsPlaceholder: 'مثال: 1.1.1.1:443#HongKong, 8.8.8.8:443#USA',
                    preferredIPsURL: 'URL منبع IP ترجیحی (yxURL):',
                    latencyTest: 'تست تاخیر',
                    latencyTestIP: 'IP/دامنه تست:',
                    latencyTestIPPlaceholder: 'IP یا دامنه وارد کنید، چند مورد با کاما جدا شوند',
                    latencyTestPort: 'پورت:',
                    startTest: 'شروع تست',
                    stopTest: 'توقف تست',
                    testResult: 'نتیجه تست:',
                    addToYx: 'افزودن به لیست ترجیحی',
                    addSelectedToYx: 'افزودن موارد انتخاب شده',
                    selectAll: 'انتخاب همه',
                    deselectAll: 'لغو انتخاب',
                    testingInProgress: 'در حال تست...',
                    testComplete: 'تست کامل شد',
                    latencyMs: 'تاخیر (هندشیک)',
                    timeout: 'زمان تمام شد',
                    ipSource: 'منبع IP:',
                    manualInput: 'ورودی دستی',
                    cfRandomIP: 'IP تصادفی CF',
                    urlFetch: 'دریافت از URL',
                    randomCount: 'تعداد تولید:',
                    fetchURL: 'URL دریافت:',
                    fetchURLPlaceholder: 'آدرس URL لیست IP را وارد کنید',
                    generateIP: 'تولید IP',
                    fetchIP: 'دریافت IP',
                    socks5Config: 'تنظیمات SOCKS5 (s):',
                    customHomepage: 'URL صفحه اصلی سفارشی (homepage):',
                    customHomepagePlaceholder: 'مثال: https://example.com',
                    customHomepageHint: 'تنظیم URL سفارشی به عنوان استتار صفحه اصلی. هنگام دسترسی به مسیر اصلی / محتوای این URL نمایش داده می‌شود. اگر خالی بگذارید صفحه ترمینال پیش‌فرض نمایش داده می‌شود.',
                    customPathHint: 'پس از تنظیم، فقط از طریق این مسیر قابل دسترسی خواهد بود. پیشنهاد می‌شود برای امنیت بیشتر از مسیر پیچیده استفاده کنید.',
                    customIPHint: 'مخفی کردن IP اصلی Worker یا حل مشکل Cloudflare Loop. فرمت: IP:Port یا Domain:Port.',
                    preferredIPsHint: 'تعیین دستی نودهای ترجیحی. بالاترین اولویت. فرمت: IP:Port#توضیحات.',
                    socks5ConfigHint: 'فرمت: user:pass@host:port. Worker از طریق این پروکسی به هدف متصل می‌شود.',
                    saveConfig: 'ذخیره تنظیمات',
                    advancedControl: 'کنترل پیشرفته',
                    subscriptionConverter: 'آدرس تبدیل اشتراک:',
                    builtinPreferred: 'نوع ترجیحی داخلی:',
                    enablePreferredDomain: 'فعال‌سازی دامنه ترجیحی',
                    enablePreferredIP: 'فعال‌سازی IP ترجیحی',
                    enableGitHubPreferred: 'فعال‌سازی ترجیح پیش‌فرض GitHub',
                    enableDiverseProxies: 'فعال‌سازی گره‌های چندپورتی (تولید همه پورت‌ها)',
                    enableDiverseProxiesHint: 'برای هر IP همه پورت‌های پشتیبانی‌شده (80، 443، 2053 و ...) را تولید می‌کند.',
                    allowAPIManagement: 'اجازه مدیریت API (ae):',
                    regionMatching: 'تطبیق منطقه (rm):',
                    downgradeControl: 'کنترل کاهش سطح (qj):',
                    tlsControl: 'کنترل TLS (dkby):',
                    preferredControl: 'کنترل ترجیحی (yxby):',
                    saveAdvanced: 'ذخیره تنظیمات پیشرفته',
                    loading: 'در حال بارگذاری...',
                    currentConfig: '📍 پیکربندی مسیر فعلی',
                    refreshConfig: 'تازه‌سازی تنظیمات',
                    resetConfig: 'بازنشانی تنظیمات',
                    subscriptionCopied: 'لینک اشتراک کپی شد',
                    autoSubscriptionCopied: 'لینک اشتراک تشخیص خودکار کپی شد، کلاینت هنگام دسترسی بر اساس User-Agent به طور خودکار تشخیص داده و قالب مربوطه را برمی‌گرداند',
                    trojanPasswordPlaceholder: 'خالی بگذارید تا از UUID استفاده شود',
                    trojanPasswordHint: 'رمز عبور Trojan سفارشی را تنظیم کنید. اگر خالی بگذارید از UUID استفاده می‌شود. کلاینت به طور خودکار رمز عبور را با SHA224 هش می‌کند.',
                    protocolHint: 'می‌توانید چندین پروتکل را همزمان فعال کنید. اشتراک گره‌های پروتکل‌های انتخاب شده را تولید می‌کند.<br>• VLESS WS: پروتکل استاندارد مبتنی بر WebSocket<br>• VMess WS: پروتکل VMess مبتنی بر WebSocket (تولید لینک)<br>• Shadowsocks: پروتکل SS مبتنی بر WebSocket (تولید لینک)<br>• Trojan: احراز هویت با رمز عبور SHA224<br>• xhttp: پروتکل استتار مبتنی بر HTTP POST (نیاز به اتصال دامنه سفارشی و فعال‌سازی gRPC دارد)',
                    saveProtocol: 'ذخیره تنظیمات پروتکل',
                    subscriptionConverterPlaceholder: 'پیش‌فرض: https://url.v1.mk/sub',
                    subscriptionConverterHint: 'آدرس API تبدیل اشتراک سفارشی، اگر خالی بگذارید از آدرس پیش‌فرض استفاده می‌شود',
                    builtinPreferredHint: 'کنترل اینکه کدام گره‌های ترجیحی داخلی در اشتراک گنجانده شوند. به طور پیش‌فرض همه فعال هستند.',
                    apiEnabledDefault: 'پیش‌فرض (API غیرفعال)',
                    apiEnabledYes: 'فعال‌سازی مدیریت API',
                    apiEnabledHint: '⚠️ هشدار امنیتی: فعال‌سازی این گزینه اجازه می‌دهد IP های ترجیحی از طریق API به طور پویا اضافه شوند. توصیه می‌شود فقط در صورت نیاز فعال کنید.',
                    regionMatchingDefault: 'پیش‌فرض (فعال‌سازی تطبیق منطقه)',
                    regionMatchingNo: 'غیرفعال‌کردن تطبیق منطقه',
                    regionMatchingHint: 'وقتی "بستن" تنظیم شود، تطبیق هوشمند منطقه انجام نمی‌شود',
                    downgradeControlDefault: 'پیش‌فرض (عدم فعال‌سازی کاهش سطح)',
                    downgradeControlNo: 'فعال‌سازی حالت کاهش سطح',
                    downgradeControlHint: 'وقتی "فعال" تنظیم شود: اتصال مستقیم CF ناموفق → اتصال SOCKS5 → آدرس fallback',
                    tlsControlDefault: 'پیش‌فرض (حفظ همه گره‌ها)',
                    tlsControlYes: 'فقط گره‌های TLS',
                    tlsControlHint: 'وقتی "فقط گره‌های TLS" تنظیم شود، فقط گره‌های با TLS تولید می‌شوند، گره‌های غیر TLS (مانند پورت 80) تولید نمی‌شوند',
                    preferredControlDefault: 'پیش‌فرض (فعال‌سازی ترجیح)',
                    preferredControlYes: 'غیرفعال‌کردن اولویت',
                    preferredControlHint: 'وقتی "غیرفعال‌کردن اولویت" تنظیم شود، فقط از آدرس اصلی استفاده می‌شود، گره‌های IP و دامنه ترجیحی تولید نمی‌شوند',
                    regionNames: {
                        US: '🇺🇸 آمریکا', SG: '🇸🇬 سنگاپور', JP: '🇯🇵 ژاپن',
                        KR: '🇰🇷 کره جنوبی', DE: '🇩🇪 آلمان', SE: '🇸🇪 سوئد', NL: '🇳🇱 هلند',
                        FI: '🇫🇮 فنلاند', GB: '🇬🇧 بریتانیا', FR: '🇫🇷 فرانسه', CA: '🇨🇦 کانادا',
                        AU: '🇦🇺 استرالیا', HK: '🇭🇰 هنگ کنگ', TW: '🇹🇼 تایوان'
                    },
                    terminal: 'ترمینال v2.9.3',
                    githubProject: 'پروژه GitHub',
                    autoDetectClient: 'تشخیص خودکار',
                selectionLogicText: 'هم‌منطقه → منطقه مجاور → سایر مناطق',
                customIPDisabledHint: 'هنگام استفاده از ProxyIP سفارشی، انتخاب منطقه غیرفعال است',
                customIPMode: 'حالت ProxyIP سفارشی (متغیر p فعال است)',
                customIPModeDesc: 'حالت IP سفارشی (تطبیق منطقه غیرفعال است)',
                usingCustomProxyIP: 'استفاده از ProxyIP سفارشی: ',
                customIPConfig: ' (پیکربندی متغیر p)',
                customIPModeDisabled: 'حالت IP سفارشی، انتخاب منطقه غیرفعال است',
                manualRegion: 'تعیین منطقه دستی',
                manualRegionDesc: ' (تعیین دستی)',
                proxyIPAvailable: '10/10 در دسترس (دامنه پیش‌فرض ProxyIP در دسترس است)',
                smartSelection: 'انتخاب هوشمند نزدیک در حال انجام است',
                sameRegionIP: 'IP هم‌منطقه در دسترس است (1)',
                cloudflareDetection: 'تشخیص داخلی Cloudflare',
                detectionFailed: 'تشخیص ناموفق',
                apiTestResult: 'نتیجه تشخیص API: ',
                apiTestTime: 'زمان تشخیص: ',
                apiTestFailed: 'تشخیص API ناموفق: ',
                unknownError: 'خطای ناشناخته',
                apiTestError: 'تست API ناموفق: ',
                kvNotConfigured: 'ذخیره‌سازی KV پیکربندی نشده است، نمی‌توانید از عملکرد مدیریت تنظیمات استفاده کنید.\\n\\nلطفاً در Cloudflare Workers:\\n1. فضای نام KV ایجاد کنید\\n2. متغیر محیطی C را پیوند دهید\\n3. کد را دوباره مستقر کنید',
                kvNotEnabled: 'ذخیره‌سازی KV پیکربندی نشده است',
                kvCheckFailed: 'بررسی ذخیره‌سازی KV ناموفق: خطای فرمت پاسخ',
                kvCheckFailedStatus: 'بررسی ذخیره‌سازی KV ناموفق - کد وضعیت: ',
                kvCheckFailedError: 'بررسی ذخیره‌سازی KV ناموفق - خطا: ',
                preferredIPsURLPlaceholder: 'مثال: https://example.com/ips.txt',
                preferredIPsURLHint: 'استخراج IPهای ترجیحی از URL (متن ساده یا CSV).',
                preferredIPFilterTitle: 'فیلتر IPهای اولویت‌دار',
                ipVersionSelection: 'نسخه IP',
                ispSelection: 'اپراتور',
                ispMobile: 'همراه',
                ispUnicom: 'یونیکام',
                ispTelecom: 'تلکام',
                ipFilterHint: 'فیلترها فقط روی لیست‌های دریافت‌شده اعمال می‌شوند؛ ورودی دستی تغییری نمی‌کند.',
                threadsLabel: 'رشته‌ها',
                cityFilterAll: 'همه شهرها',
                cityFilterFastest10: '۱۰ مورد سریع‌تر',
                overwriteAdd: 'بازنویسی',
                appendAdd: 'افزودن',
                socks5ConfigPlaceholder: 'مثال: user:pass@host:port',
                generated: 'تولید شد:',
                cfRandomIPs: 'IP تصادفی CF',
                pleaseEnterUrl: 'لطفاً URL را وارد کنید',
                fetching: 'در حال دریافت...',
                fetched: 'دریافت شد:',
                ipCountSuffix: 'آی‌پی',
                noDataFound: 'داده‌ای یافت نشد',
                fetchFailed: 'دریافت ناموفق',
                pleaseEnterIPOrDomain: 'لطفاً IP یا دامنه وارد کنید',
                testing: 'در حال تست',
                testStopped: 'تست متوقف شد',
                selectAtLeastOne: 'لطفاً حداقل یک گزینه را انتخاب کنید',
                saving: 'در حال ذخیره...',
                overwritten: 'بازنویسی شد:',
                itemsSaved: ' مورد',
                appended: 'افزوده شد:',
                saveFailed: 'ذخیره ناموفق',
                timeoutLabel: 'زمان تمام شد',
                configNotConfigured: 'ذخیره‌سازی KV پیکربندی نشده است، بارگذاری تنظیمات ممکن نیست.',
                configLoadFailed: 'بارگذاری تنظیمات ناموفق بود',
                configLoadFailedStatus: 'بارگذاری تنظیمات ناموفق: ',
                currentConfigLabel: 'پیکربندی فعلی:\\n',
                currentConfigEmpty: '(بدون پیکربندی)',
                currentConfigUnset: '(تنظیم نشده)',
                pathTypeCustom: 'نوع استفاده: مسیر سفارشی (d)',
                pathTypeUUID: 'نوع استفاده: مسیر UUID (u)',
                currentPathLabel: 'مسیر فعلی',
                accessUrlLabel: 'آدرس دسترسی',
                echStatusLabel: 'وضعیت ECH:',
                statusEnabled: 'فعال',
                statusDisabled: 'غیرفعال',
                statusCheckFailed: 'بررسی ناموفق',
                configLengthLabel: 'طول پیکربندی',
                debugConsoleTitle: 'کنسول اشکال‌زدایی',
                debugShow: 'نمایش',
                debugHide: 'پنهان',
                debugReady: 'کنسول آماده است',
                debugUnknownError: 'خطای ناشناخته',
                debugUnhandledPromise: 'رد Promise بدون مدیریت',
                kvNotConfiguredSave: 'KV پیکربندی نشده است، ذخیره ممکن نیست. لطفاً در Cloudflare Workers KV را تنظیم کنید.',
                kvNotConfiguredReset: 'KV پیکربندی نشده است، بازنشانی ممکن نیست.',
                resetConfirm: 'آیا مطمئن هستید که همه تنظیمات بازنشانی شوند؟ این کار KV را پاک کرده و به متغیرهای محیطی برمی‌گرداند.',
                resetFailed: 'بازنشانی ناموفق',
                resetSuccess: 'پیکربندی بازنشانی شد',
                unknown: 'نامشخص'
            }
        };

            translations.fa = Object.assign({}, translations.en, translations.fa);
            translations.zh = Object.assign({}, translations.en, {
                title: '终端',
                terminal: '终端 v2.9.3',
                congratulations: '恭喜，你成功了！',
                enterU: '请输入你的 U 变量的值',
                enterD: '请输入你的 D 变量的值',
                command: '命令：connect [',
                uuid: 'UUID',
                path: '路径',
                inputU: '输入 U 变量内容并回车...',
                inputD: '输入 D 变量内容并回车...',
                connecting: '连接中...',
                invading: '正在连接...',
                success: '连接成功！正在返回结果...',
                error: '错误：UUID 格式无效',
                reenter: '请重新输入有效的 UUID',
                subtitle: '多客户端支持 • 智能优化 • 一键生成',
                selectClient: '[ 选择客户端 ]',
                systemStatus: '[ 系统状态 ]',
                configManagement: '[ 配置管理 ]',
                relatedLinks: '[ 相关链接 ]',
                checking: '检查中...',
                workerRegion: 'Worker 区域：',
                detectionMethod: '检测方式：',
                proxyIPStatus: 'ProxyIP 状态：',
                currentIP: '当前 IP：',
                regionMatch: '区域匹配：',
                selectionLogic: '选择逻辑：',
                kvStatusChecking: '正在检查 KV 状态...',
                kvEnabled: '✅ KV 已启用，可进行配置管理',
                kvDisabled: '⚠️ KV 未启用或未配置',
                specifyRegion: '指定区域 (wk)：',
                autoDetect: '自动检测',
                saveRegion: '保存区域配置',
                protocolSelection: '协议选择：',
                enableVLESS: '启用 VLESS 协议',
                enableVMess: '启用 VMess 协议',
                enableShadowsocks: '启用 Shadowsocks 协议',
                enableTrojan: '启用 Trojan 协议',
                enableXhttp: '启用 xhttp 协议',
                enableTUIC: '启用 TUIC 协议',
                enableHysteria2: '启用 Hysteria 2 协议',
                enableVLESSgRPC: '启用 VLESS gRPC 协议',
                linkOnlyHint: '需要外部后端（仅生成链接）',
                grpcHint: '需要自定义域名（gRPC）',
                trojanPassword: 'Trojan 密码（可选）：',
                customPath: '自定义路径 (d)：',
                customPathPlaceholder: '例如：/secret-path',
                customIP: '自定义 ProxyIP (p)：',
                customIPPlaceholder: '例如：1.2.3.4 或 proxy.example.com',
                preferredIPs: '优选 IP 列表 (yx)：',
                preferredIPsPlaceholder: '例如：1.1.1.1:443#HongKong, 8.8.8.8:443#USA',
                preferredIPsURL: '优选 IP 来源 URL (yxURL)：',
                latencyTest: '延迟测试',
                latencyTestIP: '测试 IP/域名：',
                latencyTestIPPlaceholder: '输入 IP 或域名，用逗号分隔',
                latencyTestPort: '端口：',
                startTest: '开始测试',
                stopTest: '停止测试',
                testResult: '测试结果：',
                addToYx: '添加到优选列表',
                addSelectedToYx: '添加选中项到优选列表',
                selectAll: '全选',
                deselectAll: '取消全选',
                testingInProgress: '测试中...',
                testComplete: '测试完成',
                latencyMs: '延迟（HTTP 握手）',
                timeout: '超时',
                ipSource: 'IP 来源：',
                manualInput: '手动输入',
                cfRandomIP: 'CF 随机 IP',
                urlFetch: '从 URL 获取',
                randomCount: '生成数量：',
                fetchURL: '获取 URL：',
                fetchURLPlaceholder: '输入 IP 列表 URL',
                generateIP: '生成 IP',
                fetchIP: '获取 IP',
                socks5Config: 'SOCKS5 配置 (s)：',
                customHomepage: '自定义首页 URL (homepage)：',
                customHomepagePlaceholder: '例如：https://example.com',
                customHomepageHint: '设置自定义 URL 作为伪装首页。访问根路径 / 时显示该内容。留空则显示默认终端页面。',
                customPathHint: '若设置，将只能通过该路径访问，UUID 访问将被禁用。建议使用复杂路径防止扫描。',
                customIPHint: '隐藏 Worker 真实 IP，或解决 Cloudflare Loop 问题。支持 IP:端口 或 域名:端口。',
                preferredIPsHint: '手动指定优选节点，优先级最高。格式：IP:端口#备注。',
                socks5ConfigHint: '格式：user:pass@host:port。Worker 将通过该代理连接目标。',
                saveConfig: '保存配置',
                advancedControl: '高级控制',
                subscriptionConverter: '订阅转换地址：',
                builtinPreferred: '内置优选类型：',
                enablePreferredDomain: '启用优选域名',
                enablePreferredIP: '启用优选 IP',
                enableGitHubPreferred: '启用 GitHub 默认优选',
                allowAPIManagement: '允许 API 管理 (ae)：',
                regionMatching: '区域匹配 (rm)：',
                downgradeControl: '降级控制 (qj)：',
                tlsControl: 'TLS 控制 (dkby)：',
                preferredControl: '优选控制 (yxby)：',
                saveAdvanced: '保存高级配置',
                loading: '加载中...',
                currentConfig: '📍 当前路径配置',
                refreshConfig: '刷新配置',
                resetConfig: '重置配置',
                subscriptionCopied: '订阅链接已复制',
                autoSubscriptionCopied: '已复制自动检测订阅链接，将根据 User-Agent 识别客户端。',
                trojanPasswordPlaceholder: '留空则使用 UUID',
                trojanPasswordHint: '设置自定义 Trojan 密码。留空则使用 UUID。客户端会用 SHA224 进行哈希。',
                protocolHint: '可启用多种协议。<br>• VLESS WS：标准 WebSocket 协议<br>• VMess WS：基于 WS 的 VMess（仅生成链接）<br>• Shadowsocks：基于 WS 的 SS（仅生成链接）<br>• Trojan：使用 SHA224 密码认证<br>• xhttp：HTTP POST 伪装（需要自定义域名 & gRPC）',
                enableECH: '启用 ECH（加密客户端 Hello）',
                enableECHHint: '启用后将从 DoH 获取 ECH 配置并在每次订阅刷新时加入链接',
                customDNS: '自定义 DNS 服务器',
                customDNSPlaceholder: '例如：https://dns.joeyblog.eu.org/joeyblog',
                customDNSHint: '用于查询 ECH 配置的 DNS 服务器（DoH 格式）',
                customECHDomain: '自定义 ECH 域名',
                customECHDomainPlaceholder: '例如：cloudflare-ech.com',
                customECHDomainHint: 'ECH 配置使用的域名，留空为默认',
                saveProtocol: '保存协议配置',
                subscriptionConverterPlaceholder: '默认：https://url.v1.mk/sub',
                subscriptionConverterHint: '自定义订阅转换 API，留空使用默认',
                builtinPreferredHint: '控制内置优选节点是否包含，默认全部启用',
                apiEnabledDefault: '默认（API 禁用）',
                apiEnabledYes: '启用 API 管理',
                apiEnabledHint: '⚠️ 安全提示：启用 API 允许动态添加优选 IP，仅在需要时开启',
                regionMatchingDefault: '默认（启用区域匹配）',
                regionMatchingNo: '关闭区域匹配',
                regionMatchingHint: '设置为“关闭”后，智能区域匹配将停止',
                downgradeControlDefault: '默认（禁用降级）',
                downgradeControlNo: '启用降级模式',
                downgradeControlHint: '启用后：CF 直连失败 -> SOCKS5 -> Fallback',
                tlsControlDefault: '默认（保留所有节点）',
                tlsControlYes: '仅 TLS 节点',
                tlsControlHint: '设置为“仅 TLS 节点”时，将不生成非 TLS 节点（如 80 端口）',
                preferredControlDefault: '默认（启用优选）',
                preferredControlYes: '关闭优选',
                preferredControlHint: '设置为“关闭优选”时，仅使用原生地址',
                regionNames: {
                    US: '🇺🇸 美国', SG: '🇸🇬 新加坡', JP: '🇯🇵 日本',
                    KR: '🇰🇷 韩国', DE: '🇩🇪 德国', SE: '🇸🇪 瑞典', NL: '🇳🇱 荷兰',
                    FI: '🇫🇮 芬兰', GB: '🇬🇧 英国', FR: '🇫🇷 法国', CA: '🇨🇦 加拿大',
                    AU: '🇦🇺 澳大利亚', HK: '🇭🇰 香港', TW: '🇹🇼 台湾'
                },
                githubProject: 'GitHub 项目',
                autoDetectClient: '自动识别',
                selectionLogicText: '同区域 -> 临近区域 -> 其他区域',
                customIPDisabledHint: '使用自定义 ProxyIP 时区域选择已禁用',
                customIPMode: '自定义 ProxyIP 模式（p 变量启用）',
                customIPModeDesc: '自定义 IP 模式（已禁用区域匹配）',
                usingCustomProxyIP: '使用自定义 ProxyIP：',
                customIPConfig: '（p 变量配置）',
                customIPModeDisabled: '自定义 IP 模式，区域选择已禁用',
                manualRegion: '手动指定区域',
                manualRegionDesc: '（手动）',
                proxyIPAvailable: '10/10 可用（预设 ProxyIP 域名可用）',
                smartSelection: '智能就近选择',
                sameRegionIP: '同区域 IP 可用（1个）',
                cloudflareDetection: 'Cloudflare 内置检测',
                detectionFailed: '检测失败',
                apiTestResult: 'API 检测结果：',
                apiTestTime: '检测耗时：',
                apiTestFailed: 'API 检测失败：',
                unknownError: '未知错误',
                apiTestError: 'API 测试失败：',
                kvNotConfigured: 'KV 存储未配置，配置管理不可用。\\n\\n请在 Cloudflare Workers：\\n1. 创建 KV Namespace\\n2. 绑定变量 C\\n3. 重新部署',
                kvNotEnabled: 'KV 存储未启用',
                kvCheckFailed: 'KV 检查失败：响应无效',
                kvCheckFailedStatus: 'KV 检查失败 - 状态码：',
                kvCheckFailedError: 'KV 检查失败 - 错误： ',
                preferredIPsURLPlaceholder: '例如：https://example.com/ips.txt',
                preferredIPsURLHint: '从 URL 拉取优选 IP，支持纯文本或 CSV。',
                preferredIPFilterTitle: '优选 IP 筛选',
                ipVersionSelection: 'IP 版本',
                ispSelection: '运营商',
                ispMobile: '移动',
                ispUnicom: '联通',
                ispTelecom: '电信',
                ipFilterHint: '过滤仅作用于列表解析，手动输入不受影响。',
                threadsLabel: '线程',
                cityFilterAll: '全部城市',
                cityFilterFastest10: '最快 10 个',
                overwriteAdd: '覆盖写入',
                appendAdd: '追加写入',
                socks5ConfigPlaceholder: '例如：user:pass@host:port',
                generated: '已生成',
                cfRandomIPs: 'CF 随机 IP',
                pleaseEnterUrl: '请输入 URL',
                fetching: '获取中...',
                fetched: '已获取',
                ipCountSuffix: '个 IP',
                noDataFound: '未找到数据',
                fetchFailed: '获取失败',
                pleaseEnterIPOrDomain: '请输入 IP 或域名',
                testing: '测试中',
                testStopped: '测试已停止',
                selectAtLeastOne: '请至少选择一个选项',
                saving: '保存中...',
                overwritten: '已覆盖',
                itemsSaved: ' 项',
                appended: '已追加',
                saveFailed: '保存失败',
                timeoutLabel: '超时',
                configNotConfigured: 'KV 存储未配置，无法加载配置',
                configLoadFailed: '加载配置失败',
                configLoadFailedStatus: '加载配置失败：',
                currentConfigLabel: '当前配置：\\n',
                currentConfigEmpty: '（暂无配置）',
                currentConfigUnset: '（未设置）',
                pathTypeCustom: '使用类型：自定义路径 (d)',
                pathTypeUUID: '使用类型：UUID 路径 (u)',
                currentPathLabel: '当前路径',
                accessUrlLabel: '访问地址',
                echStatusLabel: 'ECH 状态：',
                statusEnabled: '已启用',
                statusDisabled: '已禁用',
                statusCheckFailed: '检查失败',
                configLengthLabel: '配置长度',
                debugConsoleTitle: '调试控制台',
                debugShow: '展开',
                debugHide: '收起',
                debugReady: '控制台就绪',
                debugUnknownError: '未知错误',
                debugUnhandledPromise: '未处理的 Promise 拒绝',
                kvNotConfiguredSave: 'KV 未配置，无法保存。请在 Cloudflare Workers 配置 KV。',
                kvNotConfiguredReset: 'KV 未配置，无法重置。',
                resetConfirm: '确定要重置所有配置吗？这将清空 KV 并恢复为环境变量。',
                resetFailed: '重置失败',
                resetSuccess: '配置已重置',
                unknown: '未知',
                enableDiverseProxies: '启用多端口节点（生成全部端口）',
                enableDiverseProxiesHint: '为每个 IP 生成所有支持的端口（80、443、2053 等）。订阅体积会明显增大。'
            });
            const t = translations[lang] || translations.en;

        const pageHtml = `<!DOCTYPE html>
        <html lang="${langAttr}" dir="${isFarsi ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${t.title}</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&family=Space+Mono:wght@400;700&display=swap');
            :root {
                --bg-0: #040806;
                --bg-1: #071510;
                --panel: rgba(4, 12, 8, 0.9);
                --panel-strong: rgba(2, 10, 6, 0.95);
                --accent: #2cff9a;
                --accent-2: #13d0ff;
                --accent-dim: #00aa6a;
                --text: #d8ffef;
                --muted: #86d4a5;
                --danger: #ff5a5a;
                --glow: 0 0 24px rgba(44, 255, 154, 0.35);
                --font-sans: "Space Grotesk", "Segoe UI", "Noto Sans", sans-serif;
                --font-mono: "Space Mono", "Cascadia Mono", "Consolas", "Courier New", monospace;
            }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: var(--font-sans);
                background:
                    radial-gradient(1200px 600px at 10% -10%, rgba(44, 255, 154, 0.16), transparent 60%),
                    radial-gradient(900px 500px at 90% 120%, rgba(19, 208, 255, 0.12), transparent 60%),
                    linear-gradient(180deg, var(--bg-0) 0%, var(--bg-1) 100%);
                color: var(--accent);
                min-height: 100vh;
                overflow-x: hidden;
                position: relative;
            }
            body::before {
                content: "";
                position: fixed;
                inset: 0;
                background-image:
                    linear-gradient(120deg, rgba(44, 255, 154, 0.06), transparent 40%),
                    repeating-linear-gradient(0deg, rgba(0, 255, 170, 0.05) 0 1px, transparent 1px 3px),
                    repeating-linear-gradient(90deg, rgba(0, 255, 170, 0.04) 0 1px, transparent 1px 4px);
                opacity: 0.35;
                pointer-events: none;
                z-index: -1;
            }
            input, select, textarea, button {
                font-family: var(--font-mono) !important;
            }
            input, select, textarea {
                border-radius: 10px;
                transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
            }
            button {
                border-radius: 10px;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            input:focus-visible, select:focus-visible, textarea:focus-visible, button:focus-visible {
                outline: none;
                border-color: var(--accent) !important;
                box-shadow: 0 0 0 2px rgba(19, 208, 255, 0.25), 0 0 18px rgba(44, 255, 154, 0.35);
            }
            input, select, textarea, button {
                font-family: var(--font-mono) !important;
            }
            .matrix-bg {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: var(--bg-0);
                z-index: -1;
            }
            @keyframes bg-pulse {
                0%, 100% { background: linear-gradient(45deg, #000 0%, #001100 50%, #000 100%); }
                50% { background: linear-gradient(45deg, #000 0%, #002200 50%, #000 100%); }
            }
            .matrix-rain {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: transparent;
                z-index: -1;
                display: none;
            }
            @keyframes matrix-fall {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(100vh); }
            }
            .matrix-code-rain {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                pointer-events: none; z-index: -1;
                overflow: hidden;
                display: none;
            }
            .matrix-column {
                position: absolute; top: -100%; left: 0;
                color: #00ff00; font-family: "Courier New", monospace;
                font-size: 14px; line-height: 1.2;
                text-shadow: 0 0 5px #00ff00;
            }
            @keyframes matrix-drop {
                0% { top: -100%; opacity: 1; }
                10% { opacity: 1; }
                90% { opacity: 0.3; }
                100% { top: 100vh; opacity: 0; }
            }
            .matrix-column:nth-child(odd) {
                animation-duration: 12s;
                animation-delay: -2s;
            }
            .matrix-column:nth-child(even) {
                animation-duration: 18s;
                animation-delay: -5s;
            }
            .matrix-column:nth-child(3n) {
                animation-duration: 20s;
                animation-delay: -8s;
            }
            .container { max-width: 980px; margin: 0 auto; padding: 24px; position: relative; z-index: 1; }
            .header { text-align: center; margin-bottom: 48px; }
            .title {
                font-size: 3.2rem; font-weight: 600;
                font-family: var(--font-sans);
                letter-spacing: 0.06em;
                margin-bottom: 12px;
                position: relative;
                color: var(--text);
                text-shadow: 0 0 25px rgba(44, 255, 154, 0.4);
            }
            @keyframes matrix-glow {
                from { text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00, 0 0 40px #00ff00; }
                to { text-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00, 0 0 40px #00ff00, 0 0 50px #00ff00; }
            }
            @keyframes matrix-pulse {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            .subtitle { color: var(--muted); margin-bottom: 30px; font-size: 1.05rem; font-family: var(--font-mono); letter-spacing: 0.08em; text-transform: uppercase; }
            .card {
                background: var(--panel);
                border: 1px solid rgba(44, 255, 154, 0.5);
                border-radius: 16px; padding: 28px; margin-bottom: 22px;
                box-shadow: var(--glow), inset 0 0 20px rgba(44, 255, 154, 0.08);
                position: relative;
                backdrop-filter: blur(10px);
                box-sizing: border-box;
                width: 100%;
                max-width: 100%;
            }
            @keyframes card-glow {
                0%, 100% { box-shadow: 0 0 30px rgba(0, 255, 0, 0.5), inset 0 0 20px rgba(0, 255, 0, 0.1); }
                50% { box-shadow: 0 0 40px rgba(0, 255, 0, 0.7), inset 0 0 30px rgba(0, 255, 0, 0.2); }
            }
            .card::before {
                content: ""; position: absolute; top: 0; left: 0;
                width: 100%; height: 100%;
                background: none;
                opacity: 0; pointer-events: none;
            }
            @keyframes scan-line {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
            .card-title {
                font-size: 1.35rem; margin-bottom: 18px;
                color: var(--text);
                font-family: var(--font-sans);
                letter-spacing: 0.12em;
                text-transform: uppercase;
                text-shadow: 0 0 12px rgba(44, 255, 154, 0.35);
            }
            .client-grid {
                display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                gap: 15px; margin: 20px 0;
            }
            .client-btn {
                background: var(--panel-strong);
                border: 1px solid rgba(44, 255, 154, 0.5);
                padding: 14px 18px; color: var(--text);
                font-family: var(--font-mono); font-weight: 700;
                cursor: pointer; transition: all 0.4s ease;
                text-align: center; position: relative;
                overflow: hidden;
                letter-spacing: 0.08em;
                text-shadow: 0 0 6px rgba(44, 255, 154, 0.4);
                box-shadow: 0 0 14px rgba(44, 255, 154, 0.2);
            }
            .client-btn::before {
                content: ""; position: absolute; top: 0; left: -100%;
                width: 100%; height: 100%;
                background: linear-gradient(90deg, transparent, rgba(0,255,0,0.4), transparent);
                transition: left 0.6s ease;
            }
            .client-btn::after {
                content: ""; position: absolute; top: 0; left: 0;
                width: 100%; height: 100%;
                background: linear-gradient(45deg, transparent 30%, rgba(0,255,0,0.1) 50%, transparent 70%);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .client-btn:hover::before { left: 100%; }
            .client-btn:hover::after { opacity: 1; }
            .client-btn:hover {
                background: rgba(44, 255, 154, 0.18);
                box-shadow: 0 0 25px rgba(44, 255, 154, 0.5), 0 0 40px rgba(19, 208, 255, 0.35);
                transform: translateY(-3px) scale(1.04);
                text-shadow: 0 0 12px rgba(44, 255, 154, 0.7);
            }
            .generate-btn {
                background: rgba(44, 255, 154, 0.14);
                border: 1px solid rgba(44, 255, 154, 0.6); padding: 14px 28px;
                color: var(--text); font-family: var(--font-mono);
                font-weight: 700; cursor: pointer;
                transition: all 0.4s ease; margin-right: 15px;
                text-shadow: 0 0 8px rgba(44, 255, 154, 0.6);
                box-shadow: 0 0 18px rgba(44, 255, 154, 0.35);
                position: relative;
                overflow: hidden;
            }
            .generate-btn::before {
                content: ""; position: absolute; top: 0; left: -100%;
                width: 100%; height: 100%;
                background: linear-gradient(90deg, transparent, rgba(0,255,0,0.5), transparent);
                transition: left 0.8s ease;
            }
            .generate-btn:hover::before { left: 100%; }
            .generate-btn:hover {
                background: rgba(44, 255, 154, 0.28);
                box-shadow: 0 0 32px rgba(44, 255, 154, 0.6), 0 0 46px rgba(19, 208, 255, 0.4);
                transform: translateY(-4px) scale(1.06);
                text-shadow: 0 0 14px rgba(44, 255, 154, 0.9);
            }
            .atob('c3Vic2NyaXB0aW9u')-url {
                background: rgba(0, 0, 0, 0.9);
                border: 2px solid #00ff00; padding: 15px;
                word-break: break-all; font-family: "Courier New", monospace;
                color: #00ff00; margin-top: 20px; display: none;
                box-shadow: inset 0 0 15px rgba(0, 255, 0, 0.4), 0 0 20px rgba(0, 255, 0, 0.3);
                border-radius: 5px;
                position: relative;
                overflow-wrap: break-word;
                overflow-x: auto;
                max-width: 100%;
                box-sizing: border-box;
            }
            @keyframes url-glow {
                from { box-shadow: inset 0 0 15px rgba(0, 255, 0, 0.4), 0 0 20px rgba(0, 255, 0, 0.3); }
                to { box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.6), 0 0 30px rgba(0, 255, 0, 0.5); }
            }
            .atob('c3Vic2NyaXB0aW9u')-url::before {
                content: ""; position: absolute; top: 0; left: -100%;
                width: 100%; height: 100%;
                background: none;
            }
            @keyframes url-scan {
                0% { left: -100%; }
                100% { left: 100%; }
            }
            .matrix-text {
                position: fixed; top: 20px; right: 20px;
                color: var(--accent); font-family: var(--font-sans);
                font-size: 0.75rem; opacity: 0.75;
                letter-spacing: 0.2em;
                text-transform: uppercase;
            }
            @keyframes matrix-flicker {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
            }
            .debug-console {
                position: fixed; right: 20px; bottom: 20px;
                width: 360px; max-width: calc(100% - 40px);
                background: var(--panel-strong);
                border: 1px solid rgba(44, 255, 154, 0.5);
                color: var(--text);
                font-family: var(--font-mono);
                font-size: 12px;
                z-index: 3000;
                box-shadow: var(--glow);
            }
            .debug-console-header {
                display: flex; align-items: center; justify-content: space-between;
                padding: 6px 8px;
                border-bottom: 1px solid rgba(44, 255, 154, 0.35);
                cursor: pointer;
                user-select: none;
            }
            .debug-console-title { font-weight: bold; }
            .debug-console-toggle {
                background: transparent;
                border: 1px solid rgba(44, 255, 154, 0.6);
                color: var(--accent);
                font-size: 11px;
                padding: 2px 6px;
                cursor: pointer;
            }
            .debug-console-body {
                display: none;
                max-height: 200px;
                overflow-y: auto;
                padding: 8px;
            }
            .debug-console.open .debug-console-body { display: block; }
            .debug-console-line { margin-bottom: 6px; white-space: pre-wrap; word-break: break-word; }
            .debug-console-line.error { color: #ff6666; }
            .debug-console-line.warn { color: #ffaa00; }
            .debug-console-line.info { color: #66ff66; }
            @media (max-width: 720px) {
                .title { font-size: 2.4rem; }
                .card { padding: 20px; }
                .client-grid { grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); }
                .matrix-text { display: none; }
            }
            @media (prefers-reduced-motion: reduce) {
                * { animation: none !important; transition: none !important; }
            }
        </style>
    </head>
    <body>
        <div class="matrix-bg"></div>
        <div class="matrix-rain"></div>
        <div class="matrix-code-rain" id="matrixCodeRain"></div>
            <div class="matrix-text">${t.terminal}</div>
            <div style="position: fixed; top: 20px; left: 20px; z-index: 1000;">
                <select id="languageSelector" style="background: rgba(0, 20, 0, 0.9); border: 2px solid #00ff00; color: #00ff00; padding: 8px 12px; font-family: 'Courier New', monospace; font-size: 14px; cursor: pointer; text-shadow: 0 0 5px #00ff00; box-shadow: 0 0 15px rgba(0, 255, 0, 0.4);" onchange="changeLanguage(this.value)">
                    <option value="en" ${lang === 'en' ? 'selected' : ''}>🇺🇸 English</option>
                    <option value="zh" ${lang === 'zh' ? 'selected' : ''}>🇨🇳 中文</option>
                    <option value="fa" ${lang === 'fa' ? 'selected' : ''}>🇮🇷 فارسی</option>
                </select>
            </div>
        <div class="container">
            <div class="header">
                    <h1 class="title">${t.title}</h1>
                    <p class="subtitle">${t.subtitle}</p>
            </div>
            <div class="card">
                    <h2 class="card-title">${t.selectClient}</h2>
                <div class="client-grid">
                    <button class="client-btn" onclick="generateClientLink(atob('Y2xhc2g='), 'CLASH')">CLASH</button>
                    <button class="client-btn" onclick="generateClientLink(atob('Y2xhc2g='), 'STASH')">STASH</button>
                    <button class="client-btn" onclick="generateClientLink(atob('c3VyZ2U='), 'SURGE')">SURGE</button>
                    <button class="client-btn" onclick="generateClientLink(atob('c2luZ2JveA=='), 'SING-BOX')">SING-BOX</button>
                    <button class="client-btn" onclick="generateClientLink(atob('bG9vbg=='), 'LOON')">LOON</button>
                    <button class="client-btn" onclick="generateClientLink(atob('cXVhbng='), 'QUANTUMULT X')">QUANTUMULT X</button>
                    <button class="client-btn" onclick="generateClientLink(atob('djJyYXk='), 'V2RAY')">V2RAY</button>
                    <button class="client-btn" onclick="generateClientLink(atob('djJyYXk='), 'V2RAYNG')">V2RAYNG</button>
                    <button class="client-btn" onclick="generateClientLink(atob('djJyYXk='), 'NEKORAY')">NEKORAY</button>
                    <button class="client-btn" onclick="generateClientLink(atob('djJyYXk='), 'Shadowrocket')">Shadowrocket</button>
                </div>
                <div class=atob('c3Vic2NyaXB0aW9uLXVybA==') id="clientSubscriptionUrl"></div>
            </div>
            <div class="card">
                    <h2 class="card-title">${t.systemStatus}</h2>
                <div id="systemStatus" style="margin: 20px 0; padding: 15px; background: rgba(0, 20, 0, 0.8); border: 2px solid #00ff00; box-shadow: 0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 15px rgba(0, 255, 0, 0.1); position: relative; overflow: hidden;">
                        <div style="color: #00ff00; margin-bottom: 15px; font-weight: bold; text-shadow: 0 0 5px #00ff00;">[ ${t.checking} ]</div>
                        <div id="regionStatus" style="margin: 8px 0; color: #00ff00; font-family: 'Courier New', monospace; text-shadow: 0 0 3px #00ff00;">${t.workerRegion}${t.checking}</div>
                        <div id="geoInfo" style="margin: 8px 0; color: #00aa00; font-family: 'Courier New', monospace; font-size: 0.9rem; text-shadow: 0 0 3px #00aa00;">${t.detectionMethod}${t.checking}</div>
                        <div id="backupStatus" style="margin: 8px 0; color: #00ff00; font-family: 'Courier New', monospace; text-shadow: 0 0 3px #00ff00;">${t.proxyIPStatus}${t.checking}</div>
                        <div id="currentIP" style="margin: 8px 0; color: #00ff00; font-family: 'Courier New', monospace; text-shadow: 0 0 3px #00ff00;">${t.currentIP}${t.checking}</div>
                        <div id="echStatus" style="margin: 8px 0; color: #00ff00; font-family: 'Courier New', monospace; text-shadow: 0 0 3px #00ff00; font-size: 0.9rem;">${t.echStatusLabel} ${t.checking}</div>
                        <div id="regionMatch" style="margin: 8px 0; color: #00ff00; font-family: 'Courier New', monospace; text-shadow: 0 0 3px #00ff00;">${t.regionMatch}${t.checking}</div>
                        <div id="selectionLogic" style="margin: 8px 0; color: #00aa00; font-family: 'Courier New', monospace; font-size: 0.9rem; text-shadow: 0 0 3px #00aa00;">${t.selectionLogic}${t.selectionLogicText}</div>
                </div>
            </div>
            <div class="card" id="configCard" style="display: none;">
                    <h2 class="card-title">${t.configManagement}</h2>
                <div id="kvStatus" style="margin-bottom: 20px; padding: 10px; background: rgba(0, 20, 0, 0.8); border: 1px solid #00ff00; color: #00ff00;">
                        ${t.kvStatusChecking}
                </div>
                <div id="configContent" style="display: none;">
                    <form id="regionForm" style="margin-bottom: 20px;">
                        <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 8px; color: #00ff00; font-weight: bold; text-shadow: 0 0 3px #00ff00;">${t.specifyRegion}</label>
                            <select id="wkRegion" style="width: 100%; padding: 12px; background: rgba(0, 0, 0, 0.8); border: 2px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 14px;">
                                    <option value="">${t.autoDetect}</option>
                                    <option value="US">${t.regionNames.US}</option>
                                    <option value="SG">${t.regionNames.SG}</option>
                                    <option value="JP">${t.regionNames.JP}</option>
                                    <option value="KR">${t.regionNames.KR}</option>
                                    <option value="DE">${t.regionNames.DE}</option>
                                    <option value="SE">${t.regionNames.SE}</option>
                                    <option value="NL">${t.regionNames.NL}</option>
                                    <option value="FI">${t.regionNames.FI}</option>
                                    <option value="GB">${t.regionNames.GB}</option>
                            </select>
                                <small id="wkRegionHint" style="color: #00aa00; font-size: 0.85rem; display: none;">⚠️ ${t.customIPDisabledHint}</small>
                        </div>
                            <button type="submit" style="background: rgba(0, 255, 0, 0.15); border: 2px solid #00ff00; padding: 12px 24px; color: #00ff00; font-family: 'Courier New', monospace; font-weight: bold; cursor: pointer; margin-right: 10px; text-shadow: 0 0 8px #00ff00; transition: all 0.4s ease;">${t.saveRegion}</button>
                    </form>
                    <form id="otherConfigForm" style="margin-bottom: 20px;">
                        <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 8px; color: #00ff00; font-weight: bold; text-shadow: 0 0 3px #00ff00;">${t.protocolSelection}</label>
                            <div style="padding: 15px; background: rgba(0, 20, 0, 0.6); border: 1px solid #00ff00; border-radius: 5px;">
                                <div class="checkbox-item" style="margin-bottom: 10px;">
                                    <label style="display: inline-flex; align-items: center; cursor: pointer; color: #00ff00;">
                                        <input type="checkbox" id="ev" checked style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;">
                                        <span style="font-size: 1.05rem;">${t.enableVLESS}</span>
                                    </label>
                                </div>
                                <div class="checkbox-item" style="margin-bottom: 10px;">
                                    <label style="display: inline-flex; align-items: center; cursor: pointer; color: #00ff00;">
                                        <input type="checkbox" id="et" style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;">
                                        <span style="font-size: 1.05rem;">${t.enableTrojan}</span>
                                    </label>
                                </div>
                                <div class="checkbox-item" style="margin-bottom: 10px;">
                                    <label style="display: inline-flex; align-items: center; cursor: pointer; color: #00ff00;">
                                        <input type="checkbox" id="ex" style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;">
                                        <span style="font-size: 1.05rem;">${t.enableXhttp}</span>
                                    </label>
                                </div>

                                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px dashed rgba(44, 255, 154, 0.3);">
                                    <div class="checkbox-item" style="margin-top: 10px;">
                                        <label style="display: flex; align-items: center; color: #00ff00;"><input type="checkbox" id="evm" ${evm ? 'checked' : ''} style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;"> ${t.enableVMess}</label>
                                        <small style="color: #ffaa00; font-size: 0.8rem; display: block; margin-top: 2px; margin-left: 26px;">${t.linkOnlyHint}</small>
                                    </div>
                                    <div class="checkbox-item" style="margin-top: 10px;">
                                        <label style="display: flex; align-items: center; color: #00ff00;"><input type="checkbox" id="ess" ${ess ? 'checked' : ''} style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;"> ${t.enableShadowsocks}</label>
                                        <small style="color: #ffaa00; font-size: 0.8rem; display: block; margin-top: 2px; margin-left: 26px;">${t.linkOnlyHint}</small>
                                    </div>
                                    <div class="checkbox-item" style="margin-top: 10px;">
                                        <label style="display: flex; align-items: center; color: #00ff00;"><input type="checkbox" id="etu" ${etu ? 'checked' : ''} style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;"> ${t.enableTUIC}</label>
                                        <small style="color: #ffaa00; font-size: 0.8rem; display: block; margin-top: 2px; margin-left: 26px;">${t.linkOnlyHint}</small>
                                    </div>
                                    <div class="checkbox-item" style="margin-top: 10px;">
                                        <label style="display: flex; align-items: center; color: #00ff00;"><input type="checkbox" id="ehy" ${ehy ? 'checked' : ''} style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;"> ${t.enableHysteria2}</label>
                                        <small style="color: #ffaa00; font-size: 0.8rem; display: block; margin-top: 2px; margin-left: 26px;">${t.linkOnlyHint}</small>
                                    </div>
                                    <div class="checkbox-item" style="margin-top: 10px;">
                                        <label style="display: flex; align-items: center; color: #00ff00;"><input type="checkbox" id="eg" ${eg ? 'checked' : ''} style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;"> ${t.enableVLESSgRPC}</label>
                                        <small style="color: #ffaa00; font-size: 0.8rem; display: block; margin-top: 2px; margin-left: 26px;">${t.grpcHint}</small>
                                    </div>
                                </div>
                                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(0, 255, 0, 0.3);">
                                    <div style="margin-bottom: 10px;">
                                        <label style="display: inline-flex; align-items: center; cursor: pointer; color: #00ff00;">
                                            <input type="checkbox" id="ech" style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;">
                                                <span style="font-size: 1.1rem;">${t.enableECH}</span>
                                        </label>
                                        <small style="color: #00aa00; font-size: 0.8rem; display: block; margin-top: 5px; margin-left: 26px;">${t.enableECHHint}</small>
                                    </div>
                                    <div style="margin-top: 15px; margin-bottom: 10px;">
                                        <label style="display: block; margin-bottom: 8px; color: #00ff00; font-size: 0.95rem;">${t.customDNS}</label>
                                        <input type="text" id="customDNS" placeholder="${t.customDNSPlaceholder}" style="width: 100%; padding: 10px; background: rgba(0, 0, 0, 0.8); border: 1px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 13px;">
                                        <small style="color: #00aa00; font-size: 0.8rem; display: block; margin-top: 5px;">${t.customDNSHint}</small>
                                    </div>
                                    <div style="margin-bottom: 10px;">
                                        <label style="display: block; margin-bottom: 8px; color: #00ff00; font-size: 0.95rem;">${t.customECHDomain}</label>
                                        <input type="text" id="customECHDomain" placeholder="${t.customECHDomainPlaceholder}" style="width: 100%; padding: 10px; background: rgba(0, 0, 0, 0.8); border: 1px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 13px;">
                                        <small style="color: #00aa00; font-size: 0.8rem; display: block; margin-top: 5px;">${t.customECHDomainHint}</small>
                                    </div>
                                </div>
                                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(0, 255, 0, 0.3);">
                                        <label style="display: block; margin-bottom: 8px; color: #00ff00; font-size: 0.95rem;">${t.trojanPassword}</label>
                                        <input type="text" id="tp" placeholder="${t.trojanPasswordPlaceholder}" style="width: 100%; padding: 10px; background: rgba(0, 0, 0, 0.8); border: 1px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 13px;">
                                        <small style="color: #00aa00; font-size: 0.8rem; display: block; margin-top: 5px;">${t.trojanPasswordHint}</small>
                                </div>
                                    <small style="color: #00aa00; font-size: 0.85rem; display: block; margin-top: 10px;">${t.protocolHint}</small>
                                    <button type="button" id="saveProtocolBtn" style="margin-top: 15px; background: rgba(0, 255, 0, 0.15); border: 2px solid #00ff00; padding: 10px 20px; color: #00ff00; font-family: 'Courier New', monospace; font-weight: bold; cursor: pointer; text-shadow: 0 0 8px #00ff00; transition: all 0.4s ease; width: 100%;">${t.saveProtocol}</button>
                            </div>
                        </div>
                        <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 8px; color: #00ff00; font-weight: bold; text-shadow: 0 0 3px #00ff00;">${t.customHomepage}</label>
                                <input type="text" id="customHomepage" placeholder="${t.customHomepagePlaceholder}" style="width: 100%; padding: 12px; background: rgba(0, 0, 0, 0.8); border: 2px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 14px;">
                                <small style="color: #00aa00; font-size: 0.85rem;">${t.customHomepageHint}</small>
                        </div>
                        <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 8px; color: #00ff00; font-weight: bold; text-shadow: 0 0 3px #00ff00;">${t.customPath}</label>
                                <input type="text" id="customPath" placeholder="${t.customPathPlaceholder}" style="width: 100%; padding: 12px; background: rgba(0, 0, 0, 0.8); border: 2px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 14px;">
                                <small style="color: #00aa00; font-size: 0.85rem;">${t.customPathHint}</small>
                        </div>
                        <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 8px; color: #00ff00; font-weight: bold; text-shadow: 0 0 3px #00ff00;">${t.customIP}</label>
                                <input type="text" id="customIP" placeholder="${t.customIPPlaceholder}" style="width: 100%; padding: 12px; background: rgba(0, 0, 0, 0.8); border: 2px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 14px;">
                                <small style="color: #00aa00; font-size: 0.85rem;">${t.customIPHint}</small>
                        </div>
                        <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 8px; color: #00ff00; font-weight: bold; text-shadow: 0 0 3px #00ff00;">${t.preferredIPs}</label>
                                <input type="text" id="yx" placeholder="${t.preferredIPsPlaceholder}" style="width: 100%; padding: 12px; background: rgba(0, 0, 0, 0.8); border: 2px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 14px;">
                                <small style="color: #00aa00; font-size: 0.85rem;">${t.preferredIPsHint}</small>
                        </div>
                        <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 8px; color: #00ff00; font-weight: bold; text-shadow: 0 0 3px #00ff00;">${t.preferredIPsURL}</label>
                                <input type="text" id="yxURL" placeholder="${t.preferredIPsURLPlaceholder}" style="width: 100%; padding: 12px; background: rgba(0, 0, 0, 0.8); border: 2px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 14px;">
                                <small style="color: #00aa00; font-size: 0.85rem;">${t.preferredIPsURLHint}</small>
                        </div>

                        <div style="margin-bottom: 20px; padding: 15px; background: rgba(0, 40, 0, 0.6); border: 2px solid #00aa00; border-radius: 8px;">
                            <h4 style="color: #00ff00; margin: 0 0 15px 0; font-size: 1.1rem; text-shadow: 0 0 5px #00ff00;">⚡ ${t.latencyTest}</h4>
                            <div style="display: flex; gap: 10px; margin-bottom: 12px; flex-wrap: wrap; align-items: center;">
                                <div style="min-width: 120px;">
                                    <label style="display: block; margin-bottom: 5px; color: #00ff00; font-size: 0.9rem;">${t.ipSource}</label>
                                    <select id="ipSourceSelect" style="width: 100%; padding: 10px; background: rgba(0, 0, 0, 0.8); border: 1px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 13px; cursor: pointer;">
                                        <option value="manual">${t.manualInput}</option>
                                        <option value="cfRandom">${t.cfRandomIP}</option>
                                        <option value="urlFetch">${t.urlFetch}</option>
                                    </select>
                                </div>
                                <div style="width: 100px;">
                                    <label style="display: block; margin-bottom: 5px; color: #00ff00; font-size: 0.9rem;">${t.latencyTestPort}</label>
                                    <input type="number" id="latencyTestPort" value="443" min="1" max="65535" style="width: 100%; padding: 10px; background: rgba(0, 0, 0, 0.8); border: 1px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 13px;">
                                </div>
                                <div id="randomCountDiv" style="width: 100px; display: none;">
                                    <label style="display: block; margin-bottom: 5px; color: #00ff00; font-size: 0.9rem;">${t.randomCount}</label>
                                    <input type="number" id="randomIPCount" value="20" min="1" max="100" style="width: 100%; padding: 10px; background: rgba(0, 0, 0, 0.8); border: 1px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 13px;">
                                </div>
                                <div style="width: 80px;">
                                    <label style="display: block; margin-bottom: 5px; color: #00ff00; font-size: 0.9rem;">${t.threadsLabel}</label>
                                    <input type="number" id="testThreads" value="5" min="1" max="50" style="width: 100%; padding: 10px; background: rgba(0, 0, 0, 0.8); border: 1px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 13px;">
                                </div>
                            </div>
                            <div id="manualInputDiv" style="margin-bottom: 10px;">
                                <label style="display: block; margin-bottom: 5px; color: #00ff00; font-size: 0.9rem;">${t.latencyTestIP}</label>
                                <input type="text" id="latencyTestInput" placeholder="${t.latencyTestIPPlaceholder}" style="width: 100%; padding: 10px; background: rgba(0, 0, 0, 0.8); border: 1px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 13px;">
                            </div>
                            <div id="urlFetchDiv" style="margin-bottom: 10px; display: none;">
                                <label style="display: block; margin-bottom: 5px; color: #00ff00; font-size: 0.9rem;">${t.fetchURL}</label>
                                <div style="display: flex; gap: 8px;">
                                    <input type="text" id="fetchURLInput" placeholder="${t.fetchURLPlaceholder}" style="flex: 1; padding: 10px; background: rgba(0, 0, 0, 0.8); border: 1px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 13px;">
                                    <button type="button" id="fetchIPBtn" style="background: rgba(0, 200, 255, 0.2); border: 1px solid #00aaff; padding: 8px 16px; color: #00aaff; font-family: 'Courier New', monospace; cursor: pointer; white-space: nowrap;">⬇ ${t.fetchIP}</button>
                                </div>
                            </div>
                            <div id="cfRandomDiv" style="margin-bottom: 10px; display: none;">
                                <button type="button" id="generateCFIPBtn" style="background: rgba(0, 255, 0, 0.15); border: 1px solid #00ff00; padding: 10px 20px; color: #00ff00; font-family: 'Courier New', monospace; cursor: pointer; width: 100%; transition: all 0.3s;">🎲 ${t.generateIP}</button>
                            </div>
                            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                                <button type="button" id="startLatencyTest" style="background: rgba(0, 255, 0, 0.2); border: 1px solid #00ff00; padding: 8px 16px; color: #00ff00; font-family: 'Courier New', monospace; cursor: pointer; transition: all 0.3s;">▶ ${t.startTest}</button>
                                <button type="button" id="stopLatencyTest" style="background: rgba(255, 0, 0, 0.2); border: 1px solid #ff4444; padding: 8px 16px; color: #ff4444; font-family: 'Courier New', monospace; cursor: pointer; display: none; transition: all 0.3s;">⏹ ${t.stopTest}</button>
                            </div>
                            <div id="latencyTestStatus" style="color: #00aa00; font-size: 0.9rem; margin-bottom: 10px; display: none;"></div>
                            <div id="latencyTestResults" style="max-height: 250px; overflow-y: auto; display: none;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                    <span style="color: #00ff00; font-weight: bold;">${t.testResult}</span>
                                    <div style="display: flex; gap: 8px;">
                                        <button type="button" id="selectAllResults" style="background: transparent; border: 1px solid #00aa00; padding: 4px 10px; color: #00aa00; font-size: 0.8rem; cursor: pointer;">${t.selectAll}</button>
                                        <button type="button" id="deselectAllResults" style="background: transparent; border: 1px solid #00aa00; padding: 4px 10px; color: #00aa00; font-size: 0.8rem; cursor: pointer;">${t.deselectAll}</button>
                                    </div>
                                </div>
                                <div id="cityFilterContainer" style="margin-bottom: 10px; padding: 10px; background: rgba(0, 20, 0, 0.6); border: 1px solid #00aa00; border-radius: 4px; display: none;">
                                    <div style="margin-bottom: 8px;">
                                        <label style="display: inline-flex; align-items: center; cursor: pointer; color: #00ff00; font-size: 0.9rem;">
                                            <input type="radio" name="cityFilterMode" value="all" checked style="margin-right: 6px; width: 16px; height: 16px; cursor: pointer;">
                                            <span>${t.cityFilterAll}</span>
                                        </label>
                                        <label style="display: inline-flex; align-items: center; cursor: pointer; color: #00ff00; font-size: 0.9rem; margin-left: 15px;">
                                            <input type="radio" name="cityFilterMode" value="fastest10" style="margin-right: 6px; width: 16px; height: 16px; cursor: pointer;">
                                            <span>${t.cityFilterFastest10}</span>
                                        </label>
                                    </div>
                                    <div id="cityCheckboxesContainer" style="display: flex; flex-wrap: wrap; gap: 8px; max-height: 80px; overflow-y: auto; padding: 5px;"></div>
                                </div>
                                <div id="latencyResultsList" style="background: rgba(0, 0, 0, 0.5); border: 1px solid #004400; border-radius: 4px; padding: 10px;"></div>
                                <div style="margin-top: 10px; display: flex; gap: 10px;">
                                    <button type="button" id="overwriteSelectedToYx" style="flex: 1; background: rgba(0, 200, 0, 0.3); border: 1px solid #00ff00; padding: 10px 20px; color: #00ff00; font-family: 'Courier New', monospace; font-weight: bold; cursor: pointer; transition: all 0.3s;">${t.overwriteAdd}</button>
                                    <button type="button" id="appendSelectedToYx" style="flex: 1; background: rgba(0, 150, 0, 0.3); border: 1px solid #00aa00; padding: 10px 20px; color: #00aa00; font-family: 'Courier New', monospace; font-weight: bold; cursor: pointer; transition: all 0.3s;">${t.appendAdd}</button>
                                </div>
                            </div>
                        </div>

                        <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 8px; color: #00ff00; font-weight: bold; text-shadow: 0 0 3px #00ff00;">${t.socks5Config}</label>
                                <input type="text" id="socksConfig" placeholder="${t.socks5ConfigPlaceholder}" style="width: 100%; padding: 12px; background: rgba(0, 0, 0, 0.8); border: 2px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 14px;">
                                <small style="color: #00aa00; font-size: 0.85rem;">${t.socks5ConfigHint}</small>
                        </div>
                            <button type="submit" style="background: rgba(0, 255, 0, 0.15); border: 2px solid #00ff00; padding: 12px 24px; color: #00ff00; font-family: 'Courier New', monospace; font-weight: bold; cursor: pointer; margin-right: 10px; text-shadow: 0 0 8px #00ff00; transition: all 0.4s ease;">${t.saveConfig}</button>
                    </form>

                        <h3 style="color: #00ff00; margin: 20px 0 15px 0; font-size: 1.2rem;">${t.advancedControl}</h3>
                    <form id="advancedConfigForm" style="margin-bottom: 20px;">
                        <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 8px; color: #00ff00; font-weight: bold; text-shadow: 0 0 3px #00ff00;">${t.subscriptionConverter}</label>
                                <input type="text" id="scu" placeholder="${t.subscriptionConverterPlaceholder}" style="width: 100%; padding: 12px; background: rgba(0, 0, 0, 0.8); border: 2px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 14px;">
                                <small style="color: #00aa00; font-size: 0.85rem;">${t.subscriptionConverterHint}</small>
                        </div>
                        <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 8px; color: #00ff00; font-weight: bold; text-shadow: 0 0 3px #00ff00;">${t.builtinPreferred}</label>
                            <div style="padding: 15px; background: rgba(0, 20, 0, 0.6); border: 1px solid #00ff00; border-radius: 5px;">
                                <div style="margin-bottom: 10px;">
                                    <label style="display: inline-flex; align-items: center; cursor: pointer; color: #00ff00;">
                                        <input type="checkbox" id="epd" style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;">
                                            <span style="font-size: 1.1rem;">${t.enablePreferredDomain}</span>
                                    </label>
                                </div>
                                <div style="margin-bottom: 10px;">
                                    <label style="display: inline-flex; align-items: center; cursor: pointer; color: #00ff00;">
                                        <input type="checkbox" id="epi" checked style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;">
                                            <span style="font-size: 1.1rem;">${t.enablePreferredIP}</span>
                                    </label>
                                </div>
                                <div style="margin-bottom: 10px;">
                                    <label style="display: inline-flex; align-items: center; cursor: pointer; color: #00ff00;">
                                        <input type="checkbox" id="egi" checked style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;">
                                            <span style="font-size: 1.1rem;">${t.enableGitHubPreferred}</span>
                                    </label>
                                </div>

                                <div style="margin-bottom: 10px;">
                                    <label style="display: inline-flex; align-items: center; cursor: pointer; color: #00ff00;">
                                        <input type="checkbox" id="enableDiverseProxies" style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;">
                                            <span style="font-size: 1.1rem;">${t.enableDiverseProxies}</span>
                                    </label>
                                    <small style="color: #00aa00; font-size: 0.85rem; display: block; margin-top: 5px;">${t.enableDiverseProxiesHint}</small>
                                </div>

                                    <small style="color: #00aa00; font-size: 0.85rem; display: block; margin-top: 10px;">${t.builtinPreferredHint}</small>
                            </div>
                        </div>
                        <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 8px; color: #00ff00; font-weight: bold; text-shadow: 0 0 3px #00ff00;">${t.preferredIPFilterTitle}</label>
                            <div style="padding: 15px; background: rgba(0, 20, 0, 0.6); border: 1px solid #00ff00; border-radius: 5px;">
                                <div style="margin-bottom: 15px;">
                                    <label style="display: block; margin-bottom: 8px; color: #00ff00; font-weight: bold; text-shadow: 0 0 3px #00ff00;">${t.ipVersionSelection}</label>
                                    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                                        <label style="display: inline-flex; align-items: center; cursor: pointer; color: #00ff00;">
                                            <input type="checkbox" id="ipv4Enabled" checked style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;">
                                            <span style="font-size: 1rem;">IPv4</span>
                                        </label>
                                        <label style="display: inline-flex; align-items: center; cursor: pointer; color: #00ff00;">
                                            <input type="checkbox" id="ipv6Enabled" checked style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;">
                                            <span style="font-size: 1rem;">IPv6</span>
                                        </label>
                                    </div>
                                </div>
                                <div style="margin-bottom: 10px;">
                                    <label style="display: block; margin-bottom: 8px; color: #00ff00; font-weight: bold; text-shadow: 0 0 3px #00ff00;">${t.ispSelection}</label>
                                    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                                        <label style="display: inline-flex; align-items: center; cursor: pointer; color: #00ff00;">
                                            <input type="checkbox" id="ispMobile" checked style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;">
                                            <span style="font-size: 1rem;">${t.ispMobile}</span>
                                        </label>
                                        <label style="display: inline-flex; align-items: center; cursor: pointer; color: #00ff00;">
                                            <input type="checkbox" id="ispUnicom" checked style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;">
                                            <span style="font-size: 1rem;">${t.ispUnicom}</span>
                                        </label>
                                        <label style="display: inline-flex; align-items: center; cursor: pointer; color: #00ff00;">
                                            <input type="checkbox" id="ispTelecom" checked style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;">
                                            <span style="font-size: 1rem;">${t.ispTelecom}</span>
                                        </label>
                                    </div>
                                </div>
                                    <small style="color: #00aa00; font-size: 0.85rem; display: block; margin-top: 10px;">${t.ipFilterHint}</small>
                            </div>
                        </div>
                        <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 8px; color: #00ff00; font-weight: bold; text-shadow: 0 0 3px #00ff00;">${t.allowAPIManagement}</label>
                            <select id="apiEnabled" style="width: 100%; padding: 12px; background: rgba(0, 0, 0, 0.8); border: 2px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 14px;">
                                    <option value="">${t.apiEnabledDefault}</option>
                                    <option value="yes">${t.apiEnabledYes}</option>
                            </select>
                                <small style="color: #ffaa00; font-size: 0.85rem;">${t.apiEnabledHint}</small>
                        </div>
                        <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 8px; color: #00ff00; font-weight: bold; text-shadow: 0 0 3px #00ff00;">${t.regionMatching}</label>
                            <select id="regionMatching" style="width: 100%; padding: 12px; background: rgba(0, 0, 0, 0.8); border: 2px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 14px;">
                                    <option value="">${t.regionMatchingDefault}</option>
                                    <option value="no">${t.regionMatchingNo}</option>
                            </select>
                                <small style="color: #00aa00; font-size: 0.85rem;">${t.regionMatchingHint}</small>
                        </div>
                        <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 8px; color: #00ff00; font-weight: bold; text-shadow: 0 0 3px #00ff00;">${t.downgradeControl}</label>
                            <select id="downgradeControl" style="width: 100%; padding: 12px; background: rgba(0, 0, 0, 0.8); border: 2px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 14px;">
                                    <option value="">${t.downgradeControlDefault}</option>
                                    <option value="no">${t.downgradeControlNo}</option>
                            </select>
                                <small style="color: #00aa00; font-size: 0.85rem;">${t.downgradeControlHint}</small>
                        </div>
                        <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 8px; color: #00ff00; font-weight: bold; text-shadow: 0 0 3px #00ff00;">${t.tlsControl}</label>
                            <select id="portControl" style="width: 100%; padding: 12px; background: rgba(0, 0, 0, 0.8); border: 2px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 14px;">
                                    <option value="">${t.tlsControlDefault}</option>
                                    <option value="yes">${t.tlsControlYes}</option>
                            </select>
                                <small style="color: #00aa00; font-size: 0.85rem;">${t.tlsControlHint}</small>
                        </div>
                        <div style="margin-bottom: 15px;">
                                <label style="display: block; margin-bottom: 8px; color: #00ff00; font-weight: bold; text-shadow: 0 0 3px #00ff00;">${t.preferredControl}</label>
                            <select id="preferredControl" style="width: 100%; padding: 12px; background: rgba(0, 0, 0, 0.8); border: 2px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-size: 14px;">
                                    <option value="">${t.preferredControlDefault}</option>
                                    <option value="yes">${t.preferredControlYes}</option>
                            </select>
                                <small style="color: #00aa00; font-size: 0.85rem;">${t.preferredControlHint}</small>
                        </div>
                            <button type="submit" style="background: rgba(0, 255, 0, 0.15); border: 2px solid #00ff00; padding: 12px 24px; color: #00ff00; font-family: 'Courier New', monospace; font-weight: bold; cursor: pointer; margin-right: 10px; text-shadow: 0 0 8px #00ff00; transition: all 0.4s ease;">${t.saveAdvanced}</button>
                    </form>
                    <div id="currentConfig" style="background: rgba(0, 0, 0, 0.9); border: 1px solid #00ff00; padding: 15px; margin: 10px 0; font-family: 'Courier New', monospace; color: #00ff00;">
                            ${t.loading}
                    </div>
                    <div id="pathTypeInfo" style="background: rgba(0, 20, 0, 0.7); border: 1px solid #00ff00; padding: 15px; margin: 10px 0; font-family: 'Courier New', monospace; color: #00ff00;">
                            <div style="font-weight: bold; margin-bottom: 8px; color: #44ff44; text-shadow: 0 0 5px #44ff44;">${t.currentConfig}</div>
                            <div id="pathTypeStatus">${t.checking}</div>
                    </div>
                        <button onclick="loadCurrentConfig()" style="background: rgba(0, 255, 0, 0.15); border: 2px solid #00ff00; padding: 12px 24px; color: #00ff00; font-family: 'Courier New', monospace; font-weight: bold; cursor: pointer; margin-right: 10px; text-shadow: 0 0 8px #00ff00; transition: all 0.4s ease;">${t.refreshConfig}</button>
                        <button onclick="resetAllConfig()" style="background: rgba(255, 0, 0, 0.15); border: 2px solid #ff0000; padding: 12px 24px; color: #ff0000; font-family: 'Courier New', monospace; font-weight: bold; cursor: pointer; text-shadow: 0 0 8px #ff0000; transition: all 0.4s ease;">${t.resetConfig}</button>
                </div>
                <div id="statusMessage" style="display: none; padding: 10px; margin: 10px 0; border: 1px solid #00ff00; background: rgba(0, 20, 0, 0.8); color: #00ff00; text-shadow: 0 0 5px #00ff00;"></div>
            </div>

            <div class="card">
                    <h2 class="card-title">${t.relatedLinks}</h2>
                <div style="text-align: center; margin: 20px 0;">
                        <a href="https://github.com/byJoey/cfnew" target="_blank" style="color: #00ff00; text-decoration: none; margin: 0 20px; font-size: 1.2rem; text-shadow: 0 0 5px #00ff00;">${t.githubProject}</a>
                    <a href="https://www.youtube.com/@joeyblog" target="_blank" style="color: #00ff00; text-decoration: none; margin: 0 20px; font-size: 1.2rem; text-shadow: 0 0 5px #00ff00;">YouTube @joeyblog</a>
                </div>
            </div>
        </div>
        <div id="debugConsole" class="debug-console">
            <div class="debug-console-header" id="debugConsoleHeader">
                <span class="debug-console-title">${t.debugConsoleTitle}</span>
                <button type="button" class="debug-console-toggle" id="debugConsoleToggle">${t.debugShow}</button>
            </div>
            <div class="debug-console-body" id="debugConsoleBody"></div>
        </div>
        <script>
            // 订阅转换地址（从服务器配置注入）
            var SUB_CONVERTER_URL = "${ scu }";
            // Remote config URL (Hardcoded)
            var REMOTE_CONFIG_URL = "${ remoteConfigUrl }";
            var DEBUG_LOG_QUEUE = [];
            var DEBUG_CONSOLE_READY = false;
            var DEBUG_AUTO_OPEN = false;

            function stringifyConsoleValue(value) {
                if (value === null) return 'null';
                if (value === undefined) return 'undefined';
                if (value instanceof Error) return value.stack || value.message || String(value);
                if (typeof value === 'string') return value;
                if (typeof value === 'object') {
                    try { return JSON.stringify(value); } catch (error) { return String(value); }
                }
                return String(value);
            }

            function formatConsoleArgs(args) {
                return Array.prototype.map.call(args, stringifyConsoleValue).join(' ');
            }

            function ensureDebugConsoleOpen(level) {
                if (level !== 'error' && level !== 'warn') return;
                var consoleEl = document.getElementById('debugConsole');
                var toggleBtn = document.getElementById('debugConsoleToggle');
                if (!consoleEl || !toggleBtn) {
                    DEBUG_AUTO_OPEN = true;
                    return;
                }
                if (!consoleEl.classList.contains('open')) {
                    consoleEl.classList.add('open');
                    toggleBtn.textContent = t.debugHide || 'Hide';
                }
            }

            function debugConsolePush(message, level) {
                var entry = {
                    time: new Date().toISOString(),
                    level: level || 'info',
                    message: typeof message === 'string' ? message : stringifyConsoleValue(message)
                };
                DEBUG_LOG_QUEUE.push(entry);
                ensureDebugConsoleOpen(entry.level);
                if (DEBUG_CONSOLE_READY) {
                    debugConsoleFlush();
                }
            }

            function debugConsoleFlush() {
                if (!DEBUG_CONSOLE_READY) return;
                var body = document.getElementById('debugConsoleBody');
                if (!body) return;
                while (DEBUG_LOG_QUEUE.length) {
                    var entry = DEBUG_LOG_QUEUE.shift();
                    var line = document.createElement('div');
                    line.className = 'debug-console-line ' + entry.level;
                    line.textContent = '[' + entry.time + '] ' + entry.message;
                    body.appendChild(line);
                }
                body.scrollTop = body.scrollHeight;
            }

            function initDebugConsole() {
                var consoleEl = document.getElementById('debugConsole');
                var body = document.getElementById('debugConsoleBody');
                var toggleBtn = document.getElementById('debugConsoleToggle');
                var header = document.getElementById('debugConsoleHeader');
                if (!consoleEl || !body || !toggleBtn || !header) return;

                function toggle() {
                    consoleEl.classList.toggle('open');
                    toggleBtn.textContent = consoleEl.classList.contains('open') ? t.debugHide : t.debugShow;
                }

                header.addEventListener('click', toggle);
                toggleBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    toggle();
                });

                DEBUG_CONSOLE_READY = true;
                debugConsoleFlush();
                debugConsolePush(t.debugReady, 'info');
                if (DEBUG_AUTO_OPEN) {
                    consoleEl.classList.add('open');
                    toggleBtn.textContent = t.debugHide || 'Hide';
                }
            }

            window.addEventListener('error', function(event) {
                var message = event.message || t.debugUnknownError;
                var location = '';
                if (event.filename) {
                    location = event.filename + ':' + (event.lineno || 0) + ':' + (event.colno || 0);
                }
                debugConsolePush(message + (location ? ' @ ' + location : ''), 'error');
                if (event.error && event.error.stack) {
                    debugConsolePush(event.error.stack, 'error');
                }
            });

            window.addEventListener('unhandledrejection', function(event) {
                var reason = event.reason;
                if (reason && reason.stack) {
                    debugConsolePush(reason.stack, 'error');
                } else {
                    debugConsolePush(String(reason || t.debugUnhandledPromise), 'error');
                }
            });

            (function() {
                if (!window.console) return;
                var originalLog = console.log;
                var originalInfo = console.info;
                var originalDebug = console.debug;
                var originalError = console.error;
                var originalWarn = console.warn;
                console.log = function() {
                    debugConsolePush(formatConsoleArgs(arguments), 'info');
                    if (originalLog) originalLog.apply(console, arguments);
                };
                console.info = function() {
                    debugConsolePush(formatConsoleArgs(arguments), 'info');
                    if (originalInfo) originalInfo.apply(console, arguments);
                };
                console.debug = function() {
                    debugConsolePush(formatConsoleArgs(arguments), 'info');
                    if (originalDebug) originalDebug.apply(console, arguments);
                };
                console.error = function() {
                    debugConsolePush(formatConsoleArgs(arguments), 'error');
                    if (originalError) originalError.apply(console, arguments);
                };
                console.warn = function() {
                    debugConsolePush(formatConsoleArgs(arguments), 'warn');
                    if (originalWarn) originalWarn.apply(console, arguments);
                };
            })();

                // 翻译对象
                                const translations = ${JSON.stringify(translations)};

                function getCookie(name) {
                    const value = '; ' + document.cookie;
                    const parts = value.split('; ' + name + '=');
                    if (parts.length === 2) return parts.pop()?.split(';').shift();
                    return null;
                }

                function getPreferredLanguage() {
                    const savedLang = localStorage.getItem('preferredLanguage') || getCookie('preferredLanguage') || '';
                    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();

                    if (savedLang) {
                        if (savedLang === 'fa' || savedLang === 'fa-IR') return 'fa';
                        if (savedLang === 'zh' || savedLang === 'zh-CN' || savedLang === 'zh-Hans') return 'zh';
                        return 'en';
                    }

                    if (browserLang.startsWith('fa')) return 'fa';
                    if (browserLang.startsWith('zh')) return 'zh';
                    return 'en';
                }

                function getTranslations() {
                    const lang = getPreferredLanguage();
                    const base = translations.en || {};
                    const current = translations[lang] || {};
                    const merged = Object.assign({}, base, current);
                    if (base.regionNames || current.regionNames) {
                        merged.regionNames = Object.assign({}, base.regionNames || {}, current.regionNames || {});
                    }
                    return merged;
                }

                t = getTranslations();

                function changeLanguage(lang) {
                    localStorage.setItem('preferredLanguage', lang);
                    // Set Cookie (valid for 1 year)
                    const expiryDate = new Date();
                    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                    document.cookie = 'preferredLanguage=' + lang + '; path=/; expires=' + expiryDate.toUTCString() + '; SameSite=Lax';
                    // Reload page, do not use URL parameters
                    window.location.reload();
                }

                // Check localStorage and Cookie on page load, and clean up URL parameters
                window.addEventListener('DOMContentLoaded', function() {
                    const savedLang = localStorage.getItem('preferredLanguage') || getCookie('preferredLanguage');
                    const urlParams = new URLSearchParams(window.location.search);
                    const urlLang = urlParams.get('lang');

                    // If URL has language parameter, remove it and set Cookie
                    if (urlLang) {
                        const currentUrl = new URL(window.location.href);
                        currentUrl.searchParams.delete('lang');
                        const newUrl = currentUrl.toString();

                        // 设置Cookie
                        const expiryDate = new Date();
                        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                        document.cookie = 'preferredLanguage=' + urlLang + '; path=/; expires=' + expiryDate.toUTCString() + '; SameSite=Lax';
                        localStorage.setItem('preferredLanguage', urlLang);

                        // Use history API to remove URL parameter, do not reload page
                        window.history.replaceState({}, '', newUrl);
                    } else if (savedLang) {
                        // If present in localStorage but not in Cookie, sync to Cookie
                        const expiryDate = new Date();
                        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                        document.cookie = 'preferredLanguage=' + savedLang + '; path=/; expires=' + expiryDate.toUTCString() + '; SameSite=Lax';
                    }
                });

            function tryOpenApp(schemeUrl, fallbackCallback, timeout) {
                timeout = timeout || 2500;
                var appOpened = false;
                var callbackExecuted = false;
                var startTime = Date.now();

                var blurHandler = function() {
                    var elapsed = Date.now() - startTime;
                    if (elapsed < 3000 && !callbackExecuted) {
                        appOpened = true;
                    }
                };

                window.addEventListener('blur', blurHandler);

                var hiddenHandler = function() {
                    var elapsed = Date.now() - startTime;
                    if (elapsed < 3000 && !callbackExecuted) {
                        appOpened = true;
                    }
                };

                document.addEventListener('visibilitychange', hiddenHandler);

                var iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.style.width = '1px';
                iframe.style.height = '1px';
                iframe.src = schemeUrl;
                document.body.appendChild(iframe);

                setTimeout(function() {
                    iframe.parentNode && iframe.parentNode.removeChild(iframe);
                    window.removeEventListener('blur', blurHandler);
                    document.removeEventListener('visibilitychange', hiddenHandler);

                    if (!callbackExecuted) {
                        callbackExecuted = true;
                        if (!appOpened && fallbackCallback) {
                            fallbackCallback();
                        }
                    }
                }, timeout);
            }

            function generateClientLink(clientType, clientName) {
                var currentUrl = window.location.href;
                var subscriptionUrl = currentUrl + "/sub";
                var schemeUrl = '';
                var displayName = clientName || '';
                var finalUrl = subscriptionUrl;

                if (clientType === atob('djJyYXk=')) {
                    finalUrl = subscriptionUrl;
                    var urlElement = document.getElementById("clientSubscriptionUrl");
                    urlElement.textContent = finalUrl;
                    urlElement.style.display = "block";
                    urlElement.style.overflowWrap = "break-word";
                    urlElement.style.wordBreak = "break-all";
                    urlElement.style.overflowX = "auto";
                    urlElement.style.maxWidth = "100%";
                    urlElement.style.boxSizing = "border-box";

                    if (clientName === 'V2RAY') {
                        navigator.clipboard.writeText(finalUrl).then(function() {
                                alert(displayName + " " + t.subscriptionCopied);
                        });
                    } else if (clientName === 'Shadowrocket') {
                        schemeUrl = 'shadowrocket://add/' + encodeURIComponent(finalUrl);
                        tryOpenApp(schemeUrl, function() {
                            navigator.clipboard.writeText(finalUrl).then(function() {
                                    alert(displayName + " " + t.subscriptionCopied);
                            });
                        });
                    } else if (clientName === 'V2RAYNG') {
                        schemeUrl = 'v2rayng://install?url=' + encodeURIComponent(finalUrl);
                        tryOpenApp(schemeUrl, function() {
                            navigator.clipboard.writeText(finalUrl).then(function() {
                                    alert(displayName + " " + t.subscriptionCopied);
                            });
                        });
                    } else if (clientName === 'NEKORAY') {
                        schemeUrl = 'nekoray://install-config?url=' + encodeURIComponent(finalUrl);
                        tryOpenApp(schemeUrl, function() {
                            navigator.clipboard.writeText(finalUrl).then(function() {
                                    alert(displayName + " " + t.subscriptionCopied);
                            });
                        });
                    }
                } else {
                    // 检查 ECH 是否开启
                    var echEnabled = document.getElementById('ech') && document.getElementById('ech').checked;

                    // 如果 ECH 开启且是 Clash，直接使用后端接口
                    if (echEnabled && clientType === atob('Y2xhc2g=')) {
                        finalUrl = subscriptionUrl + "?target=" + clientType;
                        var urlElement = document.getElementById("clientSubscriptionUrl");
                        urlElement.textContent = finalUrl;
                        urlElement.style.display = "block";
                        urlElement.style.overflowWrap = "break-word";
                        urlElement.style.wordBreak = "break-all";
                        urlElement.style.overflowX = "auto";
                        urlElement.style.maxWidth = "100%";
                        urlElement.style.boxSizing = "border-box";

                        if (clientName === 'STASH') {
                            schemeUrl = 'stash://install?url=' + encodeURIComponent(finalUrl);
                            displayName = 'STASH';
                        } else {
                            schemeUrl = 'clash://install-config?url=' + encodeURIComponent(finalUrl);
                            displayName = 'CLASH';
                        }

                        if (schemeUrl) {
                            tryOpenApp(schemeUrl, function() {
                                navigator.clipboard.writeText(finalUrl).then(function() {
                                        alert(displayName + " " + t.subscriptionCopied);
                                });
                            });
                        } else {
                            navigator.clipboard.writeText(finalUrl).then(function() {
                                    alert(displayName + " " + t.subscriptionCopied);
                            });
                        }
                    } else {
                        // 其他情况使用订阅转换服务
                        var encodedUrl = encodeURIComponent(subscriptionUrl);
                        finalUrl = SUB_CONVERTER_URL + "?target=" + clientType + "&url=" + encodedUrl + "&insert=false&config=" + encodeURIComponent(REMOTE_CONFIG_URL) + "&emoji=true&list=false&xudp=false&udp=false&tfo=false&expand=true&scv=false&fdn=false&new_name=true";
                        var urlElement = document.getElementById("clientSubscriptionUrl");
                        urlElement.textContent = finalUrl;
                        urlElement.style.display = "block";
                        urlElement.style.overflowWrap = "break-word";
                        urlElement.style.wordBreak = "break-all";
                        urlElement.style.overflowX = "auto";
                        urlElement.style.maxWidth = "100%";
                        urlElement.style.boxSizing = "border-box";

                        if (clientType === atob('Y2xhc2g=')) {
                            if (clientName === 'STASH') {
                                schemeUrl = 'stash://install?url=' + encodeURIComponent(finalUrl);
                                displayName = 'STASH';
                            } else {
                                schemeUrl = 'clash://install-config?url=' + encodeURIComponent(finalUrl);
                                displayName = 'CLASH';
                            }
                        } else if (clientType === atob('c3VyZ2U=')) {
                            schemeUrl = 'surge:///install-config?url=' + encodeURIComponent(finalUrl);
                            displayName = 'SURGE';
                        } else if (clientType === atob('c2luZ2JveA==')) {
                            schemeUrl = 'sing-box://install-config?url=' + encodeURIComponent(finalUrl);
                            displayName = 'SING-BOX';
                        } else if (clientType === atob('bG9vbg==')) {
                            schemeUrl = 'loon://install?url=' + encodeURIComponent(finalUrl);
                            displayName = 'LOON';
                        } else if (clientType === atob('cXVhbng=')) {
                            schemeUrl = 'quantumult-x://install-config?url=' + encodeURIComponent(finalUrl);
                            displayName = 'QUANTUMULT X';
                        }

                        if (schemeUrl) {
                            tryOpenApp(schemeUrl, function() {
                                navigator.clipboard.writeText(finalUrl).then(function() {
                                        alert(displayName + " " + t.subscriptionCopied);
                                });
                            });
                        } else {
                            navigator.clipboard.writeText(finalUrl).then(function() {
                                    alert(displayName + " " + t.subscriptionCopied);
                            });
                        }
                    }
                }
            }

            function createMatrixRain() {
                const matrixContainer = document.getElementById('matrixCodeRain');
                const matrixChars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                const columns = Math.floor(window.innerWidth / 18);

                for (let i = 0; i < columns; i++) {
                    const column = document.createElement('div');
                    column.className = 'matrix-column';
                    column.style.left = (i * 18) + 'px';
                    column.style.animationDelay = Math.random() * 15 + 's';
                    column.style.animationDuration = (Math.random() * 15 + 8) + 's';
                    column.style.fontSize = (Math.random() * 4 + 12) + 'px';
                    column.style.opacity = Math.random() * 0.8 + 0.2;

                    let text = '';
                    const charCount = Math.floor(Math.random() * 30 + 20);
                    for (let j = 0; j < charCount; j++) {
                        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                        const brightness = Math.random() > 0.1 ? '#00ff00' : '#00aa00';
                        text += '<span style="color: ' + brightness + ';">' + char + '</span><br>';
                    }
                    column.innerHTML = text;
                    matrixContainer.appendChild(column);
                }

                setInterval(function() {
                    const columns = matrixContainer.querySelectorAll('.matrix-column');
                    columns.forEach(function(column) {
                        if (Math.random() > 0.95) {
                            const chars = column.querySelectorAll('span');
                            if (chars.length > 0) {
                                const randomChar = chars[Math.floor(Math.random() * chars.length)];
                                randomChar.style.color = '#ffffff';
                                setTimeout(function() {
                                    randomChar.style.color = '#00ff00';
                                }, 200);
                            }
                        }
                    });
                }, 100);
            }

            async function checkSystemStatus() {
                try {
                    const cfStatus = document.getElementById('cfStatus');
                    const regionStatus = document.getElementById('regionStatus');
                    const geoInfo = document.getElementById('geoInfo');
                    const backupStatus = document.getElementById('backupStatus');
                    const currentIP = document.getElementById('currentIP');
                    const regionMatch = document.getElementById('regionMatch');

                        // 获取当前语言设置（优先从Cookie/localStorage读取）
                        function getCookie(name) {
                            const value = '; ' + document.cookie;
                            const parts = value.split('; ' + name + '=');
                            if (parts.length === 2) return parts.pop()?.split(';').shift();
                            return null;
                        }

                        const browserLang = navigator.language || navigator.userLanguage || '';
                        const savedLang = localStorage.getItem('preferredLanguage') || getCookie('preferredLanguage');
                        let isFarsi = false;

                        if (savedLang === 'fa' || savedLang === 'fa-IR') {
                            isFarsi = true;
                        } else if (savedLang === 'zh' || savedLang === 'en-US') {
                            isFarsi = false;
                        } else {
                            isFarsi = browserLang.includes('fa') || browserLang.includes('fa-IR');
                        }

                        const translations = {
                            en: {
                    title: 'Terminal',
                    congratulations: 'Congratulations, you made it!',
                    enterU: 'Please enter the value of your U variable',
                    enterD: 'Please enter the value of your D variable',
                    command: 'Command: connect [',
                    uuid: 'UUID',
                    path: 'PATH',
                    inputU: 'Enter content of U variable and press Enter...',
                    inputD: 'Enter content of D variable and press Enter...',
                    connecting: 'Connecting...',
                    invading: 'Invading...',
                    success: 'Connection successful! Returning result...',
                    error: 'Error: Invalid UUID format',
                    reenter: 'Please re-enter a valid UUID',

                    // Subscription Page Translations
                    subtitle: 'Multi-client Support • Smart Optimization • One-Click Generation',
                    selectClient: '[ Select Client ]',
                    systemStatus: '[ System Status ]',
                    configManagement: '[ Config Management ]',
                    relatedLinks: '[ Related Links ]',
                    checking: 'Checking...',
                    workerRegion: 'Worker Region: ',
                    detectionMethod: 'Detection Method: ',
                    proxyIPStatus: 'ProxyIP Status: ',
                    currentIP: 'Current IP: ',
                    regionMatch: 'Region Match: ',
                    selectionLogic: 'Selection Logic: ',
                    kvStatusChecking: 'Checking KV Status...',
                    kvEnabled: '✅ KV Storage Enabled, Config Management Available',
                    kvDisabled: '⚠️ KV Storage Disabled or Not Configured',
                    specifyRegion: 'Specify Region (wk):',
                    autoDetect: 'Auto Detect',
                    saveRegion: 'Save Region Config',
                    protocolSelection: 'Protocol Selection:',
                    enableVLESS: 'Enable VLESS Protocol',
                    enableVMess: 'Enable VMess Protocol',
                    enableShadowsocks: 'Enable Shadowsocks Protocol',
                    enableTrojan: 'Enable Trojan Protocol',
                    enableXhttp: 'Enable xhttp Protocol',
                    enableTUIC: 'Enable TUIC Protocol',
                    enableHysteria2: 'Enable Hysteria 2 Protocol',
                    enableVLESSgRPC: 'Enable VLESS gRPC Protocol',
                    linkOnlyHint: 'Requires External Backend (Link-Only)',
                    grpcHint: 'Requires Custom Domain (gRPC)',
                    trojanPassword: 'Trojan Password (Optional):',
                    customPath: 'Custom Path (d):',
                    customPathPlaceholder: 'e.g., /secret-path',
                    customIP: 'Custom ProxyIP (p):',
                    customIPPlaceholder: 'e.g., 1.2.3.4 or proxy.example.com',
                    preferredIPs: 'Preferred IP List (yx):',
                    preferredIPsPlaceholder: 'e.g., 1.1.1.1:443#HongKong, 8.8.8.8:443#USA',
                    preferredIPsURL: 'Preferred IP Source URL (yxURL):',
                    latencyTest: 'Latency Test',
                    latencyTestIP: 'Test IP/Domain:',
                    latencyTestIPPlaceholder: 'Enter IP or Domain, comma separated',
                    latencyTestPort: 'Port:',
                    startTest: 'Start Test',
                    stopTest: 'Stop Test',
                    testResult: 'Test Result:',
                    addToYx: 'Add to Preferred List',
                    addSelectedToYx: 'Add Selected to Preferred List',
                    selectAll: 'Select All',
                    deselectAll: 'Deselect All',
                    testingInProgress: 'Testing...',
                    testComplete: 'Test Complete',
                    latencyMs: 'Latency (HTTP Handshake)',
                    timeout: 'Timeout',
                    ipSource: 'IP Source:',
                    manualInput: 'Manual Input',
                    cfRandomIP: 'CF Random IP',
                    urlFetch: 'Fetch from URL',
                    randomCount: 'Generate Count:',
                    fetchURL: 'Fetch URL:',
                    fetchURLPlaceholder: 'Enter URL of IP list',
                    generateIP: 'Generate IP',
                    fetchIP: 'Fetch IP',
                    socks5Config: 'SOCKS5 Config (s):',
                    customHomepage: 'Custom Homepage URL (homepage):',
                    customHomepagePlaceholder: 'e.g., https://example.com',
                    customHomepageHint: 'Set custom URL as homepage camouflage. Content of this URL will be shown when accessing root path /. Leave empty to show default terminal page.',
                    customPathHint: 'Only accessible via this path if set. UUID access will be disabled. Suggest using complex path to prevent scanning.',
                    customIPHint: 'Hide Worker real IP, or solve Cloudflare Loop issue. Supports IP:Port or Domain:Port.',
                    preferredIPsHint: 'Manually specify preferred nodes. Highest priority. Format: IP:Port#Remark.',
                    socks5ConfigHint: 'Format: user:pass@host:port. Worker will connect to target via this proxy.',
                    saveConfig: 'Save Config',
                    advancedControl: 'Advanced Control',
                    subscriptionConverter: 'Sub Converter URL:',
                    builtinPreferred: 'Built-in Preferred Type:',
                    enablePreferredDomain: 'Enable Preferred Domain',
                    enablePreferredIP: 'Enable Preferred IP',
                    enableGitHubPreferred: 'Enable GitHub Default Preferred',
                    allowAPIManagement: 'Allow API Management (ae):',
                    regionMatching: 'Region Matching (rm):',
                    downgradeControl: 'Downgrade Control (qj):',
                    tlsControl: 'TLS Control (dkby):',
                    preferredControl: 'Preferred Control (yxby):',
                    saveAdvanced: 'Save Advanced Config',
                    loading: 'Loading...',
                    currentConfig: '📍 Current Path Config',
                    refreshConfig: 'Refresh Config',
                    resetConfig: 'Reset Config',
                    subscriptionCopied: 'Subscription Link Copied',
                    autoSubscriptionCopied: 'Auto-detected subscription link copied. Client will be recognized by User-Agent.',
                    trojanPasswordPlaceholder: 'Leave empty to use UUID',
                    trojanPasswordHint: 'Set custom Trojan password. Leave empty to use UUID. Client will auto-hash password with SHA224.',
                    protocolHint: 'Multiple protocols can be enabled.<br>• VLESS WS: Standard WebSocket protocol<br>• VMess WS: WebSocket-based VMess (link generation)<br>• Shadowsocks: WebSocket-based SS (link generation)<br>• Trojan: Uses SHA224 password auth<br>• xhttp: HTTP POST camouflage (requires custom domain & gRPC)',
                    enableECH: 'Enable ECH (Encrypted Client Hello)',
                    enableECHHint: 'When enabled, ECH config is fetched from DoH and added to links on every sub refresh',
                    customDNS: 'Custom DNS Server',
                    customDNSPlaceholder: 'e.g., https://dns.joeyblog.eu.org/joeyblog',
                    customDNSHint: 'DNS server for ECH config query (DoH format)',
                    customECHDomain: 'Custom ECH Domain',
                    customECHDomainPlaceholder: 'e.g., cloudflare-ech.com',
                    customECHDomainHint: 'Domain used in ECH config, leave empty for default',
                    saveProtocol: 'Save Protocol Config',
                    subscriptionConverterPlaceholder: 'Default: https://url.v1.mk/sub',
                    subscriptionConverterHint: 'Custom subscription converter API, leave empty for default',
                    builtinPreferredHint: 'Control which built-in preferred nodes are included. Default all enabled.',
                    apiEnabledDefault: 'Default (API Disabled)',
                    apiEnabledYes: 'Enable API Management',
                    apiEnabledHint: '⚠️ Security Warning: Enabling API allows dynamic preferred IP addition. Use only if needed.',
                    regionMatchingDefault: 'Default (Enable Region Match)',
                    regionMatchingNo: 'Disable Region Match',
                    regionMatchingHint: 'Smart region matching disabled when set to "Disable"',
                    downgradeControlDefault: 'Default (Disable Downgrade)',
                    downgradeControlNo: 'Enable Downgrade Mode',
                    downgradeControlHint: 'When enabled: CF Direct Fail -> SOCKS5 -> Fallback',
                    tlsControlDefault: 'Default (Keep All Nodes)',
                    tlsControlYes: 'TLS Nodes Only',
                    tlsControlHint: 'When set to "TLS Nodes Only", non-TLS nodes (e.g., port 80) are not generated',
                    preferredControlDefault: 'Default (Enable Preferred)',
                    preferredControlYes: 'Disable Preferred',
                    preferredControlHint: 'When set to "Disable Preferred", only native address is used',
                    regionNames: {
                        US: '🇺🇸 US', SG: '🇸🇬 Singapore', JP: '🇯🇵 Japan',
                        KR: '🇰🇷 South Korea', DE: '🇩🇪 Germany', SE: '🇸🇪 Sweden', NL: '🇳🇱 Netherlands',
                        FI: '🇫🇮 Finland', GB: '🇬🇧 UK', FR: '🇫🇷 France', CA: '🇨🇦 Canada',
                        AU: '🇦🇺 Australia', HK: '🇭🇰 Hong Kong', TW: '🇹🇼 Taiwan'
                    },
                    terminal: 'Terminal v2.9.3',
                    githubProject: 'GitHub Project',
                    autoDetectClient: 'Auto Detect',
                    selectionLogicText: 'Same Region -> Nearby Region -> Other Regions',
                    customIPDisabledHint: 'Region selection disabled when using Custom ProxyIP',
                    customIPMode: 'Custom ProxyIP Mode (p variable enabled)',
                    customIPModeDesc: 'Custom IP Mode (Region match disabled)',
                    usingCustomProxyIP: 'Using Custom ProxyIP: ',
                    customIPConfig: ' (p variable config)',
                    customIPModeDisabled: 'Custom IP Mode, region selection disabled',
                    manualRegion: 'Manual Region',
                    manualRegionDesc: ' (Manual)',
                    proxyIPAvailable: '10/10 Available (ProxyIP Domain Pre-set)',
                    smartSelection: 'Smart Nearby Selection',
                    sameRegionIP: 'Same Region IP Available (1)',
                    cloudflareDetection: 'Cloudflare Built-in Detection',
                    detectionFailed: 'Detection Failed',
                    apiTestResult: 'API Detection Result: ',
                    apiTestTime: 'Detection Time: ',
                    apiTestFailed: 'API Detection Failed: ',
                    unknownError: 'Unknown Error',
                    apiTestError: 'API Test Failed: ',
                    kvNotConfigured: 'KV Storage not configured. Config management unavailable.\n\nPlease in Cloudflare Workers:\n1. Create KV Namespace\n2. Bind variable C\n3. Redeploy',
                    kvNotEnabled: 'KV Storage Not Configured',
                    kvCheckFailed: 'KV Check Failed: Invalid Response',
                    kvCheckFailedStatus: 'KV Check Failed - Status: ',
                    kvCheckFailedError: 'KV Check Failed - Error: '
                },
                                customIPMode: '自定义ProxyIP模式 (p变量启用)',
                                customIPModeDesc: '自定义IP模式 (已禁用地区匹配)',
                                usingCustomProxyIP: '使用自定义ProxyIP: ',
                                customIPConfig: ' (p变量配置)',
                                customIPModeDisabled: '自定义IP模式，地区选择已禁用',
                                manualRegion: '手动指定地区',
                                manualRegionDesc: ' (手动指定)',
                                proxyIPAvailable: '10/10 可用 (ProxyIP域名预设可用)',
                                smartSelection: '智能就近选择中',
                                sameRegionIP: '同地区IP可用 (1个)',
                                cloudflareDetection: 'Cloudflare内置检测',
                                detectionFailed: '检测失败',
                                unknown: 'Unknown'
                            },
                            fa: {
                                workerRegion: 'منطقه Worker: ',
                                detectionMethod: 'روش تشخیص: ',
                                proxyIPStatus: 'وضعیت ProxyIP: ',
                                currentIP: 'IP فعلی: ',
                                regionMatch: 'تطبیق منطقه: ',
                                regionNames: {
                                    'US': '🇺🇸 آمریکا', 'SG': '🇸🇬 سنگاپور', 'JP': '🇯🇵 ژاپن',
                                    'KR': '🇰🇷 کره جنوبی', 'DE': '🇩🇪 آلمان', 'SE': '🇸🇪 سوئد', 'NL': '🇳🇱 هلند',
                                    'FI': '🇫🇮 فنلاند', 'GB': '🇬🇧 بریتانیا'
                                },
                                customIPMode: 'حالت ProxyIP سفارشی (متغیر p فعال است)',
                                customIPModeDesc: 'حالت IP سفارشی (تطبیق منطقه غیرفعال است)',
                                usingCustomProxyIP: 'استفاده از ProxyIP سفارشی: ',
                                customIPConfig: ' (پیکربندی متغیر p)',
                                customIPModeDisabled: 'حالت IP سفارشی، انتخاب منطقه غیرفعال است',
                                manualRegion: 'تعیین منطقه دستی',
                                manualRegionDesc: ' (تعیین دستی)',
                                proxyIPAvailable: '10/10 در دسترس (دامنه پیش‌فرض ProxyIP در دسترس است)',
                                smartSelection: 'انتخاب هوشمند نزدیک در حال انجام است',
                                sameRegionIP: 'IP هم‌منطقه در دسترس است (1)',
                                cloudflareDetection: 'تشخیص داخلی Cloudflare',
                                detectionFailed: 'تشخیص ناموفق',
                                unknown: 'ناشناخته'
                            }
                        };

                        const t = getTranslations();

                    let detectedRegion = 'US'; // 默认值
                    let isCustomIPMode = false;
                    let isManualRegionMode = false;
                    try {
                        const response = await fetch(window.location.pathname + '/region');
                        const data = await response.json();

                        if (data.region === 'CUSTOM') {
                            isCustomIPMode = true;
                            detectedRegion = 'CUSTOM';

                            // 获取自定义IP的详细信息
                                const customIPInfo = data.ci || t.unknown;

                                geoInfo.innerHTML = t.detectionMethod + '<span style="color: #ffaa00;">⚙️ ' + t.customIPMode + '</span>';
                                regionStatus.innerHTML = t.workerRegion + '<span style="color: #ffaa00;">🔧 ' + t.customIPModeDesc + '</span>';

                            // 显示自定义IP配置状态，包含具体IP
                                if (backupStatus) backupStatus.innerHTML = t.proxyIPStatus + '<span style="color: #ffaa00;">🔧 ' + t.usingCustomProxyIP + customIPInfo + '</span>';
                                if (currentIP) currentIP.innerHTML = t.currentIP + '<span style="color: #ffaa00;">✅ ' + customIPInfo + t.customIPConfig + '</span>';
                                if (regionMatch) regionMatch.innerHTML = t.regionMatch + '<span style="color: #ffaa00;">⚠️ ' + t.customIPModeDisabled + '</span>';

                            return; // 提前返回，不执行后续的地区匹配逻辑
                            } else if (data.detectionMethod === 'Manual Region' || data.detectionMethod === '手动指定地区' || data.detectionMethod === 'تعیین منطقه دستی') {
                            isManualRegionMode = true;
                            detectedRegion = data.region;

                                geoInfo.innerHTML = t.detectionMethod + '<span style="color: #44aa44;">' + t.manualRegion + '</span>';
                                regionStatus.innerHTML = t.workerRegion + '<span style="color: #44ff44;">🎯 ' + t.regionNames[detectedRegion] + t.manualRegionDesc + '</span>';

                            // 显示配置状态而不是检测状态
                                if (backupStatus) backupStatus.innerHTML = t.proxyIPStatus + '<span style="color: #44ff44;">✅ ' + t.proxyIPAvailable + '</span>';
                                if (currentIP) currentIP.innerHTML = t.currentIP + '<span style="color: #44ff44;">✅ ' + t.smartSelection + '</span>';
                                if (regionMatch) regionMatch.innerHTML = t.regionMatch + '<span style="color: #44ff44;">✅ ' + t.sameRegionIP + '</span>';

                            return; // 提前返回，不执行后续的地区匹配逻辑
                            } else if (data.region && t.regionNames[data.region]) {
                            detectedRegion = data.region;
                        }

                            geoInfo.innerHTML = t.detectionMethod + '<span style="color: #44ff44;">' + t.cloudflareDetection + '</span>';

                    } catch (e) {
                            geoInfo.innerHTML = t.detectionMethod + '<span style="color: #ff4444;">' + t.detectionFailed + '</span>';
                    }

                        regionStatus.innerHTML = t.workerRegion + '<span style="color: #44ff44;">✅ ' + t.regionNames[detectedRegion] + '</span>';

                    // 直接显示配置状态，不再进行检测
                    if (backupStatus) {
                            backupStatus.innerHTML = t.proxyIPStatus + '<span style="color: #44ff44;">✅ ' + t.proxyIPAvailable + '</span>';
                    }

                    if (currentIP) {
                            currentIP.innerHTML = t.currentIP + '<span style="color: #44ff44;">✅ ' + t.smartSelection + '</span>';
                    }

                    if (regionMatch) {
                            regionMatch.innerHTML = t.regionMatch + '<span style="color: #44ff44;">✅ ' + t.sameRegionIP + '</span>';
                    }

                } catch (error) {
                        debugConsolePush('checkSystemStatus failed: ' + (error && error.message ? error.message : error), 'error');
                        function getCookie(name) {
                            const value = '; ' + document.cookie;
                            const parts = value.split('; ' + name + '=');
                            if (parts.length === 2) return parts.pop()?.split(';').shift();
                            return null;
                        }

                        const browserLang = navigator.language || navigator.userLanguage || '';
                        const savedLang = localStorage.getItem('preferredLanguage') || getCookie('preferredLanguage');
                        let isFarsi = false;

                        if (savedLang === 'fa' || savedLang === 'fa-IR') {
                            isFarsi = true;
                        } else {
                            isFarsi = browserLang.includes('fa') || browserLang.includes('fa-IR');
                        }

                        const translations = {
                            en: {
                    title: 'Terminal',
                    congratulations: 'Congratulations, you made it!',
                    enterU: 'Please enter the value of your U variable',
                    enterD: 'Please enter the value of your D variable',
                    command: 'Command: connect [',
                    uuid: 'UUID',
                    path: 'PATH',
                    inputU: 'Enter content of U variable and press Enter...',
                    inputD: 'Enter content of D variable and press Enter...',
                    connecting: 'Connecting...',
                    invading: 'Invading...',
                    success: 'Connection successful! Returning result...',
                    error: 'Error: Invalid UUID format',
                    reenter: 'Please re-enter a valid UUID',

                    // Subscription Page Translations
                    subtitle: 'Multi-client Support • Smart Optimization • One-Click Generation',
                    selectClient: '[ Select Client ]',
                    systemStatus: '[ System Status ]',
                    configManagement: '[ Config Management ]',
                    relatedLinks: '[ Related Links ]',
                    checking: 'Checking...',
                    workerRegion: 'Worker Region: ',
                    detectionMethod: 'Detection Method: ',
                    proxyIPStatus: 'ProxyIP Status: ',
                    currentIP: 'Current IP: ',
                    regionMatch: 'Region Match: ',
                    selectionLogic: 'Selection Logic: ',
                    kvStatusChecking: 'Checking KV Status...',
                    kvEnabled: '✅ KV Storage Enabled, Config Management Available',
                    kvDisabled: '⚠️ KV Storage Disabled or Not Configured',
                    specifyRegion: 'Specify Region (wk):',
                    autoDetect: 'Auto Detect',
                    saveRegion: 'Save Region Config',
                    protocolSelection: 'Protocol Selection:',
                    enableVLESS: 'Enable VLESS Protocol',
                    enableVMess: 'Enable VMess Protocol',
                    enableShadowsocks: 'Enable Shadowsocks Protocol',
                    enableTrojan: 'Enable Trojan Protocol',
                    enableXhttp: 'Enable xhttp Protocol',
                    enableTUIC: 'Enable TUIC Protocol',
                    enableHysteria2: 'Enable Hysteria 2 Protocol',
                    enableVLESSgRPC: 'Enable VLESS gRPC Protocol',
                    linkOnlyHint: 'Requires External Backend (Link-Only)',
                    grpcHint: 'Requires Custom Domain (gRPC)',
                    trojanPassword: 'Trojan Password (Optional):',
                    customPath: 'Custom Path (d):',
                    customPathPlaceholder: 'e.g., /secret-path',
                    customIP: 'Custom ProxyIP (p):',
                    customIPPlaceholder: 'e.g., 1.2.3.4 or proxy.example.com',
                    preferredIPs: 'Preferred IP List (yx):',
                    preferredIPsPlaceholder: 'e.g., 1.1.1.1:443#HongKong, 8.8.8.8:443#USA',
                    preferredIPsURL: 'Preferred IP Source URL (yxURL):',
                    latencyTest: 'Latency Test',
                    latencyTestIP: 'Test IP/Domain:',
                    latencyTestIPPlaceholder: 'Enter IP or Domain, comma separated',
                    latencyTestPort: 'Port:',
                    startTest: 'Start Test',
                    stopTest: 'Stop Test',
                    testResult: 'Test Result:',
                    addToYx: 'Add to Preferred List',
                    addSelectedToYx: 'Add Selected to Preferred List',
                    selectAll: 'Select All',
                    deselectAll: 'Deselect All',
                    testingInProgress: 'Testing...',
                    testComplete: 'Test Complete',
                    latencyMs: 'Latency (HTTP Handshake)',
                    timeout: 'Timeout',
                    ipSource: 'IP Source:',
                    manualInput: 'Manual Input',
                    cfRandomIP: 'CF Random IP',
                    urlFetch: 'Fetch from URL',
                    randomCount: 'Generate Count:',
                    fetchURL: 'Fetch URL:',
                    fetchURLPlaceholder: 'Enter URL of IP list',
                    generateIP: 'Generate IP',
                    fetchIP: 'Fetch IP',
                    socks5Config: 'SOCKS5 Config (s):',
                    customHomepage: 'Custom Homepage URL (homepage):',
                    customHomepagePlaceholder: 'e.g., https://example.com',
                    customHomepageHint: 'Set custom URL as homepage camouflage. Content of this URL will be shown when accessing root path /. Leave empty to show default terminal page.',
                    customPathHint: 'Only accessible via this path if set. UUID access will be disabled. Suggest using complex path to prevent scanning.',
                    customIPHint: 'Hide Worker real IP, or solve Cloudflare Loop issue. Supports IP:Port or Domain:Port.',
                    preferredIPsHint: 'Manually specify preferred nodes. Highest priority. Format: IP:Port#Remark.',
                    socks5ConfigHint: 'Format: user:pass@host:port. Worker will connect to target via this proxy.',
                    saveConfig: 'Save Config',
                    advancedControl: 'Advanced Control',
                    subscriptionConverter: 'Sub Converter URL:',
                    builtinPreferred: 'Built-in Preferred Type:',
                    enablePreferredDomain: 'Enable Preferred Domain',
                    enablePreferredIP: 'Enable Preferred IP',
                    enableGitHubPreferred: 'Enable GitHub Default Preferred',
                    allowAPIManagement: 'Allow API Management (ae):',
                    regionMatching: 'Region Matching (rm):',
                    downgradeControl: 'Downgrade Control (qj):',
                    tlsControl: 'TLS Control (dkby):',
                    preferredControl: 'Preferred Control (yxby):',
                    saveAdvanced: 'Save Advanced Config',
                    loading: 'Loading...',
                    currentConfig: '📍 Current Path Config',
                    refreshConfig: 'Refresh Config',
                    resetConfig: 'Reset Config',
                    subscriptionCopied: 'Subscription Link Copied',
                    autoSubscriptionCopied: 'Auto-detected subscription link copied. Client will be recognized by User-Agent.',
                    trojanPasswordPlaceholder: 'Leave empty to use UUID',
                    trojanPasswordHint: 'Set custom Trojan password. Leave empty to use UUID. Client will auto-hash password with SHA224.',
                    protocolHint: 'Multiple protocols can be enabled.<br>• VLESS WS: Standard WebSocket protocol<br>• VMess WS: WebSocket-based VMess (link generation)<br>• Shadowsocks: WebSocket-based SS (link generation)<br>• Trojan: Uses SHA224 password auth<br>• xhttp: HTTP POST camouflage (requires custom domain & gRPC)',
                    enableECH: 'Enable ECH (Encrypted Client Hello)',
                    enableECHHint: 'When enabled, ECH config is fetched from DoH and added to links on every sub refresh',
                    customDNS: 'Custom DNS Server',
                    customDNSPlaceholder: 'e.g., https://dns.joeyblog.eu.org/joeyblog',
                    customDNSHint: 'DNS server for ECH config query (DoH format)',
                    customECHDomain: 'Custom ECH Domain',
                    customECHDomainPlaceholder: 'e.g., cloudflare-ech.com',
                    customECHDomainHint: 'Domain used in ECH config, leave empty for default',
                    saveProtocol: 'Save Protocol Config',
                    subscriptionConverterPlaceholder: 'Default: https://url.v1.mk/sub',
                    subscriptionConverterHint: 'Custom subscription converter API, leave empty for default',
                    builtinPreferredHint: 'Control which built-in preferred nodes are included. Default all enabled.',
                    apiEnabledDefault: 'Default (API Disabled)',
                    apiEnabledYes: 'Enable API Management',
                    apiEnabledHint: '⚠️ Security Warning: Enabling API allows dynamic preferred IP addition. Use only if needed.',
                    regionMatchingDefault: 'Default (Enable Region Match)',
                    regionMatchingNo: 'Disable Region Match',
                    regionMatchingHint: 'Smart region matching disabled when set to "Disable"',
                    downgradeControlDefault: 'Default (Disable Downgrade)',
                    downgradeControlNo: 'Enable Downgrade Mode',
                    downgradeControlHint: 'When enabled: CF Direct Fail -> SOCKS5 -> Fallback',
                    tlsControlDefault: 'Default (Keep All Nodes)',
                    tlsControlYes: 'TLS Nodes Only',
                    tlsControlHint: 'When set to "TLS Nodes Only", non-TLS nodes (e.g., port 80) are not generated',
                    preferredControlDefault: 'Default (Enable Preferred)',
                    preferredControlYes: 'Disable Preferred',
                    preferredControlHint: 'When set to "Disable Preferred", only native address is used',
                    regionNames: {
                        US: '🇺🇸 US', SG: '🇸🇬 Singapore', JP: '🇯🇵 Japan',
                        KR: '🇰🇷 South Korea', DE: '🇩🇪 Germany', SE: '🇸🇪 Sweden', NL: '🇳🇱 Netherlands',
                        FI: '🇫🇮 Finland', GB: '🇬🇧 UK', FR: '🇫🇷 France', CA: '🇨🇦 Canada',
                        AU: '🇦🇺 Australia', HK: '🇭🇰 Hong Kong', TW: '🇹🇼 Taiwan'
                    },
                    terminal: 'Terminal v2.9.3',
                    githubProject: 'GitHub Project',
                    autoDetectClient: 'Auto Detect',
                    selectionLogicText: 'Same Region -> Nearby Region -> Other Regions',
                    customIPDisabledHint: 'Region selection disabled when using Custom ProxyIP',
                    customIPMode: 'Custom ProxyIP Mode (p variable enabled)',
                    customIPModeDesc: 'Custom IP Mode (Region match disabled)',
                    usingCustomProxyIP: 'Using Custom ProxyIP: ',
                    customIPConfig: ' (p variable config)',
                    customIPModeDisabled: 'Custom IP Mode, region selection disabled',
                    manualRegion: 'Manual Region',
                    manualRegionDesc: ' (Manual)',
                    proxyIPAvailable: '10/10 Available (ProxyIP Domain Pre-set)',
                    smartSelection: 'Smart Nearby Selection',
                    sameRegionIP: 'Same Region IP Available (1)',
                    cloudflareDetection: 'Cloudflare Built-in Detection',
                    detectionFailed: 'Detection Failed',
                    apiTestResult: 'API Detection Result: ',
                    apiTestTime: 'Detection Time: ',
                    apiTestFailed: 'API Detection Failed: ',
                    unknownError: 'Unknown Error',
                    apiTestError: 'API Test Failed: ',
                    kvNotConfigured: 'KV Storage not configured. Config management unavailable.\n\nPlease in Cloudflare Workers:\n1. Create KV Namespace\n2. Bind variable C\n3. Redeploy',
                    kvNotEnabled: 'KV Storage Not Configured',
                    kvCheckFailed: 'KV Check Failed: Invalid Response',
                    kvCheckFailedStatus: 'KV Check Failed - Status: ',
                    kvCheckFailedError: 'KV Check Failed - Error: '
                },
                            fa: {
                                workerRegion: 'منطقه Worker: ',
                                detectionMethod: 'روش تشخیص: ',
                                proxyIPStatus: 'وضعیت ProxyIP: ',
                                currentIP: 'IP فعلی: ',
                                regionMatch: 'تطبیق منطقه: ',
                                detectionFailed: 'تشخیص ناموفق'
                            }
                        };

                        const t = getTranslations();

                        document.getElementById('regionStatus').innerHTML = t.workerRegion + '<span style="color: #ff4444;">❌ ' + t.detectionFailed + '</span>';
                        document.getElementById('geoInfo').innerHTML = t.detectionMethod + '<span style="color: #ff4444;">❌ ' + t.detectionFailed + '</span>';
                        document.getElementById('backupStatus').innerHTML = t.proxyIPStatus + '<span style="color: #ff4444;">❌ ' + t.detectionFailed + '</span>';
                        document.getElementById('currentIP').innerHTML = t.currentIP + '<span style="color: #ff4444;">❌ ' + t.detectionFailed + '</span>';
                        document.getElementById('regionMatch').innerHTML = t.regionMatch + '<span style="color: #ff4444;">❌ ' + t.detectionFailed + '</span>';
                }
            }

                async function testAPI() {
                    try {
                        function getCookie(name) {
                            const value = '; ' + document.cookie;
                            const parts = value.split('; ' + name + '=');
                            if (parts.length === 2) return parts.pop()?.split(';').shift();
                            return null;
                        }

                        const browserLang = navigator.language || navigator.userLanguage || '';
                        const savedLang = localStorage.getItem('preferredLanguage') || getCookie('preferredLanguage');
                        let isFarsi = false;

                        if (savedLang === 'fa' || savedLang === 'fa-IR') {
                            isFarsi = true;
                        } else {
                            isFarsi = browserLang.includes('fa') || browserLang.includes('fa-IR');
                        }

                        const translations = {
                            en: {
                    title: 'Terminal',
                    congratulations: 'Congratulations, you made it!',
                    enterU: 'Please enter the value of your U variable',
                    enterD: 'Please enter the value of your D variable',
                    command: 'Command: connect [',
                    uuid: 'UUID',
                    path: 'PATH',
                    inputU: 'Enter content of U variable and press Enter...',
                    inputD: 'Enter content of D variable and press Enter...',
                    connecting: 'Connecting...',
                    invading: 'Invading...',
                    success: 'Connection successful! Returning result...',
                    error: 'Error: Invalid UUID format',
                    reenter: 'Please re-enter a valid UUID',

                    // Subscription Page Translations
                    subtitle: 'Multi-client Support • Smart Optimization • One-Click Generation',
                    selectClient: '[ Select Client ]',
                    systemStatus: '[ System Status ]',
                    configManagement: '[ Config Management ]',
                    relatedLinks: '[ Related Links ]',
                    checking: 'Checking...',
                    workerRegion: 'Worker Region: ',
                    detectionMethod: 'Detection Method: ',
                    proxyIPStatus: 'ProxyIP Status: ',
                    currentIP: 'Current IP: ',
                    regionMatch: 'Region Match: ',
                    selectionLogic: 'Selection Logic: ',
                    kvStatusChecking: 'Checking KV Status...',
                    kvEnabled: '✅ KV Storage Enabled, Config Management Available',
                    kvDisabled: '⚠️ KV Storage Disabled or Not Configured',
                    specifyRegion: 'Specify Region (wk):',
                    autoDetect: 'Auto Detect',
                    saveRegion: 'Save Region Config',
                    protocolSelection: 'Protocol Selection:',
                    enableVLESS: 'Enable VLESS Protocol',
                    enableVMess: 'Enable VMess Protocol',
                    enableShadowsocks: 'Enable Shadowsocks Protocol',
                    enableTrojan: 'Enable Trojan Protocol',
                    enableXhttp: 'Enable xhttp Protocol',
                    enableTUIC: 'Enable TUIC Protocol',
                    enableHysteria2: 'Enable Hysteria 2 Protocol',
                    enableVLESSgRPC: 'Enable VLESS gRPC Protocol',
                    linkOnlyHint: 'Requires External Backend (Link-Only)',
                    grpcHint: 'Requires Custom Domain (gRPC)',
                    trojanPassword: 'Trojan Password (Optional):',
                    customPath: 'Custom Path (d):',
                    customPathPlaceholder: 'e.g., /secret-path',
                    customIP: 'Custom ProxyIP (p):',
                    customIPPlaceholder: 'e.g., 1.2.3.4 or proxy.example.com',
                    preferredIPs: 'Preferred IP List (yx):',
                    preferredIPsPlaceholder: 'e.g., 1.1.1.1:443#HongKong, 8.8.8.8:443#USA',
                    preferredIPsURL: 'Preferred IP Source URL (yxURL):',
                    latencyTest: 'Latency Test',
                    latencyTestIP: 'Test IP/Domain:',
                    latencyTestIPPlaceholder: 'Enter IP or Domain, comma separated',
                    latencyTestPort: 'Port:',
                    startTest: 'Start Test',
                    stopTest: 'Stop Test',
                    testResult: 'Test Result:',
                    addToYx: 'Add to Preferred List',
                    addSelectedToYx: 'Add Selected to Preferred List',
                    selectAll: 'Select All',
                    deselectAll: 'Deselect All',
                    testingInProgress: 'Testing...',
                    testComplete: 'Test Complete',
                    latencyMs: 'Latency (HTTP Handshake)',
                    timeout: 'Timeout',
                    ipSource: 'IP Source:',
                    manualInput: 'Manual Input',
                    cfRandomIP: 'CF Random IP',
                    urlFetch: 'Fetch from URL',
                    randomCount: 'Generate Count:',
                    fetchURL: 'Fetch URL:',
                    fetchURLPlaceholder: 'Enter URL of IP list',
                    generateIP: 'Generate IP',
                    fetchIP: 'Fetch IP',
                    socks5Config: 'SOCKS5 Config (s):',
                    customHomepage: 'Custom Homepage URL (homepage):',
                    customHomepagePlaceholder: 'e.g., https://example.com',
                    customHomepageHint: 'Set custom URL as homepage camouflage. Content of this URL will be shown when accessing root path /. Leave empty to show default terminal page.',
                    customPathHint: 'Only accessible via this path if set. UUID access will be disabled. Suggest using complex path to prevent scanning.',
                    customIPHint: 'Hide Worker real IP, or solve Cloudflare Loop issue. Supports IP:Port or Domain:Port.',
                    preferredIPsHint: 'Manually specify preferred nodes. Highest priority. Format: IP:Port#Remark.',
                    socks5ConfigHint: 'Format: user:pass@host:port. Worker will connect to target via this proxy.',
                    saveConfig: 'Save Config',
                    advancedControl: 'Advanced Control',
                    subscriptionConverter: 'Sub Converter URL:',
                    builtinPreferred: 'Built-in Preferred Type:',
                    enablePreferredDomain: 'Enable Preferred Domain',
                    enablePreferredIP: 'Enable Preferred IP',
                    enableGitHubPreferred: 'Enable GitHub Default Preferred',
                    allowAPIManagement: 'Allow API Management (ae):',
                    regionMatching: 'Region Matching (rm):',
                    downgradeControl: 'Downgrade Control (qj):',
                    tlsControl: 'TLS Control (dkby):',
                    preferredControl: 'Preferred Control (yxby):',
                    saveAdvanced: 'Save Advanced Config',
                    loading: 'Loading...',
                    currentConfig: '📍 Current Path Config',
                    refreshConfig: 'Refresh Config',
                    resetConfig: 'Reset Config',
                    subscriptionCopied: 'Subscription Link Copied',
                    autoSubscriptionCopied: 'Auto-detected subscription link copied. Client will be recognized by User-Agent.',
                    trojanPasswordPlaceholder: 'Leave empty to use UUID',
                    trojanPasswordHint: 'Set custom Trojan password. Leave empty to use UUID. Client will auto-hash password with SHA224.',
                    protocolHint: 'Multiple protocols can be enabled.<br>• VLESS WS: Standard WebSocket protocol<br>• VMess WS: WebSocket-based VMess (link generation)<br>• Shadowsocks: WebSocket-based SS (link generation)<br>• Trojan: Uses SHA224 password auth<br>• xhttp: HTTP POST camouflage (requires custom domain & gRPC)',
                    enableECH: 'Enable ECH (Encrypted Client Hello)',
                    enableECHHint: 'When enabled, ECH config is fetched from DoH and added to links on every sub refresh',
                    customDNS: 'Custom DNS Server',
                    customDNSPlaceholder: 'e.g., https://dns.joeyblog.eu.org/joeyblog',
                    customDNSHint: 'DNS server for ECH config query (DoH format)',
                    customECHDomain: 'Custom ECH Domain',
                    customECHDomainPlaceholder: 'e.g., cloudflare-ech.com',
                    customECHDomainHint: 'Domain used in ECH config, leave empty for default',
                    saveProtocol: 'Save Protocol Config',
                    subscriptionConverterPlaceholder: 'Default: https://url.v1.mk/sub',
                    subscriptionConverterHint: 'Custom subscription converter API, leave empty for default',
                    builtinPreferredHint: 'Control which built-in preferred nodes are included. Default all enabled.',
                    apiEnabledDefault: 'Default (API Disabled)',
                    apiEnabledYes: 'Enable API Management',
                    apiEnabledHint: '⚠️ Security Warning: Enabling API allows dynamic preferred IP addition. Use only if needed.',
                    regionMatchingDefault: 'Default (Enable Region Match)',
                    regionMatchingNo: 'Disable Region Match',
                    regionMatchingHint: 'Smart region matching disabled when set to "Disable"',
                    downgradeControlDefault: 'Default (Disable Downgrade)',
                    downgradeControlNo: 'Enable Downgrade Mode',
                    downgradeControlHint: 'When enabled: CF Direct Fail -> SOCKS5 -> Fallback',
                    tlsControlDefault: 'Default (Keep All Nodes)',
                    tlsControlYes: 'TLS Nodes Only',
                    tlsControlHint: 'When set to "TLS Nodes Only", non-TLS nodes (e.g., port 80) are not generated',
                    preferredControlDefault: 'Default (Enable Preferred)',
                    preferredControlYes: 'Disable Preferred',
                    preferredControlHint: 'When set to "Disable Preferred", only native address is used',
                    regionNames: {
                        US: '🇺🇸 US', SG: '🇸🇬 Singapore', JP: '🇯🇵 Japan',
                        KR: '🇰🇷 South Korea', DE: '🇩🇪 Germany', SE: '🇸🇪 Sweden', NL: '🇳🇱 Netherlands',
                        FI: '🇫🇮 Finland', GB: '🇬🇧 UK', FR: '🇫🇷 France', CA: '🇨🇦 Canada',
                        AU: '🇦🇺 Australia', HK: '🇭🇰 Hong Kong', TW: '🇹🇼 Taiwan'
                    },
                    terminal: 'Terminal v2.9.3',
                    githubProject: 'GitHub Project',
                    autoDetectClient: 'Auto Detect',
                    selectionLogicText: 'Same Region -> Nearby Region -> Other Regions',
                    customIPDisabledHint: 'Region selection disabled when using Custom ProxyIP',
                    customIPMode: 'Custom ProxyIP Mode (p variable enabled)',
                    customIPModeDesc: 'Custom IP Mode (Region match disabled)',
                    usingCustomProxyIP: 'Using Custom ProxyIP: ',
                    customIPConfig: ' (p variable config)',
                    customIPModeDisabled: 'Custom IP Mode, region selection disabled',
                    manualRegion: 'Manual Region',
                    manualRegionDesc: ' (Manual)',
                    proxyIPAvailable: '10/10 Available (ProxyIP Domain Pre-set)',
                    smartSelection: 'Smart Nearby Selection',
                    sameRegionIP: 'Same Region IP Available (1)',
                    cloudflareDetection: 'Cloudflare Built-in Detection',
                    detectionFailed: 'Detection Failed',
                    apiTestResult: 'API Detection Result: ',
                    apiTestTime: 'Detection Time: ',
                    apiTestFailed: 'API Detection Failed: ',
                    unknownError: 'Unknown Error',
                    apiTestError: 'API Test Failed: ',
                    kvNotConfigured: 'KV Storage not configured. Config management unavailable.\n\nPlease in Cloudflare Workers:\n1. Create KV Namespace\n2. Bind variable C\n3. Redeploy',
                    kvNotEnabled: 'KV Storage Not Configured',
                    kvCheckFailed: 'KV Check Failed: Invalid Response',
                    kvCheckFailedStatus: 'KV Check Failed - Status: ',
                    kvCheckFailedError: 'KV Check Failed - Error: '
                },
                            fa: {
                                apiTestResult: 'نتیجه تشخیص API: ',
                                apiTestTime: 'زمان تشخیص: ',
                                apiTestFailed: 'تشخیص API ناموفق: ',
                                unknownError: 'خطای ناشناخته',
                                apiTestError: 'تست API ناموفق: '
                            }
                        };

                        const t = getTranslations();

                    const response = await fetch(window.location.pathname + '/test-api');
                    const data = await response.json();

                    if (data.detectedRegion) {
                            alert(t.apiTestResult + data.detectedRegion + '\\n' + t.apiTestTime + data.timestamp);
                    } else {
                            alert(t.apiTestFailed + (data.error || t.unknownError));
                    }
                } catch (error) {
                        function getCookie(name) {
                            const value = '; ' + document.cookie;
                            const parts = value.split('; ' + name + '=');
                            if (parts.length === 2) return parts.pop()?.split(';').shift();
                            return null;
                        }

                        const browserLang = navigator.language || navigator.userLanguage || '';
                        const savedLang = localStorage.getItem('preferredLanguage') || getCookie('preferredLanguage');
                        let isFarsi = false;

                        if (savedLang === 'fa' || savedLang === 'fa-IR') {
                            isFarsi = true;
                        } else {
                            isFarsi = browserLang.includes('fa') || browserLang.includes('fa-IR');
                        }

                        const translations = {
                            en: {
                    title: 'Terminal',
                    congratulations: 'Congratulations, you made it!',
                    enterU: 'Please enter the value of your U variable',
                    enterD: 'Please enter the value of your D variable',
                    command: 'Command: connect [',
                    uuid: 'UUID',
                    path: 'PATH',
                    inputU: 'Enter content of U variable and press Enter...',
                    inputD: 'Enter content of D variable and press Enter...',
                    connecting: 'Connecting...',
                    invading: 'Invading...',
                    success: 'Connection successful! Returning result...',
                    error: 'Error: Invalid UUID format',
                    reenter: 'Please re-enter a valid UUID',

                    // Subscription Page Translations
                    subtitle: 'Multi-client Support • Smart Optimization • One-Click Generation',
                    selectClient: '[ Select Client ]',
                    systemStatus: '[ System Status ]',
                    configManagement: '[ Config Management ]',
                    relatedLinks: '[ Related Links ]',
                    checking: 'Checking...',
                    workerRegion: 'Worker Region: ',
                    detectionMethod: 'Detection Method: ',
                    proxyIPStatus: 'ProxyIP Status: ',
                    currentIP: 'Current IP: ',
                    regionMatch: 'Region Match: ',
                    selectionLogic: 'Selection Logic: ',
                    kvStatusChecking: 'Checking KV Status...',
                    kvEnabled: '✅ KV Storage Enabled, Config Management Available',
                    kvDisabled: '⚠️ KV Storage Disabled or Not Configured',
                    specifyRegion: 'Specify Region (wk):',
                    autoDetect: 'Auto Detect',
                    saveRegion: 'Save Region Config',
                    protocolSelection: 'Protocol Selection:',
                    enableVLESS: 'Enable VLESS Protocol',
                    enableVMess: 'Enable VMess Protocol',
                    enableShadowsocks: 'Enable Shadowsocks Protocol',
                    enableTrojan: 'Enable Trojan Protocol',
                    enableXhttp: 'Enable xhttp Protocol',
                    enableTUIC: 'Enable TUIC Protocol',
                    enableHysteria2: 'Enable Hysteria 2 Protocol',
                    enableVLESSgRPC: 'Enable VLESS gRPC Protocol',
                    linkOnlyHint: 'Requires External Backend (Link-Only)',
                    grpcHint: 'Requires Custom Domain (gRPC)',
                    trojanPassword: 'Trojan Password (Optional):',
                    customPath: 'Custom Path (d):',
                    customPathPlaceholder: 'e.g., /secret-path',
                    customIP: 'Custom ProxyIP (p):',
                    customIPPlaceholder: 'e.g., 1.2.3.4 or proxy.example.com',
                    preferredIPs: 'Preferred IP List (yx):',
                    preferredIPsPlaceholder: 'e.g., 1.1.1.1:443#HongKong, 8.8.8.8:443#USA',
                    preferredIPsURL: 'Preferred IP Source URL (yxURL):',
                    latencyTest: 'Latency Test',
                    latencyTestIP: 'Test IP/Domain:',
                    latencyTestIPPlaceholder: 'Enter IP or Domain, comma separated',
                    latencyTestPort: 'Port:',
                    startTest: 'Start Test',
                    stopTest: 'Stop Test',
                    testResult: 'Test Result:',
                    addToYx: 'Add to Preferred List',
                    addSelectedToYx: 'Add Selected to Preferred List',
                    selectAll: 'Select All',
                    deselectAll: 'Deselect All',
                    testingInProgress: 'Testing...',
                    testComplete: 'Test Complete',
                    latencyMs: 'Latency (HTTP Handshake)',
                    timeout: 'Timeout',
                    ipSource: 'IP Source:',
                    manualInput: 'Manual Input',
                    cfRandomIP: 'CF Random IP',
                    urlFetch: 'Fetch from URL',
                    randomCount: 'Generate Count:',
                    fetchURL: 'Fetch URL:',
                    fetchURLPlaceholder: 'Enter URL of IP list',
                    generateIP: 'Generate IP',
                    fetchIP: 'Fetch IP',
                    socks5Config: 'SOCKS5 Config (s):',
                    customHomepage: 'Custom Homepage URL (homepage):',
                    customHomepagePlaceholder: 'e.g., https://example.com',
                    customHomepageHint: 'Set custom URL as homepage camouflage. Content of this URL will be shown when accessing root path /. Leave empty to show default terminal page.',
                    customPathHint: 'Only accessible via this path if set. UUID access will be disabled. Suggest using complex path to prevent scanning.',
                    customIPHint: 'Hide Worker real IP, or solve Cloudflare Loop issue. Supports IP:Port or Domain:Port.',
                    preferredIPsHint: 'Manually specify preferred nodes. Highest priority. Format: IP:Port#Remark.',
                    socks5ConfigHint: 'Format: user:pass@host:port. Worker will connect to target via this proxy.',
                    saveConfig: 'Save Config',
                    advancedControl: 'Advanced Control',
                    subscriptionConverter: 'Sub Converter URL:',
                    builtinPreferred: 'Built-in Preferred Type:',
                    enablePreferredDomain: 'Enable Preferred Domain',
                    enablePreferredIP: 'Enable Preferred IP',
                    enableGitHubPreferred: 'Enable GitHub Default Preferred',
                    allowAPIManagement: 'Allow API Management (ae):',
                    regionMatching: 'Region Matching (rm):',
                    downgradeControl: 'Downgrade Control (qj):',
                    tlsControl: 'TLS Control (dkby):',
                    preferredControl: 'Preferred Control (yxby):',
                    saveAdvanced: 'Save Advanced Config',
                    loading: 'Loading...',
                    currentConfig: '📍 Current Path Config',
                    refreshConfig: 'Refresh Config',
                    resetConfig: 'Reset Config',
                    subscriptionCopied: 'Subscription Link Copied',
                    autoSubscriptionCopied: 'Auto-detected subscription link copied. Client will be recognized by User-Agent.',
                    trojanPasswordPlaceholder: 'Leave empty to use UUID',
                    trojanPasswordHint: 'Set custom Trojan password. Leave empty to use UUID. Client will auto-hash password with SHA224.',
                    protocolHint: 'Multiple protocols can be enabled.<br>• VLESS WS: Standard WebSocket protocol<br>• VMess WS: WebSocket-based VMess (link generation)<br>• Shadowsocks: WebSocket-based SS (link generation)<br>• Trojan: Uses SHA224 password auth<br>• xhttp: HTTP POST camouflage (requires custom domain & gRPC)',
                    enableECH: 'Enable ECH (Encrypted Client Hello)',
                    enableECHHint: 'When enabled, ECH config is fetched from DoH and added to links on every sub refresh',
                    customDNS: 'Custom DNS Server',
                    customDNSPlaceholder: 'e.g., https://dns.joeyblog.eu.org/joeyblog',
                    customDNSHint: 'DNS server for ECH config query (DoH format)',
                    customECHDomain: 'Custom ECH Domain',
                    customECHDomainPlaceholder: 'e.g., cloudflare-ech.com',
                    customECHDomainHint: 'Domain used in ECH config, leave empty for default',
                    saveProtocol: 'Save Protocol Config',
                    subscriptionConverterPlaceholder: 'Default: https://url.v1.mk/sub',
                    subscriptionConverterHint: 'Custom subscription converter API, leave empty for default',
                    builtinPreferredHint: 'Control which built-in preferred nodes are included. Default all enabled.',
                    apiEnabledDefault: 'Default (API Disabled)',
                    apiEnabledYes: 'Enable API Management',
                    apiEnabledHint: '⚠️ Security Warning: Enabling API allows dynamic preferred IP addition. Use only if needed.',
                    regionMatchingDefault: 'Default (Enable Region Match)',
                    regionMatchingNo: 'Disable Region Match',
                    regionMatchingHint: 'Smart region matching disabled when set to "Disable"',
                    downgradeControlDefault: 'Default (Disable Downgrade)',
                    downgradeControlNo: 'Enable Downgrade Mode',
                    downgradeControlHint: 'When enabled: CF Direct Fail -> SOCKS5 -> Fallback',
                    tlsControlDefault: 'Default (Keep All Nodes)',
                    tlsControlYes: 'TLS Nodes Only',
                    tlsControlHint: 'When set to "TLS Nodes Only", non-TLS nodes (e.g., port 80) are not generated',
                    preferredControlDefault: 'Default (Enable Preferred)',
                    preferredControlYes: 'Disable Preferred',
                    preferredControlHint: 'When set to "Disable Preferred", only native address is used',
                    regionNames: {
                        US: '🇺🇸 US', SG: '🇸🇬 Singapore', JP: '🇯🇵 Japan',
                        KR: '🇰🇷 South Korea', DE: '🇩🇪 Germany', SE: '🇸🇪 Sweden', NL: '🇳🇱 Netherlands',
                        FI: '🇫🇮 Finland', GB: '🇬🇧 UK', FR: '🇫🇷 France', CA: '🇨🇦 Canada',
                        AU: '🇦🇺 Australia', HK: '🇭🇰 Hong Kong', TW: '🇹🇼 Taiwan'
                    },
                    terminal: 'Terminal v2.9.3',
                    githubProject: 'GitHub Project',
                    autoDetectClient: 'Auto Detect',
                    selectionLogicText: 'Same Region -> Nearby Region -> Other Regions',
                    customIPDisabledHint: 'Region selection disabled when using Custom ProxyIP',
                    customIPMode: 'Custom ProxyIP Mode (p variable enabled)',
                    customIPModeDesc: 'Custom IP Mode (Region match disabled)',
                    usingCustomProxyIP: 'Using Custom ProxyIP: ',
                    customIPConfig: ' (p variable config)',
                    customIPModeDisabled: 'Custom IP Mode, region selection disabled',
                    manualRegion: 'Manual Region',
                    manualRegionDesc: ' (Manual)',
                    proxyIPAvailable: '10/10 Available (ProxyIP Domain Pre-set)',
                    smartSelection: 'Smart Nearby Selection',
                    sameRegionIP: 'Same Region IP Available (1)',
                    cloudflareDetection: 'Cloudflare Built-in Detection',
                    detectionFailed: 'Detection Failed',
                    apiTestResult: 'API Detection Result: ',
                    apiTestTime: 'Detection Time: ',
                    apiTestFailed: 'API Detection Failed: ',
                    unknownError: 'Unknown Error',
                    apiTestError: 'API Test Failed: ',
                    kvNotConfigured: 'KV Storage not configured. Config management unavailable.\n\nPlease in Cloudflare Workers:\n1. Create KV Namespace\n2. Bind variable C\n3. Redeploy',
                    kvNotEnabled: 'KV Storage Not Configured',
                    kvCheckFailed: 'KV Check Failed: Invalid Response',
                    kvCheckFailedStatus: 'KV Check Failed - Status: ',
                    kvCheckFailedError: 'KV Check Failed - Error: '
                },
                            fa: { apiTestError: 'تست API ناموفق: ' }
                        };

                        const t = getTranslations();
                        alert(t.apiTestError + error.message);
                }
            }

            // 配置管理相关函数
            async function checkKVStatus() {
                const apiUrl = window.location.pathname + '/api/config';

                try {
                    const response = await fetch(apiUrl);

                        function getCookie(name) {
                            const value = '; ' + document.cookie;
                            const parts = value.split('; ' + name + '=');
                            if (parts.length === 2) return parts.pop()?.split(';').shift();
                            return null;
                        }

                        const browserLang = navigator.language || navigator.userLanguage || '';
                        const savedLang = localStorage.getItem('preferredLanguage') || getCookie('preferredLanguage');
                        let isFarsi = false;

                        if (savedLang === 'fa' || savedLang === 'fa-IR') {
                            isFarsi = true;
                        } else {
                            isFarsi = browserLang.includes('fa') || browserLang.includes('fa-IR');
                        }

                        const translations = {
                            en: {
                    title: 'Terminal',
                    congratulations: 'Congratulations, you made it!',
                    enterU: 'Please enter the value of your U variable',
                    enterD: 'Please enter the value of your D variable',
                    command: 'Command: connect [',
                    uuid: 'UUID',
                    path: 'PATH',
                    inputU: 'Enter content of U variable and press Enter...',
                    inputD: 'Enter content of D variable and press Enter...',
                    connecting: 'Connecting...',
                    invading: 'Invading...',
                    success: 'Connection successful! Returning result...',
                    error: 'Error: Invalid UUID format',
                    reenter: 'Please re-enter a valid UUID',

                    // Subscription Page Translations
                    subtitle: 'Multi-client Support • Smart Optimization • One-Click Generation',
                    selectClient: '[ Select Client ]',
                    systemStatus: '[ System Status ]',
                    configManagement: '[ Config Management ]',
                    relatedLinks: '[ Related Links ]',
                    checking: 'Checking...',
                    workerRegion: 'Worker Region: ',
                    detectionMethod: 'Detection Method: ',
                    proxyIPStatus: 'ProxyIP Status: ',
                    currentIP: 'Current IP: ',
                    regionMatch: 'Region Match: ',
                    selectionLogic: 'Selection Logic: ',
                    kvStatusChecking: 'Checking KV Status...',
                    kvEnabled: '✅ KV Storage Enabled, Config Management Available',
                    kvDisabled: '⚠️ KV Storage Disabled or Not Configured',
                    specifyRegion: 'Specify Region (wk):',
                    autoDetect: 'Auto Detect',
                    saveRegion: 'Save Region Config',
                    protocolSelection: 'Protocol Selection:',
                    enableVLESS: 'Enable VLESS Protocol',
                    enableVMess: 'Enable VMess Protocol',
                    enableShadowsocks: 'Enable Shadowsocks Protocol',
                    enableTrojan: 'Enable Trojan Protocol',
                    enableXhttp: 'Enable xhttp Protocol',
                    enableTUIC: 'Enable TUIC Protocol',
                    enableHysteria2: 'Enable Hysteria 2 Protocol',
                    enableVLESSgRPC: 'Enable VLESS gRPC Protocol',
                    linkOnlyHint: 'Requires External Backend (Link-Only)',
                    grpcHint: 'Requires Custom Domain (gRPC)',
                    trojanPassword: 'Trojan Password (Optional):',
                    customPath: 'Custom Path (d):',
                    customPathPlaceholder: 'e.g., /secret-path',
                    customIP: 'Custom ProxyIP (p):',
                    customIPPlaceholder: 'e.g., 1.2.3.4 or proxy.example.com',
                    preferredIPs: 'Preferred IP List (yx):',
                    preferredIPsPlaceholder: 'e.g., 1.1.1.1:443#HongKong, 8.8.8.8:443#USA',
                    preferredIPsURL: 'Preferred IP Source URL (yxURL):',
                    latencyTest: 'Latency Test',
                    latencyTestIP: 'Test IP/Domain:',
                    latencyTestIPPlaceholder: 'Enter IP or Domain, comma separated',
                    latencyTestPort: 'Port:',
                    startTest: 'Start Test',
                    stopTest: 'Stop Test',
                    testResult: 'Test Result:',
                    addToYx: 'Add to Preferred List',
                    addSelectedToYx: 'Add Selected to Preferred List',
                    selectAll: 'Select All',
                    deselectAll: 'Deselect All',
                    testingInProgress: 'Testing...',
                    testComplete: 'Test Complete',
                    latencyMs: 'Latency (HTTP Handshake)',
                    timeout: 'Timeout',
                    ipSource: 'IP Source:',
                    manualInput: 'Manual Input',
                    cfRandomIP: 'CF Random IP',
                    urlFetch: 'Fetch from URL',
                    randomCount: 'Generate Count:',
                    fetchURL: 'Fetch URL:',
                    fetchURLPlaceholder: 'Enter URL of IP list',
                    generateIP: 'Generate IP',
                    fetchIP: 'Fetch IP',
                    socks5Config: 'SOCKS5 Config (s):',
                    customHomepage: 'Custom Homepage URL (homepage):',
                    customHomepagePlaceholder: 'e.g., https://example.com',
                    customHomepageHint: 'Set custom URL as homepage camouflage. Content of this URL will be shown when accessing root path /. Leave empty to show default terminal page.',
                    customPathHint: 'Only accessible via this path if set. UUID access will be disabled. Suggest using complex path to prevent scanning.',
                    customIPHint: 'Hide Worker real IP, or solve Cloudflare Loop issue. Supports IP:Port or Domain:Port.',
                    preferredIPsHint: 'Manually specify preferred nodes. Highest priority. Format: IP:Port#Remark.',
                    socks5ConfigHint: 'Format: user:pass@host:port. Worker will connect to target via this proxy.',
                    saveConfig: 'Save Config',
                    advancedControl: 'Advanced Control',
                    subscriptionConverter: 'Sub Converter URL:',
                    builtinPreferred: 'Built-in Preferred Type:',
                    enablePreferredDomain: 'Enable Preferred Domain',
                    enablePreferredIP: 'Enable Preferred IP',
                    enableGitHubPreferred: 'Enable GitHub Default Preferred',
                    allowAPIManagement: 'Allow API Management (ae):',
                    regionMatching: 'Region Matching (rm):',
                    downgradeControl: 'Downgrade Control (qj):',
                    tlsControl: 'TLS Control (dkby):',
                    preferredControl: 'Preferred Control (yxby):',
                    saveAdvanced: 'Save Advanced Config',
                    loading: 'Loading...',
                    currentConfig: '📍 Current Path Config',
                    refreshConfig: 'Refresh Config',
                    resetConfig: 'Reset Config',
                    subscriptionCopied: 'Subscription Link Copied',
                    autoSubscriptionCopied: 'Auto-detected subscription link copied. Client will be recognized by User-Agent.',
                    trojanPasswordPlaceholder: 'Leave empty to use UUID',
                    trojanPasswordHint: 'Set custom Trojan password. Leave empty to use UUID. Client will auto-hash password with SHA224.',
                    protocolHint: 'Multiple protocols can be enabled.<br>• VLESS WS: Standard WebSocket protocol<br>• VMess WS: WebSocket-based VMess (link generation)<br>• Shadowsocks: WebSocket-based SS (link generation)<br>• Trojan: Uses SHA224 password auth<br>• xhttp: HTTP POST camouflage (requires custom domain & gRPC)',
                    enableECH: 'Enable ECH (Encrypted Client Hello)',
                    enableECHHint: 'When enabled, ECH config is fetched from DoH and added to links on every sub refresh',
                    customDNS: 'Custom DNS Server',
                    customDNSPlaceholder: 'e.g., https://dns.joeyblog.eu.org/joeyblog',
                    customDNSHint: 'DNS server for ECH config query (DoH format)',
                    customECHDomain: 'Custom ECH Domain',
                    customECHDomainPlaceholder: 'e.g., cloudflare-ech.com',
                    customECHDomainHint: 'Domain used in ECH config, leave empty for default',
                    saveProtocol: 'Save Protocol Config',
                    subscriptionConverterPlaceholder: 'Default: https://url.v1.mk/sub',
                    subscriptionConverterHint: 'Custom subscription converter API, leave empty for default',
                    builtinPreferredHint: 'Control which built-in preferred nodes are included. Default all enabled.',
                    apiEnabledDefault: 'Default (API Disabled)',
                    apiEnabledYes: 'Enable API Management',
                    apiEnabledHint: '⚠️ Security Warning: Enabling API allows dynamic preferred IP addition. Use only if needed.',
                    regionMatchingDefault: 'Default (Enable Region Match)',
                    regionMatchingNo: 'Disable Region Match',
                    regionMatchingHint: 'Smart region matching disabled when set to "Disable"',
                    downgradeControlDefault: 'Default (Disable Downgrade)',
                    downgradeControlNo: 'Enable Downgrade Mode',
                    downgradeControlHint: 'When enabled: CF Direct Fail -> SOCKS5 -> Fallback',
                    tlsControlDefault: 'Default (Keep All Nodes)',
                    tlsControlYes: 'TLS Nodes Only',
                    tlsControlHint: 'When set to "TLS Nodes Only", non-TLS nodes (e.g., port 80) are not generated',
                    preferredControlDefault: 'Default (Enable Preferred)',
                    preferredControlYes: 'Disable Preferred',
                    preferredControlHint: 'When set to "Disable Preferred", only native address is used',
                    regionNames: {
                        US: '🇺🇸 US', SG: '🇸🇬 Singapore', JP: '🇯🇵 Japan',
                        KR: '🇰🇷 South Korea', DE: '🇩🇪 Germany', SE: '🇸🇪 Sweden', NL: '🇳🇱 Netherlands',
                        FI: '🇫🇮 Finland', GB: '🇬🇧 UK', FR: '🇫🇷 France', CA: '🇨🇦 Canada',
                        AU: '🇦🇺 Australia', HK: '🇭🇰 Hong Kong', TW: '🇹🇼 Taiwan'
                    },
                    terminal: 'Terminal v2.9.3',
                    githubProject: 'GitHub Project',
                    autoDetectClient: 'Auto Detect',
                    selectionLogicText: 'Same Region -> Nearby Region -> Other Regions',
                    customIPDisabledHint: 'Region selection disabled when using Custom ProxyIP',
                    customIPMode: 'Custom ProxyIP Mode (p variable enabled)',
                    customIPModeDesc: 'Custom IP Mode (Region match disabled)',
                    usingCustomProxyIP: 'Using Custom ProxyIP: ',
                    customIPConfig: ' (p variable config)',
                    customIPModeDisabled: 'Custom IP Mode, region selection disabled',
                    manualRegion: 'Manual Region',
                    manualRegionDesc: ' (Manual)',
                    proxyIPAvailable: '10/10 Available (ProxyIP Domain Pre-set)',
                    smartSelection: 'Smart Nearby Selection',
                    sameRegionIP: 'Same Region IP Available (1)',
                    cloudflareDetection: 'Cloudflare Built-in Detection',
                    detectionFailed: 'Detection Failed',
                    apiTestResult: 'API Detection Result: ',
                    apiTestTime: 'Detection Time: ',
                    apiTestFailed: 'API Detection Failed: ',
                    unknownError: 'Unknown Error',
                    apiTestError: 'API Test Failed: ',
                    kvNotConfigured: 'KV Storage not configured. Config management unavailable.\n\nPlease in Cloudflare Workers:\n1. Create KV Namespace\n2. Bind variable C\n3. Redeploy',
                    kvNotEnabled: 'KV Storage Not Configured',
                    kvCheckFailed: 'KV Check Failed: Invalid Response',
                    kvCheckFailedStatus: 'KV Check Failed - Status: ',
                    kvCheckFailedError: 'KV Check Failed - Error: '
                },
                            fa: {
                                kvDisabled: '⚠️ ذخیره‌سازی KV فعال نیست یا پیکربندی نشده است',
                                kvNotConfigured: '⚠️ ذخیره‌سازی KV پیکربندی نشده است. پنل گرافیکی غیرفعال است.\\n\\n🔧 راهنمای تعمیر:\\n1. به پنل Cloudflare -> Workers -> KV بروید.\\n2. یک Namespace جدید بسازید.\\n3. در تنظیمات Worker -> Variables -> KV Bindings.\\n4. متغیری با نام "C" (بزرگ) اضافه کرده و به KV متصل کنید.\\n5. ذخیره و Deploy کنید.',
                                kvNotEnabled: 'KV متصل نیست. لطفاً طبق راهنما تنظیم کنید',
                                kvEnabled: '✅ ذخیره‌سازی KV فعال است، می‌توانید از مدیریت تنظیمات استفاده کنید',
                                kvCheckFailed: '⚠️ بررسی ذخیره‌سازی KV ناموفق',
                                kvCheckFailedFormat: 'بررسی ذخیره‌سازی KV ناموفق: خطای فرمت پاسخ',
                                kvCheckFailedStatus: 'بررسی ذخیره‌سازی KV ناموفق - کد وضعیت: ',
                                kvCheckFailedError: 'بررسی ذخیره‌سازی KV ناموفق - خطا: '
                            }
                        };

                        const t = getTranslations();

                        if (response.status === 503) {
                            // KV未配置
                            document.getElementById('kvStatus').innerHTML = '<span style="color: #ffaa00;">' + t.kvDisabled + '</span>';
                            document.getElementById('configCard').style.display = 'block';
                            document.getElementById('currentConfig').textContent = t.kvNotConfigured;
                    } else if (response.ok) {
                        try {
                        const data = await response.json();

                            // 检查响应是否包含KV配置信息
                            if (data && data.kvEnabled === true) {
                                document.getElementById('kvStatus').innerHTML = '<span style="color: #44ff44;">' + t.kvEnabled + '</span>';
                                document.getElementById('configContent').style.display = 'block';
                                document.getElementById('configCard').style.display = 'block';
                                await loadCurrentConfig();
                            } else {
                                document.getElementById('kvStatus').innerHTML = '<span style="color: #ffaa00;">' + t.kvDisabled + '</span>';
                                document.getElementById('configCard').style.display = 'block';
                                document.getElementById('currentConfig').textContent = t.kvNotEnabled;
                                }
                        } catch (jsonError) {
                            document.getElementById('kvStatus').innerHTML = '<span style="color: #ffaa00;">' + t.kvCheckFailed + '</span>';
                            document.getElementById('configCard').style.display = 'block';
                            document.getElementById('currentConfig').textContent = t.kvCheckFailedFormat;
                        }
                    } else {
                        document.getElementById('kvStatus').innerHTML = '<span style="color: #ffaa00;">' + t.kvDisabled + '</span>';
                        document.getElementById('configCard').style.display = 'block';
                        document.getElementById('currentConfig').textContent = t.kvCheckFailedStatus + response.status;
                    }
                } catch (error) {
                    debugConsolePush('checkKVStatus failed: ' + (error && error.message ? error.message : error), 'error');
                    function getCookie(name) {
                        const value = '; ' + document.cookie;
                        const parts = value.split('; ' + name + '=');
                        if (parts.length === 2) return parts.pop()?.split(';').shift();
                        return null;
                    }

                    const browserLang = navigator.language || navigator.userLanguage || '';
                    const savedLang = localStorage.getItem('preferredLanguage') || getCookie('preferredLanguage');
                    let isFarsi = false;

                    if (savedLang === 'fa' || savedLang === 'fa-IR') {
                        isFarsi = true;
                    } else {
                        isFarsi = browserLang.includes('fa') || browserLang.includes('fa-IR');
                    }

                    const translations = {
                        en: {
                    title: 'Terminal',
                    congratulations: 'Congratulations, you made it!',
                    enterU: 'Please enter the value of your U variable',
                    enterD: 'Please enter the value of your D variable',
                    command: 'Command: connect [',
                    uuid: 'UUID',
                    path: 'PATH',
                    inputU: 'Enter content of U variable and press Enter...',
                    inputD: 'Enter content of D variable and press Enter...',
                    connecting: 'Connecting...',
                    invading: 'Invading...',
                    success: 'Connection successful! Returning result...',
                    error: 'Error: Invalid UUID format',
                    reenter: 'Please re-enter a valid UUID',

                    // Subscription Page Translations
                    subtitle: 'Multi-client Support • Smart Optimization • One-Click Generation',
                    selectClient: '[ Select Client ]',
                    systemStatus: '[ System Status ]',
                    configManagement: '[ Config Management ]',
                    relatedLinks: '[ Related Links ]',
                    checking: 'Checking...',
                    workerRegion: 'Worker Region: ',
                    detectionMethod: 'Detection Method: ',
                    proxyIPStatus: 'ProxyIP Status: ',
                    currentIP: 'Current IP: ',
                    regionMatch: 'Region Match: ',
                    selectionLogic: 'Selection Logic: ',
                    kvStatusChecking: 'Checking KV Status...',
                    kvEnabled: '✅ KV Storage Enabled, Config Management Available',
                    kvDisabled: '⚠️ KV Storage Disabled or Not Configured',
                    specifyRegion: 'Specify Region (wk):',
                    autoDetect: 'Auto Detect',
                    saveRegion: 'Save Region Config',
                    protocolSelection: 'Protocol Selection:',
                    enableVLESS: 'Enable VLESS Protocol',
                    enableVMess: 'Enable VMess Protocol',
                    enableShadowsocks: 'Enable Shadowsocks Protocol',
                    enableTrojan: 'Enable Trojan Protocol',
                    enableXhttp: 'Enable xhttp Protocol',
                    enableTUIC: 'Enable TUIC Protocol',
                    enableHysteria2: 'Enable Hysteria 2 Protocol',
                    enableVLESSgRPC: 'Enable VLESS gRPC Protocol',
                    linkOnlyHint: 'Requires External Backend (Link-Only)',
                    grpcHint: 'Requires Custom Domain (gRPC)',
                    trojanPassword: 'Trojan Password (Optional):',
                    customPath: 'Custom Path (d):',
                    customPathPlaceholder: 'e.g., /secret-path',
                    customIP: 'Custom ProxyIP (p):',
                    customIPPlaceholder: 'e.g., 1.2.3.4 or proxy.example.com',
                    preferredIPs: 'Preferred IP List (yx):',
                    preferredIPsPlaceholder: 'e.g., 1.1.1.1:443#HongKong, 8.8.8.8:443#USA',
                    preferredIPsURL: 'Preferred IP Source URL (yxURL):',
                    latencyTest: 'Latency Test',
                    latencyTestIP: 'Test IP/Domain:',
                    latencyTestIPPlaceholder: 'Enter IP or Domain, comma separated',
                    latencyTestPort: 'Port:',
                    startTest: 'Start Test',
                    stopTest: 'Stop Test',
                    testResult: 'Test Result:',
                    addToYx: 'Add to Preferred List',
                    addSelectedToYx: 'Add Selected to Preferred List',
                    selectAll: 'Select All',
                    deselectAll: 'Deselect All',
                    testingInProgress: 'Testing...',
                    testComplete: 'Test Complete',
                    latencyMs: 'Latency (HTTP Handshake)',
                    timeout: 'Timeout',
                    ipSource: 'IP Source:',
                    manualInput: 'Manual Input',
                    cfRandomIP: 'CF Random IP',
                    urlFetch: 'Fetch from URL',
                    randomCount: 'Generate Count:',
                    fetchURL: 'Fetch URL:',
                    fetchURLPlaceholder: 'Enter URL of IP list',
                    generateIP: 'Generate IP',
                    fetchIP: 'Fetch IP',
                    socks5Config: 'SOCKS5 Config (s):',
                    customHomepage: 'Custom Homepage URL (homepage):',
                    customHomepagePlaceholder: 'e.g., https://example.com',
                    customHomepageHint: 'Set custom URL as homepage camouflage. Content of this URL will be shown when accessing root path /. Leave empty to show default terminal page.',
                    customPathHint: 'Only accessible via this path if set. UUID access will be disabled. Suggest using complex path to prevent scanning.',
                    customIPHint: 'Hide Worker real IP, or solve Cloudflare Loop issue. Supports IP:Port or Domain:Port.',
                    preferredIPsHint: 'Manually specify preferred nodes. Highest priority. Format: IP:Port#Remark.',
                    socks5ConfigHint: 'Format: user:pass@host:port. Worker will connect to target via this proxy.',
                    saveConfig: 'Save Config',
                    advancedControl: 'Advanced Control',
                    subscriptionConverter: 'Sub Converter URL:',
                    builtinPreferred: 'Built-in Preferred Type:',
                    enablePreferredDomain: 'Enable Preferred Domain',
                    enablePreferredIP: 'Enable Preferred IP',
                    enableGitHubPreferred: 'Enable GitHub Default Preferred',
                    allowAPIManagement: 'Allow API Management (ae):',
                    regionMatching: 'Region Matching (rm):',
                    downgradeControl: 'Downgrade Control (qj):',
                    tlsControl: 'TLS Control (dkby):',
                    preferredControl: 'Preferred Control (yxby):',
                    saveAdvanced: 'Save Advanced Config',
                    loading: 'Loading...',
                    currentConfig: '📍 Current Path Config',
                    refreshConfig: 'Refresh Config',
                    resetConfig: 'Reset Config',
                    subscriptionCopied: 'Subscription Link Copied',
                    autoSubscriptionCopied: 'Auto-detected subscription link copied. Client will be recognized by User-Agent.',
                    trojanPasswordPlaceholder: 'Leave empty to use UUID',
                    trojanPasswordHint: 'Set custom Trojan password. Leave empty to use UUID. Client will auto-hash password with SHA224.',
                    protocolHint: 'Multiple protocols can be enabled.<br>• VLESS WS: Standard WebSocket protocol<br>• VMess WS: WebSocket-based VMess (link generation)<br>• Shadowsocks: WebSocket-based SS (link generation)<br>• Trojan: Uses SHA224 password auth<br>• xhttp: HTTP POST camouflage (requires custom domain & gRPC)',
                    enableECH: 'Enable ECH (Encrypted Client Hello)',
                    enableECHHint: 'When enabled, ECH config is fetched from DoH and added to links on every sub refresh',
                    customDNS: 'Custom DNS Server',
                    customDNSPlaceholder: 'e.g., https://dns.joeyblog.eu.org/joeyblog',
                    customDNSHint: 'DNS server for ECH config query (DoH format)',
                    customECHDomain: 'Custom ECH Domain',
                    customECHDomainPlaceholder: 'e.g., cloudflare-ech.com',
                    customECHDomainHint: 'Domain used in ECH config, leave empty for default',
                    saveProtocol: 'Save Protocol Config',
                    subscriptionConverterPlaceholder: 'Default: https://url.v1.mk/sub',
                    subscriptionConverterHint: 'Custom subscription converter API, leave empty for default',
                    builtinPreferredHint: 'Control which built-in preferred nodes are included. Default all enabled.',
                    apiEnabledDefault: 'Default (API Disabled)',
                    apiEnabledYes: 'Enable API Management',
                    apiEnabledHint: '⚠️ Security Warning: Enabling API allows dynamic preferred IP addition. Use only if needed.',
                    regionMatchingDefault: 'Default (Enable Region Match)',
                    regionMatchingNo: 'Disable Region Match',
                    regionMatchingHint: 'Smart region matching disabled when set to "Disable"',
                    downgradeControlDefault: 'Default (Disable Downgrade)',
                    downgradeControlNo: 'Enable Downgrade Mode',
                    downgradeControlHint: 'When enabled: CF Direct Fail -> SOCKS5 -> Fallback',
                    tlsControlDefault: 'Default (Keep All Nodes)',
                    tlsControlYes: 'TLS Nodes Only',
                    tlsControlHint: 'When set to "TLS Nodes Only", non-TLS nodes (e.g., port 80) are not generated',
                    preferredControlDefault: 'Default (Enable Preferred)',
                    preferredControlYes: 'Disable Preferred',
                    preferredControlHint: 'When set to "Disable Preferred", only native address is used',
                    regionNames: {
                        US: '🇺🇸 US', SG: '🇸🇬 Singapore', JP: '🇯🇵 Japan',
                        KR: '🇰🇷 South Korea', DE: '🇩🇪 Germany', SE: '🇸🇪 Sweden', NL: '🇳🇱 Netherlands',
                        FI: '🇫🇮 Finland', GB: '🇬🇧 UK', FR: '🇫🇷 France', CA: '🇨🇦 Canada',
                        AU: '🇦🇺 Australia', HK: '🇭🇰 Hong Kong', TW: '🇹🇼 Taiwan'
                    },
                    terminal: 'Terminal v2.9.3',
                    githubProject: 'GitHub Project',
                    autoDetectClient: 'Auto Detect',
                    selectionLogicText: 'Same Region -> Nearby Region -> Other Regions',
                    customIPDisabledHint: 'Region selection disabled when using Custom ProxyIP',
                    customIPMode: 'Custom ProxyIP Mode (p variable enabled)',
                    customIPModeDesc: 'Custom IP Mode (Region match disabled)',
                    usingCustomProxyIP: 'Using Custom ProxyIP: ',
                    customIPConfig: ' (p variable config)',
                    customIPModeDisabled: 'Custom IP Mode, region selection disabled',
                    manualRegion: 'Manual Region',
                    manualRegionDesc: ' (Manual)',
                    proxyIPAvailable: '10/10 Available (ProxyIP Domain Pre-set)',
                    smartSelection: 'Smart Nearby Selection',
                    sameRegionIP: 'Same Region IP Available (1)',
                    cloudflareDetection: 'Cloudflare Built-in Detection',
                    detectionFailed: 'Detection Failed',
                    apiTestResult: 'API Detection Result: ',
                    apiTestTime: 'Detection Time: ',
                    apiTestFailed: 'API Detection Failed: ',
                    unknownError: 'Unknown Error',
                    apiTestError: 'API Test Failed: ',
                    kvNotConfigured: 'KV Storage not configured. Config management unavailable.\n\nPlease in Cloudflare Workers:\n1. Create KV Namespace\n2. Bind variable C\n3. Redeploy',
                    kvNotEnabled: 'KV Storage Not Configured',
                    kvCheckFailed: 'KV Check Failed: Invalid Response',
                    kvCheckFailedStatus: 'KV Check Failed - Status: ',
                    kvCheckFailedError: 'KV Check Failed - Error: '
                },
                        fa: {
                            kvDisabled: '⚠️ ذخیره‌سازی KV فعال نیست یا پیکربندی نشده است',
                            kvCheckFailedError: 'بررسی ذخیره‌سازی KV ناموفق - خطا: '
                        }
                    };

                    const t = getTranslations();

                    document.getElementById('kvStatus').innerHTML = '<span style="color: #ffaa00;">' + t.kvDisabled + '</span>';
                    document.getElementById('configCard').style.display = 'block';
                    document.getElementById('currentConfig').textContent = t.kvCheckFailedError + error.message;
                }
            }

            async function loadCurrentConfig() {
                const apiUrl = window.location.pathname + '/api/config';

                try {
                    const response = await fetch(apiUrl);

                    if (response.status === 503) {
                        document.getElementById('currentConfig').textContent = t.configNotConfigured;
                        return;
                    }
                    if (!response.ok) {
                        const errorText = await response.text();
                        document.getElementById('currentConfig').textContent = t.configLoadFailedStatus + errorText;
                        return;
                    }
                    const config = await response.json();

                    // 过滤掉内部字段 kvEnabled
                    const displayConfig = {};
                    for (const [key, value] of Object.entries(config)) {
                        if (key !== 'kvEnabled') {
                            displayConfig[key] = value;
                        }
                    }

                    let configText = t.currentConfigLabel;
                    if (Object.keys(displayConfig).length === 0) {
                        configText += t.currentConfigEmpty;
                    } else {
                        for (const [key, value] of Object.entries(displayConfig)) {
                            configText += key + ': ' + (value || t.currentConfigUnset) + '\\n';
                        }
                    }

                    document.getElementById('currentConfig').textContent = configText;

                    // 更新表单值
                    document.getElementById('wkRegion').value = config.wk || '';
                    document.getElementById('ev').checked = config.ev !== 'no';
                    document.getElementById('et').checked = config.et === 'yes';
                    document.getElementById('ex').checked = config.ex === 'yes';
                    document.getElementById('ech').checked = config.ech === 'yes';
                    document.getElementById('tp').value = config.tp || '';
                    if (document.getElementById('customDNS')) {
                        document.getElementById('customDNS').value = config.customDNS || '';
                    }
                    if (document.getElementById('customECHDomain')) {
                        document.getElementById('customECHDomain').value = config.customECHDomain || '';
                    }
                    document.getElementById('scu').value = config.scu || '';
                    document.getElementById('epd').checked = config.epd !== 'no';
                    document.getElementById('epi').checked = config.epi !== 'no';
                    document.getElementById('egi').checked = config.egi !== 'no';
                    document.getElementById('enableDiverseProxies').checked = config.edp === 'yes' || config.edp === true;
                    if (document.getElementById('ipv4Enabled')) document.getElementById('ipv4Enabled').checked = config.ipv4 !== 'no';
                    if (document.getElementById('ipv6Enabled')) document.getElementById('ipv6Enabled').checked = config.ipv6 !== 'no';
                    if (document.getElementById('ispMobile')) document.getElementById('ispMobile').checked = config.ispMobile !== 'no';
                    if (document.getElementById('ispUnicom')) document.getElementById('ispUnicom').checked = config.ispUnicom !== 'no';
                    if (document.getElementById('ispTelecom')) document.getElementById('ispTelecom').checked = config.ispTelecom !== 'no';
                    document.getElementById('customPath').value = config.d || '';
                    document.getElementById('customIP').value = config.p || '';
                    document.getElementById('yx').value = config.yx || '';
                    document.getElementById('yxURL').value = config.yxURL || '';
                    document.getElementById('socksConfig').value = config.s || '';
                    document.getElementById('customHomepage').value = config.homepage || '';
                    document.getElementById('apiEnabled').value = config.ae || '';
                    document.getElementById('regionMatching').value = config.rm || '';
                    document.getElementById('downgradeControl').value = config.qj || '';
                    document.getElementById('portControl').value = config.dkby || '';
                    document.getElementById('preferredControl').value = config.yxby || '';

                    // Update path type display
                    updatePathTypeStatus(config.d);

                    // Check p variable, if it has value, disable wk region selection
                    updateWkRegionState();

                } catch (error) {
                    document.getElementById('currentConfig').textContent = t.configLoadFailedStatus + error.message;
                }
            }

            // Update path type display
            function updatePathTypeStatus(cp) {
                const pathTypeStatus = document.getElementById('pathTypeStatus');
                const currentUrl = window.location.href;
                const pathParts = window.location.pathname.split('/').filter(p => p);
                const currentPath = pathParts.length > 0 ? pathParts[0] : '';

                if (cp && cp.trim()) {
                    // Use custom path (d)
                    pathTypeStatus.innerHTML = '<div style="color: #44ff44;">' + t.pathTypeCustom + '</div>' +
                        '<div style="margin-top: 5px; color: #00ff00;">' + t.currentPathLabel + ': <span style="color: #ffaa00;">' + cp + '</span></div>' +
                        '<div style="margin-top: 5px; font-size: 0.9rem; color: #00aa00;">' + t.accessUrlLabel + ': ' +
                        (currentUrl.split('/')[0] + '//' + currentUrl.split('/')[2]) + cp + '/sub</div>';
                } else {
                    // Use UUID (u)
                    pathTypeStatus.innerHTML = '<div style="color: #44ff44;">' + t.pathTypeUUID + '</div>' +
                        '<div style="margin-top: 5px; color: #00ff00;">' + t.currentPathLabel + ': <span style="color: #ffaa00;">' + (currentPath || '(UUID)') + '</span></div>' +
                        '<div style="margin-top: 5px; font-size: 0.9rem; color: #00aa00;">' + t.accessUrlLabel + ': ' + currentUrl.split('/sub')[0] + '/sub</div>';
                }
            }

            // Update wk region selection enabled/disabled state
            function updateWkRegionState() {
                const customIPInput = document.getElementById('customIP');
                const wkRegion = document.getElementById('wkRegion');
                const wkRegionHint = document.getElementById('wkRegionHint');

                if (customIPInput && wkRegion) {
                    const hasCustomIP = customIPInput.value.trim() !== '';
                    wkRegion.disabled = hasCustomIP;

                    // Add visual feedback
                    if (hasCustomIP) {
                        wkRegion.style.opacity = '0.5';
                        wkRegion.style.cursor = 'not-allowed';
                        wkRegion.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                        // Show hint message
                        if (wkRegionHint) {
                            wkRegionHint.style.display = 'block';
                            wkRegionHint.style.color = '#ffaa00';
                        }
                    } else {
                        wkRegion.style.opacity = '1';
                        wkRegion.style.cursor = 'pointer';
                        wkRegion.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                        // Hide hint message
                        if (wkRegionHint) {
                            wkRegionHint.style.display = 'none';
                        }
                    }
                }
            }

            async function saveConfig(configData) {
                const apiUrl = window.location.pathname + '/api/config';

                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(configData)
                    });


                    if (response.status === 503) {
                        showStatus(t.kvNotConfiguredSave, 'error');
                        return;
                    }

                    if (!response.ok) {
                        const errorText = await response.text();

                        // Try parsing JSON error message
                        try {
                            const errorData = JSON.parse(errorText);
                            showStatus(errorData.message || t.saveFailed, 'error');
                        } catch (parseError) {
                            // If not JSON, display text directly
                            showStatus(t.saveFailed + ': ' + errorText, 'error');
                        }
                        return;
                    }

                    const result = await response.json();

                    showStatus(result.message, result.success ? 'success' : 'error');

                    if (result.success) {
                        await loadCurrentConfig();
                        // 更新wk地区选择状态
                        updateWkRegionState();
                        // Reload page after successful save to update system status
                        setTimeout(function() {
                            window.location.reload();
                        }, 1500);
                    } else {
                    }
                } catch (error) {
                    showStatus(t.saveFailed + ': ' + error.message, 'error');
                }
            }

            function showStatus(message, type) {
                const statusDiv = document.getElementById('statusMessage');
                statusDiv.textContent = message;
                statusDiv.style.display = 'block';
                statusDiv.style.color = type === 'success' ? '#00ff00' : '#ff0000';
                statusDiv.style.borderColor = type === 'success' ? '#00ff00' : '#ff0000';
                if (type === 'error' || type === 'warn') {
                    debugConsolePush(message, type === 'warn' ? 'warn' : 'error');
                }

                setTimeout(function() {
                    statusDiv.style.display = 'none';
                }, 3000);
            }

            async function resetAllConfig() {
                if (confirm(t.resetConfirm)) {
                    try {
                        const response = await fetch(window.location.pathname + '/api/config', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                wk: '',
                                d: '',
                                p: '',
                                yx: '',
                                yxURL: '',
                                s: '', ae: '',
                                rm: '',
                                qj: '',
                                dkby: '',
                                yxby: '', ev: '', et: '', ex: '', tp: '', scu: '', epd: '', epi: '', egi: '',
                                ipv4: '', ipv6: '', ispMobile: '', ispUnicom: '', ispTelecom: '',
                                homepage: ''
                            })
                        });

                        if (response.status === 503) {
                            showStatus(t.kvNotConfiguredReset, 'error');
                            return;
                        }

                        if (!response.ok) {
                            const errorText = await response.text();

                            // Try parsing JSON error message
                            try {
                                const errorData = JSON.parse(errorText);
                                showStatus(errorData.message || t.resetFailed, 'error');
                            } catch (parseError) {
                                // If not JSON, display text directly
                                showStatus(t.resetFailed + ': ' + errorText, 'error');
                            }
                            return;
                        }

                        const result = await response.json();
                        showStatus(result.message || t.resetSuccess, result.success ? 'success' : 'error');

                        if (result.success) {
                            await loadCurrentConfig();
                            // 更新wk地区选择状态
                            updateWkRegionState();
                            // Reload page to update system status
                            setTimeout(function() {
                                window.location.reload();
                            }, 1500);
                        }
                    } catch (error) {
                        showStatus(t.resetFailed + ': ' + error.message, 'error');
                    }
                }
            }

            async function checkECHStatus() {
                const echStatusEl = document.getElementById('echStatus');

                if (!echStatusEl) return;

                try {
                    const currentUrl = window.location.href;
                    const subscriptionUrl = currentUrl + '/sub';

                    echStatusEl.innerHTML = t.echStatusLabel + ' <span style="color: #ffaa00;">' + t.checking + '</span>';

                    const response = await fetch(subscriptionUrl, {
                        method: 'GET',
                        headers: {
                            'Accept': 'text/plain'
                        }
                    });

                    const echStatusHeader = response.headers.get('X-ECH-Status');
                    const echConfigLength = response.headers.get('X-ECH-Config-Length');

                    if (echStatusHeader === 'ENABLED') {
                        echStatusEl.innerHTML = t.echStatusLabel + ' <span style="color: #44ff44;">✅ ' + t.statusEnabled + (echConfigLength ? ' (' + t.configLengthLabel + ': ' + echConfigLength + ')' : '') + '</span>';
                    } else {
                        echStatusEl.innerHTML = t.echStatusLabel + ' <span style="color: #ffaa00;">⚠️ ' + t.statusDisabled + '</span>';
                    }
                } catch (error) {
                    debugConsolePush('checkECHStatus failed: ' + (error && error.message ? error.message : error), 'error');
                    echStatusEl.innerHTML = t.echStatusLabel + ' <span style="color: #ff4444;">❌ ' + t.statusCheckFailed + ': ' + error.message + '</span>';
                }
            }

            document.addEventListener('DOMContentLoaded', function() {
                initDebugConsole();
                createMatrixRain();
                checkSystemStatus();
                checkKVStatus();
                checkECHStatus();

                // Automatically enable TLS-only when ECH is enabled
                const echCheckbox = document.getElementById('ech');
                const portControl = document.getElementById('portControl');
                if (echCheckbox && portControl) {
                    echCheckbox.addEventListener('change', function() {
                        if (this.checked) {
                            // When ECH is enabled, automatically set TLS-only to yes
                            portControl.value = 'yes';
                        }
                    });

                    // On page load, if ECH is checked, also automatically set TLS-only
                    if (echCheckbox.checked) {
                        portControl.value = 'yes';
                    }
                }

                // Listen for customIP input changes, update wk region selection state in real-time
                const customIPInput = document.getElementById('customIP');
                if (customIPInput) {
                    customIPInput.addEventListener('input', function() {
                        updateWkRegionState();
                    });
                }

                // Bind form events
                const regionForm = document.getElementById('regionForm');
                if (regionForm) {
                    regionForm.addEventListener('submit', async function(e) {
                        e.preventDefault();
                        const wkRegion = document.getElementById('wkRegion').value;
                        await saveConfig({ wk: wkRegion });
                    });
                }

                const saveProtocolBtn = document.getElementById('saveProtocolBtn');
                if (saveProtocolBtn) {
                    saveProtocolBtn.addEventListener('click', async function(e) {
                        e.preventDefault();
                        const configData = {
                            ev: document.getElementById('ev').checked ? 'yes' : 'no',
                            evm: document.getElementById('evm').checked ? 'yes' : 'no',
                            ess: document.getElementById('ess').checked ? 'yes' : 'no',
                            etu: document.getElementById('etu').checked ? 'yes' : 'no',
                            ehy: document.getElementById('ehy').checked ? 'yes' : 'no',
                            eg: document.getElementById('eg').checked ? 'yes' : 'no',
                            et: document.getElementById('et').checked ? 'yes' : 'no',
                            ex: document.getElementById('ex').checked ? 'yes' : 'no',
                            ech: document.getElementById('ech').checked ? 'yes' : 'no',
                            tp: document.getElementById('tp').value,
                            customDNS: document.getElementById('customDNS').value,
                            customECHDomain: document.getElementById('customECHDomain').value
                        };

                        if (!document.getElementById('ev').checked &&
                            !document.getElementById('evm').checked &&
                            !document.getElementById('ess').checked &&
                            !document.getElementById('etu').checked &&
                            !document.getElementById('ehy').checked &&
                            !document.getElementById('eg').checked &&
                            !document.getElementById('et').checked &&
                            !document.getElementById('ex').checked) {
                            alert(t.selectAtLeastOne);
                            return;
                        }

                        await saveConfig(configData);
                    });
                }

                const otherConfigForm = document.getElementById('otherConfigForm');
                if (otherConfigForm) {
                    otherConfigForm.addEventListener('submit', async function(e) {
                        e.preventDefault();
                        const configData = {
                            ev: document.getElementById('ev').checked ? 'yes' : 'no',
                            evm: document.getElementById('evm').checked ? 'yes' : 'no',
                            ess: document.getElementById('ess').checked ? 'yes' : 'no',
                            etu: document.getElementById('etu').checked ? 'yes' : 'no',
                            ehy: document.getElementById('ehy').checked ? 'yes' : 'no',
                            eg: document.getElementById('eg').checked ? 'yes' : 'no',
                            et: document.getElementById('et').checked ? 'yes' : 'no',
                            ex: document.getElementById('ex').checked ? 'yes' : 'no',
                            ech: document.getElementById('ech').checked ? 'yes' : 'no',
                            tp: document.getElementById('tp').value,
                            d: document.getElementById('customPath').value,
                            p: document.getElementById('customIP').value,
                            yx: document.getElementById('yx').value,
                            yxURL: document.getElementById('yxURL').value,
                            s: document.getElementById('socksConfig').value,
                            homepage: document.getElementById('customHomepage').value,
                            customDNS: document.getElementById('customDNS').value,
                            customECHDomain: document.getElementById('customECHDomain').value
                        };

                        // Ensure at least one protocol is selected
                        if (!document.getElementById('ev').checked &&
                            !document.getElementById('evm').checked &&
                            !document.getElementById('ess').checked &&
                            !document.getElementById('etu').checked &&
                            !document.getElementById('ehy').checked &&
                            !document.getElementById('eg').checked &&
                            !document.getElementById('et').checked &&
                            !document.getElementById('ex').checked) {
                            alert(t.selectAtLeastOne);
                            return;
                        }

                        await saveConfig(configData);
                    });
                }

                const advancedConfigForm = document.getElementById('advancedConfigForm');
                if (advancedConfigForm) {
                    advancedConfigForm.addEventListener('submit', async function(e) {
                        e.preventDefault();
                        const configData = { scu: document.getElementById('scu').value, epd: document.getElementById('epd').checked ? 'yes' : 'no', epi: document.getElementById('epi').checked ? 'yes' : 'no', egi: document.getElementById('egi').checked ? 'yes' : 'no', edp: document.getElementById('enableDiverseProxies').checked ? 'yes' : 'no', ae: document.getElementById('apiEnabled').value,
                            rm: document.getElementById('regionMatching').value,
                            qj: document.getElementById('downgradeControl').value,
                            dkby: document.getElementById('portControl').value,
                            yxby: document.getElementById('preferredControl').value,
                            ipv4: document.getElementById('ipv4Enabled').checked ? 'yes' : 'no',
                            ipv6: document.getElementById('ipv6Enabled').checked ? 'yes' : 'no',
                            ispMobile: document.getElementById('ispMobile').checked ? 'yes' : 'no',
                            ispUnicom: document.getElementById('ispUnicom').checked ? 'yes' : 'no',
                            ispTelecom: document.getElementById('ispTelecom').checked ? 'yes' : 'no'
                        };
                        await saveConfig(configData);
                    });
                }

                let testAbortController = null;
                let testResults = [];

                const startTestBtn = document.getElementById('startLatencyTest');
                const stopTestBtn = document.getElementById('stopLatencyTest');
                const testStatus = document.getElementById('latencyTestStatus');
                const testResultsDiv = document.getElementById('latencyTestResults');
                const resultsList = document.getElementById('latencyResultsList');
                const overwriteSelectedBtn = document.getElementById('overwriteSelectedToYx');
                const appendSelectedBtn = document.getElementById('appendSelectedToYx');
                const selectAllBtn = document.getElementById('selectAllResults');
                const deselectAllBtn = document.getElementById('deselectAllResults');
                const ipSourceSelect = document.getElementById('ipSourceSelect');
                const manualInputDiv = document.getElementById('manualInputDiv');
                const urlFetchDiv = document.getElementById('urlFetchDiv');
                const latencyTestInput = document.getElementById('latencyTestInput');
                const fetchURLInput = document.getElementById('fetchURLInput');
                const latencyTestPort = document.getElementById('latencyTestPort');
                const randomIPCount = document.getElementById('randomIPCount');
                const cfRandomDiv = document.getElementById('cfRandomDiv');
                const randomCountDiv = document.getElementById('randomCountDiv');
                const generateCFIPBtn = document.getElementById('generateCFIPBtn');
                const fetchIPBtn = document.getElementById('fetchIPBtn');

                if (latencyTestInput) {
                    const savedTestInput = localStorage.getItem('latencyTestInput');
                    if (savedTestInput) latencyTestInput.value = savedTestInput;
                    latencyTestInput.addEventListener('input', function() {
                        localStorage.setItem('latencyTestInput', this.value);
                    });
                }
                if (fetchURLInput) {
                    const savedFetchURL = localStorage.getItem('fetchURLInput');
                    if (savedFetchURL) fetchURLInput.value = savedFetchURL;
                    fetchURLInput.addEventListener('input', function() {
                        localStorage.setItem('fetchURLInput', this.value);
                    });
                }
                if (latencyTestPort) {
                    const savedPort = localStorage.getItem('latencyTestPort');
                    if (savedPort) latencyTestPort.value = savedPort;
                    latencyTestPort.addEventListener('input', function() {
                        localStorage.setItem('latencyTestPort', this.value);
                    });
                }
                if (randomIPCount) {
                    const savedCount = localStorage.getItem('randomIPCount');
                    if (savedCount) randomIPCount.value = savedCount;
                    randomIPCount.addEventListener('input', function() {
                        localStorage.setItem('randomIPCount', this.value);
                    });
                    // On init, if hidden by default, disable input box
                    if (randomCountDiv && randomCountDiv.style.display === 'none') {
                        randomIPCount.disabled = true;
                    }
                }
                const testThreadsInput = document.getElementById('testThreads');
                if (testThreadsInput) {
                    const savedThreads = localStorage.getItem('testThreads');
                    if (savedThreads) testThreadsInput.value = savedThreads;
                    testThreadsInput.addEventListener('input', function() {
                        localStorage.setItem('testThreads', this.value);
                    });
                }
                if (ipSourceSelect) {
                    const savedSource = localStorage.getItem('ipSourceSelect');
                    const currentSource = savedSource || ipSourceSelect.value || 'manual';
                    if (savedSource) {
                        ipSourceSelect.value = savedSource;
                    }
                    manualInputDiv.style.display = currentSource === 'manual' ? 'block' : 'none';
                    urlFetchDiv.style.display = currentSource === 'urlFetch' ? 'block' : 'none';
                    cfRandomDiv.style.display = currentSource === 'cfRandom' ? 'block' : 'none';
                    randomCountDiv.style.display = currentSource === 'cfRandom' ? 'block' : 'none';
                    // When hidden, disable input box to avoid form validation errors
                    if (randomIPCount) {
                        randomIPCount.disabled = currentSource !== 'cfRandom';
                    }
                }

                const CF_CIDR_LIST = [
                    '173.245.48.0/20', '103.21.244.0/22', '103.22.200.0/22', '103.31.4.0/22',
                    '141.101.64.0/18', '108.162.192.0/18', '190.93.240.0/20', '188.114.96.0/20',
                    '197.234.240.0/22', '198.41.128.0/17', '162.158.0.0/15', '104.16.0.0/13',
                    '104.24.0.0/14', '172.64.0.0/13', '131.0.72.0/22'
                ];

                function generateRandomIPFromCIDR(cidr) {
                    const [baseIP, prefixLength] = cidr.split('/');
                    const prefix = parseInt(prefixLength);
                    const hostBits = 32 - prefix;
                    const ipParts = baseIP.split('.').map(p => parseInt(p));
                    const ipInt = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
                    const randomOffset = Math.floor(Math.random() * Math.pow(2, hostBits));
                    const mask = (0xFFFFFFFF << hostBits) >>> 0;
                    const randomIP = (((ipInt & mask) >>> 0) + randomOffset) >>> 0;
                    return [(randomIP >>> 24) & 0xFF, (randomIP >>> 16) & 0xFF, (randomIP >>> 8) & 0xFF, randomIP & 0xFF].join('.');
                }

                function generateCFRandomIPs(count, port) {
                    const ips = [];
                    for (let i = 0; i < count; i++) {
                        const cidr = CF_CIDR_LIST[Math.floor(Math.random() * CF_CIDR_LIST.length)];
                        const ip = generateRandomIPFromCIDR(cidr);
                        ips.push(ip + ':' + port);
                    }
                    return ips;
                }

                if (ipSourceSelect) {
                    ipSourceSelect.addEventListener('change', function() {
                        const value = this.value;
                        localStorage.setItem('ipSourceSelect', value);
                        manualInputDiv.style.display = value === 'manual' ? 'block' : 'none';
                        urlFetchDiv.style.display = value === 'urlFetch' ? 'block' : 'none';
                        cfRandomDiv.style.display = value === 'cfRandom' ? 'block' : 'none';
                        randomCountDiv.style.display = value === 'cfRandom' ? 'block' : 'none';
                        // When hidden, disable input box to avoid form validation errors
                        if (randomIPCount) {
                            randomIPCount.disabled = value !== 'cfRandom';
                        }
                    });
                }

                if (generateCFIPBtn) {
                    generateCFIPBtn.addEventListener('click', function() {
                        const count = parseInt(document.getElementById('randomIPCount').value) || 20;
                        const port = document.getElementById('latencyTestPort').value || '443';
                        const ips = generateCFRandomIPs(count, port);
                        document.getElementById('latencyTestInput').value = ips.join(',');
                        manualInputDiv.style.display = 'block';
                        showStatus(t.generated + ' ' + count + ' ' + t.cfRandomIPs, 'success');
                    });
                }

                if (fetchIPBtn) {
                    fetchIPBtn.addEventListener('click', async function() {
                        const urlInput = document.getElementById('fetchURLInput');
                        const fetchUrl = urlInput.value.trim();
                        if (!fetchUrl) {
                            alert(t.pleaseEnterUrl);
                            return;
                        }

                        fetchIPBtn.disabled = true;
                        fetchIPBtn.textContent = t.fetching;

                        try {
                            // Support multiple URLs (comma separated) and multiple IPs/nodes (comma separated) in response
                            const urlList = Array.from(new Set(
                                fetchUrl.split(',').map(u => u.trim()).filter(u => u)
                            ));

                            const allItems = [];

                            for (const u of urlList) {
                                const response = await fetch(u);
                                if (!response.ok) {
                                    throw new Error('HTTP ' + response.status + ' @ ' + u);
                                }
                                const text = await response.text();

                                // Split by line first, then by comma in each line, compatible with both 'multi-line' and 'comma-separated' formats
                                const perUrlItems = text
                                    .split(/\\r?\\n/)
                                    .map(l => l.trim())
                                    .filter(l => l && !l.startsWith('#'))
                                    .flatMap(l => l.split(',').map(p => p.trim()).filter(p => p));

                                allItems.push(...perUrlItems);
                            }

                            if (allItems.length > 0) {
                                document.getElementById('latencyTestInput').value = allItems.join(',');
                                manualInputDiv.style.display = 'block';
                                showStatus(t.fetched + ' ' + allItems.length + ' ' + t.ipCountSuffix, 'success');
                            } else {
                                showStatus(t.noDataFound, 'error');
                            }
                        } catch (err) {
                            showStatus(t.fetchFailed + ': ' + err.message, 'error');
                        } finally {
                            fetchIPBtn.disabled = false;
                            fetchIPBtn.textContent = '⬇ ' + t.fetchIP;
                        }
                    });
                }

                if (startTestBtn) {
                    startTestBtn.addEventListener('click', async function() {
                        const inputField = document.getElementById('latencyTestInput');
                        const portField = document.getElementById('latencyTestPort');
                        const threadsField = document.getElementById('testThreads');
                        const inputValue = inputField.value.trim();
                        const defaultPort = portField.value || '443';
                        const threads = parseInt(threadsField.value) || 5;

                        if (!inputValue) {
                            showStatus(t.pleaseEnterIPOrDomain, 'error');
                            return;
                        }

                        const targets = inputValue.split(',').map(t => t.trim()).filter(t => t);
                        if (targets.length === 0) return;

                        startTestBtn.style.display = 'none';
                        stopTestBtn.style.display = 'inline-block';
                        testStatus.style.display = 'block';
                        testResultsDiv.style.display = 'block';
                        resultsList.innerHTML = '';
                        testResults = [];
                        if (cityFilterContainer) {
                            cityFilterContainer.style.display = 'none';
                        }

                        testAbortController = new AbortController();

                        let completed = 0;
                        const total = targets.length;

                        function parseTarget(target) {
                            let host = target;
                            let port = defaultPort;
                            let nodeName = '';

                            if (target.includes('#')) {
                                const parts = target.split('#');
                                nodeName = parts[1] || '';
                                host = parts[0];
                            }

                            if (host.includes(':') && !host.startsWith('[')) {
                                const lastColon = host.lastIndexOf(':');
                                const possiblePort = host.substring(lastColon + 1);
                                if (/^[0-9]+$/.test(possiblePort)) {
                                    port = possiblePort;
                                    host = host.substring(0, lastColon);
                                }
                            } else if (host.includes(']:')) {
                                const parts = host.split(']:');
                                host = parts[0] + ']';
                                port = parts[1];
                            }
                            return { host, port, nodeName };
                        }

                        function renderResult(result, index, shouldShow = true) {
                            // Only show successful online optimization results, failed/timed out ones are not shown
                            if (!result.success) {
                                return null;
                            }

                            const resultItem = document.createElement('div');
                            resultItem.style.cssText = 'display: flex; align-items: center; padding: 8px; border-bottom: 1px solid #003300; gap: 10px;';
                            resultItem.dataset.index = index;
                            resultItem.dataset.colo = result.colo || '';
                            if (!shouldShow) {
                                resultItem.style.display = 'none';
                            }

                            const checkbox = document.createElement('input');
                            checkbox.type = 'checkbox';
                            checkbox.checked = true;
                            checkbox.disabled = false;
                            checkbox.dataset.index = index;
                            checkbox.style.cssText = 'width: 18px; height: 18px; cursor: pointer;';

                            const info = document.createElement('div');
                            info.style.cssText = 'flex: 1; font-family: monospace; font-size: 13px;';

                            const coloName = result.colo ? getColoName(result.colo) : '';
                            const coloDisplay = coloName ? ' <span style="color: #00aaff;">[' + coloName + ']</span>' : '';
                            info.innerHTML = '<span style="color: #00ff00;">' + result.host + ':' + result.port + '</span>' + coloDisplay + ' <span style="color: #ffff00;">' + result.latency + 'ms</span>';

                            resultItem.appendChild(checkbox);
                            resultItem.appendChild(info);
                            resultsList.appendChild(resultItem);
                            return resultItem;
                        }

                        async function testOne(target) {
                            if (testAbortController.signal.aborted) return null;
                            const { host, port, nodeName } = parseTarget(target);
                            const result = await testLatency(host, port, testAbortController.signal);
                            result.host = host;
                            result.port = port;
                            result.nodeName = (result.success && result.colo) ? (nodeName || ('CF-' + result.colo)) : (nodeName || host);
                            return result;
                        }

                        for (let i = 0; i < total; i += threads) {
                            if (testAbortController.signal.aborted) break;

                            const batch = targets.slice(i, Math.min(i + threads, total));
                            testStatus.textContent = t.testing + ': ' + (i + 1) + '-' + Math.min(i + threads, total) + '/' + total + ' (' + t.threadsLabel + ': ' + threads + ')';

                            const results = await Promise.all(batch.map(t => testOne(t)));

                            for (const result of results) {
                                if (result) {
                                    const idx = testResults.length;
                                    testResults.push(result);
                                    renderResult(result, idx);
                                    completed++;
                                }
                            }
                        }

                        testStatus.textContent = t.testComplete + ': ' + completed + '/' + total;
                        startTestBtn.style.display = 'inline-block';
                        stopTestBtn.style.display = 'none';

                        // Update city filter
                        updateCityFilter();
                    });
                }

                if (stopTestBtn) {
                    stopTestBtn.addEventListener('click', function() {
                        if (testAbortController) {
                            testAbortController.abort();
                        }
                        startTestBtn.style.display = 'inline-block';
                        stopTestBtn.style.display = 'none';
                        testStatus.textContent = t.testStopped;
                    });
                }

                if (selectAllBtn) {
                    selectAllBtn.addEventListener('click', function() {
                        const checkboxes = resultsList.querySelectorAll('input[type="checkbox"]:not(:disabled)');
                        checkboxes.forEach(cb => cb.checked = true);
                    });
                }

                if (deselectAllBtn) {
                    deselectAllBtn.addEventListener('click', function() {
                        const checkboxes = resultsList.querySelectorAll('input[type="checkbox"]');
                        checkboxes.forEach(cb => cb.checked = false);
                    });
                }

                // Generic function to get selected items
                function getSelectedItems() {
                    const checkboxes = resultsList.querySelectorAll('input[type="checkbox"]:checked');
                    if (checkboxes.length === 0) {
                        showStatus(t.selectAtLeastOne, 'error');
                        return null;
                    }

                    const selectedItems = [];
                    checkboxes.forEach(cb => {
                        const idx = parseInt(cb.dataset.index);
                        const result = testResults[idx];
                        if (result && result.success) {
                            const coloName = result.colo ? getColoName(result.colo) : result.nodeName;
                            const itemStr = result.host + ':' + result.port + '#' + coloName;
                            selectedItems.push(itemStr);
                        }
                    });

                    return selectedItems;
                }

                // Overwrite add
                if (overwriteSelectedBtn) {
                    overwriteSelectedBtn.addEventListener('click', async function() {
                        const selectedItems = getSelectedItems();
                        if (!selectedItems || selectedItems.length === 0) return;

                        const yxInput = document.getElementById('yx');
                        const newValue = selectedItems.join(',');
                        yxInput.value = newValue;

                        overwriteSelectedBtn.disabled = true;
                        appendSelectedBtn.disabled = true;
                        overwriteSelectedBtn.textContent = t.saving;

                        try {
                            const configData = {
                                p: document.getElementById('customIP').value,
                                yx: newValue,
                                yxURL: document.getElementById('yxURL').value,
                                s: document.getElementById('socksConfig').value
                            };
                            await saveConfig(configData);
                            showStatus(t.overwritten + ' ' + selectedItems.length + t.itemsSaved, 'success');
                        } catch (err) {
                            showStatus(t.saveFailed + ': ' + err.message, 'error');
                        } finally {
                            overwriteSelectedBtn.disabled = false;
                            appendSelectedBtn.disabled = false;
                            overwriteSelectedBtn.textContent = t.overwriteAdd;
                        }
                    });
                }

                // Append add
                if (appendSelectedBtn) {
                    appendSelectedBtn.addEventListener('click', async function() {
                        const selectedItems = getSelectedItems();
                        if (!selectedItems || selectedItems.length === 0) return;

                        const yxInput = document.getElementById('yx');
                        const currentValue = yxInput.value.trim();
                        const newItems = selectedItems.join(',');
                        const newValue = currentValue ? (currentValue + ',' + newItems) : newItems;
                        yxInput.value = newValue;

                        overwriteSelectedBtn.disabled = true;
                        appendSelectedBtn.disabled = true;
                        appendSelectedBtn.textContent = t.saving;

                        try {
                            const configData = {
                                p: document.getElementById('customIP').value,
                                yx: newValue,
                                yxURL: document.getElementById('yxURL').value,
                                s: document.getElementById('socksConfig').value
                            };
                            await saveConfig(configData);
                            showStatus(t.appended + ' ' + selectedItems.length + t.itemsSaved, 'success');
                        } catch (err) {
                            showStatus(t.saveFailed + ': ' + err.message, 'error');
                        } finally {
                            overwriteSelectedBtn.disabled = false;
                            appendSelectedBtn.disabled = false;
                            appendSelectedBtn.textContent = t.appendAdd;
                        }
                    });
                }

                function ipToHex(ip) {
                    const parts = ip.split('.');
                    if (parts.length !== 4) return null;
                    let hex = '';
                    for (let i = 0; i < 4; i++) {
                        const num = parseInt(parts[i]);
                        if (isNaN(num) || num < 0 || num > 255) return null;
                        hex += num.toString(16).padStart(2, '0');
                    }
                    return hex;
                }

                const coloMap = {
                    'SJC': '🇺🇸 圣何塞', 'LAX': '🇺🇸 洛杉矶', 'SEA': '🇺🇸 西雅图', 'SFO': '🇺🇸 旧金山', 'DFW': '🇺🇸 达拉斯',
                    'ORD': '🇺🇸 芝加哥', 'IAD': '🇺🇸 华盛顿', 'ATL': '🇺🇸 亚特兰大', 'MIA': '🇺🇸 迈阿密', 'DEN': '🇺🇸 丹佛',
                    'PHX': '🇺🇸 凤凰城', 'BOS': '🇺🇸 波士顿', 'EWR': '🇺🇸 纽瓦克', 'JFK': '🇺🇸 纽约', 'LAS': '🇺🇸 拉斯维加斯',
                    'MSP': '🇺🇸 明尼阿波利斯', 'DTW': '🇺🇸 底特律', 'PHL': '🇺🇸 费城', 'CLT': '🇺🇸 夏洛特', 'SLC': '🇺🇸 盐湖城',
                    'PDX': '🇺🇸 波特兰', 'SAN': '🇺🇸 圣地亚哥', 'TPA': '🇺🇸 坦帕', 'IAH': '🇺🇸 休斯顿', 'MCO': '🇺🇸 奥兰多',
                    'AUS': '🇺🇸 奥斯汀', 'BNA': '🇺🇸 纳什维尔', 'RDU': '🇺🇸 罗利', 'IND': '🇺🇸 印第安纳波利斯', 'CMH': '🇺🇸 哥伦布',
                    'MCI': '🇺🇸 堪萨斯城', 'OMA': '🇺🇸 奥马哈', 'ABQ': '🇺🇸 阿尔伯克基', 'OKC': '🇺🇸 俄克拉荷马城', 'MEM': '🇺🇸 孟菲斯',
                    'JAX': '🇺🇸 杰克逊维尔', 'RIC': '🇺🇸 里士满', 'BUF': '🇺🇸 布法罗', 'PIT': '🇺🇸 匹兹堡', 'CLE': '🇺🇸 克利夫兰',
                    'CVG': '🇺🇸 辛辛那提', 'MKE': '🇺🇸 密尔沃基', 'STL': '🇺🇸 圣路易斯', 'SAT': '🇺🇸 圣安东尼奥', 'HNL': '🇺🇸 檀香山',
                    'ANC': '🇺🇸 安克雷奇', 'SMF': '🇺🇸 萨克拉门托', 'ONT': '🇺🇸 安大略', 'OAK': '🇺🇸 奥克兰',
                    'HKG': '🇭🇰 香港', 'TPE': '🇹🇼 台北', 'TSA': '🇹🇼 台北松山', 'KHH': '🇹🇼 高雄',
                    'NRT': '🇯🇵 东京成田', 'HND': '🇯🇵 东京羽田', 'KIX': '🇯🇵 大阪关西', 'ITM': '🇯🇵 大阪伊丹', 'NGO': '🇯🇵 名古屋',
                    'FUK': '🇯🇵 福冈', 'CTS': '🇯🇵 札幌', 'OKA': '🇯🇵 冲绳',
                    'ICN': '🇰🇷 首尔仁川', 'GMP': '🇰🇷 首尔金浦', 'PUS': '🇰🇷 釜山',
                    'SIN': '🇸🇬 新加坡', 'BKK': '🇹🇭 曼谷', 'DMK': '🇹🇭 曼谷廊曼', 'KUL': '🇲🇾 吉隆坡', 'CGK': '🇮🇩 雅加达',
                    'MNL': '🇵🇭 马尼拉', 'CEB': '🇵🇭 宿务', 'HAN': '🇻🇳 河内', 'SGN': '🇻🇳 胡志明', 'DAD': '🇻🇳 岘港',
                    'RGN': '🇲🇲 仰光', 'PNH': '🇰🇭 金边', 'REP': '🇰🇭 暹粒', 'VTE': '🇱🇦 万象',
                    'BOM': '🇮🇳 孟买', 'DEL': '🇮🇳 新德里', 'MAA': '🇮🇳 金奈', 'BLR': '🇮🇳 班加罗尔', 'CCU': '🇮🇳 加尔各答',
                    'HYD': '🇮🇳 海得拉巴', 'AMD': '🇮🇳 艾哈迈达巴德', 'COK': '🇮🇳 科钦', 'PNQ': '🇮🇳 浦那', 'GOI': '🇮🇳 果阿',
                    'CMB': '🇱🇰 科伦坡', 'DAC': '🇧🇩 达卡', 'KTM': '🇳🇵 加德满都', 'ISB': '🇵🇰 伊斯兰堡', 'KHI': '🇵🇰 卡拉奇', 'LHE': '🇵🇰 拉合尔',
                    'LHR': '🇬🇧 伦敦希思罗', 'LGW': '🇬🇧 伦敦盖特威克', 'STN': '🇬🇧 伦敦斯坦斯特德', 'LTN': '🇬🇧 伦敦卢顿', 'MAN': '🇬🇧 曼彻斯特', 'EDI': '🇬🇧 爱丁堡', 'BHX': '🇬🇧 伯明翰',
                    'CDG': '🇫🇷 巴黎戴高乐', 'ORY': '🇫🇷 巴黎奥利', 'MRS': '🇫🇷 马赛', 'LYS': '🇫🇷 里昂', 'NCE': '🇫🇷 尼斯',
                    'FRA': '🇩🇪 法兰克福', 'MUC': '🇩🇪 慕尼黑', 'TXL': '🇩🇪 柏林', 'BER': '🇩🇪 柏林勃兰登堡', 'HAM': '🇩🇪 汉堡', 'DUS': '🇩🇪 杜塞尔多夫', 'CGN': '🇩🇪 科隆', 'STR': '🇩🇪 斯图加特',
                    'AMS': '🇳🇱 阿姆斯特丹', 'BRU': '🇧🇪 布鲁塞尔', 'LUX': '🇱🇺 卢森堡',
                    'ZRH': '🇨🇭 苏黎世', 'GVA': '🇨🇭 日内瓦', 'BSL': '🇨🇭 巴塞尔',
                    'VIE': '🇦🇹 维也纳', 'PRG': '🇨🇿 布拉格', 'BUD': '🇭🇺 布达佩斯', 'WAW': '🇵🇱 华沙', 'KRK': '🇵🇱 克拉科夫',
                    'MXP': '🇮🇹 米兰马尔彭萨', 'LIN': '🇮🇹 米兰利纳特', 'FCO': '🇮🇹 罗马', 'VCE': '🇮🇹 威尼斯', 'NAP': '🇮🇹 那不勒斯', 'FLR': '🇮🇹 佛罗伦萨', 'BGY': '🇮🇹 贝加莫',
                    'MAD': '🇪🇸 马德里', 'BCN': '🇪🇸 巴塞罗那', 'PMI': '🇪🇸 帕尔马', 'AGP': '🇪🇸 马拉加', 'VLC': '🇪🇸 瓦伦西亚', 'SVQ': '🇪🇸 塞维利亚', 'BIO': '🇪🇸 毕尔巴鄂',
                    'LIS': '🇵🇹 里斯本', 'OPO': '🇵🇹 波尔图', 'FAO': '🇵🇹 法鲁',
                    'DUB': '🇮🇪 都柏林', 'CPH': '🇩🇰 哥本哈根', 'ARN': '🇸🇪 斯德哥尔摩', 'GOT': '🇸🇪 哥德堡',
                    'OSL': '🇳🇴 奥斯陆', 'BGO': '🇳🇴 卑尔根', 'HEL': '🇫🇮 赫尔辛基', 'RIX': '🇱🇻 里加', 'TLL': '🇪🇪 塔林', 'VNO': '🇱🇹 维尔纽斯',
                    'ATH': '🇬🇷 雅典', 'SKG': '🇬🇷 塞萨洛尼基', 'SOF': '🇧🇬 索非亚', 'OTP': '🇷🇴 布加勒斯特', 'BEG': '🇷🇸 贝尔格莱德', 'ZAG': '🇭🇷 萨格勒布', 'LJU': '🇸🇮 卢布尔雅那',
                    'KBP': '🇺🇦 基辅', 'IEV': '🇺🇦 基辅茹良尼', 'ODS': '🇺🇦 敖德萨',
                    'SVO': '🇷🇺 莫斯科谢列梅捷沃', 'DME': '🇷🇺 莫斯科多莫杰多沃', 'VKO': '🇷🇺 莫斯科伏努科沃', 'LED': '🇷🇺 圣彼得堡',
                    'IST': '🇹🇷 伊斯坦布尔', 'SAW': '🇹🇷 伊斯坦布尔萨比哈', 'ESB': '🇹🇷 安卡拉', 'AYT': '🇹🇷 安塔利亚', 'ADB': '🇹🇷 伊兹密尔',
                    'TLV': '🇮🇱 特拉维夫', 'AMM': '🇯🇴 安曼', 'BEY': '🇱🇧 贝鲁特', 'BAH': '🇧🇭 巴林', 'KWI': '🇰🇼 科威特',
                    'DXB': '🇦🇪 迪拜', 'AUH': '🇦🇪 阿布扎比', 'SHJ': '🇦🇪 沙迦', 'DOH': '🇶🇦 多哈', 'MCT': '🇴🇲 马斯喀特',
                    'RUH': '🇸🇦 利雅得', 'JED': '🇸🇦 吉达', 'DMM': '🇸🇦 达曼',
                    'CAI': '🇪🇬 开罗', 'HBE': '🇪🇬 亚历山大', 'SSH': '🇪🇬 沙姆沙伊赫',
                    'CMN': '🇲🇦 卡萨布兰卡', 'RAK': '🇲🇦 马拉喀什', 'TUN': '🇹🇳 突尼斯', 'ALG': '🇩🇿 阿尔及尔',
                    'LOS': '🇳🇬 拉各斯', 'ABV': '🇳🇬 阿布贾', 'ACC': '🇬🇭 阿克拉', 'NBO': '🇰🇪 内罗毕', 'MBA': '🇰🇪 蒙巴萨', 'ADD': '🇪🇹 亚的斯亚贝巴', 'DAR': '🇹🇿 达累斯萨拉姆',
                    'JNB': '🇿🇦 约翰内斯堡', 'CPT': '🇿🇦 开普敦', 'DUR': '🇿🇦 德班', 'HRE': '🇿🇼 哈拉雷', 'LUN': '🇿🇲 卢萨卡',
                    'MRU': '🇲🇺 毛里求斯', 'SEZ': '🇸🇨 塞舌尔',
                    'SYD': '🇦🇺 悉尼', 'MEL': '🇦🇺 墨尔本', 'BNE': '🇦🇺 布里斯班', 'PER': '🇦🇺 珀斯', 'ADL': '🇦🇺 阿德莱德', 'CBR': '🇦🇺 堪培拉', 'OOL': '🇦🇺 黄金海岸', 'CNS': '🇦🇺 凯恩斯',
                    'AKL': '🇳🇿 奥克兰', 'WLG': '🇳🇿 惠灵顿', 'CHC': '🇳🇿 基督城', 'ZQN': '🇳🇿 皇后镇',
                    'NAN': '🇫🇯 楠迪', 'PPT': '🇵🇫 帕皮提', 'GUM': '🇬🇺 关岛',
                    'GRU': '🇧🇷 圣保罗瓜鲁柳斯', 'CGH': '🇧🇷 圣保罗孔戈尼亚斯', 'GIG': '🇧🇷 里约热内卢', 'BSB': '🇧🇷 巴西利亚', 'CNF': '🇧🇷 贝洛奥里藏特', 'POA': '🇧🇷 阿雷格里港', 'CWB': '🇧🇷 库里蒂巴', 'FOR': '🇧🇷 福塔莱萨', 'REC': '🇧🇷 累西腓', 'SSA': '🇧🇷 萨尔瓦多',
                    'EZE': '🇦🇷 布宜诺斯艾利斯', 'AEP': '🇦🇷 布宜诺斯艾利斯城', 'COR': '🇦🇷 科尔多瓦', 'MDZ': '🇦🇷 门多萨',
                    'SCL': '🇨🇱 圣地亚哥', 'LIM': '🇵🇪 利马', 'BOG': '🇨🇴 波哥大', 'MDE': '🇨🇴 麦德林', 'CLO': '🇨🇴 卡利',
                    'UIO': '🇪🇨 基多', 'GYE': '🇪🇨 瓜亚基尔', 'CCS': '🇻🇪 加拉加斯', 'MVD': '🇺🇾 蒙得维的亚', 'ASU': '🇵🇾 亚松森',
                    'PTY': '🇵🇦 巴拿马城', 'SJO': '🇨🇷 圣何塞', 'GUA': '🇬🇹 危地马拉城', 'SAL': '🇸🇻 圣萨尔瓦多', 'TGU': '🇭🇳 特古西加尔巴', 'MGA': '🇳🇮 马那瓜', 'BZE': '🇧🇿 伯利兹城',
                    'MEX': '🇲🇽 墨西哥城', 'GDL': '🇲🇽 瓜达拉哈拉', 'MTY': '🇲🇽 蒙特雷', 'CUN': '🇲🇽 坎昆', 'TIJ': '🇲🇽 蒂华纳', 'SJD': '🇲🇽 圣何塞德尔卡沃',
                    'YYZ': '🇨🇦 多伦多', 'YVR': '🇨🇦 温哥华', 'YUL': '🇨🇦 蒙特利尔', 'YYC': '🇨🇦 卡尔加里', 'YEG': '🇨🇦 埃德蒙顿', 'YOW': '🇨🇦 渥太华', 'YWG': '🇨🇦 温尼伯', 'YHZ': '🇨🇦 哈利法克斯',
                    'HAV': '🇨🇺 哈瓦那', 'SJU': '🇵🇷 圣胡安', 'SDQ': '🇩🇴 圣多明各', 'PAP': '🇭🇹 太子港', 'KIN': '🇯🇲 金斯顿', 'NAS': '🇧🇸 拿骚', 'MBJ': '🇯🇲 蒙特哥贝'
                };

                function getColoName(colo) {
                    if (getPreferredLanguage() !== 'zh') return colo;
                    return coloMap[colo] || colo;
                }

                // City filtering related functions
                const cityFilterContainer = document.getElementById('cityFilterContainer');
                const cityCheckboxesContainer = document.getElementById('cityCheckboxesContainer');

                function updateCityFilter() {
                    if (!cityFilterContainer || !cityCheckboxesContainer) return;

                    // Extract all available cities from test results
                    const cityMap = new Map();
                    testResults.forEach((result, index) => {
                        if (result.success && result.colo) {
                            const colo = result.colo;
                            if (!cityMap.has(colo)) {
                                cityMap.set(colo, {
                                    colo: colo,
                                    name: getColoName(colo),
                                    count: 0
                                });
                            }
                            cityMap.get(colo).count++;
                        }
                    });

                    if (cityMap.size === 0) {
                        cityFilterContainer.style.display = 'none';
                        return;
                    }

                    cityFilterContainer.style.display = 'block';
                    cityCheckboxesContainer.innerHTML = '';

                    // Sort by city name
                    const cities = Array.from(cityMap.values()).sort((a, b) => a.name.localeCompare(b.name));

                    cities.forEach(city => {
                        const label = document.createElement('label');
                        label.style.cssText = 'display: inline-flex; align-items: center; cursor: pointer; color: #00ff00; font-size: 0.85rem; padding: 4px 8px; background: rgba(0, 40, 0, 0.4); border: 1px solid #00aa00; border-radius: 4px;';

                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.value = city.colo;
                        checkbox.checked = true;
                        checkbox.dataset.colo = city.colo;
                        checkbox.style.cssText = 'margin-right: 6px; width: 16px; height: 16px; cursor: pointer;';

                        const span = document.createElement('span');
                        span.textContent = city.name + ' (' + city.count + ')';

                        label.appendChild(checkbox);
                        label.appendChild(span);
                        cityCheckboxesContainer.appendChild(label);

                        checkbox.addEventListener('change', filterResultsByCity);
                    });

                    // Listen for filter mode changes
                    const filterModeRadios = document.querySelectorAll('input[name="cityFilterMode"]');
                    filterModeRadios.forEach(radio => {
                        radio.addEventListener('change', function() {
                            if (this.value === 'all') {
                                // When switching to 'All Cities' mode, automatically check all city checkboxes
                                const cityCheckboxes = cityCheckboxesContainer.querySelectorAll('input[type="checkbox"]');
                                cityCheckboxes.forEach(cb => {
                                    cb.checked = true;
                                    cb.disabled = false;
                                });
                            }
                            filterResultsByCity();
                        });
                    });
                }

                function filterResultsByCity() {
                    if (!resultsList || !cityCheckboxesContainer) return;

                    const filterMode = document.querySelector('input[name="cityFilterMode"]:checked')?.value || 'all';
                    const resultItems = resultsList.querySelectorAll('[data-index]');
                    const cityCheckboxes = cityCheckboxesContainer.querySelectorAll('input[type="checkbox"]');

                    if (filterMode === 'fastest10') {
                        // Select only the fastest 10
                        const sortedResults = testResults
                            .map((result, index) => ({ result, index }))
                            .filter(item => item.result.success)
                            .sort((a, b) => a.result.latency - b.result.latency)
                            .slice(0, 10);

                        const fastestIndices = new Set(sortedResults.map(item => item.index));

                        resultItems.forEach(item => {
                            const index = parseInt(item.dataset.index);
                            const checkbox = item.querySelector('input[type="checkbox"]');
                            if (fastestIndices.has(index)) {
                                item.style.display = 'flex';
                                if (checkbox) checkbox.checked = true;
                            } else {
                                item.style.display = 'none';
                                if (checkbox) checkbox.checked = false;
                            }
                        });

                        // Disable city checkboxes
                        cityCheckboxes.forEach(cb => cb.disabled = true);
                    } else {
                        // Filter by selected cities
                        const selectedCities = new Set();
                        cityCheckboxes.forEach(cb => {
                            if (cb.checked) {
                                selectedCities.add(cb.value);
                            }
                        });

                        // If all cities are selected (or none), show all results
                        const allChecked = cityCheckboxes.length > 0 && selectedCities.size === cityCheckboxes.length;
                        const noneChecked = selectedCities.size === 0;

                        resultItems.forEach(item => {
                            const colo = item.dataset.colo || '';
                            const checkbox = item.querySelector('input[type="checkbox"]');
                            if (allChecked || noneChecked || selectedCities.has(colo)) {
                                item.style.display = 'flex';
                                // Sync update result item checkbox state
                                if (checkbox) {
                                    if (allChecked) {
                                        // When all cities are selected, all result item checkboxes are checked
                                        checkbox.checked = true;
                                    } else if (noneChecked) {
                                        // When no city is selected, all result item checkboxes are unchecked
                                        checkbox.checked = false;
                                    } else {
                                        // Sync checkboxes based on city selection state
                                        checkbox.checked = selectedCities.has(colo);
                                    }
                                }
                            } else {
                                item.style.display = 'none';
                                // Uncheck hidden result item checkboxes
                                if (checkbox) {
                                    checkbox.checked = false;
                                }
                            }
                        });

                        // Enable city checkboxes
                        cityCheckboxes.forEach(cb => cb.disabled = false);
                    }
                }

                async function testLatency(host, port, signal) {
                    const timeout = 8000;
                    let colo = '';
                    let testUrl = '';

                    try {
                        const controller = new AbortController();
                        const timeoutId = setTimeout(() => controller.abort(), timeout);

                        if (signal) {
                            signal.addEventListener('abort', () => controller.abort());
                        }

                        const cleanHost = host.replace(/^\\[|\\]$/g, '');
                        const hexIP = ipToHex(cleanHost);
                        const testDomain = hexIP ? (hexIP + '.nip.lfree.org') : (cleanHost + '.nip.lfree.org');
                        testUrl = 'https://' + testDomain + ':' + port + '/';

                        console.log('[LatencyTest] Testing:', testUrl, 'Original:', host + ':' + port, 'HexIP:', hexIP);

                        const firstStart = Date.now();
                        const response1 = await fetch(testUrl, {
                            signal: controller.signal
                        });
                        const firstTime = Date.now() - firstStart;

                        if (!response1.ok) {
                            clearTimeout(timeoutId);
                            return { success: false, latency: firstTime, error: 'HTTP ' + response1.status + ' ' + response1.statusText, colo: '', testUrl: testUrl };
                        }

                        try {
                            const text = await response1.text();
                            console.log('[LatencyTest] Response body:', text.substring(0, 200));
                            const data = JSON.parse(text);
                            if (data.colo) {
                                colo = data.colo;
                            }
                        } catch (e) {
                            console.log('[LatencyTest] Parse error:', e.message);
                        }

                        const secondStart = Date.now();
                        const response2 = await fetch(testUrl, {
                            signal: controller.signal
                        });
                        await response2.text();
                        const latency = Date.now() - secondStart;

                        clearTimeout(timeoutId);

                        console.log('[LatencyTest] First:', firstTime + 'ms (DNS+TLS+RTT)', 'Second:', latency + 'ms (RTT only)');

                        return { success: true, latency: latency, colo: colo, testUrl: testUrl };
                    } catch (error) {
                        const errorMsg = error.name === 'AbortError' ? t.timeoutLabel : error.message;
                        console.log('[LatencyTest] Error:', errorMsg, 'URL:', testUrl);
                        return { success: false, latency: -1, error: errorMsg, colo: '', testUrl: testUrl };
                    }
                }
            });
        </script>
    </body>
    </html>`;

        return new Response(pageHtml, {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
    }

    async function parseTrojanHeader(buffer, ut) {

        const passwordToHash = tp || ut;
        const sha224Password = await sha224Hash(passwordToHash);

        if (buffer.byteLength < 56) {
            return {
                hasError: true,
                message: "invalid " + atob('dHJvamFu') + " data - too short"
            };
        }
        let crLfIndex = 56;
        if (new Uint8Array(buffer.slice(56, 57))[0] !== 0x0d || new Uint8Array(buffer.slice(57, 58))[0] !== 0x0a) {
            return {
                hasError: true,
                message: "invalid " + atob('dHJvamFu') + " header format (missing CR LF)"
            };
        }
        const password = new TextDecoder().decode(buffer.slice(0, crLfIndex));
        if (password !== sha224Password) {
            return {
                hasError: true,
                message: "invalid " + atob('dHJvamFu') + " password"
            };
        }

        const socks5DataBuffer = buffer.slice(crLfIndex + 2);
        if (socks5DataBuffer.byteLength < 6) {
            return {
                hasError: true,
                message: atob('aW52YWxpZCBTT0NLUzUgcmVxdWVzdCBkYXRh')
            };
        }

        const view = new DataView(socks5DataBuffer);
        const cmd = view.getUint8(0);
        if (cmd !== 1) {
            return {
                hasError: true,
                message: "unsupported command, only TCP (CONNECT) is allowed"
            };
        }

        const atype = view.getUint8(1);
        let addressLength = 0;
        let addressIndex = 2;
        let address = "";
        switch (atype) {
            case 1:
                addressLength = 4;
                address = new Uint8Array(
                socks5DataBuffer.slice(addressIndex, addressIndex + addressLength)
                ).join(".");
                break;
            case 3:
                addressLength = new Uint8Array(
                socks5DataBuffer.slice(addressIndex, addressIndex + 1)
                )[0];
                addressIndex += 1;
                address = new TextDecoder().decode(
                socks5DataBuffer.slice(addressIndex, addressIndex + addressLength)
                );
                break;
            case 4:
                addressLength = 16;
                const dataView = new DataView(socks5DataBuffer.slice(addressIndex, addressIndex + addressLength));
                const ipv6 = [];
                for (let i = 0; i < 8; i++) {
                    ipv6.push(dataView.getUint16(i * 2).toString(16));
                }
                address = ipv6.join(":");
                break;
            default:
                return {
                    hasError: true,
                    message: `invalid addressType is ${atype}`
                };
        }

        if (!address) {
            return {
                hasError: true,
                message: `address is empty, addressType is ${atype}`
            };
        }

        const portIndex = addressIndex + addressLength;
        const portBuffer = socks5DataBuffer.slice(portIndex, portIndex + 2);
        const portRemote = new DataView(portBuffer).getUint16(0);

        return {
            hasError: false,
            addressRemote: address,
            addressType: atype,
            port: portRemote,
            hostname: address,
            rawClientData: socks5DataBuffer.slice(portIndex + 4)
        };
    }

    async function sha224Hash(text) {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);

        const K = [
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
            0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
            0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
            0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
            0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
            0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
            0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        ];

        let H = [
            0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
            0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
        ];

        const msgLen = data.length;
        const bitLen = msgLen * 8;
        const paddedLen = Math.ceil((msgLen + 9) / 64) * 64;
        const padded = new Uint8Array(paddedLen);
        padded.set(data);
        padded[msgLen] = 0x80;

        const view = new DataView(padded.buffer);
        view.setUint32(paddedLen - 4, bitLen, false);

        for (let chunk = 0; chunk < paddedLen; chunk += 64) {
            const W = new Uint32Array(64);

            for (let i = 0; i < 16; i++) {
                W[i] = view.getUint32(chunk + i * 4, false);
            }

            for (let i = 16; i < 64; i++) {
                const s0 = rightRotate(W[i - 15], 7) ^ rightRotate(W[i - 15], 18) ^ (W[i - 15] >>> 3);
                const s1 = rightRotate(W[i - 2], 17) ^ rightRotate(W[i - 2], 19) ^ (W[i - 2] >>> 10);
                W[i] = (W[i - 16] + s0 + W[i - 7] + s1) >>> 0;
            }

            let [a, b, c, d, e, f, g, h] = H;

            for (let i = 0; i < 64; i++) {
                const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
                const ch = (e & f) ^ (~e & g);
                const temp1 = (h + S1 + ch + K[i] + W[i]) >>> 0;
                const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
                const maj = (a & b) ^ (a & c) ^ (b & c);
                const temp2 = (S0 + maj) >>> 0;

                h = g;
                g = f;
                f = e;
                e = (d + temp1) >>> 0;
                d = c;
                c = b;
                b = a;
                a = (temp1 + temp2) >>> 0;
            }

            H[0] = (H[0] + a) >>> 0;
            H[1] = (H[1] + b) >>> 0;
            H[2] = (H[2] + c) >>> 0;
            H[3] = (H[3] + d) >>> 0;
            H[4] = (H[4] + e) >>> 0;
            H[5] = (H[5] + f) >>> 0;
            H[6] = (H[6] + g) >>> 0;
            H[7] = (H[7] + h) >>> 0;
        }

        const result = [];
        for (let i = 0; i < 7; i++) {
            result.push(
                ((H[i] >>> 24) & 0xff).toString(16).padStart(2, '0'),
                ((H[i] >>> 16) & 0xff).toString(16).padStart(2, '0'),
                ((H[i] >>> 8) & 0xff).toString(16).padStart(2, '0'),
                (H[i] & 0xff).toString(16).padStart(2, '0')
            );
        }

        return result.join('');
    }

    function rightRotate(value, amount) {
        return (value >>> amount) | (value << (32 - amount));
    }

    let ACTIVE_CONNECTIONS = 0;
    const XHTTP_BUFFER_SIZE = 128 * 1024;
    const CONNECT_TIMEOUT_MS = 5000;
    const IDLE_TIMEOUT_MS = 45000;
    const MAX_RETRIES = 2;
    const MAX_CONCURRENT = 32;

    function xhttp_sleep(ms) {
        return new Promise((r) => setTimeout(r, ms));
    }

    function validate_uuid_xhttp(id, uuid) {
        for (let index = 0; index < 16; index++) {
            if (id[index] !== uuid[index]) {
                return false;
            }
        }
        return true;
    }

    class XhttpCounter {
        #total

        constructor() {
            this.#total = 0;
        }

        get() {
            return this.#total;
        }

        add(size) {
            this.#total += size;
        }
    }

    function concat_typed_arrays(first, ...args) {
        let len = first.length;
        for (let a of args) {
            len += a.length;
        }
        const r = new first.constructor(len);
        r.set(first, 0);
        len = first.length;
        for (let a of args) {
            r.set(a, len);
            len += a.length;
        }
        return r;
    }

    function parse_uuid_xhttp(uuid) {
        uuid = uuid.replaceAll('-', '');
        const r = [];
        for (let index = 0; index < 16; index++) {
            const v = parseInt(uuid.substr(index * 2, 2), 16);
            r.push(v);
        }
        return r;
    }

    function get_xhttp_buffer(size) {
        return new Uint8Array(new ArrayBuffer(size || XHTTP_BUFFER_SIZE));
    }

    async function read_xhttp_header(readable, uuid_str) {
        const reader = readable.getReader({ mode: 'byob' });

        try {
            let r = await reader.readAtLeast(1 + 16 + 1, get_xhttp_buffer());
            let rlen = 0;
            let idx = 0;
            let cache = r.value;
            rlen += r.value.length;

            const version = cache[0];
            const id = cache.slice(1, 1 + 16);
            const uuid = parse_uuid_xhttp(uuid_str);
            if (!validate_uuid_xhttp(id, uuid)) {
                return `invalid UUID`;
            }
            const pb_len = cache[1 + 16];
            const addr_plus1 = 1 + 16 + 1 + pb_len + 1 + 2 + 1;

            if (addr_plus1 + 1 > rlen) {
                if (r.done) {
                    return `header too short`;
                }
                idx = addr_plus1 + 1 - rlen;
                r = await reader.readAtLeast(idx, get_xhttp_buffer());
                rlen += r.value.length;
                cache = concat_typed_arrays(cache, r.value);
            }

            const cmd = cache[1 + 16 + 1 + pb_len];
            if (cmd !== 1) {
                return `unsupported command: ${cmd}`;
            }
            const port = (cache[addr_plus1 - 1 - 2] << 8) + cache[addr_plus1 - 1 - 1];
            const atype = cache[addr_plus1 - 1];
            let header_len = -1;
            if (atype === ADDRESS_TYPE_IPV4) {
                header_len = addr_plus1 + 4;
            } else if (atype === ADDRESS_TYPE_IPV6) {
                header_len = addr_plus1 + 16;
            } else if (atype === ADDRESS_TYPE_URL) {
                header_len = addr_plus1 + 1 + cache[addr_plus1];
            }

            if (header_len < 0) {
                return 'read address type failed';
            }

            idx = header_len - rlen;
            if (idx > 0) {
                if (r.done) {
                    return `read address failed`;
                }
                r = await reader.readAtLeast(idx, get_xhttp_buffer());
                rlen += r.value.length;
                cache = concat_typed_arrays(cache, r.value);
            }

            let hostname = '';
            idx = addr_plus1;
            switch (atype) {
                case ADDRESS_TYPE_IPV4:
                    hostname = cache.slice(idx, idx + 4).join('.');
                    break;
                case ADDRESS_TYPE_URL:
                    hostname = new TextDecoder().decode(
                        cache.slice(idx + 1, idx + 1 + cache[idx]),
                    );
                    break;
                case ADDRESS_TYPE_IPV6:
                    hostname = cache
                        .slice(idx, idx + 16)
                        .reduce(
                            (s, b2, i2, a) =>
                                i2 % 2
                                    ? s.concat(((a[i2 - 1] << 8) + b2).toString(16))
                                    : s,
                            [],
                        )
                        .join(':');
                    break;
            }

            if (hostname.length < 1) {
                return 'failed to parse hostname';
            }

            const data = cache.slice(header_len);
            return {
                hostname,
                port,
                data,
                resp: new Uint8Array([version, 0]),
                reader,
                done: r.done,
            };
        } catch (error) {
            try { reader.releaseLock(); } catch (_) {}
            throw error;
        }
    }

    async function upload_to_remote_xhttp(counter, writer, httpx) {
        async function inner_upload(d) {
            if (!d || d.length === 0) {
                return;
            }
            counter.add(d.length);
            try {
                await writer.write(d);
            } catch (error) {
                throw error;
            }
        }

        try {
            await inner_upload(httpx.data);
            let chunkCount = 0;
            while (!httpx.done) {
                const r = await httpx.reader.read(get_xhttp_buffer());
                if (r.done) break;
                await inner_upload(r.value);
                httpx.done = r.done;
                chunkCount++;
                if (chunkCount % 10 === 0) {
                    await xhttp_sleep(0);
                }
                if (!r.value || r.value.length === 0) {
                    await xhttp_sleep(2);
                }
            }
        } catch (error) {
            throw error;
        }
    }

    function create_xhttp_uploader(httpx, writable) {
        const counter = new XhttpCounter();
        const writer = writable.getWriter();

        const done = (async () => {
            try {
                await upload_to_remote_xhttp(counter, writer, httpx);
            } catch (error) {
                throw error;
            } finally {
                try {
                    await writer.close();
                } catch (error) {

                }
            }
        })();

        return {
            counter,
            done,
            abort: () => {
                try { writer.abort(); } catch (_) {}
            }
        };
    }

    function create_xhttp_downloader(resp, remote_readable) {
        const counter = new XhttpCounter();
        let stream;

        const done = new Promise((resolve, reject) => {
            stream = new TransformStream(
                {
                    start(controller) {
                        counter.add(resp.length);
                        controller.enqueue(resp);
                    },
                    transform(chunk, controller) {
                        counter.add(chunk.length);
                        controller.enqueue(chunk);
                    },
                    cancel(reason) {
                        reject(`download cancelled: ${reason}`);
                    },
                },
                null,
                new ByteLengthQueuingStrategy({ highWaterMark: XHTTP_BUFFER_SIZE }),
            );

            let lastActivity = Date.now();
            const idleTimer = setInterval(() => {
                if (Date.now() - lastActivity > IDLE_TIMEOUT_MS) {
                    try {
                        stream.writable.abort?.('idle timeout');
                    } catch (_) {}
                    clearInterval(idleTimer);
                    reject('idle timeout');
                }
            }, 5000);

            const reader = remote_readable.getReader();
            const writer = stream.writable.getWriter();

            ;(async () => {
                try {
                    let chunkCount = 0;
                    while (true) {
                        const r = await reader.read();
                        if (r.done) {
                            break;
                        }
                        lastActivity = Date.now();
                        await writer.write(r.value);
                        chunkCount++;
                        if (chunkCount % 5 === 0) {
                            await xhttp_sleep(0);
                        }
                    }
                    await writer.close();
                    resolve();
                } catch (err) {
                    reject(err);
                } finally {
                    try {
                        reader.releaseLock();
                    } catch (_) {}
                    try {
                        writer.releaseLock();
                    } catch (_) {}
                    clearInterval(idleTimer);
                }
            })();
        });

        return {
            readable: stream.readable,
            counter,
            done,
            abort: () => {
                try { stream.readable.cancel(); } catch (_) {}
                try { stream.writable.abort(); } catch (_) {}
            }
        };
    }

    async function connect_to_remote_xhttp(httpx, ...remotes) {
        let attempt = 0;
        let lastErr;

        const connectionList = [httpx.hostname, ...remotes.filter(r => r && r !== httpx.hostname)];

        for (const hostname of connectionList) {
            if (!hostname) continue;

            attempt = 0;
            while (attempt < MAX_RETRIES) {
                attempt++;
                try {
                    const remote = connect({ hostname, port: httpx.port });
                    const timeoutPromise = xhttp_sleep(CONNECT_TIMEOUT_MS).then(() => {
                        throw new Error(atob('Y29ubmVjdCB0aW1lb3V0'));
                    });

                    await Promise.race([remote.opened, timeoutPromise]);

                    const uploader = create_xhttp_uploader(httpx, remote.writable);
                    const downloader = create_xhttp_downloader(httpx.resp, remote.readable);

                    return {
                        downloader,
                        uploader,
                        close: () => {
                            try { remote.close(); } catch (_) {}
                        }
                    };
                } catch (err) {
                    lastErr = err;
                    if (attempt < MAX_RETRIES) {
                        await xhttp_sleep(500 * attempt);
                    }
                }
            }
        }

        return null;
    }

    async function handle_xhttp_client(body, uuid) {
        if (ACTIVE_CONNECTIONS >= MAX_CONCURRENT) {
            return new Response('Too many connections', { status: 429 });
        }

        ACTIVE_CONNECTIONS++;

        let cleaned = false;
        const cleanup = () => {
            if (!cleaned) {
                ACTIVE_CONNECTIONS = Math.max(0, ACTIVE_CONNECTIONS - 1);
                cleaned = true;
            }
        };

        try {
            const httpx = await read_xhttp_header(body, uuid);
            if (typeof httpx !== 'object' || !httpx) {
                return null;
            }

            const remoteConnection = await connect_to_remote_xhttp(httpx, fallbackAddress, '13.230.34.30');
            if (remoteConnection === null) {
                return null;
            }

            const connectionClosed = Promise.race([
                (async () => {
                    try {
                        await remoteConnection.downloader.done;
                    } catch (err) {

                    }
                })(),
                (async () => {
                    try {
                        await remoteConnection.uploader.done;
                    } catch (err) {

                    }
                })(),
                xhttp_sleep(IDLE_TIMEOUT_MS).then(() => {

                })
            ]).finally(() => {
                try { remoteConnection.close(); } catch (_) {}
                try { remoteConnection.downloader.abort(); } catch (_) {}
                try { remoteConnection.uploader.abort(); } catch (_) {}

                cleanup();
            });

            return {
                readable: remoteConnection.downloader.readable,
                closed: connectionClosed
            };
        } catch (error) {
            cleanup();
            return null;
        }
    }

    async function handleXhttpPost(request) {
        try {
            return await handle_xhttp_client(request.body, at);
        } catch (err) {
            return null;
        }
    }

    function base64ToArray(b64Str) {
        if (!b64Str) return { error: null };
        try { b64Str = b64Str.replace(/-/g, '+').replace(/_/g, '/'); return { earlyData: Uint8Array.from(atob(b64Str), (c) => c.charCodeAt(0)).buffer, error: null }; }
        catch (error) { return { error }; }
    }

    function closeSocketQuietly(socket) { try { if (socket.readyState === 1 || socket.readyState === 2) socket.close(); } catch (error) {} }

    const hexTable = Array.from({ length: 256 }, (v, i) => (i + 256).toString(16).slice(1));
    function formatIdentifier(arr, offset = 0) {
        const id = (hexTable[arr[offset]]+hexTable[arr[offset+1]]+hexTable[arr[offset+2]]+hexTable[arr[offset+3]]+"-"+hexTable[arr[offset+4]]+hexTable[arr[offset+5]]+"-"+hexTable[arr[offset+6]]+hexTable[arr[offset+7]]+"-"+hexTable[arr[offset+8]]+hexTable[arr[offset+9]]+"-"+hexTable[arr[offset+10]]+hexTable[arr[offset+11]]+hexTable[arr[offset+12]]+hexTable[arr[offset+13]]+hexTable[arr[offset+14]]+hexTable[arr[offset+15]]).toLowerCase();
        if (!isValidFormat(id)) throw new TypeError(E_INVALID_ID_STR);
        return id;
    }

    async function fetchAndParseNewIPs() {
        const url = piu || "https://raw.githubusercontent.com/qwer-search/bestip/refs/heads/main/kejilandbestip.txt";
        try {
            const urls = url.includes(',') ? url.split(',').map(u => u.trim()).filter(u => u) : [url];
            const apiResults = await fetchPreferredAPI(urls, '443', 5000);

            if (apiResults.length > 0) {
                const results = [];
                const regex = /^(\[[\da-fA-F:]+\]|[\d.]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*)(?::(\d+))?(?:#(.+))?$/;

                for (const item of apiResults) {
                    const match = item.match(regex);
                    if (match) {
                        results.push({
                            ip: match[1],
                            port: parseInt(match[2] || '443', 10),
                            name: match[3]?.trim() || match[1]
                        });
                    }
                }
                return results;
            }

            const response = await fetch(url);
            if (!response.ok) return [];
            const text = await response.text();
            const results = [];
            const lines = text.trim().replace(/\r/g, "").split('\n');
            const simpleRegex = /^([^:]+):(\d+)#(.*)$/;

            for (const line of lines) {
                const trimmedLine = line.trim();
                if (!trimmedLine) continue;
                const match = trimmedLine.match(simpleRegex);
                if (match) {
                    results.push({
                        ip: match[1],
                        port: parseInt(match[2], 10),
                        name: match[3].trim() || match[1]
                    });
                }
            }
            return results;
        } catch (error) {
            return [];
        }
    }

    function generateLinksFromNewIPs(list, user, workerDomain, echConfig = null) {

        const CF_HTTP_PORTS = [80, 8080, 8880, 2052, 2082, 2086, 2095];
        const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];

        const links = [];
        const wsPath = '/?ed=2048';
        const proto = atob('dmxlc3M=');

        list.forEach(item => {
            const nodeName = item.name.replace(/\s/g, '_');
            const port = item.port;

            if (CF_HTTPS_PORTS.includes(port)) {

                const wsNodeName = `${nodeName}-${port}-WS-TLS`;
                let link = `${proto}://${user}@${item.ip}:${port}?encryption=none&security=tls&sni=${workerDomain}&fp=${enableECH ? 'chrome' : 'randomized'}&type=ws&host=${workerDomain}&path=${wsPath}`;

                // If ECH is enabled, add ech parameter (ECH requires masquerading as Chrome browser)
                if (enableECH) {
                    const dnsServer = customDNS || 'https://dns.joeyblog.eu.org/joeyblog';
                    const echDomain = customECHDomain || 'cloudflare-ech.com';
                    link += `&alpn=h3%2Ch2%2Chttp%2F1.1&ech=${encodeURIComponent(`${echDomain}+${dnsServer}`)}`;
                }

                link += `#${encodeURIComponent(wsNodeName)}`;
                links.push(link);
            } else if (CF_HTTP_PORTS.includes(port)) {

                if (!disableNonTLS) {
                    const wsNodeName = `${nodeName}-${port}-WS`;
                    const link = `${proto}://${user}@${item.ip}:${port}?encryption=none&security=none&type=ws&host=${workerDomain}&path=${wsPath}#${encodeURIComponent(wsNodeName)}`;
                    links.push(link);
                }
            } else {

                const wsNodeName = `${nodeName}-${port}-WS-TLS`;
                let link = `${proto}://${user}@${item.ip}:${port}?encryption=none&security=tls&sni=${workerDomain}&fp=${enableECH ? 'chrome' : 'randomized'}&type=ws&host=${workerDomain}&path=${wsPath}`;

                // If ECH is enabled, add ech parameter (ECH requires masquerading as Chrome browser)
                if (enableECH) {
                    const dnsServer = customDNS || 'https://dns.joeyblog.eu.org/joeyblog';
                    const echDomain = customECHDomain || 'cloudflare-ech.com';
                    link += `&alpn=h3%2Ch2%2Chttp%2F1.1&ech=${encodeURIComponent(`${echDomain}+${dnsServer}`)}`;
                }

                link += `#${encodeURIComponent(wsNodeName)}`;
                links.push(link);
            }
        });
        return links;
    }

    function generateXhttpLinksFromSource(list, user, workerDomain, echConfig = null) {
        const links = [];
        const nodePath = user.substring(0, 8);

        list.forEach(item => {
            let nodeNameBase = item.isp.replace(/\s/g, '_');
            if (item.colo && item.colo.trim()) {
                nodeNameBase = `${nodeNameBase}-${item.colo.trim()}`;
            }
            const safeIP = item.ip.includes(':') ? `[${item.ip}]` : item.ip;
            const port = item.port || 443;

            const wsNodeName = `${nodeNameBase}-${port}-xhttp`;
            const params = new URLSearchParams({
                encryption: 'none',
                security: 'tls',
                sni: workerDomain,
                fp: 'chrome',
                type: 'xhttp',
                host: workerDomain,
                path: `/${nodePath}`,
                mode: 'stream-one'
            });

            // If ECH is enabled, add ech parameter (ECH requires masquerading as Chrome browser)
            if (enableECH) {
                const dnsServer = customDNS || 'https://dns.joeyblog.eu.org/joeyblog';
                const echDomain = customECHDomain || 'cloudflare-ech.com';
                params.set('alpn', 'h3,h2,http/1.1');
                params.set('ech', `${echDomain}+${dnsServer}`);
            }

            links.push(`vless://${user}@${safeIP}:${port}?${params.toString()}#${encodeURIComponent(wsNodeName)}`);
        });

        return links;
    }

    async function generateTrojanLinksFromNewIPs(list, user, workerDomain, echConfig = null) {

        const CF_HTTP_PORTS = [80, 8080, 8880, 2052, 2082, 2086, 2095];
        const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];

        const links = [];
        const wsPath = '/?ed=2048';

        const password = tp || user;

        list.forEach(item => {
            const nodeName = item.name.replace(/\s/g, '_');
            const port = item.port;

            if (CF_HTTPS_PORTS.includes(port)) {

                const wsNodeName = `${nodeName}-${port}-${atob('VHJvamFu')}-WS-TLS`;
                let link = `${atob('dHJvamFuOi8v')}${password}@${item.ip}:${port}?security=tls&sni=${workerDomain}&fp=chrome&type=ws&host=${workerDomain}&path=${wsPath}`;

                // If ECH is enabled, add ech parameter (ECH requires masquerading as Chrome browser)
                if (enableECH) {
                    const dnsServer = customDNS || 'https://dns.joeyblog.eu.org/joeyblog';
                    const echDomain = customECHDomain || 'cloudflare-ech.com';
                    link += `&alpn=h3%2Ch2%2Chttp%2F1.1&ech=${encodeURIComponent(`${echDomain}+${dnsServer}`)}`;
                }

                link += `#${encodeURIComponent(wsNodeName)}`;
                links.push(link);
            } else if (CF_HTTP_PORTS.includes(port)) {

                if (!disableNonTLS) {
                    const wsNodeName = `${nodeName}-${port}-${atob('VHJvamFu')}-WS`;
                    const link = `${atob('dHJvamFuOi8v')}${password}@${item.ip}:${port}?security=none&type=ws&host=${workerDomain}&path=${wsPath}#${encodeURIComponent(wsNodeName)}`;
                    links.push(link);
                }
            } else {

                const wsNodeName = `${nodeName}-${port}-${atob('VHJvamFu')}-WS-TLS`;
                let link = `${atob('dHJvamFuOi8v')}${password}@${item.ip}:${port}?security=tls&sni=${workerDomain}&fp=chrome&type=ws&host=${workerDomain}&path=${wsPath}`;

                // If ECH is enabled, add ech parameter (ECH requires masquerading as Chrome browser)
                if (enableECH) {
                    const dnsServer = customDNS || 'https://dns.joeyblog.eu.org/joeyblog';
                    const echDomain = customECHDomain || 'cloudflare-ech.com';
                    link += `&alpn=h3%2Ch2%2Chttp%2F1.1&ech=${encodeURIComponent(`${echDomain}+${dnsServer}`)}`;
                }

                link += `#${encodeURIComponent(wsNodeName)}`;
                links.push(link);
            }
        });
        return links;
    }

    async function handleConfigAPI(request) {
        if (request.method === 'GET') {

            if (!kvStore) {
                return new Response(JSON.stringify({
                    error: 'KV Storage Not Configured',
                    kvEnabled: false
                }), {
                    status: 503,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            return new Response(JSON.stringify({
                ...kvConfig,
                kvEnabled: true
            }), {
                headers: { 'Content-Type': 'application/json' }
            });
        } else if (request.method === 'POST') {

            if (!kvStore) {
                return new Response(JSON.stringify({
                    success: false,
                    message: 'KV存储未配置，无法保存配置'
                }), {
                    status: 503,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            try {
                const newConfig = await request.json();

                for (const [key, value] of Object.entries(newConfig)) {
                    if (value === '' || value === null || value === undefined) {
                        delete kvConfig[key];
                    } else {
                        kvConfig[key] = value;
                    }
                }

                await saveKVConfig();

                updateConfigVariables();

                if (newConfig.yx !== undefined) {
                    updateCustomPreferredFromYx();
                }

                const newPreferredIPsURL = getConfigValue('yxURL', '') || 'https://raw.githubusercontent.com/qwer-search/bestip/refs/heads/main/kejilandbestip.txt';
                const defaultURL = 'https://raw.githubusercontent.com/qwer-search/bestip/refs/heads/main/kejilandbestip.txt';
                if (newPreferredIPsURL !== defaultURL) {
                    directDomains.length = 0;
                    customPreferredIPs = [];
                    customPreferredDomains = [];
                } else {
                    backupIPs = [
                        { domain: 'ProxyIP.US.CMLiussss.net', region: 'US', regionCode: 'US', port: 443 },
                        { domain: 'ProxyIP.SG.CMLiussss.net', region: 'SG', regionCode: 'SG', port: 443 },
                        { domain: 'ProxyIP.JP.CMLiussss.net', region: 'JP', regionCode: 'JP', port: 443 },
                        { domain: 'ProxyIP.KR.CMLiussss.net', region: 'KR', regionCode: 'KR', port: 443 },
                        { domain: 'ProxyIP.DE.CMLiussss.net', region: 'DE', regionCode: 'DE', port: 443 },
                        { domain: 'ProxyIP.SE.CMLiussss.net', region: 'SE', regionCode: 'SE', port: 443 },
                        { domain: 'ProxyIP.NL.CMLiussss.net', region: 'NL', regionCode: 'NL', port: 443 },
                        { domain: 'ProxyIP.FI.CMLiussss.net', region: 'FI', regionCode: 'FI', port: 443 },
                        { domain: 'ProxyIP.GB.CMLiussss.net', region: 'GB', regionCode: 'GB', port: 443 },
                        { domain: 'ProxyIP.IN.CMLiussss.net', region: 'IN', regionCode: 'IN', port: 443 },
                        { domain: 'ProxyIP.BR.CMLiussss.net', region: 'BR', regionCode: 'BR', port: 443 },
                        { domain: 'ProxyIP.PL.CMLiussss.net', region: 'PL', regionCode: 'PL', port: 443 },
                        { domain: 'ProxyIP.RU.CMLiussss.net', region: 'RU', regionCode: 'RU', port: 443 },
                        { domain: 'ProxyIP.LV.CMLiussss.net', region: 'LV', regionCode: 'LV', port: 443 },
                        { domain: 'ProxyIP.IR.CMLiussss.net', region: 'IR', regionCode: 'IR', port: 443 },
                        { domain: 'ProxyIP.Oracle.cmliussss.net', region: 'Oracle', regionCode: 'Oracle', port: 443 },
                        { domain: 'ProxyIP.DigitalOcean.CMLiussss.net', region: 'DigitalOcean', regionCode: 'DigitalOcean', port: 443 },
                        { domain: 'ProxyIP.Vultr.CMLiussss.net', region: 'Vultr', regionCode: 'Vultr', port: 443 },
                        { domain: 'ProxyIP.Multacom.CMLiussss.net', region: 'Multacom', regionCode: 'Multacom', port: 443 }
                    ];
                    directDomains.length = 0;
                    directDomains.push(
                        { name: "cloudflare.182682.xyz", domain: "cloudflare.182682.xyz" },
                        { name: "speed.marisalnc.com", domain: "speed.marisalnc.com" },
                        { domain: "freeyx.cloudflare88.eu.org" },
                        { domain: "bestcf.top" },
                        { domain: "cdn.2020111.xyz" },
                        { domain: "cfip.cfcdn.vip" },
                        { domain: "cf.0sm.com" },
                        { domain: "cf.090227.xyz" },
                        { domain: "cf.zhetengsha.eu.org" },
                        { domain: "cloudflare.9jy.cc" },
                        { domain: "cf.zerone-cdn.pp.ua" },
                        { domain: "cfip.1323123.xyz" },
                        { domain: "cnamefuckxxs.yuchen.icu" },
                        { domain: "cloudflare-ip.mofashi.ltd" },
                        { domain: "115155.xyz" },
                        { domain: "cname.xirancdn.us" },
                        { domain: "f3058171cad.002404.xyz" },
                        { domain: "8.889288.xyz" },
                        { domain: "cdn.tzpro.xyz" },
                        { domain: "cf.877771.xyz" },
                        { domain: "xn--b6gac.eu.org" }
                    );
                }

                return new Response(JSON.stringify({
                    success: true,
                    message: '配置已保存',
                    config: kvConfig
                }), {
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (error) {

                return new Response(JSON.stringify({
                    success: false,
                    message: '保存配置失败: ' + error.message
                }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }

        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    async function handlePreferredIPsAPI(request) {

        if (!kvStore) {
            return new Response(JSON.stringify({
                success: false,
                error: 'KV Storage Not Configured',
                message: 'Requires KV storage configuration'
            }), {
                status: 503,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const ae = getConfigValue('ae', '') === 'yes';
        if (!ae) {
            return new Response(JSON.stringify({
                success: false,
                error: 'API Disabled',
                message: 'API disabled for security. Enable "Allow API Management" in settings.'
            }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        try {
            if (request.method === 'GET') {

                const yxValue = getConfigValue('yx', '');
                const pi = parseYxToArray(yxValue);

                return new Response(JSON.stringify({
                    success: true,
                    count: pi.length,
                    data: pi
                }), {
                    headers: { 'Content-Type': 'application/json' }
                });

            } else if (request.method === 'POST') {

                const body = await request.json();

                const ipsToAdd = Array.isArray(body) ? body : [body];

                if (ipsToAdd.length === 0) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: 'Request Body Empty',
                        message: 'Please provide IP data'
                    }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                const yxValue = getConfigValue('yx', '');
                let pi = parseYxToArray(yxValue);

                const addedIPs = [];
                const skippedIPs = [];
                const errors = [];

                for (const item of ipsToAdd) {

                    if (!item.ip) {
                        errors.push({ ip: 'Unknown', reason: 'IP address is required' });
                        continue;
                    }

                    const port = item.port || 443;
                    const name = item.name || `API优选-${item.ip}:${port}`;

                    if (!isValidIP(item.ip) && !isValidDomain(item.ip)) {
                        errors.push({ ip: item.ip, reason: 'Invalid IP or domain format' });
                        continue;
                    }

                    const exists = pi.some(existItem =>
                        existItem.ip === item.ip && existItem.port === port
                    );

                    if (exists) {
                        skippedIPs.push({ ip: item.ip, port: port, reason: 'Already exists' });
                        continue;
                    }

                    const newIP = {
                        ip: item.ip,
                        port: port,
                        name: name,
                        addedAt: new Date().toISOString()
                    };

                    pi.push(newIP);
                    addedIPs.push(newIP);
                }

                if (addedIPs.length > 0) {
                    const newYxValue = arrayToYx(pi);
                    await setConfigValue('yx', newYxValue);
                    updateCustomPreferredFromYx();
                }

                return new Response(JSON.stringify({
                    success: addedIPs.length > 0,
                    message: `Successfully added ${addedIPs.length} IPs`,
                    added: addedIPs.length,
                    skipped: skippedIPs.length,
                    errors: errors.length,
                    data: {
                        addedIPs: addedIPs,
                        skippedIPs: skippedIPs.length > 0 ? skippedIPs : undefined,
                        errors: errors.length > 0 ? errors : undefined
                    }
                }), {
                    headers: { 'Content-Type': 'application/json' }
                });

            } else if (request.method === 'DELETE') {

                const body = await request.json();

                if (body.all === true) {

                    const yxValue = getConfigValue('yx', '');
                    const pi = parseYxToArray(yxValue);
                    const deletedCount = pi.length;

                    await setConfigValue('yx', '');
                    updateCustomPreferredFromYx();

                    return new Response(JSON.stringify({
                        success: true,
                        message: `All preferred IPs cleared, deleted ${deletedCount}`,
                        deletedCount: deletedCount
                    }), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                if (!body.ip) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: 'IP address is required',
                        message: 'Provide ip field to delete, or use {"all": true} to clear all'
                    }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                const port = body.port || 443;

                const yxValue = getConfigValue('yx', '');
                let pi = parseYxToArray(yxValue);
                const initialLength = pi.length;

                const filteredIPs = pi.filter(item =>
                    !(item.ip === body.ip && item.port === port)
                );

                if (filteredIPs.length === initialLength) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: 'Preferred IP Not Found',
                        message: `${body.ip}:${port} not found`
                    }), {
                        status: 404,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                const newYxValue = arrayToYx(filteredIPs);
                await setConfigValue('yx', newYxValue);
                updateCustomPreferredFromYx();

                return new Response(JSON.stringify({
                    success: true,
                    message: 'Preferred IP Deleted',
                    deleted: { ip: body.ip, port: port }
                }), {
                    headers: { 'Content-Type': 'application/json' }
                });

            } else {
                return new Response(JSON.stringify({
                    success: false,
                    error: 'Method Not Allowed',
                    message: 'Supported methods: GET, POST, DELETE'
                }), {
                    status: 405,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        } catch (error) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Processing Failed',
                message: error.message
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    function updateConfigVariables() {
        const manualRegion = getConfigValue('wk', '');
        if (manualRegion && manualRegion.trim()) {
            manualWorkerRegion = manualRegion.trim().toUpperCase();
            currentWorkerRegion = manualWorkerRegion;
        } else {
            const ci = getConfigValue('p', '');
            if (ci && ci.trim()) {
                currentWorkerRegion = 'CUSTOM';
            } else {
                manualWorkerRegion = '';
            }
        }

        const regionMatchingControl = getConfigValue('rm', '');
        if (regionMatchingControl && regionMatchingControl.toLowerCase() === 'no') {
            enableRegionMatching = false;
        } else {
            enableRegionMatching = true;
        }

        const vlessControl = getConfigValue('ev', '');
        if (vlessControl !== undefined && vlessControl !== '') {
            ev = vlessControl === 'yes' || vlessControl === true || vlessControl === 'true';
        }

        const tjControl = getConfigValue('et', '');
        if (tjControl !== undefined && tjControl !== '') {
            et = tjControl === 'yes' || tjControl === true || tjControl === 'true';
        }

        tp = getConfigValue('tp', '') || '';

        const xhttpControl = getConfigValue('ex', '');
        if (xhttpControl !== undefined && xhttpControl !== '') {
            ex = xhttpControl === 'yes' || xhttpControl === true || xhttpControl === 'true';
        }

        const vmessControl = getConfigValue('evm', '');
        if (vmessControl !== undefined && vmessControl !== '') {
            evm = vmessControl === 'yes' || vmessControl === true || vmessControl === 'true';
        }

        const ssControl = getConfigValue('ess', '');
        if (ssControl !== undefined && ssControl !== '') {
            ess = ssControl === 'yes' || ssControl === true || ssControl === 'true';
        }

        const tuicControl = getConfigValue('etu', '');
        if (tuicControl !== undefined && tuicControl !== '') {
            etu = tuicControl === 'yes' || tuicControl === true || tuicControl === 'true';
        }

        const hyControl = getConfigValue('ehy', '');
        if (hyControl !== undefined && hyControl !== '') {
            ehy = hyControl === 'yes' || hyControl === true || hyControl === 'true';
        }

        const grpcControl = getConfigValue('eg', '');
        if (grpcControl !== undefined && grpcControl !== '') {
            eg = grpcControl === 'yes' || grpcControl === true || grpcControl === 'true';
        }

        if (!ev && !et && !ex && !evm && !ess && !etu && !ehy && !eg) {
            ev = true;
        }

        scu = getConfigValue('scu', '') || 'https://url.v1.mk/sub';

        const preferredDomainsControl = getConfigValue('epd', 'no');
        if (preferredDomainsControl !== undefined && preferredDomainsControl !== '') {
            epd = preferredDomainsControl !== 'no' && preferredDomainsControl !== false && preferredDomainsControl !== 'false';
        }

        const preferredIPsControl = getConfigValue('epi', '');
        if (preferredIPsControl !== undefined && preferredIPsControl !== '') {
            epi = preferredIPsControl !== 'no' && preferredIPsControl !== false && preferredIPsControl !== 'false';
        }

        const githubIPsControl = getConfigValue('egi', '');
        if (githubIPsControl !== undefined && githubIPsControl !== '') {
            egi = githubIPsControl !== 'no' && githubIPsControl !== false && githubIPsControl !== 'false';
        }

        const echControl = getConfigValue('ech', '');
        if (echControl !== undefined && echControl !== '') {
            enableECH = echControl === 'yes' || echControl === true || echControl === 'true';
        }

        // Update custom DNS and ECH domain
        const customDNSValue = getConfigValue('customDNS', '');
        if (customDNSValue && customDNSValue.trim()) {
            customDNS = customDNSValue.trim();
        } else {
            customDNS = 'https://dns.joeyblog.eu.org/joeyblog';
        }

        const customECHDomainValue = getConfigValue('customECHDomain', '');
        if (customECHDomainValue && customECHDomainValue.trim()) {
            customECHDomain = customECHDomainValue.trim();
        } else {
            customECHDomain = 'cloudflare-ech.com';
        }

        // If ECH is enabled, automatically enable TLS-only mode (avoid port 80 interference)
        // ECH requires TLS to work, so non-TLS nodes must be disabled
        if (enableECH) {
            disableNonTLS = true;
        }

        // Check dkby config (if manually set dkby=yes, also enable TLS-only)
        const dkbyControl = getConfigValue('dkby', '');
        if (dkbyControl && dkbyControl.toLowerCase() === 'yes') {
            disableNonTLS = true;
        }

        cp = getConfigValue('d', '') || '';

        piu = getConfigValue('yxURL', '') || 'https://raw.githubusercontent.com/qwer-search/bestip/refs/heads/main/kejilandbestip.txt';

        const envFallback = getConfigValue('p', '');
        if (envFallback) {
            fallbackAddress = envFallback.trim();
        } else {
            fallbackAddress = '';
        }

        socks5Config = getConfigValue('s', '') || '';
        if (socks5Config) {
            try {
                parsedSocks5Config = parseSocksConfig(socks5Config);
                isSocksEnabled = true;
            } catch (err) {
                isSocksEnabled = false;
            }
        } else {
            isSocksEnabled = false;
        }

        const yxbyControl = getConfigValue('yxby', '');
        if (yxbyControl && yxbyControl.toLowerCase() === 'yes') {
            disablePreferred = true;
        } else {
            disablePreferred = false;
        }

        const defaultURL = 'https://raw.githubusercontent.com/qwer-search/bestip/refs/heads/main/kejilandbestip.txt';
        if (piu !== defaultURL) {
            directDomains.length = 0;
            customPreferredIPs = [];
            customPreferredDomains = [];
        }
    }

    function updateCustomPreferredFromYx() {
        const yxValue = getConfigValue('yx', '');
        if (yxValue) {
            try {
                const preferredList = yxValue.split(',').map(item => item.trim()).filter(item => item);
                customPreferredIPs = [];
                customPreferredDomains = [];

                preferredList.forEach(item => {
                    let nodeName = '';
                    let addressPart = item;

                    if (item.includes('#')) {
                        const parts = item.split('#');
                        addressPart = parts[0].trim();
                        nodeName = parts[1].trim();
                    }

                    const { address, port } = parseAddressAndPort(addressPart);

                    if (!nodeName) {
                        nodeName = 'CustomPreferred-' + address + (port ? ':' + port : '');
                    }

                    if (isValidIP(address)) {
                        customPreferredIPs.push({
                            ip: address,
                            port: port,
                            isp: nodeName
                        });
                    } else {
                        customPreferredDomains.push({
                            domain: address,
                            port: port,
                            name: nodeName
                        });
                    }
                });
            } catch (err) {
                customPreferredIPs = [];
                customPreferredDomains = [];
            }
        } else {
            customPreferredIPs = [];
            customPreferredDomains = [];
        }
    }

    function parseYxToArray(yxValue) {
        if (!yxValue || !yxValue.trim()) return [];

        const items = yxValue.split(',').map(item => item.trim()).filter(item => item);
        const result = [];

        for (const item of items) {

            let nodeName = '';
            let addressPart = item;

            if (item.includes('#')) {
                const parts = item.split('#');
                addressPart = parts[0].trim();
                nodeName = parts[1].trim();
            }

            const { address, port } = parseAddressAndPort(addressPart);

            if (!nodeName) {
                nodeName = address + (port ? ':' + port : '');
            }

            result.push({
                ip: address,
                port: port || 443,
                name: nodeName,
                addedAt: new Date().toISOString()
            });
        }

        return result;
    }

    function arrayToYx(array) {
        if (!array || array.length === 0) return '';

        return array.map(item => {
            const port = item.port || 443;
            return `${item.ip}:${port}#${item.name}`;
        }).join(',');
    }

    function isValidDomain(domain) {
        const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
        return domainRegex.test(domain);
    }

    async function parseTextToArray(content) {
        var processed = content.replace(/[	"'\r\n]+/g, ',').replace(/,+/g, ',');
        if (processed.charAt(0) == ',') processed = processed.slice(1);
        if (processed.charAt(processed.length - 1) == ',') processed = processed.slice(0, processed.length - 1);
        return processed.split(',');
    }

    async function fetchPreferredAPI(urls, defaultPort = '443', timeout = 3000) {
        if (!urls?.length) return [];
        const results = new Set();
        await Promise.allSettled(urls.map(async (url) => {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeout);
                const response = await fetch(url, { signal: controller.signal });
                clearTimeout(timeoutId);
                let text = '';
                try {
                    const buffer = await response.arrayBuffer();
                    const contentType = (response.headers.get('content-type') || '').toLowerCase();
                    const charset = contentType.match(/charset=([^\s;]+)/i)?.[1]?.toLowerCase() || '';

                    let decoders = ['utf-8', 'gb2312'];
                    if (charset.includes('gb') || charset.includes('gbk') || charset.includes('gb2312')) {
                        decoders = ['gb2312', 'utf-8'];
                    }

                    let decodeSuccess = false;
                    for (const decoder of decoders) {
                        try {
                            const decoded = new TextDecoder(decoder).decode(buffer);
                            if (decoded && decoded.length > 0 && !decoded.includes('\ufffd')) {
                                text = decoded;
                                decodeSuccess = true;
                                break;
                            } else if (decoded && decoded.length > 0) {
                                continue;
                            }
                        } catch (e) {
                            continue;
                        }
                    }

                    if (!decodeSuccess) {
                        text = await response.text();
                    }

                    if (!text || text.trim().length === 0) {
                        return;
                    }
                } catch (e) {
                    return;
                }
                const lines = text.trim().split('\n').map(l => l.trim()).filter(l => l);
                const isCSV = lines.length > 1 && lines[0].includes(',');
                const IPV6_PATTERN = /^[^\[\]]*:[^\[\]]*:[^\[\]]/;
                if (!isCSV) {
                    lines.forEach(line => {
                        const hashIndex = line.indexOf('#');
                        const [hostPart, remark] = hashIndex > -1 ? [line.substring(0, hashIndex), line.substring(hashIndex)] : [line, ''];
                        let hasPort = false;
                        if (hostPart.startsWith('[')) {
                            hasPort = /\]:(\d+)$/.test(hostPart);
                        } else {
                            const colonIndex = hostPart.lastIndexOf(':');
                            hasPort = colonIndex > -1 && /^\d+$/.test(hostPart.substring(colonIndex + 1));
                        }
                        const port = new URL(url).searchParams.get('port') || defaultPort;
                        results.add(hasPort ? line : `${hostPart}:${port}${remark}`);
                    });
                } else {
                    const headers = lines[0].split(',').map(h => h.trim());
                    const dataLines = lines.slice(1);
                    if (headers.includes('IP地址') && headers.includes('端口') && headers.includes('数据中心')) {
                        const ipIdx = headers.indexOf('IP地址'), portIdx = headers.indexOf('端口');
                        const remarkIdx = headers.indexOf('国家') > -1 ? headers.indexOf('国家') :
                            headers.indexOf('城市') > -1 ? headers.indexOf('城市') : headers.indexOf('数据中心');
                        const tlsIdx = headers.indexOf('TLS');
                        dataLines.forEach(line => {
                            const cols = line.split(',').map(c => c.trim());
                            if (tlsIdx !== -1 && cols[tlsIdx]?.toLowerCase() !== 'true') return;
                            const wrappedIP = IPV6_PATTERN.test(cols[ipIdx]) ? `[${cols[ipIdx]}]` : cols[ipIdx];
                            results.add(`${wrappedIP}:${cols[portIdx]}#${cols[remarkIdx]}`);
                        });
                    } else if (headers.some(h => h.includes('IP')) && headers.some(h => h.includes('延迟')) && headers.some(h => h.includes('下载速度'))) {
                        const ipIdx = headers.findIndex(h => h.includes('IP'));
                        const delayIdx = headers.findIndex(h => h.includes('延迟'));
                        const speedIdx = headers.findIndex(h => h.includes('下载速度'));
                        const port = new URL(url).searchParams.get('port') || defaultPort;
                        dataLines.forEach(line => {
                            const cols = line.split(',').map(c => c.trim());
                            const wrappedIP = IPV6_PATTERN.test(cols[ipIdx]) ? `[${cols[ipIdx]}]` : cols[ipIdx];
                            results.add(`${wrappedIP}:${port}#CF Preferred ${cols[delayIdx]}ms ${cols[speedIdx]}MB/s`);
                        });
                    }
                }
            } catch (e) { }
        }));
        return Array.from(results);
    }

    // --- DoH & Protocols Implementation ---

    const DOH_PROVIDERS = [
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

    async function handleDoHRequest(request, env, ctx) {
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

    function selectProvider(providers) {
        const totalWeight = providers.reduce((sum, provider) => sum + provider.weight, 0);
        let random = Math.random() * totalWeight;
        for (const provider of providers) {
            if (random < provider.weight) return provider;
            random -= provider.weight;
        }
        return providers[0];
    }

    async function tryFallbackProviders(request, url, failedProvider) {
        const fallbackProviders = DOH_PROVIDERS.filter(p => p.name !== failedProvider.name);
        for (const provider of fallbackProviders.slice(0, 2)) {
            try {
                const targetUrl = provider.url + url.search;
                const headers = new Headers(request.headers);
                if (request.method === 'POST') headers.set('Content-Type', 'application/dns-message');
                else headers.set('Accept', 'application/dns-message');

                const upstreamRequest = new Request(targetUrl, {
                    method: request.method,
                    headers: headers,
                    body: request.method === 'POST' ? await request.arrayBuffer() : null
                });

                const response = await fetch(upstreamRequest);
                if (response.ok) {
                    const responseHeaders = new Headers(response.headers);
                    responseHeaders.set('Access-Control-Allow-Origin', '*');
                    return new Response(response.body, {
                        status: response.status,
                        headers: responseHeaders
                    });
                }
            } catch (e) { continue; }
        }
        return new Response('All DNS providers failed', { status: 503 });
    }

    function serveDNSEncodingExplanation() {
        return new Response('DNS Encoding Explanation: GET requests must use base64url encoded DNS query in ?dns= param. POST requests send raw binary.', { status: 200 });
    }

    // --- VMess & Shadowsocks Link Generation ---

    function generateVMessLinksFromSource(list, user, workerDomain) {
        const links = [];
        const wsPath = '/vm?ed=2048';
        const CF_HTTP_PORTS = [80, 8080, 8880, 2052, 2082, 2086, 2095];
        const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];

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

    function generateVMessLinksFromNewIPs(list, user, workerDomain) {
        const links = [];
        const wsPath = '/vm?ed=2048';
        const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];

        list.forEach(item => {
            const nodeName = item.name.replace(/\s/g, '_');
            const port = parseInt(item.port);
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

    function generateShadowsocksLinksFromSource(list, user, workerDomain) {
        const links = [];
        const method = 'chacha20-ietf-poly1305';
        const password = user;
        const wsPath = '/ss?ed=2048';
        const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];

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

    function generateShadowsocksLinksFromNewIPs(list, user, workerDomain) {
        const links = [];
        const method = 'chacha20-ietf-poly1305';
        const password = user;
        const wsPath = '/ss?ed=2048';
        const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];

        list.forEach(item => {
            const nodeName = item.name.replace(/\s/g, '_');
            const port = parseInt(item.port);
            const isTLS = CF_HTTPS_PORTS.includes(port);

            if (!isTLS && disableNonTLS) return;

            const userInfo = btoa(`${method}:${password}`);
            let pluginParam = `v2ray-plugin;mode=websocket;host=${workerDomain};path=${encodeURIComponent(wsPath)}`;
            if (isTLS) pluginParam += ';tls';

            links.push(`ss://${userInfo}@${item.ip}:${port}?plugin=${encodeURIComponent(pluginParam)}#${encodeURIComponent(nodeName)}`);
        });
        return links;
    }
