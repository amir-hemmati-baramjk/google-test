import { useEffect, useMemo } from "react";

type AsType = "image" | "audio" | "video" | "fetch";

type Options = {
  crossOrigin?: "" | "anonymous" | "use-credentials";

  audioPreload?: "none" | "metadata" | "auto";

  videoPreload?: "none" | "metadata" | "auto";

  primeCache?: boolean;
};

const EXT_TO_KIND_AND_TYPE: Record<string, { as: AsType; type?: string }> = {
  ".png": { as: "image", type: "image/png" },
  ".jpg": { as: "image", type: "image/jpeg" },
  ".jpeg": { as: "image", type: "image/jpeg" },
  ".webp": { as: "image", type: "image/webp" },
  ".gif": { as: "image", type: "image/gif" },
  ".svg": { as: "image", type: "image/svg+xml" },

  ".mp3": { as: "audio", type: "audio/mpeg" },
  ".m4a": { as: "audio", type: "audio/mp4" },
  ".aac": { as: "audio", type: "audio/aac" },
  ".wav": { as: "audio", type: "audio/wav" },
  ".ogg": { as: "audio", type: "audio/ogg" },

  ".mp4": { as: "video", type: "video/mp4" },
  ".webm": { as: "video", type: "video/webm" },
  ".mov": { as: "video", type: "video/quicktime" },

  ".m3u8": { as: "fetch", type: "application/vnd.apple.mpegurl" },
  ".mpd": { as: "fetch", type: "application/dash+xml" },
};

function guessKind(rawUrl: string): { as: AsType; type?: string } {
  try {
    const u = new URL(
      rawUrl,
      typeof window !== "undefined" ? window.location.href : "http://localhost"
    );
    const pathname = u.pathname.toLowerCase();
    const dot = pathname.lastIndexOf(".");
    const ext = dot >= 0 ? pathname.slice(dot) : "";
    const mapped = EXT_TO_KIND_AND_TYPE[ext];
    if (mapped) return mapped;

    const qpType = u.searchParams.get("type") || u.searchParams.get("mime");
    if (qpType?.startsWith("video/")) return { as: "video", type: qpType };
    if (qpType?.startsWith("audio/")) return { as: "audio", type: qpType };
  } catch {}

  return { as: "image" };
}

function addPreloadLink(
  url: string,
  asVal: AsType,
  type?: string,
  crossOrigin?: Options["crossOrigin"]
): HTMLLinkElement | null {
  if (typeof document === "undefined" || typeof window === "undefined")
    return null;

  const absHref = new URL(url, window.location.href).href;
  const existing = Array.from(
    document.head.querySelectorAll('link[rel="preload"]')
  ).some((el) => (el as HTMLLinkElement).href === absHref);
  if (existing) return null;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = asVal;
  link.href = absHref;
  if (type) link.type = type;
  if (crossOrigin) link.crossOrigin = crossOrigin;
  document.head.appendChild(link);
  return link;
}

export function usePreloadMedia(
  inputUrls: Iterable<string> | null | undefined,
  options?: Options
) {
  const {
    crossOrigin,
    audioPreload = "metadata",
    videoPreload = "metadata",
    primeCache = true,
  } = options || {};

  const urls = useMemo(() => {
    if (!inputUrls) return [] as string[];
    return Array.from(new Set(Array.from(inputUrls).filter(Boolean)));
  }, [inputUrls]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const createdLinks: HTMLLinkElement[] = [];
    const createdNodes: (HTMLAudioElement | HTMLVideoElement)[] = [];

    urls.forEach((url) => {
      const { as: asVal, type } = guessKind(url);

      const link = addPreloadLink(url, asVal, type, crossOrigin);
      if (link) createdLinks.push(link);

      if (!primeCache) return;

      if (asVal === "image") {
        const img = new Image();
        if (crossOrigin) img.crossOrigin = crossOrigin;
        img.src = url;
      } else if (asVal === "audio") {
        const audio = document.createElement("audio");
        audio.preload = audioPreload;
        if (crossOrigin) audio.crossOrigin = crossOrigin;
        audio.src = url;
        audio.style.display = "none";
        document.body.appendChild(audio);
        audio.load();
        createdNodes.push(audio);
      } else if (asVal === "video") {
        const video = document.createElement("video");
        video.preload = videoPreload;
        video.muted = true;
        video.playsInline = true;
        if (crossOrigin) video.crossOrigin = crossOrigin;
        video.src = url;
        video.style.display = "none";
        document.body.appendChild(video);
        video.load();
        createdNodes.push(video);
      } else {
      }
    });

    return () => {
      createdNodes.forEach((n) => n.remove());
      createdLinks.forEach((l) => l.remove());
    };
  }, [urls, crossOrigin, audioPreload, videoPreload, primeCache]);
}
