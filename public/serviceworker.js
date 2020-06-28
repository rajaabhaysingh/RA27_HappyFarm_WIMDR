const CACHE_NAME = "static-ver-1";
const urlsToCache = [
  "/",
  "./index.html",
  "./offline.html",
  "./logo/",
  "/logo/logo_72x72.png",
  "/logo/logo_96x96.png",
  "/logo/logo_128x128.png",
  "/logo/logo_144x144.png",
  "/logo/logo_192x192.png",
  "/logo/logo_384x384.png",
  "/logo/logo_512x512.png",
  "https://use.fontawesome.com/releases/v5.12.1/css/all.css",
];

const self = this;

// install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(async () => {
      try {
        return fetch(event.request);
      } catch (e) {
        return await caches.match("offline.html");
      }
    })
  );
});

// activate SW
self.addEventListener("activate", (event) => {
  const whiteList = [];

  whiteList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!whiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
