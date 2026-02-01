# 终极新手保姆级教程 (Zero-to-Hero) 🚀

本综合指南将带你从零开始，在 Cloudflare Workers 上部署一个功能齐全、抗封锁的代理服务。

---

## 第一阶段：准备工作 🛠️

在写代码之前，我们需要先把工具准备好。

### 1.1. 注册 Cloudflare 账号
1.  前往 [dash.cloudflare.com](https://dash.cloudflare.com/sign-up)。
2.  注册一个免费账号。
3.  验证你的电子邮箱。

### 1.2. 生成 UUID (你的密钥)
UUID 就像你的密码一样。你需要一个独一无二的 UUID。
*   **方法 A (在线):** 访问 [uuidgenerator.net](https://www.uuidgenerator.net/) 并复制一个 Version 4 UUID。
*   **方法 B (命令行):** 打开终端并运行 `uuidgen`。
*   *UUID 示例:* `84852332-6229-4467-935e-6386566d5823` (请**不要**使用这个！)

---

## 第二阶段：部署 ☁️

我们将部署 "Worker" 脚本，它充当服务器的角色。

### 2.1. 创建 Worker
1.  登录 Cloudflare 仪表盘。
2.  在左侧侧边栏，点击 **Workers & Pages (Workers 和 Pages)**。
3.  点击蓝色的 **Create Application (创建应用程序)** 按钮。
4.  点击 **Create Worker (创建 Worker)**。
5.  给它起个随机的名字（例如 `azure-sky-proxy`）以避免被探测。
6.  点击 **Deploy (部署)**。

### 2.2. 安装代码
1.  点击 **Edit Code (编辑代码)**。
2.  你会看到一个名为 `worker.js` 的文件。**删除里面的所有内容。**
3.  复制本仓库中 `worker.js` 文件的全部代码。
4.  粘贴到 Cloudflare 编辑器中。
5.  点击右上角的 **Save and Deploy (保存并部署)**。

### 2.3. 配置 UUID
1.  回到 Worker 的概览页面（点击左上角的返回箭头 `<`）。
2.  前往 **Settings (设置)** -> **Variables and Secrets (变量和机密)**。
3.  点击 "Environment Variables (环境变量)" 下的 **Add variable (添加变量)**。
    *   **Variable name (变量名)**: `u`
    *   **Value (值)**: 粘贴你在 1.2 步生成的 UUID。
4.  点击 **Deploy (部署)**（底部或顶部）。

### 2.4. 设置 KV 存储 (仪表盘必需)
仪表盘需要一个地方来保存你的设置。
1.  在主侧边栏中，前往 **Workers & Pages** -> **KV**。
2.  点击 **Create a Namespace (创建命名空间)**。
    *   Name (名称): `CONFIG`
    *   点击 **Add (添加)**。
3.  回到你的 Worker -> **Settings (设置)** -> **Variables and Secrets (变量和机密)**。
4.  向下滚动到 **KV Namespace Bindings (KV 命名空间绑定)**。
5.  点击 **Add binding (添加绑定)**。
    *   **Variable name (变量名)**: `C` (必须是大写的 `C`)。
    *   **KV Namespace (KV 命名空间)**: 选择 `CONFIG`。
6.  点击 **Save and Deploy (保存并部署)**。

---

## 第三阶段：验证与仪表盘 🖥️

1.  找到你的 Worker URL（例如 `https://azure-sky-proxy.username.workers.dev`）。
2.  在 URL 后面加上你的 UUID：
    `https://azure-sky-proxy.username.workers.dev/84852332-6229-4467-935e-6386566d5823`
3.  在浏览器中访问这个链接。
4.  你应该能看到一个 **黑客帝国风格的终端** 界面。
5.  它应该显示 "连接成功！" 并加载仪表盘。

**故障排除:**
*   *404 Not Found*: 你忘了在 URL 后面加 UUID。
*   *Error 1101*: 代码问题。检查日志。
*   *KV Error*: 你错过了步骤 2.4。

---

## 第四阶段：客户端配置 📱

现在我们将你的设备连接到 Worker。

### 4.1. 获取订阅链接
1.  在仪表盘上，找到 **[ 快速订阅 ]** 或 **[ 复制链接 ]** 按钮。
2.  如果你想要特定的设置（如“延迟优选”），请先在仪表盘中配置好，然后再复制链接。

### 4.2. Android (v2rayNG)
1.  从 Play Store 或 GitHub 安装 **v2rayNG**。
2.  打开应用。
3.  点击左上角菜单 (☰) -> **订阅设置**。
4.  点击右上角 `+`。
    *   **备注**: `Cloudflare Worker`
    *   **地址(url)**: 粘贴你的链接。
5.  保存。
6.  点击右上角三个点 (⋮) -> **更新订阅**。
7.  选择一个节点（例如 `VLESS-TLS-443`）。
8.  点击右下角的 V 图标连接。

### 4.3. iOS (Shadowrocket / 小火箭)
1.  打开 **Shadowrocket**。
2.  点击右上角 `+` -> 类型选择: **Subscribe (订阅)**。
3.  **URL**: 粘贴你的链接。
4.  点击 **完成**。
5.  打开开关进行连接。

### 4.4. Windows (v2rayN)
1.  下载 **v2rayN**。
2.  **订阅分组** -> **添加订阅地址**。
3.  粘贴 URL。
4.  **更新订阅**。
5.  右键点击一个节点 -> **设为活动服务器**。
6.  系统代理 -> **自动配置系统代理**。

---

## 第五阶段：高级优化 ⚡

### 5.1. 解决 "Cloudflare Loop" (ProxyIP)
如果你无法访问某些网站（如 Google 提示异常），你需要一个 ProxyIP。
1.  前往 仪表盘 -> **配置管理**。
2.  找到 **ProxyIP (p)**。
3.  输入一个干净的 IP 或域名（例如 `proxyip.example.com`）。
    *   *注*: 脚本内置了备用 IP，但使用自定义的效果更好。
4.  点击 **保存配置**。

### 5.2. 启用 ECH (抗封锁)
1.  在 仪表盘 -> **协议选择**。
2.  勾选 **启用 ECH**。
3.  点击 **保存协议配置**。
4.  在客户端更新订阅。
    *   *效果*: 这会加密 SNI，使防火墙更难发现你在连接 Cloudflare。

### 5.3. 客户端优化 (v2rayNG / Shadowrocket)
有时候瓶颈在于你的客户端设置。
*   **多路复用 (Mux)**: 在设置中启用此功能以减少握手延迟。
*   **分片 (Fragment)**: 如果你的连接被限速，启用 TLS 分片（在客户端中通常称为 "Fragment" 或 "Trick"）。
    *   *Packets (包数)*: `100-200`
    *   *Length (长度)*: `10-20`
    *   *Interval (间隔)*: `10-20`
*   **允许不安全 (Allow Insecure)**: **仅**用于调试。永远不要永久开启它，因为这会让你暴露在中间人攻击之下。

---

## 第六阶段：安全最佳实践 🛡️

### 6.1. 保护你的仪表盘
你的仪表盘 URL 包含你的 UUID。任何拥有此链接的人都可以使用你的代理并更改你的设置。
1.  **不要分享** 包含完整 URL 的截图。
2.  **使用 Cloudflare Access**: 设置 Zero Trust 策略，要求在访问仪表盘路径之前登录（邮件验证码）。

### 6.2. 定期轮换 UUID
如果你怀疑你的 UUID 泄露了：
1.  生成一个新的 UUID。
2.  在 Cloudflare 中更新 `u` 变量。
3.  更新你的客户端订阅。
4.  旧的 UUID 将立即失效。

---

## 术语表 📖

*   **UUID**: 用户 ID。相当于密码。
*   **VLESS**: 一种轻量级的代理协议。
*   **KV**: 键值存储。Cloudflare 用于保存设置的数据库。
*   **Sub/Subscription (订阅)**: 一个包含所有服务器详细信息的链接。
*   **ProxyIP**: 一个中间服务器，用于向目标网站隐藏你的流量来源。
