self.addEventListener("fetch", (event) => {
  // 1. Only handle GET requests
  // 2. IMPORTANT: Only handle http/https (ignore chrome-extension://)
  if (event.request.method !== "GET" || !event.request.url.startsWith("http"))
    return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          // Only cache valid, successful responses
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            const url = new URL(event.request.url);
            if (url.pathname.startsWith("/en"))
              return caches.match("/en/offline");
            return caches.match("/ar/offline");
          }
        });

      return cachedResponse || fetchPromise;
    })
  );
});
