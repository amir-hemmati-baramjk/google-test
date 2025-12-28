import React, { useState } from "react";
import { Button } from "../../_components/button/button";
import Image from "next/image";
import { Game, LastCreatedGame } from "@/type/api/game/game.type";
import { useTranslations } from "next-intl";
import RestartGameModal from "./RestartGameModal";
import GameInfoModal from "./GameInfoModal";
import { InformationIcon } from "../../_components/icons/InformationIcon";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const t = useTranslations("GamesPage");
  const categories = game.categories || [];
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);

  const itemsToShow = categories.slice(0, 8);

  return (
    <div className="p-5 relative bg-light-purple border-[2px] border-white rounded-[20px] w-full shadow-lg">
      <div className="absolute -top-5 left-0 w-full flex justify-around items-center">
        <Button
          onClick={() => setShowRestartModal(true)}
          className="!font-bold !text-[22px] !border-white !border-[2px]"
          variant="secondary"
        >
          {t("playGame")}
        </Button>
        <Button
          onClick={() => setShowInfoModal(true)}
          className="!font-bold !text-[22px] !border-white !border-[2px]"
          variant="error"
          title={t("info")}
        >
          <InformationIcon size={24} />
        </Button>
      </div>

      <p className="my-10 font-bold text-2xl text-center text-secondary">
        {game.name || t("gameNotFound")}
      </p>

      {itemsToShow.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 text-center">
            {t("noCategoriesAvailable")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {itemsToShow.map((category, index) => (
            <div
              key={category.id || `category-${index}`}
              className="flex flex-col justify-center items-center gap-3"
            >
              <div className="bg-white p-2 rounded-lg w-full aspect-square flex items-center justify-center">
                <Image
                  src={
                    category.picture?.downloadUrl ||
                    "/staticImages/about-falta.png"
                  }
                  alt={category.name || `${t("category")} ${index + 1}`}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <p className="text-[14px] lg:text-[16px] font-bold text-center text-primary  w-full px-1 h-[50px]">
                {category.name || `${t("category")} ${index + 1}`}
              </p>
            </div>
          ))}
        </div>
      )}

      <RestartGameModal
        game={game as LastCreatedGame}
        isOpen={showRestartModal}
        onClose={() => setShowRestartModal(false)}
      />

      <GameInfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        game={game}
      />
    </div>
  );
}
