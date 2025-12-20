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

  const shapeVariants = (
    x: number,
    y: number,
    rotate: number,
    duration: number
  ): Variants => ({
    floating: {
      x: [0, x, 0],
      y: [0, y, 0],
      rotate: [0, rotate],
      transition: {
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="m-auto max-w-[1400px] w-full bg-primary-bg-gradient p-6 lg:p-12 mt-5 flex flex-col lg:flex-row justify-between items-center text-white rounded-[24px] shadow-2xl overflow-hidden relative"
    >
      <motion.div
        variants={shapeVariants(50, -30, 0, 10)}
        animate="animate"
        className="absolute top-[-10%] left-[10%] w-40 h-40 bg-gray-100 blur-[80px] rounded-full pointer-events-none"
      />

      <motion.div
        variants={shapeVariants(-40, 60, 0, 15)}
        animate="animate"
        className="absolute bottom-[-20%] right-[30%] w-60 h-60 bg-magenta-gradient blur-[100px] rounded-full pointer-events-none"
      />

      {/* --- Left Content Section --- */}
      <div className="flex flex-col gap-8 lg:gap-16 w-full lg:w-3/5 z-10">
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="p-2 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
            <Image
              alt="falta-logo"
              src="/icons/logo.svg"
              width={80}
              height={80}
              className="w-[50px] h-[50px] lg:w-[80px] lg:h-[80px]"
            />
          </div>

          <div className="flex flex-col">
            {/* TEXT ANIMATION USING BRAND COLORS */}
            <h1 className="text-5xl lg:text-7xl xl:text-9xl font-black tracking-tighter bg-brand-gradient bg-[length:200%_auto] animate-brand-shimmer bg-clip-text text-transparent ">
              Falta
            </h1>
            <p className="text-sm lg:text-xl xl:text-2xl font-light opacity-80 uppercase tracking-widest">
              The Ultimate Gaming Experience
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold">
            Browse Games
          </h2>
          <p className="text-sm lg:text-lg xl:text-xl font-light leading-relaxed opacity-90 max-w-xl">
            Each user has one{" "}
            <span className="font-bold text-secondary-light underline">
              Free Game
            </span>{" "}
            to try existing categories and experience the thrill of competition.
          </p>
        </div>
      </div>

      {/* --- Right Stats Section --- */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:flex lg:flex-col gap-4 lg:gap-6 bg-white/10 lg:bg-white p-4 lg:p-8 rounded-[24px] w-full lg:w-auto mt-8 lg:mt-0 backdrop-blur-lg lg:backdrop-blur-none z-10 border border-white/10 lg:border-none">
        {bannerItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ x: 10, scale: 1.05 }}
            className="flex flex-col lg:flex-row items-center lg:items-start gap-3 lg:gap-5 group"
          >
            <div className="bg-secondary text-white rounded-xl p-3 lg:p-4 shadow-lg group-hover:bg-primary transition-colors duration-300">
              {React.cloneElement(item.icon as React.ReactElement)}
            </div>
            <div className="flex flex-col text-center lg:text-left text-white lg:text-secondary">
              <span className="font-black text-xl md:text-2xl lg:text-3xl leading-none">
                {item.text}
              </span>
              <span className="font-medium text-[10px] md:text-xs lg:text-sm uppercase tracking-wider opacity-70 lg:opacity-100">
                {item.title}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
