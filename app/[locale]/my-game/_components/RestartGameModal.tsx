import { Game, LastCreatedGame } from "@/type/api/game/game.type";
import React, { useTransition } from "react";
import Modal from "../../_components/modal/Modal";
import { Button } from "../../_components/button/button";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { restartGame } from "@/core/game/restart-game-service";
import RestartGameForm from "./RestartGameForm";

interface RestartGameModalProps {
  game: LastCreatedGame;
  isOpen: boolean;
  onClose: () => void;
}

export default function RestartGameModal({
  game,
  isOpen,
  onClose,
}: RestartGameModalProps) {
  const t = useTranslations("restart-game-form");

  return (
    <Modal closeOnBackdrop isOpen={isOpen} onClose={onClose}>
      <div className=" w-full  h-fit bg-white max-h-[90vh] overflow-y-auto">
        <div className=" w-full m-auto">
          <div className=" w-full bg-white   mx-auto">
            <div style={{ direction: "ltr" }} className=" w-full">
              <p className="text-secondary text-center font-bold text-xl">
                {t("restart-browsed-game-message")}
              </p>
              <div className="w-8 h-8"></div>
            </div>
            <div className="mt-4">
              <RestartGameForm lastGame={game} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
