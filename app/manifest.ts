import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FALTA GAME",
    short_name: "Falta",
    start_url: "/",
    display: "standalone",
    background_color: "#18023A",
    theme_color: "#2f0075",
    icons: [
      {
        src: "/icons/icon-192-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
