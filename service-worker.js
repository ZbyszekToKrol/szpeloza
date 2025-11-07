const CACHE_NAME = "PWA-cache";
const FILES_TO_CACHE = [
  "id.html",
  "assets/main.css",
  "assets/id.js"
  "assets/id.css"
  "assets/manifest.js"
  // add any other pages you want available offline
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
