# CFnew - 终端 v2.9.3

**语言:** [中文](README.md) | [فارسی](فارسی.md)

[Telegram 交流群](https://t.me/+ft-zI76oovgwNmRh)

## 主要功能

- **多协议支持**：VLESS、Trojan、xhttp、VMess、Shadowsocks、TUIC、Hysteria 2、VLESS gRPC，支持多协议并发。
- **自定义路径**：支持自定义访问路径 (Path)，代替默认的 UUID 路径，更加隐蔽。
- **延迟测试**：内置网页版延迟测试工具，可测 IP 延迟并自动获取机场代码。
- **订阅转换**：支持自定义订阅转换后端，方便进行格式转换 (Clash, Surge, etc.)。
- **图形化管理**：配置保存于 KV，修改后立即生效，无需重新部署 Worker。
- **API 管理**：提供 RESTful API 接口，用于动态添加/删除优选 IP。
- **多客户端适配**：自动根据 User-Agent 返回 Clash, Surge, Sing-Box, Loon, Quantumult X, V2Ray, Shadowrocket 等配置格式。
- **应用唤醒**：网页端点击按钮可直接唤醒本地客户端导入配置。
- **智能识别**：自动识别客户端类型并返回最佳配置。
- **多语言界面**：支持中文和波斯语，自动根据浏览器语言切换。
- **内置 DoH 代理**：高性能 DNS-over-HTTPS 代理服务，支持去广告 DNS。
- **ECH 支持**：支持 Encrypted Client Hello，增强抗封锁能力。

## v2.9.4 更新 (Latest)

- **协议扩展**：新增 VMess, Shadowsocks, TUIC, Hysteria 2, VLESS gRPC 协议支持 (链接生成与转发)
- **DoH 服务**：内置高性能 DNS-over-HTTPS 代理 (`/dns-query`)
  - 支持 Cloudflare, Google, Quad9 等多个上游
  - 支持负载均衡和自动故障转移
  - 支持 AdGuard 等去广告 DNS

## v2.9.3 更新

- 新增图形化自定义DNS和ECH域名功能
  - 可在界面中自定义DNS服务器地址（DoH格式）
  - 可在界面中自定义ECH域名
  - 支持动态更改，保存后立即生效
  - Clash配置中的ech-opts增加query-server-name参数，与v2ray保持一致

---

### 系统架构

CFnew Worker 充当智能网关，处理客户端请求并转发。

```
客户端 (Clash/V2Ray)
   | (VLESS/Trojan over TLS)
   v
Cloudflare 边缘网络 (Worker)
   |
   +---(直连)----------------> 目标网站 (YouTube, Google...)
   |
   +---(中继)--> ProxyIP ---> 目标网站 (隐藏 Worker IP)
   |
   +---(SOCKS5)--> SOCKS5代理 -> 目标网站 (链式代理)
```

**工作流程**:
1. 用户访问订阅链接 -> Worker 生成配置 (包含优选 IP 或 Worker 域名)。
2. 客户端连接 Worker -> Worker 解析 VLESS/Trojan 协议头。
3. Worker 根据配置 (`p` 或 `s` 变量) 决定是直接请求目标，还是通过中继请求。

---

### 部署与配置详解

#### 1. 基础配置 (Environment Variables)

这些变量在 Worker 的 "Settings" -> "Variables" 中设置。

| 变量名 | 值示例 | 说明 |
| :--- | :--- | :--- |
| `u` | `84439981-04b6-4103-aa4b-864aa9c91469` | **必需**。UUID，用于身份验证和默认访问路径。请务必使用工具生成真实 UUID。 |
| `p` | `1.2.3.4` 或 `ProxyIP.example.com` | **可选 (强烈推荐)**。ProxyIP (反代IP)。<br>1. **隐藏源IP**: 避免 Worker IP 直接暴露给目标网站。<br>2. **解决 CF 限制**: 解决 "Cloudflare Loop" 或某些网站屏蔽 CF IP 的问题。<br>3. **支持格式**: `IP:Port` 或 `Domain:Port`。 |
| `s` | `user:pass@1.2.3.4:1080` | **可选**。SOCKS5 代理。Worker 将作为客户端连接此 SOCKS5，再访问目标。适用于需要特定出口 IP 的场景。 |
| `d` | `/my-secret-path` | **可选**。自定义访问路径。设置后，UUID 路径将失效，仅能通过此路径访问订阅和配置页面。增强隐蔽性，防止被扫描。 |
| `wk` | `SG`, `HK`, `US`, `JP` | **可选**。强制指定 Worker 地区。Worker 会尝试匹配该地区的优选 IP，让您连接到最近的 CF 节点。 |

#### 2. 协议开关配置

| 变量名 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `ev` | `yes` | 启用 VLESS 协议 (WS + TLS)。核心协议，性能最好，建议保持开启。 |
| `et` | `no` | 启用 Trojan 协议。无需 UUID，仅需密码。兼容性好。 |
| `ex` | `no` | 启用 xhttp 协议。基于 HTTP POST 的伪装。**注意**: 需要在 Cloudflare 仪表盘开启 gRPC，并绑定自定义域名。 |
| `evm` | `no` | 启用 VMess 协议 (仅生成链接)。流量通过 WebSocket 中继到 `p` 或 `s` 指定的后端。 |
| `ess` | `no` | 启用 Shadowsocks 协议 (仅生成链接)。同上，需要后端中继。 |
| `etu` | `no` | 启用 TUIC 协议 (仅生成链接)。基于 UDP。Worker 无法处理，链接仅供填入自建服务器 IP。 |
| `ehy` | `no` | 启用 Hysteria 2 协议 (仅生成链接)。同上，需自建服务端。 |
| `eg` | `no` | 启用 VLESS gRPC 协议。流量通过 gRPC 中继。 |
| `tp` | (空) | Trojan 密码。留空则使用 UUID。建议设置简单的密码以便记忆。 |
| `ech` | `no` | 启用 ECH (Encrypted Client Hello)。开启后自动启用 "仅 TLS" 模式，增强抗审查能力。 |

#### 3. 图形化配置 (KV Storage - 推荐)

这是最方便的配置方式。修改后立即生效，无需重新部署。

1.  在 Cloudflare Workers 面板中，创建一个 **KV Namespace** (例如命名为 `CONFIG`)。
2.  在 Worker 的 "Settings" -> "Variables" -> "KV Namespace Bindings" 中，将变量名设为 `C`，并绑定到刚才创建的 KV。
3.  重新部署 Worker。
4.  访问 `https://你的域名/{UUID}` (或自定义路径)，即可看到图形化配置界面。

#### 4. 高级控制与优选

| 变量名 | 值示例 | 说明 |
| :--- | :--- | :--- |
| `yx` | `1.1.1.1:443#HK, 8.8.8.8:443#US` | **自定义优选 IP/域名**。手动指定优选节点。格式：`IP:端口#名称`，多个用逗号分隔。优先级最高。 |
| `yxURL` | `https://example.com/ips.txt` | **优选 IP 来源 URL**。从远程文件获取优选 IP 列表。覆盖默认源。适用于自动更新 IP 库。 |
| `scu` | `https://url.v1.mk/sub` | **订阅转换后端**。用于生成 Clash/Surge 等格式配置。建议搭建自己的后端或使用可信服务以保护隐私。 |
| `homepage` | `https://www.google.com` | **自定义首页 (伪装)**。访问根路径 `/` 时，返回此 URL 的内容，伪装成正常网站，防止主动探测。 |
| `epd` | `yes` | 启用优选域名解析。 |
| `epi` | `yes` | 启用优选 IP 解析。 |
| `egi` | `yes` | 启用 GitHub 默认优选源。 |
| `qj` | `no` | **降级模式**。设为 `no` 启用。逻辑：CF直连失败 -> SOCKS5 -> Fallback (ProxyIP)。增强连通性。 |
| `dkby` | `yes` | **仅 TLS 模式**。设为 `yes` 只生成 443 端口等 TLS 节点，不生成 80 端口节点。更安全。 |
| `customDNS` | `https://dns.google/dns-query` | **自定义 DoH**。用于 ECH 配置查询的 DNS 服务器。 |
| `customECHDomain` | `cloudflare-ech.com` | **自定义 ECH 域名**。用于 ECH 配置。 |

---

### ProxyIP 深度解析

**什么是 ProxyIP?**
ProxyIP (也称为反代 IP 或中转 IP) 是一个位于 Cloudflare Worker 和目标网站之间的中间服务器。

**为什么需要它?**
1.  **解除封锁**: 某些网站 (如 ChatGPT, Netflix) 封锁了 Cloudflare 的数据中心 IP。使用住宅或特定地区的 ProxyIP 可以绕过此限制。
2.  **隐藏特征**: 防止目标网站识别出流量来自 Cloudflare Worker。
3.  **解决循环**: 避免 "Cloudflare Loop" 错误 (即 Worker 尝试请求另一个也是 CF 托管的站点时发生的错误)。

**如何获取?**
-   搜索 "Cloudflare ProxyIP" 或 "反代 IP"。
-   使用特定的 Telegram 频道获取每日更新的 ProxyIP 列表。
-   自建反向代理 (Nginx/Caddy) 并将其 IP 填入 `p` 变量。

---

### 协议说明与 "仅生成链接"

本 Worker 支持多种协议，但处理方式不同：

1.  **原生支持 (Native)**: Worker 直接处理这些协议的流量。
    *   **VLESS (WS)**: 标准协议，兼容性最好。
    *   **Trojan (WS)**: 模仿 HTTPS 流量，抗识别能力强。
    *   **xhttp**: 新型协议，隐蔽性极高，但需要特定客户端支持。

2.  **仅生成链接 (Link Only)**: Worker 仅生成订阅链接，**不处理流量**。
    *   **TUIC / Hysteria 2**: 基于 UDP/QUIC。Cloudflare Workers 暂不支持 UDP 入站，因此无法作为服务端。生成的链接仅供您填入其他支持该协议的服务器 IP。
    *   **VMess / Shadowsocks**: 生成链接，流量通过 WebSocket 中继。**必须配置 `p` (ProxyIP) 或 `s` (SOCKS5)** 才能使用，否则无法连接。

**建议**：如果您只有此 Worker 而没有其他服务器，请仅启用 **VLESS** 和 **Trojan**。

---

### 故障排除 (Troubleshooting)

**常见错误代码:**

-   **1101 (Worker Threw Exception)**: Worker 代码出错。检查 KV 是否正确绑定，UUID 格式是否正确。
-   **502 (Bad Gateway)**:
    -   通常意味着 ProxyIP (`p`) 失效或无法连接。尝试更换 ProxyIP 或留空。
    -   如果是 xhttp 协议，可能是 gRPC 未开启。
-   **1033 (Tunnel Error)**: Cloudflare 隧道错误。通常与 Cloudflare 内部路由有关，稍后重试。

**客户端问题:**

-   **Clash Meta (Mihomo)**: 推荐使用 Clash Meta 内核，它对 VLESS Reality 和 ECH 支持更好。
-   **Shadowrocket**: 确保开启 "Allow Insecure" (如果不使用受信任证书)。
-   **V2RayNG**: 确保 Core 版本是最新的。

---

### API 管理指南

开启 API 管理后，您可以编写脚本自动更新优选 IP。

1.  **开启 API**: 在图形化界面 -> "高级控制" -> "允许 API 管理 (ae)" -> 选择 "开启"。保存。
2.  **API 端点**:
    *   查询: `GET /api/preferred-ips`
    *   添加: `POST /api/preferred-ips`
    *   删除: `DELETE /api/preferred-ips`

**示例 (Bash)**:

```bash
# 添加一个 IP
curl -X POST "https://your-worker.workers.dev/{UUID}/api/preferred-ips" \
  -H "Content-Type: application/json" \
  -d '{"ip": "1.2.3.4", "port": 443, "name": "新节点"}'

# 批量添加
curl -X POST "https://your-worker.workers.dev/{UUID}/api/preferred-ips" \
  -H "Content-Type: application/json" \
  -d '[
    {"ip": "1.2.3.4", "port": 443, "name": "节点A"},
    {"ip": "5.6.7.8", "port": 8443, "name": "节点B"}
  ]'

# 清空所有
curl -X DELETE "https://your-worker.workers.dev/{UUID}/api/preferred-ips" \
  -H "Content-Type: application/json" \
  -d '{"all": true}'
```

---

### ECH (Encrypted Client Hello) 功能

ECH 是一项增强隐私的技术，可加密 TLS 握手时的 SNI (服务器名称指示)，防止中间人窥探您访问的域名。

*   **启用**: 在图形界面勾选 "启用 ECH"。
*   **效果**: 自动开启 "仅 TLS" 模式。订阅链接将包含 ECH 配置。
*   **配置**: 每次刷新订阅，Worker 会通过 DoH (DNS-over-HTTPS) 查询最新的 ECH 配置 (默认查询 `cloudflare-ech.com`)。
*   **调试**: 浏览器开发者工具查看响应头 `X-ECH-Status`。

---

### 常见问题 (FAQ)

**Q: 为什么 VLESS 链接无法连接？**
A: 请检查：
1. UUID 是否正确。
2. 客户端是否支持 VLESS WS TLS。
3. 域名是否被墙 (尝试配置 `p` ProxyIP)。
4. 时间是否同步。

**Q: 如何隐藏 UUID？**
A: 配置变量 `d` (例如 `/secret`)。之后只能通过 `https://domain.com/secret` 访问，原 UUID 路径 `https://domain.com/UUID` 将失效。

**Q: KV 配置和环境变量哪个优先级高？**
A: KV 配置优先级更高。如果在图形界面修改了配置，它会覆盖环境变量的设置。

**Q: 为什么 TUIC/Hysteria 2 连不上？**
A: 这些协议在 Worker 上仅生成链接格式，Worker 本身无法处理 UDP 流量。您需要有实际运行这些协议的服务器 IP 填入优选 IP 列表。

**Q: 什么是 ProxyIP？**
A: ProxyIP 是一个反向代理 IP (通常是 Cloudflare 的 CDN IP 或其他反代)。Worker 将流量转发给它，从而隐藏 Worker 自身的 IP 或绕过网络封锁。

---

### 致谢

- 基于 [zizifn/edgetunnel](https://github.com/zizifn/edgetunnel) 修改
- ProxyIP 列表来自 [cmliu](https://github.com/cmliu)
- 反代 IP 来源 [qwer-search](https://github.com/qwer-search)
- 在线优选接口支持 [白嫖哥](https://t.me/bestcfipas)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=byJoey/cfnew&type=Timeline)](https://www.star-history.com/#byJoey/cfnew&Timeline&LogScale)
