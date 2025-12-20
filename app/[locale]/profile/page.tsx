"use client";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import BackHeaderForRootPages from "../_components/backHeader/backHeaderForRootPages";
import { ArrowRightIcon, WalletIcon } from "lucide-react";

// Icons
import { PrivacyPolicyIcon } from "../_components/icons/PrivacyPolicyIcon";
import { LanguageIcon } from "../_components/icons/LanguageIcon";
import { ContactUsIcon } from "../_components/icons/ContactUsIcon";
import { AboutIcon } from "../_components/icons/AboutIcon";
import { ChangePasswordIcon } from "../_components/icons/ChangePasswordIcon";
import { ProfileIcon } from "../_components/icons/ProfileIcon";
import { AverageRatingIcon } from "../_components/icons/AverageRatingIcon";
import { WinRateIcon } from "../_components/icons/WinRateIcon";
import { QuestionsAvailableIcon } from "../_components/icons/QuestionsAvailableIcon";
import { TournamentIcon } from "../_components/icons/TournamentIcon";

import { changeUserLanguageService } from "@/core/user/change-user-language-service";
import { useUser } from "@/stores/userContext";
import { usePathname, useRouter } from "@/i18n/navigation";
import { toast } from "react-toastify";
import LoginModal from "../create-game/_components/LoginModal";

export default function ProfilePage() {
  const t = useTranslations("profile");
  const tMenu = useTranslations("profile.menuItems");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const router = useRouter();
  const pathname = usePathname();

  const { user, setUser, setLanguage } = useUser();
  const isLoggedIn = !!user;

  const [showLoginModal, setShowLoginModal] = useState(false);

  const changeLanguage = async () => {
    const nextLocale = locale === "ar" ? "en" : "ar";

    // 1. If user is NOT logged in, just change local state and route
    if (!isLoggedIn) {
      setLanguage(nextLocale);
      router.replace({ pathname }, { locale: nextLocale });
      return;
    }

    // 2. If user IS logged in, call the API to save preference
    try {
      const res = await changeUserLanguageService(user?.language ?? 0);
      if (res?.success) {
        const updatedUser = {
          ...user,
          language: nextLocale === "ar" ? 1 : 0,
        };
        setUser(updatedUser as any);
        setLanguage(nextLocale);
        router.replace({ pathname }, { locale: nextLocale });
      } else {
        toast.error(res?.errors ?? "Failed to switch language");
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    }
  };

  const stats = [
    {
      id: 1,
      icon: TournamentIcon,
      color: "bg-green-gradient",
      value: "15000",
      label: "tournament",
    },
    {
      id: 2,
      icon: QuestionsAvailableIcon,
      color: "bg-light-blue-gradient",
      value: "15000",
      label: "questionsAvailable",
    },
    {
      id: 3,
      icon: AverageRatingIcon,
      color: "bg-light-purple-gradient",
      value: "15000",
      label: "averageRating",
    },
    {
      id: 4,
      icon: WinRateIcon,
      color: "bg-light-orange-gradient",
      value: "15000",
      label: "winRate",
    },
  ];

  const menuItems = [
    {
      key: "personalInformation",
      icon: ProfileIcon,
      color: "bg-light-blue-gradient",
      href: "/profile/Info",
      requiresAuth: true,
    },
    {
      key: "wallet",
      icon: WalletIcon,
      color: "bg-green-gradient",
      href: "/profile/wallet",
      requiresAuth: true,
    },
    {
      key: "changePassword",
      icon: ChangePasswordIcon,
      color: "bg-red",
      href: "/profile/changePassword",
      requiresAuth: true,
    },
    {
      key: "aboutFalta",
      icon: AboutIcon,
      color: "bg-light-purple-gradient",
      href: "/aboutUs",
      requiresAuth: false,
    },
    {
      key: "contactUs",
      icon: ContactUsIcon,
      color: "bg-emerald-600",
      href: "/contactUs",
      requiresAuth: false,
    },
    {
      key: "language",
      icon: LanguageIcon,
      color: "bg-primary-bg-gradient",
      onClick: () => changeLanguage(),
      requiresAuth: false,
    },
    {
      key: "privacyPolicy",
      icon: PrivacyPolicyIcon,
      color: "bg-gray-500",
      href: "/privacy",
      requiresAuth: false,
    },
  ];

  const handleItemClick = (item: (typeof menuItems)[0]) => {
    if (item.requiresAuth && !isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <div className="pb-24">
      <BackHeaderForRootPages />

      <div className="flex flex-col items-center gap-8 px-5 mt-10 mx-auto text-white lg:container">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold lg:text-4xl">{t("title")}</h1>
          <p className="text-lg font-bold lg:text-2xl opacity-90">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-5">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-[20px] p-4 flex flex-col gap-3 justify-center items-center shadow-sm"
            >
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                <stat.icon size={36} />
              </div>
              <p className="text-primary font-bold text-lg">{stat.value}</p>
              <p className="text-primary font-medium text-sm text-center">
                {t(`stats.${stat.label}`)}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleItemClick(item)}
              className={`bg-white rounded-[20px] px-4 py-5 lg:py-10 flex gap-4 justify-between items-center w-full hover:bg-gray-50 transition-all group shadow-sm active:scale-[0.98] text-start ${
                item?.requiresAuth ? "hidden" : ""
              }`}
            >
              <div className="flex gap-5 items-center">
                <div className={`${item.color} p-2 rounded-xl text-white`}>
                  <item.icon size={32} />
                </div>
                <div>
                  <p className="text-primary font-bold">
                    {tMenu(`${item.key}.title`)}
                  </p>
                  <p className="text-primary/70 text-sm">
                    {tMenu(`${item.key}.description`)}
                  </p>
                </div>
              </div>
              <ArrowRightIcon
                size={30}
                className={`text-secondary transition-transform ${
                  isRTL
                    ? "rotate-180 group-hover:-translate-x-2"
                    : "group-hover:translate-x-2"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
