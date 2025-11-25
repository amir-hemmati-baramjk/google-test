"use client";
import React from "react";
import { ChildModalProps } from "../../_components/modal/modal.types";
import dynamic from "next/dynamic";
import { ExitIcon } from "../../_components/icons/ExitIcon";
import { Button } from "../../_components/button/button";

// Dynamically import Modal with SSR disabled
const Modal = dynamic(() => import("../../_components/modal/Modal"), {
  ssr: false,
});

export default function GameExitModal({ isOpen, onClose }: ChildModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="w-full flex justify-center items-center bg-secondary text-white rounded-[20px] py-4">
          <ExitIcon size={80} />
        </div>
        <p className="text-secondary text-lg">
          Are you sure you want leave game?
        </p>
        <div className="w-full flex justify-center items-center gap-5">
          <div className="w-1/2">
            <Button
              className="!w-full"
              variant="secondary"
              isOutline
              onClick={onClose}
            >
              Stay
            </Button>
          </div>
          <div className="w-1/2 ">
            <Button
              variant="secondary"
              className="!w-full"
              onClick={() => {
                // Add your leave game logic here
                console.log("Leaving game...");
                onClose();
              }}
            >
              Leave
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
