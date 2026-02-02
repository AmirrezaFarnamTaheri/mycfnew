# DoH DNS 查询编码指南

本文档解释了使用 `GET` 方法通过此 DoH 代理发送 DNS 查询时的编码方式，符合 [RFC 8484](https://tools.ietf.org/html/rfc8484) 标准。

## 概述

当通过 HTTP `POST` 发送 DNS 查询时，二进制 DNS 消息直接在请求体中发送。然而，对于 `GET` 请求，DNS 消息必须编码到 URL 参数中。

## `dns` 参数

`GET` 请求接受一个名为 `dns` 的查询参数。
该参数的值是 DNS 线格式 (wire-format) 消息的 **base64url** 编码表示。

### Base64url 编码

Base64url 是 [RFC 4648](https://tools.ietf.org/html/rfc4648#section-5) 中定义的 Base64 变体。它被设计为在 URL 和文件名中安全使用。

**与标准 Base64 的区别:**
1.  **字符:**
    -   标准 Base64 使用 `+` 和 `/`。
    -   Base64url 使用 `-` (减号) 代替 `+`，使用 `_` (下划线) 代替 `/`。
2.  **填充:**
    -   标准 Base64 使用 `=` 进行填充。
    -   Base64url **省略** 填充字符 (`=`)。

### 示例

假设我们要查询 `example.com` 的 `A` 记录。

1.  **DNS 线格式 (十六进制):**
    ```hex
    000001000001000000000000076578616d706c6503636f6d0000010001
    ```

2.  **标准 Base64:**
    ```
    AAAAAQABAAAAAAAAA2V4YW1wbGUDY29tAAABAAE=
    ```

3.  **Base64url 编码:**
    -   将 `+` 替换为 `-` (此处无)。
    -   将 `/` 替换为 `_` (此处无)。
    -   移除 `=` 填充。
    ```
    AAAAAQABAAAAAAAAA2V4YW1wbGUDY29tAAABAAE
    ```

4.  **最终 URL:**
    ```
    https://your-worker.workers.dev/dns-query?dns=AAAAAQABAAAAAAAAA2V4YW1wbGUDY29tAAABAAE
    ```

## 为什么要使用 GET?

-   **缓存:** Cloudflare 和浏览器可以缓存 `GET` 响应，显著提高重复查询的性能。
-   **性能:** 避免了小查询的完整请求体开销。

## 工具测试

### `dig`
`dig` 的某些版本并不直接支持 DoH `GET` 请求的 base64url 编码，但你可以使用 `doh-cli` 或类似工具。

### `curl`
你可以手动构造字符串或使用命令行工具进行编码。

```bash
# Shell 编码示例
echo -n -e '\x00\x00\x01\x00\x00\x01\x00\x00\x00\x00\x00\x00\x07\x65\x78\x61\x6d\x70\x6c\x65\x03\x63\x6f\x6d\x00\x00\x01\x00\x01' | base64 | tr '+/' '-_' | tr -d '=\n'
```

### Python 脚本示例
这是一个简单的 Python 脚本，用于生成任何域名的 base64url 编码 DNS 查询。

```python
import base64
import struct

def encode_dns_query(domain, record_type=1): # 1 代表 'A' 记录
    # 事务 ID (随机) + 标志 (标准查询) + 问题数 (1) + 回答 RRs (0) + 权威 RRs (0) + 附加 RRs (0)
    header = b'\x00\x00\x01\x00\x00\x01\x00\x00\x00\x00\x00\x00'

    # 域名编码 (例如 example.com -> \x07example\x03com\x00)
    qname = b''
    for part in domain.split('.'):
        qname += bytes([len(part)]) + part.encode('ascii')
    qname += b'\x00'

    # 类型 (A=1) + 类 (IN=1)
    footer = struct.pack('>HH', record_type, 1)

    dns_msg = header + qname + footer

    # Base64url 编码 (RFC 4648)
    encoded = base64.urlsafe_b64encode(dns_msg).decode('utf-8').rstrip('=')
    return encoded

domain = "example.com"
print(f"域名: {domain}")
print(f"编码结果: {encode_dns_query(domain)}")
```

---

## 为什么使用 DNS Over HTTPS (DoH)? 🛡️

### 1. 隐私与安全
传统的 DNS 查询通过明文发送 (UDP/53)。网络上的任何人（ISP、黑客、政府防火墙）都可以确切地看到你正在访问哪些网站。
*   **DoH** 使用 HTTPS (TLS) 加密这些流量，向窥探者隐藏你的目的地。

### 2. 绕过审查
许多审查系统依赖“DNS 污染”来封锁网站。它们拦截你对 `youtube.com` 的 DNS 请求并返回一个假的 IP 地址。
*   **DoH** 绕过了这一点，因为请求看起来就像是对 Cloudflare 的普通 HTTPS 流量，审查者无法轻易读取或修改。

---

## 浏览器配置 ⚙️

你可以在现代浏览器中将此 Worker 用作你的安全 DNS 提供商。

### Chrome / Edge
1.  进入 **设置** -> **隐私和安全** -> **安全**。
2.  滚动到 **使用安全 DNS**。
3.  选择 **使用: 自定义** (With: Custom)。
4.  输入你的 Worker URL: `https://你的worker域名.workers.dev/dns-query`

### Firefox
1.  进入 **设置** -> **隐私与安全**。
2.  滚动到 **DNS over HTTPS**。
3.  选择 **增强保护** (Increased Protection) 或 **最大保护** (Max Protection)。
4.  选择 **自定义** (Custom) 提供商。
5.  输入: `https://你的worker域名.workers.dev/dns-query`

---

## DNS 泄漏故障排除 💧

如果你正在使用代理，但你的 DNS 仍然泄漏（显示你 ISP 的 DNS 服务器）：

1.  **检查客户端设置**: 确保你的 V2Ray/Clash 客户端已启用 "Sniffing" (流量嗅探)。这允许客户端通过代理远程解析域名，而不是在本地解析。
2.  **使用远程 DNS**: 在你的客户端配置中，确保 "Remote DNS" (远程 DNS) 服务器设置为受信任的 DoH 提供商或你的 Worker 地址。
3.  **测试**: 访问 [dnsleaktest.com](https://www.dnsleaktest.com) 进行验证。你应该看到 Cloudflare 的 IP，而不是你 ISP 的 IP。
