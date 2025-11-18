import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getMessaging,
  getToken,
  isSupported,
  type Messaging,
} from "firebase/messaging";
import {
  getAuth,
  browserLocalPersistence,
  setPersistence,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  type UserCredential,
  type User,
} from "firebase/auth";

import { fcmAppTokenLS } from "@/localeStorage/storage";
import { sendAppTokenToServer } from "@/core/auth/set-app-token-notification";
import {
  postSocialLogin,
  postSocialRegister,
} from "../core/auth/social-login-service";
import { SocialLoginPayload, SocialProvider } from "@/type/api/auth/auth.types";

const firebaseConfig = {
  apiKey: "AIzaSyCztssqxJ5ilzjunSzRMOrf8OrMTTYx8zo",
  authDomain: "auth.befalta.com",
  projectId: "falta-782a4",
  storageBucket: "falta-782a4.firebasestorage.app",
  messagingSenderId: "312331038818",
  appId: "1:312331038818:web:309a705275d33ba472213b",
  measurementId: "G-56YLDC1BFD",
};

// Firebase App Initialization
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const db = getFirestore(firebaseApp);

let messaging: Messaging | null = null;

// Browser detection
function isRealBrowser() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return !/wv|webview|Android.*Version\/[\d.]+.*Chrome\/[.0-9]+ Mobile Safari\/[.0-9]+/i.test(
    ua
  );
}

// Initialize Messaging
if (typeof window !== "undefined" && isRealBrowser()) {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(firebaseApp);
    } else {
      console.warn("messagingNotSupported");
    }
  });
}

// FCM Token Management
export async function ensureFcmToken() {
  if (!messaging) return;
  const existing = fcmAppTokenLS.get();
  let token = existing;
  if (!token) {
    const perm = await Notification.requestPermission();
    if (perm !== "granted") return;
    token = await getToken(messaging, {
      vapidKey:
        "BD-lkDW7L-DtEf_4lmMo2Gyj7wJXz92t9IPPRHitpVrl5C3WBc0O4J1QneM-3vj1mB_MHWT2ITH6KcdmAWYAl48",
      serviceWorkerRegistration:
        await navigator.serviceWorker.getRegistration(),
    });
    if (!token) return;
  } else {
    const fresh = await getToken(messaging, {
      vapidKey:
        "BD-lkDW7L-DtEf_4lmMo2Gyj7wJXz92t9IPPRHitpVrl5C3WBc0O4J1QneM-3vj1mB_MHWT2ITH6KcdmAWYAl48",
      serviceWorkerRegistration:
        await navigator.serviceWorker.getRegistration(),
    });
    if (fresh && fresh !== existing) token = fresh;
  }
  if (token && token !== existing) {
    fcmAppTokenLS.set(token);
    await sendAppTokenToServer();
  } else if (token && !existing) {
    fcmAppTokenLS.set(token);
    await sendAppTokenToServer();
  }
}

// Auth Initialization
const auth = getAuth(firebaseApp);
setPersistence(auth, browserLocalPersistence).catch(() => {
  console.warn("persistenceFailed");
});

// Providers Setup
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

const appleProvider = new OAuthProvider("apple.com");
appleProvider.addScope("email");
appleProvider.addScope("name");

// Authentication Functions
const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
const signInWithApplePopup = () => signInWithPopup(auth, appleProvider);

// Redirect Management
const REDIRECT_MARKER_KEY = "social:redirect:pending";

type RedirectMarker = { provider: "google" | "apple"; t: number };

function setRedirectMarker(provider: "google" | "apple") {
  try {
    sessionStorage.setItem(
      REDIRECT_MARKER_KEY,
      JSON.stringify({ provider, t: Date.now() } satisfies RedirectMarker)
    );
  } catch {}
}

function getRedirectMarker(): RedirectMarker | null {
  try {
    const raw = sessionStorage.getItem(REDIRECT_MARKER_KEY);
    return raw ? (JSON.parse(raw) as RedirectMarker) : null;
  } catch {
    return null;
  }
}

function clearRedirectMarker() {
  try {
    sessionStorage.removeItem(REDIRECT_MARKER_KEY);
  } catch {}
}

// Redirect URL Helpers
const AUTH_BRIDGE_ORIGIN =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_AUTH_ORIGIN ?? "https://auth.befalta.com"
    : "https://auth.befalta.com";

function buildContinueUrl(override?: string) {
  if (override) return override;
  return typeof window !== "undefined" ? window.location.href : "/";
}

const startGoogleRedirect = (continueUrl?: string) => {
  const cont = buildContinueUrl(continueUrl);
  const url = `${AUTH_BRIDGE_ORIGIN}/login-bridge.html?provider=google&continue=${encodeURIComponent(
    cont
  )}`;
  window.location.href = url;
  return Promise.resolve();
};

const startAppleRedirect = (continueUrl?: string) => {
  const cont = buildContinueUrl(continueUrl);
  const url = `${AUTH_BRIDGE_ORIGIN}/login-bridge.html?provider=apple&continue=${encodeURIComponent(
    cont
  )}`;
  window.location.href = url;
  return Promise.resolve();
};

