const CACHE_NAME = 'codedoro-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/notification.mp3',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/assets/index.css',
  '/assets/index.js'
];

// Install event - cache initial resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Helper function to determine if a request is for a static asset
function isStaticAsset(url) {
  const requestURL = new URL(url);
  return STATIC_ASSETS.includes(requestURL.pathname) ||
         requestURL.pathname.startsWith('/assets/') ||
         requestURL.pathname.startsWith('/icons/');
}

// Fetch event - network first for dynamic content, cache first for static assets
self.addEventListener('fetch', event => {
  const requestURL = new URL(event.request.url);
  
  // Handle only same-origin requests
  if (requestURL.origin !== location.origin) {
    return;
  }

  // For static assets, try cache first
  if (event.request.method === 'GET' && isStaticAsset(event.request.url)) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request);
        })
    );
    return;
  }

  // For all other requests (including POST), go network-only
  event.respondWith(fetch(event.request));
});
