# 部署指南

本文说明部署方式、环境变量、KV 绑定、更新与回滚等内容。

---

## 1) 控制台部署（推荐）

### 1.1 创建 Worker
1. Dashboard → **Workers & Pages** → **Create Application** → **Create Worker**
2. 随机命名
3. 点击 **Deploy**

### 1.2 粘贴代码
1. 点击 **Edit Code**
2. 用 `worker.js`（或 `worker_obfuscated.js`）替换默认内容
3. **Save and Deploy**

---

## 2) 配置环境变量

Settings → Variables and Secrets：

- `u`：**必需**（UUID）
- `d`：可选，自定义路径
- `p`：可选，ProxyIP
- `s`：可选，SOCKS5

修改后点击 **Deploy**。

### 2.1 完整变量参考

| 变量 | 作用 | 示例 |
|---|---|---|
| `u` | UUID（密钥） | `8485...5823` |
| `d` | 自定义面板路径 | `/secret-panel` |
| `p` | ProxyIP | `1.2.3.4:443` |
| `s` | SOCKS5 上游 | `user:pass@host:port` |
| `wk` | 手动区域 | `US` / `SG` / `JP` |
| `yx` | 优选 IP 列表 | `1.1.1.1:443#HK,...` |
| `yxURL` | 优选 IP 来源 | `https://example.com/ips.txt` |
| `rm` | 区域匹配 | `no` 关闭 |
| `qj` | 降级策略 | `no` 开启（直连 → SOCKS5 → 备用） |
| `dkby` | 仅 TLS 节点 | `yes` 开启 |
| `yxby` | 禁用优选 | `yes` 开启 |
| `ae` | 允许 API | `yes` 开启 |
| `ech` | 启用 ECH | `yes` 开启 |
| `customDNS` | ECH 的 DoH | `https://dns.example/dns-query` |
| `customECHDomain` | ECH 域名 | `cloudflare-ech.com` |
| `tp` | Trojan 密码 | `custom-pass` |
| `homepage` | 伪装主页 | `https://example.com` |
| `scu` | 订阅转换 | `https://url.v1.mk/sub` |
| `ev` | 启用 VLESS | `yes` / `no` |
| `et` | 启用 Trojan | `yes` / `no` |
| `ex` | 启用 xhttp | `yes` / `no` |
| `evm` | VMess（仅链接） | `yes` / `no` |
| `ess` | Shadowsocks（仅链接） | `yes` / `no` |
| `etu` | TUIC（仅链接） | `yes` / `no` |
| `ehy` | Hysteria2（仅链接） | `yes` / `no` |
| `eg` | VLESS gRPC（仅链接） | `yes` / `no` |
| `epd` | 优选域名 | `yes` / `no` |
| `epi` | 优选 IP | `yes` / `no` |
| `egi` | GitHub 默认优选 | `yes` / `no` |
| `edp` | 多端口生成 | `yes` / `no` |
| `ipv4` | IPv4 过滤 | `yes` / `no` |
| `ipv6` | IPv6 过滤 | `yes` / `no` |
| `ispMobile` | 运营商过滤：移动 | `yes` / `no` |
| `ispUnicom` | 运营商过滤：联通 | `yes` / `no` |
| `ispTelecom` | 运营商过滤：电信 | `yes` / `no` |

### 2.2 Dashboard 与环境变量优先级

- 环境变量为默认值。
- Dashboard 保存到 **KV** 并覆盖默认值。
- Dashboard 的 **Reset** 会清空 KV，回退到环境变量。

---

## 3) KV 绑定（面板必须）

1. **Workers & Pages** → **KV** → **Create Namespace**
2. 在 Worker 中绑定：
   - 变量名：`C`
   - 选择 KV 命名空间
3. **Save and Deploy**

> 不绑定 KV，面板无法保存配置。

---

## 4) Wrangler CLI（可选）

1. 安装：`npm i -g wrangler`
2. 登录：`wrangler login`
3. 发布：`wrangler publish`
4. 设置变量：`wrangler secret put u`

KV 绑定请在 `wrangler.toml` 中配置。

---

## 5) 自定义域名（可选）

1. 给 Worker 添加自定义域名
2. 完成 DNS 验证
3. 用新域名更新客户端链接

---

## 6) 更新与回滚

- 替换 `worker.js` 后重新部署
- KV 会保留

**回滚**：保留旧版本文件，必要时重新部署即可。

---

## 7) 日志与调试

- Worker 日志查看服务端错误
- 面板内调试控制台查看 JS 错误

---

## 8) 常见问题

**Error 1101**：通常是代码错误或绑定缺失

**KV 未配置**：绑定名必须是 `C`

**UUID 无效**：变量名是 `u`

---

更多细节请查看 Walkthrough。

完整变量与 API 参考：`docs/REFERENCE_ZH.md`。
