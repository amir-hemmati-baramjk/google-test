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
  const [openlabelModal, setOpenlabelModal] = useState(false);
  const [showGetApp, setShowGetApp] = useState(false);
  const t = useTranslations("index");
  const locale = useLocale();

  const ua = useMemo(() => {
    if (typeof navigator === "undefined") return "";
    return navigator.userAgent || navigator.vendor || "";
  }, []);

  /* Device detection */
  function isIOSDevice() {
    if (typeof navigator === "undefined") return false;
    const iOSUA = /iPhone|iPad|iPod/i.test(ua);
    const iPadOnMac =
      navigator.platform === "MacIntel" &&
      (navigator as any).maxTouchPoints > 1;
    return iOSUA || iPadOnMac;
  }

  function isAndroidDevice() {
    if (typeof navigator === "undefined") return false;
    return /Android/i.test(ua);
  }

  function isInAppBrowser() {
    if (typeof navigator === "undefined") return false;
    return /FBAN|FBAV|Instagram|Line|TikTok|Twitter|OKApp|Pinterest/i.test(ua);
  }

  /* iOS WebView detection (heuristic only, no marker) */
  function isIOSWebView() {
    if (typeof window === "undefined" || typeof navigator === "undefined")
      return false;

    const w = window as any;

    const explicitMarkers = !!w.flutter_inappwebview || !!w.FaltaApp;

    const isKnownIOSBrowser =
      /(CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo|Brave)/i.test(ua);

    const isWKHeuristic =
      isIOSDevice() &&
      typeof (w as any).webkit !== "undefined" &&
      typeof (w as any).safari === "undefined" &&
      !isKnownIOSBrowser;

    return explicitMarkers || isInAppBrowser() || isWKHeuristic;
  }

  /* Android WebView detection (marker-based) */
  function isAndroidWebView() {
    if (typeof navigator === "undefined") return false;
    const isFlutterWV = /MY_FLUTTER_WEBVIEW/i.test(ua); // marker for Android
    return (
      /; wv\)/i.test(ua) ||
      /Version\/[\d.]+\s+Chrome\//i.test(ua) ||
      isInAppBrowser() ||
      isFlutterWV
    );
  }

  function isStandalonePWA() {
    if (typeof window === "undefined" || typeof navigator === "undefined")
      return false;

    return (
      (window.matchMedia &&
        window.matchMedia("(display-mode: standalone)").matches) ||
      (navigator as any).standalone === true
    );
  }

  /* Unified real browser check */
  function isRealBrowser() {
    if (typeof navigator === "undefined") return false;
    // If Android marker exists → WebView, not real browser
    if (/MY_FLUTTER_WEBVIEW/i.test(ua)) return false;
    // Otherwise, rely on heuristics
    return !/wv|webview/i.test(ua);
  }

  /* Decide when to show banner */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const shouldShowIOS =
      isIOSDevice() && isRealBrowser() && !isIOSWebView() && !isStandalonePWA();

    const shouldShowAndroid =
      isAndroidDevice() &&
      isRealBrowser() &&
      !isAndroidWebView() &&
      !isStandalonePWA();

    setShowGetApp(shouldShowIOS || shouldShowAndroid);
  }, [ua]);

  const handleOnLabelClick = () => setOpenlabelModal(true);
  const handleDismiss = () => setShowGetApp(false);

  const store = useMemo(() => {
    if (isIOSDevice() && isRealBrowser() && !isIOSWebView()) {
      return { href: IOS_APPSTORE_URL, label: "Get" };
    }
    if (isAndroidDevice() && isRealBrowser() && !isAndroidWebView()) {
      return { href: ANDROID_PLAY_URL, label: "Get" };
    }
    return null;
  }, [ua]);

  return (
    <>
      <div className="sticky top-0 bg-primary-bg-gradient lg:hidden">
        {showGetApp && store ? (
          <div
            dir={locale === "ar" ? "ltr" : "rtl"}
            className="py-2 px-3 w-full flex items-center justify-between text-white"
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={store.href}
              className="text-secondary px-5 py-1 h-fit rounded-full  bg-[#EEE5FD]"
            >
              {store.label}
            </a>

            <div className="w-fit flex justify-center items-center gap-2">
              <div className="flex text-end flex-col justify-start gap-1">
                <p className="text-[18px] font-bold">{t("falta")}</p>
                <p className="text-[12px]">{t("download-app")}</p>
              </div>
              <div className="flex justify-center bg-white p-2 rounded-[16px] w-fit">
                <Image
                  alt="Falta logo"
                  width={40}
                  height={40}
                  src={"/icons/logo.svg"}
                />
              </div>

              <button
                onClick={handleDismiss}
                aria-label="dismiss get app banner"
                className="text-white text-[30px] "
              >
                <CloseRoundIcon />
              </button>
            </div>
          </div>
        ) : (
          <div />
        )}

        <div className="flex justify-between p-3 text-primary-content w-full ">
          <div className="flex justify-center items-center gap-2">
            <div className="border bg-white border-white h-[60px] w-[60px] rounded-full relative overflow-hidden">
              <Image
                src={user?.picture?.downloadUrl ?? "/staticImages/profile.svg"}
                alt="User profile photo"
                fill
              />
            </div>
            <div className="flex flex-col text-white gap-1">
              <p className="text-[14px]">{user?.fullName ?? ""}</p>
              <Link
                href={"/plans"}
                className="bg-white rounded-md text-error px-4 py-[3px] relative"
              >
                <p className="text-[12px]">
                  {t("remaining-games")}{" "}
                  {user?.gPoint
                    ? Math.round((user?.gPoint as number) / 100)
                    : 0}
                </p>
                <p className="absolute bg-error text-white font-bold w-4 rounded-[5px] text-[18px] h-4 flex justify-center items-center text-center top-[-5px] left-[-5px]">
                  <PlusIcon />
                </p>
              </Link>
            </div>
          </div>

          <div onClick={handleOnLabelClick}>
            <Image
              alt="user profile"
              width={60}
              height={60}
              src={"/icons/beginner-icon.svg"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
