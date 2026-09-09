const CACHE_NAME = 'economiza-colina-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './video.html',
  './manifest.json',
  './css/styles.css',
  './js/app.js',
  './js/cart.js',
  './js/data.js',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/apple-touch-icon.png',
  './assets/favicon.png',
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
  const url = event.request.url;

  // Para navegação HTML e código JS dinâmico (app.js), tenta a REDE primeiro (Network-First).
  // Se houver conexão, entrega a versão mais nova atualizada do servidor. Se estiver offline, usa o Cache.
  if (event.request.mode === 'navigate' || url.endsWith('.html') || url.endsWith('app.js')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request).then((cached) => {
            return cached || caches.match('./index.html');
          });
        })
    );
    return;
  }

  // Para os demais arquivos estáticos (CSS, imagens, ícones), utiliza Cache-First com Fallback na Rede
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
