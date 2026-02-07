# CFnew 完整参考手册

本文档是项目的完整参考：路由、变量、API、UI 选项与数据格式一应俱全。

---

## 1) 应该部署哪个文件？

- `worker.js`（推荐）：主 Worker 代码（可读）


---

## 2) 路由总览（所有路径）

下文的 `<ACCESS>` 表示 **UUID 路径** 或 **自定义路径 `d`**。

| 路径 | 用途 | 说明 |
|---|---|---|
| `/` | 终端首页 | 若设置 `homepage`，则显示该 URL 内容。 |
| `/<UUID>` | 管理面板 | 仅在未设置 `d` 时有效。 |
| `/<CUSTOM_PATH>` | 管理面板 | 设置 `d` 后生效（UUID 路径失效）。 |
| `/<ACCESS>/sub` | 订阅输出 | 可用 `?target=` 切换格式。 |
| `/<ACCESS>/region` | 区域 JSON | 面板 System Status 使用。 |
| `/<ACCESS>/api/config` | 配置 API | GET/POST；需要 KV `C`。 |
| `/<ACCESS>/api/preferred-ips` | 优选 IP API | GET/POST/DELETE；需要 `ae=yes`。 |
| `/dns-query` | DoH 代理 | GET `?dns=` 或 POST 原始 DNS。 |
| `/dns-encoding` | DoH 说明 | 简短编码说明。 |

---

## 3) 访问规则

- `u`（UUID）必填。
- 只要设置 `d`，**UUID 路径会被禁用**，只能用 `/<CUSTOM_PATH>`。
- 所有 API 必须通过正确的 `<ACCESS>` 路径访问。

---

## 4) 配置优先级（重要）

- KV 绑定 `C`，配置存储在键 `c`。
- 读取顺序：**KV 优先**，否则回退环境变量。
- 面板保存会写入 KV。
- “重置”会清空 KV 并回退到环境变量。

### 4.1 环境变量大小写

多数键也支持 **大写** 环境变量名（如 `U`, `D`, `P`, `S`, `WK`, `YX`, `YXURL`, `RM`, `QJ`, `DKBY`, `YXBY`, `HOMEPAGE`）。
建议在面板/API 中使用小写键名。

---

## 5) 变量完整参考

### 5.1 核心访问与路由

| 变量 | 取值 | 默认 | 说明 |
|---|---|---|---|
| `u` | UUID | 必填 | 你的访问密钥。 |
| `d` | `/path` | 空 | 自定义面板路径（禁用 UUID 路径）。 |
| `wk` | 区域码 | 空 | 手动指定 Worker 区域（如 `US`, `SG`）。 |
| `p` | `host:port` | 空 | 自定义 ProxyIP；会关闭区域选择。 |
| `s` | `user:pass@host:port` | 空 | SOCKS5 上游。 |
| `homepage` | URL | 空 | 替换 `/` 为伪装主页。 |

### 5.2 协议开关

| 变量 | 取值 | 默认 | 说明 |
|---|---|---|---|
| `ev` | `yes/no` | `yes` | VLESS WS 节点。 |
| `et` | `yes/no` | `no` | Trojan WS 节点。 |
| `ex` | `yes/no` | `no` | xhttp 节点（HTTP POST 伪装）。 |
| `evm` | `yes/no` | `no` | VMess 链接（仅生成链接）。 |
| `ess` | `yes/no` | `no` | Shadowsocks 链接（仅生成链接）。 |
| `etu` | `yes/no` | `no` | TUIC 链接（仅生成链接）。 |
| `ehy` | `yes/no` | `no` | Hysteria2 链接（仅生成链接）。 |
| `eg` | `yes/no` | `no` | VLESS gRPC 链接（仅生成链接）。 |
| `tp` | 字符串 | 空 | Trojan 密码（空=UUID）。 |

说明：
- “仅生成链接”协议需要外部后端才能真正使用。
- xhttp 的路径为 `/<UUID 前 8 位>`。
- gRPC 通常需要自定义域名。

### 5.3 优选列表与来源

| 变量 | 取值 | 默认 | 说明 |
|---|---|---|---|
| `yx` | 列表 | 空 | 手动优选 IP 列表（最高优先级）。 |
| `yxURL` | URL | GitHub 默认 | 从 URL 拉取优选列表。 |
| `epd` | `yes/no` | `no` | 启用优选**域名**列表。 |
| `epi` | `yes/no` | `yes` | 启用优选**IP**列表。 |
| `egi` | `yes/no` | `yes` | 启用 GitHub 默认优选。 |
| `yxby` | `yes` | 关闭 | 禁用所有优选节点。 |

### 5.4 性能与过滤

| 变量 | 取值 | 默认 | 说明 |
|---|---|---|---|
| `rm` | `no` | 开启 | `no` 关闭区域匹配。 |
| `qj` | `no` | 关闭 | `no` 开启降级（直连 → SOCKS5 → 备用）。 |
| `dkby` | `yes` | 关闭 | `yes` 禁用非 TLS 端口。 |
| `edp` | `yes` | 关闭 | 为每个 IP 生成全部 CF 端口。 |
| `ipv4` | `yes/no` | 开启 | 优选列表仅保留 IPv4。 |
| `ipv6` | `yes/no` | 开启 | 优选列表仅保留 IPv6。 |
| `ispMobile` | `yes/no` | 开启 | 仅保留“移动”标签。 |
| `ispUnicom` | `yes/no` | 开启 | 仅保留“联通”标签。 |
| `ispTelecom` | `yes/no` | 开启 | 仅保留“电信”标签。 |

