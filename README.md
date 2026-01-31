# CFnew - 终端 v2.9.3

**语言:** [中文](README.md) | [فارسی](فارسی.md)

[Telegram 交流群](https://t.me/+ft-zI76oovgwNmRh)

## 📖 目录

1.  [简介与功能](#简介与功能)
2.  [核心概念拆解](#核心概念拆解-unpacking-concepts)
3.  [配置百科全书 (Configuration Encyclopedia)](#配置百科全书-configuration-encyclopedia)
    *   [基础身份验证](#1-基础身份验证-identity)
    *   [网络中继与隐藏](#2-网络中继与隐藏-relay--stealth)
    *   [协议开关](#3-协议开关-protocols)
    *   [高级控制与优选](#4-高级控制与优选-advanced--preferred)
4.  [终极配置指南：开启所有功能](#终极配置指南开启所有功能)
5.  [ProxyIP 深度解析](#proxyip-深度解析)
6.  [客户端配置指南](#客户端配置指南)
7.  [故障排除](#故障排除-troubleshooting)
8.  [API 管理](#api-管理)
9.  [Star History](#star-history)

---

## 简介与功能

CFnew 是一个运行在 Cloudflare Workers 上的轻量级代理脚本。它利用 Cloudflare 的全球边缘网络，为您提供快速、安全的网络连接。

*   **多协议并发**：同时支持 VLESS、Trojan、xhttp 等原生协议，以及 VMess、Shadowsocks 等转发协议。
*   **高度隐蔽**：支持自定义路径 (Path)，伪装成普通网站，防止探测。
*   **图形化管理**：通过 KV 存储配置，无需修改代码即可在网页端实时调整设置。
*   **内置工具**：集成延迟测试、优选 IP 管理、DoH (DNS-over-HTTPS) 代理。
*   **智能订阅**：根据您的客户端 (Clash, v2rayNG, etc.) 自动输出最合适的配置格式。

---

## 核心概念拆解 (Unpacking Concepts)

为了让您彻底理解 Worker 如何工作，我们将其拆解。

### 网络请求的解剖 (邮差比喻)

想象您要寄一封信（访问 Google），但邮局（防火墙）禁止寄给 Google。

1.  **打包 (封装)**: 您把写给 Google 的信，装进一个写着 "给 Cloudflare Worker" 的信封里。这就是 **VLESS/Trojan 协议** 的作用。
2.  **投递 (传输)**: 邮局看到信是寄给 Cloudflare（一个合法的 CDN 公司）的，于是放行。
3.  **拆包 (处理)**: Worker 收到信，打开发现里面其实是给 Google 的。
4.  **转发 (中继)**:
    *   **直连模式**: Worker 假装是您，直接把信送给 Google。
    *   **ProxyIP 模式**: Worker 觉得直接去不太安全，于是把信交给一个 "秘密中转站" (ProxyIP)，由它送给 Google。
5.  **回信**: Google 回信给 Worker (或 ProxyIP)，Worker 再把回信装进 "Cloudflare" 的信封寄回给您。

---

## 配置百科全书 (Configuration Encyclopedia)

这里详细解释每一个变量。

### 1. 基础身份验证 (Identity)

| 变量 | 全称 | 类型 | 默认值 | 详细说明 | 为什么使用? | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`u`** | **UUID** | String | (必需) | 这里的 `u` 代表 User ID。它是 VLESS/Trojan 协议认证的核心。Worker 会检查请求中的 UUID 是否与此变量匹配。 | **安全**。防止未授权用户使用您的代理消耗流量。 | `84439981-04b6-4103-aa4b-864aa9c91469` |

### 2. 网络中继与隐藏 (Relay & Stealth)

| 变量 | 全称 | 类型 | 默认值 | 详细说明 | 为什么使用? | 示例 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`p`** | **ProxyIP** | String | (空) | 流量转发目标。格式 `IP:Port`。Worker 收到请求后，不直接访问目标，而是转发给这个 IP。 | **解封/隐藏**。解决 CF IP 被墙、被网站屏蔽 (如 Netflix) 问题；隐藏 Worker 真实 IP。 | `1.2.3.4` 或 `proxy.example.com` |
| **`s`** | **SOCKS5** | String | (空) | SOCKS5 代理地址。格式 `user:pass@host:port`。优先级高于 `p`。 | **特定出口**。如果您有特定国家的 SOCKS5 代理，想让流量从那里出来。 | `user:123456@1.1.1.1:1080` |
| **`d`** | **Directory** | String | (空) | 自定义访问路径。设置后，UUID 路径失效。 | **防探测**。让 Worker 看起来像个普通网站，只有知道路径的人才能看到面板。 | `/my-secret-path` |
| **`wk`** | **Worker Region** | String | (自动) | 强制 Worker 匹配的地区代码。支持 `SG`, `US`, `JP`, `HK` 等。 | **就近接入**。强制 Worker 使用指定地区的优选 IP，降低延迟。 | `SG` |

### 3. 协议开关 (Protocols)

设置为 `yes` 开启，`no` 关闭。

| 变量 | 协议 | 类型 | 默认 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| **`ev`** | **VLESS** | Bool | `yes` | **原生处理**。最推荐，性能最好。 |
| **`et`** | **Trojan** | Bool | `no` | **原生处理**。伪装成 HTTPS 流量，抗干扰强。 |
| **`ex`** | **xhttp** | Bool | `no` | **原生处理**。基于 HTTP POST。需开启 Cloudflare gRPC。 |
| **`evm`** | **VMess** | Bool | `no` | **仅生成链接**。流量需通过 `p` 或 `s` 中继。Worker 无法直接作为 VMess 服务端。 |
| **`ess`** | **Shadowsocks** | Bool | `no` | **仅生成链接**。同上，需后端支持。 |
| **`etu`** | **TUIC** | Bool | `no` | **仅生成链接**。UDP 协议。Worker 无法处理，仅用于分发自建服务器配置。 |
| **`ehy`** | **Hysteria 2** | Bool | `no` | **仅生成链接**。UDP 协议。同上。 |
| **`eg`** | **VLESS gRPC** | Bool | `no` | **原生处理**。流量通过 gRPC 传输。 |
| **`tp`** | **Trojan Pass** | String | (UUID) | Trojan 协议的密码。如果不填，默认使用 `u` 变量的值。 |
| **`ech`** | **ECH** | Bool | `no` | **增强功能**。开启 Encrypted Client Hello。自动启用 `dkby=yes`。 |

### 4. 高级控制与优选 (Advanced & Preferred)

| 变量 | 全称 | 默认 | 说明 |
| :--- | :--- | :--- | :--- |
| **`yx`** | **优选 IP** | (空) | **最高优先级**。手动指定的优选列表。格式: `IP:Port#备注`。 |
| **`yxURL`** | **优选 URL** | (默认) | 从远程 TXT 文件获取优选 IP。覆盖内置默认源。 |
| **`scu`** | **Sub Converter** | (默认) | 订阅转换后端 URL。用于生成 Clash/Surge 格式。 |
| **`homepage`**| **伪装首页** | (空) | 访问根路径 `/` 时显示的内容。填入一个 URL (如 `https://www.google.com`)。 |
| **`epd`** | **优选域名** | `yes` | 是否启用内置的优选域名 (如 `time.is` 等)。 |
| **`epi`** | **优选 IP** | `yes` | 是否启用动态获取的优选 IP 池。 |
| **`egi`** | **GitHub IP** | `yes` | 是否启用 GitHub 相关的优选 IP。 |
| **`qj`** | **强制降级** | `yes` | **注意**：设为 `no` 才是开启降级！逻辑：CF直连失败 -> SOCKS5 -> ProxyIP。 |
| **`dkby`** | **端口控制** | `no` | 设为 `yes` 开启 "仅 TLS"。只生成 443 等安全端口节点，屏蔽 80 端口。 |
| **`rm`** | **地区匹配** | `yes` | 设为 `no` 关闭智能地区匹配。 |
| **`ae`** | **API Enable** | `no` | 设为 `yes` 开启 API 管理功能。 |

---

## 终极配置指南：开启所有功能

如果您希望获得最完整、最强大的功能，请按以下步骤配置：

### 目标
1.  开启 **VLESS** 和 **Trojan** (双协议备用)。
2.  开启 **ECH** (最高抗封锁)。
3.  配置 **ProxyIP** (解锁 Netflix/ChatGPT)。
4.  设置 **自定义路径** (防止被扫)。
5.  开启 **API 管理** (自动化更新 IP)。

### 操作步骤 (KV 配置法)

1.  部署 Worker 并绑定 KV (变量名 `C`)。
2.  访问 Worker 面板，填入以下值并保存：

*   **`ev` (VLESS)**: `yes`
*   **`et` (Trojan)**: `yes`
*   **`ech` (ECH)**: `yes`
*   **`tp` (Trojan密码)**: `mysecurepass123` (自定义一个好记的)
*   **`p` (ProxyIP)**: `proxyip.fxxk.dedyn.io` (找一个稳定的优选域名)
*   **`d` (自定义路径)**: `/admin-panel`
*   **`ae` (API)**: `yes`
*   **`qj` (降级)**: `no` (开启自动故障转移)
*   **`homepage`**: `https://www.microsoft.com` (伪装成微软首页)

### 结果
*   您的订阅链接变为: `https://your-domain.com/admin-panel`
*   客户端会收到 VLESS 和 Trojan 两种节点。
*   所有节点都启用了 ECH 加密。
*   访问被墙网站时，流量会自动经过 ProxyIP。
*   您可以编写脚本通过 API 自动向 `yx` 列表添加最新的优选 IP。

---

## ProxyIP 深度解析

**原理**:
通常情况下，Worker 访问网站时，目标网站看到的是 Cloudflare 的 IP。ProxyIP 是您在 Worker 和目标网站之间架设的一座桥。

**作用**:
1.  **解锁流媒体**: Netflix/Disney+ 等往往封锁 Cloudflare 数据中心 IP。使用家宽 ProxyIP 可解锁。
2.  **规避 Google 验证码**: 频繁使用 CF IP 访问 Google 会触发验证码。ProxyIP 可解决此问题。
3.  **解决 Cloudflare Loop**: 如果目标网站也使用了 Cloudflare CDN，Worker 直接访问可能会报错 (Error 1000)。ProxyIP 可绕过此限制。

---

## 客户端配置指南

为了获得最佳体验，请注意以下客户端设置：

### v2rayNG (Android)
*   **Mux (多路复用)**: 建议**关闭**。虽然理论上能降低握手延迟，但在某些网络环境下会导致断流。
*   **跳过证书验证**: 如果没有自定义域名，建议设为 `true` (允许不安全)。
*   **Sniffing (流量嗅探)**: 建议**开启**，以便正确分流国内外流量。

### Shadowrocket (iOS)
*   **Allow Insecure**: 在设置中开启。
*   **订阅更新**: 建议开启 "打开时更新"，确保获得最新的优选 IP。

### Clash Meta / Mihomo (PC/Android)
*   **内核**: 请务必使用 Meta (Mihomo) 内核。官方 Premium 内核可能不支持 VLESS Reality 或某些 ECH 特性。
*   **Client Fingerprint**: 建议设置为 `chrome`，模拟真实浏览器指纹。

---

## 故障排除 (Troubleshooting)

**场景 1: 能打开订阅页面，但节点全部超时/无法连接**
*   **原因 A**: 您的网络无法直接连接 Cloudflare Worker 域名 (workers.dev)。
    *   *解法*: 绑定自定义域名 (Custom Domain)，或者使用优选 IP。
*   **原因 B**: 端口被封。
    *   *解法*: 尝试使用非标准端口 (如 2053, 2083, 8443) 的节点。
*   **原因 C**: UUID 错误。
    *   *解法*: 检查客户端配置中的 UUID 是否与 Worker 变量 `u` 一致。

**场景 2: 访问显示 "Error 1101: Worker Threw Exception"**
*   **原因**: Worker 代码运行出错。
*   *解法*: 通常是因为 KV 未绑定。请检查 "KV Namespace Bindings" 是否有名为 `C` 的变量。

**场景 3: 访问显示 "Error 502: Bad Gateway"**
*   **原因**: Worker 无法连接到上游 (ProxyIP 或 目标网站)。
*   *解法*: 您配置的 ProxyIP (`p` 变量) 可能已失效。请更换 ProxyIP 或暂时清空 `p` 变量测试直连。

**场景 4: 速度很慢**
*   **原因**: 分配的 Cloudflare 节点拥堵。
*   *解法*: 在配置面板使用 "延迟测试"，测出一批低延迟 IP，点击 "添加到优选列表" 并保存。

---

## API 管理

**API 基础 URL**: `https://您的域名/您的UUID/api/preferred-ips`

| 方法 | 描述 | Body (JSON) |
| :--- | :--- | :--- |
| `GET` | 获取当前 IP 列表 | (无) |
| `POST` | 添加 IP | `{"ip": "1.2.3.4", "port": 443, "name": "备注"}` |
| `DELETE` | 删除 IP | `{"ip": "1.2.3.4"}` |
| `DELETE` | 清空所有 | `{"all": true}` |

*提示: 需在图形界面开启 "允许 API 管理" 才能使用。*

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=byJoey/cfnew&type=Timeline)](https://www.star-history.com/#byJoey/cfnew&Timeline&LogScale)
