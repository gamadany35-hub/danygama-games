
/* Danygama Games Web Push Service Worker */
"use strict";

self.addEventListener("push", function(event) {
  let payload = {};
  if (event.data) {
    try {
      payload = event.data.json();
    } catch (_) {
      payload = {
        title: "Danygama Games",
        body: event.data.text()
      };
    }
  }

  const title = payload.title || "Danygama Games";
  const options = {
    body: payload.body || "Una taarifa mpya kutoka Danygama Games.",
    icon: payload.icon || "./favicon.png",
    badge: payload.badge || "./favicon.png",
    data: {
      url: payload.url || self.registration.scope
    },
    renotify: true,
    tag: payload.tag || "danygama-games-notification"
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();

  const targetUrl = new URL(
    (event.notification.data && event.notification.data.url) ||
    self.registration.scope,
    self.location.origin
  ).href;

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(function(clientList) {
      for (const client of clientList) {
        if (client.url === targetUrl && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