说明：
- `ipv4/ipv6/isp*` 仅影响 **URL 拉取的列表**，不影响手动输入。
- 启用 ECH 时，系统会自动写入 `dkby=yes`。

### 5.5 ECH（加密 Client Hello）

| 变量 | 取值 | 默认 | 说明 |
|---|---|---|---|
| `ech` | `yes/no` | 关闭 | 在订阅中加入 ECH。 |
| `customDNS` | DoH URL | 默认 DoH | ECH 查询用的 DoH 服务。 |
| `customECHDomain` | 域名 | `cloudflare-ech.com` | ECH 域名。 |

### 5.6 API 与订阅转换

| 变量 | 取值 | 默认 | 说明 |
|---|---|---|---|
| `ae` | `yes/no` | 关闭 | 启用 `/api/preferred-ips`。 |
| `scu` | URL | `https://url.v1.mk/sub` | 订阅转换服务地址。 |

---

## 6) 订阅输出格式

`/<ACCESS>/sub` 支持 `?target=`（不区分大小写）：

- `base64`（默认）
- `clash`, `clashr`
- `surge`, `surge2`, `surge3`, `surge4`
- `quantumult`, `quanx`
- `ss`, `ssr`
- `v2ray`
- `loon`

说明：面板里的转换流程会使用内置的 `REMOTE_CONFIG_URL`（写死在 `worker.js` 中）。如需自定义转换配置，请修改该常量。

ECH 响应头：
- `X-ECH-Status: ENABLED`
- `X-ECH-Config-Length: <length>`（如果有 ECH 配置）

---

## 7) 配置 API

所有 API 访问必须包含正确 `<ACCESS>` 路径，并绑定 KV `C`。

### 7.1 GET `/<ACCESS>/api/config`

返回 KV 配置，并包含 `kvEnabled: true`。

### 7.2 POST `/<ACCESS>/api/config`

- 请求体：JSON（任意配置键）。
- 空字符串 / null 表示删除该键。
- 返回 `{ success, message, config }`。

### 7.3 GET `/<ACCESS>/api/preferred-ips`

需要 `ae=yes`。

### 7.4 POST `/<ACCESS>/api/preferred-ips`

需要 `ae=yes`。

单条示例：
```json
{ "ip": "1.1.1.1", "port": 443, "name": "MyNode" }
```

### 7.5 DELETE `/<ACCESS>/api/preferred-ips`

需要 `ae=yes`。

- 清空所有：
```json
{ "all": true }
```

- 删除单条：
```json
{ "ip": "1.1.1.1", "port": 443 }
```

---

## 8) 优选列表格式

### 8.1 `yx`（手动）

- 逗号或换行分隔。
- 格式：`IP:PORT#备注`
- IPv6 必须用 `[ ]` 包裹。

示例：
```
1.1.1.1:443#HK
[2606:4700:4700::1111]:443#IPv6
```

### 8.2 `yxURL`（远程列表）

支持格式：

1) 纯文本
```
1.1.1.1
1.1.1.2:443#HK
```
- 无端口时会使用 URL 的 `?port=`（或默认 443）。

2) CSV（中文表头）
- `IP地址,端口,数据中心`（或 `国家` / `城市`）
- 存在 `TLS` 列时只接受 `true`

3) CSV（含速度/延迟）
- 表头包含 `IP` + `延迟` + `下载速度`

当 `yxURL` 不是默认 GitHub 地址时，内置列表会被清空，确保你的列表为唯一来源。

---

## 9) DoH 代理

`/dns-query` 是 DoH 代理（带权重上游）。

- GET：`?dns=<base64url>`
- POST：原始 DNS 二进制

`/dns-encoding` 返回编码说明。

---

## 10) UI 选项（完整）

面板涵盖所有核心配置：

- 协议开关（`ev`, `et`, `ex`, `evm`, `ess`, `etu`, `ehy`, `eg`）
- ECH + DoH + ECH 域名
- 自定义路径、ProxyIP、SOCKS5、伪装主页
- 优选 IP 列表（`yx`）与 URL 来源（`yxURL`）
- 优选过滤（IPv4/IPv6、运营商）
- 多端口生成（`edp`）
- 区域匹配（`rm`）、降级（`qj`）、仅 TLS（`dkby`）、禁用优选（`yxby`）
- API 管理（`ae`）

---

## 11) 调试控制台

UI 内置调试控制台可捕获：
- JS 错误
- 未处理的 Promise
- `console.log/info/debug/warn/error`

发生错误/警告时会自动展开。

---

## 12) 安全要点（简版）

- 保密 UUID。
- 推荐使用自定义路径 `d`。
- 用 Cloudflare Access 或 IP 白名单保护面板。
- UUID 泄露后及时更换。

---

如需概念与流程解释，请查看 `docs/WALKTHROUGH_ZH.md` 与 `docs/DEPLOYMENT_ZH.md`。
