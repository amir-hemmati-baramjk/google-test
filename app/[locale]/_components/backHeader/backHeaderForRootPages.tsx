"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CloseRoundIcon } from "../icons/CloseRoundIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { useUser } from "@/stores/userContext";

const ANDROID_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.baramjk.falta";
const IOS_APPSTORE_URL =
  "https://apps.apple.com/us/app/falta-%D9%81%D9%84%D8%AA%D9%87/id6743669553";

export default function BackHeaderForRootPages() {
  const { user } = useUser();
  const [showGetApp, setShowGetApp] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // To handle hydration
  const t = useTranslations("BackHeaderRootPages");
  const locale = useLocale();

  /** Set mounted state */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const ua = useMemo(() => {
    if (typeof navigator === "undefined") return "";
    return navigator.userAgent || navigator.vendor || "";
  }, []);

  /** Device detection Helpers */
  const isIOSDevice = () => {
    if (typeof navigator === "undefined") return false;
    const iOSUA = /iPhone|iPad|iPod/i.test(ua);
    const iPadOnMac =
      navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    return iOSUA || iPadOnMac;
  };

  const isAndroidDevice = () => /Android/i.test(ua);

  const isInAppBrowser = () =>
    /FBAN|FBAV|Instagram|Line|TikTok|Twitter|OKApp|Pinterest/i.test(ua);

  const isStandalonePWA = () => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone
    );
  };

  const isWebView = () => {
    if (typeof window === "undefined") return false;
    const w = window as any;
    const isIOSWV =
      isIOSDevice() &&
      (!!w.webkit ||
        !!w.flutter_inappwebview ||
        !!w.FaltaApp ||
        isInAppBrowser());
    const isAndroidWV =
      isAndroidDevice() &&
      (/; wv\)/i.test(ua) ||
        /Version\/[\d.]+\s+Chrome\//i.test(ua) ||
        /MY_FLUTTER_WEBVIEW/i.test(ua));
    return isIOSWV || isAndroidWV;
  };

  /** Decide when to show banner */
  useEffect(() => {
    if (!isMounted) return;

    const isMobile = isIOSDevice() || isAndroidDevice();
    const shouldShow = isMobile && !isWebView() && !isStandalonePWA();

    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem("app-banner-dismissed");

    if (shouldShow && !isDismissed) {
      setShowGetApp(true);
    }
  }, [isMounted, ua]);

  const handleDismiss = () => {
    setShowGetApp(false);
    sessionStorage.setItem("app-banner-dismissed", "true");
  };

  const store = useMemo(() => {
    if (isIOSDevice()) return { href: IOS_APPSTORE_URL, label: "Get" };
    if (isAndroidDevice()) return { href: ANDROID_PLAY_URL, label: "Get" };
    return { href: "#", label: "Get" };
  }, [ua]);

  // Don't render browser-specific logic on server
  if (!isMounted) return null;

  return (
    <header className=" z-50 top-0 w-full lg:hidden">
      {/* Smart App Banner */}
      {showGetApp && (
        <div
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="bg-primary-bg-gradient py-2  px-3 flex items-center justify-between text-white border-b border-white/10"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white transition-colors"
            >
              <CloseRoundIcon size={24} />
            </button>
            <div className="bg-white p-1.5 rounded-[12px] shadow-sm">
              <Image alt="Logo" width={32} height={32} src="/icons/logo.svg" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">{t("falta")}</p>
              <p className="text-[10px] opacity-90">
                {t("appBanner.download")}
              </p>
            </div>
          </div>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href={store.href}
            className="text-secondary text-xs font-bold px-5 py-1.5 rounded-full bg-white shadow-sm active:scale-95 transition-transform"
          >
            {store.label}
          </a>
        </div>
      )}

      {/* Main Header Content */}
      <div
        className={`bg-primary-bg-gradient flex justify-between items-center p-3 text-white shadow-md ${
          showGetApp ? "pt-12 md:pt-2" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className="border-2 border-white/50 h-[52px] w-[52px] rounded-full relative overflow-hidden shadow-inner bg-gray-100 block"
          >
            <Image
              src={user?.picture?.downloadUrl ?? "/staticImages/profile.svg"}
              alt="Profile"
              fill
              className="object-cover"
            />
          </Link>
          <div className="flex flex-col">
            <p className="text-lg font-bold truncate max-w-[120px]">
              {user?.fullName || t("appBanner.guest")}
            </p>
            {/* <Link
              href="/plans"
              className="mt-1 relative bg-white rounded-md text-error px-3 py-0.5 flex items-center gap-1.5  w-fit shadow-sm "
            >
              <span className="text-[14px] font-bold whitespace-nowrap">
                {t("remaining-games")}:{" "}
                {user?.gPoint ? Math.round(user.gPoint / 100) : 0}
              </span>
              <div className="bg-error text-white rounded-sm p-0.5 shadow-sm absolute -top-2 -right-2">
                <PlusIcon size={10} />
              </div>
            </Link> */}
          </div>
        </div>

        <Link
          href="/plans"
          className="mt-1 relative bg-white rounded-md text-error px-3 py-1.5 flex items-center gap-1.5  w-fit shadow-sm "
        >
          <span className="text-[16px] font-bold whitespace-nowrap">
            {t("remaining-games")}:{" "}
            {user?.gPoint ? Math.round(user.gPoint / 100) : 0}
          </span>
          <div className="bg-error text-white rounded-full p-0.5 shadow-sm absolute -top-2 -right-2">
            <PlusIcon size={20} />
          </div>
        </Link>
      </div>
    </header>
  );
}
