"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LogoMotionLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center  overflow-hidden">
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

      <div className="relative">
        <motion.div
          className="absolute inset-[-40px]  blur-[60px] rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

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

        <motion.div
          className="absolute inset-[-30px] border-t-2 border-r-2 border-secondary rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
