"use client";

import { Game } from "@/type/api/game/game.type";
import React from "react";
import Modal from "../../_components/modal/Modal";
import { useTranslations } from "next-intl";
import { Trophy, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

interface GameCardProps {
  game: Game;
  isOpen: boolean;
  onClose: () => void;
}

export default function GameInfoModal({
  game,
  isOpen,
  onClose,
}: GameCardProps) {
  const t = useTranslations("GamesPage");

  return (
    <Modal
      className="!p-0 !w-full"
      closeOnBackdrop
      isOpen={isOpen}
      onClose={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full  "
      >
        <div className="bg-primary-bg-gradient p-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-5xl font-black italic tracking-tighter uppercase">
                {game.name}
              </h2>
            </motion.div>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse" />
          <Star
            className="absolute top-10 right-10 text-white/20 rotate-12"
            size={100}
          />
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="group relative bg-white rounded-[30px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all overflow-hidden"
            >
              {/* <div className="absolute -right-4 -top-4 p-4 text-emerald-500/10 group-hover:rotate-12 transition-transform">
                <Trophy size={120} />
              </div> */}

              <div className="relative z-10">
                <h3 className="text-3xl font-black text-secondary mb-2 truncate">
                  {game.teamOneName}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 font-bold text-sm mb-8">
                  <div className="bg-emerald-100 p-1.5 rounded-lg text-emerald-600">
                    <Users size={18} />
                  </div>
                  {game.teamOnePlayerCount} {t("players")}
                </div>

                <div className="mt-auto">
                  <p className=" font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                    Total Score
                  </p>
                  <p className="text-6xl font-black text-emerald-500 tabular-nums">
                    {game.teamOnePoints}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="group relative bg-white rounded-[30px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all overflow-hidden"
            >
              {/* <div className="absolute -right-4 -top-4 p-4 text-rose-500/10 group-hover:-rotate-12 transition-transform">
                <Trophy size={120} />
              </div> */}

              <div className="relative z-10">
                <h3 className="text-3xl font-black text-secondary mb-2 truncate">
                  {game.teamTwoName}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 font-bold text-sm mb-8">
                  <div className="bg-rose-100 p-1.5 rounded-lg text-rose-600">
                    <Users size={18} />
                  </div>
                  {game.teamTwoPlayerCount} {t("players")}
                </div>

                <div className="mt-auto">
                  <p className=" font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                    Total Score
                  </p>
                  <p className="text-6xl font-black text-rose-500 tabular-nums">
                    {game.teamTwoPoints}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}
