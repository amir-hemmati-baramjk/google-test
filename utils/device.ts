import { v4 as uuidv4 } from "uuid";

const COOKIE_KEY = "device_id";

// Generate or return a persistent device_id cookie
export function getOrCreateDeviceId(): string {
  const existing = getCookie(COOKIE_KEY);
  if (existing) return existing;

  const newId = uuidv4();

  // Set cookie expiration for 1 year
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  document.cookie = `${COOKIE_KEY}=${newId}; path=/; SameSite=Lax; expires=${expires.toUTCString()}`;

  return newId;
}

// Helper to read cookie
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}
