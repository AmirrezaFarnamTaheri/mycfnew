# DNS Query Encoding for DoH

This document explains how DNS queries are encoded when using the `GET` method with this DoH proxy, complying with [RFC 8484](https://tools.ietf.org/html/rfc8484).

## Overview

When sending a DNS query via HTTP `POST`, the binary DNS message is sent directly in the request body. However, for `GET` requests, the DNS message must be encoded into the URL parameters.

## The `dns` Parameter

The `GET` request takes a single query parameter named `dns`.
The value of this parameter is the **base64url** encoded representation of the DNS wire-format message.

### Base64url Encoding

Base64url is a variation of Base64 defined in [RFC 4648](https://tools.ietf.org/html/rfc4648#section-5). It is designed to be safe for use in URLs and filenames.

**Differences from standard Base64:**
1.  **Characters:**
    -   Standard Base64 uses `+` and `/`.
    -   Base64url uses `-` (minus) instead of `+` and `_` (underscore) instead of `/`.
2.  **Padding:**
    -   Standard Base64 uses `=` for padding.
    -   Base64url **omits** padding characters (`=`).

### Example

Suppose we want to query `A` records for `example.com`.

1.  **DNS Wire Format (Hex):**
    ```hex
    000001000001000000000000076578616d706c6503636f6d0000010001
    ```

2.  **Standard Base64:**
    ```
    AAAAAQABAAAAAAAAA2V4YW1wbGUDY29tAAABAAE=
    ```

3.  **Base64url Encoded:**
    -   Replace `+` with `-` (none here).
    -   Replace `/` with `_` (none here).
    -   Remove `=` padding.
    ```
    AAAAAQABAAAAAAAAA2V4YW1wbGUDY29tAAABAAE
    ```

4.  **Final URL:**
    ```
    https://your-worker.workers.dev/dns-query?dns=AAAAAQABAAAAAAAAA2V4YW1wbGUDY29tAAABAAE
    ```

## Why use GET?

-   **Caching:** Cloudflare and browsers can cache `GET` responses, significantly improving performance for repeated queries.
-   **Performance:** Avoids the overhead of a full request body for small queries.

## Testing with Tools

### `dig`
`dig` does not natively support base64url encoding for DoH `GET` requests directly in all versions, but you can use `doh-cli` or similar tools.

### `curl`
You can manually construct the string or use command-line tools to encode it.

```bash
# Example encoding in shell
echo -n -e '\x00\x00\x01\x00\x00\x01\x00\x00\x00\x00\x00\x00\x07\x65\x78\x61\x6d\x70\x6c\x65\x03\x63\x6f\x6d\x00\x00\x01\x00\x01' | base64 | tr '+/' '-_' | tr -d '=\n'
```

### Python Script Example
Here is a simple Python script to generate the base64url encoded DNS query for any domain.

```python
import base64
import struct

def encode_dns_query(domain, record_type=1): # 1 is 'A' record
    # Transaction ID (random) + Flags (Standard Query) + Questions (1) + Answer RRs (0) + Authority RRs (0) + Additional RRs (0)
    header = b'\x00\x00\x01\x00\x00\x01\x00\x00\x00\x00\x00\x00'

    # Domain Name Encoding (e.g., example.com -> \x07example\x03com\x00)
    qname = b''
    for part in domain.split('.'):
        qname += bytes([len(part)]) + part.encode('ascii')
    qname += b'\x00'

    # Type (A=1) + Class (IN=1)
    footer = struct.pack('>HH', record_type, 1)

    dns_msg = header + qname + footer

    # Base64url encoding (RFC 4648)
    encoded = base64.urlsafe_b64encode(dns_msg).decode('utf-8').rstrip('=')
    return encoded

domain = "example.com"
print(f"Domain: {domain}")
print(f"Encoded: {encode_dns_query(domain)}")
```

---

## Why DNS Over HTTPS (DoH)? 🛡️

### 1. Privacy & Security
Traditional DNS queries are sent in plain text (UDP/53). Anyone on the network (ISP, hackers, government firewalls) can see exactly which websites you are visiting.
*   **DoH** encrypts this traffic using HTTPS (TLS), hiding your destination from prying eyes.

### 2. Bypassing Censorship
Many censorship systems rely on "DNS Poisoning" to block sites. They intercept your DNS request for `youtube.com` and return a fake IP address.
*   **DoH** bypasses this because the request looks like normal HTTPS traffic to Cloudflare, which the censor cannot easily read or modify.

---

## Browser Configuration ⚙️

You can use this Worker as your secure DNS provider in modern browsers.

### Chrome / Edge
1.  Go to **Settings** -> **Privacy and security** -> **Security**.
2.  Scroll to **Use Secure DNS**.
3.  Select **With: Custom**.
4.  Enter your Worker URL: `https://your-worker.workers.dev/dns-query`

### Firefox
1.  Go to **Settings** -> **Privacy & Security**.
2.  Scroll to **DNS over HTTPS**.
3.  Select **Max Protection** or **Increased Protection**.
4.  Choose **Custom** provider.
5.  Enter: `https://your-worker.workers.dev/dns-query`

---

## Troubleshooting DNS Leaks 💧

If you are using a proxy but your DNS is still leaking (showing your ISP's DNS server):

1.  **Check Client Settings**: Ensure your V2Ray/Clash client has "Sniffing" (Traffic Sniffing) enabled. This allows the client to resolve the domain remotely through the proxy instead of locally.
2.  **Use Remote DNS**: In your client configuration, make sure the "Remote DNS" server is set to a trusted DoH provider or your Worker's address.
3.  **Test**: Visit [dnsleaktest.com](https://www.dnsleaktest.com) to verify. You should see Cloudflare IPs, not your ISP's.
