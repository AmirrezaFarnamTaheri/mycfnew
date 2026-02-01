# Cloudflare Worker Proxy & DoH Ultimate

This project integrates a high-performance VLESS/Trojan proxy with a robust DNS-over-HTTPS (DoH) resolver and advanced subscription management, all running on Cloudflare Workers.

## Key Features

### 🚀 Proxy & VPN Protocols
- **Multi-Protocol Support**: VLESS, Trojan, Shadowsocks, VMess, gRPC.
- **WebSocket & TLS**: Fully supports standard WebSocket and TLS transport.
- **Smart Routing**: Region-based IP selection and failover.
- **Legacy IP Support**: Built-in support for Visa/CDN legacy IPs (Toggleable via UI).

### 🛡️ High-Performance DoH Proxy
- **Multi-Provider**: Load balances between Cloudflare, Google, Quad9, OpenDNS, AdGuard, etc.
- **Caching**: Built-in caching for faster DNS responses.
- **Ad-Blocking**: Optional routing to ad-blocking DNS providers.
- **Endpoints**:
  - `GET /dns-query?dns=...` (RFC 8484)
  - `POST /dns-query` (Binary DNS message)
  - `GET /doh` (DoH Landing Page / Dashboard)

### 📦 Subscription & Config Management
- **Universal Subscription**: Generates links for V2Ray, Clash, Sing-box, Surge, Quantumult X, etc.
- **Local Config Generation**:
  - **Clash-Local**: Generates a full Clash YAML config directly on the worker (no external backend needed).
  - **Singbox-Local**: Generates a full Sing-box JSON config directly.
- **Remote Conversion**: Optional integration with external subscription converters.
- **KV Storage**: Save and manage your configuration settings using Cloudflare KV.

### 💻 Advanced UI
- **Web Interface**: accessible at `https://your-worker.workers.dev/UUID`.
- **Integration Controls**: Toggle protocols, enable/disable Legacy IPs, choose DoH modes.
- **Customization**: Set custom upstream DNS, ECH domains, and more.

---

## Deployment Guide

### 1. Create a Cloudflare Worker
1. Log in to the Cloudflare Dashboard.
2. Go to **Workers & Pages** -> **Create Application** -> **Create Worker**.
3. Name your worker and deploy.

### 2. Deploy the Code
1. Copy the content of `worker.js` (the obfuscated version) into the worker editor.
2. **Save and Deploy**.

### 3. Configuration (Environment Variables)
You can configure the worker via **Settings -> Variables and Secrets**.

| Variable | Description | Default |
|----------|-------------|---------|
| `UUID` | **Required.** Your VLESS/Trojan User ID. **Must be changed for security.** | (Generate a new one) |
| `PROXYIP` | *(Optional)* Custom Proxy IP/Domain (traffic exits via this upstream; only use endpoints you trust) | (empty) |
| `C` | KV Namespace binding name (required for "Save Config") | N/A |

**Generating a UUID:**
- Windows (PowerShell): `[guid]::NewGuid()`
- Linux/Mac: `uuidgen`

### 4. Bind KV Namespace (Optional but Recommended)
To use the "Save Config" feature in the UI:
1. Go to **Workers & Pages** -> **KV**.
2. Create a namespace (e.g., `WORKER_CONFIG`).
3. Go back to your Worker -> **Settings** -> **Variables and Secrets** -> **KV Namespace Bindings**.
4. Bind the namespace to the variable name **`C`**.

---

## Usage

### accessing the UI
Visit: `https://your-domain.workers.dev/YOUR_UUID`
(Replace `YOUR_UUID` with the actual UUID configured).

> [!WARNING]
> **Security Risk**: The UI URL contains your secret `UUID`. Avoid accessing it on public or untrusted networks. Anyone who obtains this URL can access your proxy settings and use your worker.

### Subscription Links
In the UI, you can copy subscription links for various clients.
- **Auto**: Detects client based on User-Agent.
- **Clash (Local)**: Generates a standalone Clash config.
- **Sing-box (Local)**: Generates a standalone Sing-box config.

### DoH Endpoint
Use your worker as a secure DNS resolver:
- **URL**: `https://your-domain.workers.dev/dns-query`
- **Dashboard**: `https://your-domain.workers.dev/doh`

> [!WARNING]
> If `/dns-query` is publicly accessible, your worker can function as an open DNS resolver and may be abused. Consider restricting access (token/header, Cloudflare WAF rules, IP allowlist, etc.) before sharing the URL.

---

## Integrations

### Legacy IPs (Visa/CDNs)
To enable the use of static legacy IPs (e.g., `visa.com` endpoints):
1. Open the UI.
2. Go to **Features & Integrations**.
3. Check **Enable Visa/CDN Nodes (eli)**.
4. Click **Save Config**.
5. Refresh your subscription.

### Custom DoH
You can specify a custom upstream DNS server for ECH (Encrypted Client Hello) resolution in the UI.

---

## Credits
Based on the work of:
- `3Kmfi6HP` (Cloudflare_vless_worker)
- `Hossein Pira` (DoH Proxy Worker)
- `Yongge` and others in the community.

**Disclaimer**: This tool is for educational purposes only.
