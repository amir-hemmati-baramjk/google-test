"use client";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import BackHeaderForRootPages from "../_components/backHeader/backHeaderForRootPages";
import { ArrowRightIcon, WalletIcon } from "lucide-react";
import {
  motion,
  Variants,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";

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
import { Button } from "../_components/button/button";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};
const Counter = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = React.useState(0);
  const target = parseInt(value.replace(/,/g, ""));

  React.useEffect(() => {
    const controls = animate(0, target, {
      duration: 2,
      onUpdate: (value) => setDisplayValue(Math.floor(value)),
    });
    return () => controls.stop();
  }, [target]);

  return <span>{displayValue.toLocaleString()}</span>;
};
export default function ProfilePage() {
  const t = useTranslations("profile");
  const tMenu = useTranslations("profile.menuItems");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const router = useRouter();
  const pathname = usePathname();

  const { user, setUser, setLanguage, isLogin } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const changeLanguage = async () => {
    const nextLocale = locale === "ar" ? "en" : "ar";

    if (!isLogin) {
      setLanguage(nextLocale);
      router.replace({ pathname }, { locale: nextLocale });
      const updatedUser = {
        language: nextLocale === "ar" ? 1 : 0,
      };
      setUser(updatedUser as any);
      return;
    }

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
      value: "12400",
      label: "questionsAvailable",
    },
    {
      id: 3,
      icon: AverageRatingIcon,
      color: "bg-light-purple-gradient",
      value: "4800",
      label: "averageRating",
    },
    {
      id: 4,
      icon: WinRateIcon,
      color: "bg-light-orange-gradient",
      value: "85",
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
    if (item.requiresAuth && !isLogin) {
      setShowLoginModal(true);
      return;
    }
    if (item.onClick) item.onClick();
    else if (item.href) router.push(item.href);
  };

  return (
    <>
      <div className="pb-24">
        <BackHeaderForRootPages />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-8 px-5 mt-10 mx-auto text-white lg:max-w-[1400px]"
        >
          <motion.div
            variants={itemVariants}
            className="text-center space-y-5 lg:space-y-10"
          >
            <h1 className="text-3xl lg:text-7xl font-black text-center tracking-tight">
              {t("title")}
            </h1>
            <p className="text-lg font-medium lg:text-2xl opacity-80 uppercase tracking-widest">
              {t("subtitle")}
            </p>
          </motion.div>
          {!isLogin && (
            <div className="bg-white rounded-[24px] px-5 py-6 lg:py-10 flex gap-4 justify-between items-center w-full group shadow-md transition-all lg:max-w-[50%] text-start border border-transparent hover:border-secondary/20">
              <div>
                <p className="text-primary font-black text-lg lg:text-2xl">
                  {t("welcome-guest")}
                </p>
                <p className="text-primary/60 text-sm lg:text-xl font-medium">
                  {t("login-hint")}
                </p>
              </div>
              <Button
                onClick={() => router.push("/login")}
                className="font-bold !text-[14px] lg:!text-[20px] whitespace-nowrap"
                variant="secondary"
              >
                {t("login")}
              </Button>
            </div>
          )}
          {/* <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 lg:grid-cols-4 w-full gap-2 lg:gap-5"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-[24px] p-6 flex flex-col gap-3 justify-center items-center shadow-lg border border-white/20"
              >
                <div
                  className={`${stat.color} p-4 rounded-2xl text-white shadow-md`}
                >
                  <stat.icon size={36} />
                </div>
                <p className="text-primary font-black text-2xl lg:text-3xl">
                  <Counter value={stat.value} />
                  {stat.label === "winRate" ? "%" : ""}
                </p>
                <p className="text-primary/60 font-bold text-xs uppercase tracking-tighter text-center">
                  {t(`stats.${stat.label}`)}
                </p>
              </motion.div>
            ))}
          </motion.div> */}

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full"
          >
            {menuItems.map((item) => (
              <motion.button
                key={item.key}
                variants={itemVariants}
                onClick={() => handleItemClick(item)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-white rounded-[24px] px-6 py-6 lg:py-10 flex gap-4 justify-between items-center w-full group shadow-md transition-all text-start border border-transparent hover:border-secondary/20 ${
                  item?.requiresAuth && !isLogin ? "hidden" : ""
                }`}
              >
                <div className="flex gap-5 items-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    className={`${item.color} p-3 rounded-2xl text-white shadow-sm`}
                  >
                    <item.icon size={32} />
                  </motion.div>
                  <div>
                    <p className="text-primary font-black text-lg lg:text-2xl">
                      {tMenu(`${item.key}.title`)}
                    </p>
                    <p className="text-primary/60 text-sm lg:text-xl font-medium">
                      {tMenu(`${item.key}.description`)}
                    </p>
                  </div>
                </div>
                <div className="bg-secondary/10 p-2 rounded-full group-hover:bg-secondary transition-colors">
                  <ArrowRightIcon
                    size={24}
                    className={`text-secondary group-hover:text-white transition-transform ${
                      isRTL
                        ? "rotate-180 group-hover:-translate-x-1"
                        : "group-hover:translate-x-1"
                    }`}
                  />
                </div>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </div>
      {/* 
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      /> */}
    </>
  );
}
