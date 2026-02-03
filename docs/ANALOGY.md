# Analogy & Deep Dive

This document explains CFnew using a simple analogy and then maps that analogy to real components.

---

## The Secure Mailroom Analogy

Imagine you are sending letters in a country where mail is heavily inspected.

### 1) The Disguise (Cloudflare as a Safe Address)
- You want to send a letter to a blocked site.
- Instead of writing the blocked address, you write **Cloudflare** on the envelope.
- Inspectors see “Cloudflare” and let it pass.

### 2) The Invisible Stamp (UUID)
- On the back of the envelope, you add a special invisible stamp (your UUID).
- When the letter reaches the Cloudflare mailroom (Worker), it checks the stamp:
  - **No stamp** → it looks like normal web traffic, so it gets a normal website.
  - **Valid stamp** → it is treated as proxy traffic.

### 3) The Trusted Courier (ProxyIP)
- Sometimes inspectors target the real return address.
- You can route through a trusted courier (ProxyIP) so the true origin is hidden.

### 4) The Sealed Inner Envelope (ECH)
- ECH encrypts the “inner label” (SNI).
- This makes it harder for inspectors to see which service you really want.

---

## Mapping the Analogy to CFnew

| Analogy | CFnew Component |
|---|---|
| Letter | Client traffic |
| Cloudflare address | Worker domain |
| Invisible stamp | UUID (`u`) |
| Mailroom clerk | Worker script |
| Trusted courier | ProxyIP (`p`) |
| Sealed inner envelope | ECH (DoH + `ech`) |

---

## Why It Works Against Censorship

- The network only sees standard HTTPS to Cloudflare.
- UUID is checked inside the Worker and never exposed to the censor.
- ProxyIP masks the Worker’s real outbound IP.
- ECH makes SNI-based filtering harder.

---

## Practical Notes

- UUID is your master key. If leaked, rotate it immediately.
- Custom path (`d`) is like using a secret mailbox instead of a public one.
- KV storage is the worker’s “filing cabinet” for your dashboard settings.

---

If you want the technical layer, see `DNS_ENCODING.md` for DoH/ECH details.
