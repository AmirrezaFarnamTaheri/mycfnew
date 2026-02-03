# 从零到一完整上手指南 🚀

本指南从零开始，逐步带你完成 CFnew 的部署，并在每一步提供验证方法。

---

## 目录

1. 准备工作
2. 生成 UUID
3. 部署 Worker
4. 配置变量和 KV
5. 验证访问
6. 使用面板
7. 连接客户端
8. 进阶选项
9. 安全建议
10. 排查问题

---

## 1) 准备工作

### 1.1 Cloudflare 账号
1. 打开 https://dash.cloudflare.com/sign-up
2. 注册账号并完成邮箱验证

### 1.2 准备内容
- 一台可访问 Cloudflare 的设备
- 一个 UUID（下一步生成）
- 10–15 分钟的时间

---

## 2) 生成 UUID（你的密钥）

UUID 就是你的密码，务必保密。

- **在线**：https://www.uuidgenerator.net/（选择 Version 4）
- **命令行**：运行 `uuidgen`

示例（不要使用）：
`84852332-6229-4467-935e-6386566d5823`

---

## 3) 部署 Worker

### 3.1 创建 Worker
1. Cloudflare 控制台 → **Workers & Pages**
2. 点击 **Create Application** → **Create Worker**
3. 随机起个名字
4. 点击 **Deploy**

### 3.2 粘贴代码
1. 点击 **Edit Code**
2. 删除默认代码
3. 粘贴仓库里的 `worker.js`
4. 点击 **Save and Deploy**

---

## 4) 配置变量与 KV

### 4.1 设置 UUID（必需）
1. Worker → **Settings** → **Variables and Secrets**
2. 添加环境变量：
   - 名称：`u`
   - 值：你的 UUID
3. 点击 **Deploy**

> 注意：变量名是 **`u`**，不是 `uuid`。

### 4.2 绑定 KV（面板配置必需）
1. 侧边栏 → **Workers & Pages** → **KV**
2. **Create Namespace**（如 `CONFIG`）
3. 返回 Worker → **Settings** → **Variables and Secrets**
4. **KV Namespace Bindings** → **Add binding**：
   - 名称：`C`
   - 命名空间：`CONFIG`
5. **Save and Deploy**

---

## 5) 验证访问（非常重要）

打开以下地址检查：

1. **根路径**
   - `https://<worker>.workers.dev/`
   - 应显示终端页面

2. **面板**
   - `https://<worker>.workers.dev/<UUID>`
   - 应显示面板

3. **区域接口**
   - `https://<worker>.workers.dev/<UUID>/region`
   - 返回 JSON

4. **订阅接口**
   - `https://<worker>.workers.dev/<UUID>/sub`
   - 返回订阅文本

---

## 6) 使用面板

- **System Status**：检测区域、当前 IP
- **Config Management**：保存/加载/重置配置
- **Latency Test**：测速、城市筛选、写入优选
- **Debug Console**：查看 JS 错误

### 6.5 面板字段细化说明
- **指定区域 (wk)**：固定 Worker 区域用于选路。
- **协议选择**：VLESS/Trojan/xhttp + VMess/SS/TUIC/Hysteria2/gRPC（仅链接）。
- **ECH 设置**：启用 ECH + 自定义 DoH + 自定义域名。
- **自定义路径 (d)**：面板迁移到隐藏路径。
- **ProxyIP (p)**：隐藏出口或绕过 Cloudflare loop。
- **优选 IP（yx/yxURL）**：手动输入或从 URL 获取。
- **Latency Test**：批量测速、城市筛选、覆盖/追加到 `yx`。
- **高级控制**：API 管理、区域匹配、降级策略、TLS-only、禁用优选。
- **IP/运营商过滤**：限制优选列表解析范围。

---

## 7) 连接客户端

### 7.1 Android（v2rayNG）
1. 安装 v2rayNG
2. 订阅 → 添加
3. 粘贴 `/sub` 链接
4. 更新订阅并连接

### 7.2 iOS（Shadowrocket）
1. 添加订阅链接
2. 更新并连接

### 7.3 Windows（v2rayN）
1. 添加订阅链接
2. 更新并设为活动节点

### 7.4 macOS / Linux（Clash / sing-box）
- 使用订阅功能导入链接

---

## 8) 进阶选项

### 8.1 自定义路径
- 设置 `d=/你的秘密路径`
- UUID 访问会被禁用

### 8.2 ProxyIP
- 用于解决 Cloudflare loop 或被封锁
- 示例：`1.2.3.4:443`

### 8.3 启用 ECH
- 面板勾选 ECH
- 客户端更新订阅后生效

### 8.4 伪装主页
- 设置 `homepage` 为正常网页

### 8.5 SOCKS5 上游
- 设置 `s=user:pass@host:port`

---

## 9) 安全建议

- 不要泄露 UUID
- 推荐设置自定义路径 `d`
- 面板可用 Cloudflare Access 保护
- UUID 泄露后立刻更换

---

## 10) 排查问题

**面板一直显示 Checking...**
- 打开调试控制台
- 检查 `/region` 和 `/sub`

**UUID 无效**
- 确认变量名是 `u`
- 删除空格

**KV 未配置**
- 创建 KV 并绑定 `C`
- 重新部署

**订阅为空**
- 直接访问 `/<UUID>/sub`

---

至此，你应该拥有完整可用的 CFnew 部署。

完整参考（全部变量、API 与格式）：`docs/REFERENCE_ZH.md`。
