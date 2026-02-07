# راهنمای استقرار

این سند روش‌های استقرار، تنظیم متغیرها، اتصال KV و به‌روزرسانی را توضیح می‌دهد.

---

## 1) استقرار از طریق داشبورد (پیشنهادی)

### 1.1 ساخت Worker
1. Dashboard → **Workers & Pages** → **Create Application** → **Create Worker**
2. یک نام تصادفی انتخاب کنید
3. **Deploy**

### 1.2 جایگزینی کد
1. **Edit Code** را باز کنید
2. کد پیش‌فرض را با `worker.js`  جایگزین کنید
3. **Save and Deploy**

---

## 2) تنظیم متغیرهای محیطی

Settings → Variables and Secrets:

- `u` : **ضروری** (UUID)
- `d` : مسیر سفارشی
- `p` : ProxyIP
- `s` : SOCKS5

بعد از تغییرات **Deploy** کنید.

### 2.1 جدول کامل متغیرها

| متغیر | کاربرد | نمونه |
|---|---|---|
| `u` | UUID (کلید) | `8485...5823` |
| `d` | مسیر سفارشی داشبورد | `/secret-panel` |
| `p` | ProxyIP | `1.2.3.4:443` |
| `s` | SOCKS5 | `user:pass@host:port` |
| `wk` | منطقه دستی | `US` / `SG` / `JP` |
| `yx` | لیست IP ترجیحی | `1.1.1.1:443#HK,...` |
| `yxURL` | منبع IP ترجیحی | `https://example.com/ips.txt` |
| `rm` | تطبیق منطقه | `no` برای غیرفعال |
| `qj` | downgrade | `no` برای فعال (مستقیم → SOCKS5 → فالبک) |
| `dkby` | فقط TLS | `yes` فعال |
| `yxby` | غیرفعال‌سازی ترجیحی | `yes` فعال |
| `ae` | اجازه API | `yes` فعال |
| `ech` | فعال‌سازی ECH | `yes` فعال |
| `customDNS` | DoH برای ECH | `https://dns.example/dns-query` |
| `customECHDomain` | دامنه ECH | `cloudflare-ech.com` |
| `tp` | رمز Trojan | `custom-pass` |
| `homepage` | صفحه جعلی | `https://example.com` |
| `scu` | تبدیل اشتراک | `https://url.v1.mk/sub` |
| `ev` | فعال‌سازی VLESS | `yes` / `no` |
| `et` | فعال‌سازی Trojan | `yes` / `no` |
| `ex` | فعال‌سازی xhttp | `yes` / `no` |
| `evm` | VMess (فقط لینک) | `yes` / `no` |
| `ess` | Shadowsocks (فقط لینک) | `yes` / `no` |
| `etu` | TUIC (فقط لینک) | `yes` / `no` |
| `ehy` | Hysteria2 (فقط لینک) | `yes` / `no` |
| `eg` | VLESS gRPC (فقط لینک) | `yes` / `no` |
| `epd` | دامنه ترجیحی | `yes` / `no` |
| `epi` | IP ترجیحی | `yes` / `no` |
| `egi` | GitHub defaults | `yes` / `no` |
| `edp` | تولید چندپورتی | `yes` / `no` |
| `ipv4` | فیلتر IPv4 | `yes` / `no` |
| `ipv6` | فیلتر IPv6 | `yes` / `no` |
| `ispMobile` | فیلتر اپراتور (همراه) | `yes` / `no` |
| `ispUnicom` | فیلتر اپراتور (یونیکام) | `yes` / `no` |
| `ispTelecom` | فیلتر اپراتور (تلکام) | `yes` / `no` |

### 2.2 اولویت داشبورد و محیط

- متغیرهای محیطی نقش پیش‌فرض دارند.
- داشبورد به **KV** می‌نویسد و بر پیش‌فرض‌ها غلبه می‌کند.
- Reset در داشبورد KV را پاک کرده و به تنظیمات محیط برمی‌گرداند.

---

## 3) اتصال KV (برای داشبورد ضروری)

1. **Workers & Pages** → **KV** → **Create Namespace**
2. در Worker متصل کنید:
   - نام: `C`
   - انتخاب Namespace
3. **Save and Deploy**

> بدون KV، ذخیره تنظیمات داشبورد ممکن نیست.

---

## 4) Wrangler (اختیاری)

1. نصب: `npm i -g wrangler`
2. ورود: `wrangler login`
3. انتشار: `wrangler publish`
4. متغیر: `wrangler secret put u`

KV را در `wrangler.toml` تعریف کنید.

---

## 5) دامنه سفارشی (اختیاری)

1. دامنه را به Worker اضافه کنید
2. DNS را تایید کنید
3. لینک‌های کلاینت را به دامنه جدید تغییر دهید

---

## 6) به‌روزرسانی و بازگشت

- فایل `worker.js` را جایگزین و دوباره Deploy کنید
- KV باقی می‌ماند

**بازگشت:** نسخه قبلی را نگه دارید و دوباره Deploy کنید.

---

## 7) لاگ و دیباگ

- از Logs برای خطاهای سمت سرور استفاده کنید
- از Debug Console برای خطاهای JS استفاده کنید

---

## 8) رفع اشکال

**Error 1101**: معمولا خطای کد یا نبودن binding

**KV تنظیم نیست**: نام binding باید `C` باشد

**UUID نامعتبر**: نام متغیر باید `u` باشد

---

برای جزئیات بیشتر، Walkthrough را ببینید.

مرجع کامل متغیرها و API: `docs/REFERENCE_FA.md`.