const getAuthRedirectResult = (): Promise<UserCredential | null> =>
  getRedirectResult(auth);

const logout = () => signOut(auth);

// Social Login Payload Builders
function extractFullName(cred: UserCredential): string | null {
  const u = cred.user;
  const tryDisplay = u.displayName ?? u.providerData?.[0]?.displayName ?? null;
  return tryDisplay || null;
}

async function buildSocialPayload(
  cred: UserCredential,
  provider: SocialProvider
): Promise<SocialLoginPayload> {
  const u = cred.user;
  const idToken = await u.getIdToken();
  return {
    Provider: provider,
    IdToken: idToken,
    Email: u.email ?? null,
    FullName: extractFullName(cred),
  };
}

// Popup Login Functions
async function loginWithGooglePopupAndGetPayload(): Promise<SocialLoginPayload> {
  const cred = await signInWithGooglePopup();
  return buildSocialPayload(cred, 1);
}

async function loginWithApplePopupAndGetPayload(): Promise<SocialLoginPayload> {
  const cred = await signInWithApplePopup();
  return buildSocialPayload(cred, 2);
}

async function loginWithGooglePopupAndPost(endpoint?: string) {
  const payload = await loginWithGooglePopupAndGetPayload();
  return postSocialLogin(payload, endpoint);
}

async function loginWithApplePopupAndPost(endpoint?: string) {
  const payload = await loginWithApplePopupAndGetPayload();
  return postSocialLogin(payload, endpoint);
}

// User State Management
function waitForUser(timeoutMs = 10000): Promise<User | null> {
  return new Promise((resolve) => {
    let settled = false;
    const unsub = onAuthStateChanged(
      auth,
      (user) => {
        if (!settled && user) {
          settled = true;
          unsub();
          resolve(user);
        }
      },
      () => {}
    );
    setTimeout(() => {
      if (!settled) {
        settled = true;
        unsub();
        resolve(auth.currentUser ?? null);
      }
    }, timeoutMs);
  });
}

// Redirect Handler
async function getRedirectPayloadAndProvider(): Promise<{
  payload: SocialLoginPayload;
  provider: SocialProvider;
} | null> {
  const marker = getRedirectMarker();

  const cred = await getAuthRedirectResult();
  console.debug("[firebase] getAuthRedirectResult:", {
    hasCred: !!cred,
    uid: cred?.user?.uid,
    providerId: cred?.providerId,
    pd0: cred?.user?.providerData?.[0]?.providerId,
    marker,
  });

  if (cred?.user) {
    const providerId =
      cred.providerId || cred.user.providerData?.[0]?.providerId || "";
    const provider: SocialProvider = providerId.includes("google") ? 1 : 2;
    const payload = await buildSocialPayload(cred, provider);
    return { payload, provider };
  }

  let u = auth.currentUser;
  console.debug("[firebase] currentUser (pre-wait):", {
    hasUser: !!u,
    providers: (u?.providerData || []).map((p) => p.providerId),
    marker,
  });

  if (!u && marker) {
    u = await waitForUser(10000);
    console.debug("[firebase] currentUser (post-wait):", {
      hasUser: !!u,
      providers: (u?.providerData || []).map((p) => p.providerId),
      marker,
    });
  }

  if (u) {
    const joined = (u.providerData || []).map((p) => p.providerId).join("|");
    let provider: SocialProvider | null = null;
    if (joined.includes("google")) provider = 1;
    else if (joined.includes("apple")) provider = 2;
    else if (marker) provider = marker.provider === "google" ? 1 : 2;

    const idToken = await u.getIdToken();
    const payload: SocialLoginPayload = {
      Provider: (provider ?? 1) as SocialProvider,
      IdToken: idToken,
      Email: u.email ?? null,
      FullName: u.displayName ?? u.providerData?.[0]?.displayName ?? null,
    };
    return { payload, provider: (provider ?? 1) as SocialProvider };
  }

  return null;
}

async function handleRedirectAndPost(endpoint?: string) {
  console.debug("[firebase] handleRedirectAndPost: start");
  const result = await getRedirectPayloadAndProvider();
  console.debug("[firebase] handleRedirectAndPost: payload?", !!result);

  if (!result) {
    return {
      success: false,
      status: 400,
      data: { message: "noResult" },
    };
  }

  clearRedirectMarker();
  return await postSocialLogin(result.payload, endpoint);
}

// Export all functions
export {
  firebaseApp,
  db,
  messaging,
  auth,
  signInWithGooglePopup,
  signInWithApplePopup,
  loginWithGooglePopupAndGetPayload,
  loginWithApplePopupAndGetPayload,
  loginWithGooglePopupAndPost,
  loginWithApplePopupAndPost,
  startGoogleRedirect,
  startAppleRedirect,
  getAuthRedirectResult,
  handleRedirectAndPost,
  logout,
  buildSocialPayload,
  getRedirectPayloadAndProvider,
  setRedirectMarker,
  clearRedirectMarker,
};
