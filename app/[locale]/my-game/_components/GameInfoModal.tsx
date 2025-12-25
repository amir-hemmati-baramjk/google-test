"use client";

import { Game } from "@/type/api/game/game.type";
import React from "react";
import Modal from "../../_components/modal/Modal";
import { useTranslations } from "next-intl";

import Image from "next/image";

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
    <Modal className="!p-0 " closeOnBackdrop isOpen={isOpen} onClose={onClose}>
      <div className="relative w-full  ">
        <div className="bg-primary-bg-gradient p-5 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-black  ">{game.name}</h2>
              <Image
                alt="falta-logo"
                width={80}
                height={80}
                src={"/icons/logo.svg"}
              />
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-8">
            <div className="group relative bg-gray-100 rounded-[30px] p-3 lg:p-8 border border-gray-100 transition-all overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-secondary mb-2 truncate">
                  {game.teamOneName}
                </h3>
                <div className="flex items-center gap-2 text-secondary text-lg font-bold my-5">
                  <div className="rounded-lg ">
                    <Image
                      alt="falta-logo"
                      width={60}
                      height={60}
                      src={"/icons/logo.svg"}
                    />
                  </div>
                  {game.teamOnePlayerCount} {t("players")}
                </div>

                <div className="mt-auto">
                  <p className=" font-bold text-xl text-secondary mb-1">
                    Total Score
                  </p>
                  <p className="text-6xl font-black text-secondary tabular-nums">
                    {game.teamOnePoints}
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative bg-gray-100 rounded-[30px]  p-3 lg:p-8 border border-gray-100 transition-all overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-orange-600 mb-2 truncate">
                  {game.teamTwoName}
                </h3>
                <div className="flex items-center gap-2 text-orange-600 text-lg font-bold my-5">
                  <div className=" rounded-lg ">
                    <Image
                      alt="falta-logo"
                      width={60}
                      height={60}
                      src={"/icons/logo.svg"}
                    />
                  </div>
                  {game.teamTwoPlayerCount} {t("players")}
                </div>

                <div className="mt-auto">
                  <p className=" font-bold text-xl text-orange-600 mb-1">
                    Total Score
                  </p>
                  <p className="text-6xl font-black text-orange-600 tabular-nums">
                    {game.teamTwoPoints}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
