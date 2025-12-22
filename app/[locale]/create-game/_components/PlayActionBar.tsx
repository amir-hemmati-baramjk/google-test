import { useState } from "react";
import { CreateGameModal } from "./CreateGameModal";
import LoginModal from "./LoginModal";

interface Props {
  selectedCount: number;
  maxCount: number;
  isLogin: boolean;
  t: any;
  selectedCatItems: string[];
}

export const PlayActionBar = ({
  selectedCount,
  maxCount,
  isLogin,
  t,
  selectedCatItems,
}: Props) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleClick = () => {
    if (!isLogin) return setShowLoginModal(true);
    setShowCreateModal(true);
  };

  return (
    <>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xs px-4 z-50">
        <button
          onClick={handleClick}
          disabled={selectedCount === 0}
          className={`w-full flex items-center justify-between p-1.5 rounded-2xl font-bold transition-all shadow-2xl active:scale-95 ${
            selectedCount > 0
              ? "bg-secondary text-white ring-4 ring-secondary/20"
              : "bg-gray-300 text-gray-500 opacity-80 cursor-not-allowed"
          }`}
        >
          <span className="ml-4 text-xs sm:text-sm">
            {t("remaining")} ({maxCount - selectedCount})
          </span>
          <div className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-xl uppercase text-xs sm:text-sm tracking-widest border border-white/20">
            {t("play")}
          </div>
        </button>
      </div>

      <CreateGameModal
        show={showCreateModal}
        setShow={() => setShowCreateModal(false)}
        selectedCatItems={selectedCatItems}
      />
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};
