# Deployment Guide 🔧

This guide provides step-by-step instructions for deploying the Cloudflare Worker VLESS Proxy & DoH Ultimate script.

---

## Method 1: Cloudflare Dashboard (Easy) 🖥️

### 1. Create a Worker
1.  Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2.  Navigate to **Workers & Pages** > **Create Application**.
3.  Click **Create Worker**.
4.  Give your worker a name (e.g., `vless-proxy`) and click **Deploy**.

### 2. Install the Code
1.  Click **Edit Code**.
2.  Delete the existing content in `worker.js`.
3.  Copy the entire content of the provided `worker.js` (from this repository) and paste it into the editor.
4.  Click **Save and Deploy**.

### 3. Configure Variables (Important!) 🔑
1.  Go back to your Worker's settings page.
2.  Go to **Settings** > **Variables and Secrets**.
3.  Add the following variables:

| Variable | Type | Description | Example Value |
| :--- | :--- | :--- | :--- |
| `UUID` | **Secret** | **Required.** Your VLESS/Trojan User ID. | `de305d54-75b4-431b-adb2-eb6b9e546014` |
| `PROXYIP` | Text | *(Optional)* Custom Proxy IP/Domain. | `ts.hpc.tw` |
| `SOCKS5` | Secret | *(Optional)* SOCKS5 Proxy for fallback. | `user:pass@1.2.3.4:1080` |

> [!WARNING]
> **Security Risk**: Do NOT use the default UUID. Generate a new one using a tool like `uuidgenerator.net` or run `uuidgen` in your terminal.

### 4. Setup KV Storage (Optional but Recommended) 💾
To use the "Save Config" feature in the UI and Advanced IP Filtering:
1.  Go to **Workers & Pages** > **KV**.
2.  Click **Create a Namespace**.
    -   *Recommendation*: Name it `CONFIG` (or `WORKER_CONFIG`).
    -   Click **Add**.
3.  Go back to your Worker > **Settings** > **Variables and Secrets**.
4.  Scroll to **KV Namespace Bindings**.
5.  Click **Add Binding**.
    -   **Variable name**: `C` (Must be exactly `C`).
    -   **KV Namespace**: Select the namespace you just created (e.g., `CONFIG`).
6.  Click **Save and Deploy**.

### 5. Advanced KV Configuration (IP Filtering) ⚙️
You can fine-tune the built-in IP scanner by adding these keys to your KV Namespace or environment variables (though KV is preferred for dynamic updates via the UI).

| Variable | Description | Default | Values |
| :--- | :--- | :--- | :--- |
| `ipv4` | Enable IPv4 Preferred IPs | `yes` | `yes` / `no` |
| `ipv6` | Enable IPv6 Preferred IPs | `yes` | `yes` / `no` |
| `ispMobile` | Include **China Mobile** IPs | `yes` | `yes` / `no` |
| `ispUnicom` | Include **China Unicom** IPs | `yes` | `yes` / `no` |
| `ispTelecom` | Include **China Telecom** IPs | `yes` | `yes` / `no` |

*These settings control which IPs are selected when generating subscriptions using the built-in preferred IP source.*

### 6. Access the UI 🌐
Visit your worker's URL with your UUID:
`https://<your-worker-name>.<your-subdomain>.workers.dev/<YOUR_UUID>`

---

## Method 2: Wrangler CLI (Advanced) ⌨️

### 1. Install Wrangler
```bash
npm install -g wrangler
```

### 2. Login
```bash
wrangler login
```

### 3. Initialize & Deploy
1.  Clone this repository.
2.  Run the deployment command:
    ```bash
    npm run deploy
    ```
    *Or manually:*
    ```bash
    wrangler deploy
    ```

### 4. Set Secrets
```bash
wrangler secret put UUID
# Enter your UUID when prompted
```

---

## Method 3: Custom Domain (Best Performance) 🚀

1.  Go to your Worker > **Settings** > **Triggers**.
2.  Under **Custom Domains**, click **Add Custom Domain**.
3.  Enter a subdomain you own (e.g., `proxy.yourdomain.com`).
4.  Cloudflare will automatically configure the DNS records.
5.  Access your worker via `https://proxy.yourdomain.com/<YOUR_UUID>`.

---

## Troubleshooting 🛠️

-   **"Error 1101"**: usually means code exception. Check `wrangler tail` logs.
-   **"UUID Invalid"**: Ensure your UUID matches the format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.
-   **"KV not configured"**: You cannot save settings in the UI. Follow "Setup KV Storage" above.
-   **Slow Speed**: Try setting a valid `PROXYIP` (e.g., a Cloudflare CDN IP or a clean IP).

---

**Credits**:
-   Original VLESS script by `3Kmfi6HP`.
-   DoH Proxy logic by `Hossein Pira`.
-   UI & Integrations by `Tehran Network` & Contributors.
