type StorageAPI = {
  get: () => string | null | boolean;
  set: (newValue: string | boolean) => boolean;
  remove: () => void;
};

const memoryStore = new Map<string, string>();
const isClient = () => typeof window !== "undefined";

function storageAvailable(kind: "local" | "session"): boolean {
  if (!isClient()) return false;
  try {
    const s = kind === "local" ? window.localStorage : window.sessionStorage;
    const p = "__probe__";
    s.setItem(p, "1");
    s.removeItem(p);
    return true;
  } catch {
    return false;
  }
}

function safeGet(kind: "local" | "session", key: string): string | null {
  try {
    if (storageAvailable(kind)) {
      const s = kind === "local" ? window.localStorage : window.sessionStorage;
      return s.getItem(key);
    }
  } catch {}
  return memoryStore.get(key) ?? null;
}

function safeSet(kind: "local" | "session", key: string, val: string): boolean {
  try {
    if (storageAvailable(kind)) {
      const s = kind === "local" ? window.localStorage : window.sessionStorage;
      s.setItem(key, val);
    }
  } catch {}
  memoryStore.set(key, val);
  return true;
}

function safeRemove(kind: "local" | "session", key: string) {
  try {
    if (storageAvailable(kind)) {
      const s = kind === "local" ? window.localStorage : window.sessionStorage;
      s.removeItem(key);
    }
  } catch {
    // ignore
  }
  memoryStore.delete(key);
}

const initLocalStorageApi = (key: string): StorageAPI => ({
  get: () => {
    if (!isClient()) return false;
    const v = safeGet("local", key);
    return v === "true" ? true : v === "false" ? false : v;
  },
  set: (newValue: string | boolean) => {
    if (!isClient()) return false;
    return safeSet("local", key, String(newValue));
  },
  remove: () => {
    if (!isClient()) return;
    safeRemove("local", key);
  },
});

const initSessionStorageApi = (key: string): StorageAPI => ({
  get: () => {
    if (!isClient()) return false;
    const v = safeGet("session", key);
    return v === "true" ? true : v === "false" ? false : v;
  },
  set: (newValue: string | boolean) => {
    if (!isClient()) return false;
    return safeSet("session", key, String(newValue));
  },
  remove: () => {
    if (!isClient()) return;
    safeRemove("session", key);
  },
});

// Prefix
const LS_PREFIX = process.env.NEXT_PUBLIC_LS_PREFIX || "";
const withPrefix = (key: string) => `${LS_PREFIX}${key}`;

export const refreshTokenLS = initLocalStorageApi(withPrefix("refreshToken"));
export const accessTokenLs = initLocalStorageApi(withPrefix("accessToken"));
export const userDataSS = initSessionStorageApi(withPrefix("userData"));
export const isLoginLS = initLocalStorageApi(withPrefix("isLogin"));
export const localLangLS = initLocalStorageApi("locallang");
export const CompleteRegistrationLS = initLocalStorageApi(
  withPrefix("CompleteRegistration")
);
export const SelectedCategoryForCreateGameLs = initLocalStorageApi(
  withPrefix("SelectedCategoryForCreateGame")
);

export const fcmAppTokenLS = initLocalStorageApi(withPrefix("fcmAppToken"));
