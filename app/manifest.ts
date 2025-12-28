import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FALTA GAME - لعبة فلته",
    short_name: "Falta",
    description: "The ultimate gaming and sports platform.",
    start_url: "/",
    display: "standalone",
    background_color: "#18023A",
    theme_color: "#fff",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
