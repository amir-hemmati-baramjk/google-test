"use client";

import Image from "next/image";
import React from "react";
import { motion, Variants } from "framer-motion";
import { CountriesIcon } from "../../icons/CountriesIcon";
import { TournamentsWonIcon } from "../../icons/TournamentsWonIcon";
import { QuestionsAvailableIcon } from "../../icons/QuestionsAvailableIcon";
import { ProfileIcon } from "../../icons/ProfileIcon";

export default function Banner() {
  const bannerItems = [
    { title: "Active Players", text: "10,000+", icon: <ProfileIcon /> },
    { title: "Questions", text: "5,000+", icon: <QuestionsAvailableIcon /> },
    { title: "Tournaments", text: "10,000+", icon: <TournamentsWonIcon /> },
    { title: "Countries", text: "25+", icon: <CountriesIcon /> },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.5 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="m-auto max-w-[1400px] w-full bg-primary-bg-gradient p-6 lg:p-12 mt-5 flex flex-col lg:flex-row justify-between items-center text-white rounded-[24px] shadow-2xl overflow-hidden relative"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-10%] left-[5%] w-72 h-72 bg-white/10 blur-[100px] rounded-full pointer-events-none"
      />

      <div className="flex flex-col gap-8 lg:gap-16 w-full lg:w-3/5 z-10">
        <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-8">
          <div className="relative">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 border-4 border-secondary rounded-2xl"
            />

            <motion.div
              initial={{ scale: 0, rotateY: -180, filter: "brightness(2)" }}
              animate={{
                scale: 1,
                rotateY: 0,
                filter:
                  "brightness(1) drop-shadow(0px 0px 20px rgba(255,255,255,0.4))",
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 12,
                delay: 0.4, // Occurs after banner starts appearing
              }}
              style={{ perspective: "1000px" }}
              className="relative p-3 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/30"
            >
              <Image
                alt="falta-logo"
                src="/icons/logo.svg"
                width={100}
                height={100}
                className="w-[60px] h-[60px] lg:w-[100px] lg:h-[100px] object-contain"
              />
            </motion.div>

            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="flex flex-col">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="text-6xl lg:text-8xl xl:text-9xl font-black tracking-tighter bg-brand-gradient bg-[length:200%_auto] animate-brand-shimmer bg-clip-text text-transparent"
            >
              Falta
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 1 }}
              className="text-sm lg:text-xl font-light opacity-80 uppercase tracking-[0.3em]"
            >
              The Ultimate Gaming Experience
            </motion.p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-3xl lg:text-5xl font-bold"
          >
            Browse Games
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 1.4 }}
            className="text-sm lg:text-xl font-light opacity-90 max-w-xl"
          >
            Each user has one{" "}
            <span className="font-bold text-secondary-light underline">
              Free Game
            </span>{" "}
            to experience the thrill.
          </motion.p>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:flex lg:flex-col gap-4 lg:gap-6 bg-white/10 lg:bg-white p-6 lg:p-10 rounded-[32px] w-full lg:w-auto mt-8 lg:mt-0 backdrop-blur-xl lg:backdrop-blur-none z-10 border border-white/20 lg:border-none shadow-2xl"
      >
        {bannerItems.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-6"
          >
            <div className="bg-secondary text-white rounded-2xl p-4 shadow-xl">
              {React.cloneElement(item.icon as React.ReactElement)}
            </div>
            <div className="flex flex-col text-center lg:text-left text-white lg:text-secondary">
              <span className="font-black text-2xl lg:text-4xl leading-none">
                {item.text}
              </span>
              <span className="font-medium text-xs lg:text-sm uppercase tracking-widest opacity-70">
                {item.title}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
