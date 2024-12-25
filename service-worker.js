var cacheName = "QuizAppPWA-v10.8";
var appShellFiles = [
  "./index.html",
  "./script.js",
  "./favicon.ico",
  "./icons/quiz (192).png",
  "./icons/quiz (512).png",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(appShellFiles);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});