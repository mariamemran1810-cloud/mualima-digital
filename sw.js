/* Service Worker — المعلمة الرقمية (يعمل بدون إنترنت) */
const CACHE = "mualima-v3";

const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./offline.html",
  "./icon.svg",
  "./manifest.webmanifest"
];

/* تثبيت: خزّن كل الملفات الأساسية */
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* تفعيل: احذف الكاش القديم */
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

/* جلب: الكاش أولاً ثم الشبكة (لتعمل بدون إنترنت) */
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  const url = new URL(e.request.url);

  // ملفات جوجل للخطوط: كاش ثم شبكة
  if (url.hostname.includes("fonts.gstatic.com") || url.hostname.includes("fonts.googleapis.com")) {
    e.respondWith(
      caches.match(e.request).then(
        (cached) =>
          cached ||
          fetch(e.request)
            .then((resp) => {
              const copy = resp.clone();
              caches.open(CACHE).then((c) => c.put(e.request, copy));
              return resp;
            })
            .catch(() => cached)
      )
    );
    return;
  }

  // بقية الطلبات: الكاش أولاً، ثم الشبكة، ثم صفحة رئيسية
  e.respondWith(
    caches.match(e.request).then(
      (cached) =>
        cached ||
        fetch(e.request)
          .then((resp) => {
            if (resp && resp.status === 200) {
              const copy = resp.clone();
              caches.open(CACHE).then((c) => c.put(e.request, copy));
            }
            return resp;
          })
          .catch(() =>
            e.request.mode === "navigate" ? caches.match("./index.html") : cached
          )
    )
  );
});
