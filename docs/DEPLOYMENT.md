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

## Method 2: Wrangler CLI (Advanced) 💻

For developers who prefer the command line.

1.  **Install Wrangler**:
    ```bash
    npm install -g wrangler
    ```

2.  **Login**:
    ```bash
    wrangler login
    ```

3.  **Deploy**:
    Run this command in the project directory:
    ```bash
    wrangler deploy worker.js --name my-proxy-worker
    ```

4.  **Set Secrets**:
    ```bash
    wrangler secret put u
    # Enter your UUID when prompted
    ```

---

## Custom Domain Setup 🔗

To use a custom domain (e.g., `proxy.yourdomain.com`) instead of `workers.dev`:

1.  Add your domain to Cloudflare.
2.  Go to your Worker > **Settings** > **Triggers**.
3.  Click **Add Custom Domain**.
4.  Enter the subdomain you want (e.g., `vpn.example.com`).
5.  Cloudflare will automatically handle the DNS records and SSL certificates.

---

## Optimization: Finding ProxyIPs ⚡

If the default connection is slow or blocked, you need a "Clean IP" (ProxyIP).
This is an IP address that Cloudflare trusts but is not blocked by your ISP.

1.  **What is it?**: A backend IP address that your Worker routes traffic through.
2.  **How to find one?**:
    *   Search for "Cloudflare clean IP" or "优选IP" on GitHub or Telegram.
    *   Use tools like `CloudflareSpeedTest`.
3.  **How to use?**:
    *   Set the `p` variable in your Worker settings to the IP address (e.g., `104.16.x.x` or `domain.com`).

---

## Troubleshooting 🛠️

| Error Code | Meaning | Solution |
| :--- | :--- | :--- |
| **1101** | Worker Exception | The code crashed. Check if you modified `worker.js` incorrectly. Check logs. |
| **1033** | Tunnel Error | Cloudflare Tunnel failed. Usually a network issue or bad ProxyIP (`p`). Try removing `p`. |
| **522** | Connection Timed Out | The Worker cannot reach the destination. The destination might be blocking Cloudflare. |
| **UUID Invalid** | Authentication Failed | Ensure your UUID in the URL matches the `u` variable exactly. |
| **KV Error** | Storage Missing | You didn't bind the KV namespace `C`. See Step 4 in Method 1. |

**Common Fixes:**
*   **"I can't open Google":** Your ProxyIP might be bad. Clear the `p` variable to test.
*   **"Speed is slow":** Your ISP is throttling Cloudflare. Find a better ProxyIP or use a custom domain.

---

**Credits**:
-   Original VLESS script by `3Kmfi6HP`.
-   DoH Proxy logic by `Hossein Pira`.
-   UI & Integrations by `Tehran Network` & Contributors.
