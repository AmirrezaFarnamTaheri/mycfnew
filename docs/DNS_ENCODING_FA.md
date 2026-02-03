# DNS Encoding و DoH (ECH)

این سند نحوه دریافت ECH توسط CFnew از طریق DoH را توضیح می‌دهد.

---

## 1) DoH چیست؟

DoH پرس‌وجوی DNS را از طریق HTTPS ارسال می‌کند و از UDP متن‌باز استفاده نمی‌کند.

---

## 2) ECH چیست؟

ECH بخش SNI در TLS ClientHello را رمز می‌کند.
CFnew پیکربندی ECH را از DoH دریافت و به لینک‌ها اضافه می‌کند.

---

## 3) نوع رکورد

ECH از رکورد **type 65** استفاده می‌کند.
دامنه پیش‌فرض: `cloudflare-ech.com`

---

## 4) قالب درخواست DoH

### 4.1 GET
```
https://<doh-host>/dns-query?name=cloudflare-ech.com&type=65
```

### 4.2 POST
- POST به `/dns-query`
- Content-Type: `application/dns-message`
- بدنه: پیام خام DNS

CFnew معمولاً GET استفاده می‌کند.

---

## 5) نکات Encoding

بعضی DoHها **base64url** نیاز دارند:
- `+` → `-`
- `/` → `_`
- حذف `=`

---

## 6) DNS سفارشی

می‌توانید DoH سفارشی تعیین کنید:
- Dashboard → **Custom DNS Server**
- متغیر: `customDNS`

مطمئن شوید DoH شما type 65 را پشتیبانی می‌کند.

---

## 7) رفع اشکال

- **ECH غیرفعال**: DoH شما type 65 را پشتیبانی نمی‌کند
- **Timeout**: DoH دیگری امتحان کنید
- **دامنه اشتباه**: `customECHDomain` را بررسی کنید

---

برای مراحل استقرار به `DEPLOYMENT.md` مراجعه کنید.
