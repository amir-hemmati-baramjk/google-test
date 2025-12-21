"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion"; // Added motion
import { Button } from "../../button/button";
import { Variant } from "../../../../../type/components/variant.type";
import { Link } from "@/i18n/routing";
import { useUser } from "@/stores/userContext";
import LoginModal from "@/app/[locale]/create-game/_components/LoginModal";

export default function ActionCard() {
  const t = useTranslations("homepage");
  const { user } = useUser();
  const isLoggedIn = !!user;
  const [showLoginModal, setShowLoginModal] = useState(false);

  const items = [
    {
      title: t("my-game"),
      buttonText: t("continue"),
      buttonVarient: "primary-bg-gradient",
      icons: "/icons/logo.svg",
      textVarient: "secondary",
      link: "/my-game",
      requiresAuth: true,
    },
    {
      title: t("choose-categories"),
      buttonText: t("create-game"),
      buttonVarient: "secondary-gradient",
      icons: "/icons/logo.svg",
      textVarient: "secondary",
      link: "/create-game",
      requiresAuth: false,
    },
    {
      title: t("remaining-games"),
      buttonText: t("buy-games"),
      buttonVarient: "turquoise-gradient",
      key: "GameCount",
      textVarient: "secondary",
      link: "/plans",
      requiresAuth: false,
    },
  ];

  // 1. Entrance Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 gap-5 md:grid-cols-2 w-full max-w-[1400px] mx-auto mt-5 lg:px-0"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          whileHover={{
            y: -8,
            boxShadow:
              "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          }}
          className="flex bg-white justify-between items-center gap-5 p-4 lg:p-6 rounded-[16px] shadow-sm group relative overflow-hidden"
        >
          {/* Subtle background flash on hover */}
          <motion.div
            className="absolute inset-0 bg-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity"
            // pointerEvents="none"
          />

          <div className="flex flex-col gap-3 z-10">
            <p
              className={`text-lg lg:text-3xl font-bold text-${item.textVarient}`}
            >
              {item.title}
            </p>

            {item.icons ? (
              <motion.div
                className="relative w-[50px] h-[50px]"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                whileHover={{ rotate: 360, scale: 1.2 }}
              >
                <Image
                  alt={item.title}
                  src={item.icons}
                  fill
                  className="object-contain"
                />
              </motion.div>
            ) : item.key ? (
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="text-5xl lg:text-6xl font-[900] text-turquoise"
              >
                12
              </motion.p>
            ) : (
              <div className="w-[50px] h-[50px]"></div>
            )}
          </div>

          <div className="z-10">
            {item.requiresAuth && !isLoggedIn ? (
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setShowLoginModal(true)}
                  className="shadow-custom !text-[16px] !font-bold lg:text-xl"
                  variant={item.buttonVarient as Variant}
                  size="large"
                >
                  {item.buttonText}
                </Button>
              </motion.div>
            ) : (
              <Link href={item.link}>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    className="shadow-custom !text-[16px] !font-bold lg:text-xl"
                    variant={item.buttonVarient as Variant}
                    size="large"
                  >
                    {item.buttonText}
                  </Button>
                </motion.div>
              </Link>
            )}
          </div>
        </motion.div>
      ))}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </motion.div>
  );
}
