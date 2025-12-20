"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { startGoogleRedirect, startAppleRedirect } from "@/lib/firebase";
import Image from "next/image";
import {
  AUTH_ORIGIN,
  callExternalLogin,
  cleanQueryParams,
  readFromHash,
  readFromWindowName,
} from "@/core/auth/social-login-service";
import { useUser } from "@/stores/userContext";
import { sendAppTokenToServer } from "@/core/auth/set-app-token-notification";

import { Button } from "../../_components/button/button";
import { AppleIcon } from "../../_components/icons/AppleIcon";
import { GoogleIcon } from "../../_components/icons/GoogleIcon";
import {
  SocialLoginPayload,
  SocialProvider,
  WnPayload,
} from "@/type/api/auth/auth.types";
export default function LoginButtons() {
  const t = useTranslations("social-login");
  const router = useRouter();
  const { setIsLogin } = useUser();
  const [loading, setLoading] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const processWindowNameLogin = async (): Promise<boolean> => {
    setStatus(t("processing"));

    let wn: WnPayload | null = readFromHash();

    if (!wn) {
      wn = readFromWindowName();
    }

    try {
      window.name = "";
    } catch {}

    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    if (wn?.idToken) {
      if (wn.exp && Date.now() > wn.exp) {
        setStatus(t("timeout"));
        cleanQueryParams();
        return false;
      }

      try {
        const payload: SocialLoginPayload = {
          Provider: wn.provider,
          IdToken: wn.idToken,
          Email: wn.email ?? undefined,
          FullName: wn.name ?? undefined,
        };

        await callExternalLogin(payload);
        await finalizeLogin();
        return true;
      } catch (e: any) {
        const msg = e?.message || t("error");
        setStatus(msg);
        cleanQueryParams();
        return false;
      }
    }

    return false;
  };

  const finalizeLogin = async (): Promise<void> => {
    setStatus(t("success"));
    try {
      setIsLogin(true);
      await sendAppTokenToServer();
    } catch (error) {
      console.error("Error in finalizeLogin:", error);
    }
    cleanQueryParams();
    router.push("/login/success");
  };

  const processRedirectLogin = async (sid: string): Promise<void> => {
    setStatus(t("processing"));

    return new Promise((resolve, reject) => {
      const onMessage = (ev: MessageEvent) => {
        // Check message origin for security
        if (ev.origin !== AUTH_ORIGIN) return;

        const {
          type,
          sid: incomingSid,
          data,
        } = (ev.data || {}) as {
          type?: string;
          sid?: string;
          data?: any;
        };

        if (type !== "social-relay" || incomingSid !== sid) return;

        window.removeEventListener("message", onMessage);

        if (!data?.ok || !data?.token) {
          setStatus(t("error"));
          cleanQueryParams();
          reject(new Error("Invalid token data"));
          return;
        }

        const url = new URL(window.location.href);
        const providerUrl = Number(
          url.searchParams.get("provider")
        ) as SocialProvider | null;

        const payload: SocialLoginPayload = {
          Provider: providerUrl ?? data.provider,
          IdToken: data.token,
          Email: data.email ?? undefined,
          FullName: data.name ?? undefined,
        };

        callExternalLogin(payload)
          .then(() => finalizeLogin().then(resolve))
          .catch((e: any) => {
            const msg = e?.message || t("error");
            setStatus(msg);
            cleanQueryParams();
            reject(e);
          });
      };

      window.addEventListener("message", onMessage);

      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = `${AUTH_ORIGIN}/token-relay.html?sid=${encodeURIComponent(
        sid
      )}&origin=${encodeURIComponent(window.location.origin)}`;
      document.body.appendChild(iframe);

      const timeout = window.setTimeout(() => {
        window.removeEventListener("message", onMessage);
        setStatus(t("timeout"));
        cleanQueryParams();
        reject(new Error("Timeout"));
      }, 12000);

      // Cleanup function
      return () => {
        window.clearTimeout(timeout);
        window.removeEventListener("message", onMessage);
        if (iframe && iframe.parentNode) iframe.parentNode.removeChild(iframe);
      };
    });
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const social = url.searchParams.get("social");
    const sid = url.searchParams.get("sid");

    const handleSocialLogin = async () => {
      if (social === "wn") {
        await processWindowNameLogin();
      } else if (sid && social === "pending") {
        try {
          await processRedirectLogin(sid);
        } catch (error) {
          console.error("Redirect login failed:", error);
        }
      }
    };

    handleSocialLogin();
  }, []);

  const handleSocialLogin = async (provider: "google" | "apple") => {
    try {
      setLoading(provider === "google" ? "gredir" : "aredir");

      if (provider === "google") {
        await startGoogleRedirect();
      } else {
        await startAppleRedirect();
      }
    } catch (error) {
      console.error(`${provider} login error:`, error);
      setStatus(t("error"));
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-5 text-[14px]">
      {/* Social login buttons */}
      <div className="flex gap-3">
        <Button
          variant="white"
          onClick={() => handleSocialLogin("google")}
          disabled={loading !== null}
          animatedIcon
          size="large"
          shape="rounded"
          className="!bg-[#F4F5F6] !text-accent !font-bold !text-[14px] !text-nowrap w-full !px-3 !gap-4"
        >
          {loading === "gredir" ? t("redirecting") : t("loginGoogleRedirect")}
          <GoogleIcon size={36} className="bg-[#ccc] p-1 rounded-full" />
        </Button>
        <Button
          variant="white"
          onClick={() => handleSocialLogin("apple")}
          disabled={loading !== null}
          animatedIcon
          shape="rounded"
          size="large"
          className="!bg-[#F4F5F6] !text-accent !font-bold !text-[14px] !text-nowrap w-full !px-3 !gap-4"
        >
          {loading === "aredir" ? t("redirecting") : t("loginAppleRedirect")}
          <AppleIcon size={36} className="bg-[#ccc] p-1 rounded-full" />
        </Button>
        {/* <button
          className="py-2 flex justify-center items-center gap-2 bg-[#efefef] font-bold text-primary w-1/2 rounded-[8px] disabled:opacity-50 transition-opacity"
          onClick={() => handleSocialLogin("apple")}
          disabled={loading !== null}
        >
          <p className="text-sm">
            {loading === "aredir" ? t("redirecting") : t("loginAppleRedirect")}
          </p>
          <Image
            alt="apple-logo"
            src="/assets/icons/apple.svg"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </button> */}
      </div>

      {/* Status display */}
      {status && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-center text-sm">
          {status}
        </div>
      )}
    </div>
  );
}
