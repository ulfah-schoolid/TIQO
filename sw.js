/* TIQO Service Worker
   - Halaman (index.html): ambil dari jaringan dulu, pakai salinan tersimpan bila offline.
     Jadi setiap kali index.html baru diunggah, pengguna otomatis mendapat versi baru.
   - Ikon & manifest: pakai salinan tersimpan dulu.
   - Font Google: disimpan setelah pertama kali dimuat.
   - Tidak menyimpan data pribadi; progres anak ada di IndexedDB, bukan di cache. */
const VERSION = 'tiqo-v1';
const CORE = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(CORE.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== VERSION + '-fonts').map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

const OFFLINE_HTML = `<!doctype html><html lang="id"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>TIQO</title><body style="font-family:sans-serif;background:#E4F4FA;color:#3B2A6E;display:grid;place-items:center;min-height:100vh;margin:0;text-align:center;padding:24px">
<div><div style="font-size:64px">⭐</div><h1>Kamu sedang offline</h1><p>Sambungkan internet sekali untuk membuka TIQO.<br>Setelah itu TIQO bisa dibuka tanpa internet.</p>
<button onclick="location.reload()" style="font-size:18px;padding:14px 26px;border-radius:999px;border:0;background:#5B47B8;color:#fff">Coba lagi</button></div></body></html>`;

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); }
        return res;
      }).catch(async () => (await caches.match('./index.html')) || (await caches.match('./')) ||
        new Response(OFFLINE_HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8' } }))
    );
    return;
  }
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(VERSION + '-fonts').then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok && /\.(png|json|webp|svg|mp3|woff2?)$/.test(url.pathname)) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    })));
  }
});
