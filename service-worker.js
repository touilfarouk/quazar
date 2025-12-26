const CACHE_NAME = 'crochetyou-pwa-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/main.js',
  '/styles.css',
  '/styles-optimized.css',
  '/img/icon-192.png',
  '/img/icon-512.png',
  '/img/icon-192.svg',
  '/img/icon-512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k); })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Cache-first for images
  if (event.request.destination === 'image' || event.request.url.includes('/img/')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          // cache the fetched image for later
          const resClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
          return response;
        }).catch(() => caches.match('/img/icon-192.png'));
      })
    );
    return;
  }

  // fallback strategy for other assets
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => response).catch(() => caches.match('/index.html'));
    })
  );
});
