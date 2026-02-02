# Ultimate Zero-to-Hero Walkthrough 🚀

This comprehensive guide will take you from a complete beginner to having a fully functional, censorship-resistant proxy running on Cloudflare Workers.

---

## Phase 1: Preparation 🛠️

Before we write any code, we need to set up the tools.

### 1.1. Cloudflare Account
1.  Go to [dash.cloudflare.com](https://dash.cloudflare.com/sign-up).
2.  Sign up for a free account.
3.  Verify your email address.

### 1.2. Generate a UUID (Your Secret Key)
The UUID acts as your password. You need a unique one.
*   **Option A (Online):** Visit [uuidgenerator.net](https://www.uuidgenerator.net/) and copy a Version 4 UUID.
*   **Option B (Command Line):** Open your terminal and run `uuidgen`.
*   *Example UUID:* `84852332-6229-4467-935e-6386566d5823` (Do **NOT** use this one!)

---

## Phase 2: Deployment ☁️

We will deploy the "Worker" script which acts as the server.

### 2.1. Create the Worker
1.  Log in to the Cloudflare Dashboard.
2.  On the left sidebar, click **Workers & Pages**.
3.  Click the blue **Create Application** button.
4.  Click **Create Worker**.
5.  Name it something random (e.g., `azure-sky-proxy`) to avoid detection.
6.  Click **Deploy**.

### 2.2. Install the Code
1.  Click **Edit Code**.
2.  You will see a file named `worker.js`. **Delete everything inside it.**
3.  Copy the code from the `worker.js` file in this repository.
4.  Paste it into the Cloudflare editor.
5.  Click **Save and Deploy** (top right).

### 2.3. Configure the UUID
1.  Go back to the Worker's overview page (click the back arrow `<` top left).
2.  Go to **Settings** -> **Variables and Secrets**.
3.  Click **Add variable** under "Environment Variables".
    *   **Variable name**: `u`
    *   **Value**: Paste your UUID from Phase 1.2.
4.  Click **Deploy** (bottom/top).

### 2.4. Setup KV Storage (Crucial for Dashboard)
The dashboard needs a place to save your settings.
1.  In the main sidebar, go to **Workers & Pages** -> **KV**.
2.  Click **Create a Namespace**.
    *   Name: `CONFIG`
    *   Click **Add**.
3.  Go back to your Worker -> **Settings** -> **Variables and Secrets**.
4.  Scroll down to **KV Namespace Bindings**.
5.  Click **Add binding**.
    *   **Variable name**: `C` (Must be capital `C`).
    *   **KV Namespace**: Select `CONFIG`.
6.  Click **Save and Deploy**.

---

## Phase 3: Validation & Dashboard 🖥️

1.  Find your Worker's URL (e.g., `https://azure-sky-proxy.username.workers.dev`).
2.  Add your UUID to the end of the URL:
    `https://azure-sky-proxy.username.workers.dev/84852332-6229-4467-935e-6386566d5823`
3.  Visit this link in your browser.
4.  You should see a **Matrix-style Terminal** interface.
5.  It should say "Connection Successful!" and load the dashboard.

**Troubleshooting:**
*   *404 Not Found*: You didn't add the UUID to the URL.
*   *Error 1101*: Code issue. Check logs.
*   *KV Error*: You missed Step 2.4.

---

## Phase 4: Client Configuration 📱

Now we connect your device to the Worker.

### 4.1. Get the Subscription Link
1.  On the Dashboard, find the **[ Quick Subscription ]** or **[ Copy Link ]** button.
2.  If you want to use specific settings (like "Best Latency"), configure them in the dashboard first, then copy the link.

### 4.2. Android (v2rayNG)
1.  Install **v2rayNG** from Play Store or GitHub.
2.  Open the app.
3.  Tap the Hamburger menu (☰) -> **Subscription Group setting**.
4.  Tap `+` (top right).
    *   **Remarks**: `Cloudflare Worker`
    *   **Optional URL**: Paste your link.
5.  Save.
6.  Tap the 3-dot menu (⋮) -> **Update subscription**.
7.  Select a node (e.g., `VLESS-TLS-443`).
8.  Tap the V logo (bottom right) to connect.

### 4.3. iOS (Shadowrocket / Streisand)
1.  Open **Shadowrocket**.
2.  Tap `+` -> Type: **Subscribe**.
3.  **URL**: Paste your link.
4.  Tap **Done**.
5.  Turn on the switch to connect.

### 4.4. Windows (v2rayN)
1.  Download **v2rayN**.
2.  **Subscription Group** -> **Add Subscription**.
3.  Paste the URL.
4.  **Update Subscription**.
5.  Right-click a node -> **Set as active server**.
6.  System Proxy -> **Set System Proxy**.

---

## Phase 5: Advanced Optimization ⚡

### 5.1. Fixing "Cloudflare Loop" (ProxyIP)
If you can't access some sites, you need a ProxyIP.
1.  Go to Dashboard -> **Config Management**.
2.  Find **ProxyIP (p)**.
3.  Enter a clean IP or domain (e.g., `proxyip.example.com`).
    *   *Note*: The script has built-in backups, but a custom one is better.
4.  Click **Save Config**.

### 5.2. Enabling ECH (Anti-Censorship)
1.  In Dashboard -> **Protocols**.
2.  Check **Enable ECH**.
3.  Click **Save**.
4.  Update your subscription in your client.
    *   *Effect*: This encrypts the SNI, making it harder for firewalls to see you are connecting to Cloudflare.

### 5.3. Client-Side Tweaks (v2rayNG / Shadowrocket)
Sometimes the bottleneck is your client settings.
*   **Mux (Multiplexing)**: Enable this in settings to reduce handshake latency.
*   **Fragment**: If your connection is being throttled, enable TLS Fragmentation (often called "Fragment" or "Trick" in clients).
    *   *Packets*: `100-200`
    *   *Length*: `10-20`
    *   *Interval*: `10-20`
*   **Allow Insecure**: **Only** use this for debugging. Never leave it on permanently as it exposes you to Man-in-the-Middle attacks.

---

## Phase 6: Security Best Practices 🛡️

### 6.1. Protect Your Dashboard
Your dashboard URL contains your UUID. Anyone with this link can use your proxy and change your settings.
1.  **Do not share screenshots** of your full URL.
2.  **Use Cloudflare Access**: Set up a Zero Trust policy to require a login (email OTP) before accessing the dashboard path.

### 6.2. Rotating UUIDs
If you suspect your UUID has been leaked:
1.  Generate a new UUID.
2.  Update the `u` variable in Cloudflare.
3.  Update your client subscriptions.
4.  The old UUID will immediately stop working.

---

## Glossary 📖

*   **UUID**: User ID. Acts as a password.
*   **VLESS**: A lightweight protocol for proxying.
*   **KV**: Key-Value storage. Cloudflare's database for saving your settings.
*   **Sub/Subscription**: A link that contains all your server details automatically.
*   **ProxyIP**: An intermediate server to hide your traffic from the destination website.
