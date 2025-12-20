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
  const t = useTranslations("BackHeaderRootPages");
  const locale = useLocale();

  const ua = useMemo(
    () => (typeof navigator !== "undefined" ? navigator.userAgent || "" : ""),
    []
  );

  // Heuristics for banner visibility
  useEffect(() => {
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    const isWebView = /wv|webview|FBAN|FBAV|Instagram|TikTok/i.test(ua);
    const isStandalone =
      typeof window !== "undefined" &&
      (window.matchMedia("(display-mode: standalone)").matches ||
        (navigator as any).standalone);

    setShowGetApp((isIOS || isAndroid) && !isWebView && !isStandalone);
  }, [ua]);

  const store = useMemo(() => {
    if (/iPhone|iPad|iPod/i.test(ua))
      return { href: IOS_APPSTORE_URL, label: t("appBanner.get") };
    return { href: ANDROID_PLAY_URL, label: t("appBanner.get") };
  }, [ua, t]);

  const handleDismiss = () => setShowGetApp(false);

  return (
    <header className="sticky z-50 top-0 w-full lg:hidden ">
      {/* Smart App Banner */}
      {showGetApp && (
        <div
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="bg-primary-bg-gradient py-2 pt-12 px-3 flex items-center justify-between text-white border-b border-white/10"
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
      <div className="bg-primary-bg-gradient flex justify-between items-center p-3 text-white shadow-md ">
        <div className="flex items-center gap-3">
          <div className="border-2 border-white/50 h-[52px] w-[52px] rounded-full relative overflow-hidden shadow-inner bg-gray-100">
            <Image
              src={user?.picture?.downloadUrl ?? "/staticImages/profile.svg"}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-bold truncate max-w-[120px]">
              {user?.fullName || t("appBanner.guest")}
            </p>
            <Link
              href="/plans"
              className="mt-1 bg-white rounded-md text-error px-3 py-0.5 flex items-center gap-1.5 relative w-fit shadow-sm active:scale-95 transition-transform"
            >
              <span className="text-[10px] font-bold whitespace-nowrap">
                {t("remaining-games")}:{" "}
                {user?.gPoint ? Math.round(user.gPoint / 100) : 0}
              </span>
              <div className="bg-error text-white rounded-sm p-0.5 shadow-sm">
                <PlusIcon size={10} />
              </div>
            </Link>
          </div>
        </div>

        <button className="active:scale-90 transition-transform">
          <Image
            alt="Badge"
            width={54}
            height={54}
            src="/icons/beginner-icon.svg"
          />
        </button>
      </div>
    </header>
  );
}
