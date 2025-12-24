"use client";

import React from "react";
import { Button } from "../../_components/button/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Banner() {
  const t = useTranslations("GamesPage");
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="relative overflow-hidden m-auto lg:container w-full bg-primary-bg-gradient p-3 lg:p-12 gap-5 mt-5 flex justify-between items-center text-white rounded-[16px] shadow-2xl"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/4 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-blue-500/20 blur-[150px] rounded-full"
        />
      </div>

      <div className="relative z-10 flex flex-col gap-5 lg:gap-16 w-full">
        <div className="flex flex-col items-center gap-5 lg:gap-10 w-full">
          <div className="flex flex-col gap-3 lg:gap-5 w-full">
            <motion.p
              variants={itemVariants}
              className="text-2xl lg:text-3xl xl:text-5xl font-[700] tracking-tight"
            >
              {t("bannerTitle")}
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="max-w-[700px] text-lg lg:text-md xl:text-2xl font-[700] opacity-90"
            >
              {t("bannerDescription")}
            </motion.p>
          </div>
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-5 justify-end w-full mt-10"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="!font-bold shadow-lg"
                variant="light-purple-gradient"
                size="large"
                onClick={() => router.push("/plans")}
              >
                {t("buyGames")}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="!bg-white !text-secondary !font-bold shadow-lg"
                variant="white"
                size="large"
                onClick={() => router.push("/create-game")}
              >
                {t("createGames")}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
