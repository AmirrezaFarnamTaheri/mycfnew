var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker.js
import { connect } from "cloudflare:sockets";
var at = "";
var fallbackAddress = "";
var socks5Config = "";
var customPreferredIPs = [];
var customPreferredDomains = [];
var enableSocksDowngrade = false;
var disableNonTLS = false;
var disablePreferred = false;
var enableRegionMatching = true;
var currentWorkerRegion = "";
var manualWorkerRegion = "";
var piu = "";
var cp = "";
var ev = true;
var et = false;
var ex = false;
var evm = false;
var ess = false;
var etu = false;
var ehy = false;
var eg = false;
var tp = "";
var enableECH = false;
var customDNS = "https://dns.joeyblog.eu.org/joeyblog";
var customECHDomain = "cloudflare-ech.com";
var scu = "https://url.v1.mk/sub";
var defaultRemoteConfigUrl = "https://raw.githubusercontent.com/byJoey/test/refs/heads/main/tist.ini";
var epd = false;
var epi = true;
var egi = true;
var enableDiverseProxies = false;
var kvStore = null;
var kvConfig = {};
var backupIPs = [
  { domain: "ProxyIP.US.CMLiussss.net", region: "US", regionCode: "US", port: 443 },
  { domain: "ProxyIP.SG.CMLiussss.net", region: "SG", regionCode: "SG", port: 443 },
  { domain: "ProxyIP.JP.CMLiussss.net", region: "JP", regionCode: "JP", port: 443 },
  { domain: "ProxyIP.KR.CMLiussss.net", region: "KR", regionCode: "KR", port: 443 },
  { domain: "ProxyIP.DE.CMLiussss.net", region: "DE", regionCode: "DE", port: 443 },
  { domain: "ProxyIP.SE.CMLiussss.net", region: "SE", regionCode: "SE", port: 443 },
  { domain: "ProxyIP.NL.CMLiussss.net", region: "NL", regionCode: "NL", port: 443 },
  { domain: "ProxyIP.FI.CMLiussss.net", region: "FI", regionCode: "FI", port: 443 },
  { domain: "ProxyIP.GB.CMLiussss.net", region: "GB", regionCode: "GB", port: 443 },
  { domain: "ProxyIP.FR.CMLiussss.net", region: "FR", regionCode: "FR", port: 443 },
  { domain: "ProxyIP.CA.CMLiussss.net", region: "CA", regionCode: "CA", port: 443 },
  { domain: "ProxyIP.AU.CMLiussss.net", region: "AU", regionCode: "AU", port: 443 },
  { domain: "ProxyIP.HK.CMLiussss.net", region: "HK", regionCode: "HK", port: 443 },
  { domain: "ProxyIP.TW.CMLiussss.net", region: "TW", regionCode: "TW", port: 443 },
  { domain: "ProxyIP.IN.CMLiussss.net", region: "IN", regionCode: "IN", port: 443 },
  { domain: "ProxyIP.BR.CMLiussss.net", region: "BR", regionCode: "BR", port: 443 },
  { domain: "ProxyIP.PL.CMLiussss.net", region: "PL", regionCode: "PL", port: 443 },
  { domain: "ProxyIP.RU.CMLiussss.net", region: "RU", regionCode: "RU", port: 443 },
  { domain: "ProxyIP.LV.CMLiussss.net", region: "LV", regionCode: "LV", port: 443 },
  { domain: "ProxyIP.IR.CMLiussss.net", region: "IR", regionCode: "IR", port: 443 },
  { domain: "ProxyIP.Oracle.cmliussss.net", region: "Oracle", regionCode: "Oracle", port: 443 },
  { domain: "ProxyIP.DigitalOcean.CMLiussss.net", region: "DigitalOcean", regionCode: "DigitalOcean", port: 443 },
  { domain: "ProxyIP.Vultr.CMLiussss.net", region: "Vultr", regionCode: "Vultr", port: 443 },
  { domain: "ProxyIP.Multacom.CMLiussss.net", region: "Multacom", regionCode: "Multacom", port: 443 }
];
var directDomains = [
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
];
var E_INVALID_DATA = atob("aW52YWxpZCBkYXRh");
var E_INVALID_USER = atob("aW52YWxpZCB1c2Vy");
var E_UNSUPPORTED_CMD = atob("Y29tbWFuZCBpcyBub3Qgc3VwcG9ydGVk");
var E_UDP_DNS_ONLY = atob("VURQIHByb3h5IG9ubHkgZW5hYmxlIGZvciBETlMgd2hpY2ggaXMgcG9ydCA1Mw==");
var E_INVALID_ADDR_TYPE = atob("aW52YWxpZCBhZGRyZXNzVHlwZQ==");
var E_EMPTY_ADDR = atob("YWRkcmVzc1ZhbHVlIGlzIGVtcHR5");
var E_WS_NOT_OPEN = atob("d2ViU29ja2V0LmVhZHlTdGF0ZSBpcyBub3Qgb3Blbg==");
var E_INVALID_ID_STR = atob("U3RyaW5naWZpZWQgaWRlbnRpZmllciBpcyBpbnZhbGlk");
var E_INVALID_SOCKS_ADDR = atob("SW52YWxpZCBTT0NLUyBhZGRyZXNzIGZvcm1hdA==");
var E_SOCKS_NO_METHOD = atob("bm8gYWNjZXB0YWJsZSBtZXRob2Rz");
var E_SOCKS_AUTH_NEEDED = atob("c29ja3Mgc2VydmVyIG5lZWRzIGF1dGg=");
var E_SOCKS_AUTH_FAIL = atob("ZmFpbCB0byBhdXRoIHNvY2tzIHNlcnZlcg==");
var E_SOCKS_CONN_FAIL = atob("ZmFpbCB0byBvcGVuIHNvY2tzIGNvbm5lY3Rpb24=");
var parsedSocks5Config = {};
var isSocksEnabled = false;
var ADDRESS_TYPE_IPV4 = 1;
var ADDRESS_TYPE_URL = 2;
var ADDRESS_TYPE_IPV6 = 3;
function isValidFormat(str) {
  const userRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return userRegex.test(str);
}
__name(isValidFormat, "isValidFormat");
function isValidIP(ip) {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipv4Regex.test(ip)) return true;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  if (ipv6Regex.test(ip)) return true;
  const ipv6ShortRegex = /^::1$|^::$|^(?:[0-9a-fA-F]{1,4}:)*::(?:[0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4}$/;
  if (ipv6ShortRegex.test(ip)) return true;
  return false;
}
__name(isValidIP, "isValidIP");
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
__name(initKVStore, "initKVStore");
async function loadKVConfig() {
  if (!kvStore) {
    return;
  }
  try {
    const configData = await kvStore.get("c");
    if (configData) {
      kvConfig = JSON.parse(configData);
    } else {
    }
  } catch (error) {
    kvConfig = {};
  }
}
__name(loadKVConfig, "loadKVConfig");
async function saveKVConfig() {
  if (!kvStore) {
    return;
  }
  try {
    const configString = JSON.stringify(kvConfig);
    await kvStore.put("c", configString);
  } catch (error) {
    throw error;
  }
}
__name(saveKVConfig, "saveKVConfig");
function getConfigValue(key, defaultValue = "") {
  if (kvConfig[key] !== void 0) {
    return kvConfig[key];
  }
  return defaultValue;
}
__name(getConfigValue, "getConfigValue");
async function setConfigValue(key, value) {
  kvConfig[key] = value;
  await saveKVConfig();
}
__name(setConfigValue, "setConfigValue");
async function detectWorkerRegion(request) {
  try {
    const cfCountry = request.cf?.country;
    if (cfCountry) {
      const countryToRegion = {
        "US": "US",
        "SG": "SG",
        "JP": "JP",
        "KR": "KR",
        "DE": "DE",
        "SE": "SE",
        "NL": "NL",
        "FI": "FI",
        "GB": "GB",
        "FR": "FR",
        "CA": "CA",
        "AU": "AU",
        "HK": "HK",
        "TW": "TW",
        "IN": "IN",
        "BR": "BR",
        "PL": "PL",
        "RU": "RU",
        "CN": "SG",
        "IT": "DE",
        "ES": "DE",
        "CH": "DE",
        "AT": "DE",
        // Europe fallbacks
        "BE": "NL",
        "DK": "SE",
        "NO": "SE",
        "IE": "GB",
        "NZ": "AU",
        "MY": "SG",
        "ID": "SG",
        "TH": "SG",
        // APAC fallbacks
        "VN": "SG",
        "PH": "SG",
        "BD": "IN",
        "LK": "IN",
        "NP": "IN",
        "PK": "IN",
        // South Asia -> IN
        "AR": "BR",
        "CL": "BR",
        "CO": "BR",
        "PE": "BR",
        // South America -> BR
        "CZ": "PL",
        "SK": "PL",
        "HU": "PL",
        "UA": "PL",
        "BY": "PL",
        // Eastern Europe -> PL
        "KZ": "RU",
        "UZ": "RU"
        // Central Asia -> RU
      };
      if (countryToRegion[cfCountry]) {
        return countryToRegion[cfCountry];
      }
    }
    return "SG";
  } catch (error) {
    return "SG";
  }
}
__name(detectWorkerRegion, "detectWorkerRegion");
async function getBestBackupIP(workerRegion = "") {
  if (backupIPs.length === 0) {
    return null;
  }
  const availableIPs = backupIPs.map((ip) => ({ ...ip, available: true }));
  if (enableRegionMatching && workerRegion) {
    const sortedIPs = getSmartRegionSelection(workerRegion, availableIPs);
    if (sortedIPs.length > 0) {
      const selectedIP2 = sortedIPs[0];
      return selectedIP2;
    }
  }
  const selectedIP = availableIPs[0];
  return selectedIP;
}
__name(getBestBackupIP, "getBestBackupIP");
function getNearbyRegions(region) {
  const nearbyMap = {
    "US": ["SG", "JP", "KR", "BR"],
    "SG": ["JP", "KR", "US", "IN"],
    "JP": ["SG", "KR", "US"],
    "KR": ["JP", "SG", "US"],
    "DE": ["NL", "GB", "SE", "FI", "PL", "RU"],
    "SE": ["DE", "NL", "FI", "GB", "PL", "RU"],
    "NL": ["DE", "GB", "SE", "FI", "PL"],
    "FI": ["SE", "DE", "NL", "GB", "RU"],
    "GB": ["DE", "NL", "SE", "FI"],
    "IN": ["SG"],
    "BR": ["US"],
    "PL": ["DE", "SE", "FI", "NL", "RU"],
    "RU": ["FI", "SE", "DE", "PL"],
    "LV": ["FI", "SE", "PL", "RU"],
    "IR": ["LV", "SG", "JP", "KR", "DE", "SE", "NL", "FI", "GB", "FR", "PL", "RU", "US", "CA", "BR", "IN", "AU", "HK", "TW"]
  };
  return nearbyMap[region] || [];
}
__name(getNearbyRegions, "getNearbyRegions");
function getAllRegionsByPriority(region) {
  const nearbyRegions = getNearbyRegions(region);
  const allRegions = ["US", "SG", "JP", "KR", "DE", "SE", "NL", "FI", "GB", "IN", "BR", "PL", "RU", "LV", "IR", "AU", "HK", "TW"];
  return [region, ...nearbyRegions, ...allRegions.filter((r) => r !== region && !nearbyRegions.includes(r))];
}
__name(getAllRegionsByPriority, "getAllRegionsByPriority");
function getSmartRegionSelection(workerRegion, availableIPs) {
  if (!enableRegionMatching || !workerRegion) {
    return availableIPs;
  }
  const priorityRegions = getAllRegionsByPriority(workerRegion);
  const sortedIPs = [];
  for (const region of priorityRegions) {
    const regionIPs = availableIPs.filter((ip) => ip.regionCode === region);
    sortedIPs.push(...regionIPs);
  }
  return sortedIPs;
}
__name(getSmartRegionSelection, "getSmartRegionSelection");
function parseAddressAndPort(input) {
  if (input.includes("[") && input.includes("]")) {
    const match = input.match(/^\[([^\]]+)\](?::(\d+))?$/);
    if (match) {
      return {
        address: match[1],
        port: match[2] ? parseInt(match[2], 10) : null
      };
    }
  }
  const lastColonIndex = input.lastIndexOf(":");
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
__name(parseAddressAndPort, "parseAddressAndPort");
function normalizePathToken(token) {
  return token ? token.trim().replace(/^\/+|\/+$/g, "") : "";
}
__name(normalizePathToken, "normalizePathToken");
function splitPath(pathname) {
  return pathname.split("/").filter(Boolean);
}
__name(splitPath, "splitPath");
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
__name(pathEndsWithSegments, "pathEndsWithSegments");
function matchesCustomPath(pathParts, customPath) {
  const token = normalizePathToken(customPath);
  if (!token) {
    return false;
  }
  return pathEndsWithSegments(pathParts, token.split("/"), false);
}
__name(matchesCustomPath, "matchesCustomPath");
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
__name(extractUuidFromPathParts, "extractUuidFromPathParts");
var worker_default = {
  async fetch(request, env, ctx) {
    try {
      await initKVStore(env);
      at = (env.u || env.U || at).toLowerCase();
      if (!at) {
        return new Response("UUID not set", { status: 500 });
      }
      const subPath = (env.d || env.D || at).toLowerCase();
      const ci = getConfigValue("p", env.p || env.P);
      let useCustomIP = false;
      const manualRegion = getConfigValue("wk", env.wk || env.WK);
      if (manualRegion && manualRegion.trim()) {
        manualWorkerRegion = manualRegion.trim().toUpperCase();
        currentWorkerRegion = manualWorkerRegion;
      } else if (ci && ci.trim()) {
        useCustomIP = true;
        currentWorkerRegion = "CUSTOM";
      } else {
        currentWorkerRegion = await detectWorkerRegion(request);
      }
      const regionMatchingControl = env.rm || env.RM;
      if (regionMatchingControl && regionMatchingControl.toLowerCase() === "no") {
        enableRegionMatching = false;
      }
      const envFallback = getConfigValue("p", env.p || env.P);
      if (envFallback) {
        fallbackAddress = envFallback.trim();
      }
      socks5Config = getConfigValue("s", env.s || env.S) || socks5Config;
      if (socks5Config) {
        try {
          parsedSocks5Config = parseSocksConfig(socks5Config);
          isSocksEnabled = true;
        } catch (err) {
          isSocksEnabled = false;
        }
      }
      const customPreferred = getConfigValue("yx", env.yx || env.YX);
      if (customPreferred) {
        try {
          const preferredList = customPreferred.split(",").map((item) => item.trim()).filter((item) => item);
          customPreferredIPs = [];
          customPreferredDomains = [];
          preferredList.forEach((item) => {
            let nodeName = "";
            let addressPart = item;
            if (item.includes("#")) {
              const parts = item.split("#");
              addressPart = parts[0].trim();
              nodeName = parts[1].trim();
            }
            const { address, port } = parseAddressAndPort(addressPart);
            if (!nodeName) {
              nodeName = "CustomPreferred-" + address + (port ? ":" + port : "");
            }
            if (isValidIP(address)) {
              customPreferredIPs.push({
                ip: address,
                port,
                isp: nodeName
              });
            } else {
              customPreferredDomains.push({
                domain: address,
                port,
                name: nodeName
              });
            }
          });
        } catch (err) {
          customPreferredIPs = [];
          customPreferredDomains = [];
        }
      }
      const downgradeControl = getConfigValue("qj", env.qj || env.QJ);
      if (downgradeControl && downgradeControl.toLowerCase() === "no") {
        enableSocksDowngrade = true;
      }
      const dkbyControl = getConfigValue("dkby", env.dkby || env.DKBY);
      if (dkbyControl && dkbyControl.toLowerCase() === "yes") {
        disableNonTLS = true;
      }
      const yxbyControl = env.yxby || env.YXBY;
      if (yxbyControl && yxbyControl.toLowerCase() === "yes") {
        disablePreferred = true;
      }
      const vlessControl = getConfigValue("ev", env.ev);
      if (vlessControl !== void 0 && vlessControl !== "") {
        ev = vlessControl === "yes" || vlessControl === true || vlessControl === "true";
      }
      const tjControl = getConfigValue("et", env.et);
      if (tjControl !== void 0 && tjControl !== "") {
        et = tjControl === "yes" || tjControl === true || tjControl === "true";
      }
      tp = getConfigValue("tp", env.tp) || "";
      const xhttpControl = getConfigValue("ex", env.ex);
      if (xhttpControl !== void 0 && xhttpControl !== "") {
        ex = xhttpControl === "yes" || xhttpControl === true || xhttpControl === "true";
      }
      const vmessControl = getConfigValue("evm", env.evm);
      if (vmessControl !== void 0 && vmessControl !== "") {
        evm = vmessControl === "yes" || vmessControl === true || vmessControl === "true";
      }
      const ssControl = getConfigValue("ess", env.ess);
      if (ssControl !== void 0 && ssControl !== "") {
        ess = ssControl === "yes" || ssControl === true || ssControl === "true";
      }
      const tuicControl = getConfigValue("etu", env.etu);
      if (tuicControl !== void 0 && tuicControl !== "") {
        etu = tuicControl === "yes" || tuicControl === true || tuicControl === "true";
      }
      const hyControl = getConfigValue("ehy", env.ehy);
      if (hyControl !== void 0 && hyControl !== "") {
        ehy = hyControl === "yes" || hyControl === true || hyControl === "true";
      }
      const grpcControl = getConfigValue("eg", env.eg);
      if (grpcControl !== void 0 && grpcControl !== "") {
        eg = grpcControl === "yes" || grpcControl === true || grpcControl === "true";
      }
      scu = getConfigValue("scu", env.scu) || "https://url.v1.mk/sub";
      const preferredDomainsControl = getConfigValue("epd", env.epd || "no");
      if (preferredDomainsControl !== void 0 && preferredDomainsControl !== "") {
        epd = preferredDomainsControl !== "no" && preferredDomainsControl !== false && preferredDomainsControl !== "false";
      }
      const preferredIPsControl = getConfigValue("epi", env.epi);
      if (preferredIPsControl !== void 0 && preferredIPsControl !== "") {
        epi = preferredIPsControl !== "no" && preferredIPsControl !== false && preferredIPsControl !== "false";
      }
      const githubIPsControl = getConfigValue("egi", env.egi);
      if (githubIPsControl !== void 0 && githubIPsControl !== "") {
        egi = githubIPsControl !== "no" && githubIPsControl !== false && githubIPsControl !== "false";
      }
      const diverseProxiesControl = getConfigValue("edp", env.edp);
      if (diverseProxiesControl !== void 0 && diverseProxiesControl !== "") {
        enableDiverseProxies = diverseProxiesControl === "yes" || diverseProxiesControl === true || diverseProxiesControl === "true";
      }
      const echControl = getConfigValue("ech", env.ech);
      if (echControl !== void 0 && echControl !== "") {
        enableECH = echControl === "yes" || echControl === true || echControl === "true";
      }
      const customDNSValue = getConfigValue("customDNS", "");
      if (customDNSValue && customDNSValue.trim()) {
        customDNS = customDNSValue.trim();
      }
      const customECHDomainValue = getConfigValue("customECHDomain", "");
      if (customECHDomainValue && customECHDomainValue.trim()) {
        customECHDomain = customECHDomainValue.trim();
      }
      if (enableECH) {
        disableNonTLS = true;
        const currentDkby = getConfigValue("dkby", "");
        if (currentDkby !== "yes") {
          await setConfigValue("dkby", "yes");
        }
      }
      if (!ev && !et && !ex && !evm && !ess) {
        ev = true;
      }
      piu = getConfigValue("yxURL", env.yxURL || env.YXURL) || "https://raw.githubusercontent.com/qwer-search/bestip/refs/heads/main/kejilandbestip.txt";
      const rcu = getConfigValue("rcu", env.rcu || env.RCU) || defaultRemoteConfigUrl;
      cp = getConfigValue("d", env.d || env.D) || "";
      const defaultURL = "https://raw.githubusercontent.com/qwer-search/bestip/refs/heads/main/kejilandbestip.txt";
      if (piu !== defaultURL) {
        directDomains.length = 0;
        customPreferredIPs = [];
        customPreferredDomains = [];
      }
      const url = new URL(request.url);
      if (url.pathname === "/dns-query") return await handleDoHRequest(request, env, ctx);
      if (url.pathname === "/dns-encoding") return serveDNSEncodingExplanation();
      if (url.pathname.includes("/api/config")) {
        const pathParts = splitPath(url.pathname);
        const apiIndex = pathParts.findIndex((p) => p.toLowerCase() === "api");
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
          return new Response(JSON.stringify({ error: "\u8DEF\u5F84\u9A8C\u8BC1\u5931\u8D25" }), {
            status: 403,
            headers: { "Content-Type": "application/json" }
          });
        }
        return new Response(JSON.stringify({ error: "Invalid API Path" }), {
          status: 404,
          headers: { "Content-Type": "application/json" }
        });
      }
      if (url.pathname.includes("/api/preferred-ips")) {
        const pathParts = splitPath(url.pathname);
        const apiIndex = pathParts.findIndex((p) => p.toLowerCase() === "api");
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
          return new Response(JSON.stringify({ error: "\u8DEF\u5F84\u9A8C\u8BC1\u5931\u8D25" }), {
            status: 403,
            headers: { "Content-Type": "application/json" }
          });
        }
        return new Response(JSON.stringify({ error: "Invalid API Path" }), {
          status: 404,
          headers: { "Content-Type": "application/json" }
        });
      }
      if (request.method === "POST" && request.headers.get("content-type") === "application/grpc" && eg) {
        return await handleGrpcRequest(request);
      }
      if (request.method === "POST" && ex) {
        const r = await handleXhttpPost(request);
        if (r instanceof Response) {
          return r;
        }
        if (r && typeof r === "object" && "readable" in r && "closed" in r) {
          ctx.waitUntil(r.closed);
          return new Response(r.readable, {
            headers: {
              "X-Accel-Buffering": "no",
              "Cache-Control": "no-store",
              Connection: "keep-alive",
              "User-Agent": "Go-http-client/2.0",
              "Content-Type": "application/grpc"
            }
          });
        }
        return new Response("Internal Server Error", { status: 500 });
      }
      if (request.headers.get("Upgrade") === atob("d2Vic29ja2V0")) {
        return await handleWsRequest(request);
      }
      if (request.method === "GET") {
        if (url.pathname.endsWith("/region")) {
          const pathParts = splitPath(url.pathname);
          if (pathParts.length >= 2 && pathParts[pathParts.length - 1].toLowerCase() === "region") {
            const accessParts = pathParts.slice(0, -1);
            let isValid = false;
            if (cp && cp.trim()) {
              isValid = matchesCustomPath(accessParts, cp);
            } else {
              const user = extractUuidFromPathParts(accessParts);
              isValid = !!user && user === at;
            }
            if (isValid) {
              const ci2 = getConfigValue("p", env.p || env.P);
              const manualRegion2 = getConfigValue("wk", env.wk || env.WK);
              if (manualRegion2 && manualRegion2.trim()) {
                return new Response(JSON.stringify({
                  region: manualRegion2.trim().toUpperCase(),
                  detectionMethod: "Manual Region",
                  manualRegion: manualRegion2.trim().toUpperCase(),
                  timestamp: (/* @__PURE__ */ new Date()).toISOString()
                }), {
                  headers: { "Content-Type": "application/json" }
                });
              } else if (ci2 && ci2.trim()) {
                return new Response(JSON.stringify({
                  region: "CUSTOM",
                  detectionMethod: "Custom ProxyIP Mode",
                  ci: ci2,
                  timestamp: (/* @__PURE__ */ new Date()).toISOString()
                }), {
                  headers: { "Content-Type": "application/json" }
                });
              } else {
                const detectedRegion = await detectWorkerRegion(request);
                return new Response(JSON.stringify({
                  region: detectedRegion,
                  detectionMethod: "API Detection",
                  timestamp: (/* @__PURE__ */ new Date()).toISOString()
                }), {
                  headers: { "Content-Type": "application/json" }
                });
              }
            } else {
              return new Response(JSON.stringify({
                error: "Access Denied",
                message: "Path Validation Failed"
              }), {
                status: 403,
                headers: { "Content-Type": "application/json" }
              });
            }
          }
        }
        if (url.pathname.endsWith("/test-api")) {
          const pathParts = splitPath(url.pathname);
          if (pathParts.length >= 2 && pathParts[pathParts.length - 1].toLowerCase() === "test-api") {
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
                  message: "API Test Completed",
                  timestamp: (/* @__PURE__ */ new Date()).toISOString()
                }), {
                  headers: { "Content-Type": "application/json" }
                });
              } catch (error) {
                return new Response(JSON.stringify({
                  error: error.message,
                  message: "API Test Failed"
                }), {
                  status: 500,
                  headers: { "Content-Type": "application/json" }
                });
              }
            } else {
              return new Response(JSON.stringify({
                error: "Access Denied",
                message: "Path Validation Failed"
              }), {
                status: 403,
                headers: { "Content-Type": "application/json" }
              });
            }
          }
        }
        if (url.pathname === "/") {
          const customHomepage = getConfigValue("homepage", env.homepage || env.HOMEPAGE);
          if (customHomepage && customHomepage.trim()) {
            try {
              const homepageUrl = new URL(customHomepage.trim());
              if (homepageUrl.protocol !== "https:") {
                throw new Error("Invalid homepage URL protocol");
              }
              if (homepageUrl.hostname === url.hostname) {
                throw new Error("Homepage loop detected");
              }
              const homepageResponse = await fetch(homepageUrl.toString(), {
                method: "GET",
                headers: {
                  "User-Agent": request.headers.get("User-Agent") || "Mozilla/5.0",
                  "Accept": request.headers.get("Accept") || "*/*",
                  "Accept-Language": request.headers.get("Accept-Language") || "en-US,en;q=0.9"
                },
                redirect: "follow"
              });
              if (homepageResponse.ok) {
                const contentType = homepageResponse.headers.get("Content-Type") || "text/html; charset=utf-8";
                const content = await homepageResponse.text();
                return new Response(content, {
                  status: homepageResponse.status,
                  headers: {
                    "Content-Type": contentType,
                    "Cache-Control": "no-cache, no-store, must-revalidate"
                  }
                });
              }
            } catch (error) {
              console.error("Failed to fetch custom homepage:", error);
            }
          }
          const cookieHeader = request.headers.get("Cookie") || "";
          let langFromCookie = null;
          if (cookieHeader) {
            const cookies = cookieHeader.split(";").map((c) => c.trim());
            for (const cookie of cookies) {
              if (cookie.startsWith("preferredLanguage=")) {
                langFromCookie = cookie.split("=")[1];
                break;
              }
            }
          }
          let lang = "en";
          if (langFromCookie) {
            if (langFromCookie === "fa" || langFromCookie === "fa-IR") {
              lang = "fa";
            } else if (langFromCookie === "zh" || langFromCookie === "zh-CN" || langFromCookie === "zh-Hans") {
              lang = "zh";
            } else {
              lang = "en";
            }
          } else {
            const acceptLanguage = request.headers.get("Accept-Language") || "";
            const browserLang = acceptLanguage.split(",")[0].split("-")[0].toLowerCase();
            if (browserLang === "fa" || acceptLanguage.includes("fa-IR") || acceptLanguage.includes("fa")) {
              lang = "fa";
            } else if (browserLang === "zh" || acceptLanguage.includes("zh-CN") || acceptLanguage.includes("zh")) {
              lang = "zh";
            } else {
              lang = "en";
            }
          }
          const isFarsi = lang === "fa";
          const isZh = lang === "zh";
          const langAttr = isFarsi ? "fa-IR" : isZh ? "zh-CN" : "en-US";
          const translations = {
            en: {
              title: "Terminal",
              congratulations: "Congratulations, you made it!",
              enterU: "Please enter the value of your U variable",
              enterD: "Please enter the value of your D variable",
              command: "Command: connect [",
              uuid: "UUID",
              path: "PATH",
              inputU: "Enter content of U variable and press Enter...",
              inputD: "Enter content of D variable and press Enter...",
              connecting: "Connecting...",
              invading: "Invading...",
              success: "Connection successful! Returning result...",
              error: "Error: Invalid UUID format",
              reenter: "Please re-enter a valid UUID",
              // Subscription Page Translations
              subtitle: "Multi-client Support \u2022 Smart Optimization \u2022 One-Click Generation",
              selectClient: "[ Select Client ]",
              systemStatus: "[ System Status ]",
              configManagement: "[ Config Management ]",
              relatedLinks: "[ Related Links ]",
              checking: "Checking...",
              workerRegion: "Worker Region: ",
              detectionMethod: "Detection Method: ",
              proxyIPStatus: "ProxyIP Status: ",
              currentIP: "Current IP: ",
              regionMatch: "Region Match: ",
              selectionLogic: "Selection Logic: ",
              kvStatusChecking: "Checking KV Status...",
              kvEnabled: "\u2705 KV Storage Enabled, Config Management Available",
              kvDisabled: "\u26A0\uFE0F KV Storage Disabled or Not Configured",
              specifyRegion: "Specify Region (wk):",
              autoDetect: "Auto Detect",
              saveRegion: "Save Region Config",
              protocolSelection: "Protocol Selection:",
              enableVLESS: "Enable VLESS Protocol",
              enableVMess: "Enable VMess Protocol",
              enableShadowsocks: "Enable Shadowsocks Protocol",
              enableTrojan: "Enable Trojan Protocol",
              enableXhttp: "Enable xhttp Protocol",
              enableTUIC: "Enable TUIC Protocol",
              enableHysteria2: "Enable Hysteria 2 Protocol",
              enableVLESSgRPC: "Enable VLESS gRPC Protocol",
              linkOnlyHint: "Requires External Backend (Link-Only)",
              grpcHint: "Requires Custom Domain (gRPC)",
              trojanPassword: "Trojan Password (Optional):",
              customPath: "Custom Path (d):",
              customPathPlaceholder: "e.g., /secret-path",
              customIP: "Custom ProxyIP (p):",
              customIPPlaceholder: "e.g., 1.2.3.4 or proxy.example.com",
              preferredIPs: "Preferred IP List (yx):",
              preferredIPsPlaceholder: "e.g., 1.1.1.1:443#HongKong, 8.8.8.8:443#USA",
              preferredIPsURL: "Preferred IP Source URL (yxURL):",
              latencyTest: "Latency Test",
              latencyTestIP: "Test IP/Domain:",
              latencyTestIPPlaceholder: "Enter IP or Domain, comma separated",
              latencyTestPort: "Port:",
              startTest: "Start Test",
              stopTest: "Stop Test",
              testResult: "Test Result:",
              addToYx: "Add to Preferred List",
              addSelectedToYx: "Add Selected to Preferred List",
              selectAll: "Select All",
              deselectAll: "Deselect All",
              testingInProgress: "Testing...",
              testComplete: "Test Complete",
              latencyMs: "Latency (HTTP Handshake)",
              timeout: "Timeout",
              ipSource: "IP Source:",
              manualInput: "Manual Input",
              cfRandomIP: "CF Random IP",
              urlFetch: "Fetch from URL",
              randomCount: "Generate Count:",
              fetchURL: "Fetch URL:",
              fetchURLPlaceholder: "Enter URL of IP list",
              generateIP: "Generate IP",
              fetchIP: "Fetch IP",
              socks5Config: "SOCKS5 Config (s):",
              customHomepage: "Custom Homepage URL (homepage):",
              customHomepagePlaceholder: "e.g., https://example.com",
              customHomepageHint: "Set custom URL as homepage camouflage. Content of this URL will be shown when accessing root path /. Leave empty to show default terminal page.",
              customPathHint: "Only accessible via this path if set. UUID access will be disabled. Suggest using complex path to prevent scanning.",
              customIPHint: "Hide Worker real IP, or solve Cloudflare Loop issue. Supports IP:Port or Domain:Port.",
              preferredIPsHint: "Manually specify preferred nodes. Highest priority. Format: IP:Port#Remark.",
              socks5ConfigHint: "Format: user:pass@host:port. Worker will connect to target via this proxy.",
              saveConfig: "Save Config",
              advancedControl: "Advanced Control",
              subscriptionConverter: "Sub Converter URL:",
              builtinPreferred: "Built-in Preferred Type:",
              enablePreferredDomain: "Enable Preferred Domain",
              enablePreferredIP: "Enable Preferred IP",
              enableGitHubPreferred: "Enable GitHub Default Preferred",
              enableDiverseProxies: "Enable Diverse Proxies (Generate all ports)",
              enableDiverseProxiesHint: "Generate nodes for all supported ports (80, 443, 2053, etc.) for each IP. Increases subscription size significantly.",
              allowAPIManagement: "Allow API Management (ae):",
              regionMatching: "Region Matching (rm):",
              downgradeControl: "Downgrade Control (qj):",
              tlsControl: "TLS Control (dkby):",
              preferredControl: "Preferred Control (yxby):",
              saveAdvanced: "Save Advanced Config",
              loading: "Loading...",
              currentConfig: "\u{1F4CD} Current Path Config",
              refreshConfig: "Refresh Config",
              resetConfig: "Reset Config",
              subscriptionCopied: "Subscription Link Copied",
              autoSubscriptionCopied: "Auto-detected subscription link copied. Client will be recognized by User-Agent.",
              trojanPasswordPlaceholder: "Leave empty to use UUID",
              trojanPasswordHint: "Set custom Trojan password. Leave empty to use UUID. Client will auto-hash password with SHA224.",
              protocolHint: "Multiple protocols can be enabled.<br>\u2022 VLESS WS: Standard WebSocket protocol<br>\u2022 VMess WS: WebSocket-based VMess (link generation)<br>\u2022 Shadowsocks: WebSocket-based SS (link generation)<br>\u2022 Trojan: Uses SHA224 password auth<br>\u2022 xhttp: HTTP POST camouflage (requires custom domain & gRPC)",
              enableECH: "Enable ECH (Encrypted Client Hello)",
              enableECHHint: "When enabled, ECH config is fetched from DoH and added to links on every sub refresh",
              customDNS: "Custom DNS Server",
              customDNSPlaceholder: "e.g., https://dns.joeyblog.eu.org/joeyblog",
              customDNSHint: "DNS server for ECH config query (DoH format)",
              customECHDomain: "Custom ECH Domain",
              customECHDomainPlaceholder: "e.g., cloudflare-ech.com",
              customECHDomainHint: "Domain used in ECH config, leave empty for default",
              saveProtocol: "Save Protocol Config",
              subscriptionConverterPlaceholder: "Default: https://url.v1.mk/sub",
              subscriptionConverterHint: "Custom subscription converter API, leave empty for default",
              builtinPreferredHint: "Control which built-in preferred nodes are included. Default all enabled.",
              apiEnabledDefault: "Default (API Disabled)",
              apiEnabledYes: "Enable API Management",
              apiEnabledHint: "\u26A0\uFE0F Security Warning: Enabling API allows dynamic preferred IP addition. Use only if needed.",
              regionMatchingDefault: "Default (Enable Region Match)",
              regionMatchingNo: "Disable Region Match",
              regionMatchingHint: 'Smart region matching disabled when set to "Disable"',
              downgradeControlDefault: "Default (Disable Downgrade)",
              downgradeControlNo: "Enable Downgrade Mode",
              downgradeControlHint: "When enabled: CF Direct Fail -> SOCKS5 -> Fallback",
              tlsControlDefault: "Default (Keep All Nodes)",
              tlsControlYes: "TLS Nodes Only",
              tlsControlHint: 'When set to "TLS Nodes Only", non-TLS nodes (e.g., port 80) are not generated',
              preferredControlDefault: "Default (Enable Preferred)",
              preferredControlYes: "Disable Preferred",
              preferredControlHint: 'When set to "Disable Preferred", only native address is used',
              regionNames: {
                US: "\u{1F1FA}\u{1F1F8} US",
                SG: "\u{1F1F8}\u{1F1EC} Singapore",
                JP: "\u{1F1EF}\u{1F1F5} Japan",
                KR: "\u{1F1F0}\u{1F1F7} South Korea",
                DE: "\u{1F1E9}\u{1F1EA} Germany",
                SE: "\u{1F1F8}\u{1F1EA} Sweden",
                NL: "\u{1F1F3}\u{1F1F1} Netherlands",
                FI: "\u{1F1EB}\u{1F1EE} Finland",
                GB: "\u{1F1EC}\u{1F1E7} UK",
                FR: "\u{1F1EB}\u{1F1F7} France",
                CA: "\u{1F1E8}\u{1F1E6} Canada",
                AU: "\u{1F1E6}\u{1F1FA} Australia",
                HK: "\u{1F1ED}\u{1F1F0} Hong Kong",
                TW: "\u{1F1F9}\u{1F1FC} Taiwan"
              },
              terminal: "Terminal v2.9.3",
              githubProject: "GitHub Project",
              autoDetectClient: "Auto Detect",
              selectionLogicText: "Same Region -> Nearby Region -> Other Regions",
              customIPDisabledHint: "Region selection disabled when using Custom ProxyIP",
              customIPMode: "Custom ProxyIP Mode (p variable enabled)",
              customIPModeDesc: "Custom IP Mode (Region match disabled)",
              usingCustomProxyIP: "Using Custom ProxyIP: ",
              customIPConfig: " (p variable config)",
              customIPModeDisabled: "Custom IP Mode, region selection disabled",
              manualRegion: "Manual Region",
              manualRegionDesc: " (Manual)",
              proxyIPAvailable: "10/10 Available (ProxyIP Domain Pre-set)",
              smartSelection: "Smart Nearby Selection",
              sameRegionIP: "Same Region IP Available (1)",
              cloudflareDetection: "Cloudflare Built-in Detection",
              detectionFailed: "Detection Failed",
              apiTestResult: "API Detection Result: ",
              apiTestTime: "Detection Time: ",
              apiTestFailed: "API Detection Failed: ",
              unknownError: "Unknown Error",
              apiTestError: "API Test Failed: ",
              kvNotConfigured: "KV Storage not configured. Config management unavailable.\\n\\nPlease in Cloudflare Workers:\\n1. Create KV Namespace\\n2. Bind variable C\\n3. Redeploy",
              kvNotEnabled: "KV Storage Not Configured",
              kvCheckFailed: "KV Check Failed: Invalid Response",
              kvCheckFailedStatus: "KV Check Failed - Status: ",
              kvCheckFailedError: "KV Check Failed - Error: ",
              debugConsoleTitle: "Debug Console",
              debugShow: "Show",
              debugHide: "Hide",
              debugReady: "Console ready",
              debugUnknownError: "Unknown error",
              debugUnhandledPromise: "Unhandled promise rejection"
            },
            fa: {
              title: "\u062A\u0631\u0645\u06CC\u0646\u0627\u0644",
              terminal: "\u062A\u0631\u0645\u06CC\u0646\u0627\u0644",
              congratulations: "\u062A\u0628\u0631\u06CC\u06A9 \u0645\u06CC\u200C\u06AF\u0648\u06CC\u06CC\u0645 \u0628\u0647 \u0634\u0645\u0627",
              enterU: "\u0644\u0637\u0641\u0627\u064B \u0645\u0642\u062F\u0627\u0631 \u0645\u062A\u063A\u06CC\u0631 U \u062E\u0648\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F",
              enterD: "\u0644\u0637\u0641\u0627\u064B \u0645\u0642\u062F\u0627\u0631 \u0645\u062A\u063A\u06CC\u0631 D \u062E\u0648\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F",
              command: "\u062F\u0633\u062A\u0648\u0631: connect [",
              uuid: "UUID",
              path: "PATH",
              inputU: "\u0645\u062D\u062A\u0648\u06CC\u0627\u062A \u0645\u062A\u063A\u06CC\u0631 U \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0631\u062F\u0647 \u0648 Enter \u0631\u0627 \u0628\u0632\u0646\u06CC\u062F...",
              inputD: "\u0645\u062D\u062A\u0648\u06CC\u0627\u062A \u0645\u062A\u063A\u06CC\u0631 D \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0631\u062F\u0647 \u0648 Enter \u0631\u0627 \u0628\u0632\u0646\u06CC\u062F...",
              connecting: "\u062F\u0631 \u062D\u0627\u0644 \u0627\u062A\u0635\u0627\u0644...",
              invading: "\u062F\u0631 \u062D\u0627\u0644 \u0646\u0641\u0648\u0630...",
              success: "\u0627\u062A\u0635\u0627\u0644 \u0645\u0648\u0641\u0642! \u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A \u0646\u062A\u06CC\u062C\u0647...",
              error: "\u062E\u0637\u0627: \u0641\u0631\u0645\u062A UUID \u0646\u0627\u0645\u0639\u062A\u0628\u0631",
              reenter: "\u0644\u0637\u0641\u0627\u064B UUID \u0645\u0639\u062A\u0628\u0631 \u0631\u0627 \u062F\u0648\u0628\u0627\u0631\u0647 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F",
              debugConsoleTitle: "\u06A9\u0646\u0633\u0648\u0644 \u0627\u0634\u06A9\u0627\u0644\u200C\u0632\u062F\u0627\u06CC\u06CC",
              debugShow: "\u0646\u0645\u0627\u06CC\u0634",
              debugHide: "\u067E\u0646\u0647\u0627\u0646 \u06A9\u0631\u062F\u0646",
              debugReady: "\u06A9\u0646\u0633\u0648\u0644 \u0622\u0645\u0627\u062F\u0647 \u0627\u0633\u062A",
              debugUnknownError: "\u062E\u0637\u0627\u06CC \u0646\u0627\u0634\u0646\u0627\u062E\u062A\u0647",
              debugUnhandledPromise: "\u0631\u062F Promise \u0628\u062F\u0648\u0646 \u0645\u062F\u06CC\u0631\u06CC\u062A"
            }
          };
          translations.fa = Object.assign({}, translations.en, translations.fa);
          translations.zh = Object.assign({}, translations.en, {
            title: "\u7EC8\u7AEF",
            terminal: "\u7EC8\u7AEF v2.9.3",
            congratulations: "\u606D\u559C\uFF0C\u4F60\u6210\u529F\u4E86\uFF01",
            enterU: "\u8BF7\u8F93\u5165\u4F60\u7684 U \u53D8\u91CF\u7684\u503C",
            enterD: "\u8BF7\u8F93\u5165\u4F60\u7684 D \u53D8\u91CF\u7684\u503C",
            command: "\u547D\u4EE4\uFF1Aconnect [",
            uuid: "UUID",
            path: "\u8DEF\u5F84",
            inputU: "\u8F93\u5165 U \u53D8\u91CF\u5185\u5BB9\u5E76\u56DE\u8F66...",
            inputD: "\u8F93\u5165 D \u53D8\u91CF\u5185\u5BB9\u5E76\u56DE\u8F66...",
            connecting: "\u8FDE\u63A5\u4E2D...",
            invading: "\u6B63\u5728\u8FDE\u63A5...",
            success: "\u8FDE\u63A5\u6210\u529F\uFF01\u6B63\u5728\u8FD4\u56DE\u7ED3\u679C...",
            error: "\u9519\u8BEF\uFF1AUUID \u683C\u5F0F\u65E0\u6548",
            reenter: "\u8BF7\u91CD\u65B0\u8F93\u5165\u6709\u6548\u7684 UUID",
            debugConsoleTitle: "\u8C03\u8BD5\u63A7\u5236\u53F0",
            debugShow: "\u5C55\u5F00",
            debugHide: "\u6536\u8D77",
            debugReady: "\u63A7\u5236\u53F0\u5C31\u7EEA",
            debugUnknownError: "\u672A\u77E5\u9519\u8BEF",
            debugUnhandledPromise: "\u672A\u5904\u7406\u7684 Promise \u62D2\u7EDD"
          });
          const t = translations[lang] || translations.en;
          const terminalHtml = `<!DOCTYPE html>
        <html lang="${langAttr}" dir="${isFarsi ? "rtl" : "ltr"}">
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
                    <option value="en" ${lang === "en" ? "selected" : ""}>\u{1F1FA}\u{1F1F8} English</option>
                    <option value="zh" ${lang === "zh" ? "selected" : ""}>\u{1F1E8}\u{1F1F3} \u4E2D\u6587</option>
                    <option value="fa" ${lang === "fa" ? "selected" : ""}>\u{1F1EE}\u{1F1F7} \u0641\u0627\u0631\u0633\u06CC</option>
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

            function safeLocalStorageGet(key) {
                try {
                    if (typeof localStorage === 'undefined') return null;
                    return window.localStorage.getItem(key);
                } catch (e) {
                    return null;
                }
            }

            function safeLocalStorageSet(key, value) {
                try {
                    if (typeof localStorage === 'undefined') return false;
                    window.localStorage.setItem(key, value);
                    return true;
                } catch (e) {
                    return false;
                }
            }

            function getCookie(name) {
                const value = '; ' + document.cookie;
                const parts = value.split('; ' + name + '=');
                if (parts.length === 2) {
                    const part = parts.pop();
                    if (part) return part.split(';').shift();
                }
                return null;
            }

            function getPreferredLanguage() {
                const savedLang = safeLocalStorageGet('preferredLanguage') || getCookie('preferredLanguage') || '';
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
                const cp = '${cp}';

                if (inputValue) {
                    const basePath = window.location.pathname.replace(//$/, '');
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
                    subtitle: 'Multi-client Support \u2022 Smart Optimization \u2022 One-Click Generation',
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
                    kvEnabled: '\u2705 KV Storage Enabled, Config Management Available',
                    kvDisabled: '\u26A0\uFE0F KV Storage Disabled or Not Configured',
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
                    currentConfig: '\u{1F4CD} Current Path Config',
                    refreshConfig: 'Refresh Config',
                    resetConfig: 'Reset Config',
                    subscriptionCopied: 'Subscription Link Copied',
                    autoSubscriptionCopied: 'Auto-detected subscription link copied. Client will be recognized by User-Agent.',
                    trojanPasswordPlaceholder: 'Leave empty to use UUID',
                    trojanPasswordHint: 'Set custom Trojan password. Leave empty to use UUID. Client will auto-hash password with SHA224.',
                    protocolHint: 'Multiple protocols can be enabled.<br>\u2022 VLESS WS: Standard WebSocket protocol<br>\u2022 VMess WS: WebSocket-based VMess (link generation)<br>\u2022 Shadowsocks: WebSocket-based SS (link generation)<br>\u2022 Trojan: Uses SHA224 password auth<br>\u2022 xhttp: HTTP POST camouflage (requires custom domain & gRPC)',
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
                    apiEnabledHint: '\u26A0\uFE0F Security Warning: Enabling API allows dynamic preferred IP addition. Use only if needed.',
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
                        US: '\u{1F1FA}\u{1F1F8} US', SG: '\u{1F1F8}\u{1F1EC} Singapore', JP: '\u{1F1EF}\u{1F1F5} Japan',
                        KR: '\u{1F1F0}\u{1F1F7} South Korea', DE: '\u{1F1E9}\u{1F1EA} Germany', SE: '\u{1F1F8}\u{1F1EA} Sweden', NL: '\u{1F1F3}\u{1F1F1} Netherlands',
                        FI: '\u{1F1EB}\u{1F1EE} Finland', GB: '\u{1F1EC}\u{1F1E7} UK', FR: '\u{1F1EB}\u{1F1F7} France', CA: '\u{1F1E8}\u{1F1E6} Canada',
                        AU: '\u{1F1E6}\u{1F1FA} Australia', HK: '\u{1F1ED}\u{1F1F0} Hong Kong', TW: '\u{1F1F9}\u{1F1FC} Taiwan'
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
                    kvNotConfigured: 'KV Storage not configured. Config management unavailable.

Please in Cloudflare Workers:
1. Create KV Namespace
2. Bind variable C
3. Redeploy',
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
                                connecting: '\u062F\u0631 \u062D\u0627\u0644 \u0627\u062A\u0635\u0627\u0644...',
                                invading: '\u062F\u0631 \u062D\u0627\u0644 \u0646\u0641\u0648\u0630...',
                                success: '\u0627\u062A\u0635\u0627\u0644 \u0645\u0648\u0641\u0642! \u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A \u0646\u062A\u06CC\u062C\u0647...',
                                error: '\u062E\u0637\u0627: \u0641\u0631\u0645\u062A UUID \u0646\u0627\u0645\u0639\u062A\u0628\u0631',
                                reenter: '\u0644\u0637\u0641\u0627\u064B UUID \u0645\u0639\u062A\u0628\u0631 \u0631\u0627 \u062F\u0648\u0628\u0627\u0631\u0647 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F'
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
                    safeLocalStorageSet('preferredLanguage', lang);
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
                        if (parts.length === 2) {
                            const part = parts.pop();
                            if (part) return part.split(';').shift();
                        }
                        return null;
                    }

                    const savedLang = safeLocalStorageGet('preferredLanguage') || getCookie('preferredLanguage');
                    const urlParams = new URLSearchParams(window.location.search);
                    const urlLang = urlParams.get('lang');

                    // If URL has language parameter, remove it and set Cookie
                    if (urlLang) {
                        const currentUrl = new URL(window.location.href);
                        currentUrl.searchParams.delete('lang');
                        const newUrl = currentUrl.toString();

                        // \u8BBE\u7F6ECookie
                        const expiryDate = new Date();
                        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                        document.cookie = 'preferredLanguage=' + urlLang + '; path=/; expires=' + expiryDate.toUTCString() + '; SameSite=Lax';
                        safeLocalStorageSet('preferredLanguage', urlLang);

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
        <\/script>
    </body>
    </html>`;
          return new Response(terminalHtml, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } });
        }
        if (cp && cp.trim()) {
          const pathParts = splitPath(url.pathname.replace(/\/+$/, ""));
          const isSubRequest = pathParts.length > 0 && pathParts[pathParts.length - 1].toLowerCase() === "sub";
          if (isSubRequest) {
            const accessParts = pathParts.slice(0, -1);
            if (matchesCustomPath(accessParts, cp)) {
              return await handleSubscriptionRequest(request, at, url);
            }
          }
          if (matchesCustomPath(pathParts, cp)) {
            return await handleSubscriptionPage(request, at, rcu);
          }
          const user = extractUuidFromPathParts(pathParts);
          if (user) {
            return new Response(JSON.stringify({
              error: "Access Denied",
              message: "Custom path mode enabled, UUID access disabled"
            }), {
              status: 403,
              headers: { "Content-Type": "application/json" }
            });
          }
        } else {
          const pathParts = splitPath(url.pathname.replace(/\/+$/, ""));
          const isSubRequest = pathParts.length > 0 && pathParts[pathParts.length - 1].toLowerCase() === "sub";
          if (isSubRequest) {
            const user = extractUuidFromPathParts(pathParts.slice(0, -1));
            if (user) {
              if (user === at) {
                return await handleSubscriptionRequest(request, user, url);
              } else {
                return new Response(JSON.stringify({ error: "UUID Error" }), {
                  status: 403,
                  headers: { "Content-Type": "application/json" }
                });
              }
            }
          } else if (pathParts.length > 0) {
            const user = extractUuidFromPathParts(pathParts);
            if (user) {
              if (user === at) {
                return await handleSubscriptionPage(request, user, rcu);
              } else {
                return new Response(JSON.stringify({ error: "UUID Error: Please note the variable name is u, not uuid" }), {
                  status: 403,
                  headers: { "Content-Type": "application/json" }
                });
              }
            }
          }
        }
        const normalizedPathname = url.pathname.replace(/\/+$/, "").toLowerCase();
        const normalizedSubPath = `/${subPath}`.toLowerCase();
        if (normalizedPathname === normalizedSubPath) {
          return await handleSubscriptionRequest(request, at);
        }
      }
      return new Response(JSON.stringify({ error: "Not Found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      return new Response(err.toString(), { status: 500 });
    }
  }
};
function generateQuantumultConfig(links) {
  return btoa(links.join("\n"));
}
__name(generateQuantumultConfig, "generateQuantumultConfig");
async function generateClashConfig(links, request, user) {
  const subscriptionUrl = new URL(request.url);
  subscriptionUrl.pathname = subscriptionUrl.pathname.replace(/\/sub$/, "") + "/sub";
  subscriptionUrl.searchParams.set("target", "base64");
  const encodedUrl = encodeURIComponent(subscriptionUrl.toString());
  const converterUrl = `${scu}?target=clash&url=${encodedUrl}&insert=false&emoji=true&list=false&xudp=false&udp=false&tfo=false&expand=true&scv=false&fdn=false&new_name=true`;
  try {
    const response = await fetch(converterUrl);
    if (!response.ok) {
      throw new Error("\u8BA2\u9605\u8F6C\u6362\u670D\u52A1\u5931\u8D25");
    }
    let clashConfig = await response.text();
    if (enableECH) {
      clashConfig = clashConfig.split("\n").map((line) => {
        if (/^\s*-\s*\{/.test(line) && line.includes("name:") && line.includes("server:")) {
          if (line.includes("ech-opts")) {
            return line;
          }
          const lastBraceIndex = line.lastIndexOf("}");
          if (lastBraceIndex > 0) {
            const beforeBrace = line.substring(0, lastBraceIndex).trim();
            if (beforeBrace.length > 0) {
              const echDomain = customECHDomain || "cloudflare-ech.com";
              const needsComma = !beforeBrace.endsWith(",") && !beforeBrace.endsWith("{");
              return line.substring(0, lastBraceIndex) + (needsComma ? ", " : " ") + `ech-opts: {enable: true, query-server-name: ${echDomain}}` + line.substring(lastBraceIndex);
            }
          }
        }
        return line;
      }).join("\n");
    }
    clashConfig = clashConfig.replace(/^(\s*nameserver:\s*\n)((?:\s*-\s*[^\n]+\n)*)/m, (match, header, items) => {
      const dnsServer = customDNS || "https://dns.joeyblog.eu.org/joeyblog";
      return header + `    - ${dnsServer}
`;
    });
    return clashConfig;
  } catch (e) {
    throw new Error("\u65E0\u6CD5\u83B7\u53D6 Clash \u914D\u7F6E: " + e.message);
  }
}
__name(generateClashConfig, "generateClashConfig");
function generateBase64Config(links) {
  const joinedLinks = links.join("\n");
  const utf8Bytes = encodeURIComponent(joinedLinks).replace(
    /%([0-9A-F]{2})/g,
    (match, p1) => String.fromCharCode(parseInt(p1, 16))
  );
  return btoa(utf8Bytes);
}
__name(generateBase64Config, "generateBase64Config");
var generateSurgeConfig = generateBase64Config;
var generateSSConfig = generateBase64Config;
var generateV2RayConfig = generateBase64Config;
var generateLoonConfig = generateBase64Config;
async function handleSubscriptionRequest(request, user, url = null) {
  if (!url) url = new URL(request.url);
  const finalLinks = [];
  const workerDomain = url.hostname;
  const target = url.searchParams.get("target") || "base64";
  let echConfig = null;
  if (enableECH) {
    const dnsServer = customDNS || "https://dns.joeyblog.eu.org/joeyblog";
    const echDomain = customECHDomain || "cloudflare-ech.com";
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
  __name(addNodesFromList, "addNodesFromList");
  if (currentWorkerRegion === "CUSTOM") {
    const nativeList = [{ ip: workerDomain, isp: "Native Address" }];
    await addNodesFromList(nativeList);
  } else {
    try {
      const nativeList = [{ ip: workerDomain, isp: "Native Address" }];
      await addNodesFromList(nativeList);
    } catch (error) {
      if (!currentWorkerRegion) {
        currentWorkerRegion = await detectWorkerRegion(request);
      }
      const bestBackupIP = await getBestBackupIP(currentWorkerRegion);
      if (bestBackupIP) {
        fallbackAddress = bestBackupIP.domain + ":" + bestBackupIP.port;
        const backupList = [{ ip: bestBackupIP.domain, isp: "ProxyIP-" + currentWorkerRegion }];
        await addNodesFromList(backupList);
      } else {
        const nativeList = [{ ip: workerDomain, isp: "Native Address" }];
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
      const customDomainList = customPreferredDomains.map((d) => ({ ip: d.domain, isp: d.name || d.domain }));
      await addNodesFromList(customDomainList);
    }
  } else if (!disablePreferred) {
    if (epd) {
      const domainList = directDomains.map((d) => ({ ip: d.domain, isp: d.name || d.domain }));
      await addNodesFromList(domainList);
    }
    if (epi) {
      const defaultURL = "https://raw.githubusercontent.com/qwer-search/bestip/refs/heads/main/kejilandbestip.txt";
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
            fallbackAddress = bestBackupIP.domain + ":" + bestBackupIP.port;
            const backupList = [{ ip: bestBackupIP.domain, isp: "ProxyIP-" + currentWorkerRegion }];
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
          fallbackAddress = bestBackupIP.domain + ":" + bestBackupIP.port;
          const backupList = [{ ip: bestBackupIP.domain, isp: "ProxyIP-" + currentWorkerRegion }];
          await addNodesFromList(backupList);
        }
      }
    }
  }
  if (finalLinks.length === 0) {
    const errorRemark = "\u6240\u6709\u8282\u70B9\u83B7\u53D6\u5931\u8D25";
    const proto = atob("dmxlc3M=");
    const errorLink = `${proto}://00000000-0000-0000-0000-000000000000@127.0.0.1:80?encryption=none&security=none&type=ws&host=error.com&path=%2F#${encodeURIComponent(errorRemark)}`;
    finalLinks.push(errorLink);
  }
  let subscriptionContent;
  let contentType = "text/plain; charset=utf-8";
  switch (target.toLowerCase()) {
    case atob("Y2xhc2g="):
    case atob("Y2xhc2hy"):
      subscriptionContent = await generateClashConfig(finalLinks, request, user);
      contentType = "text/yaml; charset=utf-8";
      break;
    case atob("c3VyZ2U="):
    case atob("c3VyZ2Uy"):
    case atob("c3VyZ2Uz"):
    case atob("c3VyZ2U0"):
      subscriptionContent = generateSurgeConfig(finalLinks);
      break;
    case atob("cXVhbnR1bXVsdA=="):
    case atob("cXVhbng="):
    case "quanx":
      subscriptionContent = generateQuantumultConfig(finalLinks);
      break;
    case atob("c3M="):
    case atob("c3Ny"):
      subscriptionContent = generateSSConfig(finalLinks);
      break;
    case atob("djJyYXk="):
      subscriptionContent = generateV2RayConfig(finalLinks);
      break;
    case atob("bG9vbg=="):
      subscriptionContent = generateLoonConfig(finalLinks);
      break;
    default:
      subscriptionContent = btoa(finalLinks.join("\n"));
  }
  const responseHeaders = {
    "Content-Type": contentType,
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0"
  };
  if (enableECH) {
    responseHeaders["X-ECH-Status"] = "ENABLED";
    if (echConfig) {
      responseHeaders["X-ECH-Config-Length"] = String(echConfig.length);
    }
  }
  return new Response(subscriptionContent, {
    headers: responseHeaders
  });
}
__name(handleSubscriptionRequest, "handleSubscriptionRequest");
function generateLinksFromSource(list, user, workerDomain, echConfig = null) {
  const CF_HTTP_PORTS = [80, 8080, 8880, 2052, 2082, 2086, 2095];
  const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];
  const defaultHttpsPorts = [443];
  const defaultHttpPorts = disableNonTLS ? [] : [80];
  const links = [];
  const wsPath = "/?ed=2048";
  const proto = atob("dmxlc3M=");
  list.forEach((item) => {
    let nodeNameBase = item.isp.replace(/\s/g, "_");
    if (item.colo && item.colo.trim()) {
      nodeNameBase = `${nodeNameBase}-${item.colo.trim()}`;
    }
    const safeIP = item.ip.includes(":") ? `[${item.ip}]` : item.ip;
    let portsToGenerate = [];
    if (enableDiverseProxies) {
      CF_HTTPS_PORTS.forEach((port) => {
        portsToGenerate.push({ port, tls: true });
      });
      if (!disableNonTLS) {
        CF_HTTP_PORTS.forEach((port) => {
          portsToGenerate.push({ port, tls: false });
        });
      }
    } else {
      if (item.port) {
        const port = item.port;
        if (CF_HTTPS_PORTS.includes(port)) {
          portsToGenerate.push({ port, tls: true });
        } else if (CF_HTTP_PORTS.includes(port)) {
          if (!disableNonTLS) {
            portsToGenerate.push({ port, tls: false });
          }
        } else {
          portsToGenerate.push({ port, tls: true });
        }
      } else {
        defaultHttpsPorts.forEach((port) => {
          portsToGenerate.push({ port, tls: true });
        });
        defaultHttpPorts.forEach((port) => {
          portsToGenerate.push({ port, tls: false });
        });
      }
    }
    portsToGenerate.forEach(({ port, tls }) => {
      if (tls) {
        const wsNodeName = `${nodeNameBase}-${port}-WS-TLS`;
        const wsParams = new URLSearchParams({
          encryption: "none",
          security: "tls",
          sni: workerDomain,
          fp: enableECH ? "chrome" : "randomized",
          type: "ws",
          host: workerDomain,
          path: wsPath
        });
        if (enableECH) {
          const dnsServer = customDNS || "https://dns.joeyblog.eu.org/joeyblog";
          const echDomain = customECHDomain || "cloudflare-ech.com";
          wsParams.set("alpn", "h3,h2,http/1.1");
          wsParams.set("ech", `${echDomain}+${dnsServer}`);
        }
        links.push(`${proto}://${user}@${safeIP}:${port}?${wsParams.toString()}#${encodeURIComponent(wsNodeName)}`);
      } else {
        const wsNodeName = `${nodeNameBase}-${port}-WS`;
        const wsParams = new URLSearchParams({
          encryption: "none",
          security: "none",
          type: "ws",
          host: workerDomain,
          path: wsPath
        });
        links.push(`${proto}://${user}@${safeIP}:${port}?${wsParams.toString()}#${encodeURIComponent(wsNodeName)}`);
      }
    });
  });
  return links;
}
__name(generateLinksFromSource, "generateLinksFromSource");
function generateTuicLinksFromSource(list, user, workerDomain) {
  const links = [];
  list.forEach((item) => {
    const nodeName = item.isp.replace(/\s/g, "_") + (item.colo ? `-${item.colo}` : "");
    const port = item.port || 443;
    links.push(`tuic://${user}:${user}@${item.ip}:${port}?congestion_control=bbr&alpn=h3&sni=${workerDomain}&udp_relay_mode=native&allow_insecure=1#${encodeURIComponent(nodeName)}`);
  });
  return links;
}
__name(generateTuicLinksFromSource, "generateTuicLinksFromSource");
function generateTuicLinksFromNewIPs(list, user, workerDomain) {
  const links = [];
  list.forEach((item) => {
    const nodeName = item.name.replace(/\s/g, "_");
    const port = item.port || 443;
    links.push(`tuic://${user}:${user}@${item.ip}:${port}?congestion_control=bbr&alpn=h3&sni=${workerDomain}&udp_relay_mode=native&allow_insecure=1#${encodeURIComponent(nodeName)}`);
  });
  return links;
}
__name(generateTuicLinksFromNewIPs, "generateTuicLinksFromNewIPs");
function generateHysteria2LinksFromSource(list, user, workerDomain) {
  const links = [];
  list.forEach((item) => {
    const nodeName = item.isp.replace(/\s/g, "_") + (item.colo ? `-${item.colo}` : "");
    const port = item.port || 443;
    links.push(`hy2://${user}@${item.ip}:${port}?insecure=1&sni=${workerDomain}#${encodeURIComponent(nodeName)}`);
  });
  return links;
}
__name(generateHysteria2LinksFromSource, "generateHysteria2LinksFromSource");
function generateHysteria2LinksFromNewIPs(list, user, workerDomain) {
  const links = [];
  list.forEach((item) => {
    const nodeName = item.name.replace(/\s/g, "_");
    const port = item.port || 443;
    links.push(`hy2://${user}@${item.ip}:${port}?insecure=1&sni=${workerDomain}#${encodeURIComponent(nodeName)}`);
  });
  return links;
}
__name(generateHysteria2LinksFromNewIPs, "generateHysteria2LinksFromNewIPs");
function generateVlessGrpcLinksFromSource(list, user, workerDomain) {
  const links = [];
  const serviceName = "grpc";
  const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];
  list.forEach((item) => {
    let nodeName = item.isp.replace(/\s/g, "_");
    if (item.colo && item.colo.trim()) nodeName += `-${item.colo.trim()}`;
    const port = parseInt(item.port || 443);
    if (CF_HTTPS_PORTS.includes(port)) {
      const link = `vless://${user}@${item.ip}:${port}?encryption=none&security=tls&type=grpc&serviceName=${serviceName}&sni=${workerDomain}&fp=chrome#${encodeURIComponent(nodeName + "-gRPC")}`;
      links.push(link);
    }
  });
  return links;
}
__name(generateVlessGrpcLinksFromSource, "generateVlessGrpcLinksFromSource");
function generateVlessGrpcLinksFromNewIPs(list, user, workerDomain) {
  const links = [];
  const serviceName = "grpc";
  const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];
  list.forEach((item) => {
    const nodeName = item.name.replace(/\s/g, "_");
    const port = parseInt(item.port);
    if (CF_HTTPS_PORTS.includes(port)) {
      const link = `vless://${user}@${item.ip}:${port}?encryption=none&security=tls&type=grpc&serviceName=${serviceName}&sni=${workerDomain}&fp=chrome#${encodeURIComponent(nodeName + "-gRPC")}`;
      links.push(link);
    }
  });
  return links;
}
__name(generateVlessGrpcLinksFromNewIPs, "generateVlessGrpcLinksFromNewIPs");
async function handleGrpcRequest(request) {
  if (!fallbackAddress) return new Response("No backend for gRPC", { status: 503 });
  const url = new URL(request.url);
  const { address, port } = parseAddressAndPort(fallbackAddress);
  const targetUrl = `https://${address}:${port || 443}${url.pathname}${url.search}`;
  try {
    const proxyReq = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: "follow"
    });
    const response = await fetch(proxyReq);
    return response;
  } catch (e) {
    return new Response("gRPC Proxy Error: " + e.message, { status: 502 });
  }
}
__name(handleGrpcRequest, "handleGrpcRequest");
async function generateTrojanLinksFromSource(list, user, workerDomain, echConfig = null) {
  const CF_HTTP_PORTS = [80, 8080, 8880, 2052, 2082, 2086, 2095];
  const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];
  const defaultHttpsPorts = [443];
  const defaultHttpPorts = disableNonTLS ? [] : [80];
  const links = [];
  const wsPath = "/?ed=2048";
  const password = tp || user;
  list.forEach((item) => {
    let nodeNameBase = item.isp.replace(/\s/g, "_");
    if (item.colo && item.colo.trim()) {
      nodeNameBase = `${nodeNameBase}-${item.colo.trim()}`;
    }
    const safeIP = item.ip.includes(":") ? `[${item.ip}]` : item.ip;
    let portsToGenerate = [];
    if (item.port) {
      const port = item.port;
      if (CF_HTTPS_PORTS.includes(port)) {
        portsToGenerate.push({ port, tls: true });
      } else if (CF_HTTP_PORTS.includes(port)) {
        if (!disableNonTLS) {
          portsToGenerate.push({ port, tls: false });
        }
      } else {
        portsToGenerate.push({ port, tls: true });
      }
    } else {
      defaultHttpsPorts.forEach((port) => {
        portsToGenerate.push({ port, tls: true });
      });
      defaultHttpPorts.forEach((port) => {
        portsToGenerate.push({ port, tls: false });
      });
    }
    portsToGenerate.forEach(({ port, tls }) => {
      if (tls) {
        const wsNodeName = `${nodeNameBase}-${port}-${atob("VHJvamFu")}-WS-TLS`;
        const wsParams = new URLSearchParams({
          security: "tls",
          sni: workerDomain,
          fp: "chrome",
          type: "ws",
          host: workerDomain,
          path: wsPath
        });
        if (enableECH) {
          const dnsServer = customDNS || "https://dns.joeyblog.eu.org/joeyblog";
          const echDomain = customECHDomain || "cloudflare-ech.com";
          wsParams.set("alpn", "h3,h2,http/1.1");
          wsParams.set("ech", `${echDomain}+${dnsServer}`);
        }
        links.push(`${atob("dHJvamFuOi8v")}${password}@${safeIP}:${port}?${wsParams.toString()}#${encodeURIComponent(wsNodeName)}`);
      } else {
        const wsNodeName = `${nodeNameBase}-${port}-${atob("VHJvamFu")}-WS`;
        const wsParams = new URLSearchParams({
          security: "none",
          type: "ws",
          host: workerDomain,
          path: wsPath
        });
        links.push(`${atob("dHJvamFuOi8v")}${password}@${safeIP}:${port}?${wsParams.toString()}#${encodeURIComponent(wsNodeName)}`);
      }
    });
  });
  return links;
}
__name(generateTrojanLinksFromSource, "generateTrojanLinksFromSource");
async function fetchDynamicIPs() {
  const v4Url1 = "https://www.wetest.vip/page/cloudflare/address_v4.html";
  const v6Url1 = "https://www.wetest.vip/page/cloudflare/address_v6.html";
  let results = [];
  const ipv4Enabled = getConfigValue("ipv4", "") === "" || getConfigValue("ipv4", "yes") !== "no";
  const ipv6Enabled = getConfigValue("ipv6", "") === "" || getConfigValue("ipv6", "yes") !== "no";
  const ispMobile = getConfigValue("ispMobile", "") === "" || getConfigValue("ispMobile", "yes") !== "no";
  const ispUnicom = getConfigValue("ispUnicom", "") === "" || getConfigValue("ispUnicom", "yes") !== "no";
  const ispTelecom = getConfigValue("ispTelecom", "") === "" || getConfigValue("ispTelecom", "yes") !== "no";
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
    if (results.length > 0) {
      results = results.filter((item) => {
        const isp = item.isp || "";
        if (isp.includes("\u79FB\u52A8") && !ispMobile) return false;
        if (isp.includes("\u8054\u901A") && !ispUnicom) return false;
        if (isp.includes("\u7535\u4FE1") && !ispTelecom) return false;
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
__name(fetchDynamicIPs, "fetchDynamicIPs");
async function fetchAndParseWetest(url) {
  try {
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
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
        const colo = cellMatch[3] ? cellMatch[3].trim().replace(/<.*?>/g, "") : "";
        let isp = cellMatch[1].trim().replace(/<.*?>/g, "");
        if (isp === "\u79FB\u52A8") isp = "Mobile";
        if (isp === "\u8054\u901A") isp = "Unicom";
        if (isp === "\u7535\u4FE1") isp = "Telecom";
        results.push({
          isp,
          ip: cellMatch[2].trim(),
          colo
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
__name(fetchAndParseWetest, "fetchAndParseWetest");
async function handleWsRequest(request) {
  if (!currentWorkerRegion || currentWorkerRegion === "") {
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
  const earlyData = request.headers.get(atob("c2VjLXdlYnNvY2tldC1wcm90b2NvbA==")) || "";
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
        const isVMess = evm && url.pathname.startsWith("/vm");
        const isSS = ess && url.pathname.startsWith("/ss");
        if (isVMess || isSS) {
          protocolType = isVMess ? "vmess" : "shadowsocks";
          let targetAddress = fallbackAddress;
          if (!targetAddress && currentWorkerRegion) {
            const best = await getBestBackupIP(currentWorkerRegion);
            if (best) targetAddress = best.domain + ":" + best.port;
          }
          if (targetAddress) {
            const { address, port } = parseAddressAndPort(targetAddress);
            await forwardTCP(2, address, port || 80, chunk, serverSock, null, remoteConnWrapper);
            return;
          } else {
            throw new Error("No backend configured for VMess/SS relay");
          }
        }
        if (ev && chunk.byteLength >= 24) {
          const vlessResult = parseWsPacketHeader(chunk, at);
          if (!vlessResult.hasError) {
            protocolType = "vless";
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
            protocolType = atob("dHJvamFu");
            const { addressType, port, hostname, rawClientData } = tjResult;
            await forwardTCP(addressType, hostname, port, rawClientData, serverSock, null, remoteConnWrapper);
            return;
          }
        }
        throw new Error("Invalid protocol or authentication failed");
      }
    }
  })).catch((err) => {
  });
  return new Response(null, { status: 101, webSocket: clientSock });
}
__name(handleWsRequest, "handleWsRequest");
async function forwardTCP(addrType, host, portNum, rawData, ws, respHeader, remoteConnWrapper) {
  async function connectAndSend(address, port, useSocks = false) {
    const remoteSock = useSocks ? await establishSocksConnection(addrType, address, port) : connect({ hostname: address, port });
    const writer = remoteSock.writable.getWriter();
    await writer.write(rawData);
    writer.releaseLock();
    return remoteSock;
  }
  __name(connectAndSend, "connectAndSend");
  async function retryConnection() {
    if (enableSocksDowngrade && isSocksEnabled) {
      try {
        const socksSocket = await connectAndSend(host, portNum, true);
        remoteConnWrapper.socket = socksSocket;
        socksSocket.closed.catch(() => {
        }).finally(() => closeSocketQuietly(ws));
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
          fallbackSocket.closed.catch(() => {
          }).finally(() => closeSocketQuietly(ws));
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
        fallbackSocket.closed.catch(() => {
        }).finally(() => closeSocketQuietly(ws));
        connectStreams(fallbackSocket, ws, respHeader, null);
      } catch (fallbackErr) {
        closeSocketQuietly(ws);
      }
    }
  }
  __name(retryConnection, "retryConnection");
  try {
    const initialSocket = await connectAndSend(host, portNum, enableSocksDowngrade ? false : isSocksEnabled);
    remoteConnWrapper.socket = initialSocket;
    connectStreams(initialSocket, ws, respHeader, retryConnection);
  } catch (err) {
    retryConnection();
  }
}
__name(forwardTCP, "forwardTCP");
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
  let addrIdx = portIdx + 2, addrLen = 0, addrValIdx = addrIdx + 1, hostname = "";
  const addressType = new Uint8Array(chunk.slice(addrIdx, addrValIdx))[0];
  switch (addressType) {
    case ADDRESS_TYPE_IPV4:
      addrLen = 4;
      hostname = new Uint8Array(chunk.slice(addrValIdx, addrValIdx + addrLen)).join(".");
      break;
    case ADDRESS_TYPE_URL:
      addrLen = new Uint8Array(chunk.slice(addrValIdx, addrValIdx + 1))[0];
      addrValIdx += 1;
      hostname = new TextDecoder().decode(chunk.slice(addrValIdx, addrValIdx + addrLen));
      break;
    case ADDRESS_TYPE_IPV6:
      addrLen = 16;
      const ipv6 = [];
      const ipv6View = new DataView(chunk.slice(addrValIdx, addrValIdx + addrLen));
      for (let i = 0; i < 8; i++) ipv6.push(ipv6View.getUint16(i * 2).toString(16));
      hostname = ipv6.join(":");
      break;
    default:
      return { hasError: true, message: `${E_INVALID_ADDR_TYPE}: ${addressType}` };
  }
  if (!hostname) return { hasError: true, message: `${E_EMPTY_ADDR}: ${addressType}` };
  return { hasError: false, addressType, port, hostname, isUDP, rawIndex: addrValIdx + addrLen, version };
}
__name(parseWsPacketHeader, "parseWsPacketHeader");
function makeReadableStream(socket, earlyDataHeader) {
  let cancelled = false;
  return new ReadableStream({
    start(controller) {
      socket.addEventListener("message", (event) => {
        if (!cancelled) controller.enqueue(event.data);
      });
      socket.addEventListener("close", () => {
        if (!cancelled) {
          closeSocketQuietly(socket);
          controller.close();
        }
      });
      socket.addEventListener("error", (err) => controller.error(err));
      const { earlyData, error } = base64ToArray(earlyDataHeader);
      if (error) controller.error(error);
      else if (earlyData) controller.enqueue(earlyData);
    },
    cancel() {
      cancelled = true;
      closeSocketQuietly(socket);
    }
  });
}
__name(makeReadableStream, "makeReadableStream");
async function connectStreams(remoteSocket, webSocket, headerData, retryFunc) {
  let header = headerData, hasData = false;
  await remoteSocket.readable.pipeTo(
    new WritableStream({
      async write(chunk, controller) {
        hasData = true;
        if (webSocket.readyState !== 1) controller.error(E_WS_NOT_OPEN);
        if (header) {
          webSocket.send(await new Blob([header, chunk]).arrayBuffer());
          header = null;
        } else {
          webSocket.send(chunk);
        }
      },
      abort(reason) {
      }
    })
  ).catch((error) => {
    closeSocketQuietly(webSocket);
  });
  if (!hasData && retryFunc) retryFunc();
}
__name(connectStreams, "connectStreams");
async function forwardUDP(udpChunk, webSocket, respHeader) {
  try {
    const tcpSocket = connect({ hostname: "8.8.4.4", port: 53 });
    let header = respHeader;
    const writer = tcpSocket.writable.getWriter();
    await writer.write(udpChunk);
    writer.releaseLock();
    await tcpSocket.readable.pipeTo(new WritableStream({
      async write(chunk) {
        if (webSocket.readyState === 1) {
          if (header) {
            webSocket.send(await new Blob([header, chunk]).arrayBuffer());
            header = null;
          } else {
            webSocket.send(chunk);
          }
        }
      }
    }));
  } catch (error) {
  }
}
__name(forwardUDP, "forwardUDP");
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
    const encoder2 = new TextEncoder();
    const authRequest = new Uint8Array([1, username.length, ...encoder2.encode(username), password.length, ...encoder2.encode(password)]);
    await writer.write(authRequest);
    res = (await reader.read()).value;
    if (res[0] !== 1 || res[1] !== 0) throw new Error(E_SOCKS_AUTH_FAIL);
  }
  const encoder = new TextEncoder();
  let DSTADDR;
  switch (addrType) {
    case ADDRESS_TYPE_IPV4:
      DSTADDR = new Uint8Array([1, ...address.split(".").map(Number)]);
      break;
    case ADDRESS_TYPE_URL:
      DSTADDR = new Uint8Array([3, address.length, ...encoder.encode(address)]);
      break;
    case ADDRESS_TYPE_IPV6:
      DSTADDR = new Uint8Array([4, ...address.split(":").flatMap((x) => [parseInt(x.slice(0, 2), 16), parseInt(x.slice(2), 16)])]);
      break;
    default:
      throw new Error(E_INVALID_ADDR_TYPE);
  }
  await writer.write(new Uint8Array([5, 1, 0, ...DSTADDR, port >> 8, port & 255]));
  res = (await reader.read()).value;
  if (res[1] !== 0) throw new Error(E_SOCKS_CONN_FAIL);
  writer.releaseLock();
  reader.releaseLock();
  return socket;
}
__name(establishSocksConnection, "establishSocksConnection");
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
__name(parseSocksConfig, "parseSocksConfig");
async function handleSubscriptionPage(request, user = null, remoteConfigUrl = defaultRemoteConfigUrl) {
  if (!user) user = at;
  const url = new URL(request.url);
  const cookieHeader = request.headers.get("Cookie") || "";
  let langFromCookie = null;
  if (cookieHeader) {
    const cookies = cookieHeader.split(";").map((c) => c.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith("preferredLanguage=")) {
        langFromCookie = cookie.split("=")[1];
        break;
      }
    }
  }
  let lang = "en";
  if (langFromCookie) {
    if (langFromCookie === "fa" || langFromCookie === "fa-IR") {
      lang = "fa";
    } else if (langFromCookie === "zh" || langFromCookie === "zh-CN" || langFromCookie === "zh-Hans") {
      lang = "zh";
    } else {
      lang = "en";
    }
  } else {
    const acceptLanguage = request.headers.get("Accept-Language") || "";
    const browserLang = acceptLanguage.split(",")[0].split("-")[0].toLowerCase();
    if (browserLang === "fa" || acceptLanguage.includes("fa-IR") || acceptLanguage.includes("fa")) {
      lang = "fa";
    } else if (browserLang === "zh" || acceptLanguage.includes("zh-CN") || acceptLanguage.includes("zh")) {
      lang = "zh";
    } else {
      lang = "en";
    }
  }
  const isFarsi = lang === "fa";
  const isZh = lang === "zh";
  const langAttr = isFarsi ? "fa-IR" : isZh ? "zh-CN" : "en-US";
  const translations = {
    en: {
      title: "Terminal",
      congratulations: "Congratulations, you made it!",
      enterU: "Please enter the value of your U variable",
      enterD: "Please enter the value of your D variable",
      command: "Command: connect [",
      uuid: "UUID",
      path: "PATH",
      inputU: "Enter content of U variable and press Enter...",
      inputD: "Enter content of D variable and press Enter...",
      connecting: "Connecting...",
      invading: "Invading...",
      success: "Connection successful! Returning result...",
      error: "Error: Invalid UUID format",
      reenter: "Please re-enter a valid UUID",
      // Subscription Page Translations
      subtitle: "Multi-client Support \u2022 Smart Optimization \u2022 One-Click Generation",
      selectClient: "[ Select Client ]",
      systemStatus: "[ System Status ]",
      configManagement: "[ Config Management ]",
      relatedLinks: "[ Related Links ]",
      checking: "Checking...",
      workerRegion: "Worker Region: ",
      detectionMethod: "Detection Method: ",
      proxyIPStatus: "ProxyIP Status: ",
      currentIP: "Current IP: ",
      regionMatch: "Region Match: ",
      selectionLogic: "Selection Logic: ",
      kvStatusChecking: "Checking KV Status...",
      kvEnabled: "\u2705 KV Storage Enabled, Config Management Available",
      kvDisabled: "\u26A0\uFE0F KV Storage Disabled or Not Configured",
      specifyRegion: "Specify Region (wk):",
      autoDetect: "Auto Detect",
      saveRegion: "Save Region Config",
      protocolSelection: "Protocol Selection:",
      enableVLESS: "Enable VLESS Protocol",
      enableVMess: "Enable VMess Protocol",
      enableShadowsocks: "Enable Shadowsocks Protocol",
      enableTrojan: "Enable Trojan Protocol",
      enableXhttp: "Enable xhttp Protocol",
      enableTUIC: "Enable TUIC Protocol",
      enableHysteria2: "Enable Hysteria 2 Protocol",
      enableVLESSgRPC: "Enable VLESS gRPC Protocol",
      linkOnlyHint: "Requires External Backend (Link-Only)",
      grpcHint: "Requires Custom Domain (gRPC)",
      trojanPassword: "Trojan Password (Optional):",
      customPath: "Custom Path (d):",
      customPathPlaceholder: "e.g., /secret-path",
      customIP: "Custom ProxyIP (p):",
      customIPPlaceholder: "e.g., 1.2.3.4 or proxy.example.com",
      preferredIPs: "Preferred IP List (yx):",
      preferredIPsPlaceholder: "e.g., 1.1.1.1:443#HongKong, 8.8.8.8:443#USA",
      preferredIPsURL: "Preferred IP Source URL (yxURL):",
      latencyTest: "Latency Test",
      latencyTestIP: "Test IP/Domain:",
      latencyTestIPPlaceholder: "Enter IP or Domain, comma separated",
      latencyTestPort: "Port:",
      startTest: "Start Test",
      stopTest: "Stop Test",
      testResult: "Test Result:",
      addToYx: "Add to Preferred List",
      addSelectedToYx: "Add Selected to Preferred List",
      selectAll: "Select All",
      deselectAll: "Deselect All",
      testingInProgress: "Testing...",
      testComplete: "Test Complete",
      latencyMs: "Latency (HTTP Handshake)",
      timeout: "Timeout",
      ipSource: "IP Source:",
      manualInput: "Manual Input",
      cfRandomIP: "CF Random IP",
      urlFetch: "Fetch from URL",
      randomCount: "Generate Count:",
      fetchURL: "Fetch URL:",
      fetchURLPlaceholder: "Enter URL of IP list",
      generateIP: "Generate IP",
      fetchIP: "Fetch IP",
      socks5Config: "SOCKS5 Config (s):",
      customHomepage: "Custom Homepage URL (homepage):",
      customHomepagePlaceholder: "e.g., https://example.com",
      customHomepageHint: "Set custom URL as homepage camouflage. Content of this URL will be shown when accessing root path /. Leave empty to show default terminal page.",
      customPathHint: "Only accessible via this path if set. UUID access will be disabled. Suggest using complex path to prevent scanning.",
      customIPHint: "Hide Worker real IP, or solve Cloudflare Loop issue. Supports IP:Port or Domain:Port.",
      preferredIPsHint: "Manually specify preferred nodes. Highest priority. Format: IP:Port#Remark.",
      socks5ConfigHint: "Format: user:pass@host:port. Worker will connect to target via this proxy.",
      saveConfig: "Save Config",
      advancedControl: "Advanced Control",
      subscriptionConverter: "Sub Converter URL:",
      builtinPreferred: "Built-in Preferred Type:",
      enablePreferredDomain: "Enable Preferred Domain",
      enablePreferredIP: "Enable Preferred IP",
      enableGitHubPreferred: "Enable GitHub Default Preferred",
      allowAPIManagement: "Allow API Management (ae):",
      regionMatching: "Region Matching (rm):",
      downgradeControl: "Downgrade Control (qj):",
      tlsControl: "TLS Control (dkby):",
      preferredControl: "Preferred Control (yxby):",
      saveAdvanced: "Save Advanced Config",
      loading: "Loading...",
      currentConfig: "\u{1F4CD} Current Path Config",
      refreshConfig: "Refresh Config",
      resetConfig: "Reset Config",
      subscriptionCopied: "Subscription Link Copied",
      autoSubscriptionCopied: "Auto-detected subscription link copied. Client will be recognized by User-Agent.",
      trojanPasswordPlaceholder: "Leave empty to use UUID",
      trojanPasswordHint: "Set custom Trojan password. Leave empty to use UUID. Client will auto-hash password with SHA224.",
      protocolHint: "Multiple protocols can be enabled.<br>\u2022 VLESS WS: Standard WebSocket protocol<br>\u2022 VMess WS: WebSocket-based VMess (link generation)<br>\u2022 Shadowsocks: WebSocket-based SS (link generation)<br>\u2022 Trojan: Uses SHA224 password auth<br>\u2022 xhttp: HTTP POST camouflage (requires custom domain & gRPC)",
      enableECH: "Enable ECH (Encrypted Client Hello)",
      enableECHHint: "When enabled, ECH config is fetched from DoH and added to links on every sub refresh",
      customDNS: "Custom DNS Server",
      customDNSPlaceholder: "e.g., https://dns.joeyblog.eu.org/joeyblog",
      customDNSHint: "DNS server for ECH config query (DoH format)",
      customECHDomain: "Custom ECH Domain",
      customECHDomainPlaceholder: "e.g., cloudflare-ech.com",
      customECHDomainHint: "Domain used in ECH config, leave empty for default",
      saveProtocol: "Save Protocol Config",
      subscriptionConverterPlaceholder: "Default: https://url.v1.mk/sub",
      subscriptionConverterHint: "Custom subscription converter API, leave empty for default",
      builtinPreferredHint: "Control which built-in preferred nodes are included. Default all enabled.",
      apiEnabledDefault: "Default (API Disabled)",
      apiEnabledYes: "Enable API Management",
      apiEnabledHint: "\u26A0\uFE0F Security Warning: Enabling API allows dynamic preferred IP addition. Use only if needed.",
      regionMatchingDefault: "Default (Enable Region Match)",
      regionMatchingNo: "Disable Region Match",
      regionMatchingHint: 'Smart region matching disabled when set to "Disable"',
      downgradeControlDefault: "Default (Disable Downgrade)",
      downgradeControlNo: "Enable Downgrade Mode",
      downgradeControlHint: "When enabled: CF Direct Fail -> SOCKS5 -> Fallback",
      tlsControlDefault: "Default (Keep All Nodes)",
      tlsControlYes: "TLS Nodes Only",
      tlsControlHint: 'When set to "TLS Nodes Only", non-TLS nodes (e.g., port 80) are not generated',
      preferredControlDefault: "Default (Enable Preferred)",
      preferredControlYes: "Disable Preferred",
      preferredControlHint: 'When set to "Disable Preferred", only native address is used',
      regionNames: {
        US: "\u{1F1FA}\u{1F1F8} US",
        SG: "\u{1F1F8}\u{1F1EC} Singapore",
        JP: "\u{1F1EF}\u{1F1F5} Japan",
        KR: "\u{1F1F0}\u{1F1F7} South Korea",
        DE: "\u{1F1E9}\u{1F1EA} Germany",
        SE: "\u{1F1F8}\u{1F1EA} Sweden",
        NL: "\u{1F1F3}\u{1F1F1} Netherlands",
        FI: "\u{1F1EB}\u{1F1EE} Finland",
        GB: "\u{1F1EC}\u{1F1E7} UK",
        FR: "\u{1F1EB}\u{1F1F7} France",
        CA: "\u{1F1E8}\u{1F1E6} Canada",
        AU: "\u{1F1E6}\u{1F1FA} Australia",
        HK: "\u{1F1ED}\u{1F1F0} Hong Kong",
        TW: "\u{1F1F9}\u{1F1FC} Taiwan"
      },
      terminal: "Terminal v2.9.3",
      githubProject: "GitHub Project",
      autoDetectClient: "Auto Detect",
      selectionLogicText: "Same Region -> Nearby Region -> Other Regions",
      customIPDisabledHint: "Region selection disabled when using Custom ProxyIP",
      customIPMode: "Custom ProxyIP Mode (p variable enabled)",
      customIPModeDesc: "Custom IP Mode (Region match disabled)",
      usingCustomProxyIP: "Using Custom ProxyIP: ",
      customIPConfig: " (p variable config)",
      customIPModeDisabled: "Custom IP Mode, region selection disabled",
      manualRegion: "Manual Region",
      manualRegionDesc: " (Manual)",
      proxyIPAvailable: "10/10 Available (ProxyIP Domain Pre-set)",
      smartSelection: "Smart Nearby Selection",
      sameRegionIP: "Same Region IP Available (1)",
      cloudflareDetection: "Cloudflare Built-in Detection",
      detectionFailed: "Detection Failed",
      apiTestResult: "API Detection Result: ",
      apiTestTime: "Detection Time: ",
      apiTestFailed: "API Detection Failed: ",
      unknownError: "Unknown Error",
      apiTestError: "API Test Failed: ",
      kvNotConfigured: "KV Storage not configured. Config management unavailable.\n\nPlease in Cloudflare Workers:\n1. Create KV Namespace\n2. Bind variable C\n3. Redeploy",
      kvNotEnabled: "KV Storage Not Configured",
      kvCheckFailed: "KV Check Failed: Invalid Response",
      kvCheckFailedStatus: "KV Check Failed - Status: ",
      kvCheckFailedError: "KV Check Failed - Error: "
    },
    fa: {
      title: "\u0645\u0631\u06A9\u0632 \u0627\u0634\u062A\u0631\u0627\u06A9",
      subtitle: "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0686\u0646\u062F \u06A9\u0644\u0627\u06CC\u0646\u062A \u2022 \u0627\u0646\u062A\u062E\u0627\u0628 \u0647\u0648\u0634\u0645\u0646\u062F \u2022 \u062A\u0648\u0644\u06CC\u062F \u06CC\u06A9 \u06A9\u0644\u06CC\u06A9\u06CC",
      selectClient: "[ \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0644\u0627\u06CC\u0646\u062A ]",
      systemStatus: "[ \u0648\u0636\u0639\u06CC\u062A \u0633\u06CC\u0633\u062A\u0645 ]",
      configManagement: "[ \u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u0646\u0638\u06CC\u0645\u0627\u062A ]",
      relatedLinks: "[ \u0644\u06CC\u0646\u06A9\u200C\u0647\u0627\u06CC \u0645\u0631\u062A\u0628\u0637 ]",
      checking: "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC...",
      workerRegion: "\u0645\u0646\u0637\u0642\u0647 Worker: ",
      detectionMethod: "\u0631\u0648\u0634 \u062A\u0634\u062E\u06CC\u0635: ",
      proxyIPStatus: "\u0648\u0636\u0639\u06CC\u062A ProxyIP: ",
      currentIP: "IP \u0641\u0639\u0644\u06CC: ",
      regionMatch: "\u062A\u0637\u0628\u06CC\u0642 \u0645\u0646\u0637\u0642\u0647: ",
      selectionLogic: "\u0645\u0646\u0637\u0642 \u0627\u0646\u062A\u062E\u0627\u0628: ",
      kvStatusChecking: "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC \u0648\u0636\u0639\u06CC\u062A KV...",
      kvEnabled: "\u2705 \u0630\u062E\u06CC\u0631\u0647\u200C\u0633\u0627\u0632\u06CC KV \u0641\u0639\u0627\u0644 \u0627\u0633\u062A\u060C \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC\u062F \u0627\u0632 \u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646\u06CC\u062F",
      kvDisabled: "\u26A0\uFE0F \u0630\u062E\u06CC\u0631\u0647\u200C\u0633\u0627\u0632\u06CC KV \u0641\u0639\u0627\u0644 \u0646\u06CC\u0633\u062A \u06CC\u0627 \u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC \u0646\u0634\u062F\u0647 \u0627\u0633\u062A",
      specifyRegion: "\u062A\u0639\u06CC\u06CC\u0646 \u0645\u0646\u0637\u0642\u0647 (wk):",
      autoDetect: "\u062A\u0634\u062E\u06CC\u0635 \u062E\u0648\u062F\u06A9\u0627\u0631",
      saveRegion: "\u0630\u062E\u06CC\u0631\u0647 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0645\u0646\u0637\u0642\u0647",
      protocolSelection: "\u0627\u0646\u062A\u062E\u0627\u0628 \u067E\u0631\u0648\u062A\u06A9\u0644:",
      enableVLESS: "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u067E\u0631\u0648\u062A\u06A9\u0644 VLESS",
      enableVMess: "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u067E\u0631\u0648\u062A\u06A9\u0644 VMess",
      enableShadowsocks: "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u067E\u0631\u0648\u062A\u06A9\u0644 Shadowsocks",
      enableTrojan: "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u067E\u0631\u0648\u062A\u06A9\u0644 Trojan",
      enableXhttp: "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u067E\u0631\u0648\u062A\u06A9\u0644 xhttp",
      enableTUIC: "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u067E\u0631\u0648\u062A\u06A9\u0644 TUIC",
      enableHysteria2: "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u067E\u0631\u0648\u062A\u06A9\u0644 Hysteria 2",
      enableVLESSgRPC: "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u067E\u0631\u0648\u062A\u06A9\u0644 VLESS gRPC",
      linkOnlyHint: "\u0646\u06CC\u0627\u0632 \u0628\u0647 \u0633\u0631\u0648\u0631 \u0628\u06A9\u200C\u0627\u0646\u062F (Link-Only)",
      grpcHint: "\u0646\u06CC\u0627\u0632\u0645\u0646\u062F \u062F\u0627\u0645\u0646\u0647 \u0634\u062E\u0635\u06CC (gRPC)",
      enableECH: "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC ECH (Encrypted Client Hello)",
      enableECHHint: "\u067E\u0633 \u0627\u0632 \u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC\u060C \u062F\u0631 \u0647\u0631 \u0628\u0627\u0631 \u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC \u0627\u0634\u062A\u0631\u0627\u06A9\u060C \u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC ECH \u0628\u0647\u200C\u0631\u0648\u0632 \u0628\u0647\u200C\u0637\u0648\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0627\u0632 DoH \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F\u0647 \u0648 \u0628\u0647 \u0644\u06CC\u0646\u06A9\u200C\u0647\u0627 \u0627\u0636\u0627\u0641\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F",
      customDNS: "\u0633\u0631\u0648\u0631 DNS \u0633\u0641\u0627\u0631\u0634\u06CC",
      customDNSPlaceholder: "\u0645\u062B\u0627\u0644: https://dns.joeyblog.eu.org/joeyblog",
      customDNSHint: "\u0622\u062F\u0631\u0633 \u0633\u0631\u0648\u0631 DNS \u0628\u0631\u0627\u06CC \u062C\u0633\u062A\u062C\u0648\u06CC \u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC ECH (\u0641\u0631\u0645\u062A DoH)",
      customECHDomain: "\u062F\u0627\u0645\u0646\u0647 ECH \u0633\u0641\u0627\u0631\u0634\u06CC",
      customECHDomainPlaceholder: "\u0645\u062B\u0627\u0644: cloudflare-ech.com",
      customECHDomainHint: "\u062F\u0627\u0645\u0646\u0647 \u0645\u0648\u0631\u062F \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u062F\u0631 \u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC ECH\u060C \u0627\u06AF\u0631 \u062E\u0627\u0644\u06CC \u0628\u0627\u0634\u062F \u0627\u0632 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F",
      trojanPassword: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 Trojan (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC):",
      customPath: "\u0645\u0633\u06CC\u0631 \u0633\u0641\u0627\u0631\u0634\u06CC (d):",
      customPathPlaceholder: "\u0645\u062B\u0627\u0644: /secret-path",
      customIP: "ProxyIP \u0633\u0641\u0627\u0631\u0634\u06CC (p):",
      customIPPlaceholder: "\u0645\u062B\u0627\u0644: 1.2.3.4 \u06CC\u0627 proxy.example.com",
      preferredIPs: "\u0644\u06CC\u0633\u062A IP \u062A\u0631\u062C\u06CC\u062D\u06CC (yx):",
      preferredIPsPlaceholder: "\u0645\u062B\u0627\u0644: 1.1.1.1:443#HongKong, 8.8.8.8:443#USA",
      preferredIPsURL: "URL \u0645\u0646\u0628\u0639 IP \u062A\u0631\u062C\u06CC\u062D\u06CC (yxURL):",
      latencyTest: "\u062A\u0633\u062A \u062A\u0627\u062E\u06CC\u0631",
      latencyTestIP: "IP/\u062F\u0627\u0645\u0646\u0647 \u062A\u0633\u062A:",
      latencyTestIPPlaceholder: "IP \u06CC\u0627 \u062F\u0627\u0645\u0646\u0647 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F\u060C \u0686\u0646\u062F \u0645\u0648\u0631\u062F \u0628\u0627 \u06A9\u0627\u0645\u0627 \u062C\u062F\u0627 \u0634\u0648\u0646\u062F",
      latencyTestPort: "\u067E\u0648\u0631\u062A:",
      startTest: "\u0634\u0631\u0648\u0639 \u062A\u0633\u062A",
      stopTest: "\u062A\u0648\u0642\u0641 \u062A\u0633\u062A",
      testResult: "\u0646\u062A\u06CC\u062C\u0647 \u062A\u0633\u062A:",
      addToYx: "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0644\u06CC\u0633\u062A \u062A\u0631\u062C\u06CC\u062D\u06CC",
      addSelectedToYx: "\u0627\u0641\u0632\u0648\u062F\u0646 \u0645\u0648\u0627\u0631\u062F \u0627\u0646\u062A\u062E\u0627\u0628 \u0634\u062F\u0647",
      selectAll: "\u0627\u0646\u062A\u062E\u0627\u0628 \u0647\u0645\u0647",
      deselectAll: "\u0644\u063A\u0648 \u0627\u0646\u062A\u062E\u0627\u0628",
      testingInProgress: "\u062F\u0631 \u062D\u0627\u0644 \u062A\u0633\u062A...",
      testComplete: "\u062A\u0633\u062A \u06A9\u0627\u0645\u0644 \u0634\u062F",
      latencyMs: "\u062A\u0627\u062E\u06CC\u0631 (\u0647\u0646\u062F\u0634\u06CC\u06A9)",
      timeout: "\u0632\u0645\u0627\u0646 \u062A\u0645\u0627\u0645 \u0634\u062F",
      ipSource: "\u0645\u0646\u0628\u0639 IP:",
      manualInput: "\u0648\u0631\u0648\u062F\u06CC \u062F\u0633\u062A\u06CC",
      cfRandomIP: "IP \u062A\u0635\u0627\u062F\u0641\u06CC CF",
      urlFetch: "\u062F\u0631\u06CC\u0627\u0641\u062A \u0627\u0632 URL",
      randomCount: "\u062A\u0639\u062F\u0627\u062F \u062A\u0648\u0644\u06CC\u062F:",
      fetchURL: "URL \u062F\u0631\u06CC\u0627\u0641\u062A:",
      fetchURLPlaceholder: "\u0622\u062F\u0631\u0633 URL \u0644\u06CC\u0633\u062A IP \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F",
      generateIP: "\u062A\u0648\u0644\u06CC\u062F IP",
      fetchIP: "\u062F\u0631\u06CC\u0627\u0641\u062A IP",
      socks5Config: "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A SOCKS5 (s):",
      customHomepage: "URL \u0635\u0641\u062D\u0647 \u0627\u0635\u0644\u06CC \u0633\u0641\u0627\u0631\u0634\u06CC (homepage):",
      customHomepagePlaceholder: "\u0645\u062B\u0627\u0644: https://example.com",
      customHomepageHint: "\u062A\u0646\u0638\u06CC\u0645 URL \u0633\u0641\u0627\u0631\u0634\u06CC \u0628\u0647 \u0639\u0646\u0648\u0627\u0646 \u0627\u0633\u062A\u062A\u0627\u0631 \u0635\u0641\u062D\u0647 \u0627\u0635\u0644\u06CC. \u0647\u0646\u06AF\u0627\u0645 \u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0645\u0633\u06CC\u0631 \u0627\u0635\u0644\u06CC / \u0645\u062D\u062A\u0648\u0627\u06CC \u0627\u06CC\u0646 URL \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F. \u0627\u06AF\u0631 \u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC\u062F \u0635\u0641\u062D\u0647 \u062A\u0631\u0645\u06CC\u0646\u0627\u0644 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      customPathHint: "\u067E\u0633 \u0627\u0632 \u062A\u0646\u0638\u06CC\u0645\u060C \u0641\u0642\u0637 \u0627\u0632 \u0637\u0631\u06CC\u0642 \u0627\u06CC\u0646 \u0645\u0633\u06CC\u0631 \u0642\u0627\u0628\u0644 \u062F\u0633\u062A\u0631\u0633\u06CC \u062E\u0648\u0627\u0647\u062F \u0628\u0648\u062F. \u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0645\u06CC\u200C\u0634\u0648\u062F \u0628\u0631\u0627\u06CC \u0627\u0645\u0646\u06CC\u062A \u0628\u06CC\u0634\u062A\u0631 \u0627\u0632 \u0645\u0633\u06CC\u0631 \u067E\u06CC\u0686\u06CC\u062F\u0647 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646\u06CC\u062F.",
      customIPHint: "\u0645\u062E\u0641\u06CC \u06A9\u0631\u062F\u0646 IP \u0627\u0635\u0644\u06CC Worker \u06CC\u0627 \u062D\u0644 \u0645\u0634\u06A9\u0644 Cloudflare Loop. \u0641\u0631\u0645\u062A: IP:Port \u06CC\u0627 Domain:Port.",
      preferredIPsHint: "\u062A\u0639\u06CC\u06CC\u0646 \u062F\u0633\u062A\u06CC \u0646\u0648\u062F\u0647\u0627\u06CC \u062A\u0631\u062C\u06CC\u062D\u06CC. \u0628\u0627\u0644\u0627\u062A\u0631\u06CC\u0646 \u0627\u0648\u0644\u0648\u06CC\u062A. \u0641\u0631\u0645\u062A: IP:Port#\u062A\u0648\u0636\u06CC\u062D\u0627\u062A.",
      socks5ConfigHint: "\u0641\u0631\u0645\u062A: user:pass@host:port. Worker \u0627\u0632 \u0637\u0631\u06CC\u0642 \u0627\u06CC\u0646 \u067E\u0631\u0648\u06A9\u0633\u06CC \u0628\u0647 \u0647\u062F\u0641 \u0645\u062A\u0635\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      saveConfig: "\u0630\u062E\u06CC\u0631\u0647 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A",
      advancedControl: "\u06A9\u0646\u062A\u0631\u0644 \u067E\u06CC\u0634\u0631\u0641\u062A\u0647",
      subscriptionConverter: "\u0622\u062F\u0631\u0633 \u062A\u0628\u062F\u06CC\u0644 \u0627\u0634\u062A\u0631\u0627\u06A9:",
      builtinPreferred: "\u0646\u0648\u0639 \u062A\u0631\u062C\u06CC\u062D\u06CC \u062F\u0627\u062E\u0644\u06CC:",
      enablePreferredDomain: "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u062F\u0627\u0645\u0646\u0647 \u062A\u0631\u062C\u06CC\u062D\u06CC",
      enablePreferredIP: "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC IP \u062A\u0631\u062C\u06CC\u062D\u06CC",
      enableGitHubPreferred: "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u062A\u0631\u062C\u06CC\u062D \u067E\u06CC\u0634\u200C\u0641\u0631\u0636 GitHub",
      enableDiverseProxies: "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u06AF\u0631\u0647\u200C\u0647\u0627\u06CC \u0686\u0646\u062F\u067E\u0648\u0631\u062A\u06CC (\u062A\u0648\u0644\u06CC\u062F \u0647\u0645\u0647 \u067E\u0648\u0631\u062A\u200C\u0647\u0627)",
      enableDiverseProxiesHint: "\u0628\u0631\u0627\u06CC \u0647\u0631 IP \u0647\u0645\u0647 \u067E\u0648\u0631\u062A\u200C\u0647\u0627\u06CC \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC\u200C\u0634\u062F\u0647 (80\u060C 443\u060C 2053 \u0648 ...) \u0631\u0627 \u062A\u0648\u0644\u06CC\u062F \u0645\u06CC\u200C\u06A9\u0646\u062F.",
      allowAPIManagement: "\u0627\u062C\u0627\u0632\u0647 \u0645\u062F\u06CC\u0631\u06CC\u062A API (ae):",
      regionMatching: "\u062A\u0637\u0628\u06CC\u0642 \u0645\u0646\u0637\u0642\u0647 (rm):",
      downgradeControl: "\u06A9\u0646\u062A\u0631\u0644 \u06A9\u0627\u0647\u0634 \u0633\u0637\u062D (qj):",
      tlsControl: "\u06A9\u0646\u062A\u0631\u0644 TLS (dkby):",
      preferredControl: "\u06A9\u0646\u062A\u0631\u0644 \u062A\u0631\u062C\u06CC\u062D\u06CC (yxby):",
      saveAdvanced: "\u0630\u062E\u06CC\u0631\u0647 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u067E\u06CC\u0634\u0631\u0641\u062A\u0647",
      loading: "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC...",
      currentConfig: "\u{1F4CD} \u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC \u0645\u0633\u06CC\u0631 \u0641\u0639\u0644\u06CC",
      refreshConfig: "\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC \u062A\u0646\u0638\u06CC\u0645\u0627\u062A",
      resetConfig: "\u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC \u062A\u0646\u0638\u06CC\u0645\u0627\u062A",
      subscriptionCopied: "\u0644\u06CC\u0646\u06A9 \u0627\u0634\u062A\u0631\u0627\u06A9 \u06A9\u067E\u06CC \u0634\u062F",
      autoSubscriptionCopied: "\u0644\u06CC\u0646\u06A9 \u0627\u0634\u062A\u0631\u0627\u06A9 \u062A\u0634\u062E\u06CC\u0635 \u062E\u0648\u062F\u06A9\u0627\u0631 \u06A9\u067E\u06CC \u0634\u062F\u060C \u06A9\u0644\u0627\u06CC\u0646\u062A \u0647\u0646\u06AF\u0627\u0645 \u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0631 \u0627\u0633\u0627\u0633 User-Agent \u0628\u0647 \u0637\u0648\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u062A\u0634\u062E\u06CC\u0635 \u062F\u0627\u062F\u0647 \u0648 \u0642\u0627\u0644\u0628 \u0645\u0631\u0628\u0648\u0637\u0647 \u0631\u0627 \u0628\u0631\u0645\u06CC\u200C\u06AF\u0631\u062F\u0627\u0646\u062F",
      trojanPasswordPlaceholder: "\u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC\u062F \u062A\u0627 \u0627\u0632 UUID \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0634\u0648\u062F",
      trojanPasswordHint: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 Trojan \u0633\u0641\u0627\u0631\u0634\u06CC \u0631\u0627 \u062A\u0646\u0638\u06CC\u0645 \u06A9\u0646\u06CC\u062F. \u0627\u06AF\u0631 \u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC\u062F \u0627\u0632 UUID \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F. \u06A9\u0644\u0627\u06CC\u0646\u062A \u0628\u0647 \u0637\u0648\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0631\u0627 \u0628\u0627 SHA224 \u0647\u0634 \u0645\u06CC\u200C\u06A9\u0646\u062F.",
      protocolHint: "\u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC\u062F \u0686\u0646\u062F\u06CC\u0646 \u067E\u0631\u0648\u062A\u06A9\u0644 \u0631\u0627 \u0647\u0645\u0632\u0645\u0627\u0646 \u0641\u0639\u0627\u0644 \u06A9\u0646\u06CC\u062F. \u0627\u0634\u062A\u0631\u0627\u06A9 \u06AF\u0631\u0647\u200C\u0647\u0627\u06CC \u067E\u0631\u0648\u062A\u06A9\u0644\u200C\u0647\u0627\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u0634\u062F\u0647 \u0631\u0627 \u062A\u0648\u0644\u06CC\u062F \u0645\u06CC\u200C\u06A9\u0646\u062F.<br>\u2022 VLESS WS: \u067E\u0631\u0648\u062A\u06A9\u0644 \u0627\u0633\u062A\u0627\u0646\u062F\u0627\u0631\u062F \u0645\u0628\u062A\u0646\u06CC \u0628\u0631 WebSocket<br>\u2022 VMess WS: \u067E\u0631\u0648\u062A\u06A9\u0644 VMess \u0645\u0628\u062A\u0646\u06CC \u0628\u0631 WebSocket (\u062A\u0648\u0644\u06CC\u062F \u0644\u06CC\u0646\u06A9)<br>\u2022 Shadowsocks: \u067E\u0631\u0648\u062A\u06A9\u0644 SS \u0645\u0628\u062A\u0646\u06CC \u0628\u0631 WebSocket (\u062A\u0648\u0644\u06CC\u062F \u0644\u06CC\u0646\u06A9)<br>\u2022 Trojan: \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A \u0628\u0627 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 SHA224<br>\u2022 xhttp: \u067E\u0631\u0648\u062A\u06A9\u0644 \u0627\u0633\u062A\u062A\u0627\u0631 \u0645\u0628\u062A\u0646\u06CC \u0628\u0631 HTTP POST (\u0646\u06CC\u0627\u0632 \u0628\u0647 \u0627\u062A\u0635\u0627\u0644 \u062F\u0627\u0645\u0646\u0647 \u0633\u0641\u0627\u0631\u0634\u06CC \u0648 \u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC gRPC \u062F\u0627\u0631\u062F)",
      saveProtocol: "\u0630\u062E\u06CC\u0631\u0647 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u067E\u0631\u0648\u062A\u06A9\u0644",
      subscriptionConverterPlaceholder: "\u067E\u06CC\u0634\u200C\u0641\u0631\u0636: https://url.v1.mk/sub",
      subscriptionConverterHint: "\u0622\u062F\u0631\u0633 API \u062A\u0628\u062F\u06CC\u0644 \u0627\u0634\u062A\u0631\u0627\u06A9 \u0633\u0641\u0627\u0631\u0634\u06CC\u060C \u0627\u06AF\u0631 \u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC\u062F \u0627\u0632 \u0622\u062F\u0631\u0633 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F",
      builtinPreferredHint: "\u06A9\u0646\u062A\u0631\u0644 \u0627\u06CC\u0646\u06A9\u0647 \u06A9\u062F\u0627\u0645 \u06AF\u0631\u0647\u200C\u0647\u0627\u06CC \u062A\u0631\u062C\u06CC\u062D\u06CC \u062F\u0627\u062E\u0644\u06CC \u062F\u0631 \u0627\u0634\u062A\u0631\u0627\u06A9 \u06AF\u0646\u062C\u0627\u0646\u062F\u0647 \u0634\u0648\u0646\u062F. \u0628\u0647 \u0637\u0648\u0631 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636 \u0647\u0645\u0647 \u0641\u0639\u0627\u0644 \u0647\u0633\u062A\u0646\u062F.",
      apiEnabledDefault: "\u067E\u06CC\u0634\u200C\u0641\u0631\u0636 (API \u063A\u06CC\u0631\u0641\u0639\u0627\u0644)",
      apiEnabledYes: "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0645\u062F\u06CC\u0631\u06CC\u062A API",
      apiEnabledHint: "\u26A0\uFE0F \u0647\u0634\u062F\u0627\u0631 \u0627\u0645\u0646\u06CC\u062A\u06CC: \u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0627\u06CC\u0646 \u06AF\u0632\u06CC\u0646\u0647 \u0627\u062C\u0627\u0632\u0647 \u0645\u06CC\u200C\u062F\u0647\u062F IP \u0647\u0627\u06CC \u062A\u0631\u062C\u06CC\u062D\u06CC \u0627\u0632 \u0637\u0631\u06CC\u0642 API \u0628\u0647 \u0637\u0648\u0631 \u067E\u0648\u06CC\u0627 \u0627\u0636\u0627\u0641\u0647 \u0634\u0648\u0646\u062F. \u062A\u0648\u0635\u06CC\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F \u0641\u0642\u0637 \u062F\u0631 \u0635\u0648\u0631\u062A \u0646\u06CC\u0627\u0632 \u0641\u0639\u0627\u0644 \u06A9\u0646\u06CC\u062F.",
      regionMatchingDefault: "\u067E\u06CC\u0634\u200C\u0641\u0631\u0636 (\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u062A\u0637\u0628\u06CC\u0642 \u0645\u0646\u0637\u0642\u0647)",
      regionMatchingNo: "\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u06A9\u0631\u062F\u0646 \u062A\u0637\u0628\u06CC\u0642 \u0645\u0646\u0637\u0642\u0647",
      regionMatchingHint: '\u0648\u0642\u062A\u06CC "\u0628\u0633\u062A\u0646" \u062A\u0646\u0638\u06CC\u0645 \u0634\u0648\u062F\u060C \u062A\u0637\u0628\u06CC\u0642 \u0647\u0648\u0634\u0645\u0646\u062F \u0645\u0646\u0637\u0642\u0647 \u0627\u0646\u062C\u0627\u0645 \u0646\u0645\u06CC\u200C\u0634\u0648\u062F',
      downgradeControlDefault: "\u067E\u06CC\u0634\u200C\u0641\u0631\u0636 (\u0639\u062F\u0645 \u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u06A9\u0627\u0647\u0634 \u0633\u0637\u062D)",
      downgradeControlNo: "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u062D\u0627\u0644\u062A \u06A9\u0627\u0647\u0634 \u0633\u0637\u062D",
      downgradeControlHint: '\u0648\u0642\u062A\u06CC "\u0641\u0639\u0627\u0644" \u062A\u0646\u0638\u06CC\u0645 \u0634\u0648\u062F: \u0627\u062A\u0635\u0627\u0644 \u0645\u0633\u062A\u0642\u06CC\u0645 CF \u0646\u0627\u0645\u0648\u0641\u0642 \u2192 \u0627\u062A\u0635\u0627\u0644 SOCKS5 \u2192 \u0622\u062F\u0631\u0633 fallback',
      tlsControlDefault: "\u067E\u06CC\u0634\u200C\u0641\u0631\u0636 (\u062D\u0641\u0638 \u0647\u0645\u0647 \u06AF\u0631\u0647\u200C\u0647\u0627)",
      tlsControlYes: "\u0641\u0642\u0637 \u06AF\u0631\u0647\u200C\u0647\u0627\u06CC TLS",
      tlsControlHint: '\u0648\u0642\u062A\u06CC "\u0641\u0642\u0637 \u06AF\u0631\u0647\u200C\u0647\u0627\u06CC TLS" \u062A\u0646\u0638\u06CC\u0645 \u0634\u0648\u062F\u060C \u0641\u0642\u0637 \u06AF\u0631\u0647\u200C\u0647\u0627\u06CC \u0628\u0627 TLS \u062A\u0648\u0644\u06CC\u062F \u0645\u06CC\u200C\u0634\u0648\u0646\u062F\u060C \u06AF\u0631\u0647\u200C\u0647\u0627\u06CC \u063A\u06CC\u0631 TLS (\u0645\u0627\u0646\u0646\u062F \u067E\u0648\u0631\u062A 80) \u062A\u0648\u0644\u06CC\u062F \u0646\u0645\u06CC\u200C\u0634\u0648\u0646\u062F',
      preferredControlDefault: "\u067E\u06CC\u0634\u200C\u0641\u0631\u0636 (\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u062A\u0631\u062C\u06CC\u062D)",
      preferredControlYes: "\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u06A9\u0631\u062F\u0646 \u0627\u0648\u0644\u0648\u06CC\u062A",
      preferredControlHint: '\u0648\u0642\u062A\u06CC "\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u06A9\u0631\u062F\u0646 \u0627\u0648\u0644\u0648\u06CC\u062A" \u062A\u0646\u0638\u06CC\u0645 \u0634\u0648\u062F\u060C \u0641\u0642\u0637 \u0627\u0632 \u0622\u062F\u0631\u0633 \u0627\u0635\u0644\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F\u060C \u06AF\u0631\u0647\u200C\u0647\u0627\u06CC IP \u0648 \u062F\u0627\u0645\u0646\u0647 \u062A\u0631\u062C\u06CC\u062D\u06CC \u062A\u0648\u0644\u06CC\u062F \u0646\u0645\u06CC\u200C\u0634\u0648\u0646\u062F',
      regionNames: {
        US: "\u{1F1FA}\u{1F1F8} \u0622\u0645\u0631\u06CC\u06A9\u0627",
        SG: "\u{1F1F8}\u{1F1EC} \u0633\u0646\u06AF\u0627\u067E\u0648\u0631",
        JP: "\u{1F1EF}\u{1F1F5} \u0698\u0627\u067E\u0646",
        KR: "\u{1F1F0}\u{1F1F7} \u06A9\u0631\u0647 \u062C\u0646\u0648\u0628\u06CC",
        DE: "\u{1F1E9}\u{1F1EA} \u0622\u0644\u0645\u0627\u0646",
        SE: "\u{1F1F8}\u{1F1EA} \u0633\u0648\u0626\u062F",
        NL: "\u{1F1F3}\u{1F1F1} \u0647\u0644\u0646\u062F",
        FI: "\u{1F1EB}\u{1F1EE} \u0641\u0646\u0644\u0627\u0646\u062F",
        GB: "\u{1F1EC}\u{1F1E7} \u0628\u0631\u06CC\u062A\u0627\u0646\u06CC\u0627",
        FR: "\u{1F1EB}\u{1F1F7} \u0641\u0631\u0627\u0646\u0633\u0647",
        CA: "\u{1F1E8}\u{1F1E6} \u06A9\u0627\u0646\u0627\u062F\u0627",
        AU: "\u{1F1E6}\u{1F1FA} \u0627\u0633\u062A\u0631\u0627\u0644\u06CC\u0627",
        HK: "\u{1F1ED}\u{1F1F0} \u0647\u0646\u06AF \u06A9\u0646\u06AF",
        TW: "\u{1F1F9}\u{1F1FC} \u062A\u0627\u06CC\u0648\u0627\u0646"
      },
      terminal: "\u062A\u0631\u0645\u06CC\u0646\u0627\u0644 v2.9.3",
      githubProject: "\u067E\u0631\u0648\u0698\u0647 GitHub",
      autoDetectClient: "\u062A\u0634\u062E\u06CC\u0635 \u062E\u0648\u062F\u06A9\u0627\u0631",
      selectionLogicText: "\u0647\u0645\u200C\u0645\u0646\u0637\u0642\u0647 \u2192 \u0645\u0646\u0637\u0642\u0647 \u0645\u062C\u0627\u0648\u0631 \u2192 \u0633\u0627\u06CC\u0631 \u0645\u0646\u0627\u0637\u0642",
      customIPDisabledHint: "\u0647\u0646\u06AF\u0627\u0645 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0627\u0632 ProxyIP \u0633\u0641\u0627\u0631\u0634\u06CC\u060C \u0627\u0646\u062A\u062E\u0627\u0628 \u0645\u0646\u0637\u0642\u0647 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0627\u0633\u062A",
      customIPMode: "\u062D\u0627\u0644\u062A ProxyIP \u0633\u0641\u0627\u0631\u0634\u06CC (\u0645\u062A\u063A\u06CC\u0631 p \u0641\u0639\u0627\u0644 \u0627\u0633\u062A)",
      customIPModeDesc: "\u062D\u0627\u0644\u062A IP \u0633\u0641\u0627\u0631\u0634\u06CC (\u062A\u0637\u0628\u06CC\u0642 \u0645\u0646\u0637\u0642\u0647 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0627\u0633\u062A)",
      usingCustomProxyIP: "\u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0627\u0632 ProxyIP \u0633\u0641\u0627\u0631\u0634\u06CC: ",
      customIPConfig: " (\u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC \u0645\u062A\u063A\u06CC\u0631 p)",
      customIPModeDisabled: "\u062D\u0627\u0644\u062A IP \u0633\u0641\u0627\u0631\u0634\u06CC\u060C \u0627\u0646\u062A\u062E\u0627\u0628 \u0645\u0646\u0637\u0642\u0647 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0627\u0633\u062A",
      manualRegion: "\u062A\u0639\u06CC\u06CC\u0646 \u0645\u0646\u0637\u0642\u0647 \u062F\u0633\u062A\u06CC",
      manualRegionDesc: " (\u062A\u0639\u06CC\u06CC\u0646 \u062F\u0633\u062A\u06CC)",
      proxyIPAvailable: "10/10 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 (\u062F\u0627\u0645\u0646\u0647 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636 ProxyIP \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0627\u0633\u062A)",
      smartSelection: "\u0627\u0646\u062A\u062E\u0627\u0628 \u0647\u0648\u0634\u0645\u0646\u062F \u0646\u0632\u062F\u06CC\u06A9 \u062F\u0631 \u062D\u0627\u0644 \u0627\u0646\u062C\u0627\u0645 \u0627\u0633\u062A",
      sameRegionIP: "IP \u0647\u0645\u200C\u0645\u0646\u0637\u0642\u0647 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0627\u0633\u062A (1)",
      cloudflareDetection: "\u062A\u0634\u062E\u06CC\u0635 \u062F\u0627\u062E\u0644\u06CC Cloudflare",
      detectionFailed: "\u062A\u0634\u062E\u06CC\u0635 \u0646\u0627\u0645\u0648\u0641\u0642",
      apiTestResult: "\u0646\u062A\u06CC\u062C\u0647 \u062A\u0634\u062E\u06CC\u0635 API: ",
      apiTestTime: "\u0632\u0645\u0627\u0646 \u062A\u0634\u062E\u06CC\u0635: ",
      apiTestFailed: "\u062A\u0634\u062E\u06CC\u0635 API \u0646\u0627\u0645\u0648\u0641\u0642: ",
      unknownError: "\u062E\u0637\u0627\u06CC \u0646\u0627\u0634\u0646\u0627\u062E\u062A\u0647",
      apiTestError: "\u062A\u0633\u062A API \u0646\u0627\u0645\u0648\u0641\u0642: ",
      kvNotConfigured: "\u0630\u062E\u06CC\u0631\u0647\u200C\u0633\u0627\u0632\u06CC KV \u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC \u0646\u0634\u062F\u0647 \u0627\u0633\u062A\u060C \u0646\u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC\u062F \u0627\u0632 \u0639\u0645\u0644\u06A9\u0631\u062F \u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646\u06CC\u062F.\\n\\n\u0644\u0637\u0641\u0627\u064B \u062F\u0631 Cloudflare Workers:\\n1. \u0641\u0636\u0627\u06CC \u0646\u0627\u0645 KV \u0627\u06CC\u062C\u0627\u062F \u06A9\u0646\u06CC\u062F\\n2. \u0645\u062A\u063A\u06CC\u0631 \u0645\u062D\u06CC\u0637\u06CC C \u0631\u0627 \u067E\u06CC\u0648\u0646\u062F \u062F\u0647\u06CC\u062F\\n3. \u06A9\u062F \u0631\u0627 \u062F\u0648\u0628\u0627\u0631\u0647 \u0645\u0633\u062A\u0642\u0631 \u06A9\u0646\u06CC\u062F",
      kvNotEnabled: "\u0630\u062E\u06CC\u0631\u0647\u200C\u0633\u0627\u0632\u06CC KV \u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC \u0646\u0634\u062F\u0647 \u0627\u0633\u062A",
      kvCheckFailed: "\u0628\u0631\u0631\u0633\u06CC \u0630\u062E\u06CC\u0631\u0647\u200C\u0633\u0627\u0632\u06CC KV \u0646\u0627\u0645\u0648\u0641\u0642: \u062E\u0637\u0627\u06CC \u0641\u0631\u0645\u062A \u067E\u0627\u0633\u062E",
      kvCheckFailedStatus: "\u0628\u0631\u0631\u0633\u06CC \u0630\u062E\u06CC\u0631\u0647\u200C\u0633\u0627\u0632\u06CC KV \u0646\u0627\u0645\u0648\u0641\u0642 - \u06A9\u062F \u0648\u0636\u0639\u06CC\u062A: ",
      kvCheckFailedError: "\u0628\u0631\u0631\u0633\u06CC \u0630\u062E\u06CC\u0631\u0647\u200C\u0633\u0627\u0632\u06CC KV \u0646\u0627\u0645\u0648\u0641\u0642 - \u062E\u0637\u0627: ",
      preferredIPsURLPlaceholder: "\u0645\u062B\u0627\u0644: https://example.com/ips.txt",
      preferredIPsURLHint: "\u0627\u0633\u062A\u062E\u0631\u0627\u062C IP\u0647\u0627\u06CC \u062A\u0631\u062C\u06CC\u062D\u06CC \u0627\u0632 URL (\u0645\u062A\u0646 \u0633\u0627\u062F\u0647 \u06CC\u0627 CSV).",
      preferredIPFilterTitle: "\u0641\u06CC\u0644\u062A\u0631 IP\u0647\u0627\u06CC \u0627\u0648\u0644\u0648\u06CC\u062A\u200C\u062F\u0627\u0631",
      ipVersionSelection: "\u0646\u0633\u062E\u0647 IP",
      ispSelection: "\u0627\u067E\u0631\u0627\u062A\u0648\u0631",
      ispMobile: "\u0647\u0645\u0631\u0627\u0647",
      ispUnicom: "\u06CC\u0648\u0646\u06CC\u06A9\u0627\u0645",
      ispTelecom: "\u062A\u0644\u06A9\u0627\u0645",
      ipFilterHint: "\u0641\u06CC\u0644\u062A\u0631\u0647\u0627 \u0641\u0642\u0637 \u0631\u0648\u06CC \u0644\u06CC\u0633\u062A\u200C\u0647\u0627\u06CC \u062F\u0631\u06CC\u0627\u0641\u062A\u200C\u0634\u062F\u0647 \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F\u061B \u0648\u0631\u0648\u062F\u06CC \u062F\u0633\u062A\u06CC \u062A\u063A\u06CC\u06CC\u0631\u06CC \u0646\u0645\u06CC\u200C\u06A9\u0646\u062F.",
      threadsLabel: "\u0631\u0634\u062A\u0647\u200C\u0647\u0627",
      cityFilterAll: "\u0647\u0645\u0647 \u0634\u0647\u0631\u0647\u0627",
      cityFilterFastest10: "\u06F1\u06F0 \u0645\u0648\u0631\u062F \u0633\u0631\u06CC\u0639\u200C\u062A\u0631",
      overwriteAdd: "\u0628\u0627\u0632\u0646\u0648\u06CC\u0633\u06CC",
      appendAdd: "\u0627\u0641\u0632\u0648\u062F\u0646",
      socks5ConfigPlaceholder: "\u0645\u062B\u0627\u0644: user:pass@host:port",
      generated: "\u062A\u0648\u0644\u06CC\u062F \u0634\u062F:",
      cfRandomIPs: "IP \u062A\u0635\u0627\u062F\u0641\u06CC CF",
      pleaseEnterUrl: "\u0644\u0637\u0641\u0627\u064B URL \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F",
      fetching: "\u062F\u0631 \u062D\u0627\u0644 \u062F\u0631\u06CC\u0627\u0641\u062A...",
      fetched: "\u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F:",
      ipCountSuffix: "\u0622\u06CC\u200C\u067E\u06CC",
      noDataFound: "\u062F\u0627\u062F\u0647\u200C\u0627\u06CC \u06CC\u0627\u0641\u062A \u0646\u0634\u062F",
      fetchFailed: "\u062F\u0631\u06CC\u0627\u0641\u062A \u0646\u0627\u0645\u0648\u0641\u0642",
      pleaseEnterIPOrDomain: "\u0644\u0637\u0641\u0627\u064B IP \u06CC\u0627 \u062F\u0627\u0645\u0646\u0647 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F",
      testing: "\u062F\u0631 \u062D\u0627\u0644 \u062A\u0633\u062A",
      testStopped: "\u062A\u0633\u062A \u0645\u062A\u0648\u0642\u0641 \u0634\u062F",
      selectAtLeastOne: "\u0644\u0637\u0641\u0627\u064B \u062D\u062F\u0627\u0642\u0644 \u06CC\u06A9 \u06AF\u0632\u06CC\u0646\u0647 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F",
      saving: "\u062F\u0631 \u062D\u0627\u0644 \u0630\u062E\u06CC\u0631\u0647...",
      overwritten: "\u0628\u0627\u0632\u0646\u0648\u06CC\u0633\u06CC \u0634\u062F:",
      itemsSaved: " \u0645\u0648\u0631\u062F",
      appended: "\u0627\u0641\u0632\u0648\u062F\u0647 \u0634\u062F:",
      saveFailed: "\u0630\u062E\u06CC\u0631\u0647 \u0646\u0627\u0645\u0648\u0641\u0642",
      timeoutLabel: "\u0632\u0645\u0627\u0646 \u062A\u0645\u0627\u0645 \u0634\u062F",
      configNotConfigured: "\u0630\u062E\u06CC\u0631\u0647\u200C\u0633\u0627\u0632\u06CC KV \u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC \u0646\u0634\u062F\u0647 \u0627\u0633\u062A\u060C \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0645\u0645\u06A9\u0646 \u0646\u06CC\u0633\u062A.",
      configLoadFailed: "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0646\u0627\u0645\u0648\u0641\u0642 \u0628\u0648\u062F",
      configLoadFailedStatus: "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0646\u0627\u0645\u0648\u0641\u0642: ",
      currentConfigLabel: "\u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC \u0641\u0639\u0644\u06CC:\\n",
      currentConfigEmpty: "(\u0628\u062F\u0648\u0646 \u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC)",
      currentConfigUnset: "(\u062A\u0646\u0638\u06CC\u0645 \u0646\u0634\u062F\u0647)",
      pathTypeCustom: "\u0646\u0648\u0639 \u0627\u0633\u062A\u0641\u0627\u062F\u0647: \u0645\u0633\u06CC\u0631 \u0633\u0641\u0627\u0631\u0634\u06CC (d)",
      pathTypeUUID: "\u0646\u0648\u0639 \u0627\u0633\u062A\u0641\u0627\u062F\u0647: \u0645\u0633\u06CC\u0631 UUID (u)",
      currentPathLabel: "\u0645\u0633\u06CC\u0631 \u0641\u0639\u0644\u06CC",
      accessUrlLabel: "\u0622\u062F\u0631\u0633 \u062F\u0633\u062A\u0631\u0633\u06CC",
      echStatusLabel: "\u0648\u0636\u0639\u06CC\u062A ECH:",
      statusEnabled: "\u0641\u0639\u0627\u0644",
      statusDisabled: "\u063A\u06CC\u0631\u0641\u0639\u0627\u0644",
      statusCheckFailed: "\u0628\u0631\u0631\u0633\u06CC \u0646\u0627\u0645\u0648\u0641\u0642",
      configLengthLabel: "\u0637\u0648\u0644 \u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC",
      debugConsoleTitle: "\u06A9\u0646\u0633\u0648\u0644 \u0627\u0634\u06A9\u0627\u0644\u200C\u0632\u062F\u0627\u06CC\u06CC",
      debugShow: "\u0646\u0645\u0627\u06CC\u0634",
      debugHide: "\u067E\u0646\u0647\u0627\u0646",
      debugReady: "\u06A9\u0646\u0633\u0648\u0644 \u0622\u0645\u0627\u062F\u0647 \u0627\u0633\u062A",
      debugUnknownError: "\u062E\u0637\u0627\u06CC \u0646\u0627\u0634\u0646\u0627\u062E\u062A\u0647",
      debugUnhandledPromise: "\u0631\u062F Promise \u0628\u062F\u0648\u0646 \u0645\u062F\u06CC\u0631\u06CC\u062A",
      kvNotConfiguredSave: "KV \u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC \u0646\u0634\u062F\u0647 \u0627\u0633\u062A\u060C \u0630\u062E\u06CC\u0631\u0647 \u0645\u0645\u06A9\u0646 \u0646\u06CC\u0633\u062A. \u0644\u0637\u0641\u0627\u064B \u062F\u0631 Cloudflare Workers KV \u0631\u0627 \u062A\u0646\u0638\u06CC\u0645 \u06A9\u0646\u06CC\u062F.",
      kvNotConfiguredReset: "KV \u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC \u0646\u0634\u062F\u0647 \u0627\u0633\u062A\u060C \u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC \u0645\u0645\u06A9\u0646 \u0646\u06CC\u0633\u062A.",
      resetConfirm: "\u0622\u06CC\u0627 \u0645\u0637\u0645\u0626\u0646 \u0647\u0633\u062A\u06CC\u062F \u06A9\u0647 \u0647\u0645\u0647 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC \u0634\u0648\u0646\u062F\u061F \u0627\u06CC\u0646 \u06A9\u0627\u0631 KV \u0631\u0627 \u067E\u0627\u06A9 \u06A9\u0631\u062F\u0647 \u0648 \u0628\u0647 \u0645\u062A\u063A\u06CC\u0631\u0647\u0627\u06CC \u0645\u062D\u06CC\u0637\u06CC \u0628\u0631\u0645\u06CC\u200C\u06AF\u0631\u062F\u0627\u0646\u062F.",
      resetFailed: "\u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC \u0646\u0627\u0645\u0648\u0641\u0642",
      resetSuccess: "\u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC \u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC \u0634\u062F",
      unknown: "\u0646\u0627\u0645\u0634\u062E\u0635"
    }
  };
  translations.fa = Object.assign({}, translations.en, translations.fa);
  translations.zh = Object.assign({}, translations.en, {
    title: "\u7EC8\u7AEF",
    terminal: "\u7EC8\u7AEF v2.9.3",
    congratulations: "\u606D\u559C\uFF0C\u4F60\u6210\u529F\u4E86\uFF01",
    enterU: "\u8BF7\u8F93\u5165\u4F60\u7684 U \u53D8\u91CF\u7684\u503C",
    enterD: "\u8BF7\u8F93\u5165\u4F60\u7684 D \u53D8\u91CF\u7684\u503C",
    command: "\u547D\u4EE4\uFF1Aconnect [",
    uuid: "UUID",
    path: "\u8DEF\u5F84",
    inputU: "\u8F93\u5165 U \u53D8\u91CF\u5185\u5BB9\u5E76\u56DE\u8F66...",
    inputD: "\u8F93\u5165 D \u53D8\u91CF\u5185\u5BB9\u5E76\u56DE\u8F66...",
    connecting: "\u8FDE\u63A5\u4E2D...",
    invading: "\u6B63\u5728\u8FDE\u63A5...",
    success: "\u8FDE\u63A5\u6210\u529F\uFF01\u6B63\u5728\u8FD4\u56DE\u7ED3\u679C...",
    error: "\u9519\u8BEF\uFF1AUUID \u683C\u5F0F\u65E0\u6548",
    reenter: "\u8BF7\u91CD\u65B0\u8F93\u5165\u6709\u6548\u7684 UUID",
    subtitle: "\u591A\u5BA2\u6237\u7AEF\u652F\u6301 \u2022 \u667A\u80FD\u4F18\u5316 \u2022 \u4E00\u952E\u751F\u6210",
    selectClient: "[ \u9009\u62E9\u5BA2\u6237\u7AEF ]",
    systemStatus: "[ \u7CFB\u7EDF\u72B6\u6001 ]",
    configManagement: "[ \u914D\u7F6E\u7BA1\u7406 ]",
    relatedLinks: "[ \u76F8\u5173\u94FE\u63A5 ]",
    checking: "\u68C0\u67E5\u4E2D...",
    workerRegion: "Worker \u533A\u57DF\uFF1A",
    detectionMethod: "\u68C0\u6D4B\u65B9\u5F0F\uFF1A",
    proxyIPStatus: "ProxyIP \u72B6\u6001\uFF1A",
    currentIP: "\u5F53\u524D IP\uFF1A",
    regionMatch: "\u533A\u57DF\u5339\u914D\uFF1A",
    selectionLogic: "\u9009\u62E9\u903B\u8F91\uFF1A",
    kvStatusChecking: "\u6B63\u5728\u68C0\u67E5 KV \u72B6\u6001...",
    kvEnabled: "\u2705 KV \u5DF2\u542F\u7528\uFF0C\u53EF\u8FDB\u884C\u914D\u7F6E\u7BA1\u7406",
    kvDisabled: "\u26A0\uFE0F KV \u672A\u542F\u7528\u6216\u672A\u914D\u7F6E",
    specifyRegion: "\u6307\u5B9A\u533A\u57DF (wk)\uFF1A",
    autoDetect: "\u81EA\u52A8\u68C0\u6D4B",
    saveRegion: "\u4FDD\u5B58\u533A\u57DF\u914D\u7F6E",
    protocolSelection: "\u534F\u8BAE\u9009\u62E9\uFF1A",
    enableVLESS: "\u542F\u7528 VLESS \u534F\u8BAE",
    enableVMess: "\u542F\u7528 VMess \u534F\u8BAE",
    enableShadowsocks: "\u542F\u7528 Shadowsocks \u534F\u8BAE",
    enableTrojan: "\u542F\u7528 Trojan \u534F\u8BAE",
    enableXhttp: "\u542F\u7528 xhttp \u534F\u8BAE",
    enableTUIC: "\u542F\u7528 TUIC \u534F\u8BAE",
    enableHysteria2: "\u542F\u7528 Hysteria 2 \u534F\u8BAE",
    enableVLESSgRPC: "\u542F\u7528 VLESS gRPC \u534F\u8BAE",
    linkOnlyHint: "\u9700\u8981\u5916\u90E8\u540E\u7AEF\uFF08\u4EC5\u751F\u6210\u94FE\u63A5\uFF09",
    grpcHint: "\u9700\u8981\u81EA\u5B9A\u4E49\u57DF\u540D\uFF08gRPC\uFF09",
    trojanPassword: "Trojan \u5BC6\u7801\uFF08\u53EF\u9009\uFF09\uFF1A",
    customPath: "\u81EA\u5B9A\u4E49\u8DEF\u5F84 (d)\uFF1A",
    customPathPlaceholder: "\u4F8B\u5982\uFF1A/secret-path",
    customIP: "\u81EA\u5B9A\u4E49 ProxyIP (p)\uFF1A",
    customIPPlaceholder: "\u4F8B\u5982\uFF1A1.2.3.4 \u6216 proxy.example.com",
    preferredIPs: "\u4F18\u9009 IP \u5217\u8868 (yx)\uFF1A",
    preferredIPsPlaceholder: "\u4F8B\u5982\uFF1A1.1.1.1:443#HongKong, 8.8.8.8:443#USA",
    preferredIPsURL: "\u4F18\u9009 IP \u6765\u6E90 URL (yxURL)\uFF1A",
    latencyTest: "\u5EF6\u8FDF\u6D4B\u8BD5",
    latencyTestIP: "\u6D4B\u8BD5 IP/\u57DF\u540D\uFF1A",
    latencyTestIPPlaceholder: "\u8F93\u5165 IP \u6216\u57DF\u540D\uFF0C\u7528\u9017\u53F7\u5206\u9694",
    latencyTestPort: "\u7AEF\u53E3\uFF1A",
    startTest: "\u5F00\u59CB\u6D4B\u8BD5",
    stopTest: "\u505C\u6B62\u6D4B\u8BD5",
    testResult: "\u6D4B\u8BD5\u7ED3\u679C\uFF1A",
    addToYx: "\u6DFB\u52A0\u5230\u4F18\u9009\u5217\u8868",
    addSelectedToYx: "\u6DFB\u52A0\u9009\u4E2D\u9879\u5230\u4F18\u9009\u5217\u8868",
    selectAll: "\u5168\u9009",
    deselectAll: "\u53D6\u6D88\u5168\u9009",
    testingInProgress: "\u6D4B\u8BD5\u4E2D...",
    testComplete: "\u6D4B\u8BD5\u5B8C\u6210",
    latencyMs: "\u5EF6\u8FDF\uFF08HTTP \u63E1\u624B\uFF09",
    timeout: "\u8D85\u65F6",
    ipSource: "IP \u6765\u6E90\uFF1A",
    manualInput: "\u624B\u52A8\u8F93\u5165",
    cfRandomIP: "CF \u968F\u673A IP",
    urlFetch: "\u4ECE URL \u83B7\u53D6",
    randomCount: "\u751F\u6210\u6570\u91CF\uFF1A",
    fetchURL: "\u83B7\u53D6 URL\uFF1A",
    fetchURLPlaceholder: "\u8F93\u5165 IP \u5217\u8868 URL",
    generateIP: "\u751F\u6210 IP",
    fetchIP: "\u83B7\u53D6 IP",
    socks5Config: "SOCKS5 \u914D\u7F6E (s)\uFF1A",
    customHomepage: "\u81EA\u5B9A\u4E49\u9996\u9875 URL (homepage)\uFF1A",
    customHomepagePlaceholder: "\u4F8B\u5982\uFF1Ahttps://example.com",
    customHomepageHint: "\u8BBE\u7F6E\u81EA\u5B9A\u4E49 URL \u4F5C\u4E3A\u4F2A\u88C5\u9996\u9875\u3002\u8BBF\u95EE\u6839\u8DEF\u5F84 / \u65F6\u663E\u793A\u8BE5\u5185\u5BB9\u3002\u7559\u7A7A\u5219\u663E\u793A\u9ED8\u8BA4\u7EC8\u7AEF\u9875\u9762\u3002",
    customPathHint: "\u82E5\u8BBE\u7F6E\uFF0C\u5C06\u53EA\u80FD\u901A\u8FC7\u8BE5\u8DEF\u5F84\u8BBF\u95EE\uFF0CUUID \u8BBF\u95EE\u5C06\u88AB\u7981\u7528\u3002\u5EFA\u8BAE\u4F7F\u7528\u590D\u6742\u8DEF\u5F84\u9632\u6B62\u626B\u63CF\u3002",
    customIPHint: "\u9690\u85CF Worker \u771F\u5B9E IP\uFF0C\u6216\u89E3\u51B3 Cloudflare Loop \u95EE\u9898\u3002\u652F\u6301 IP:\u7AEF\u53E3 \u6216 \u57DF\u540D:\u7AEF\u53E3\u3002",
    preferredIPsHint: "\u624B\u52A8\u6307\u5B9A\u4F18\u9009\u8282\u70B9\uFF0C\u4F18\u5148\u7EA7\u6700\u9AD8\u3002\u683C\u5F0F\uFF1AIP:\u7AEF\u53E3#\u5907\u6CE8\u3002",
    socks5ConfigHint: "\u683C\u5F0F\uFF1Auser:pass@host:port\u3002Worker \u5C06\u901A\u8FC7\u8BE5\u4EE3\u7406\u8FDE\u63A5\u76EE\u6807\u3002",
    saveConfig: "\u4FDD\u5B58\u914D\u7F6E",
    advancedControl: "\u9AD8\u7EA7\u63A7\u5236",
    subscriptionConverter: "\u8BA2\u9605\u8F6C\u6362\u5730\u5740\uFF1A",
    builtinPreferred: "\u5185\u7F6E\u4F18\u9009\u7C7B\u578B\uFF1A",
    enablePreferredDomain: "\u542F\u7528\u4F18\u9009\u57DF\u540D",
    enablePreferredIP: "\u542F\u7528\u4F18\u9009 IP",
    enableGitHubPreferred: "\u542F\u7528 GitHub \u9ED8\u8BA4\u4F18\u9009",
    allowAPIManagement: "\u5141\u8BB8 API \u7BA1\u7406 (ae)\uFF1A",
    regionMatching: "\u533A\u57DF\u5339\u914D (rm)\uFF1A",
    downgradeControl: "\u964D\u7EA7\u63A7\u5236 (qj)\uFF1A",
    tlsControl: "TLS \u63A7\u5236 (dkby)\uFF1A",
    preferredControl: "\u4F18\u9009\u63A7\u5236 (yxby)\uFF1A",
    saveAdvanced: "\u4FDD\u5B58\u9AD8\u7EA7\u914D\u7F6E",
    loading: "\u52A0\u8F7D\u4E2D...",
    currentConfig: "\u{1F4CD} \u5F53\u524D\u8DEF\u5F84\u914D\u7F6E",
    refreshConfig: "\u5237\u65B0\u914D\u7F6E",
    resetConfig: "\u91CD\u7F6E\u914D\u7F6E",
    subscriptionCopied: "\u8BA2\u9605\u94FE\u63A5\u5DF2\u590D\u5236",
    autoSubscriptionCopied: "\u5DF2\u590D\u5236\u81EA\u52A8\u68C0\u6D4B\u8BA2\u9605\u94FE\u63A5\uFF0C\u5C06\u6839\u636E User-Agent \u8BC6\u522B\u5BA2\u6237\u7AEF\u3002",
    trojanPasswordPlaceholder: "\u7559\u7A7A\u5219\u4F7F\u7528 UUID",
    trojanPasswordHint: "\u8BBE\u7F6E\u81EA\u5B9A\u4E49 Trojan \u5BC6\u7801\u3002\u7559\u7A7A\u5219\u4F7F\u7528 UUID\u3002\u5BA2\u6237\u7AEF\u4F1A\u7528 SHA224 \u8FDB\u884C\u54C8\u5E0C\u3002",
    protocolHint: "\u53EF\u542F\u7528\u591A\u79CD\u534F\u8BAE\u3002<br>\u2022 VLESS WS\uFF1A\u6807\u51C6 WebSocket \u534F\u8BAE<br>\u2022 VMess WS\uFF1A\u57FA\u4E8E WS \u7684 VMess\uFF08\u4EC5\u751F\u6210\u94FE\u63A5\uFF09<br>\u2022 Shadowsocks\uFF1A\u57FA\u4E8E WS \u7684 SS\uFF08\u4EC5\u751F\u6210\u94FE\u63A5\uFF09<br>\u2022 Trojan\uFF1A\u4F7F\u7528 SHA224 \u5BC6\u7801\u8BA4\u8BC1<br>\u2022 xhttp\uFF1AHTTP POST \u4F2A\u88C5\uFF08\u9700\u8981\u81EA\u5B9A\u4E49\u57DF\u540D & gRPC\uFF09",
    enableECH: "\u542F\u7528 ECH\uFF08\u52A0\u5BC6\u5BA2\u6237\u7AEF Hello\uFF09",
    enableECHHint: "\u542F\u7528\u540E\u5C06\u4ECE DoH \u83B7\u53D6 ECH \u914D\u7F6E\u5E76\u5728\u6BCF\u6B21\u8BA2\u9605\u5237\u65B0\u65F6\u52A0\u5165\u94FE\u63A5",
    customDNS: "\u81EA\u5B9A\u4E49 DNS \u670D\u52A1\u5668",
    customDNSPlaceholder: "\u4F8B\u5982\uFF1Ahttps://dns.joeyblog.eu.org/joeyblog",
    customDNSHint: "\u7528\u4E8E\u67E5\u8BE2 ECH \u914D\u7F6E\u7684 DNS \u670D\u52A1\u5668\uFF08DoH \u683C\u5F0F\uFF09",
    customECHDomain: "\u81EA\u5B9A\u4E49 ECH \u57DF\u540D",
    customECHDomainPlaceholder: "\u4F8B\u5982\uFF1Acloudflare-ech.com",
    customECHDomainHint: "ECH \u914D\u7F6E\u4F7F\u7528\u7684\u57DF\u540D\uFF0C\u7559\u7A7A\u4E3A\u9ED8\u8BA4",
    saveProtocol: "\u4FDD\u5B58\u534F\u8BAE\u914D\u7F6E",
    subscriptionConverterPlaceholder: "\u9ED8\u8BA4\uFF1Ahttps://url.v1.mk/sub",
    subscriptionConverterHint: "\u81EA\u5B9A\u4E49\u8BA2\u9605\u8F6C\u6362 API\uFF0C\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4",
    builtinPreferredHint: "\u63A7\u5236\u5185\u7F6E\u4F18\u9009\u8282\u70B9\u662F\u5426\u5305\u542B\uFF0C\u9ED8\u8BA4\u5168\u90E8\u542F\u7528",
    apiEnabledDefault: "\u9ED8\u8BA4\uFF08API \u7981\u7528\uFF09",
    apiEnabledYes: "\u542F\u7528 API \u7BA1\u7406",
    apiEnabledHint: "\u26A0\uFE0F \u5B89\u5168\u63D0\u793A\uFF1A\u542F\u7528 API \u5141\u8BB8\u52A8\u6001\u6DFB\u52A0\u4F18\u9009 IP\uFF0C\u4EC5\u5728\u9700\u8981\u65F6\u5F00\u542F",
    regionMatchingDefault: "\u9ED8\u8BA4\uFF08\u542F\u7528\u533A\u57DF\u5339\u914D\uFF09",
    regionMatchingNo: "\u5173\u95ED\u533A\u57DF\u5339\u914D",
    regionMatchingHint: "\u8BBE\u7F6E\u4E3A\u201C\u5173\u95ED\u201D\u540E\uFF0C\u667A\u80FD\u533A\u57DF\u5339\u914D\u5C06\u505C\u6B62",
    downgradeControlDefault: "\u9ED8\u8BA4\uFF08\u7981\u7528\u964D\u7EA7\uFF09",
    downgradeControlNo: "\u542F\u7528\u964D\u7EA7\u6A21\u5F0F",
    downgradeControlHint: "\u542F\u7528\u540E\uFF1ACF \u76F4\u8FDE\u5931\u8D25 -> SOCKS5 -> Fallback",
    tlsControlDefault: "\u9ED8\u8BA4\uFF08\u4FDD\u7559\u6240\u6709\u8282\u70B9\uFF09",
    tlsControlYes: "\u4EC5 TLS \u8282\u70B9",
    tlsControlHint: "\u8BBE\u7F6E\u4E3A\u201C\u4EC5 TLS \u8282\u70B9\u201D\u65F6\uFF0C\u5C06\u4E0D\u751F\u6210\u975E TLS \u8282\u70B9\uFF08\u5982 80 \u7AEF\u53E3\uFF09",
    preferredControlDefault: "\u9ED8\u8BA4\uFF08\u542F\u7528\u4F18\u9009\uFF09",
    preferredControlYes: "\u5173\u95ED\u4F18\u9009",
    preferredControlHint: "\u8BBE\u7F6E\u4E3A\u201C\u5173\u95ED\u4F18\u9009\u201D\u65F6\uFF0C\u4EC5\u4F7F\u7528\u539F\u751F\u5730\u5740",
    regionNames: {
      US: "\u{1F1FA}\u{1F1F8} \u7F8E\u56FD",
      SG: "\u{1F1F8}\u{1F1EC} \u65B0\u52A0\u5761",
      JP: "\u{1F1EF}\u{1F1F5} \u65E5\u672C",
      KR: "\u{1F1F0}\u{1F1F7} \u97E9\u56FD",
      DE: "\u{1F1E9}\u{1F1EA} \u5FB7\u56FD",
      SE: "\u{1F1F8}\u{1F1EA} \u745E\u5178",
      NL: "\u{1F1F3}\u{1F1F1} \u8377\u5170",
      FI: "\u{1F1EB}\u{1F1EE} \u82AC\u5170",
      GB: "\u{1F1EC}\u{1F1E7} \u82F1\u56FD",
      FR: "\u{1F1EB}\u{1F1F7} \u6CD5\u56FD",
      CA: "\u{1F1E8}\u{1F1E6} \u52A0\u62FF\u5927",
      AU: "\u{1F1E6}\u{1F1FA} \u6FB3\u5927\u5229\u4E9A",
      HK: "\u{1F1ED}\u{1F1F0} \u9999\u6E2F",
      TW: "\u{1F1F9}\u{1F1FC} \u53F0\u6E7E"
    },
    githubProject: "GitHub \u9879\u76EE",
    autoDetectClient: "\u81EA\u52A8\u8BC6\u522B",
    selectionLogicText: "\u540C\u533A\u57DF -> \u4E34\u8FD1\u533A\u57DF -> \u5176\u4ED6\u533A\u57DF",
    customIPDisabledHint: "\u4F7F\u7528\u81EA\u5B9A\u4E49 ProxyIP \u65F6\u533A\u57DF\u9009\u62E9\u5DF2\u7981\u7528",
    customIPMode: "\u81EA\u5B9A\u4E49 ProxyIP \u6A21\u5F0F\uFF08p \u53D8\u91CF\u542F\u7528\uFF09",
    customIPModeDesc: "\u81EA\u5B9A\u4E49 IP \u6A21\u5F0F\uFF08\u5DF2\u7981\u7528\u533A\u57DF\u5339\u914D\uFF09",
    usingCustomProxyIP: "\u4F7F\u7528\u81EA\u5B9A\u4E49 ProxyIP\uFF1A",
    customIPConfig: "\uFF08p \u53D8\u91CF\u914D\u7F6E\uFF09",
    customIPModeDisabled: "\u81EA\u5B9A\u4E49 IP \u6A21\u5F0F\uFF0C\u533A\u57DF\u9009\u62E9\u5DF2\u7981\u7528",
    manualRegion: "\u624B\u52A8\u6307\u5B9A\u533A\u57DF",
    manualRegionDesc: "\uFF08\u624B\u52A8\uFF09",
    proxyIPAvailable: "10/10 \u53EF\u7528\uFF08\u9884\u8BBE ProxyIP \u57DF\u540D\u53EF\u7528\uFF09",
    smartSelection: "\u667A\u80FD\u5C31\u8FD1\u9009\u62E9",
    sameRegionIP: "\u540C\u533A\u57DF IP \u53EF\u7528\uFF081\u4E2A\uFF09",
    cloudflareDetection: "Cloudflare \u5185\u7F6E\u68C0\u6D4B",
    detectionFailed: "\u68C0\u6D4B\u5931\u8D25",
    apiTestResult: "API \u68C0\u6D4B\u7ED3\u679C\uFF1A",
    apiTestTime: "\u68C0\u6D4B\u8017\u65F6\uFF1A",
    apiTestFailed: "API \u68C0\u6D4B\u5931\u8D25\uFF1A",
    unknownError: "\u672A\u77E5\u9519\u8BEF",
    apiTestError: "API \u6D4B\u8BD5\u5931\u8D25\uFF1A",
    kvNotConfigured: "KV \u5B58\u50A8\u672A\u914D\u7F6E\uFF0C\u914D\u7F6E\u7BA1\u7406\u4E0D\u53EF\u7528\u3002\\n\\n\u8BF7\u5728 Cloudflare Workers\uFF1A\\n1. \u521B\u5EFA KV Namespace\\n2. \u7ED1\u5B9A\u53D8\u91CF C\\n3. \u91CD\u65B0\u90E8\u7F72",
    kvNotEnabled: "KV \u5B58\u50A8\u672A\u542F\u7528",
    kvCheckFailed: "KV \u68C0\u67E5\u5931\u8D25\uFF1A\u54CD\u5E94\u65E0\u6548",
    kvCheckFailedStatus: "KV \u68C0\u67E5\u5931\u8D25 - \u72B6\u6001\u7801\uFF1A",
    kvCheckFailedError: "KV \u68C0\u67E5\u5931\u8D25 - \u9519\u8BEF\uFF1A ",
    preferredIPsURLPlaceholder: "\u4F8B\u5982\uFF1Ahttps://example.com/ips.txt",
    preferredIPsURLHint: "\u4ECE URL \u62C9\u53D6\u4F18\u9009 IP\uFF0C\u652F\u6301\u7EAF\u6587\u672C\u6216 CSV\u3002",
    preferredIPFilterTitle: "\u4F18\u9009 IP \u7B5B\u9009",
    ipVersionSelection: "IP \u7248\u672C",
    ispSelection: "\u8FD0\u8425\u5546",
    ispMobile: "\u79FB\u52A8",
    ispUnicom: "\u8054\u901A",
    ispTelecom: "\u7535\u4FE1",
    ipFilterHint: "\u8FC7\u6EE4\u4EC5\u4F5C\u7528\u4E8E\u5217\u8868\u89E3\u6790\uFF0C\u624B\u52A8\u8F93\u5165\u4E0D\u53D7\u5F71\u54CD\u3002",
    threadsLabel: "\u7EBF\u7A0B",
    cityFilterAll: "\u5168\u90E8\u57CE\u5E02",
    cityFilterFastest10: "\u6700\u5FEB 10 \u4E2A",
    overwriteAdd: "\u8986\u76D6\u5199\u5165",
    appendAdd: "\u8FFD\u52A0\u5199\u5165",
    socks5ConfigPlaceholder: "\u4F8B\u5982\uFF1Auser:pass@host:port",
    generated: "\u5DF2\u751F\u6210",
    cfRandomIPs: "CF \u968F\u673A IP",
    pleaseEnterUrl: "\u8BF7\u8F93\u5165 URL",
    fetching: "\u83B7\u53D6\u4E2D...",
    fetched: "\u5DF2\u83B7\u53D6",
    ipCountSuffix: "\u4E2A IP",
    noDataFound: "\u672A\u627E\u5230\u6570\u636E",
    fetchFailed: "\u83B7\u53D6\u5931\u8D25",
    pleaseEnterIPOrDomain: "\u8BF7\u8F93\u5165 IP \u6216\u57DF\u540D",
    testing: "\u6D4B\u8BD5\u4E2D",
    testStopped: "\u6D4B\u8BD5\u5DF2\u505C\u6B62",
    selectAtLeastOne: "\u8BF7\u81F3\u5C11\u9009\u62E9\u4E00\u4E2A\u9009\u9879",
    saving: "\u4FDD\u5B58\u4E2D...",
    overwritten: "\u5DF2\u8986\u76D6",
    itemsSaved: " \u9879",
    appended: "\u5DF2\u8FFD\u52A0",
    saveFailed: "\u4FDD\u5B58\u5931\u8D25",
    timeoutLabel: "\u8D85\u65F6",
    configNotConfigured: "KV \u5B58\u50A8\u672A\u914D\u7F6E\uFF0C\u65E0\u6CD5\u52A0\u8F7D\u914D\u7F6E",
    configLoadFailed: "\u52A0\u8F7D\u914D\u7F6E\u5931\u8D25",
    configLoadFailedStatus: "\u52A0\u8F7D\u914D\u7F6E\u5931\u8D25\uFF1A",
    currentConfigLabel: "\u5F53\u524D\u914D\u7F6E\uFF1A\\n",
    currentConfigEmpty: "\uFF08\u6682\u65E0\u914D\u7F6E\uFF09",
    currentConfigUnset: "\uFF08\u672A\u8BBE\u7F6E\uFF09",
    pathTypeCustom: "\u4F7F\u7528\u7C7B\u578B\uFF1A\u81EA\u5B9A\u4E49\u8DEF\u5F84 (d)",
    pathTypeUUID: "\u4F7F\u7528\u7C7B\u578B\uFF1AUUID \u8DEF\u5F84 (u)",
    currentPathLabel: "\u5F53\u524D\u8DEF\u5F84",
    accessUrlLabel: "\u8BBF\u95EE\u5730\u5740",
    echStatusLabel: "ECH \u72B6\u6001\uFF1A",
    statusEnabled: "\u5DF2\u542F\u7528",
    statusDisabled: "\u5DF2\u7981\u7528",
    statusCheckFailed: "\u68C0\u67E5\u5931\u8D25",
    configLengthLabel: "\u914D\u7F6E\u957F\u5EA6",
    debugConsoleTitle: "\u8C03\u8BD5\u63A7\u5236\u53F0",
    debugShow: "\u5C55\u5F00",
    debugHide: "\u6536\u8D77",
    debugReady: "\u63A7\u5236\u53F0\u5C31\u7EEA",
    debugUnknownError: "\u672A\u77E5\u9519\u8BEF",
    debugUnhandledPromise: "\u672A\u5904\u7406\u7684 Promise \u62D2\u7EDD",
    kvNotConfiguredSave: "KV \u672A\u914D\u7F6E\uFF0C\u65E0\u6CD5\u4FDD\u5B58\u3002\u8BF7\u5728 Cloudflare Workers \u914D\u7F6E KV\u3002",
    kvNotConfiguredReset: "KV \u672A\u914D\u7F6E\uFF0C\u65E0\u6CD5\u91CD\u7F6E\u3002",
    resetConfirm: "\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u914D\u7F6E\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A KV \u5E76\u6062\u590D\u4E3A\u73AF\u5883\u53D8\u91CF\u3002",
    resetFailed: "\u91CD\u7F6E\u5931\u8D25",
    resetSuccess: "\u914D\u7F6E\u5DF2\u91CD\u7F6E",
    unknown: "\u672A\u77E5",
    enableDiverseProxies: "\u542F\u7528\u591A\u7AEF\u53E3\u8282\u70B9\uFF08\u751F\u6210\u5168\u90E8\u7AEF\u53E3\uFF09",
    enableDiverseProxiesHint: "\u4E3A\u6BCF\u4E2A IP \u751F\u6210\u6240\u6709\u652F\u6301\u7684\u7AEF\u53E3\uFF0880\u3001443\u30012053 \u7B49\uFF09\u3002\u8BA2\u9605\u4F53\u79EF\u4F1A\u660E\u663E\u589E\u5927\u3002"
  });
  const t = translations[lang] || translations.en;
  const pageHtml = `<!DOCTYPE html>
        <html lang="${langAttr}" dir="${isFarsi ? "rtl" : "ltr"}">
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
                    <option value="en" ${lang === "en" ? "selected" : ""}>\u{1F1FA}\u{1F1F8} English</option>
                    <option value="zh" ${lang === "zh" ? "selected" : ""}>\u{1F1E8}\u{1F1F3} \u4E2D\u6587</option>
                    <option value="fa" ${lang === "fa" ? "selected" : ""}>\u{1F1EE}\u{1F1F7} \u0641\u0627\u0631\u0633\u06CC</option>
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
                                <small id="wkRegionHint" style="color: #00aa00; font-size: 0.85rem; display: none;">\u26A0\uFE0F ${t.customIPDisabledHint}</small>
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
                                        <label style="display: flex; align-items: center; color: #00ff00;"><input type="checkbox" id="evm" ${evm ? "checked" : ""} style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;"> ${t.enableVMess}</label>
                                        <small style="color: #ffaa00; font-size: 0.8rem; display: block; margin-top: 2px; margin-left: 26px;">${t.linkOnlyHint}</small>
                                    </div>
                                    <div class="checkbox-item" style="margin-top: 10px;">
                                        <label style="display: flex; align-items: center; color: #00ff00;"><input type="checkbox" id="ess" ${ess ? "checked" : ""} style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;"> ${t.enableShadowsocks}</label>
                                        <small style="color: #ffaa00; font-size: 0.8rem; display: block; margin-top: 2px; margin-left: 26px;">${t.linkOnlyHint}</small>
                                    </div>
                                    <div class="checkbox-item" style="margin-top: 10px;">
                                        <label style="display: flex; align-items: center; color: #00ff00;"><input type="checkbox" id="etu" ${etu ? "checked" : ""} style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;"> ${t.enableTUIC}</label>
                                        <small style="color: #ffaa00; font-size: 0.8rem; display: block; margin-top: 2px; margin-left: 26px;">${t.linkOnlyHint}</small>
                                    </div>
                                    <div class="checkbox-item" style="margin-top: 10px;">
                                        <label style="display: flex; align-items: center; color: #00ff00;"><input type="checkbox" id="ehy" ${ehy ? "checked" : ""} style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;"> ${t.enableHysteria2}</label>
                                        <small style="color: #ffaa00; font-size: 0.8rem; display: block; margin-top: 2px; margin-left: 26px;">${t.linkOnlyHint}</small>
                                    </div>
                                    <div class="checkbox-item" style="margin-top: 10px;">
                                        <label style="display: flex; align-items: center; color: #00ff00;"><input type="checkbox" id="eg" ${eg ? "checked" : ""} style="margin-right: 8px; width: 18px; height: 18px; cursor: pointer;"> ${t.enableVLESSgRPC}</label>
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
                            <h4 style="color: #00ff00; margin: 0 0 15px 0; font-size: 1.1rem; text-shadow: 0 0 5px #00ff00;">\u26A1 ${t.latencyTest}</h4>
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
                                    <button type="button" id="fetchIPBtn" style="background: rgba(0, 200, 255, 0.2); border: 1px solid #00aaff; padding: 8px 16px; color: #00aaff; font-family: 'Courier New', monospace; cursor: pointer; white-space: nowrap;">\u2B07 ${t.fetchIP}</button>
                                </div>
                            </div>
                            <div id="cfRandomDiv" style="margin-bottom: 10px; display: none;">
                                <button type="button" id="generateCFIPBtn" style="background: rgba(0, 255, 0, 0.15); border: 1px solid #00ff00; padding: 10px 20px; color: #00ff00; font-family: 'Courier New', monospace; cursor: pointer; width: 100%; transition: all 0.3s;">\u{1F3B2} ${t.generateIP}</button>
                            </div>
                            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                                <button type="button" id="startLatencyTest" style="background: rgba(0, 255, 0, 0.2); border: 1px solid #00ff00; padding: 8px 16px; color: #00ff00; font-family: 'Courier New', monospace; cursor: pointer; transition: all 0.3s;">\u25B6 ${t.startTest}</button>
                                <button type="button" id="stopLatencyTest" style="background: rgba(255, 0, 0, 0.2); border: 1px solid #ff4444; padding: 8px 16px; color: #ff4444; font-family: 'Courier New', monospace; cursor: pointer; display: none; transition: all 0.3s;">\u23F9 ${t.stopTest}</button>
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
            // \u8BA2\u9605\u8F6C\u6362\u5730\u5740\uFF08\u4ECE\u670D\u52A1\u5668\u914D\u7F6E\u6CE8\u5165\uFF09
            var SUB_CONVERTER_URL = "${scu}";
            // Remote config URL (Hardcoded)
            var REMOTE_CONFIG_URL = "${remoteConfigUrl}";
            var DEBUG_LOG_QUEUE = [];
            var DEBUG_CONSOLE_READY = false;
            var DEBUG_AUTO_OPEN = false;

            function safeLocalStorageGet(key) {
                try {
                    if (typeof localStorage === 'undefined') return null;
                    return window.localStorage.getItem(key);
                } catch (e) {
                    return null;
                }
            }

            function safeLocalStorageSet(key, value) {
                try {
                    if (typeof localStorage === 'undefined') return false;
                    window.localStorage.setItem(key, value);
                    return true;
                } catch (e) {
                    return false;
                }
            }

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

                // \u7FFB\u8BD1\u5BF9\u8C61
                                const translations = ${JSON.stringify(translations)};

                function getCookie(name) {
                    const value = '; ' + document.cookie;
                    const parts = value.split('; ' + name + '=');
                    if (parts.length === 2) {
                        const part = parts.pop();
                        if (part) return part.split(';').shift();
                    }
                    return null;
                }

                function getPreferredLanguage() {
                    const savedLang = safeLocalStorageGet('preferredLanguage') || getCookie('preferredLanguage') || '';
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
                    safeLocalStorageSet('preferredLanguage', lang);
                    // Set Cookie (valid for 1 year)
                    const expiryDate = new Date();
                    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                    document.cookie = 'preferredLanguage=' + lang + '; path=/; expires=' + expiryDate.toUTCString() + '; SameSite=Lax';
                    // Reload page, do not use URL parameters
                    window.location.reload();
                }

                // Check localStorage and Cookie on page load, and clean up URL parameters
                window.addEventListener('DOMContentLoaded', function() {
                    const savedLang = safeLocalStorageGet('preferredLanguage') || getCookie('preferredLanguage');
                    const urlParams = new URLSearchParams(window.location.search);
                    const urlLang = urlParams.get('lang');

                    // If URL has language parameter, remove it and set Cookie
                    if (urlLang) {
                        const currentUrl = new URL(window.location.href);
                        currentUrl.searchParams.delete('lang');
                        const newUrl = currentUrl.toString();

                        // \u8BBE\u7F6ECookie
                        const expiryDate = new Date();
                        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                        document.cookie = 'preferredLanguage=' + urlLang + '; path=/; expires=' + expiryDate.toUTCString() + '; SameSite=Lax';
                        safeLocalStorageSet('preferredLanguage', urlLang);

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
                    // \u68C0\u67E5 ECH \u662F\u5426\u5F00\u542F
                    var echEnabled = document.getElementById('ech') && document.getElementById('ech').checked;

                    // \u5982\u679C ECH \u5F00\u542F\u4E14\u662F Clash\uFF0C\u76F4\u63A5\u4F7F\u7528\u540E\u7AEF\u63A5\u53E3
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
                        // \u5176\u4ED6\u60C5\u51B5\u4F7F\u7528\u8BA2\u9605\u8F6C\u6362\u670D\u52A1
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

                        // \u83B7\u53D6\u5F53\u524D\u8BED\u8A00\u8BBE\u7F6E\uFF08\u4F18\u5148\u4ECECookie/localStorage\u8BFB\u53D6\uFF09
                        function getCookie(name) {
                            const value = '; ' + document.cookie;
                            const parts = value.split('; ' + name + '=');
                            if (parts.length === 2) {
                                const part = parts.pop();
                                if (part) return part.split(';').shift();
                            }
                            return null;
                        }

                        const browserLang = navigator.language || navigator.userLanguage || '';
                        const savedLang = safeLocalStorageGet('preferredLanguage') || getCookie('preferredLanguage');
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
                    subtitle: 'Multi-client Support \u2022 Smart Optimization \u2022 One-Click Generation',
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
                    kvEnabled: '\u2705 KV Storage Enabled, Config Management Available',
                    kvDisabled: '\u26A0\uFE0F KV Storage Disabled or Not Configured',
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
                    currentConfig: '\u{1F4CD} Current Path Config',
                    refreshConfig: 'Refresh Config',
                    resetConfig: 'Reset Config',
                    subscriptionCopied: 'Subscription Link Copied',
                    autoSubscriptionCopied: 'Auto-detected subscription link copied. Client will be recognized by User-Agent.',
                    trojanPasswordPlaceholder: 'Leave empty to use UUID',
                    trojanPasswordHint: 'Set custom Trojan password. Leave empty to use UUID. Client will auto-hash password with SHA224.',
                    protocolHint: 'Multiple protocols can be enabled.<br>\u2022 VLESS WS: Standard WebSocket protocol<br>\u2022 VMess WS: WebSocket-based VMess (link generation)<br>\u2022 Shadowsocks: WebSocket-based SS (link generation)<br>\u2022 Trojan: Uses SHA224 password auth<br>\u2022 xhttp: HTTP POST camouflage (requires custom domain & gRPC)',
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
                    apiEnabledHint: '\u26A0\uFE0F Security Warning: Enabling API allows dynamic preferred IP addition. Use only if needed.',
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
                        US: '\u{1F1FA}\u{1F1F8} US', SG: '\u{1F1F8}\u{1F1EC} Singapore', JP: '\u{1F1EF}\u{1F1F5} Japan',
                        KR: '\u{1F1F0}\u{1F1F7} South Korea', DE: '\u{1F1E9}\u{1F1EA} Germany', SE: '\u{1F1F8}\u{1F1EA} Sweden', NL: '\u{1F1F3}\u{1F1F1} Netherlands',
                        FI: '\u{1F1EB}\u{1F1EE} Finland', GB: '\u{1F1EC}\u{1F1E7} UK', FR: '\u{1F1EB}\u{1F1F7} France', CA: '\u{1F1E8}\u{1F1E6} Canada',
                        AU: '\u{1F1E6}\u{1F1FA} Australia', HK: '\u{1F1ED}\u{1F1F0} Hong Kong', TW: '\u{1F1F9}\u{1F1FC} Taiwan'
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
                    kvNotConfigured: 'KV Storage not configured. Config management unavailable.

Please in Cloudflare Workers:
1. Create KV Namespace
2. Bind variable C
3. Redeploy',
                    kvNotEnabled: 'KV Storage Not Configured',
                    kvCheckFailed: 'KV Check Failed: Invalid Response',
                    kvCheckFailedStatus: 'KV Check Failed - Status: ',
                    kvCheckFailedError: 'KV Check Failed - Error: '
                },
                                customIPMode: '\u81EA\u5B9A\u4E49ProxyIP\u6A21\u5F0F (p\u53D8\u91CF\u542F\u7528)',
                                customIPModeDesc: '\u81EA\u5B9A\u4E49IP\u6A21\u5F0F (\u5DF2\u7981\u7528\u5730\u533A\u5339\u914D)',
                                usingCustomProxyIP: '\u4F7F\u7528\u81EA\u5B9A\u4E49ProxyIP: ',
                                customIPConfig: ' (p\u53D8\u91CF\u914D\u7F6E)',
                                customIPModeDisabled: '\u81EA\u5B9A\u4E49IP\u6A21\u5F0F\uFF0C\u5730\u533A\u9009\u62E9\u5DF2\u7981\u7528',
                                manualRegion: '\u624B\u52A8\u6307\u5B9A\u5730\u533A',
                                manualRegionDesc: ' (\u624B\u52A8\u6307\u5B9A)',
                                proxyIPAvailable: '10/10 \u53EF\u7528 (ProxyIP\u57DF\u540D\u9884\u8BBE\u53EF\u7528)',
                                smartSelection: '\u667A\u80FD\u5C31\u8FD1\u9009\u62E9\u4E2D',
                                sameRegionIP: '\u540C\u5730\u533AIP\u53EF\u7528 (1\u4E2A)',
                                cloudflareDetection: 'Cloudflare\u5185\u7F6E\u68C0\u6D4B',
                                detectionFailed: '\u68C0\u6D4B\u5931\u8D25',
                                unknown: 'Unknown'
                            },
                            fa: {
                                workerRegion: '\u0645\u0646\u0637\u0642\u0647 Worker: ',
                                detectionMethod: '\u0631\u0648\u0634 \u062A\u0634\u062E\u06CC\u0635: ',
                                proxyIPStatus: '\u0648\u0636\u0639\u06CC\u062A ProxyIP: ',
                                currentIP: 'IP \u0641\u0639\u0644\u06CC: ',
                                regionMatch: '\u062A\u0637\u0628\u06CC\u0642 \u0645\u0646\u0637\u0642\u0647: ',
                                regionNames: {
                                    'US': '\u{1F1FA}\u{1F1F8} \u0622\u0645\u0631\u06CC\u06A9\u0627', 'SG': '\u{1F1F8}\u{1F1EC} \u0633\u0646\u06AF\u0627\u067E\u0648\u0631', 'JP': '\u{1F1EF}\u{1F1F5} \u0698\u0627\u067E\u0646',
                                    'KR': '\u{1F1F0}\u{1F1F7} \u06A9\u0631\u0647 \u062C\u0646\u0648\u0628\u06CC', 'DE': '\u{1F1E9}\u{1F1EA} \u0622\u0644\u0645\u0627\u0646', 'SE': '\u{1F1F8}\u{1F1EA} \u0633\u0648\u0626\u062F', 'NL': '\u{1F1F3}\u{1F1F1} \u0647\u0644\u0646\u062F',
                                    'FI': '\u{1F1EB}\u{1F1EE} \u0641\u0646\u0644\u0627\u0646\u062F', 'GB': '\u{1F1EC}\u{1F1E7} \u0628\u0631\u06CC\u062A\u0627\u0646\u06CC\u0627'
                                },
                                customIPMode: '\u062D\u0627\u0644\u062A ProxyIP \u0633\u0641\u0627\u0631\u0634\u06CC (\u0645\u062A\u063A\u06CC\u0631 p \u0641\u0639\u0627\u0644 \u0627\u0633\u062A)',
                                customIPModeDesc: '\u062D\u0627\u0644\u062A IP \u0633\u0641\u0627\u0631\u0634\u06CC (\u062A\u0637\u0628\u06CC\u0642 \u0645\u0646\u0637\u0642\u0647 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0627\u0633\u062A)',
                                usingCustomProxyIP: '\u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0627\u0632 ProxyIP \u0633\u0641\u0627\u0631\u0634\u06CC: ',
                                customIPConfig: ' (\u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC \u0645\u062A\u063A\u06CC\u0631 p)',
                                customIPModeDisabled: '\u062D\u0627\u0644\u062A IP \u0633\u0641\u0627\u0631\u0634\u06CC\u060C \u0627\u0646\u062A\u062E\u0627\u0628 \u0645\u0646\u0637\u0642\u0647 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0627\u0633\u062A',
                                manualRegion: '\u062A\u0639\u06CC\u06CC\u0646 \u0645\u0646\u0637\u0642\u0647 \u062F\u0633\u062A\u06CC',
                                manualRegionDesc: ' (\u062A\u0639\u06CC\u06CC\u0646 \u062F\u0633\u062A\u06CC)',
                                proxyIPAvailable: '10/10 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 (\u062F\u0627\u0645\u0646\u0647 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636 ProxyIP \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0627\u0633\u062A)',
                                smartSelection: '\u0627\u0646\u062A\u062E\u0627\u0628 \u0647\u0648\u0634\u0645\u0646\u062F \u0646\u0632\u062F\u06CC\u06A9 \u062F\u0631 \u062D\u0627\u0644 \u0627\u0646\u062C\u0627\u0645 \u0627\u0633\u062A',
                                sameRegionIP: 'IP \u0647\u0645\u200C\u0645\u0646\u0637\u0642\u0647 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0627\u0633\u062A (1)',
                                cloudflareDetection: '\u062A\u0634\u062E\u06CC\u0635 \u062F\u0627\u062E\u0644\u06CC Cloudflare',
                                detectionFailed: '\u062A\u0634\u062E\u06CC\u0635 \u0646\u0627\u0645\u0648\u0641\u0642',
                                unknown: '\u0646\u0627\u0634\u0646\u0627\u062E\u062A\u0647'
                            }
                        };

                        const t = getTranslations();

                    let detectedRegion = 'US'; // \u9ED8\u8BA4\u503C
                    let isCustomIPMode = false;
                    let isManualRegionMode = false;
                    try {
                        const response = await fetch(window.location.pathname + '/region');
                        const data = await response.json();

                        if (data.region === 'CUSTOM') {
                            isCustomIPMode = true;
                            detectedRegion = 'CUSTOM';

                            // \u83B7\u53D6\u81EA\u5B9A\u4E49IP\u7684\u8BE6\u7EC6\u4FE1\u606F
                                const customIPInfo = data.ci || t.unknown;

                                geoInfo.innerHTML = t.detectionMethod + '<span style="color: #ffaa00;">\u2699\uFE0F ' + t.customIPMode + '</span>';
                                regionStatus.innerHTML = t.workerRegion + '<span style="color: #ffaa00;">\u{1F527} ' + t.customIPModeDesc + '</span>';

                            // \u663E\u793A\u81EA\u5B9A\u4E49IP\u914D\u7F6E\u72B6\u6001\uFF0C\u5305\u542B\u5177\u4F53IP
                                if (backupStatus) backupStatus.innerHTML = t.proxyIPStatus + '<span style="color: #ffaa00;">\u{1F527} ' + t.usingCustomProxyIP + customIPInfo + '</span>';
                                if (currentIP) currentIP.innerHTML = t.currentIP + '<span style="color: #ffaa00;">\u2705 ' + customIPInfo + t.customIPConfig + '</span>';
                                if (regionMatch) regionMatch.innerHTML = t.regionMatch + '<span style="color: #ffaa00;">\u26A0\uFE0F ' + t.customIPModeDisabled + '</span>';

                            return; // \u63D0\u524D\u8FD4\u56DE\uFF0C\u4E0D\u6267\u884C\u540E\u7EED\u7684\u5730\u533A\u5339\u914D\u903B\u8F91
                            } else if (data.detectionMethod === 'Manual Region' || data.detectionMethod === '\u624B\u52A8\u6307\u5B9A\u5730\u533A' || data.detectionMethod === '\u062A\u0639\u06CC\u06CC\u0646 \u0645\u0646\u0637\u0642\u0647 \u062F\u0633\u062A\u06CC') {
                            isManualRegionMode = true;
                            detectedRegion = data.region;

                                geoInfo.innerHTML = t.detectionMethod + '<span style="color: #44aa44;">' + t.manualRegion + '</span>';
                                regionStatus.innerHTML = t.workerRegion + '<span style="color: #44ff44;">\u{1F3AF} ' + t.regionNames[detectedRegion] + t.manualRegionDesc + '</span>';

                            // \u663E\u793A\u914D\u7F6E\u72B6\u6001\u800C\u4E0D\u662F\u68C0\u6D4B\u72B6\u6001
                                if (backupStatus) backupStatus.innerHTML = t.proxyIPStatus + '<span style="color: #44ff44;">\u2705 ' + t.proxyIPAvailable + '</span>';
                                if (currentIP) currentIP.innerHTML = t.currentIP + '<span style="color: #44ff44;">\u2705 ' + t.smartSelection + '</span>';
                                if (regionMatch) regionMatch.innerHTML = t.regionMatch + '<span style="color: #44ff44;">\u2705 ' + t.sameRegionIP + '</span>';

                            return; // \u63D0\u524D\u8FD4\u56DE\uFF0C\u4E0D\u6267\u884C\u540E\u7EED\u7684\u5730\u533A\u5339\u914D\u903B\u8F91
                            } else if (data.region && t.regionNames[data.region]) {
                            detectedRegion = data.region;
                        }

                            geoInfo.innerHTML = t.detectionMethod + '<span style="color: #44ff44;">' + t.cloudflareDetection + '</span>';

                    } catch (e) {
                            geoInfo.innerHTML = t.detectionMethod + '<span style="color: #ff4444;">' + t.detectionFailed + '</span>';
                    }

                        regionStatus.innerHTML = t.workerRegion + '<span style="color: #44ff44;">\u2705 ' + t.regionNames[detectedRegion] + '</span>';

                    // \u76F4\u63A5\u663E\u793A\u914D\u7F6E\u72B6\u6001\uFF0C\u4E0D\u518D\u8FDB\u884C\u68C0\u6D4B
                    if (backupStatus) {
                            backupStatus.innerHTML = t.proxyIPStatus + '<span style="color: #44ff44;">\u2705 ' + t.proxyIPAvailable + '</span>';
                    }

                    if (currentIP) {
                            currentIP.innerHTML = t.currentIP + '<span style="color: #44ff44;">\u2705 ' + t.smartSelection + '</span>';
                    }

                    if (regionMatch) {
                            regionMatch.innerHTML = t.regionMatch + '<span style="color: #44ff44;">\u2705 ' + t.sameRegionIP + '</span>';
                    }

                } catch (error) {
                        debugConsolePush('checkSystemStatus failed: ' + (error && error.message ? error.message : error), 'error');
                        function getCookie(name) {
                            const value = '; ' + document.cookie;
                            const parts = value.split('; ' + name + '=');
                            if (parts.length === 2) {
                                const part = parts.pop();
                                if (part) return part.split(';').shift();
                            }
                            return null;
                        }

                        const browserLang = navigator.language || navigator.userLanguage || '';
                        const savedLang = safeLocalStorageGet('preferredLanguage') || getCookie('preferredLanguage');
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
                    subtitle: 'Multi-client Support \u2022 Smart Optimization \u2022 One-Click Generation',
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
                    kvEnabled: '\u2705 KV Storage Enabled, Config Management Available',
                    kvDisabled: '\u26A0\uFE0F KV Storage Disabled or Not Configured',
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
                    currentConfig: '\u{1F4CD} Current Path Config',
                    refreshConfig: 'Refresh Config',
                    resetConfig: 'Reset Config',
                    subscriptionCopied: 'Subscription Link Copied',
                    autoSubscriptionCopied: 'Auto-detected subscription link copied. Client will be recognized by User-Agent.',
                    trojanPasswordPlaceholder: 'Leave empty to use UUID',
                    trojanPasswordHint: 'Set custom Trojan password. Leave empty to use UUID. Client will auto-hash password with SHA224.',
                    protocolHint: 'Multiple protocols can be enabled.<br>\u2022 VLESS WS: Standard WebSocket protocol<br>\u2022 VMess WS: WebSocket-based VMess (link generation)<br>\u2022 Shadowsocks: WebSocket-based SS (link generation)<br>\u2022 Trojan: Uses SHA224 password auth<br>\u2022 xhttp: HTTP POST camouflage (requires custom domain & gRPC)',
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
                    apiEnabledHint: '\u26A0\uFE0F Security Warning: Enabling API allows dynamic preferred IP addition. Use only if needed.',
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
                        US: '\u{1F1FA}\u{1F1F8} US', SG: '\u{1F1F8}\u{1F1EC} Singapore', JP: '\u{1F1EF}\u{1F1F5} Japan',
                        KR: '\u{1F1F0}\u{1F1F7} South Korea', DE: '\u{1F1E9}\u{1F1EA} Germany', SE: '\u{1F1F8}\u{1F1EA} Sweden', NL: '\u{1F1F3}\u{1F1F1} Netherlands',
                        FI: '\u{1F1EB}\u{1F1EE} Finland', GB: '\u{1F1EC}\u{1F1E7} UK', FR: '\u{1F1EB}\u{1F1F7} France', CA: '\u{1F1E8}\u{1F1E6} Canada',
                        AU: '\u{1F1E6}\u{1F1FA} Australia', HK: '\u{1F1ED}\u{1F1F0} Hong Kong', TW: '\u{1F1F9}\u{1F1FC} Taiwan'
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
                    kvNotConfigured: 'KV Storage not configured. Config management unavailable.

Please in Cloudflare Workers:
1. Create KV Namespace
2. Bind variable C
3. Redeploy',
                    kvNotEnabled: 'KV Storage Not Configured',
                    kvCheckFailed: 'KV Check Failed: Invalid Response',
                    kvCheckFailedStatus: 'KV Check Failed - Status: ',
                    kvCheckFailedError: 'KV Check Failed - Error: '
                },
                            fa: {
                                workerRegion: '\u0645\u0646\u0637\u0642\u0647 Worker: ',
                                detectionMethod: '\u0631\u0648\u0634 \u062A\u0634\u062E\u06CC\u0635: ',
                                proxyIPStatus: '\u0648\u0636\u0639\u06CC\u062A ProxyIP: ',
                                currentIP: 'IP \u0641\u0639\u0644\u06CC: ',
                                regionMatch: '\u062A\u0637\u0628\u06CC\u0642 \u0645\u0646\u0637\u0642\u0647: ',
                                detectionFailed: '\u062A\u0634\u062E\u06CC\u0635 \u0646\u0627\u0645\u0648\u0641\u0642'
                            }
                        };

                        const t = getTranslations();

                        document.getElementById('regionStatus').innerHTML = t.workerRegion + '<span style="color: #ff4444;">\u274C ' + t.detectionFailed + '</span>';
                        document.getElementById('geoInfo').innerHTML = t.detectionMethod + '<span style="color: #ff4444;">\u274C ' + t.detectionFailed + '</span>';
                        document.getElementById('backupStatus').innerHTML = t.proxyIPStatus + '<span style="color: #ff4444;">\u274C ' + t.detectionFailed + '</span>';
                        document.getElementById('currentIP').innerHTML = t.currentIP + '<span style="color: #ff4444;">\u274C ' + t.detectionFailed + '</span>';
                        document.getElementById('regionMatch').innerHTML = t.regionMatch + '<span style="color: #ff4444;">\u274C ' + t.detectionFailed + '</span>';
                }
            }

                async function testAPI() {
                    try {
                        function getCookie(name) {
                            const value = '; ' + document.cookie;
                            const parts = value.split('; ' + name + '=');
                            if (parts.length === 2) {
                                const part = parts.pop();
                                if (part) return part.split(';').shift();
                            }
                            return null;
                        }

                        const browserLang = navigator.language || navigator.userLanguage || '';
                        const savedLang = safeLocalStorageGet('preferredLanguage') || getCookie('preferredLanguage');
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
                    subtitle: 'Multi-client Support \u2022 Smart Optimization \u2022 One-Click Generation',
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
                    kvEnabled: '\u2705 KV Storage Enabled, Config Management Available',
                    kvDisabled: '\u26A0\uFE0F KV Storage Disabled or Not Configured',
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
                    currentConfig: '\u{1F4CD} Current Path Config',
                    refreshConfig: 'Refresh Config',
                    resetConfig: 'Reset Config',
                    subscriptionCopied: 'Subscription Link Copied',
                    autoSubscriptionCopied: 'Auto-detected subscription link copied. Client will be recognized by User-Agent.',
                    trojanPasswordPlaceholder: 'Leave empty to use UUID',
                    trojanPasswordHint: 'Set custom Trojan password. Leave empty to use UUID. Client will auto-hash password with SHA224.',
                    protocolHint: 'Multiple protocols can be enabled.<br>\u2022 VLESS WS: Standard WebSocket protocol<br>\u2022 VMess WS: WebSocket-based VMess (link generation)<br>\u2022 Shadowsocks: WebSocket-based SS (link generation)<br>\u2022 Trojan: Uses SHA224 password auth<br>\u2022 xhttp: HTTP POST camouflage (requires custom domain & gRPC)',
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
                    apiEnabledHint: '\u26A0\uFE0F Security Warning: Enabling API allows dynamic preferred IP addition. Use only if needed.',
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
                        US: '\u{1F1FA}\u{1F1F8} US', SG: '\u{1F1F8}\u{1F1EC} Singapore', JP: '\u{1F1EF}\u{1F1F5} Japan',
                        KR: '\u{1F1F0}\u{1F1F7} South Korea', DE: '\u{1F1E9}\u{1F1EA} Germany', SE: '\u{1F1F8}\u{1F1EA} Sweden', NL: '\u{1F1F3}\u{1F1F1} Netherlands',
                        FI: '\u{1F1EB}\u{1F1EE} Finland', GB: '\u{1F1EC}\u{1F1E7} UK', FR: '\u{1F1EB}\u{1F1F7} France', CA: '\u{1F1E8}\u{1F1E6} Canada',
                        AU: '\u{1F1E6}\u{1F1FA} Australia', HK: '\u{1F1ED}\u{1F1F0} Hong Kong', TW: '\u{1F1F9}\u{1F1FC} Taiwan'
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
                    kvNotConfigured: 'KV Storage not configured. Config management unavailable.

Please in Cloudflare Workers:
1. Create KV Namespace
2. Bind variable C
3. Redeploy',
                    kvNotEnabled: 'KV Storage Not Configured',
                    kvCheckFailed: 'KV Check Failed: Invalid Response',
                    kvCheckFailedStatus: 'KV Check Failed - Status: ',
                    kvCheckFailedError: 'KV Check Failed - Error: '
                },
                            fa: {
                                apiTestResult: '\u0646\u062A\u06CC\u062C\u0647 \u062A\u0634\u062E\u06CC\u0635 API: ',
                                apiTestTime: '\u0632\u0645\u0627\u0646 \u062A\u0634\u062E\u06CC\u0635: ',
                                apiTestFailed: '\u062A\u0634\u062E\u06CC\u0635 API \u0646\u0627\u0645\u0648\u0641\u0642: ',
                                unknownError: '\u062E\u0637\u0627\u06CC \u0646\u0627\u0634\u0646\u0627\u062E\u062A\u0647',
                                apiTestError: '\u062A\u0633\u062A API \u0646\u0627\u0645\u0648\u0641\u0642: '
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
                            if (parts.length === 2) {
                                const part = parts.pop();
                                if (part) return part.split(';').shift();
                            }
                            return null;
                        }

                        const browserLang = navigator.language || navigator.userLanguage || '';
                        const savedLang = safeLocalStorageGet('preferredLanguage') || getCookie('preferredLanguage');
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
                    subtitle: 'Multi-client Support \u2022 Smart Optimization \u2022 One-Click Generation',
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
                    kvEnabled: '\u2705 KV Storage Enabled, Config Management Available',
                    kvDisabled: '\u26A0\uFE0F KV Storage Disabled or Not Configured',
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
                    currentConfig: '\u{1F4CD} Current Path Config',
                    refreshConfig: 'Refresh Config',
                    resetConfig: 'Reset Config',
                    subscriptionCopied: 'Subscription Link Copied',
                    autoSubscriptionCopied: 'Auto-detected subscription link copied. Client will be recognized by User-Agent.',
                    trojanPasswordPlaceholder: 'Leave empty to use UUID',
                    trojanPasswordHint: 'Set custom Trojan password. Leave empty to use UUID. Client will auto-hash password with SHA224.',
                    protocolHint: 'Multiple protocols can be enabled.<br>\u2022 VLESS WS: Standard WebSocket protocol<br>\u2022 VMess WS: WebSocket-based VMess (link generation)<br>\u2022 Shadowsocks: WebSocket-based SS (link generation)<br>\u2022 Trojan: Uses SHA224 password auth<br>\u2022 xhttp: HTTP POST camouflage (requires custom domain & gRPC)',
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
                    apiEnabledHint: '\u26A0\uFE0F Security Warning: Enabling API allows dynamic preferred IP addition. Use only if needed.',
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
                        US: '\u{1F1FA}\u{1F1F8} US', SG: '\u{1F1F8}\u{1F1EC} Singapore', JP: '\u{1F1EF}\u{1F1F5} Japan',
                        KR: '\u{1F1F0}\u{1F1F7} South Korea', DE: '\u{1F1E9}\u{1F1EA} Germany', SE: '\u{1F1F8}\u{1F1EA} Sweden', NL: '\u{1F1F3}\u{1F1F1} Netherlands',
                        FI: '\u{1F1EB}\u{1F1EE} Finland', GB: '\u{1F1EC}\u{1F1E7} UK', FR: '\u{1F1EB}\u{1F1F7} France', CA: '\u{1F1E8}\u{1F1E6} Canada',
                        AU: '\u{1F1E6}\u{1F1FA} Australia', HK: '\u{1F1ED}\u{1F1F0} Hong Kong', TW: '\u{1F1F9}\u{1F1FC} Taiwan'
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
                    kvNotConfigured: 'KV Storage not configured. Config management unavailable.

Please in Cloudflare Workers:
1. Create KV Namespace
2. Bind variable C
3. Redeploy',
                    kvNotEnabled: 'KV Storage Not Configured',
                    kvCheckFailed: 'KV Check Failed: Invalid Response',
                    kvCheckFailedStatus: 'KV Check Failed - Status: ',
                    kvCheckFailedError: 'KV Check Failed - Error: '
                },
                            fa: { apiTestError: '\u062A\u0633\u062A API \u0646\u0627\u0645\u0648\u0641\u0642: ' }
                        };

                        const t = getTranslations();
                        alert(t.apiTestError + error.message);
                }
            }

            // \u914D\u7F6E\u7BA1\u7406\u76F8\u5173\u51FD\u6570
            async function checkKVStatus() {
                const apiUrl = window.location.pathname + '/api/config';

                try {
                    const response = await fetch(apiUrl);

                        function getCookie(name) {
                            const value = '; ' + document.cookie;
                            const parts = value.split('; ' + name + '=');
                            if (parts.length === 2) {
                                const part = parts.pop();
                                if (part) return part.split(';').shift();
                            }
                            return null;
                        }

                        const browserLang = navigator.language || navigator.userLanguage || '';
                        const savedLang = safeLocalStorageGet('preferredLanguage') || getCookie('preferredLanguage');
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
                    subtitle: 'Multi-client Support \u2022 Smart Optimization \u2022 One-Click Generation',
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
                    kvEnabled: '\u2705 KV Storage Enabled, Config Management Available',
                    kvDisabled: '\u26A0\uFE0F KV Storage Disabled or Not Configured',
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
                    currentConfig: '\u{1F4CD} Current Path Config',
                    refreshConfig: 'Refresh Config',
                    resetConfig: 'Reset Config',
                    subscriptionCopied: 'Subscription Link Copied',
                    autoSubscriptionCopied: 'Auto-detected subscription link copied. Client will be recognized by User-Agent.',
                    trojanPasswordPlaceholder: 'Leave empty to use UUID',
                    trojanPasswordHint: 'Set custom Trojan password. Leave empty to use UUID. Client will auto-hash password with SHA224.',
                    protocolHint: 'Multiple protocols can be enabled.<br>\u2022 VLESS WS: Standard WebSocket protocol<br>\u2022 VMess WS: WebSocket-based VMess (link generation)<br>\u2022 Shadowsocks: WebSocket-based SS (link generation)<br>\u2022 Trojan: Uses SHA224 password auth<br>\u2022 xhttp: HTTP POST camouflage (requires custom domain & gRPC)',
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
                    apiEnabledHint: '\u26A0\uFE0F Security Warning: Enabling API allows dynamic preferred IP addition. Use only if needed.',
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
                        US: '\u{1F1FA}\u{1F1F8} US', SG: '\u{1F1F8}\u{1F1EC} Singapore', JP: '\u{1F1EF}\u{1F1F5} Japan',
                        KR: '\u{1F1F0}\u{1F1F7} South Korea', DE: '\u{1F1E9}\u{1F1EA} Germany', SE: '\u{1F1F8}\u{1F1EA} Sweden', NL: '\u{1F1F3}\u{1F1F1} Netherlands',
                        FI: '\u{1F1EB}\u{1F1EE} Finland', GB: '\u{1F1EC}\u{1F1E7} UK', FR: '\u{1F1EB}\u{1F1F7} France', CA: '\u{1F1E8}\u{1F1E6} Canada',
                        AU: '\u{1F1E6}\u{1F1FA} Australia', HK: '\u{1F1ED}\u{1F1F0} Hong Kong', TW: '\u{1F1F9}\u{1F1FC} Taiwan'
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
                    kvNotConfigured: 'KV Storage not configured. Config management unavailable.

Please in Cloudflare Workers:
1. Create KV Namespace
2. Bind variable C
3. Redeploy',
                    kvNotEnabled: 'KV Storage Not Configured',
                    kvCheckFailed: 'KV Check Failed: Invalid Response',
                    kvCheckFailedStatus: 'KV Check Failed - Status: ',
                    kvCheckFailedError: 'KV Check Failed - Error: '
                },
                            fa: {
                                kvDisabled: '\u26A0\uFE0F \u0630\u062E\u06CC\u0631\u0647\u200C\u0633\u0627\u0632\u06CC KV \u0641\u0639\u0627\u0644 \u0646\u06CC\u0633\u062A \u06CC\u0627 \u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC \u0646\u0634\u062F\u0647 \u0627\u0633\u062A',
                                kvNotConfigured: '\u26A0\uFE0F \u0630\u062E\u06CC\u0631\u0647\u200C\u0633\u0627\u0632\u06CC KV \u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC \u0646\u0634\u062F\u0647 \u0627\u0633\u062A. \u067E\u0646\u0644 \u06AF\u0631\u0627\u0641\u06CC\u06A9\u06CC \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0627\u0633\u062A.\\n\\n\u{1F527} \u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u062A\u0639\u0645\u06CC\u0631:\\n1. \u0628\u0647 \u067E\u0646\u0644 Cloudflare -> Workers -> KV \u0628\u0631\u0648\u06CC\u062F.\\n2. \u06CC\u06A9 Namespace \u062C\u062F\u06CC\u062F \u0628\u0633\u0627\u0632\u06CC\u062F.\\n3. \u062F\u0631 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A Worker -> Variables -> KV Bindings.\\n4. \u0645\u062A\u063A\u06CC\u0631\u06CC \u0628\u0627 \u0646\u0627\u0645 "C" (\u0628\u0632\u0631\u06AF) \u0627\u0636\u0627\u0641\u0647 \u06A9\u0631\u062F\u0647 \u0648 \u0628\u0647 KV \u0645\u062A\u0635\u0644 \u06A9\u0646\u06CC\u062F.\\n5. \u0630\u062E\u06CC\u0631\u0647 \u0648 Deploy \u06A9\u0646\u06CC\u062F.',
                                kvNotEnabled: 'KV \u0645\u062A\u0635\u0644 \u0646\u06CC\u0633\u062A. \u0644\u0637\u0641\u0627\u064B \u0637\u0628\u0642 \u0631\u0627\u0647\u0646\u0645\u0627 \u062A\u0646\u0638\u06CC\u0645 \u06A9\u0646\u06CC\u062F',
                                kvEnabled: '\u2705 \u0630\u062E\u06CC\u0631\u0647\u200C\u0633\u0627\u0632\u06CC KV \u0641\u0639\u0627\u0644 \u0627\u0633\u062A\u060C \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC\u062F \u0627\u0632 \u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646\u06CC\u062F',
                                kvCheckFailed: '\u26A0\uFE0F \u0628\u0631\u0631\u0633\u06CC \u0630\u062E\u06CC\u0631\u0647\u200C\u0633\u0627\u0632\u06CC KV \u0646\u0627\u0645\u0648\u0641\u0642',
                                kvCheckFailedFormat: '\u0628\u0631\u0631\u0633\u06CC \u0630\u062E\u06CC\u0631\u0647\u200C\u0633\u0627\u0632\u06CC KV \u0646\u0627\u0645\u0648\u0641\u0642: \u062E\u0637\u0627\u06CC \u0641\u0631\u0645\u062A \u067E\u0627\u0633\u062E',
                                kvCheckFailedStatus: '\u0628\u0631\u0631\u0633\u06CC \u0630\u062E\u06CC\u0631\u0647\u200C\u0633\u0627\u0632\u06CC KV \u0646\u0627\u0645\u0648\u0641\u0642 - \u06A9\u062F \u0648\u0636\u0639\u06CC\u062A: ',
                                kvCheckFailedError: '\u0628\u0631\u0631\u0633\u06CC \u0630\u062E\u06CC\u0631\u0647\u200C\u0633\u0627\u0632\u06CC KV \u0646\u0627\u0645\u0648\u0641\u0642 - \u062E\u0637\u0627: '
                            }
                        };

                        const t = getTranslations();

                        if (response.status === 503) {
                            // KV\u672A\u914D\u7F6E
                            document.getElementById('kvStatus').innerHTML = '<span style="color: #ffaa00;">' + t.kvDisabled + '</span>';
                            document.getElementById('configCard').style.display = 'block';
                            document.getElementById('currentConfig').textContent = t.kvNotConfigured;
                    } else if (response.ok) {
                        try {
                        const data = await response.json();

                            // \u68C0\u67E5\u54CD\u5E94\u662F\u5426\u5305\u542BKV\u914D\u7F6E\u4FE1\u606F
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
                        if (parts.length === 2) {
                            const part = parts.pop();
                            if (part) return part.split(';').shift();
                        }
                        return null;
                    }

                    const browserLang = navigator.language || navigator.userLanguage || '';
                    const savedLang = safeLocalStorageGet('preferredLanguage') || getCookie('preferredLanguage');
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
                    subtitle: 'Multi-client Support \u2022 Smart Optimization \u2022 One-Click Generation',
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
                    kvEnabled: '\u2705 KV Storage Enabled, Config Management Available',
                    kvDisabled: '\u26A0\uFE0F KV Storage Disabled or Not Configured',
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
                    currentConfig: '\u{1F4CD} Current Path Config',
                    refreshConfig: 'Refresh Config',
                    resetConfig: 'Reset Config',
                    subscriptionCopied: 'Subscription Link Copied',
                    autoSubscriptionCopied: 'Auto-detected subscription link copied. Client will be recognized by User-Agent.',
                    trojanPasswordPlaceholder: 'Leave empty to use UUID',
                    trojanPasswordHint: 'Set custom Trojan password. Leave empty to use UUID. Client will auto-hash password with SHA224.',
                    protocolHint: 'Multiple protocols can be enabled.<br>\u2022 VLESS WS: Standard WebSocket protocol<br>\u2022 VMess WS: WebSocket-based VMess (link generation)<br>\u2022 Shadowsocks: WebSocket-based SS (link generation)<br>\u2022 Trojan: Uses SHA224 password auth<br>\u2022 xhttp: HTTP POST camouflage (requires custom domain & gRPC)',
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
                    apiEnabledHint: '\u26A0\uFE0F Security Warning: Enabling API allows dynamic preferred IP addition. Use only if needed.',
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
                        US: '\u{1F1FA}\u{1F1F8} US', SG: '\u{1F1F8}\u{1F1EC} Singapore', JP: '\u{1F1EF}\u{1F1F5} Japan',
                        KR: '\u{1F1F0}\u{1F1F7} South Korea', DE: '\u{1F1E9}\u{1F1EA} Germany', SE: '\u{1F1F8}\u{1F1EA} Sweden', NL: '\u{1F1F3}\u{1F1F1} Netherlands',
                        FI: '\u{1F1EB}\u{1F1EE} Finland', GB: '\u{1F1EC}\u{1F1E7} UK', FR: '\u{1F1EB}\u{1F1F7} France', CA: '\u{1F1E8}\u{1F1E6} Canada',
                        AU: '\u{1F1E6}\u{1F1FA} Australia', HK: '\u{1F1ED}\u{1F1F0} Hong Kong', TW: '\u{1F1F9}\u{1F1FC} Taiwan'
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
                    kvNotConfigured: 'KV Storage not configured. Config management unavailable.

Please in Cloudflare Workers:
1. Create KV Namespace
2. Bind variable C
3. Redeploy',
                    kvNotEnabled: 'KV Storage Not Configured',
                    kvCheckFailed: 'KV Check Failed: Invalid Response',
                    kvCheckFailedStatus: 'KV Check Failed - Status: ',
                    kvCheckFailedError: 'KV Check Failed - Error: '
                },
                        fa: {
                            kvDisabled: '\u26A0\uFE0F \u0630\u062E\u06CC\u0631\u0647\u200C\u0633\u0627\u0632\u06CC KV \u0641\u0639\u0627\u0644 \u0646\u06CC\u0633\u062A \u06CC\u0627 \u067E\u06CC\u06A9\u0631\u0628\u0646\u062F\u06CC \u0646\u0634\u062F\u0647 \u0627\u0633\u062A',
                            kvCheckFailedError: '\u0628\u0631\u0631\u0633\u06CC \u0630\u062E\u06CC\u0631\u0647\u200C\u0633\u0627\u0632\u06CC KV \u0646\u0627\u0645\u0648\u0641\u0642 - \u062E\u0637\u0627: '
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

                    // \u8FC7\u6EE4\u6389\u5185\u90E8\u5B57\u6BB5 kvEnabled
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

                    // \u66F4\u65B0\u8868\u5355\u503C
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
                        // \u66F4\u65B0wk\u5730\u533A\u9009\u62E9\u72B6\u6001
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
                            // \u66F4\u65B0wk\u5730\u533A\u9009\u62E9\u72B6\u6001
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
                        echStatusEl.innerHTML = t.echStatusLabel + ' <span style="color: #44ff44;">\u2705 ' + t.statusEnabled + (echConfigLength ? ' (' + t.configLengthLabel + ': ' + echConfigLength + ')' : '') + '</span>';
                    } else {
                        echStatusEl.innerHTML = t.echStatusLabel + ' <span style="color: #ffaa00;">\u26A0\uFE0F ' + t.statusDisabled + '</span>';
                    }
                } catch (error) {
                    debugConsolePush('checkECHStatus failed: ' + (error && error.message ? error.message : error), 'error');
                    echStatusEl.innerHTML = t.echStatusLabel + ' <span style="color: #ff4444;">\u274C ' + t.statusCheckFailed + ': ' + error.message + '</span>';
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
                    const savedTestInput = safeLocalStorageGet('latencyTestInput');
                    if (savedTestInput) latencyTestInput.value = savedTestInput;
                    latencyTestInput.addEventListener('input', function() {
                        safeLocalStorageSet('latencyTestInput', this.value);
                    });
                }
                if (fetchURLInput) {
                    const savedFetchURL = safeLocalStorageGet('fetchURLInput');
                    if (savedFetchURL) fetchURLInput.value = savedFetchURL;
                    fetchURLInput.addEventListener('input', function() {
                        safeLocalStorageSet('fetchURLInput', this.value);
                    });
                }
                if (latencyTestPort) {
                    const savedPort = safeLocalStorageGet('latencyTestPort');
                    if (savedPort) latencyTestPort.value = savedPort;
                    latencyTestPort.addEventListener('input', function() {
                        safeLocalStorageSet('latencyTestPort', this.value);
                    });
                }
                if (randomIPCount) {
                    const savedCount = safeLocalStorageGet('randomIPCount');
                    if (savedCount) randomIPCount.value = savedCount;
                    randomIPCount.addEventListener('input', function() {
                        safeLocalStorageSet('randomIPCount', this.value);
                    });
                    // On init, if hidden by default, disable input box
                    if (randomCountDiv && randomCountDiv.style.display === 'none') {
                        randomIPCount.disabled = true;
                    }
                }
                const testThreadsInput = document.getElementById('testThreads');
                if (testThreadsInput) {
                    const savedThreads = safeLocalStorageGet('testThreads');
                    if (savedThreads) testThreadsInput.value = savedThreads;
                    testThreadsInput.addEventListener('input', function() {
                        safeLocalStorageSet('testThreads', this.value);
                    });
                }
                if (ipSourceSelect) {
                    const savedSource = safeLocalStorageGet('ipSourceSelect');
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
                        safeLocalStorageSet('ipSourceSelect', value);
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
                            fetchIPBtn.textContent = '\u2B07 ' + t.fetchIP;
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
                    'SJC': '\u{1F1FA}\u{1F1F8} \u5723\u4F55\u585E', 'LAX': '\u{1F1FA}\u{1F1F8} \u6D1B\u6749\u77F6', 'SEA': '\u{1F1FA}\u{1F1F8} \u897F\u96C5\u56FE', 'SFO': '\u{1F1FA}\u{1F1F8} \u65E7\u91D1\u5C71', 'DFW': '\u{1F1FA}\u{1F1F8} \u8FBE\u62C9\u65AF',
                    'ORD': '\u{1F1FA}\u{1F1F8} \u829D\u52A0\u54E5', 'IAD': '\u{1F1FA}\u{1F1F8} \u534E\u76DB\u987F', 'ATL': '\u{1F1FA}\u{1F1F8} \u4E9A\u7279\u5170\u5927', 'MIA': '\u{1F1FA}\u{1F1F8} \u8FC8\u963F\u5BC6', 'DEN': '\u{1F1FA}\u{1F1F8} \u4E39\u4F5B',
                    'PHX': '\u{1F1FA}\u{1F1F8} \u51E4\u51F0\u57CE', 'BOS': '\u{1F1FA}\u{1F1F8} \u6CE2\u58EB\u987F', 'EWR': '\u{1F1FA}\u{1F1F8} \u7EBD\u74E6\u514B', 'JFK': '\u{1F1FA}\u{1F1F8} \u7EBD\u7EA6', 'LAS': '\u{1F1FA}\u{1F1F8} \u62C9\u65AF\u7EF4\u52A0\u65AF',
                    'MSP': '\u{1F1FA}\u{1F1F8} \u660E\u5C3C\u963F\u6CE2\u5229\u65AF', 'DTW': '\u{1F1FA}\u{1F1F8} \u5E95\u7279\u5F8B', 'PHL': '\u{1F1FA}\u{1F1F8} \u8D39\u57CE', 'CLT': '\u{1F1FA}\u{1F1F8} \u590F\u6D1B\u7279', 'SLC': '\u{1F1FA}\u{1F1F8} \u76D0\u6E56\u57CE',
                    'PDX': '\u{1F1FA}\u{1F1F8} \u6CE2\u7279\u5170', 'SAN': '\u{1F1FA}\u{1F1F8} \u5723\u5730\u4E9A\u54E5', 'TPA': '\u{1F1FA}\u{1F1F8} \u5766\u5E15', 'IAH': '\u{1F1FA}\u{1F1F8} \u4F11\u65AF\u987F', 'MCO': '\u{1F1FA}\u{1F1F8} \u5965\u5170\u591A',
                    'AUS': '\u{1F1FA}\u{1F1F8} \u5965\u65AF\u6C40', 'BNA': '\u{1F1FA}\u{1F1F8} \u7EB3\u4EC0\u7EF4\u5C14', 'RDU': '\u{1F1FA}\u{1F1F8} \u7F57\u5229', 'IND': '\u{1F1FA}\u{1F1F8} \u5370\u7B2C\u5B89\u7EB3\u6CE2\u5229\u65AF', 'CMH': '\u{1F1FA}\u{1F1F8} \u54E5\u4F26\u5E03',
                    'MCI': '\u{1F1FA}\u{1F1F8} \u582A\u8428\u65AF\u57CE', 'OMA': '\u{1F1FA}\u{1F1F8} \u5965\u9A6C\u54C8', 'ABQ': '\u{1F1FA}\u{1F1F8} \u963F\u5C14\u4F2F\u514B\u57FA', 'OKC': '\u{1F1FA}\u{1F1F8} \u4FC4\u514B\u62C9\u8377\u9A6C\u57CE', 'MEM': '\u{1F1FA}\u{1F1F8} \u5B5F\u83F2\u65AF',
                    'JAX': '\u{1F1FA}\u{1F1F8} \u6770\u514B\u900A\u7EF4\u5C14', 'RIC': '\u{1F1FA}\u{1F1F8} \u91CC\u58EB\u6EE1', 'BUF': '\u{1F1FA}\u{1F1F8} \u5E03\u6CD5\u7F57', 'PIT': '\u{1F1FA}\u{1F1F8} \u5339\u5179\u5821', 'CLE': '\u{1F1FA}\u{1F1F8} \u514B\u5229\u592B\u5170',
                    'CVG': '\u{1F1FA}\u{1F1F8} \u8F9B\u8F9B\u90A3\u63D0', 'MKE': '\u{1F1FA}\u{1F1F8} \u5BC6\u5C14\u6C83\u57FA', 'STL': '\u{1F1FA}\u{1F1F8} \u5723\u8DEF\u6613\u65AF', 'SAT': '\u{1F1FA}\u{1F1F8} \u5723\u5B89\u4E1C\u5C3C\u5965', 'HNL': '\u{1F1FA}\u{1F1F8} \u6A80\u9999\u5C71',
                    'ANC': '\u{1F1FA}\u{1F1F8} \u5B89\u514B\u96F7\u5947', 'SMF': '\u{1F1FA}\u{1F1F8} \u8428\u514B\u62C9\u95E8\u6258', 'ONT': '\u{1F1FA}\u{1F1F8} \u5B89\u5927\u7565', 'OAK': '\u{1F1FA}\u{1F1F8} \u5965\u514B\u5170',
                    'HKG': '\u{1F1ED}\u{1F1F0} \u9999\u6E2F', 'TPE': '\u{1F1F9}\u{1F1FC} \u53F0\u5317', 'TSA': '\u{1F1F9}\u{1F1FC} \u53F0\u5317\u677E\u5C71', 'KHH': '\u{1F1F9}\u{1F1FC} \u9AD8\u96C4',
                    'NRT': '\u{1F1EF}\u{1F1F5} \u4E1C\u4EAC\u6210\u7530', 'HND': '\u{1F1EF}\u{1F1F5} \u4E1C\u4EAC\u7FBD\u7530', 'KIX': '\u{1F1EF}\u{1F1F5} \u5927\u962A\u5173\u897F', 'ITM': '\u{1F1EF}\u{1F1F5} \u5927\u962A\u4F0A\u4E39', 'NGO': '\u{1F1EF}\u{1F1F5} \u540D\u53E4\u5C4B',
                    'FUK': '\u{1F1EF}\u{1F1F5} \u798F\u5188', 'CTS': '\u{1F1EF}\u{1F1F5} \u672D\u5E4C', 'OKA': '\u{1F1EF}\u{1F1F5} \u51B2\u7EF3',
                    'ICN': '\u{1F1F0}\u{1F1F7} \u9996\u5C14\u4EC1\u5DDD', 'GMP': '\u{1F1F0}\u{1F1F7} \u9996\u5C14\u91D1\u6D66', 'PUS': '\u{1F1F0}\u{1F1F7} \u91DC\u5C71',
                    'SIN': '\u{1F1F8}\u{1F1EC} \u65B0\u52A0\u5761', 'BKK': '\u{1F1F9}\u{1F1ED} \u66FC\u8C37', 'DMK': '\u{1F1F9}\u{1F1ED} \u66FC\u8C37\u5ECA\u66FC', 'KUL': '\u{1F1F2}\u{1F1FE} \u5409\u9686\u5761', 'CGK': '\u{1F1EE}\u{1F1E9} \u96C5\u52A0\u8FBE',
                    'MNL': '\u{1F1F5}\u{1F1ED} \u9A6C\u5C3C\u62C9', 'CEB': '\u{1F1F5}\u{1F1ED} \u5BBF\u52A1', 'HAN': '\u{1F1FB}\u{1F1F3} \u6CB3\u5185', 'SGN': '\u{1F1FB}\u{1F1F3} \u80E1\u5FD7\u660E', 'DAD': '\u{1F1FB}\u{1F1F3} \u5C98\u6E2F',
                    'RGN': '\u{1F1F2}\u{1F1F2} \u4EF0\u5149', 'PNH': '\u{1F1F0}\u{1F1ED} \u91D1\u8FB9', 'REP': '\u{1F1F0}\u{1F1ED} \u66B9\u7C92', 'VTE': '\u{1F1F1}\u{1F1E6} \u4E07\u8C61',
                    'BOM': '\u{1F1EE}\u{1F1F3} \u5B5F\u4E70', 'DEL': '\u{1F1EE}\u{1F1F3} \u65B0\u5FB7\u91CC', 'MAA': '\u{1F1EE}\u{1F1F3} \u91D1\u5948', 'BLR': '\u{1F1EE}\u{1F1F3} \u73ED\u52A0\u7F57\u5C14', 'CCU': '\u{1F1EE}\u{1F1F3} \u52A0\u5C14\u5404\u7B54',
                    'HYD': '\u{1F1EE}\u{1F1F3} \u6D77\u5F97\u62C9\u5DF4', 'AMD': '\u{1F1EE}\u{1F1F3} \u827E\u54C8\u8FC8\u8FBE\u5DF4\u5FB7', 'COK': '\u{1F1EE}\u{1F1F3} \u79D1\u94A6', 'PNQ': '\u{1F1EE}\u{1F1F3} \u6D66\u90A3', 'GOI': '\u{1F1EE}\u{1F1F3} \u679C\u963F',
                    'CMB': '\u{1F1F1}\u{1F1F0} \u79D1\u4F26\u5761', 'DAC': '\u{1F1E7}\u{1F1E9} \u8FBE\u5361', 'KTM': '\u{1F1F3}\u{1F1F5} \u52A0\u5FB7\u6EE1\u90FD', 'ISB': '\u{1F1F5}\u{1F1F0} \u4F0A\u65AF\u5170\u5821', 'KHI': '\u{1F1F5}\u{1F1F0} \u5361\u62C9\u5947', 'LHE': '\u{1F1F5}\u{1F1F0} \u62C9\u5408\u5C14',
                    'LHR': '\u{1F1EC}\u{1F1E7} \u4F26\u6566\u5E0C\u601D\u7F57', 'LGW': '\u{1F1EC}\u{1F1E7} \u4F26\u6566\u76D6\u7279\u5A01\u514B', 'STN': '\u{1F1EC}\u{1F1E7} \u4F26\u6566\u65AF\u5766\u65AF\u7279\u5FB7', 'LTN': '\u{1F1EC}\u{1F1E7} \u4F26\u6566\u5362\u987F', 'MAN': '\u{1F1EC}\u{1F1E7} \u66FC\u5F7B\u65AF\u7279', 'EDI': '\u{1F1EC}\u{1F1E7} \u7231\u4E01\u5821', 'BHX': '\u{1F1EC}\u{1F1E7} \u4F2F\u660E\u7FF0',
                    'CDG': '\u{1F1EB}\u{1F1F7} \u5DF4\u9ECE\u6234\u9AD8\u4E50', 'ORY': '\u{1F1EB}\u{1F1F7} \u5DF4\u9ECE\u5965\u5229', 'MRS': '\u{1F1EB}\u{1F1F7} \u9A6C\u8D5B', 'LYS': '\u{1F1EB}\u{1F1F7} \u91CC\u6602', 'NCE': '\u{1F1EB}\u{1F1F7} \u5C3C\u65AF',
                    'FRA': '\u{1F1E9}\u{1F1EA} \u6CD5\u5170\u514B\u798F', 'MUC': '\u{1F1E9}\u{1F1EA} \u6155\u5C3C\u9ED1', 'TXL': '\u{1F1E9}\u{1F1EA} \u67CF\u6797', 'BER': '\u{1F1E9}\u{1F1EA} \u67CF\u6797\u52C3\u5170\u767B\u5821', 'HAM': '\u{1F1E9}\u{1F1EA} \u6C49\u5821', 'DUS': '\u{1F1E9}\u{1F1EA} \u675C\u585E\u5C14\u591A\u592B', 'CGN': '\u{1F1E9}\u{1F1EA} \u79D1\u9686', 'STR': '\u{1F1E9}\u{1F1EA} \u65AF\u56FE\u52A0\u7279',
                    'AMS': '\u{1F1F3}\u{1F1F1} \u963F\u59C6\u65AF\u7279\u4E39', 'BRU': '\u{1F1E7}\u{1F1EA} \u5E03\u9C81\u585E\u5C14', 'LUX': '\u{1F1F1}\u{1F1FA} \u5362\u68EE\u5821',
                    'ZRH': '\u{1F1E8}\u{1F1ED} \u82CF\u9ECE\u4E16', 'GVA': '\u{1F1E8}\u{1F1ED} \u65E5\u5185\u74E6', 'BSL': '\u{1F1E8}\u{1F1ED} \u5DF4\u585E\u5C14',
                    'VIE': '\u{1F1E6}\u{1F1F9} \u7EF4\u4E5F\u7EB3', 'PRG': '\u{1F1E8}\u{1F1FF} \u5E03\u62C9\u683C', 'BUD': '\u{1F1ED}\u{1F1FA} \u5E03\u8FBE\u4F69\u65AF', 'WAW': '\u{1F1F5}\u{1F1F1} \u534E\u6C99', 'KRK': '\u{1F1F5}\u{1F1F1} \u514B\u62C9\u79D1\u592B',
                    'MXP': '\u{1F1EE}\u{1F1F9} \u7C73\u5170\u9A6C\u5C14\u5F6D\u8428', 'LIN': '\u{1F1EE}\u{1F1F9} \u7C73\u5170\u5229\u7EB3\u7279', 'FCO': '\u{1F1EE}\u{1F1F9} \u7F57\u9A6C', 'VCE': '\u{1F1EE}\u{1F1F9} \u5A01\u5C3C\u65AF', 'NAP': '\u{1F1EE}\u{1F1F9} \u90A3\u4E0D\u52D2\u65AF', 'FLR': '\u{1F1EE}\u{1F1F9} \u4F5B\u7F57\u4F26\u8428', 'BGY': '\u{1F1EE}\u{1F1F9} \u8D1D\u52A0\u83AB',
                    'MAD': '\u{1F1EA}\u{1F1F8} \u9A6C\u5FB7\u91CC', 'BCN': '\u{1F1EA}\u{1F1F8} \u5DF4\u585E\u7F57\u90A3', 'PMI': '\u{1F1EA}\u{1F1F8} \u5E15\u5C14\u9A6C', 'AGP': '\u{1F1EA}\u{1F1F8} \u9A6C\u62C9\u52A0', 'VLC': '\u{1F1EA}\u{1F1F8} \u74E6\u4F26\u897F\u4E9A', 'SVQ': '\u{1F1EA}\u{1F1F8} \u585E\u7EF4\u5229\u4E9A', 'BIO': '\u{1F1EA}\u{1F1F8} \u6BD5\u5C14\u5DF4\u9102',
                    'LIS': '\u{1F1F5}\u{1F1F9} \u91CC\u65AF\u672C', 'OPO': '\u{1F1F5}\u{1F1F9} \u6CE2\u5C14\u56FE', 'FAO': '\u{1F1F5}\u{1F1F9} \u6CD5\u9C81',
                    'DUB': '\u{1F1EE}\u{1F1EA} \u90FD\u67CF\u6797', 'CPH': '\u{1F1E9}\u{1F1F0} \u54E5\u672C\u54C8\u6839', 'ARN': '\u{1F1F8}\u{1F1EA} \u65AF\u5FB7\u54E5\u5C14\u6469', 'GOT': '\u{1F1F8}\u{1F1EA} \u54E5\u5FB7\u5821',
                    'OSL': '\u{1F1F3}\u{1F1F4} \u5965\u65AF\u9646', 'BGO': '\u{1F1F3}\u{1F1F4} \u5351\u5C14\u6839', 'HEL': '\u{1F1EB}\u{1F1EE} \u8D6B\u5C14\u8F9B\u57FA', 'RIX': '\u{1F1F1}\u{1F1FB} \u91CC\u52A0', 'TLL': '\u{1F1EA}\u{1F1EA} \u5854\u6797', 'VNO': '\u{1F1F1}\u{1F1F9} \u7EF4\u5C14\u7EBD\u65AF',
                    'ATH': '\u{1F1EC}\u{1F1F7} \u96C5\u5178', 'SKG': '\u{1F1EC}\u{1F1F7} \u585E\u8428\u6D1B\u5C3C\u57FA', 'SOF': '\u{1F1E7}\u{1F1EC} \u7D22\u975E\u4E9A', 'OTP': '\u{1F1F7}\u{1F1F4} \u5E03\u52A0\u52D2\u65AF\u7279', 'BEG': '\u{1F1F7}\u{1F1F8} \u8D1D\u5C14\u683C\u83B1\u5FB7', 'ZAG': '\u{1F1ED}\u{1F1F7} \u8428\u683C\u52D2\u5E03', 'LJU': '\u{1F1F8}\u{1F1EE} \u5362\u5E03\u5C14\u96C5\u90A3',
                    'KBP': '\u{1F1FA}\u{1F1E6} \u57FA\u8F85', 'IEV': '\u{1F1FA}\u{1F1E6} \u57FA\u8F85\u8339\u826F\u5C3C', 'ODS': '\u{1F1FA}\u{1F1E6} \u6556\u5FB7\u8428',
                    'SVO': '\u{1F1F7}\u{1F1FA} \u83AB\u65AF\u79D1\u8C22\u5217\u6885\u6377\u6C83', 'DME': '\u{1F1F7}\u{1F1FA} \u83AB\u65AF\u79D1\u591A\u83AB\u6770\u591A\u6C83', 'VKO': '\u{1F1F7}\u{1F1FA} \u83AB\u65AF\u79D1\u4F0F\u52AA\u79D1\u6C83', 'LED': '\u{1F1F7}\u{1F1FA} \u5723\u5F7C\u5F97\u5821',
                    'IST': '\u{1F1F9}\u{1F1F7} \u4F0A\u65AF\u5766\u5E03\u5C14', 'SAW': '\u{1F1F9}\u{1F1F7} \u4F0A\u65AF\u5766\u5E03\u5C14\u8428\u6BD4\u54C8', 'ESB': '\u{1F1F9}\u{1F1F7} \u5B89\u5361\u62C9', 'AYT': '\u{1F1F9}\u{1F1F7} \u5B89\u5854\u5229\u4E9A', 'ADB': '\u{1F1F9}\u{1F1F7} \u4F0A\u5179\u5BC6\u5C14',
                    'TLV': '\u{1F1EE}\u{1F1F1} \u7279\u62C9\u7EF4\u592B', 'AMM': '\u{1F1EF}\u{1F1F4} \u5B89\u66FC', 'BEY': '\u{1F1F1}\u{1F1E7} \u8D1D\u9C81\u7279', 'BAH': '\u{1F1E7}\u{1F1ED} \u5DF4\u6797', 'KWI': '\u{1F1F0}\u{1F1FC} \u79D1\u5A01\u7279',
                    'DXB': '\u{1F1E6}\u{1F1EA} \u8FEA\u62DC', 'AUH': '\u{1F1E6}\u{1F1EA} \u963F\u5E03\u624E\u6BD4', 'SHJ': '\u{1F1E6}\u{1F1EA} \u6C99\u8FE6', 'DOH': '\u{1F1F6}\u{1F1E6} \u591A\u54C8', 'MCT': '\u{1F1F4}\u{1F1F2} \u9A6C\u65AF\u5580\u7279',
                    'RUH': '\u{1F1F8}\u{1F1E6} \u5229\u96C5\u5F97', 'JED': '\u{1F1F8}\u{1F1E6} \u5409\u8FBE', 'DMM': '\u{1F1F8}\u{1F1E6} \u8FBE\u66FC',
                    'CAI': '\u{1F1EA}\u{1F1EC} \u5F00\u7F57', 'HBE': '\u{1F1EA}\u{1F1EC} \u4E9A\u5386\u5C71\u5927', 'SSH': '\u{1F1EA}\u{1F1EC} \u6C99\u59C6\u6C99\u4F0A\u8D6B',
                    'CMN': '\u{1F1F2}\u{1F1E6} \u5361\u8428\u5E03\u5170\u5361', 'RAK': '\u{1F1F2}\u{1F1E6} \u9A6C\u62C9\u5580\u4EC0', 'TUN': '\u{1F1F9}\u{1F1F3} \u7A81\u5C3C\u65AF', 'ALG': '\u{1F1E9}\u{1F1FF} \u963F\u5C14\u53CA\u5C14',
                    'LOS': '\u{1F1F3}\u{1F1EC} \u62C9\u5404\u65AF', 'ABV': '\u{1F1F3}\u{1F1EC} \u963F\u5E03\u8D3E', 'ACC': '\u{1F1EC}\u{1F1ED} \u963F\u514B\u62C9', 'NBO': '\u{1F1F0}\u{1F1EA} \u5185\u7F57\u6BD5', 'MBA': '\u{1F1F0}\u{1F1EA} \u8499\u5DF4\u8428', 'ADD': '\u{1F1EA}\u{1F1F9} \u4E9A\u7684\u65AF\u4E9A\u8D1D\u5DF4', 'DAR': '\u{1F1F9}\u{1F1FF} \u8FBE\u7D2F\u65AF\u8428\u62C9\u59C6',
                    'JNB': '\u{1F1FF}\u{1F1E6} \u7EA6\u7FF0\u5185\u65AF\u5821', 'CPT': '\u{1F1FF}\u{1F1E6} \u5F00\u666E\u6566', 'DUR': '\u{1F1FF}\u{1F1E6} \u5FB7\u73ED', 'HRE': '\u{1F1FF}\u{1F1FC} \u54C8\u62C9\u96F7', 'LUN': '\u{1F1FF}\u{1F1F2} \u5362\u8428\u5361',
                    'MRU': '\u{1F1F2}\u{1F1FA} \u6BDB\u91CC\u6C42\u65AF', 'SEZ': '\u{1F1F8}\u{1F1E8} \u585E\u820C\u5C14',
                    'SYD': '\u{1F1E6}\u{1F1FA} \u6089\u5C3C', 'MEL': '\u{1F1E6}\u{1F1FA} \u58A8\u5C14\u672C', 'BNE': '\u{1F1E6}\u{1F1FA} \u5E03\u91CC\u65AF\u73ED', 'PER': '\u{1F1E6}\u{1F1FA} \u73C0\u65AF', 'ADL': '\u{1F1E6}\u{1F1FA} \u963F\u5FB7\u83B1\u5FB7', 'CBR': '\u{1F1E6}\u{1F1FA} \u582A\u57F9\u62C9', 'OOL': '\u{1F1E6}\u{1F1FA} \u9EC4\u91D1\u6D77\u5CB8', 'CNS': '\u{1F1E6}\u{1F1FA} \u51EF\u6069\u65AF',
                    'AKL': '\u{1F1F3}\u{1F1FF} \u5965\u514B\u5170', 'WLG': '\u{1F1F3}\u{1F1FF} \u60E0\u7075\u987F', 'CHC': '\u{1F1F3}\u{1F1FF} \u57FA\u7763\u57CE', 'ZQN': '\u{1F1F3}\u{1F1FF} \u7687\u540E\u9547',
                    'NAN': '\u{1F1EB}\u{1F1EF} \u6960\u8FEA', 'PPT': '\u{1F1F5}\u{1F1EB} \u5E15\u76AE\u63D0', 'GUM': '\u{1F1EC}\u{1F1FA} \u5173\u5C9B',
                    'GRU': '\u{1F1E7}\u{1F1F7} \u5723\u4FDD\u7F57\u74DC\u9C81\u67F3\u65AF', 'CGH': '\u{1F1E7}\u{1F1F7} \u5723\u4FDD\u7F57\u5B54\u6208\u5C3C\u4E9A\u65AF', 'GIG': '\u{1F1E7}\u{1F1F7} \u91CC\u7EA6\u70ED\u5185\u5362', 'BSB': '\u{1F1E7}\u{1F1F7} \u5DF4\u897F\u5229\u4E9A', 'CNF': '\u{1F1E7}\u{1F1F7} \u8D1D\u6D1B\u5965\u91CC\u85CF\u7279', 'POA': '\u{1F1E7}\u{1F1F7} \u963F\u96F7\u683C\u91CC\u6E2F', 'CWB': '\u{1F1E7}\u{1F1F7} \u5E93\u91CC\u8482\u5DF4', 'FOR': '\u{1F1E7}\u{1F1F7} \u798F\u5854\u83B1\u8428', 'REC': '\u{1F1E7}\u{1F1F7} \u7D2F\u897F\u8153', 'SSA': '\u{1F1E7}\u{1F1F7} \u8428\u5C14\u74E6\u591A',
                    'EZE': '\u{1F1E6}\u{1F1F7} \u5E03\u5B9C\u8BFA\u65AF\u827E\u5229\u65AF', 'AEP': '\u{1F1E6}\u{1F1F7} \u5E03\u5B9C\u8BFA\u65AF\u827E\u5229\u65AF\u57CE', 'COR': '\u{1F1E6}\u{1F1F7} \u79D1\u5C14\u591A\u74E6', 'MDZ': '\u{1F1E6}\u{1F1F7} \u95E8\u591A\u8428',
                    'SCL': '\u{1F1E8}\u{1F1F1} \u5723\u5730\u4E9A\u54E5', 'LIM': '\u{1F1F5}\u{1F1EA} \u5229\u9A6C', 'BOG': '\u{1F1E8}\u{1F1F4} \u6CE2\u54E5\u5927', 'MDE': '\u{1F1E8}\u{1F1F4} \u9EA6\u5FB7\u6797', 'CLO': '\u{1F1E8}\u{1F1F4} \u5361\u5229',
                    'UIO': '\u{1F1EA}\u{1F1E8} \u57FA\u591A', 'GYE': '\u{1F1EA}\u{1F1E8} \u74DC\u4E9A\u57FA\u5C14', 'CCS': '\u{1F1FB}\u{1F1EA} \u52A0\u62C9\u52A0\u65AF', 'MVD': '\u{1F1FA}\u{1F1FE} \u8499\u5F97\u7EF4\u7684\u4E9A', 'ASU': '\u{1F1F5}\u{1F1FE} \u4E9A\u677E\u68EE',
                    'PTY': '\u{1F1F5}\u{1F1E6} \u5DF4\u62FF\u9A6C\u57CE', 'SJO': '\u{1F1E8}\u{1F1F7} \u5723\u4F55\u585E', 'GUA': '\u{1F1EC}\u{1F1F9} \u5371\u5730\u9A6C\u62C9\u57CE', 'SAL': '\u{1F1F8}\u{1F1FB} \u5723\u8428\u5C14\u74E6\u591A', 'TGU': '\u{1F1ED}\u{1F1F3} \u7279\u53E4\u897F\u52A0\u5C14\u5DF4', 'MGA': '\u{1F1F3}\u{1F1EE} \u9A6C\u90A3\u74DC', 'BZE': '\u{1F1E7}\u{1F1FF} \u4F2F\u5229\u5179\u57CE',
                    'MEX': '\u{1F1F2}\u{1F1FD} \u58A8\u897F\u54E5\u57CE', 'GDL': '\u{1F1F2}\u{1F1FD} \u74DC\u8FBE\u62C9\u54C8\u62C9', 'MTY': '\u{1F1F2}\u{1F1FD} \u8499\u7279\u96F7', 'CUN': '\u{1F1F2}\u{1F1FD} \u574E\u6606', 'TIJ': '\u{1F1F2}\u{1F1FD} \u8482\u534E\u7EB3', 'SJD': '\u{1F1F2}\u{1F1FD} \u5723\u4F55\u585E\u5FB7\u5C14\u5361\u6C83',
                    'YYZ': '\u{1F1E8}\u{1F1E6} \u591A\u4F26\u591A', 'YVR': '\u{1F1E8}\u{1F1E6} \u6E29\u54E5\u534E', 'YUL': '\u{1F1E8}\u{1F1E6} \u8499\u7279\u5229\u5C14', 'YYC': '\u{1F1E8}\u{1F1E6} \u5361\u5C14\u52A0\u91CC', 'YEG': '\u{1F1E8}\u{1F1E6} \u57C3\u5FB7\u8499\u987F', 'YOW': '\u{1F1E8}\u{1F1E6} \u6E25\u592A\u534E', 'YWG': '\u{1F1E8}\u{1F1E6} \u6E29\u5C3C\u4F2F', 'YHZ': '\u{1F1E8}\u{1F1E6} \u54C8\u5229\u6CD5\u514B\u65AF',
                    'HAV': '\u{1F1E8}\u{1F1FA} \u54C8\u74E6\u90A3', 'SJU': '\u{1F1F5}\u{1F1F7} \u5723\u80E1\u5B89', 'SDQ': '\u{1F1E9}\u{1F1F4} \u5723\u591A\u660E\u5404', 'PAP': '\u{1F1ED}\u{1F1F9} \u592A\u5B50\u6E2F', 'KIN': '\u{1F1EF}\u{1F1F2} \u91D1\u65AF\u987F', 'NAS': '\u{1F1E7}\u{1F1F8} \u62FF\u9A9A', 'MBJ': '\u{1F1EF}\u{1F1F2} \u8499\u7279\u54E5\u8D1D'
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

                    const filterModeEl = document.querySelector('input[name="cityFilterMode"]:checked');
                    const filterMode = filterModeEl && filterModeEl.value ? filterModeEl.value : 'all';
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
        <\/script>
    </body>
    </html>`;
  return new Response(pageHtml, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}
__name(handleSubscriptionPage, "handleSubscriptionPage");
async function parseTrojanHeader(buffer, ut) {
  const passwordToHash = tp || ut;
  const sha224Password = await sha224Hash(passwordToHash);
  if (buffer.byteLength < 56) {
    return {
      hasError: true,
      message: "invalid " + atob("dHJvamFu") + " data - too short"
    };
  }
  let crLfIndex = 56;
  if (new Uint8Array(buffer.slice(56, 57))[0] !== 13 || new Uint8Array(buffer.slice(57, 58))[0] !== 10) {
    return {
      hasError: true,
      message: "invalid " + atob("dHJvamFu") + " header format (missing CR LF)"
    };
  }
  const password = new TextDecoder().decode(buffer.slice(0, crLfIndex));
  if (password !== sha224Password) {
    return {
      hasError: true,
      message: "invalid " + atob("dHJvamFu") + " password"
    };
  }
  const socks5DataBuffer = buffer.slice(crLfIndex + 2);
  if (socks5DataBuffer.byteLength < 6) {
    return {
      hasError: true,
      message: atob("aW52YWxpZCBTT0NLUzUgcmVxdWVzdCBkYXRh")
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
__name(parseTrojanHeader, "parseTrojanHeader");
async function sha224Hash(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const K = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ];
  let H = [
    3238371032,
    914150663,
    812702999,
    4144912697,
    4290775857,
    1750603025,
    1694076839,
    3204075428
  ];
  const msgLen = data.length;
  const bitLen = msgLen * 8;
  const paddedLen = Math.ceil((msgLen + 9) / 64) * 64;
  const padded = new Uint8Array(paddedLen);
  padded.set(data);
  padded[msgLen] = 128;
  const view = new DataView(padded.buffer);
  view.setUint32(paddedLen - 4, bitLen, false);
  for (let chunk = 0; chunk < paddedLen; chunk += 64) {
    const W = new Uint32Array(64);
    for (let i = 0; i < 16; i++) {
      W[i] = view.getUint32(chunk + i * 4, false);
    }
    for (let i = 16; i < 64; i++) {
      const s0 = rightRotate(W[i - 15], 7) ^ rightRotate(W[i - 15], 18) ^ W[i - 15] >>> 3;
      const s1 = rightRotate(W[i - 2], 17) ^ rightRotate(W[i - 2], 19) ^ W[i - 2] >>> 10;
      W[i] = W[i - 16] + s0 + W[i - 7] + s1 >>> 0;
    }
    let [a, b, c, d, e, f, g, h] = H;
    for (let i = 0; i < 64; i++) {
      const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = e & f ^ ~e & g;
      const temp1 = h + S1 + ch + K[i] + W[i] >>> 0;
      const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = a & b ^ a & c ^ b & c;
      const temp2 = S0 + maj >>> 0;
      h = g;
      g = f;
      f = e;
      e = d + temp1 >>> 0;
      d = c;
      c = b;
      b = a;
      a = temp1 + temp2 >>> 0;
    }
    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
    H[5] = H[5] + f >>> 0;
    H[6] = H[6] + g >>> 0;
    H[7] = H[7] + h >>> 0;
  }
  const result = [];
  for (let i = 0; i < 7; i++) {
    result.push(
      (H[i] >>> 24 & 255).toString(16).padStart(2, "0"),
      (H[i] >>> 16 & 255).toString(16).padStart(2, "0"),
      (H[i] >>> 8 & 255).toString(16).padStart(2, "0"),
      (H[i] & 255).toString(16).padStart(2, "0")
    );
  }
  return result.join("");
}
__name(sha224Hash, "sha224Hash");
function rightRotate(value, amount) {
  return value >>> amount | value << 32 - amount;
}
__name(rightRotate, "rightRotate");
var ACTIVE_CONNECTIONS = 0;
var XHTTP_BUFFER_SIZE = 128 * 1024;
var CONNECT_TIMEOUT_MS = 5e3;
var IDLE_TIMEOUT_MS = 45e3;
var MAX_RETRIES = 2;
var MAX_CONCURRENT = 32;
function xhttp_sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
__name(xhttp_sleep, "xhttp_sleep");
function validate_uuid_xhttp(id, uuid) {
  for (let index = 0; index < 16; index++) {
    if (id[index] !== uuid[index]) {
      return false;
    }
  }
  return true;
}
__name(validate_uuid_xhttp, "validate_uuid_xhttp");
var XhttpCounter = class {
  static {
    __name(this, "XhttpCounter");
  }
  #total;
  constructor() {
    this.#total = 0;
  }
  get() {
    return this.#total;
  }
  add(size) {
    this.#total += size;
  }
};
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
__name(concat_typed_arrays, "concat_typed_arrays");
function parse_uuid_xhttp(uuid) {
  uuid = uuid.replaceAll("-", "");
  const r = [];
  for (let index = 0; index < 16; index++) {
    const v = parseInt(uuid.substr(index * 2, 2), 16);
    r.push(v);
  }
  return r;
}
__name(parse_uuid_xhttp, "parse_uuid_xhttp");
function get_xhttp_buffer(size) {
  return new Uint8Array(new ArrayBuffer(size || XHTTP_BUFFER_SIZE));
}
__name(get_xhttp_buffer, "get_xhttp_buffer");
async function read_xhttp_header(readable, uuid_str) {
  const reader = readable.getReader({ mode: "byob" });
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
      return "read address type failed";
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
    let hostname = "";
    idx = addr_plus1;
    switch (atype) {
      case ADDRESS_TYPE_IPV4:
        hostname = cache.slice(idx, idx + 4).join(".");
        break;
      case ADDRESS_TYPE_URL:
        hostname = new TextDecoder().decode(
          cache.slice(idx + 1, idx + 1 + cache[idx])
        );
        break;
      case ADDRESS_TYPE_IPV6:
        hostname = cache.slice(idx, idx + 16).reduce(
          (s, b2, i2, a) => i2 % 2 ? s.concat(((a[i2 - 1] << 8) + b2).toString(16)) : s,
          []
        ).join(":");
        break;
    }
    if (hostname.length < 1) {
      return "failed to parse hostname";
    }
    const data = cache.slice(header_len);
    return {
      hostname,
      port,
      data,
      resp: new Uint8Array([version, 0]),
      reader,
      done: r.done
    };
  } catch (error) {
    try {
      reader.releaseLock();
    } catch (_) {
    }
    throw error;
  }
}
__name(read_xhttp_header, "read_xhttp_header");
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
  __name(inner_upload, "inner_upload");
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
__name(upload_to_remote_xhttp, "upload_to_remote_xhttp");
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
    abort: /* @__PURE__ */ __name(() => {
      try {
        writer.abort();
      } catch (_) {
      }
    }, "abort")
  };
}
__name(create_xhttp_uploader, "create_xhttp_uploader");
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
        }
      },
      null,
      new ByteLengthQueuingStrategy({ highWaterMark: XHTTP_BUFFER_SIZE })
    );
    let lastActivity = Date.now();
    const idleTimer = setInterval(() => {
      if (Date.now() - lastActivity > IDLE_TIMEOUT_MS) {
        try {
          stream.writable.abort?.("idle timeout");
        } catch (_) {
        }
        clearInterval(idleTimer);
        reject("idle timeout");
      }
    }, 5e3);
    const reader = remote_readable.getReader();
    const writer = stream.writable.getWriter();
    ;
    (async () => {
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
        } catch (_) {
        }
        try {
          writer.releaseLock();
        } catch (_) {
        }
        clearInterval(idleTimer);
      }
    })();
  });
  return {
    readable: stream.readable,
    counter,
    done,
    abort: /* @__PURE__ */ __name(() => {
      try {
        stream.readable.cancel();
      } catch (_) {
      }
      try {
        stream.writable.abort();
      } catch (_) {
      }
    }, "abort")
  };
}
__name(create_xhttp_downloader, "create_xhttp_downloader");
async function connect_to_remote_xhttp(httpx, ...remotes) {
  let attempt = 0;
  let lastErr;
  const connectionList = [httpx.hostname, ...remotes.filter((r) => r && r !== httpx.hostname)];
  for (const hostname of connectionList) {
    if (!hostname) continue;
    attempt = 0;
    while (attempt < MAX_RETRIES) {
      attempt++;
      try {
        const remote = connect({ hostname, port: httpx.port });
        const timeoutPromise = xhttp_sleep(CONNECT_TIMEOUT_MS).then(() => {
          throw new Error(atob("Y29ubmVjdCB0aW1lb3V0"));
        });
        await Promise.race([remote.opened, timeoutPromise]);
        const uploader = create_xhttp_uploader(httpx, remote.writable);
        const downloader = create_xhttp_downloader(httpx.resp, remote.readable);
        return {
          downloader,
          uploader,
          close: /* @__PURE__ */ __name(() => {
            try {
              remote.close();
            } catch (_) {
            }
          }, "close")
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
__name(connect_to_remote_xhttp, "connect_to_remote_xhttp");
async function handle_xhttp_client(body, uuid) {
  if (ACTIVE_CONNECTIONS >= MAX_CONCURRENT) {
    return new Response("Too many connections", { status: 429 });
  }
  ACTIVE_CONNECTIONS++;
  let cleaned = false;
  const cleanup = /* @__PURE__ */ __name(() => {
    if (!cleaned) {
      ACTIVE_CONNECTIONS = Math.max(0, ACTIVE_CONNECTIONS - 1);
      cleaned = true;
    }
  }, "cleanup");
  try {
    const httpx = await read_xhttp_header(body, uuid);
    if (typeof httpx !== "object" || !httpx) {
      return null;
    }
    const remoteConnection = await connect_to_remote_xhttp(httpx, fallbackAddress, "13.230.34.30");
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
      try {
        remoteConnection.close();
      } catch (_) {
      }
      try {
        remoteConnection.downloader.abort();
      } catch (_) {
      }
      try {
        remoteConnection.uploader.abort();
      } catch (_) {
      }
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
__name(handle_xhttp_client, "handle_xhttp_client");
async function handleXhttpPost(request) {
  try {
    return await handle_xhttp_client(request.body, at);
  } catch (err) {
    return null;
  }
}
__name(handleXhttpPost, "handleXhttpPost");
function base64ToArray(b64Str) {
  if (!b64Str) return { error: null };
  try {
    b64Str = b64Str.replace(/-/g, "+").replace(/_/g, "/");
    return { earlyData: Uint8Array.from(atob(b64Str), (c) => c.charCodeAt(0)).buffer, error: null };
  } catch (error) {
    return { error };
  }
}
__name(base64ToArray, "base64ToArray");
function closeSocketQuietly(socket) {
  try {
    if (socket.readyState === 1 || socket.readyState === 2) socket.close();
  } catch (error) {
  }
}
__name(closeSocketQuietly, "closeSocketQuietly");
var hexTable = Array.from({ length: 256 }, (v, i) => (i + 256).toString(16).slice(1));
function formatIdentifier(arr, offset = 0) {
  const id = (hexTable[arr[offset]] + hexTable[arr[offset + 1]] + hexTable[arr[offset + 2]] + hexTable[arr[offset + 3]] + "-" + hexTable[arr[offset + 4]] + hexTable[arr[offset + 5]] + "-" + hexTable[arr[offset + 6]] + hexTable[arr[offset + 7]] + "-" + hexTable[arr[offset + 8]] + hexTable[arr[offset + 9]] + "-" + hexTable[arr[offset + 10]] + hexTable[arr[offset + 11]] + hexTable[arr[offset + 12]] + hexTable[arr[offset + 13]] + hexTable[arr[offset + 14]] + hexTable[arr[offset + 15]]).toLowerCase();
  if (!isValidFormat(id)) throw new TypeError(E_INVALID_ID_STR);
  return id;
}
__name(formatIdentifier, "formatIdentifier");
async function fetchAndParseNewIPs() {
  const url = piu || "https://raw.githubusercontent.com/qwer-search/bestip/refs/heads/main/kejilandbestip.txt";
  try {
    const urls = url.includes(",") ? url.split(",").map((u) => u.trim()).filter((u) => u) : [url];
    const apiResults = await fetchPreferredAPI(urls, "443", 5e3);
    if (apiResults.length > 0) {
      const results2 = [];
      const regex = /^(\[[\da-fA-F:]+\]|[\d.]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*)(?::(\d+))?(?:#(.+))?$/;
      for (const item of apiResults) {
        const match = item.match(regex);
        if (match) {
          results2.push({
            ip: match[1],
            port: parseInt(match[2] || "443", 10),
            name: match[3]?.trim() || match[1]
          });
        }
      }
      return results2;
    }
    const response = await fetch(url);
    if (!response.ok) return [];
    const text = await response.text();
    const results = [];
    const lines = text.trim().replace(/\r/g, "").split("\n");
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
__name(fetchAndParseNewIPs, "fetchAndParseNewIPs");
function generateLinksFromNewIPs(list, user, workerDomain, echConfig = null) {
  const CF_HTTP_PORTS = [80, 8080, 8880, 2052, 2082, 2086, 2095];
  const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];
  const links = [];
  const wsPath = "/?ed=2048";
  const proto = atob("dmxlc3M=");
  list.forEach((item) => {
    const nodeName = item.name.replace(/\s/g, "_");
    const port = item.port;
    if (CF_HTTPS_PORTS.includes(port)) {
      const wsNodeName = `${nodeName}-${port}-WS-TLS`;
      let link = `${proto}://${user}@${item.ip}:${port}?encryption=none&security=tls&sni=${workerDomain}&fp=${enableECH ? "chrome" : "randomized"}&type=ws&host=${workerDomain}&path=${wsPath}`;
      if (enableECH) {
        const dnsServer = customDNS || "https://dns.joeyblog.eu.org/joeyblog";
        const echDomain = customECHDomain || "cloudflare-ech.com";
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
      let link = `${proto}://${user}@${item.ip}:${port}?encryption=none&security=tls&sni=${workerDomain}&fp=${enableECH ? "chrome" : "randomized"}&type=ws&host=${workerDomain}&path=${wsPath}`;
      if (enableECH) {
        const dnsServer = customDNS || "https://dns.joeyblog.eu.org/joeyblog";
        const echDomain = customECHDomain || "cloudflare-ech.com";
        link += `&alpn=h3%2Ch2%2Chttp%2F1.1&ech=${encodeURIComponent(`${echDomain}+${dnsServer}`)}`;
      }
      link += `#${encodeURIComponent(wsNodeName)}`;
      links.push(link);
    }
  });
  return links;
}
__name(generateLinksFromNewIPs, "generateLinksFromNewIPs");
function generateXhttpLinksFromSource(list, user, workerDomain, echConfig = null) {
  const links = [];
  const nodePath = user.substring(0, 8);
  list.forEach((item) => {
    let nodeNameBase = item.isp.replace(/\s/g, "_");
    if (item.colo && item.colo.trim()) {
      nodeNameBase = `${nodeNameBase}-${item.colo.trim()}`;
    }
    const safeIP = item.ip.includes(":") ? `[${item.ip}]` : item.ip;
    const port = item.port || 443;
    const wsNodeName = `${nodeNameBase}-${port}-xhttp`;
    const params = new URLSearchParams({
      encryption: "none",
      security: "tls",
      sni: workerDomain,
      fp: "chrome",
      type: "xhttp",
      host: workerDomain,
      path: `/${nodePath}`,
      mode: "stream-one"
    });
    if (enableECH) {
      const dnsServer = customDNS || "https://dns.joeyblog.eu.org/joeyblog";
      const echDomain = customECHDomain || "cloudflare-ech.com";
      params.set("alpn", "h3,h2,http/1.1");
      params.set("ech", `${echDomain}+${dnsServer}`);
    }
    links.push(`vless://${user}@${safeIP}:${port}?${params.toString()}#${encodeURIComponent(wsNodeName)}`);
  });
  return links;
}
__name(generateXhttpLinksFromSource, "generateXhttpLinksFromSource");
async function generateTrojanLinksFromNewIPs(list, user, workerDomain, echConfig = null) {
  const CF_HTTP_PORTS = [80, 8080, 8880, 2052, 2082, 2086, 2095];
  const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];
  const links = [];
  const wsPath = "/?ed=2048";
  const password = tp || user;
  list.forEach((item) => {
    const nodeName = item.name.replace(/\s/g, "_");
    const port = item.port;
    if (CF_HTTPS_PORTS.includes(port)) {
      const wsNodeName = `${nodeName}-${port}-${atob("VHJvamFu")}-WS-TLS`;
      let link = `${atob("dHJvamFuOi8v")}${password}@${item.ip}:${port}?security=tls&sni=${workerDomain}&fp=chrome&type=ws&host=${workerDomain}&path=${wsPath}`;
      if (enableECH) {
        const dnsServer = customDNS || "https://dns.joeyblog.eu.org/joeyblog";
        const echDomain = customECHDomain || "cloudflare-ech.com";
        link += `&alpn=h3%2Ch2%2Chttp%2F1.1&ech=${encodeURIComponent(`${echDomain}+${dnsServer}`)}`;
      }
      link += `#${encodeURIComponent(wsNodeName)}`;
      links.push(link);
    } else if (CF_HTTP_PORTS.includes(port)) {
      if (!disableNonTLS) {
        const wsNodeName = `${nodeName}-${port}-${atob("VHJvamFu")}-WS`;
        const link = `${atob("dHJvamFuOi8v")}${password}@${item.ip}:${port}?security=none&type=ws&host=${workerDomain}&path=${wsPath}#${encodeURIComponent(wsNodeName)}`;
        links.push(link);
      }
    } else {
      const wsNodeName = `${nodeName}-${port}-${atob("VHJvamFu")}-WS-TLS`;
      let link = `${atob("dHJvamFuOi8v")}${password}@${item.ip}:${port}?security=tls&sni=${workerDomain}&fp=chrome&type=ws&host=${workerDomain}&path=${wsPath}`;
      if (enableECH) {
        const dnsServer = customDNS || "https://dns.joeyblog.eu.org/joeyblog";
        const echDomain = customECHDomain || "cloudflare-ech.com";
        link += `&alpn=h3%2Ch2%2Chttp%2F1.1&ech=${encodeURIComponent(`${echDomain}+${dnsServer}`)}`;
      }
      link += `#${encodeURIComponent(wsNodeName)}`;
      links.push(link);
    }
  });
  return links;
}
__name(generateTrojanLinksFromNewIPs, "generateTrojanLinksFromNewIPs");
async function handleConfigAPI(request) {
  if (request.method === "GET") {
    if (!kvStore) {
      return new Response(JSON.stringify({
        error: "KV Storage Not Configured",
        kvEnabled: false
      }), {
        status: 503,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({
      ...kvConfig,
      kvEnabled: true
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } else if (request.method === "POST") {
    if (!kvStore) {
      return new Response(JSON.stringify({
        success: false,
        message: "KV\u5B58\u50A8\u672A\u914D\u7F6E\uFF0C\u65E0\u6CD5\u4FDD\u5B58\u914D\u7F6E"
      }), {
        status: 503,
        headers: { "Content-Type": "application/json" }
      });
    }
    try {
      const newConfig = await request.json();
      for (const [key, value] of Object.entries(newConfig)) {
        if (value === "" || value === null || value === void 0) {
          delete kvConfig[key];
        } else {
          kvConfig[key] = value;
        }
      }
      await saveKVConfig();
      updateConfigVariables();
      if (newConfig.yx !== void 0) {
        updateCustomPreferredFromYx();
      }
      const newPreferredIPsURL = getConfigValue("yxURL", "") || "https://raw.githubusercontent.com/qwer-search/bestip/refs/heads/main/kejilandbestip.txt";
      const defaultURL = "https://raw.githubusercontent.com/qwer-search/bestip/refs/heads/main/kejilandbestip.txt";
      if (newPreferredIPsURL !== defaultURL) {
        directDomains.length = 0;
        customPreferredIPs = [];
        customPreferredDomains = [];
      } else {
        backupIPs = [
          { domain: "ProxyIP.US.CMLiussss.net", region: "US", regionCode: "US", port: 443 },
          { domain: "ProxyIP.SG.CMLiussss.net", region: "SG", regionCode: "SG", port: 443 },
          { domain: "ProxyIP.JP.CMLiussss.net", region: "JP", regionCode: "JP", port: 443 },
          { domain: "ProxyIP.KR.CMLiussss.net", region: "KR", regionCode: "KR", port: 443 },
          { domain: "ProxyIP.DE.CMLiussss.net", region: "DE", regionCode: "DE", port: 443 },
          { domain: "ProxyIP.SE.CMLiussss.net", region: "SE", regionCode: "SE", port: 443 },
          { domain: "ProxyIP.NL.CMLiussss.net", region: "NL", regionCode: "NL", port: 443 },
          { domain: "ProxyIP.FI.CMLiussss.net", region: "FI", regionCode: "FI", port: 443 },
          { domain: "ProxyIP.GB.CMLiussss.net", region: "GB", regionCode: "GB", port: 443 },
          { domain: "ProxyIP.IN.CMLiussss.net", region: "IN", regionCode: "IN", port: 443 },
          { domain: "ProxyIP.BR.CMLiussss.net", region: "BR", regionCode: "BR", port: 443 },
          { domain: "ProxyIP.PL.CMLiussss.net", region: "PL", regionCode: "PL", port: 443 },
          { domain: "ProxyIP.RU.CMLiussss.net", region: "RU", regionCode: "RU", port: 443 },
          { domain: "ProxyIP.LV.CMLiussss.net", region: "LV", regionCode: "LV", port: 443 },
          { domain: "ProxyIP.IR.CMLiussss.net", region: "IR", regionCode: "IR", port: 443 },
          { domain: "ProxyIP.Oracle.cmliussss.net", region: "Oracle", regionCode: "Oracle", port: 443 },
          { domain: "ProxyIP.DigitalOcean.CMLiussss.net", region: "DigitalOcean", regionCode: "DigitalOcean", port: 443 },
          { domain: "ProxyIP.Vultr.CMLiussss.net", region: "Vultr", regionCode: "Vultr", port: 443 },
          { domain: "ProxyIP.Multacom.CMLiussss.net", region: "Multacom", regionCode: "Multacom", port: 443 }
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
        message: "\u914D\u7F6E\u5DF2\u4FDD\u5B58",
        config: kvConfig
      }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        message: "\u4FDD\u5B58\u914D\u7F6E\u5931\u8D25: " + error.message
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" }
  });
}
__name(handleConfigAPI, "handleConfigAPI");
async function handlePreferredIPsAPI(request) {
  if (!kvStore) {
    return new Response(JSON.stringify({
      success: false,
      error: "KV Storage Not Configured",
      message: "Requires KV storage configuration"
    }), {
      status: 503,
      headers: { "Content-Type": "application/json" }
    });
  }
  const ae = getConfigValue("ae", "") === "yes";
  if (!ae) {
    return new Response(JSON.stringify({
      success: false,
      error: "API Disabled",
      message: 'API disabled for security. Enable "Allow API Management" in settings.'
    }), {
      status: 403,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    if (request.method === "GET") {
      const yxValue = getConfigValue("yx", "");
      const pi = parseYxToArray(yxValue);
      return new Response(JSON.stringify({
        success: true,
        count: pi.length,
        data: pi
      }), {
        headers: { "Content-Type": "application/json" }
      });
    } else if (request.method === "POST") {
      const body = await request.json();
      const ipsToAdd = Array.isArray(body) ? body : [body];
      if (ipsToAdd.length === 0) {
        return new Response(JSON.stringify({
          success: false,
          error: "Request Body Empty",
          message: "Please provide IP data"
        }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const yxValue = getConfigValue("yx", "");
      let pi = parseYxToArray(yxValue);
      const addedIPs = [];
      const skippedIPs = [];
      const errors = [];
      for (const item of ipsToAdd) {
        if (!item.ip) {
          errors.push({ ip: "Unknown", reason: "IP address is required" });
          continue;
        }
        const port = item.port || 443;
        const name = item.name || `API\u4F18\u9009-${item.ip}:${port}`;
        if (!isValidIP(item.ip) && !isValidDomain(item.ip)) {
          errors.push({ ip: item.ip, reason: "Invalid IP or domain format" });
          continue;
        }
        const exists = pi.some(
          (existItem) => existItem.ip === item.ip && existItem.port === port
        );
        if (exists) {
          skippedIPs.push({ ip: item.ip, port, reason: "Already exists" });
          continue;
        }
        const newIP = {
          ip: item.ip,
          port,
          name,
          addedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        pi.push(newIP);
        addedIPs.push(newIP);
      }
      if (addedIPs.length > 0) {
        const newYxValue = arrayToYx(pi);
        await setConfigValue("yx", newYxValue);
        updateCustomPreferredFromYx();
      }
      return new Response(JSON.stringify({
        success: addedIPs.length > 0,
        message: `Successfully added ${addedIPs.length} IPs`,
        added: addedIPs.length,
        skipped: skippedIPs.length,
        errors: errors.length,
        data: {
          addedIPs,
          skippedIPs: skippedIPs.length > 0 ? skippedIPs : void 0,
          errors: errors.length > 0 ? errors : void 0
        }
      }), {
        headers: { "Content-Type": "application/json" }
      });
    } else if (request.method === "DELETE") {
      const body = await request.json();
      if (body.all === true) {
        const yxValue2 = getConfigValue("yx", "");
        const pi2 = parseYxToArray(yxValue2);
        const deletedCount = pi2.length;
        await setConfigValue("yx", "");
        updateCustomPreferredFromYx();
        return new Response(JSON.stringify({
          success: true,
          message: `All preferred IPs cleared, deleted ${deletedCount}`,
          deletedCount
        }), {
          headers: { "Content-Type": "application/json" }
        });
      }
      if (!body.ip) {
        return new Response(JSON.stringify({
          success: false,
          error: "IP address is required",
          message: 'Provide ip field to delete, or use {"all": true} to clear all'
        }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const port = body.port || 443;
      const yxValue = getConfigValue("yx", "");
      let pi = parseYxToArray(yxValue);
      const initialLength = pi.length;
      const filteredIPs = pi.filter(
        (item) => !(item.ip === body.ip && item.port === port)
      );
      if (filteredIPs.length === initialLength) {
        return new Response(JSON.stringify({
          success: false,
          error: "Preferred IP Not Found",
          message: `${body.ip}:${port} not found`
        }), {
          status: 404,
          headers: { "Content-Type": "application/json" }
        });
      }
      const newYxValue = arrayToYx(filteredIPs);
      await setConfigValue("yx", newYxValue);
      updateCustomPreferredFromYx();
      return new Response(JSON.stringify({
        success: true,
        message: "Preferred IP Deleted",
        deleted: { ip: body.ip, port }
      }), {
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        error: "Method Not Allowed",
        message: "Supported methods: GET, POST, DELETE"
      }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: "Processing Failed",
      message: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(handlePreferredIPsAPI, "handlePreferredIPsAPI");
function updateConfigVariables() {
  const manualRegion = getConfigValue("wk", "");
  if (manualRegion && manualRegion.trim()) {
    manualWorkerRegion = manualRegion.trim().toUpperCase();
    currentWorkerRegion = manualWorkerRegion;
  } else {
    const ci = getConfigValue("p", "");
    if (ci && ci.trim()) {
      currentWorkerRegion = "CUSTOM";
    } else {
      manualWorkerRegion = "";
    }
  }
  const regionMatchingControl = getConfigValue("rm", "");
  if (regionMatchingControl && regionMatchingControl.toLowerCase() === "no") {
    enableRegionMatching = false;
  } else {
    enableRegionMatching = true;
  }
  const vlessControl = getConfigValue("ev", "");
  if (vlessControl !== void 0 && vlessControl !== "") {
    ev = vlessControl === "yes" || vlessControl === true || vlessControl === "true";
  }
  const tjControl = getConfigValue("et", "");
  if (tjControl !== void 0 && tjControl !== "") {
    et = tjControl === "yes" || tjControl === true || tjControl === "true";
  }
  tp = getConfigValue("tp", "") || "";
  const xhttpControl = getConfigValue("ex", "");
  if (xhttpControl !== void 0 && xhttpControl !== "") {
    ex = xhttpControl === "yes" || xhttpControl === true || xhttpControl === "true";
  }
  const vmessControl = getConfigValue("evm", "");
  if (vmessControl !== void 0 && vmessControl !== "") {
    evm = vmessControl === "yes" || vmessControl === true || vmessControl === "true";
  }
  const ssControl = getConfigValue("ess", "");
  if (ssControl !== void 0 && ssControl !== "") {
    ess = ssControl === "yes" || ssControl === true || ssControl === "true";
  }
  const tuicControl = getConfigValue("etu", "");
  if (tuicControl !== void 0 && tuicControl !== "") {
    etu = tuicControl === "yes" || tuicControl === true || tuicControl === "true";
  }
  const hyControl = getConfigValue("ehy", "");
  if (hyControl !== void 0 && hyControl !== "") {
    ehy = hyControl === "yes" || hyControl === true || hyControl === "true";
  }
  const grpcControl = getConfigValue("eg", "");
  if (grpcControl !== void 0 && grpcControl !== "") {
    eg = grpcControl === "yes" || grpcControl === true || grpcControl === "true";
  }
  if (!ev && !et && !ex && !evm && !ess && !etu && !ehy && !eg) {
    ev = true;
  }
  scu = getConfigValue("scu", "") || "https://url.v1.mk/sub";
  const preferredDomainsControl = getConfigValue("epd", "no");
  if (preferredDomainsControl !== void 0 && preferredDomainsControl !== "") {
    epd = preferredDomainsControl !== "no" && preferredDomainsControl !== false && preferredDomainsControl !== "false";
  }
  const preferredIPsControl = getConfigValue("epi", "");
  if (preferredIPsControl !== void 0 && preferredIPsControl !== "") {
    epi = preferredIPsControl !== "no" && preferredIPsControl !== false && preferredIPsControl !== "false";
  }
  const githubIPsControl = getConfigValue("egi", "");
  if (githubIPsControl !== void 0 && githubIPsControl !== "") {
    egi = githubIPsControl !== "no" && githubIPsControl !== false && githubIPsControl !== "false";
  }
  const echControl = getConfigValue("ech", "");
  if (echControl !== void 0 && echControl !== "") {
    enableECH = echControl === "yes" || echControl === true || echControl === "true";
  }
  const customDNSValue = getConfigValue("customDNS", "");
  if (customDNSValue && customDNSValue.trim()) {
    customDNS = customDNSValue.trim();
  } else {
    customDNS = "https://dns.joeyblog.eu.org/joeyblog";
  }
  const customECHDomainValue = getConfigValue("customECHDomain", "");
  if (customECHDomainValue && customECHDomainValue.trim()) {
    customECHDomain = customECHDomainValue.trim();
  } else {
    customECHDomain = "cloudflare-ech.com";
  }
  if (enableECH) {
    disableNonTLS = true;
  }
  const dkbyControl = getConfigValue("dkby", "");
  if (dkbyControl && dkbyControl.toLowerCase() === "yes") {
    disableNonTLS = true;
  }
  cp = getConfigValue("d", "") || "";
  piu = getConfigValue("yxURL", "") || "https://raw.githubusercontent.com/qwer-search/bestip/refs/heads/main/kejilandbestip.txt";
  const envFallback = getConfigValue("p", "");
  if (envFallback) {
    fallbackAddress = envFallback.trim();
  } else {
    fallbackAddress = "";
  }
  socks5Config = getConfigValue("s", "") || "";
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
  const yxbyControl = getConfigValue("yxby", "");
  if (yxbyControl && yxbyControl.toLowerCase() === "yes") {
    disablePreferred = true;
  } else {
    disablePreferred = false;
  }
  const defaultURL = "https://raw.githubusercontent.com/qwer-search/bestip/refs/heads/main/kejilandbestip.txt";
  if (piu !== defaultURL) {
    directDomains.length = 0;
    customPreferredIPs = [];
    customPreferredDomains = [];
  }
}
__name(updateConfigVariables, "updateConfigVariables");
function updateCustomPreferredFromYx() {
  const yxValue = getConfigValue("yx", "");
  if (yxValue) {
    try {
      const preferredList = yxValue.split(",").map((item) => item.trim()).filter((item) => item);
      customPreferredIPs = [];
      customPreferredDomains = [];
      preferredList.forEach((item) => {
        let nodeName = "";
        let addressPart = item;
        if (item.includes("#")) {
          const parts = item.split("#");
          addressPart = parts[0].trim();
          nodeName = parts[1].trim();
        }
        const { address, port } = parseAddressAndPort(addressPart);
        if (!nodeName) {
          nodeName = "CustomPreferred-" + address + (port ? ":" + port : "");
        }
        if (isValidIP(address)) {
          customPreferredIPs.push({
            ip: address,
            port,
            isp: nodeName
          });
        } else {
          customPreferredDomains.push({
            domain: address,
            port,
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
__name(updateCustomPreferredFromYx, "updateCustomPreferredFromYx");
function parseYxToArray(yxValue) {
  if (!yxValue || !yxValue.trim()) return [];
  const items = yxValue.split(",").map((item) => item.trim()).filter((item) => item);
  const result = [];
  for (const item of items) {
    let nodeName = "";
    let addressPart = item;
    if (item.includes("#")) {
      const parts = item.split("#");
      addressPart = parts[0].trim();
      nodeName = parts[1].trim();
    }
    const { address, port } = parseAddressAndPort(addressPart);
    if (!nodeName) {
      nodeName = address + (port ? ":" + port : "");
    }
    result.push({
      ip: address,
      port: port || 443,
      name: nodeName,
      addedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  return result;
}
__name(parseYxToArray, "parseYxToArray");
function arrayToYx(array) {
  if (!array || array.length === 0) return "";
  return array.map((item) => {
    const port = item.port || 443;
    return `${item.ip}:${port}#${item.name}`;
  }).join(",");
}
__name(arrayToYx, "arrayToYx");
function isValidDomain(domain) {
  const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
}
__name(isValidDomain, "isValidDomain");
async function fetchPreferredAPI(urls, defaultPort = "443", timeout = 3e3) {
  if (!urls?.length) return [];
  const results = /* @__PURE__ */ new Set();
  await Promise.allSettled(urls.map(async (url) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      let text = "";
      try {
        const buffer = await response.arrayBuffer();
        const contentType = (response.headers.get("content-type") || "").toLowerCase();
        const charset = contentType.match(/charset=([^\s;]+)/i)?.[1]?.toLowerCase() || "";
        let decoders = ["utf-8", "gb2312"];
        if (charset.includes("gb") || charset.includes("gbk") || charset.includes("gb2312")) {
          decoders = ["gb2312", "utf-8"];
        }
        let decodeSuccess = false;
        for (const decoder of decoders) {
          try {
            const decoded = new TextDecoder(decoder).decode(buffer);
            if (decoded && decoded.length > 0 && !decoded.includes("\uFFFD")) {
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
      const lines = text.trim().split("\n").map((l) => l.trim()).filter((l) => l);
      const isCSV = lines.length > 1 && lines[0].includes(",");
      const IPV6_PATTERN = /^[^\[\]]*:[^\[\]]*:[^\[\]]/;
      if (!isCSV) {
        lines.forEach((line) => {
          const hashIndex = line.indexOf("#");
          const [hostPart, remark] = hashIndex > -1 ? [line.substring(0, hashIndex), line.substring(hashIndex)] : [line, ""];
          let hasPort = false;
          if (hostPart.startsWith("[")) {
            hasPort = /\]:(\d+)$/.test(hostPart);
          } else {
            const colonIndex = hostPart.lastIndexOf(":");
            hasPort = colonIndex > -1 && /^\d+$/.test(hostPart.substring(colonIndex + 1));
          }
          const port = new URL(url).searchParams.get("port") || defaultPort;
          results.add(hasPort ? line : `${hostPart}:${port}${remark}`);
        });
      } else {
        const headers = lines[0].split(",").map((h) => h.trim());
        const dataLines = lines.slice(1);
        if (headers.includes("IP\u5730\u5740") && headers.includes("\u7AEF\u53E3") && headers.includes("\u6570\u636E\u4E2D\u5FC3")) {
          const ipIdx = headers.indexOf("IP\u5730\u5740"), portIdx = headers.indexOf("\u7AEF\u53E3");
          const remarkIdx = headers.indexOf("\u56FD\u5BB6") > -1 ? headers.indexOf("\u56FD\u5BB6") : headers.indexOf("\u57CE\u5E02") > -1 ? headers.indexOf("\u57CE\u5E02") : headers.indexOf("\u6570\u636E\u4E2D\u5FC3");
          const tlsIdx = headers.indexOf("TLS");
          dataLines.forEach((line) => {
            const cols = line.split(",").map((c) => c.trim());
            if (tlsIdx !== -1 && cols[tlsIdx]?.toLowerCase() !== "true") return;
            const wrappedIP = IPV6_PATTERN.test(cols[ipIdx]) ? `[${cols[ipIdx]}]` : cols[ipIdx];
            results.add(`${wrappedIP}:${cols[portIdx]}#${cols[remarkIdx]}`);
          });
        } else if (headers.some((h) => h.includes("IP")) && headers.some((h) => h.includes("\u5EF6\u8FDF")) && headers.some((h) => h.includes("\u4E0B\u8F7D\u901F\u5EA6"))) {
          const ipIdx = headers.findIndex((h) => h.includes("IP"));
          const delayIdx = headers.findIndex((h) => h.includes("\u5EF6\u8FDF"));
          const speedIdx = headers.findIndex((h) => h.includes("\u4E0B\u8F7D\u901F\u5EA6"));
          const port = new URL(url).searchParams.get("port") || defaultPort;
          dataLines.forEach((line) => {
            const cols = line.split(",").map((c) => c.trim());
            const wrappedIP = IPV6_PATTERN.test(cols[ipIdx]) ? `[${cols[ipIdx]}]` : cols[ipIdx];
            results.add(`${wrappedIP}:${port}#CF Preferred ${cols[delayIdx]}ms ${cols[speedIdx]}MB/s`);
          });
        }
      }
    } catch (e) {
    }
  }));
  return Array.from(results);
}
__name(fetchPreferredAPI, "fetchPreferredAPI");
var DOH_PROVIDERS = [
  { name: "Cloudflare", url: "https://cloudflare-dns.com/dns-query", weight: 20 },
  { name: "Google", url: "https://dns.google/dns-query", weight: 15 },
  { name: "Quad9", url: "https://dns.quad9.net/dns-query", weight: 15 },
  { name: "OpenDNS", url: "https://doh.opendns.com/dns-query", weight: 10 },
  { name: "AdGuard", url: "https://dns.adguard.com/dns-query", weight: 10 },
  { name: "ControlD", url: "https://freedns.controld.com/p2", weight: 10 },
  { name: "Mullvad", url: "https://adblock.dns.mullvad.net/dns-query", weight: 10 },
  { name: "NextDNS", url: "https://dns.nextdns.io/dns-query", weight: 10 }
];
var CACHE_TTL = 300;
async function handleDoHRequest(request, env, ctx) {
  const url = new URL(request.url);
  if (request.method === "OPTIONS") return handleCORS();
  const isGet = request.method === "GET";
  const isPost = request.method === "POST";
  if (!isGet && !isPost) return new Response("Method not allowed", { status: 405 });
  if (isGet && !url.searchParams.has("dns")) return new Response("Missing DNS query parameter", { status: 400 });
  const selectedProvider = selectProvider(DOH_PROVIDERS);
  try {
    const targetUrl = selectedProvider.url + url.search;
    const headers = new Headers(request.headers);
    if (isPost) headers.set("Content-Type", "application/dns-message");
    else headers.set("Accept", "application/dns-message");
    headers.set("User-Agent", "DoH-Proxy-Worker/1.0");
    const upstreamRequest = new Request(targetUrl, {
      method: request.method,
      headers,
      body: isPost ? await request.arrayBuffer() : null,
      redirect: "follow"
    });
    const response = await fetch(upstreamRequest);
    const responseHeaders = new Headers(response.headers);
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    responseHeaders.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    responseHeaders.set("Access-Control-Allow-Headers", "Content-Type, Accept");
    responseHeaders.set("Cache-Control", `public, max-age=${CACHE_TTL}`);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders
    });
  } catch (error) {
    return await tryFallbackProviders(request, url, selectedProvider);
  }
}
__name(handleDoHRequest, "handleDoHRequest");
function handleCORS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
      "Access-Control-Max-Age": "86400"
    }
  });
}
__name(handleCORS, "handleCORS");
function selectProvider(providers) {
  const totalWeight = providers.reduce((sum, provider) => sum + provider.weight, 0);
  let random = Math.random() * totalWeight;
  for (const provider of providers) {
    if (random < provider.weight) return provider;
    random -= provider.weight;
  }
  return providers[0];
}
__name(selectProvider, "selectProvider");
async function tryFallbackProviders(request, url, failedProvider) {
  const fallbackProviders = DOH_PROVIDERS.filter((p) => p.name !== failedProvider.name);
  for (const provider of fallbackProviders.slice(0, 2)) {
    try {
      const targetUrl = provider.url + url.search;
      const headers = new Headers(request.headers);
      if (request.method === "POST") headers.set("Content-Type", "application/dns-message");
      else headers.set("Accept", "application/dns-message");
      const upstreamRequest = new Request(targetUrl, {
        method: request.method,
        headers,
        body: request.method === "POST" ? await request.arrayBuffer() : null
      });
      const response = await fetch(upstreamRequest);
      if (response.ok) {
        const responseHeaders = new Headers(response.headers);
        responseHeaders.set("Access-Control-Allow-Origin", "*");
        return new Response(response.body, {
          status: response.status,
          headers: responseHeaders
        });
      }
    } catch (e) {
      continue;
    }
  }
  return new Response("All DNS providers failed", { status: 503 });
}
__name(tryFallbackProviders, "tryFallbackProviders");
function serveDNSEncodingExplanation() {
  return new Response("DNS Encoding Explanation: GET requests must use base64url encoded DNS query in ?dns= param. POST requests send raw binary.", { status: 200 });
}
__name(serveDNSEncodingExplanation, "serveDNSEncodingExplanation");
function generateVMessLinksFromSource(list, user, workerDomain) {
  const links = [];
  const wsPath = "/vm?ed=2048";
  const CF_HTTP_PORTS = [80, 8080, 8880, 2052, 2082, 2086, 2095];
  const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];
  list.forEach((item) => {
    let nodeName = item.isp.replace(/\s/g, "_");
    if (item.colo && item.colo.trim()) nodeName += `-${item.colo.trim()}`;
    const port = parseInt(item.port || 443);
    const isTLS = CF_HTTPS_PORTS.includes(port);
    if (!isTLS && disableNonTLS) return;
    const vmessConfig = {
      v: "2",
      ps: nodeName,
      add: item.ip,
      port,
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
__name(generateVMessLinksFromSource, "generateVMessLinksFromSource");
function generateVMessLinksFromNewIPs(list, user, workerDomain) {
  const links = [];
  const wsPath = "/vm?ed=2048";
  const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];
  list.forEach((item) => {
    const nodeName = item.name.replace(/\s/g, "_");
    const port = parseInt(item.port);
    const isTLS = CF_HTTPS_PORTS.includes(port);
    if (!isTLS && disableNonTLS) return;
    const vmessConfig = {
      v: "2",
      ps: nodeName,
      add: item.ip,
      port,
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
__name(generateVMessLinksFromNewIPs, "generateVMessLinksFromNewIPs");
function generateShadowsocksLinksFromSource(list, user, workerDomain) {
  const links = [];
  const method = "chacha20-ietf-poly1305";
  const password = user;
  const wsPath = "/ss?ed=2048";
  const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];
  list.forEach((item) => {
    let nodeName = item.isp.replace(/\s/g, "_");
    if (item.colo && item.colo.trim()) nodeName += `-${item.colo.trim()}`;
    const port = parseInt(item.port || 443);
    const isTLS = CF_HTTPS_PORTS.includes(port);
    if (!isTLS && disableNonTLS) return;
    const userInfo = btoa(`${method}:${password}`);
    let pluginParam = `v2ray-plugin;mode=websocket;host=${workerDomain};path=${encodeURIComponent(wsPath)}`;
    if (isTLS) pluginParam += ";tls";
    links.push(`ss://${userInfo}@${item.ip}:${port}?plugin=${encodeURIComponent(pluginParam)}#${encodeURIComponent(nodeName)}`);
  });
  return links;
}
__name(generateShadowsocksLinksFromSource, "generateShadowsocksLinksFromSource");
function generateShadowsocksLinksFromNewIPs(list, user, workerDomain) {
  const links = [];
  const method = "chacha20-ietf-poly1305";
  const password = user;
  const wsPath = "/ss?ed=2048";
  const CF_HTTPS_PORTS = [443, 2053, 2083, 2087, 2096, 8443];
  list.forEach((item) => {
    const nodeName = item.name.replace(/\s/g, "_");
    const port = parseInt(item.port);
    const isTLS = CF_HTTPS_PORTS.includes(port);
    if (!isTLS && disableNonTLS) return;
    const userInfo = btoa(`${method}:${password}`);
    let pluginParam = `v2ray-plugin;mode=websocket;host=${workerDomain};path=${encodeURIComponent(wsPath)}`;
    if (isTLS) pluginParam += ";tls";
    links.push(`ss://${userInfo}@${item.ip}:${port}?plugin=${encodeURIComponent(pluginParam)}#${encodeURIComponent(nodeName)}`);
  });
  return links;
}
__name(generateShadowsocksLinksFromNewIPs, "generateShadowsocksLinksFromNewIPs");

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-zXIEZU/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-zXIEZU/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=worker.js.map
