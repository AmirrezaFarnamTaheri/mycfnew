# CFnew - 终极终端 v2.9.3

**语言:** [English](README.md) | [中文](README_ZH.md) | [فارسی](فارسی.md)

[Telegram 群组](https://t.me/+ft-zI76oovgwNmRh)

---

## 🛡️ 简介

**CFnew** 是一个运行在 Cloudflare Workers 上的尖端全能代理解决方案。它的设计目标是 **抗封锁**、**高性能** 且 **易于管理**。

### 为什么选择 CFnew?
不同于容易被识别和封锁的传统 VPN，CFnew 利用 Cloudflare 的庞大基础设施来隐藏您的流量。对于审查者来说，您的流量看起来就像是访问合法商业网站的普通网页浏览行为。

*   **无服务器 (Serverless)**: 无需购买 VPS。运行在 Cloudflare 全球边缘网络（300+ 城市）。
*   **无代码管理 (No-Code)**: 通过漂亮的“黑客帝国”风格网页控制面板管理所有内容（UUID、IP、协议）。
*   **多态特性**: 同时作为 VLESS、Trojan 服务器和一个普通的伪装网站运行。服务器智能检测请求类型并做出相应响应——对未授权用户显示真实网页，对您则提供代理连接。
*   **智能路由**: 根据您的区域自动选择最佳路线以最小化延迟。
*   **扩展区域**: 支持 US, SG, JP, KR, DE, SE, NL, FI, GB, FR, CA, AU, HK, TW, IT, ES, RU, UA, BR, IN, ZA, TR, AR, NG, EG, VN, ID 等多国区域检测。
*   **Legacy IPs**: 内置丰富的 Legacy IP 列表 (Google, Microsoft, Apple 等)，以应对伊朗等地区标准 IP 可能被限速的特殊网络环境。

> **注意:** 最终的 `worker.js` 文件已经过混淆/压缩处理，以提高性能并保持紧凑。

---

## 🧠 邮差比喻：它是如何工作的？

为了理解这个工具如何绕过审查，让我们把它想象成一个 **安全邮政服务**。

### 1. 伪装 (The Disguise) 🎭
你想给 **YouTube**（一个被封锁的地址）寄信。
你不能直接寄，所以你把它装进一个寄给 **Cloudflare**（一个合法的商业公司）的信封里。
检查员（防火墙）看到地址是“Cloudflare”，就放行了。

### 2. 验证 (The Verification) 🔐
在信封背面，你盖了一个特殊的隐形邮戳，叫做 **UUID**。
当信件到达 Cloudflare 时，Worker 会检查这个邮戳。
*   **没有邮戳？** 信件被丢弃。
*   **邮戳有效？** Worker 打开信封，读取你的真实请求（“去访问 YouTube”），并为你获取数据。

### 3. 投递 (The Delivery) 🚚
Worker 从 YouTube 获取数据，并将其装在 Cloudflare 的信封里寄回给你。
在外界看来，你只是在和 Cloudflare 通信。

*   **阅读完整的 [比喻与深度解析](docs/ANALOGY.md)** （英文）以了解 ECH、分片和 ProxyIP 的细节。

---

## 🚀 快速开始

### 1. 部署 (全新安装)
1.  复制 `worker.js` 中的代码。
2.  将其粘贴到新的 Cloudflare Worker 中。
3.  点击部署。

### 2. 配置
1.  转到 Worker 设置 -> 变量。
2.  添加 `u` = `你的UUID` (在此生成: [uuidgenerator.net](https://www.uuidgenerator.net/))。
3.  添加 KV 命名空间绑定，变量名为 `C`（仪表盘设置保存需要此项）。

### 3. 更新现有 Worker
1.  只需将现有 Worker 中的代码替换为 `worker.js` 的内容。
2.  保存并部署。您在 KV 中的设置将被保留。

> [!WARNING]
> **安全警告**
> 1. **保护您的 UUID**: 仪表盘链接包含您的 UUID（密钥），请勿分享给他人。
>    - 建议：使用 Cloudflare Access 保护仪表盘路径（或至少设置 IP 白名单/地理限制）。
>    - 进阶：需要二次验证（如 `?token=` 或强制自定义 Header），并拒绝无验证的请求。
> 2. **DoH 滥用风险**: 如果您公开 `/dns-query` 端点，它可能会被滥用为开放解析器。如果启用此功能，请务必添加访问控制。

### 3. 使用
访问: `https://你的worker域名.workers.dev/<你的UUID>`

**[👉 完整的新手保姆级教程](docs/WALKTHROUGH_ZH.md)**

---

## 🛠️ 功能与配置

### 支持协议
*   **VLESS** (原生, WebSocket, TLS) - *推荐*
*   **Trojan** (原生, TLS) - *高安全性*
*   **Shadowsocks / VMess** (仅生成链接)
*   **Hysteria 2 / TUIC** (仅生成链接 - 需要外部后端)

### 关键变量

| 变量名 | 描述 |
| :--- | :--- |
| `u` | **UUID**. 你的秘密密码。 |
| `p` | **ProxyIP**. 流量中继后端 IP (例如 `ip.example.com`)。 |
| `d` | **隐藏路径**. 通过 `/secret-path` 而不是 UUID 访问面板。 |
| `s` | **SOCKS5**. 上游代理 (`user:pass@host:port`)。 |

*完整的配置指南可在仪表盘中查看。*

---

## 📚 文档

*   **[新手教程](docs/WALKTHROUGH_ZH.md)**: 从零开始的指南。
*   **[部署指南](docs/DEPLOYMENT_ZH.md)**: 技术部署细节与[故障排除](docs/DEPLOYMENT_ZH.md#故障排除-%EF%B8%8F)。
*   **[深度原理解析](docs/ANALOGY_ZH.md)**: 代理工作原理的概念解释。
*   **[DNS 编码指南](docs/DNS_ENCODING_ZH.md)**: DoH DNS 查询编码的技术指南。

---

## ⚠️ 免责声明
本工具仅供教育和研究目的使用。开发者不对任何滥用行为负责。
