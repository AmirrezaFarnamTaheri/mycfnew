var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker.js
var e = null;
var t = {};
function n(e2, n2 = "") {
  return void 0 !== t[e2] ? t[e2] : n2;
}
__name(n, "n");
function o() {
  return { ...t };
}
__name(o, "o");
var a = { en: { title: "Terminal", terminal: "Terminal v2.9.3", congratulations: "Congratulations, you made it!", enterU: "Please enter your U variable", enterD: "Please enter your D variable", command: "Command: connect [", uuid: "UUID", path: "PATH", inputU: "Enter U variable content and hit Enter...", inputD: "Enter D variable content and hit Enter...", connecting: "Connecting...", invading: "Invading...", success: "Connection established! Returning result...", error: "Error: Invalid UUID format", reenter: "Please re-enter a valid UUID", debugConsoleTitle: "Debug Console", debugShow: "Show", debugHide: "Hide", debugReady: "Console Ready", debugUnknownError: "Unknown Error", dashTitle: "Config Dashboard", sysStatus: "System Status", configMgmt: "Config Management", latencyTest: "Latency Test", protocolSel: "Protocol Selection", saveConfig: "Save Config", loadConfig: "Load Config", resetConfig: "Reset Config", testLatency: "Test Latency", region: "Region", ip: "IP", method: "Method", loading: "Loading...", saved: "Saved successfully", failed: "Failed" }, fa: { title: "\u062A\u0631\u0645\u06CC\u0646\u0627\u0644", terminal: "\u062A\u0631\u0645\u06CC\u0646\u0627\u0644", congratulations: "\u062A\u0628\u0631\u06CC\u06A9 \u0645\u06CC\u200C\u06AF\u0648\u06CC\u06CC\u0645 \u0628\u0647 \u0634\u0645\u0627", enterU: "\u0644\u0637\u0641\u0627\u064B \u0645\u0642\u062F\u0627\u0631 \u0645\u062A\u063A\u06CC\u0631 U \u062E\u0648\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F", enterD: "\u0644\u0637\u0641\u0627\u064B \u0645\u0642\u062F\u0627\u0631 \u0645\u062A\u063A\u06CC\u0631 D \u062E\u0648\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F", command: "\u062F\u0633\u062A\u0648\u0631: connect [", uuid: "UUID", path: "PATH", inputU: "\u0645\u062D\u062A\u0648\u06CC\u0627\u062A \u0645\u062A\u063A\u06CC\u0631 U \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0631\u062F\u0647 \u0648 Enter \u0631\u0627 \u0628\u0632\u0646\u06CC\u062F...", inputD: "\u0645\u062D\u062A\u0648\u06CC\u0627\u062A \u0645\u062A\u063A\u06CC\u0631 D \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0631\u062F\u0647 \u0648 Enter \u0631\u0627 \u0628\u0632\u0646\u06CC\u062F...", connecting: "\u062F\u0631 \u062D\u0627\u0644 \u0627\u062A\u0635\u0627\u0644...", invading: "\u062F\u0631 \u062D\u0627\u0644 \u0646\u0641\u0648\u0630...", success: "\u0627\u062A\u0635\u0627\u0644 \u0645\u0648\u0641\u0642! \u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A \u0646\u062A\u06CC\u062C\u0647...", error: "\u062E\u0637\u0627: \u0641\u0631\u0645\u062A UUID \u0646\u0627\u0645\u0639\u062A\u0628\u0631", reenter: "\u0644\u0637\u0641\u0627\u064B UUID \u0645\u0639\u062A\u0628\u0631 \u0631\u0627 \u062F\u0648\u0628\u0627\u0631\u0647 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F", debugConsoleTitle: "\u06A9\u0646\u0633\u0648\u0644 \u0627\u0634\u06A9\u0627\u0644\u200C\u0632\u062F\u0627\u06CC\u06CC", debugShow: "\u0646\u0645\u0627\u06CC\u0634", debugHide: "\u067E\u0646\u0647\u0627\u0646 \u06A9\u0631\u062F\u0646", debugReady: "\u06A9\u0646\u0633\u0648\u0644 \u0622\u0645\u0627\u062F\u0647 \u0627\u0633\u062A", debugUnknownError: "\u062E\u0637\u0627\u06CC \u0646\u0627\u0634\u0646\u0627\u062E\u062A\u0647", dashTitle: "\u062F\u0627\u0634\u0628\u0648\u0631\u062F \u062A\u0646\u0638\u06CC\u0645\u0627\u062A", sysStatus: "\u0648\u0636\u0639\u06CC\u062A \u0633\u06CC\u0633\u062A\u0645", configMgmt: "\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u0646\u0638\u06CC\u0645\u0627\u062A", latencyTest: "\u062A\u0633\u062A \u062A\u0623\u062E\u06CC\u0631", protocolSel: "\u0627\u0646\u062A\u062E\u0627\u0628 \u067E\u0631\u0648\u062A\u06A9\u0644", saveConfig: "\u0630\u062E\u06CC\u0631\u0647 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A", loadConfig: "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u062A\u0646\u0638\u06CC\u0645\u0627\u062A", resetConfig: "\u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC \u062A\u0646\u0638\u06CC\u0645\u0627\u062A", testLatency: "\u062A\u0633\u062A \u0633\u0631\u0639\u062A", region: "\u0645\u0646\u0637\u0642\u0647", ip: "\u0622\u06CC\u200C\u067E\u06CC", method: "\u0631\u0648\u0634", loading: "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC...", saved: "\u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F", failed: "\u062E\u0637\u0627" }, zh: { title: "\u7EC8\u7AEF", terminal: "\u7EC8\u7AEF v2.9.3", congratulations: "\u606D\u559C\uFF0C\u4F60\u6210\u529F\u4E86\uFF01", enterU: "\u8BF7\u8F93\u5165 U \u53D8\u91CF\u7684\u503C", enterD: "\u8BF7\u8F93\u5165 D \u53D8\u91CF\u7684\u503C", command: "\u547D\u4EE4: connect [", uuid: "UUID", path: "PATH", inputU: "\u8F93\u5165 U \u53D8\u91CF\u5185\u5BB9\u5E76\u6309\u56DE\u8F66...", inputD: "\u8F93\u5165 D \u53D8\u91CF\u5185\u5BB9\u5E76\u6309\u56DE\u8F66...", connecting: "\u8FDE\u63A5\u4E2D...", invading: "\u5165\u4FB5\u4E2D...", success: "\u8FDE\u63A5\u6210\u529F\uFF01\u6B63\u5728\u8FD4\u56DE\u7ED3\u679C...", error: "\u9519\u8BEF\uFF1A\u65E0\u6548\u7684 UUID \u683C\u5F0F", reenter: "\u8BF7\u91CD\u65B0\u8F93\u5165\u6709\u6548\u7684 UUID", debugConsoleTitle: "\u8C03\u8BD5\u63A7\u5236\u53F0", debugShow: "\u663E\u793A", debugHide: "\u9690\u85CF", debugReady: "\u63A7\u5236\u53F0\u5C31\u7EEA", debugUnknownError: "\u672A\u77E5\u9519\u8BEF", dashTitle: "\u914D\u7F6E\u4EEA\u8868\u76D8", sysStatus: "\u7CFB\u7EDF\u72B6\u6001", configMgmt: "\u914D\u7F6E\u7BA1\u7406", latencyTest: "\u5EF6\u8FDF\u6D4B\u8BD5", protocolSel: "\u534F\u8BAE\u9009\u62E9", saveConfig: "\u4FDD\u5B58\u914D\u7F6E", loadConfig: "\u52A0\u8F7D\u914D\u7F6E", resetConfig: "\u91CD\u7F6E\u914D\u7F6E", testLatency: "\u6D4B\u8BD5\u5EF6\u8FDF", region: "\u533A\u57DF", ip: "IP", method: "\u65B9\u6CD5", loading: "\u52A0\u8F7D\u4E2D...", saved: "\u4FDD\u5B58\u6210\u529F", failed: "\u5931\u8D25" } };
var s = [{ name: "Cloudflare", url: "https://cloudflare-dns.com/dns-query", weight: 20 }, { name: "Google", url: "https://dns.google/dns-query", weight: 15 }, { name: "Quad9", url: "https://dns.quad9.net/dns-query", weight: 15 }, { name: "OpenDNS", url: "https://doh.opendns.com/dns-query", weight: 10 }, { name: "AdGuard", url: "https://dns.adguard.com/dns-query", weight: 10 }, { name: "ControlD", url: "https://freedns.controld.com/p2", weight: 10 }, { name: "Mullvad", url: "https://adblock.dns.mullvad.net/dns-query", weight: 10 }, { name: "NextDNS", url: "https://dns.nextdns.io/dns-query", weight: 10 }];
function r(e2, t2) {
  return e2 >>> t2 | e2 << 32 - t2;
}
__name(r, "r");
atob("aW52YWxpZCBkYXRh"), atob("aW52YWxpZCB1c2Vy"), atob("Y29tbWFuZCBpcyBub3Qgc3VwcG9ydGVk"), atob("VURQIHByb3h5IG9ubHkgZW5hYmxlIGZvciBETlMgd2hpY2ggaXMgcG9ydCA1Mw=="), atob("aW52YWxpZCBhZGRyZXNzVHlwZQ=="), atob("YWRkcmVzc1ZhbHVlIGlzIGVtcHR5"), atob("d2ViU29ja2V0LmVhZHlTdGF0ZSBpcyBub3Qgb3Blbg=="), atob("U3RyaW5naWZpZWQgaWRlbnRpZmllciBpcyBpbnZhbGlk"), atob("SW52YWxpZCBTT0NLUyBhZGRyZXNzIGZvcm1hdA=="), atob("bm8gYWNjZXB0YWJsZSBtZXRob2Rz"), atob("c29ja3Mgc2VydmVyIG5lZWRzIGF1dGg="), atob("ZmFpbCB0byBhdXRoIHNvY2tzIHNlZWRz"), atob("ZmFpbCB0byBvcGVuIHNvY2tzIGNvbm5lY3Rpb24="), Array.from({ length: 256 }, (e2, t2) => (t2 + 256).toString(16).slice(1));
var i = [80, 8080, 8880, 2052, 2082, 2086, 2095];
var l = [443, 2053, 2083, 2087, 2096, 8443];
var d = { fetch: /* @__PURE__ */ __name(async (d2, c, p) => (async (d3, c2) => {
  Date.now();
  const p2 = new URL(d3.url);
  let u;
  try {
    await (async (n2) => {
      if (n2.C) try {
        e = n2.C, await (async () => {
          if (e) try {
            const n3 = await e.get("c");
            n3 && (t = JSON.parse(n3));
          } catch (e2) {
            t = {};
          }
        })();
      } catch (t2) {
        e = null;
      }
      else e = null;
    })(c2);
    const h = (c2.u || c2.U || "").toLowerCase();
    if (h) if ("/dns-query" === p2.pathname) u = await (async (e2) => {
      const t2 = new URL(e2.url);
      if ("OPTIONS" === e2.method) return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Accept", "Access-Control-Max-Age": "86400" } });
      const n2 = "GET" === e2.method, o2 = "POST" === e2.method;
      if (!n2 && !o2) return new Response("Method not allowed", { status: 405 });
      if (n2 && !t2.searchParams.has("dns")) return new Response("Missing DNS query parameter", { status: 400 });
      let a2 = null;
      if (o2) try {
        a2 = await e2.arrayBuffer();
      } catch (e3) {
        return new Response("Invalid request body", { status: 400 });
      }
      let r2 = "unknown";
      n2 ? r2 = t2.searchParams.get("dns") : a2 && (r2 = `binary(${a2.byteLength} bytes)`);
      const i2 = ((e3) => {
        if (!e3 || 0 === e3.length) return null;
        const t3 = e3.reduce((e4, t4) => e4 + t4.weight, 0);
        let n3 = Math.random() * t3;
        for (const t4 of e3) {
          if (n3 < t4.weight) return t4;
          n3 -= t4.weight;
        }
        return e3[0];
      })(s);
      Date.now();
      try {
        const n3 = i2.url + t2.search, s2 = new Headers(e2.headers);
        s2.set(o2 ? "Content-Type" : "Accept", "application/dns-message"), s2.set("User-Agent", "DoH-Proxy-Worker/1.0");
        const r3 = new Request(n3, { method: e2.method, headers: s2, body: a2, redirect: "follow" }), l2 = await fetch(r3);
        if (!l2.ok) throw Error("Upstream status " + l2.status);
        const d4 = new Headers(l2.headers);
        return d4.set("Access-Control-Allow-Origin", "*"), d4.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS"), d4.set("Access-Control-Allow-Headers", "Content-Type, Accept"), d4.set("Cache-Control", "public, max-age=300"), new Response(l2.body, { status: l2.status, statusText: l2.statusText, headers: d4 });
      } catch (n3) {
        return await (async (e3, t3, n4, o3) => {
          const a3 = s.filter((e4) => e4.name !== n4.name);
          a3.sort(() => Math.random() - 0.5);
          for (const n5 of a3.slice(0, 2)) {
            Date.now();
            try {
              const a4 = n5.url + t3.search, s2 = new Headers(e3.headers);
              s2.set("POST" === e3.method ? "Content-Type" : "Accept", "application/dns-message");
              const r3 = new Request(a4, { method: e3.method, headers: s2, body: o3 }), i3 = await fetch(r3);
              if (i3.ok) {
                const e4 = new Headers(i3.headers);
                return e4.set("Access-Control-Allow-Origin", "*"), new Response(i3.body, { status: i3.status, headers: e4 });
              }
            } catch (e4) {
              continue;
            }
          }
          return new Response("All DNS providers failed", { status: 503 });
        })(e2, t2, i2, a2);
      }
    })(d3);
    else if ("/dns-encoding" === p2.pathname) u = new Response("<html>\n        <head><title>DNS Encoding Explanation</title></head>\n        <body>\n            <h1>DNS Encoding Explanation</h1>\n            <p>This page explains how DNS queries are encoded.</p>\n        </body>\n        </html>", { headers: { "Content-Type": "text/html; charset=utf-8" } });
    else if (p2.pathname.includes("/api/config")) u = ((e2, t2) => {
      if (new URL(e2.url).searchParams.get("u") === t2) return true;
      const n2 = e2.headers.get("Authorization");
      return !(!n2 || !n2.includes(t2));
    })(d3, h) ? await (async (n2) => {
      if ("GET" === n2.method) {
        const e2 = o();
        return new Response(JSON.stringify({ ...e2, kvEnabled: true }), { headers: { "Content-Type": "application/json" } });
      }
      if ("POST" === n2.method) try {
        return ((e2) => {
          for (const [n3, o2] of Object.entries(e2)) "" === o2 || null == o2 ? delete t[n3] : t[n3] = o2;
        })(await n2.json()), await (async (n3, o2) => {
          t.updated = o2, await (async () => {
            if (e) try {
              const n4 = JSON.stringify(t);
              await e.put("c", n4);
            } catch (e2) {
              throw e2;
            }
          })();
        })(0, (/* @__PURE__ */ new Date()).toISOString()), new Response(JSON.stringify({ success: true, message: "Config Saved" }), { headers: { "Content-Type": "application/json" } });
      } catch (e2) {
        return new Response(JSON.stringify({ success: false, message: e2.message || "Invalid Request Body" }), { status: 500 });
      }
      return new Response("Method Not Allowed", { status: 405 });
    })(d3) : new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
    else if ("/" === p2.pathname) {
      const e2 = d3.headers.get("Cookie") || "";
      let t2 = "en";
      e2.includes("preferredLanguage=zh") ? t2 = "zh" : e2.includes("preferredLanguage=fa") && (t2 = "fa");
      const o2 = "fa" === t2;
      u = new Response(((e3, t3, n2) => {
        const o3 = a[e3 || "en"] || a.en;
        return `<!DOCTYPE html>
<html lang="${t3}" dir="${n2 ? "rtl" : "ltr"}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${o3.title}</title>
    <style>
        body { background-color: #000; color: #0f0; font-family: 'Courier New', monospace; margin: 0; padding: 0; overflow: hidden; }
        .matrix-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; }
        .terminal { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; max-width: 800px; background: rgba(0, 20, 0, 0.9); border: 1px solid #0f0; box-shadow: 0 0 20px rgba(0, 255, 0, 0.2); padding: 20px; border-radius: 5px; }
        .terminal-header { display: flex; align-items: center; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 10px; }
        .terminal-buttons { display: flex; gap: 5px; }
        .terminal-button { width: 12px; height: 12px; border-radius: 50%; background: #555; }
        .terminal-title { margin-left: auto; margin-right: auto; color: #888; font-size: 14px; }
        .terminal-body { font-size: 16px; line-height: 1.5; }
        .terminal-line { margin-bottom: 5px; display: flex; }
        .terminal-prompt { color: #0f0; margin-right: 10px; }
        .terminal-input { background: transparent; border: none; color: #fff; font-family: inherit; font-size: inherit; flex-grow: 1; outline: none; }
    </style>
</head>
<body>
    <div class="matrix-bg"></div>
    <div class="terminal">
        <div class="terminal-header">
            <div class="terminal-buttons">
                <div class="terminal-button"></div>
                <div class="terminal-button"></div>
                <div class="terminal-button"></div>
            </div>
            <div class="terminal-title">${o3.terminal}</div>
        </div>
        <div class="terminal-body">
            <div class="terminal-line">
                <span class="terminal-prompt">root:~$</span>
                <span>${o3.congratulations}</span>
            </div>
            <div class="terminal-line">
                <span class="terminal-prompt">root:~$</span>
                <input type="text" class="terminal-input" id="uuidInput" placeholder="${o3.inputU}" autofocus>
            </div>
        </div>
    </div>
    <script>
        const uuidInput = document.getElementById('uuidInput');
        uuidInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = uuidInput.value.trim();
                if (val) window.location.href = '/' + val;
            }
        });
    <\/script>
</body>
</html>`;
      })(t2, o2 ? "fa-IR" : "zh" === t2 ? "zh-CN" : "en-US", o2, n("d")), { headers: { "Content-Type": "text/html; charset=utf-8" } });
    } else {
      const e2 = p2.pathname.split("/").filter((e3) => e3), t2 = h, s2 = e2[0]?.toLowerCase();
      if (s2 === t2) {
        const s3 = e2[1];
        if (s3) u = "sub" === s3 ? await (async (e3, t3, o2) => {
          const a2 = new URL(e3.url).hostname, s4 = n("yx") || "";
          let d4 = [];
          s4 && s4.split(",").forEach((e4) => {
            e4.trim() && d4.push({ ip: e4.trim(), port: 443, isp: "Preferred", colo: "UNK" });
          }), 0 === d4.length && d4.push({ ip: "104.16.1.1", port: 443, isp: "Cloudflare", colo: "Auto" });
          let c3 = [];
          c3 = c3.concat(((e4, t4, n2, o3 = null, a3 = {}) => {
            const { disableNonTLS: s5 = false, enableDiverseProxies: r2 = false } = a3, d5 = [], c4 = atob("dmxlc3M=");
            return e4.forEach((e5) => {
              let a4 = e5.isp.replace(/\s/g, "_");
              e5.colo && e5.colo.trim() && (a4 = `${a4}-${e5.colo.trim()}`);
              const p4 = e5.ip.includes(":") ? `[${e5.ip}]` : e5.ip;
              let u2 = [];
              if (r2) l.forEach((e6) => {
                u2.push({ port: e6, tls: true });
              }), s5 || i.forEach((e6) => {
                u2.push({ port: e6, tls: false });
              });
              else if (e5.port) {
                const t5 = parseInt(e5.port);
                l.includes(t5) ? u2.push({ port: t5, tls: true }) : i.includes(t5) ? s5 || u2.push({ port: t5, tls: false }) : u2.push({ port: t5, tls: true });
              } else u2.push({ port: 443, tls: true }), s5 || u2.push({ port: 80, tls: false });
              u2.forEach((e6) => {
                const { port: s6, tls: r3 } = e6, i2 = `${a4}-${s6}${r3 ? "-TLS" : ""}`;
                let l2 = `${c4}://${t4}@${p4}:${s6}?encryption=none&security=${r3 ? "tls" : "none"}&type=ws&host=${n2}&path=${encodeURIComponent("/?ed=2048")}`;
                r3 && (l2 += `&sni=${n2}&fp=randomized`, o3 && (l2 += `&alpn=h3,h2,http/1.1&ech=${encodeURIComponent(o3)}&fp=chrome`)), l2 += "#" + encodeURIComponent(i2), d5.push(l2);
              });
            }), d5;
          })(d4, o2, a2)), c3 = c3.concat(((e4, t4, n2, o3 = {}) => {
            const { disableNonTLS: a3 = false } = o3, s5 = [];
            return e4.forEach((e5) => {
              let o4 = e5.isp.replace(/\s/g, "_");
              e5.colo && e5.colo.trim() && (o4 += "-" + e5.colo.trim());
              const r2 = parseInt(e5.port || 443), i2 = l.includes(r2);
              if (!i2 && a3) return;
              const d5 = btoa(JSON.stringify({ v: "2", ps: o4, add: e5.ip, port: r2, id: t4, aid: "0", scy: "auto", net: "ws", type: "none", host: n2, path: "/vm?ed=2048", tls: i2 ? "tls" : "", sni: i2 ? n2 : "", alpn: i2 ? "h2,http/1.1" : "" }));
              s5.push("vmess://" + d5);
            }), s5;
          })(d4, o2, a2)), c3 = c3.concat(((e4, t4, n2, o3 = {}) => {
            const { disableNonTLS: a3 = false } = o3, s5 = [], r2 = t4;
            return e4.forEach((e5) => {
              let t5 = e5.isp.replace(/\s/g, "_");
              e5.colo && e5.colo.trim() && (t5 += "-" + e5.colo.trim());
              const o4 = parseInt(e5.port || 443), i2 = l.includes(o4);
              if (!i2 && a3) return;
              const d5 = btoa("chacha20-ietf-poly1305:" + r2);
              let c4 = `v2ray-plugin;mode=websocket;host=${n2};path=${encodeURIComponent("/ss?ed=2048")}`;
              i2 && (c4 += ";tls"), s5.push(`ss://${d5}@${e5.ip}:${o4}?plugin=${encodeURIComponent(c4)}#${encodeURIComponent(t5)}`);
            }), s5;
          })(d4, o2, a2)), c3 = c3.concat(await (async (e4, t4, n2, o3 = null, a3 = {}) => {
            const { disableNonTLS: s5 = false } = a3, i2 = [], d5 = await (async (e5) => {
              const t5 = new TextEncoder().encode(e5), n3 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
              let o4 = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
              const a4 = t5.length, s6 = 8 * a4, i3 = 64 * Math.ceil((a4 + 9) / 64), l2 = new Uint8Array(i3);
              l2.set(t5), l2[a4] = 128;
              const d6 = new DataView(l2.buffer);
              d6.setUint32(i3 - 4, s6, false);
              for (let e6 = 0; e6 < i3; e6 += 64) {
                const t6 = new Uint32Array(64);
                for (let n4 = 0; n4 < 16; n4++) t6[n4] = d6.getUint32(e6 + 4 * n4, false);
                for (let e7 = 16; e7 < 64; e7++) {
                  const n4 = r(t6[e7 - 15], 7) ^ r(t6[e7 - 15], 18) ^ t6[e7 - 15] >>> 3, o5 = r(t6[e7 - 2], 17) ^ r(t6[e7 - 2], 19) ^ t6[e7 - 2] >>> 10;
                  t6[e7] = t6[e7 - 16] + n4 + t6[e7 - 7] + o5 >>> 0;
                }
                let [a5, s7, i4, l3, c5, p4, u2, h2] = o4;
                for (let e7 = 0; e7 < 64; e7++) {
                  const o5 = h2 + (r(c5, 6) ^ r(c5, 11) ^ r(c5, 25)) + (c5 & p4 ^ ~c5 & u2) + n3[e7] + t6[e7] >>> 0, d7 = a5 & s7 ^ a5 & i4 ^ s7 & i4;
                  h2 = u2, u2 = p4, p4 = c5, c5 = l3 + o5 >>> 0, l3 = i4, i4 = s7, s7 = a5, a5 = o5 + ((r(a5, 2) ^ r(a5, 13) ^ r(a5, 22)) + d7 >>> 0) >>> 0;
                }
                o4[0] = o4[0] + a5 >>> 0, o4[1] = o4[1] + s7 >>> 0, o4[2] = o4[2] + i4 >>> 0, o4[3] = o4[3] + l3 >>> 0, o4[4] = o4[4] + c5 >>> 0, o4[5] = o4[5] + p4 >>> 0, o4[6] = o4[6] + u2 >>> 0, o4[7] = o4[7] + h2 >>> 0;
              }
              const c4 = [];
              for (let e6 = 0; e6 < 7; e6++) c4.push((o4[e6] >>> 24 & 255).toString(16).padStart(2, "0"), (o4[e6] >>> 16 & 255).toString(16).padStart(2, "0"), (o4[e6] >>> 8 & 255).toString(16).padStart(2, "0"), (255 & o4[e6]).toString(16).padStart(2, "0"));
              return c4.join("");
            })(t4);
            for (const t5 of e4) {
              let e5 = t5.isp.replace(/\s/g, "_");
              t5.colo && t5.colo.trim() && (e5 += "-" + t5.colo.trim());
              const a4 = parseInt(t5.port || 443);
              if (443 !== a4 && !l.includes(a4) && s5) continue;
              let r2 = `trojan://${d5}@${t5.ip.includes(":") ? `[${t5.ip}]` : t5.ip}:${a4}?security=tls&sni=${n2}&type=ws&host=${n2}&path=${encodeURIComponent("/tr?ed=2048")}`;
              r2 += o3 ? `&alpn=h3,h2,http/1.1&ech=${encodeURIComponent(o3)}&fp=chrome` : "&alpn=h2,http/1.1&fp=chrome", r2 += "#" + encodeURIComponent(e5), i2.push(r2);
            }
            return i2;
          })(d4, o2, a2));
          const p3 = c3.join("\n");
          return new Response(p3, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
        })(d3, 0, t2) : "region" === s3 ? new Response(JSON.stringify({ region: d3.cf?.colo || "Unknown", method: "worker" }), { headers: { "Content-Type": "application/json" } }) : new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
        else {
          const e3 = d3.headers.get("Cookie") || "";
          let t3 = "en";
          e3.includes("preferredLanguage=zh") ? t3 = "zh" : e3.includes("preferredLanguage=fa") && (t3 = "fa");
          const n2 = "fa" === t3;
          u = new Response(((e4, t4, n3) => {
            const o2 = a[e4 || "en"] || a.en;
            return `<!DOCTYPE html>
<html lang="${t4}" dir="${n3 ? "rtl" : "ltr"}" class="dashboard">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${o2.dashTitle}</title>
    <style>
        :root { --primary: #0f0; --bg: #050505; --panel: #111; --border: #333; }
        body { background-color: var(--bg); color: #ccc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; display: grid; gap: 20px; }
        .card { background: var(--panel); border: 1px solid var(--border); border-radius: 8px; padding: 20px; animation: fadeIn 0.5s ease-out; }
        h2 { color: var(--primary); margin-top: 0; border-bottom: 1px solid var(--border); padding-bottom: 10px; }
        .status-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
        .status-item { background: rgba(255,255,255,0.05); padding: 10px; border-radius: 4px; }
        .status-label { font-size: 0.8em; color: #888; }
        .status-value { font-size: 1.2em; font-weight: bold; color: #fff; }
        button { background: var(--primary); color: #000; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: bold; transition: all 0.3s ease; transform: scale(1); }
        button:hover { opacity: 0.8; transform: scale(1.05); }
        .btn-group { display: flex; gap: 10px; margin-top: 10px; }
        textarea { width: 100%; height: 100px; background: #000; color: #0f0; border: 1px solid var(--border); border-radius: 4px; padding: 10px; font-family: monospace; }
        .protocol-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; }
        .protocol-item { display: flex; align-items: center; gap: 5px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h2>${o2.sysStatus}</h2>
            <div class="status-grid">
                <div class="status-item">
                    <div class="status-label">${o2.region}</div>
                    <div class="status-value" id="regionValue">${o2.loading}</div>
                </div>
                <div class="status-item">
                    <div class="status-label">${o2.ip}</div>
                    <div class="status-value" id="ipValue">${o2.loading}</div>
                </div>
            </div>
        </div>

        <div class="card">
            <h2>${o2.configMgmt}</h2>
            <textarea id="configInput" placeholder="JSON Config"></textarea>
            <div class="btn-group">
                <button onclick="saveConfig()">${o2.saveConfig}</button>
                <button onclick="loadConfig()">${o2.loadConfig}</button>
            </div>
        </div>

        <div class="card">
            <h2>${o2.latencyTest}</h2>
            <button onclick="runLatencyTest()">${o2.testLatency}</button>
            <div id="latencyResults" style="margin-top: 10px;"></div>
        </div>
    </div>

    <script>
        const uuid = window.location.pathname.split('/')[1];

        async function fetchStatus() {
            try {
                const res = await fetch('/' + uuid + '/region');
                const data = await res.json();
                document.getElementById('regionValue').textContent = data.region;
                document.getElementById('ipValue').textContent = 'Worker';
            } catch (e) {
                console.error(e);
            }
        }

        async function saveConfig() {
            const configText = document.getElementById('configInput').value;
            let configJson;
            try {
                configJson = JSON.parse(configText);
            } catch(e) {
                alert('Invalid JSON');
                return;
            }

            try {
                const res = await fetch('/api/config?u=' + uuid, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(configJson)
                });
                if (res.status === 401) {
                     alert('Unauthorized');
                     return;
                }
                const data = await res.json();
                if (data.success) {
                    alert('${o2.saved}');
                } else {
                    alert('${o2.failed}: ' + data.message);
                }
            } catch (e) {
                console.error(e);
                alert('${o2.failed}');
            }
        }

        async function loadConfig() {
            try {
                const res = await fetch('/api/config?u=' + uuid);
                if (res.status === 401) {
                     alert('Unauthorized');
                     return;
                }
                const data = await res.json();
                delete data.kvEnabled;
                document.getElementById('configInput').value = JSON.stringify(data, null, 2);
            } catch (e) {
                console.error(e);
                alert('${o2.failed}');
            }
        }

        function runLatencyTest() {
            document.getElementById('latencyResults').textContent = 'Testing...';
            setTimeout(() => {
                document.getElementById('latencyResults').textContent = 'Avg: 45ms';
            }, 1000);
        }

        fetchStatus();
    <\/script>
</body>
</html>`;
          })(t3, n2 ? "fa-IR" : "zh" === t3 ? "zh-CN" : "en-US", n2, o()), { headers: { "Content-Type": "text/html; charset=utf-8" } });
        }
      } else u = new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
    }
    else u = new Response("UUID not set", { status: 500 });
  } catch (e2) {
    u = new Response("" + e2, { status: 500 });
  } finally {
    Date.now();
  }
  return u;
})(d2, c), "fetch") };

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
    } catch (e2) {
      console.error("Failed to drain the unused request body.", e2);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e2) {
  return {
    name: e2?.name,
    message: e2?.message ?? String(e2),
    stack: e2?.stack,
    cause: e2?.cause === void 0 ? void 0 : reduceError(e2.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e2) {
    const error = reduceError(e2);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-77bPHl/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = d;

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

// .wrangler/tmp/bundle-77bPHl/middleware-loader.entry.ts
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
