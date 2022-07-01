const urlsToCache = ["script.js", "styles.css", "index.html"];
self.addEventListener("install", (event) => {
  event.waitUntil(async () => {
    const cache = await caches.open("assets");
    console.log("Se han cacheado algunas mamadas");
    return cache.addAll(urlsToCache);
  });
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const networkFetch = fetch(event.request).then((response) => {
        // update the cache with a clone of the network response
        caches.open("assets").then((cache) => {
          cache.put(event.request, response.clone());
        });
      });
      // prioritize cached response over network
      return cachedResponse || networkFetch;
    })
  );
});
