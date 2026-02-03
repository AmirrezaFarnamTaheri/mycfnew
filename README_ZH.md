# CFnew - Ultimate Terminal v2.9.3

**语言:** [English](README.md) | [中文](README_ZH.md) | [فارسی](فارسی.md)

[Telegram 群组](https://t.me/+ft-zI76oovgwNmRh)

---

## TL;DR（快速开始）

1. 将 `worker.js`（或 `worker_obfuscated.js`）部署到新的 Cloudflare Worker。
2. 设置环境变量 `u` = 你的 UUID。
3. 绑定 KV 命名空间为变量 `C`。
4. 访问 `https://<你的worker>.workers.dev/<你的UUID>`。
5. 在面板里生成订阅链接。

---

## CFnew 是什么？

**CFnew** 是一个基于 Cloudflare Workers 的代理系统，通过“正常网站伪装”来隐藏真实用途，并提供 Matrix 风格的可视化面板，用于配置、优化与订阅生成。

**为什么它与众不同：**
- **无服务器**：不需要 VPS，直接运行在 Cloudflare 边缘。
- **多态行为**：对陌生请求表现为普通网页，对合法用户则提供代理服务。
- **可视化管理**：所有设置可在面板完成，KV 持久化。
- **更难封锁**：流量看起来像普通 HTTPS 访问 Cloudflare。

---

## 工作原理（简版）

- **`/` 根路径**：显示终端风格页面。
- **`/<UUID>`**：进入管理面板（需要正确 UUID）。
- **`/<UUID>/sub`**：输出订阅链接。
- **`/<自定义路径>`**：设置 `d` 后替代 UUID 访问。

---

## 功能亮点

- 多协议生成：**VLESS**、**Trojan**、**VMess**、**Shadowsocks**、**Hysteria2**、**TUIC**
- 智能区域匹配与故障回退
- 延迟测速与优选 IP（ProxyIP）管理
- ECH 可选支持（通过 DoH）
- 内置订阅转换
- 面板内置调试控制台
- 三语言界面（English / 中文 / فارسی）

---

## 面板结构速览

- **System Status**：Worker 区域、检测方式、当前 IP、区域匹配
- **Config Management**：保存/读取/重置 KV 配置
- **Latency Test**：批量测速、城市筛选、加入优选列表
- **Advanced Control**：协议开关、TLS-only、降级策略、API 控制
- **Links**：一键复制各客户端订阅链接

---

## 核心变量（速查）

| 变量 | 作用 | 示例 |
|---|---|---|
| `u` | UUID（你的密码） | `8485...5823` |
| `d` | 自定义面板路径 | `/secret-panel` |
| `p` | ProxyIP（隐藏真实 Worker IP） | `1.2.3.4:443` |
| `s` | SOCKS5 上游 | `user:pass@host:port` |
| `wk` | 手动指定 Worker 区域 | `US` / `SG` / `JP` |
| `yx` | 优选 IP 列表 | `1.1.1.1:443#HK,...` |
| `yxURL` | 优选 IP 来源 URL | `https://example.com/ips.txt` |
| `rm` | 区域匹配 | `no` 关闭 |
| `qj` | 降级策略 | `no` 启用（直连 → SOCKS5 → 备用） |
| `dkby` | 仅生成 TLS 节点 | `yes` 启用 |
| `yxby` | 禁用优选节点 | `yes` 禁用 |
| `ae` | 允许 API 管理 | `yes` 启用 |
| `ech` | 启用 ECH | `yes` 启用 |
| `customDNS` | ECH 的 DoH DNS | `https://dns.example/dns-query` |
| `customECHDomain` | ECH 域名 | `cloudflare-ech.com` |
| `tp` | Trojan 密码 | `custom-pass` |
| `homepage` | 伪装主页 | `https://example.com` |
| `scu` | 订阅转换服务 | `https://url.v1.mk/sub` |

> 面板还有更多开关：GitHub 默认优选、多端口生成、IPv4/IPv6、运营商过滤等。完整列表见 `docs/REFERENCE_ZH.md`。

---

## 常见使用流程

### 1）默认 UUID 访问
- 保持 `d` 为空。
- 访问 `/<UUID>`。

### 2）自定义路径模式
- 设置 `d=/你的秘密路径`。
- UUID 访问会被禁用，使用 `/<你的路径>`。

### 3）推荐最简配置
- 只配置 `u` + KV 绑定。
- 生成订阅并在客户端导入。

---

## 排查问题（快速）

- **一直停留在“检查中...”**：打开调试控制台，看 `/region` 或 `/sub` 是否报错。
- **UUID 无效**：确认变量名是 `u`，不是 `uuid`；不要有空格。
- **KV 报错**：KV 命名空间绑定为 `C` 后重新部署。
- **无订阅数据**：在浏览器直接访问 `/<UUID>/sub` 检查。

---

## 安全建议

- 不要泄露你的 UUID 路径。
- 建议使用自定义路径 `d`。
- 可用 Cloudflare Access 或 IP 白名单保护面板。
- UUID 泄露后请立刻更换。

---

## 文档

- **Walkthrough**: `docs/WALKTHROUGH_ZH.md`
- **Deployment**: `docs/DEPLOYMENT_ZH.md`
- **Analogy**: `docs/ANALOGY_ZH.md`
- **DNS Encoding**: `docs/DNS_ENCODING_ZH.md`
- **Full Reference**: `docs/REFERENCE_ZH.md`

---

## 免责声明

本项目仅用于学习与研究，作者不对任何滥用行为负责。
