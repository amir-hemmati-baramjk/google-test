// components/GamePageHeader.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";

import dynamic from "next/dynamic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getChangeTurn } from "@/core/game/change-turn-service";
import { useGameStore } from "@/stores/gameStore";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { ExitIcon } from "../../_components/icons/ExitIcon";
import { ReturnToGameBoardIcon } from "../../_components/icons/ReturnToGameBoardIcon";
import { TeamRoleIcon } from "../../_components/icons/TeamRoleIcon";

const GameExitModal = dynamic(() => import("./GameExitModal"), {
  ssr: false,
});

export default function GamePageHeader() {
  const [showExitModal, setShowExitModal] = useState(false);
  const t = useTranslations("GamePage");
  const queryClient = useQueryClient();
  const game = useGameStore();
  const { changeTurn } = useGameStore();

  const changeTurnMutation = useMutation({
    mutationFn: () => getChangeTurn({ id: game?.id }),
    onSuccess: (data) => {
      if (data.success) {
        changeTurn(game?.id);
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
      <div className="bg-primary-bg-gradient text-white flex justify-between items-center px-2 md:px-5 py-2">
        <div className="min-w-[150px] flex items-center gap-3">
          <button
            onClick={() => setShowExitModal(true)}
            className="bg-white text-red flex justify-center items-center rounded-[10px] w-7 h-7 lg:w-10 lg:h-10"
          >
            <ExitIcon size={48} />
          </button>
          <button className="bg-white text-secondary flex justify-center items-center rounded-[10px] w-7 h-7 lg:w-10 lg:h-10">
            <ReturnToGameBoardIcon size={48} />
          </button>
        </div>
        <Image
          alt="falta-logo"
          src="/icons/logo.svg"
          width={40}
          height={40}
          className="w-[45px] h-[45px] lg:w-[60px] lg:h-[60px]"
        />
        <div className="min-w-[150px]">
          <button
            onClick={handleTeamRoleClick}
            disabled={changeTurnMutation.isPending}
            className="bg-white rounded-[10px] flex justify-center items-center px-3 font-[700] text-primary text-nowrap text-xs md:text-lg lg:text-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <p>
              {t("gameboard.teamRole")}
              {game?.turn == 1 ? game?.teamOneName : game?.teamTwoName}
            </p>
            <div className="flex justify-center items-center rounded-[10px] w-7 h-7 lg:w-10 lg:h-10">
              <TeamRoleIcon size={48} className="text-secondary" />
            </div>
          </button>
          {changeTurnMutation.isPending && (
            <p className="text-xs text-white mt-1">
              {t("gameboard.changingTurn")}
            </p>
          )}
        </div>
      </div>
      <GameExitModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
      />
    </>
  );
}
