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
| `u` | **Environment Variable** | **Required.** Your VLESS/Trojan User ID (UUID). | `de305d54-75b4-431b-adb2-eb6b9e546014` |
| `p` | Text | *(Optional)* Custom Proxy IP/Domain. | `ts.hpc.tw` |
| `s` | Secret | *(Optional)* SOCKS5 Proxy for fallback. | `user:pass@1.2.3.4:1080` |

> [!WARNING]
> **Security Risk**: Do NOT use the default UUID. Generate a new one using a tool like `uuidgenerator.net` or run `uuidgen` in your terminal.

### 4. Setup KV Storage (Optional but Recommended) 💾
To use the "Save Config" feature in the UI and Advanced IP Filtering:
1.  Go to **Workers & Pages** > **KV**.
2.  Click **Create a Namespace**.
    *   *Recommendation*: Name it `CONFIG` (or `WORKER_CONFIG`).
    *   Click **Add**.
3.  Go back to your Worker > **Settings** > **Variables and Secrets**.
4.  Scroll to **KV Namespace Bindings**.
5.  Click **Add Binding**.
    *   **Variable name**: `C` (Must be exactly `C`).
    *   **KV Namespace**: Select the namespace you just created (e.g., `CONFIG`).
6.  Click **Save and Deploy**.

### 5. Access the UI 🌐
Visit your worker's URL with your UUID:
`https://<your-worker-name>.<your-subdomain>.workers.dev/<YOUR_UUID>`

---

## Troubleshooting 🛠️

-   **"Error 1101"**: usually means code exception. Check `wrangler tail` logs.
-   **"UUID Invalid"**: Ensure your UUID matches the format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.
-   **"KV not configured"**: You cannot save settings in the UI. Follow "Setup KV Storage" above.
-   **Slow Speed**: Try setting a valid `p` (ProxyIP) (e.g., a Cloudflare CDN IP or a clean IP).

---

**Credits**:
-   Original VLESS script by `3Kmfi6HP`.
-   DoH Proxy logic by `Hossein Pira`.
-   UI & Integrations by `Tehran Network` & Contributors.
