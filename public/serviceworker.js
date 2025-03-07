const version = "v1.1::";
const assets = [
  "/",
  "/index.html",
  "/offline.html",
  "https://use.fontawesome.com/releases/v5.12.1/css/all.css",
];

const self = this;

// install
self.addEventListener("install", function (event) {
  // console.log("WORKER: install event in progress.");
  event.waitUntil(
    caches
      .open(version)
      .then(function (cache) {
        return cache.addAll(assets);
      })
      .then(function () {
        // console.log("WORKER: install completed");
      })
  );
});

// fetch
self.addEventListener("fetch", function (event) {
  // console.log("WORKER: fetch event in progress.");

  if (event.request.method !== "GET") {
    // console.log(
    //   "WORKER: fetch event ignored.",
    //   event.request.method,
    //   event.request.url
    // );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var networked = fetch(event.request)
        .then(fetchedFromNetwork, unableToResolve)
        .catch(unableToResolve);

      // console.log(
      //   "WORKER: fetch event",
      //   cached ? "(cached)" : "(network)",
      //   event.request.url
      // );
      return cached || networked;

      function fetchedFromNetwork(response) {
        var cacheCopy = response.clone();

        // console.log("WORKER: fetch response from network.", event.request.url);

        caches
          .open(version)
          .then(function add(cache) {
            cache.put(event.request, cacheCopy);
          })
          .then(function () {
            // console.log(
            //   "WORKER: fetch response stored in cache.",
            //   event.request.url
            // );
          });

        return response;
      }

      function unableToResolve() {
        // console.log("WORKER: fetch request failed in both cache and network.");

        // return new Response("", {
        return new Response(
          "<h3>Service Unavailable : Returned by ServiceWorker</h3>",
          {
            status: 503,
            statusText: "Service Unavailable",
            headers: new Headers({
              "Content-Type": "text/html",
            }),
          }
        );
      }
    })
  );
});

// activate
self.addEventListener("activate", function (event) {
  // console.log("WORKER: activate event in progress.");

  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (key) {
              return !key.startsWith(version);
            })
            .map(function (key) {
              return caches.delete(key);
            })
        );
      })
      .then(function () {
        // console.log("WORKER: activate completed.");
      })
  );
});
