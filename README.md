# Cloudflare Worker Proxy & DoH Ultimate 🛡️🚀

A comprehensive, all-in-one Cloudflare Worker solution that combines a high-performance **VLESS/Trojan Proxy** with a robust **DNS-over-HTTPS (DoH) Resolver**.

![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange?style=flat&logo=cloudflare)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

---

## 🌟 Key Features

### 1. Advanced Proxy Protocols
-   **Multi-Protocol**: Support for **VLESS**, **Trojan**, **Shadowsocks**, **VMess**, and **gRPC**.
-   **WebSocket & TLS**: Fully compliant with standard transport protocols.
-   **Region-Smart Routing**: Automatically selects the best upstream IP based on region (e.g., US, SG, DE).
-   **Legacy IP Support**: Integrated support for Visa/CDN legacy IPs (toggleable via UI).

### 2. High-Performance DoH Resolver
-   **Multi-Provider Load Balancing**: Distributes DNS queries across Cloudflare, Google, Quad9, OpenDNS, and more.
-   **Privacy & Ad-Blocking**: Optional routing to ad-blocking providers (AdGuard, NextDNS).
-   **Caching**: Built-in response caching to minimize latency.
-   **Standards Compliant**: Supports RFC 8484 (`GET` and `POST`).

### 3. Ultimate UI & Management
-   **Web Interface**: A beautiful, bilingual (Chinese/Farsi) dashboard to manage your worker.
-   **Configuration Persistence**: Save your settings (Custom IPs, UUIDs, Ports) using Cloudflare KV.
-   **Subscription Generation**: Generate subscription links for:
    -   Clash (Meta/Premium)
    -   Sing-box
    -   V2Ray / Xray
    -   Surge / Quantumult X
-   **Local Config Generation**: Generate full configuration files *locally* on the worker, avoiding external converters for better security.

---

## 📚 Documentation

-   **[Deployment Guide](docs/DEPLOYMENT.md)**: Step-by-step instructions to get running in 5 minutes.
-   **[DNS Encoding Guide](docs/DNS_ENCODING.md)**: Technical details on DoH `GET` request encoding.

---

## 🚀 Quick Start

1.  **Deploy Code**: Copy `worker.js` to your Cloudflare Worker.
2.  **Set Secrets**: Configure your `UUID` in "Variables and Secrets".
3.  **Bind KV**: Add a KV Namespace binding named `C` to enable saving settings.
4.  **Visit UI**: Go to `https://your-worker.workers.dev/<YOUR_UUID>`.

> [!WARNING]
> **Security Warning**:
> 1.  **Protect your UUID**: Your UI URL contains your secret UUID. Do not share it.
> 2.  **DoH Abuse**: If you enable the `/dns-query` endpoint publicly, it can be used as an open resolver. Consider adding access controls if necessary.

---

## 🛠️ Configuration Variables

| Variable | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `UUID` | Secret | *None* | **Required**. Your access credential. |
| `PROXYIP` | Text | *Empty* | Custom upstream proxy IP/Domain. |
| `SOCKS5` | Secret | *Empty* | Optional SOCKS5 fallback (`user:pass@host:port`). |
| `C` | KV | *None* | KV Namespace binding for config storage. |

---

## 🔗 Endpoints

| Path | Method | Description |
| :--- | :--- | :--- |
| `/<UUID>` | GET | Access the Web UI Dashboard. |
| `/<UUID>/sub` | GET | Get subscription links. |
| `/dns-query` | GET/POST | DNS-over-HTTPS endpoint. |
| `/doh` | GET | DoH Information Landing Page. |

---

## 🤝 Credits & Acknowledgements

This project integrates and improves upon the work of several open-source projects:
-   **3Kmfi6HP**: Original VLESS Worker script.
-   **Hossein Pira**: DoH Proxy Worker logic.
-   **Tehran Network**: UI concepts and Persian localization.
-   **Yongge**: Optimization and features.

**Disclaimer**: This tool is for educational and research purposes only. The developers are not responsible for any misuse.
