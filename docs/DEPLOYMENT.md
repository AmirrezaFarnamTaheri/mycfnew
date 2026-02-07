# Deployment Guide

This document explains deployment options, environment variables, KV binding, and update/rollback practices.

---

## 1) Cloudflare Dashboard Deployment (Recommended)

### 1.1 Create Worker
1. Dashboard → **Workers & Pages** → **Create Application** → **Create Worker**
2. Name it (random names reduce attention)
3. Click **Deploy**

### 1.2 Paste Code
1. Click **Edit Code**
2. Replace default content with `worker.js`
3. **Save and Deploy**

---

## 2) Configure Environment Variables

Open **Settings → Variables and Secrets**:

- `u`: **required** (UUID)
- `d`: optional custom path
- `p`: optional ProxyIP
- `s`: optional SOCKS5

After changes, click **Deploy**.

### 2.1 Full Variable Reference

| Variable | Purpose | Example |
|---|---|---|
| `u` | UUID (your secret) | `8485...5823` |
| `d` | Custom dashboard path | `/secret-panel` |
| `p` | ProxyIP (hide Worker IP) | `1.2.3.4:443` |
| `s` | SOCKS5 upstream | `user:pass@host:port` |
| `wk` | Manual Worker region | `US` / `SG` / `JP` |
| `yx` | Preferred IP list | `1.1.1.1:443#HK,...` |
| `yxURL` | Preferred IP source URL | `https://example.com/ips.txt` |
| `rm` | Region matching | `no` disables |
| `qj` | Downgrade flow | `no` enables (Direct → SOCKS5 → Fallback) |
| `dkby` | TLS-only nodes | `yes` enables |
| `yxby` | Disable preferred nodes | `yes` disables |
| `ae` | Allow API management | `yes` enables |
| `ech` | Enable ECH | `yes` enables |
| `customDNS` | DoH DNS for ECH | `https://dns.example/dns-query` |
| `customECHDomain` | ECH domain | `cloudflare-ech.com` |
| `tp` | Trojan password | `custom-pass` |
| `homepage` | Fake homepage URL | `https://example.com` |
| `scu` | Subscription converter | `https://url.v1.mk/sub` |
| `ev` | VLESS enabled | `yes` / `no` |
| `et` | Trojan enabled | `yes` / `no` |
| `ex` | xhttp enabled | `yes` / `no` |
| `evm` | VMess (link-only) | `yes` / `no` |
| `ess` | Shadowsocks (link-only) | `yes` / `no` |
| `etu` | TUIC (link-only) | `yes` / `no` |
| `ehy` | Hysteria2 (link-only) | `yes` / `no` |
| `eg` | VLESS gRPC (link-only) | `yes` / `no` |
| `epd` | Preferred domain list | `yes` / `no` |
| `epi` | Preferred IP list | `yes` / `no` |
| `egi` | GitHub default list | `yes` / `no` |
| `edp` | Diverse ports | `yes` / `no` |
| `ipv4` | IPv4 filtering | `yes` / `no` |
| `ipv6` | IPv6 filtering | `yes` / `no` |
| `ispMobile` | ISP filter: Mobile | `yes` / `no` |
| `ispUnicom` | ISP filter: Unicom | `yes` / `no` |
| `ispTelecom` | ISP filter: Telecom | `yes` / `no` |

### 2.2 Dashboard vs Environment (Precedence)

- Environment variables act as defaults.
- Dashboard writes to **KV** and overrides env values.
- **Reset** in the dashboard clears KV and returns to env defaults.

---

## 3) KV Namespace Binding (Required for Dashboard)

1. **Workers & Pages** → **KV** → **Create Namespace**
2. Bind it in Worker Settings:
   - Variable name: `C`
   - KV namespace: your new namespace
3. **Save and Deploy**

> Without KV, dashboard settings cannot be saved.

---

## 4) Optional Wrangler Deployment (CLI)

If you prefer CLI:

1. Install Wrangler: `npm i -g wrangler`
2. Login: `wrangler login`
3. Publish: `wrangler publish`
4. Add vars:
   - `wrangler secret put u`

KV binding via Wrangler depends on your `wrangler.toml`.

---

## 5) Custom Domain (Optional)

1. Add a custom domain to the Worker
2. Verify DNS in Cloudflare
3. Update your client URLs to the custom domain

---

## 6) Updating the Worker

- Replace code with a new version of `worker.js`
- Re-deploy
- KV data is preserved

### Rollback
- Keep a copy of your last known good `worker.js`
- Re-deploy if needed

---

## 7) Logs & Debugging

- Use **Workers → Logs** to inspect server errors
- Use the in-dashboard debug console to view JS errors

---

## 8) Troubleshooting

**Error 1101**
- Usually a syntax error or missing binding

**KV Not Configured**
- Ensure binding name is exactly `C`

**UUID Invalid**
- Confirm variable name is `u`

---

For more details, see the Walkthrough.

Full variable and API reference: `docs/REFERENCE.md`.
