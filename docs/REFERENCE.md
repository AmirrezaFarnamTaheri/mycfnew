# CFnew Reference (Complete)

This document is the full, end‑to‑end reference for everything in this repo: routes, variables, APIs, UI options, and formats.

---

## 1) Which file should I deploy?

- `worker.js` (recommended): main Worker code (readable)
- `worker_source.js`: source version (same behavior as `worker.js`)
- `worker_obfuscated.js`: obfuscated build (harder to read, same behavior)
- `worker_source.broken.js`: **do not use** (intentionally broken/old)

---

## 2) Route map (all paths)

`<ACCESS>` below means **either** your UUID path **or** your custom path (`d`).

| Path | Purpose | Notes |
|---|---|---|
| `/` | Terminal landing page | If `homepage` is set, shows that URL instead. |
| `/<UUID>` | Dashboard | Only works when `d` is empty. |
| `/<CUSTOM_PATH>` | Dashboard | Works when `d` is set (UUID path is disabled). |
| `/<ACCESS>/sub` | Subscription output | Use `?target=` to change format. |
| `/<ACCESS>/region` | Region JSON | Used by dashboard “System Status”. |
| `/<ACCESS>/api/config` | Config API | GET/POST; requires KV binding `C`. |
| `/<ACCESS>/api/preferred-ips` | Preferred IP API | GET/POST/DELETE; requires `ae=yes`. |
| `/dns-query` | DoH proxy | GET `?dns=` or POST raw DNS. |
| `/dns-encoding` | DoH help | Short text about DNS encoding. |

---

## 3) Access rules

- `u` (UUID) is required.
- If `d` is **set**, the UUID path is **disabled**. Only `/<CUSTOM_PATH>` works.
- All API routes must be accessed through the correct `<ACCESS>` path.

---

## 4) Config precedence (important)

- KV config (binding `C`) is stored under key `c`.
- `getConfigValue()` uses **KV first**, then falls back to env values.
- Dashboard saves changes to KV.
- “Reset” clears KV and falls back to environment variables.

### 4.1 Environment variable casing

Most keys accept **upper‑case** env names too (e.g., `U`, `D`, `P`, `S`, `WK`, `YX`, `YXURL`, `RM`, `QJ`, `DKBY`, `YXBY`, `HOMEPAGE`).
Use the lower‑case names in the dashboard/API.

---

## 5) Variables reference (complete)

### 5.1 Core access & routing

| Key | Values | Default | Effect |
|---|---|---|---|
| `u` | UUID | required | Your secret access key. |
| `d` | `/path` | empty | Custom dashboard path (disables UUID path). |
| `wk` | region code | empty | Manual Worker region (e.g., `US`, `SG`). |
| `p` | `host:port` | empty | Custom ProxyIP; disables region selection. |
| `s` | `user:pass@host:port` | empty | SOCKS5 upstream. |
| `homepage` | URL | empty | Replaces `/` with a fake homepage. |

### 5.2 Protocol toggles

| Key | Values | Default | Effect |
|---|---|---|---|
| `ev` | `yes/no` | `yes` | VLESS WS nodes. |
| `et` | `yes/no` | `no` | Trojan WS nodes. |
| `ex` | `yes/no` | `no` | xhttp nodes (HTTP POST camouflage). |
| `evm` | `yes/no` | `no` | VMess links (link‑only). |
| `ess` | `yes/no` | `no` | Shadowsocks links (link‑only). |
| `etu` | `yes/no` | `no` | TUIC links (link‑only). |
| `ehy` | `yes/no` | `no` | Hysteria2 links (link‑only). |
| `eg` | `yes/no` | `no` | VLESS gRPC links (link‑only). |
| `tp` | string | empty | Trojan password (empty = UUID). |

Notes:
- Link‑only protocols need an external backend to actually work.
- xhttp nodes use path `/<first 8 chars of UUID>`.
- gRPC requires a custom domain in most clients.

### 5.3 Preferred lists & sources

| Key | Values | Default | Effect |
|---|---|---|---|
| `yx` | list | empty | Manual preferred IP list (highest priority). |
| `yxURL` | URL | GitHub default | Fetch preferred IP list from URL. |
| `epd` | `yes/no` | `no` | Include preferred **domains** list. |
| `epi` | `yes/no` | `yes` | Include preferred **IP** list. |
| `egi` | `yes/no` | `yes` | Include GitHub default preferred list. |
| `yxby` | `yes` | off | Disable all preferred nodes. |

### 5.4 Performance & filtering

| Key | Values | Default | Effect |
|---|---|---|---|
| `rm` | `no` | enabled | `no` disables region matching. |
| `qj` | `no` | disabled | `no` enables downgrade mode (Direct → SOCKS5 → Fallback). |
| `dkby` | `yes` | off | `yes` disables non‑TLS ports. |
| `edp` | `yes` | off | Generate all supported CF ports for each IP. |
| `ipv4` | `yes/no` | enabled | Filter preferred list to IPv4 only. |
| `ipv6` | `yes/no` | enabled | Filter preferred list to IPv6 only. |
| `ispMobile` | `yes/no` | enabled | Filter preferred list by ISP tag (Mobile). |
| `ispUnicom` | `yes/no` | enabled | Filter preferred list by ISP tag (Unicom). |
| `ispTelecom` | `yes/no` | enabled | Filter preferred list by ISP tag (Telecom). |

