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

## 故障排除 🛠️

-   **"Error 1101"**: 通常意味着代码异常。检查日志。
-   **"UUID Invalid"**: 确保您的 UUID 符合 `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` 格式。
-   **"KV not configured"**: 您无法在 UI 中保存设置。请遵循上面的“设置 KV 存储”。
-   **速度慢**: 尝试设置有效的 `p` (ProxyIP)（例如 Cloudflare CDN IP 或干净的 IP）。

---

**致谢**:
-   原始 VLESS 脚本作者 `3Kmfi6HP`.
-   DoH Proxy 逻辑作者 `Hossein Pira`.
-   UI & Integrations by `Tehran Network` & Contributors.
