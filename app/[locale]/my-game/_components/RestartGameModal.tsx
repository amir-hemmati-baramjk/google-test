import { Game } from "@/type/api/game/game.type";
import React, { useTransition } from "react";
import Modal from "../../_components/modal/Modal";
import { Button } from "../../_components/button/button";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { restartGame } from "@/core/game/restart-game-service";

interface RestartGameModalProps {
  game: Game;
  isOpen: boolean;
  onClose: () => void;
}

export default function RestartGameModal({
  game,
  isOpen,
  onClose,
}: RestartGameModalProps) {
  const t = useTranslations("GamesPage");
  const router = useRouter();
  const [isKeepGoingPending, startKeepGoingTransition] = useTransition();
  const [isRestartPending, startRestartTransition] = useTransition();

  const handleKeepGoing = () => {
    startKeepGoingTransition(() => {
      router.push(`/game/${game?.id}`);
    });
  };

  const handleRestartGame = async () => {
    startRestartTransition(async () => {
      const response = await restartGame({ id: game.id! });
      if (response.success) {
        router.push(`/game/${game?.id}`);
      }
    });
  };

  return (
    <Modal closeOnBackdrop isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-center items-center gap-5 ">
        <div className="w-full flex justify-center items-center bg-primary/30 text-primary rounded-[20px] py-8 text-xl font-bold">
          {t("followup-from-where-you-left")}
        </div>

        <p className="text-lg text-center px-4 text-primary">
          {t("restart-browsed-game-message")}
        </p>
        <div className="grid grid-cols-2 gap-5 text-[14px] px-4 py-2 w-full">
          <Button
            isOutline={true}
            variant="accent"
            onClick={handleRestartGame}
            isLoading={isRestartPending}
            disabled={isKeepGoingPending || isRestartPending}
          >
            {t("start-again-browsed-game")}
          </Button>
          <Button
            variant="primary"
            onClick={handleKeepGoing}
            disabled={
              game?.isGameFinished || isKeepGoingPending || isRestartPending
            }
            isLoading={isKeepGoingPending}
          >
            {t("keep-going-browsed-game")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