Notes:
- `ipv4/ipv6/isp*` filters only affect **fetched lists** (yxURL), not manual input.
- When ECH is enabled, `dkby` is automatically forced to `yes` in KV.

### 5.5 ECH (Encrypted Client Hello)

| Key | Values | Default | Effect |
|---|---|---|---|
| `ech` | `yes/no` | off | Adds ECH to subscription links. |
| `customDNS` | DoH URL | default DoH | DoH server for ECH queries. |
| `customECHDomain` | domain | `cloudflare-ech.com` | ECH domain used in links. |

### 5.6 API & converter

| Key | Values | Default | Effect |
|---|---|---|---|
| `ae` | `yes/no` | off | Enables `/api/preferred-ips`. |
| `scu` | URL | `https://url.v1.mk/sub` | Subscription converter endpoint. |

---

## 6) Subscription output formats

`/<ACCESS>/sub` supports `?target=` (case‑insensitive):

- `base64` (default)
- `clash`, `clashr`
- `surge`, `surge2`, `surge3`, `surge4`
- `quantumult`, `quanx`
- `ss`, `ssr`
- `v2ray`
- `loon`

Note: The dashboard’s converter flow uses a built‑in `REMOTE_CONFIG_URL` (hardcoded in `worker_source.js`). If you want a different converter config, update that constant in the source.

ECH response headers:
- `X-ECH-Status: ENABLED`
- `X-ECH-Config-Length: <length>` (if ECH config present)

---

## 7) Config API

All API calls must include the correct `<ACCESS>` path and KV binding `C`.

### 7.1 GET `/<ACCESS>/api/config`

Returns the KV config plus `kvEnabled: true`.

### 7.2 POST `/<ACCESS>/api/config`

- Body: JSON with any config keys.
- Empty string / null removes that key from KV.
- Returns `{ success, message, config }`.

### 7.3 GET `/<ACCESS>/api/preferred-ips`

Requires `ae=yes`.

Returns:
```json
{ "success": true, "count": 3, "data": [ {"ip":"1.1.1.1","port":443,"name":"..."} ] }
```

### 7.4 POST `/<ACCESS>/api/preferred-ips`

Requires `ae=yes`.

Accepts a single object or array:
```json
{ "ip": "1.1.1.1", "port": 443, "name": "MyNode" }
```

Returns counts of added/skipped/errors.

### 7.5 DELETE `/<ACCESS>/api/preferred-ips`

Requires `ae=yes`.

- Clear all:
```json
{ "all": true }
```

- Remove one:
```json
{ "ip": "1.1.1.1", "port": 443 }
```

---

## 8) Preferred IP list formats

### 8.1 `yx` (manual list)

- Comma‑separated or newline‑separated.
- Format: `IP:PORT#Remark`
- IPv6 must be wrapped in `[ ]`.

Example:
```
1.1.1.1:443#HK
[2606:4700:4700::1111]:443#IPv6
```

### 8.2 `yxURL` (remote list)

Supported formats:

1) Plain text list
```
1.1.1.1
1.1.1.2:443#HK
```
- If a line has no port, the code uses `?port=` from the URL (or 443).

2) CSV with headers (Chinese)
- `IP地址,端口,数据中心` (or `国家` / `城市`)
- If `TLS` column exists, only `true` is accepted.

3) CSV with speed/latency
- Columns containing `IP` + `延迟` + `下载速度`

When `yxURL` is not the default GitHub URL, built‑in lists are cleared so your list is authoritative.

---

## 9) DoH proxy

`/dns-query` is a DoH proxy with weighted upstreams.

- GET: `?dns=<base64url>`
- POST: raw binary DNS message

`/dns-encoding` returns a short explanation of the encoding.

---

## 10) UI options (complete)

The dashboard exposes every major config key:

- Protocol toggles (`ev`, `et`, `ex`, `evm`, `ess`, `etu`, `ehy`, `eg`)
- ECH + DoH server + ECH domain
- Custom path, ProxyIP, SOCKS5, custom homepage
- Preferred IP list (`yx`) + URL source (`yxURL`)
- Preferred filters (IPv4/IPv6, ISP tags)
- Diverse port generation (`edp`)
- Region matching (`rm`), downgrade (`qj`), TLS‑only (`dkby`), disable preferred (`yxby`)
- API management (`ae`)

---

## 11) Debug console

The UI includes a debug console that captures:
- JavaScript errors
- Unhandled promise rejections
- `console.log/info/debug/warn/error`

It auto‑opens when an error or warning is logged.

---

## 12) Security checklist (short)

- Keep your UUID private.
- Prefer custom path (`d`).
- Protect the dashboard with Cloudflare Access or IP allowlists.
- Rotate UUID if compromised.

---

If you want a deeper explanation of concepts or flows, see `docs/WALKTHROUGH.md` and `docs/DEPLOYMENT.md`.
