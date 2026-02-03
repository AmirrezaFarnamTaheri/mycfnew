# DNS Encoding & DoH (ECH)

This document explains how CFnew queries ECH using DNS-over-HTTPS (DoH).

---

## 1) What is DoH?

DNS-over-HTTPS sends DNS queries over HTTPS instead of UDP.
This helps hide DNS traffic and allows retrieving ECH records securely.

---

## 2) What is ECH?

ECH (Encrypted Client Hello) encrypts the SNI in TLS.
CFnew fetches ECH configs and injects them into generated links.

---

## 3) Record Type Used

ECH uses DNS record **type 65**.
CFnew queries the domain (default `cloudflare-ech.com`) for type 65.

---

## 4) DoH Query Formats

### 4.1 GET format
```
https://<doh-host>/dns-query?name=cloudflare-ech.com&type=65
```

### 4.2 POST format
- POST to `/dns-query`
- Content-Type: `application/dns-message`
- Body: raw DNS message bytes

CFnew primarily uses GET for simplicity.

---

## 5) Encoding Notes

Some DoH endpoints expect **base64url** encoded DNS messages.
Base64url:
- `+` → `-`
- `/` → `_`
- remove `=` padding

If you manually craft queries, ensure the encoding matches the provider’s requirements.

---

## 6) Custom DNS Endpoint

You can override the DoH server:
- Dashboard → **Custom DNS Server**
- Variable: `customDNS`

Make sure your DoH server supports type 65.

---

## 7) Troubleshooting

- **ECH status disabled**: DoH server may not support type 65
- **Timeouts**: try a different DoH provider
- **Wrong domain**: verify `customECHDomain`

---

This is a technical reference; for deployment steps see `DEPLOYMENT.md`.
