import { Game } from "@/type/api/game/game.type";
import React, { useTransition } from "react";
import Modal from "../../_components/modal/Modal";
import { Button } from "../../_components/button/button";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { restartGame } from "@/core/game/restart-game-service";
import { ChildModalProps } from "../../_components/modal/modal.types";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function GameOverModal({ isOpen, onClose }: ChildModalProps) {
  const t = useTranslations("GamePage.gameOverModal");
  const router = useRouter();
  const { id } = useParams();
  return (
    <Modal closeOnBackdrop={false} isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-center items-center gap-5 min-w-[290px] max-w-[360px] md:min-w-[360px] lg:max-w-[400px]">
        <div className="w-full flex justify-center items-center bg-secondary text-primary rounded-[20px] py-8 text-xl font-bold">
          <Image
            alt="falta-logo"
            src="/icons/logo.svg"
            width={40}
            height={40}
            className="w-[45px] h-[45px] lg:w-[60px] lg:h-[60px]"
          />
        </div>

        <p className="text-lg font-bold text-center px-4 text-primary">
          {t("gameOver")}
        </p>
        <div className="grid grid-cols-1 gap-5 text-[14px]  py-2 w-full">
          <Button
            variant="secondary"
            size="large"
            onClick={() => {
              onClose();
              router.replace(`/game/${id}/winner`);
            }}
          >
            {t("show-winner")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
