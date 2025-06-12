const CACHE_NAME = 'pwa-code-editor-v1.0';
const urlsToCache = [
  '/', // Catches the root path
  '/index.html',
  // CodeMirror CSS and JS files
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/codemirror.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/theme/dracula.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/codemirror.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/mode/xml/xml.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/mode/javascript/javascript.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/mode/css/css.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/mode/htmlmixed/htmlmixed.min.js',
  // Placeholder icons (if you use actual local icons, list them here)
  'https://via.placeholder.com/72x72.png?text=CE',
  'https://via.placeholder.com/96x96.png?text=CE',
  'https://via.placeholder.com/128x128.png?text=CE',
  'https://via.placeholder.com/144x144.png?text=CE',
  'https://via.placeholder.com/152x152.png?text=CE',
  'https://via.placeholder.com/192x192.png?text=CE',
  'https://via.placeholder.com/384x384.png?text=CE',
  'https://via.placeholder.com/512x512.png?text=CE'
];

// Install event: Caching assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: Serve cached assets first, then fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // No cache hit - fetch from network
        return fetch(event.request);
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
