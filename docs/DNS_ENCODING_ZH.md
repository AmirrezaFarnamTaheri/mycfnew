# DNS 编码与 DoH（ECH）

本文解释 CFnew 如何通过 DNS-over-HTTPS 获取 ECH 配置。

---

## 1) 什么是 DoH？

DoH 使用 HTTPS 发送 DNS 查询，避免传统 UDP 明文。

---

## 2) 什么是 ECH？

ECH 会加密 TLS ClientHello 中的 SNI。
CFnew 通过 DoH 获取 ECH 配置并写入订阅链接。

---

## 3) 使用的记录类型

ECH 使用 **type 65**。
默认查询域名：`cloudflare-ech.com`。

---

## 4) DoH 请求格式

### 4.1 GET 方式
```
https://<doh-host>/dns-query?name=cloudflare-ech.com&type=65
```

### 4.2 POST 方式
- POST 到 `/dns-query`
- Content-Type: `application/dns-message`
- Body 为原始 DNS 报文

CFnew 默认使用 GET。

---

## 5) 编码说明

部分 DoH 需要 **base64url** 编码：
- `+` → `-`
- `/` → `_`
- 去掉 `=`

---

## 6) 自定义 DNS

可以自定义 DoH 服务器：
- Dashboard → **Custom DNS Server**
- 变量：`customDNS`

确保该 DoH 支持 type 65。

---

## 7) 排查问题

- **ECH 被禁用**：DoH 不支持 type 65
- **超时**：更换 DoH
- **域名错误**：检查 `customECHDomain`

---

部署步骤请看 `DEPLOYMENT.md`。
