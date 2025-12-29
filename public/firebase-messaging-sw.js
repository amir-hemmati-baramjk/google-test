importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCztssqxJ5ilzjunSzRMOrf8OrMTTYx8zo",
  authDomain: "falta-782a4.firebaseapp.com",
  projectId: "falta-782a4",
  storageBucket: "falta-782a4.appspot.com",
  messagingSenderId: "312331038818",
  appId: "1:312331038818:web:309a705275d33ba472213b",
  measurementId: "G-56YLDC1BFD",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const title = payload?.notification?.title || "Notification";
  const body = payload?.notification?.body || "";
  const id = payload?.data?.id || null;
  const options = { body, icon: "/logo.svg", data: { id } };
  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const id = event.notification?.data?.id;
  const targetUrl = id ? `/tournament/${id}` : "/";
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if ("focus" in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow(targetUrl);
      })
  );
});

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});
