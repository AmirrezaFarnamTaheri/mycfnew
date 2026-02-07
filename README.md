# CFnew - Ultimate Terminal v2.9.3

**Language:** [English](README.md) | [中文](README_ZH.md) | [فارسی](فارسی.md)

[Telegram Group](https://t.me/+ft-zI76oovgwNmRh)

---

## TL;DR (Quick Start)

1. Deploy `worker.js`  to a new Cloudflare Worker.
2. Set environment variable `u` = your UUID.
3. Bind KV namespace as variable `C`.
4. Open `https://<your-worker>.workers.dev/<YOUR_UUID>`.
5. Use the dashboard to generate subscription links.

---

## What is CFnew?

**CFnew** is a Cloudflare Workers-based proxy system that disguises your traffic as normal web browsing. It provides a built-in, Matrix-style dashboard to manage routing, protocol generation, and performance tuning without running any servers.

**Why it is different:**
- **Serverless**: No VPS required; it runs on Cloudflare’s edge network.
- **Polymorphic**: Behaves as a normal website to strangers but turns into a proxy endpoint for authorized users.
- **Self-managed**: Update settings from the dashboard, stored in KV.
- **Hard to block**: Traffic looks like regular HTTPS to Cloudflare.

---

## How it Works (Short Version)

- **`/` (root)** shows a terminal-style landing page.
- **`/<UUID>`** opens the dashboard (valid UUID required).
- **`/<UUID>/sub`** returns a subscription feed for clients.
- **`/<CUSTOM_PATH>`** can replace UUID access when you set `d`.

---

## Features

- Multi-protocol generation: **VLESS**, **Trojan**, **VMess**, **Shadowsocks**, **Hysteria2**, **TUIC**
- Smart region matching and fallback selection
- Latency testing and preferred IP (ProxyIP) management
- Optional ECH support (via DoH)
- Built-in subscription conversion support
- Debug console in the UI for error visibility
- 3 language UI (English / 中文 / فارسی)

---

## Dashboard Map

- **System Status**: Worker region, detection method, current IP, region match
- **Config Management**: Save config to KV, load current config, reset
- **Latency Test**: Test batches of IPs, filter by city, add to preferred list
- **Advanced Control**: Protocol toggles, TLS-only mode, downgrade strategy, API control
- **Links**: One-click subscription links for common clients

---

## Core Variables (Quick Reference)

| Variable | Purpose | Example |
|---|---|---|
| `u` | UUID (your secret password) | `8485...5823` |
| `d` | Custom path (replaces UUID path) | `/secret-panel` |
| `p` | ProxyIP (hide real Worker IP) | `1.2.3.4:443` |
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

> The dashboard exposes additional toggles (GitHub defaults, diverse ports, IPv4/IPv6, ISP filters). Full list: `docs/REFERENCE.md`.

---

## Common Flows

### 1) Default UUID Access
- Keep `d` empty.
- Access dashboard at `/<UUID>`.

### 2) Custom Path Mode
- Set `d=/your-secret-path`.
- UUID access is disabled; use `/<your-secret-path>`.

### 3) Recommended Minimal Setup
- `u` + KV binding only.
- Generate subscription and connect.

---

## Troubleshooting (Quick)

- **Stuck on “Checking...”**: Open the debug console; check for `/region` or `/sub` errors.
- **UUID rejected**: Confirm variable name is `u` (not `uuid`). Remove spaces.
- **KV errors**: Ensure KV namespace is bound as `C` and redeployed.
- **No subscription data**: Check `/sub` directly in browser.

---

## Security Checklist

- Do not share your UUID path.
- Prefer a custom path (`d`) for the dashboard.
- Use Cloudflare Access or IP allowlist for the dashboard path.
- Rotate UUID if compromised.

---

## Documentation

- **Walkthrough**: `docs/WALKTHROUGH.md`
- **Deployment**: `docs/DEPLOYMENT.md`
- **Analogy**: `docs/ANALOGY.md`
- **DNS Encoding**: `docs/DNS_ENCODING.md`
- **Full Reference**: `docs/REFERENCE.md`

---

## Disclaimer

This tool is for educational and research purposes only. The developers are not responsible for misuse.

## Development

This project uses a modular source structure.

- **Source Code**: `src/` directory.
- **Tests**: `test/` directory (run with `npm test`).
- **Build**: Run `npm run build` to generate `worker.js`.

To deploy, simply upload the generated `worker.js`.
