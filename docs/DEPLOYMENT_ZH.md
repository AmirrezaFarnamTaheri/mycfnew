# 配置指南 (Deployment Guide) 🔧

本指南提供部署 Cloudflare Worker VLESS Proxy & DoH Ultimate 脚本的分步说明。

---

## 方法 1: Cloudflare 仪表盘 (简单) 🖥️

### 1. 创建 Worker
1.  登录您的 [Cloudflare 仪表盘](https://dash.cloudflare.com/)。
2.  导航至 **Workers & Pages** > **Create Application (创建应用程序)**。
3.  点击 **Create Worker (创建 Worker)**。
4.  为您的 Worker 命名（例如 `vless-proxy`）并点击 **Deploy (部署)**。

### 2. 安装代码
1.  点击 **Edit Code (编辑代码)**。
2.  删除 `worker.js` 中的现有内容。
3.  复制提供的 `worker.js` 的全部内容（来自本仓库）并粘贴到编辑器中。
4.  点击 **Save and Deploy (保存并部署)**。

### 3. 配置变量 (重要!) 🔑
1.  返回 Worker 的设置页面。
2.  进入 **Settings (设置)** > **Variables and Secrets (变量和机密)**。
3.  添加以下变量：

| 变量名 | 类型 | 描述 | 示例值 |
| :--- | :--- | :--- | :--- |
| `u` | **Environment Variable** | **必需。** 您的 VLESS/Trojan 用户 ID (UUID)。 | `de305d54-75b4-431b-adb2-eb6b9e546014` |
| `p` | Text | *(可选)* 自定义代理 IP/域名。 | `ts.hpc.tw` |
| `s` | Secret | *(可选)* SOCKS5 代理用于回退。 | `user:pass@1.2.3.4:1080` |

> [!WARNING]
> **安全风险**: 请勿使用默认 UUID。请使用 `uuidgenerator.net` 或在终端运行 `uuidgen` 生成一个新的。

### 4. 设置 KV 存储 (可选但推荐) 💾
要使用 UI 中的“保存配置”功能和高级 IP 过滤：
1.  进入 **Workers & Pages** > **KV**。
2.  点击 **Create a Namespace (创建命名空间)**。
    *   *建议*: 命名为 `CONFIG`。
    *   点击 **Add (添加)**。
3.  返回您的 Worker > **Settings (设置)** > **Variables and Secrets (变量和机密)**。
4.  滚动到 **KV Namespace Bindings (KV 命名空间绑定)**。
5.  点击 **Add Binding (添加绑定)**。
    *   **Variable name (变量名)**: `C` (必须是大写的 `C`)。
    *   **KV Namespace**: 选择您刚刚创建的命名空间（例如 `CONFIG`）。
6.  点击 **Save and Deploy (保存并部署)**。

### 5. 访问 UI 🌐
使用您的 UUID 访问 Worker 的 URL：
`https://<your-worker-name>.<your-subdomain>.workers.dev/<YOUR_UUID>`

---

## 方法 2: Wrangler CLI (高级) 💻

供喜欢命令行的开发者使用。

1.  **安装 Wrangler**:
    ```bash
    npm install -g wrangler
    ```

2.  **登录**:
    ```bash
    wrangler login
    ```

3.  **部署**:
    在项目目录下运行此命令：
    ```bash
    wrangler deploy worker.js --name my-proxy-worker
    ```

4.  **设置密钥 (Secrets)**:
    ```bash
    wrangler secret put u
    # 提示时输入您的 UUID
    ```

---

## 自定义域名设置 🔗

要使用自定义域名（如 `proxy.yourdomain.com`）而不是 `workers.dev`：

1.  将您的域名添加到 Cloudflare。
2.  进入您的 Worker > **Settings (设置)** > **Triggers (触发器)**。
3.  点击 **Add Custom Domain (添加自定义域名)**。
4.  输入您想要的子域名（例如 `vpn.example.com`）。
5.  Cloudflare 将自动处理 DNS 记录和 SSL 证书。

---

## 优化：寻找 ProxyIP (优选 IP) ⚡

如果默认连接速度慢或被封锁，您需要一个“干净 IP” (ProxyIP)。
这是一个 Cloudflare 信任但未被您的 ISP 封锁的 IP 地址。

1.  **它是什么？**: 您的 Worker 用来中转流量的后端 IP 地址。
2.  **如何找到？**:
    *   在 GitHub 或 Telegram 上搜索 "Cloudflare clean IP" 或 "优选IP"。
    *   使用 `CloudflareSpeedTest` 等工具。
3.  **如何使用？**:
    *   在您的 Worker 设置中将 `p` 变量设置为该 IP 地址（例如 `104.16.x.x` 或 `domain.com`）。

---

## 故障排除 🛠️

| 错误代码 | 含义 | 解决方案 |
| :--- | :--- | :--- |
| **1101** | Worker 异常 | 代码崩溃。检查您是否错误地修改了 `worker.js`。检查日志。 |
| **1033** | 隧道错误 | Cloudflare Tunnel 失败。通常是网络问题或错误的 ProxyIP (`p`)。尝试移除 `p`。 |
| **522** | 连接超时 | Worker 无法到达目的地。目的地可能封锁了 Cloudflare。 |
| **UUID Invalid** | 认证失败 | 确保 URL 中的 UUID 与 `u` 变量完全匹配。 |
| **KV Error** | 存储缺失 | 您没有绑定 KV 命名空间 `C`。见方法 1 中的步骤 4。 |

**常见修复:**
*   **"我打不开 Google":** 您的 ProxyIP 可能坏了。清空 `p` 变量来测试。
*   **"速度很慢":** 您的 ISP 正在对 Cloudflare 限速。寻找更好的 ProxyIP 或使用自定义域名。

---

**致谢**:
-   原始 VLESS 脚本作者 `3Kmfi6HP`.
-   DoH Proxy 逻辑作者 `Hossein Pira`.
-   UI & Integrations by `Tehran Network` & Contributors.
