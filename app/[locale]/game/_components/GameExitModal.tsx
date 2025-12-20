"use client";
import React from "react";
import { ChildModalProps } from "../../_components/modal/modal.types";
import dynamic from "next/dynamic";
import { ExitIcon } from "../../_components/icons/ExitIcon";
import { Button } from "../../_components/button/button";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

const Modal = dynamic(() => import("../../_components/modal/Modal"), {
  ssr: false,
});

export default function GameExitModal({ isOpen, onClose }: ChildModalProps) {
  const t = useTranslations("GamePage.gameboard.exitGameModal");
  const router = useRouter();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-center items-center gap-5 ">
        <div className="w-full flex justify-center items-center bg-secondary text-white rounded-[20px] py-4">
          <ExitIcon size={80} />
        </div>
        <p className="text-secondary text-lg font-bold">
          {t("exit-game-desc")}
        </p>
        <div className="w-full flex justify-center items-center gap-5">
          <div className="w-1/2">
            <Button
              className="!w-full"
              variant="secondary"
              isOutline
              onClick={onClose}
            >
              {t("cancel")}
            </Button>
          </div>
          <div className="w-1/2 ">
            <Button
              variant="secondary"
              className="!w-full"
              onClick={() => {
                router.replace("/");
                onClose();
              }}
            >
              {t("yes")}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
