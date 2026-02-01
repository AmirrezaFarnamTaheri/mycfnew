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
echo -n -e '\x00\x00\x01\x00\x00\x01\x00\x00\x00\x00\x00\x00\x07\x65\x78\x61\x6d\x70\x6c\x65\x03\x63\x6f\x6d\x00\x00\x01\x00\x01' | base64 | tr '+/' '-_' | tr -d '='
```
