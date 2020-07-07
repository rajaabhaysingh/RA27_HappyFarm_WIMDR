const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v1";
const assets = [
  "/",
  "/index.html",
  "/offline.html",
  "https://use.fontawesome.com/releases/v5.12.1/css/all.css",
];

const self = this;

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener("install", (evt) => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (evt) => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then((keys) => {
      //console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (evt) => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then(async (fetchRes) => {
            const cache = await caches.open(dynamicCacheName);
            cache.put(evt.request.url, fetchRes.clone());
            // check cached items size
            limitCacheSize(dynamicCacheName, 10);
            return fetchRes;
          })
        );
      })
      .catch(() => {
        if (evt.request.url.indexOf(".html") > -1) {
          return caches.match("/offline.html");
        }
      })
  );
});

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.

// const CACHE_NAME = "version-1";
// const urlsToCache = [
//   "./index.html",
//   "./offline.html",
//   "./",
//   "https://use.fontawesome.com/releases/v5.12.1/css/all.css",
// ];

// const self = this;

// // Install SW
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("Opened cache");

//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// // Listen for requests
// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches
//       .match(event.request)
//       .then(function (response) {
//         // Cache hit - return response
//         if (response) {
//           return response;
//         }

//         return fetch(event.request).then(function (response) {
//           // Check if we received a valid response
//           if (
//             !response ||
//             response.status !== 200 ||
//             response.type !== "basic"
//           ) {
//             return response;
//           }

//           // IMPORTANT: Clone the response. A response is a stream
//           // and because we want the browser to consume the response
//           // as well as the cache consuming the response, we need
//           // to clone it so we have two streams.
//           var responseToCache = response.clone();

//           caches.open(CACHE_NAME).then(function (cache) {
//             cache.put(event.request, responseToCache);
//           });

//           return response;
//         });
//       })
//       .catch(() => {
//         return caches.match("./offline.html");
//       })
//   );
// });

// // Activate the SW
// self.addEventListener("activate", (event) => {
//   const cacheWhitelist = [];
//   cacheWhitelist.push(CACHE_NAME);

//   event.waitUntil(
//     caches.keys().then((keyList) => {
//       return Promise.all(
//         keyList.map((key) => {
//           if (cacheWhitelist.indexOf(key) === -1) {
//             return caches.delete(key);
//           }
//         })
//       );
//     })
//   );
// });
