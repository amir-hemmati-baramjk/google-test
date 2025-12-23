"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center  overflow-hidden">
      {/* Background Animated Rings */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute border border-secondary rounded-full"
            initial={{ width: 0, height: 0, opacity: 0.5 }}
            animate={{ width: i * 400, height: i * 400, opacity: 0 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Center Piece */}
      <div className="relative">
        {/* Intense Back-Glow */}
        <motion.div
          className="absolute inset-[-40px]  blur-[60px] rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* The 3D Spinning Logo */}
        <motion.div
          animate={{
            rotateY: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{
            rotateY: { duration: 2, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ perspective: "1000px" }}
        >
          <Image
            src="/icons/logo.svg"
            alt="Loading..."
            width={120}
            height={120}
            className="drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
          />
        </motion.div>

        {/* Rapid Orbitals */}
        <motion.div
          className="absolute inset-[-30px] border-t-2 border-r-2 border-secondary rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Loading Text */}
      {/* <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.h2
          className="text-white text-2xl font-black tracking-[0.2em] uppercase"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading Game
        </motion.h2>
        <div className="flex gap-1 justify-center mt-2">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="w-2 h-2 bg-secondary rounded-full"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: dot * 0.1 }}
            />
          ))}
        </div>
      </motion.div> */}
    </div>
  );
}
