# Ultimate Zero-to-Hero Walkthrough 🚀

This guide takes you from zero to a fully working CFnew deployment, with verification steps at every stage.

---

## Table of Contents

1. Preparation
2. Generate a UUID
3. Deploy the Worker
4. Configure Variables + KV
5. Verify Endpoints
6. Use the Dashboard
7. Connect Clients
8. Advanced Options
9. Security Best Practices
10. Troubleshooting

---

## 1) Preparation

### 1.1 Cloudflare Account
1. Go to https://dash.cloudflare.com/sign-up
2. Create a free account and verify your email.

### 1.2 What You Need
- A modern browser
- A UUID (next step)
- 10–15 minutes of setup time

---

## 2) Generate a UUID (Your Secret Key)

The UUID is your password. Keep it private.

- **Online:** https://www.uuidgenerator.net/ (use Version 4)
- **CLI:** run `uuidgen`

Example (do NOT use this one):
`84852332-6229-4467-935e-6386566d5823`

---

## 3) Deploy the Worker

### 3.1 Create a Worker
1. Cloudflare Dashboard → **Workers & Pages**
2. Click **Create Application** → **Create Worker**
3. Name it something random
4. Click **Deploy**

### 3.2 Paste the Code
1. Click **Edit Code**
2. Delete the default code
3. Paste the contents of `worker.js`
4. **Save and Deploy**

---

## 4) Configure Variables + KV

### 4.1 Add the UUID (required)
1. Worker → **Settings** → **Variables and Secrets**
2. Add **Environment Variable**:
   - Name: `u`
   - Value: your UUID
3. Click **Deploy**

> Important: the variable name is **`u`**, not `uuid`.

### 4.2 Bind KV (required for dashboard config)
1. Sidebar → **Workers & Pages** → **KV**
2. **Create Namespace** (e.g., `CONFIG`)
3. Back to Worker → **Settings** → **Variables and Secrets**
4. **KV Namespace Bindings** → **Add binding**:
   - Variable name: `C`
   - Namespace: `CONFIG`
5. **Save and Deploy**

---

## 5) Verify Endpoints (Important)

Open these URLs in your browser:

1. **Root page**
   - `https://<worker>.workers.dev/`
   - You should see the terminal page

2. **Dashboard**
   - `https://<worker>.workers.dev/<UUID>`
   - You should see the dashboard

3. **Region API**
   - `https://<worker>.workers.dev/<UUID>/region`
   - Should return JSON with region + detection method

4. **Subscription**
   - `https://<worker>.workers.dev/<UUID>/sub`
   - Should return subscription text

If any step fails, see Troubleshooting below.

---

## 6) Use the Dashboard

### 6.1 System Status
- Confirms Worker region and detection method
- Shows ProxyIP status and current IP

### 6.2 Config Management
- Save settings to KV
- Load current config
- Reset to environment variables

### 6.3 Latency Test
- Test multiple IPs and filter by city
- Add fastest nodes to preferred list

### 6.4 Debug Console
- Open the debug console to see JS errors
- Useful when the page is stuck in “Checking...”

### 6.5 Dashboard Field Reference (Granular)
- **Specify Region (wk)**: Forces a Worker region for routing logic.
- **Protocol Selection**: Toggle VLESS/Trojan/xhttp and link-only protocols (VMess/SS/TUIC/Hysteria2/gRPC).
- **ECH Settings**: Enable ECH + set DoH server + ECH domain.
- **Custom Path (d)**: Moves the dashboard off UUID path.
- **ProxyIP (p)**: Hides Worker origin / avoids Cloudflare loop.
- **Preferred IP List (yx/yxURL)**: Manually set or fetch IPs.
- **Latency Test**: Batch test IPs, filter by city, then overwrite/append to `yx`.
- **Advanced Controls**: API management, region matching, downgrade flow, TLS-only, disable preferred.
- **IP/ISP Filters**: Limit preferred IP parsing to IPv4/IPv6 or ISP tags.

---

## 7) Connect Clients

### 7.1 Android (v2rayNG)
1. Install v2rayNG
2. Subscription → Add
3. Paste your `/sub` link
4. Update subscription and connect

### 7.2 iOS (Shadowrocket)
1. Add subscription URL
2. Update and connect

### 7.3 Windows (v2rayN)
1. Add subscription URL
2. Update and set as active

### 7.4 macOS / Linux (Clash / sing-box)
- Use the subscription URL with your client’s subscription feature

---

## 8) Advanced Options

### 8.1 Custom Path (Recommended)
- Set `d=/your-secret-path`
- Dashboard moves to `/<your-secret-path>` and UUID access is disabled

### 8.2 ProxyIP (`p`)
- Use when Cloudflare loop or IP blocking occurs
- Example: `1.2.3.4:443`

### 8.3 Enable ECH
- Turn on ECH in the dashboard
- Updates subscription with ECH config automatically

### 8.4 Custom Homepage (`homepage`)
- Shows a normal website for `/`
- Good for camouflage

### 8.5 SOCKS5 Upstream (`s`)
- Route traffic through SOCKS5 proxy

---

## 9) Security Best Practices

- Never share your UUID path
- Prefer custom path `d`
- Protect the dashboard with Cloudflare Access
- Rotate UUID if compromised

---

## 10) Troubleshooting

**Dashboard stuck on “Checking...”**
- Open debug console
- Check `/region` and `/sub` endpoints

**UUID rejected**
- Make sure the variable name is `u`
- Remove whitespace

**KV not configured**
- Create KV namespace
- Bind it as `C`
- Redeploy

**No subscription output**
- Test `/<UUID>/sub` directly

---

You should now have a fully working deployment with verifiable endpoints.

Full reference (all variables, APIs, and formats): `docs/REFERENCE.md`.
