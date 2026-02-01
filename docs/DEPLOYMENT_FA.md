# راهنمای استقرار (Deployment Guide) 🔧

این راهنما دستورالعمل‌های گام‌به‌گام برای استقرار اسکریپت Cloudflare Worker VLESS Proxy & DoH Ultimate را ارائه می‌دهد.

---

## روش ۱: داشبورد Cloudflare (آسان) 🖥️

### ۱. ساخت Worker
1.  وارد [داشبورد Cloudflare](https://dash.cloudflare.com/) خود شوید.
2.  به مسیر **Workers & Pages** > **Create Application** بروید.
3.  روی **Create Worker** کلیک کنید.
4.  یک نام برای ورکر خود انتخاب کنید (مثلاً `vless-proxy`) و روی **Deploy** کلیک کنید.

### ۲. نصب کد
1.  روی **Edit Code** کلیک کنید.
2.  محتوای موجود در `worker.js` را پاک کنید.
3.  کل محتوای فایل `worker.js` ارائه شده (در این مخزن) را کپی کرده و در ویرایشگر جایگذاری کنید.
4.  روی **Save and Deploy** کلیک کنید.

### ۳. تنظیم متغیرها (مهم!) 🔑
1.  به صفحه تنظیمات Worker خود برگردید.
2.  به مسیر **Settings** > **Variables and Secrets** بروید.
3.  متغیرهای زیر را اضافه کنید:

<div dir="rtl">

| متغیر | نوع | توضیحات | مقدار نمونه |
| :--- | :--- | :--- | :--- |
| `u` | **Environment Variable** | **الزامی.** شناسه کاربر VLESS/Trojan (UUID). | `de305d54-75b4-431b-adb2-eb6b9e546014` |
| `p` | Text | *(اختیاری)* آی‌پی یا دامنه سفارشی ProxyIP. | `ts.hpc.tw` |
| `s` | Secret | *(اختیاری)* پروکسی SOCKS5 برای فال‌بک. | `user:pass@1.2.3.4:1080` |

</div>

> [!WARNING]
> **خطر امنیتی**: از UUID پیش‌فرض استفاده نکنید. با استفاده از ابزاری مانند `uuidgenerator.net` یا دستور `uuidgen` در ترمینال، یک UUID جدید بسازید.

### ۴. تنظیم ذخیره‌سازی KV (اختیاری اما پیشنهادی) 💾
برای استفاده از ویژگی "Save Config" در رابط کاربری و فیلتر پیشرفته IP:
1.  به **Workers & Pages** > **KV** بروید.
2.  روی **Create a Namespace** کلیک کنید.
    *   *پیشنهاد*: نام آن را `CONFIG` (یا `WORKER_CONFIG`) بگذارید.
    *   روی **Add** کلیک کنید.
3.  به Worker خود برگردید > **Settings** > **Variables and Secrets**.
4.  به بخش **KV Namespace Bindings** اسکرول کنید.
5.  روی **Add Binding** کلیک کنید.
    *   **Variable name**: `C` (باید دقیقاً `C` باشد).
    *   **KV Namespace**: فضایی که ساختید (مثلاً `CONFIG`) را انتخاب کنید.
6.  روی **Save and Deploy** کلیک کنید.

### ۵. دسترسی به رابط کاربری 🌐
از آدرس ورکر خود همراه با UUID بازدید کنید:
`https://<your-worker-name>.<your-subdomain>.workers.dev/<YOUR_UUID>`

---

## عیب‌یابی 🛠️

-   **"Error 1101"**: معمولاً به معنی خطای کد است. لاگ‌های `wrangler tail` را بررسی کنید.
-   **"UUID Invalid"**: مطمئن شوید فرمت UUID شما `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` باشد.
-   **"KV not configured"**: شما نمی‌توانید تنظیمات را در رابط کاربری ذخیره کنید. "تنظیم ذخیره‌سازی KV" را در بالا دنبال کنید.
-   **سرعت پایین**: سعی کنید یک `p` (ProxyIP) معتبر تنظیم کنید (مثلاً یک IP مربوط به Cloudflare CDN یا یک IP تمیز).

---

**اعتبار**:
-   اسکریپت اصلی VLESS توسط `3Kmfi6HP`.
-   منطق DoH Proxy توسط `Hossein Pira`.
-   رابط کاربری و یکپارچه‌سازی توسط `Tehran Network` و مشارکت‌کنندگان.
