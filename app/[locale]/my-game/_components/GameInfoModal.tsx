import { Game } from "@/type/api/game/game.type";
import React from "react";
import Modal from "../../_components/modal/Modal";

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
  return (
    <Modal closeOnBackdrop isOpen={isOpen} onClose={onClose}>
      <div className="  "></div>
    </Modal>
  );
}
