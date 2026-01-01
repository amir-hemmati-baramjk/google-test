"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useGameStore } from "@/stores/gameStore";

const SPONSORS = [
  {
    id: 2,
    logo: "/staticImages/Atmeta-Logo.png",
    name: "Atmeta",
    bg: "#111828",
    link: "https://atmeta.ai/",
  },
  {
    id: 3,
    logo: "/staticImages/hababah-logo.png",
    name: "Hababa",
    bg: "#911B35",
    link: "https://hababahkw.com/ar",
  },
];

export default function SponsorsAds() {
  const t = useTranslations("GamePage.gameboard");
  const { layoutType } = useGameStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const startX = useRef<number | null>(null);
  const startTime = useRef<number>(0);
  const isDragging = useRef(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === SPONSORS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? SPONSORS.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleStart = (clientX: number) => {
    startX.current = clientX;
    startTime.current = Date.now();
    isDragging.current = true;
  };

  const handleEnd = (clientX: number) => {
    if (!isDragging.current || startX.current === null) return;

    const diff = startX.current - clientX;
    const timeDiff = Date.now() - startTime.current;
    const threshold = 50;

    if (Math.abs(diff) < 10 && timeDiff < 200) {
      window.open(SPONSORS[currentIndex].link, "_blank", "noopener,noreferrer");
    } else if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }

    isDragging.current = false;
    startX.current = null;
  };

  return (
    <div
      className={`hidden h-full sm:flex p-2 3xl:p-5 rounded-[16px] text-white flex-col gap-2 justify-center items-center transition-all duration-700 select-none cursor-grab active:cursor-grabbing hover:opacity-90 ${
        layoutType === "version1" ? "w-full" : "w-1/4"
      }`}
      style={{ backgroundColor: SPONSORS[currentIndex].bg }}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseUp={(e) => handleEnd(e.clientX)}
      onMouseLeave={() => (isDragging.current = false)}
    >
      <p className="text-white">Sponsered By</p>
      <div
        key={currentIndex}
        className="flex flex-col items-center animate-in fade-in slide-in-from-right-8 duration-500"
      >
        <Image
          alt={SPONSORS[currentIndex].name}
          src={SPONSORS[currentIndex].logo}
          width={100}
          height={100}
          className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[75px] xl:h-[75px] 2xl:w-[85px] 2xl:h-[85px] 3xl:w-[105px] 3xl:h-[105px] object-contain pointer-events-none"
        />
      </div>

      <div className="flex gap-1 mt-2">
        {SPONSORS.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-4 bg-white" : "w-1 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
