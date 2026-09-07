const CACHE_NAME = 'economiza-colina-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './video.html',
  './css/styles.css',
  './js/app.js',
  './js/cart.js',
  './js/data.js',
  './assets/favicon.svg',
  './assets/ovo.png',
  './assets/frango.png',
  './assets/carne.png',
  './assets/contrafile.png',
  './assets/limpeza.png',
  './assets/tomate.png',
  './assets/arroz.png',
  './assets/cafe.png',
  './assets/cerveja.png',
  './assets/itens.jpeg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});
