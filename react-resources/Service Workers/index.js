// index.js (Service Worker)

self.addEventListener("install", (event) => {
  // Forces the waiting service worker to become the active service worker.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Claims the clients immediately so fetch events will be intercepted without needing a page refresh.
  event.waitUntil(clients.claim());
});

self.addEventListener("push", (event) => {
  const mensagem = event.data
    ? event.data.text()
    : "Sua push notification fake sem texto!";

  const title = "Notificação Recebida!";
  const options = {
    body: mensagem,
    icon: "https://cdn-icons-png.flaticon.com/512/3119/3119338.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      console.log("event.request", event.request);
      console.log("cachedResponse", cachedResponse);
      if (cachedResponse) {
        const headers = new Headers(cachedResponse.headers);
        headers.append('X-Is-Cached', 'true');
        return new Response(cachedResponse.body, {
          status: cachedResponse.status,
          statusText: cachedResponse.statusText,
          headers: headers
        });
      }

      return fetch(event.request).then((response) => {
        // Check if we received a valid response. Allow both "basic" (same-origin) and "cors" (cross-origin).
        if (!response || response.status !== 200 || (response.type !== "basic" && response.type !== "cors")) {
          return response;
        }

        const responseToCache = response.clone();
        console.log("adding on cache");
        caches.open("my-cache-name").then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }),
  );
});
