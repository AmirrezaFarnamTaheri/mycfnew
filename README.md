# CFnew - Ultimate Terminal v2.9.3

**Language:** [English](README.md) | [中文](README_ZH.md) | [فارسی](فارسی.md)

[Telegram Group](https://t.me/+ft-zI76oovgwNmRh)

---

## 🛡️ Introduction

**CFnew** is a state-of-the-art, all-in-one proxy solution running on Cloudflare Workers. It is designed to be **unblockable**, **fast**, and **easy to manage**.

*   **Serverless**: No VPS required. Runs on Cloudflare's global edge network (300+ cities).
*   **No-Code Management**: Manage everything (UUID, IPs, Protocols) via a beautiful "Matrix-style" Web Dashboard.
*   **Polymorphic**: Acts as VLESS, Trojan, and a normal website simultaneously.
*   **Smart Routing**: Automatically selects the best route based on your region.

---

## 🧠 The Mailman Analogy: How it Works

To understand how this tool bypasses censorship, imagine a **Secure Postal Service**.

### 1. The Disguise 🎭
You want to send a letter to **YouTube** (a blocked location).
Instead of mailing it directly, you put it in an envelope addressed to **Cloudflare** (a allowed business).
The Inspector (Firewall) sees the address "Cloudflare" and lets it pass.

### 2. The Verification 🔐
On the back of the envelope, you place a special, invisible stamp called a **UUID**.
When the letter arrives at Cloudflare, the Worker checks this stamp.
*   **No stamp?** The letter is thrown away.
*   **Valid stamp?** The Worker opens the envelope, reads your actual request ("Go to YouTube"), and fetches the data for you.

### 3. The Delivery 🚚
The Worker gets the data from YouTube and sends it back to you in a Cloudflare envelope.
To the outside world, you are just talking to Cloudflare.

*   **Read the full [Analogy & Deep Dive](docs/ANALOGY.md)** for details on ECH, Fragmentation, and ProxyIPs.

---

## 🚀 Quick Start

### 1. Deployment
1.  Copy the code from `worker.js`.
2.  Paste it into a new Cloudflare Worker.
3.  Deploy.

### 2. Configuration
1.  Go to Worker Settings -> Variables.
2.  Add `u` = `YOUR_UUID` (Generate one [here](https://www.uuidgenerator.net/)).
3.  Add KV Namespace binding named `C` (Required for dashboard settings).

### 3. Usage
Visit: `https://your-worker.workers.dev/<YOUR_UUID>`

**[👉 Full Step-by-Step Walkthrough](docs/WALKTHROUGH.md)**

---

## 🛠️ Features & Configuration

### Supported Protocols
*   **VLESS** (Native, WebSocket, TLS) - *Recommended*
*   **Trojan** (Native, TLS) - *High Security*
*   **Shadowsocks / VMess** (Link Generation Only)
*   **Hysteria 2 / TUIC** (Link Generation Only - requires external backend)

### Key Variables

| Variable | Description |
| :--- | :--- |
| `u` | **UUID**. Your secret password. |
| `p` | **ProxyIP**. The backend IP to relay traffic (e.g., `ip.example.com`). |
| `d` | **Hidden Path**. Access dashboard via `/secret-path` instead of UUID. |
| `s` | **SOCKS5**. Upstream proxy (`user:pass@host:port`). |

*Full configuration guide available in the Dashboard.*

---

## 📚 Documentation

*   **[Walkthrough](docs/WALKTHROUGH.md)**: Zero to Hero guide.
*   **[Deployment Guide](docs/DEPLOYMENT.md)**: Technical deployment details.
*   **[Analogy](docs/ANALOGY.md)**: Conceptual explanation.

---

## ⚠️ Disclaimer
This tool is for educational and research purposes only. The developers are not responsible for any misuse.
