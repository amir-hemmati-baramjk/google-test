"use client";
import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useMutation } from "@tanstack/react-query";
import { getChangeTurn } from "@/core/game/change-turn-service";
import { useGameStore } from "@/stores/gameStore";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { ExitIcon } from "../../_components/icons/ExitIcon";
import { ReturnToGameBoardIcon } from "../../_components/icons/ReturnToGameBoardIcon";
import { TeamRoleIcon } from "../../_components/icons/TeamRoleIcon";
import {
  LayoutDashboard,
  LayoutGridIcon,
  LayoutIcon,
  LayoutPanelLeft,
  LayoutPanelTop,
} from "lucide-react";

const GameExitModal = dynamic(() => import("./GameExitModal"), {
  ssr: false,
});

export default function GamePageHeader() {
  const [showExitModal, setShowExitModal] = useState(false);
  const t = useTranslations("GamePage");

  const {
    id,
    turn,
    teamOneName,
    teamTwoName,
    changeTurn,
    layoutType,
    toggleLayout,
  } = useGameStore();

  const changeTurnMutation = useMutation({
    mutationFn: () => getChangeTurn({ id }),
    onSuccess: (data) => {
      if (data.success) {
        changeTurn(id);
      } else {
        toast.error(data?.errors);
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const handleTeamRoleClick = () => {
    changeTurnMutation.mutate();
  };

  return (
    <>
      <div className="bg-primary-bg-gradient text-white flex justify-between items-center px-2 sm:px-10 py-2 gap-2">
        <div className="flex items-center gap-2 lg:gap-3">
          <button
            onClick={() => setShowExitModal(true)}
            className="bg-white text-red flex justify-center items-center rounded-[10px] w-9 h-9 lg:w-10 lg:h-10 hover:bg-red/10 transition-colors"
          >
            <ExitIcon size={32} />
          </button>
          <button className="bg-white text-secondary flex justify-center items-center rounded-[10px] w-9 h-9 lg:w-10 lg:h-10 hover:bg-secondary/10 transition-colors">
            <ReturnToGameBoardIcon size={32} />
          </button>
        </div>

        {/* لوگو در وسط */}
        <div className="flex-shrink-0">
          <Image
            alt="falta-logo"
            src="/icons/logo.svg"
            width={60}
            height={60}
            className="w-[45px] h-[45px] lg:w-[60px] lg:h-[60px]"
          />
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <button
            onClick={toggleLayout}
            className="bg-white text-primary rounded-[10px] flex justify-center items-center px-3 h-9 lg:h-10 font-bold text-xs md:text-sm lg:text-base border-2 border-transparent hover:border-secondary transition-all"
          >
            <div className="flex justify-center items-center">
              {layoutType === "version1" ? (
                <LayoutPanelLeft size={24} className="text-secondary" />
              ) : (
                <LayoutPanelTop size={24} className="text-secondary" />
              )}
            </div>
          </button>

          {/* دکمه نوبت تیم */}
          <div className="flex flex-col items-end">
            <button
              onClick={handleTeamRoleClick}
              disabled={changeTurnMutation.isPending}
              className="bg-white rounded-[10px] flex justify-center items-center px-3 h-9 lg:h-10 font-[700] text-primary text-nowrap text-xs md:text-lg lg:text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              <p className="ml-2">
                {t("gameboard.teamRole")}
                <span className="text-secondary mr-1">
                  {turn === 1 ? teamOneName : teamTwoName}
                </span>
              </p>
              <div className="flex justify-center items-center w-7 h-7 lg:w-10 lg:h-10">
                <TeamRoleIcon size={32} className="text-secondary" />
              </div>
            </button>

            {changeTurnMutation.isPending && (
              <p className="text-[10px] text-white mt-1 absolute translate-y-8 bg-black/20 px-2 rounded">
                {t("gameboard.changingTurn")}
              </p>
            )}
          </div>
        </div>
      </div>

      <GameExitModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
      />
    </>
  );
}
