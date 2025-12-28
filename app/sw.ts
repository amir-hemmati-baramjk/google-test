import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, RuntimeCaching } from "serwist";
import { Serwist } from "serwist";

declare const self: ServiceWorkerGlobalScope & {
  __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
};

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: ({ url }) => url.hostname === "api.befalta.com",
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "api-cache",
        expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
      },
    },

    {
      matcher: ({ request }) => request.destination === "image",
      handler: "CacheFirst",
      options: {
        cacheName: "image-cache",
        expiration: { maxEntries: 150, maxAgeSeconds: 60 * 60 * 24 * 30 },
      },
    },
    ...defaultCache,
  ] as RuntimeCaching[],
});

serwist.addEventListeners();
