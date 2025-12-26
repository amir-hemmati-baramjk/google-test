import React from "react";
import { useTranslations } from "next-intl";
import { ChildModalProps } from "../../_components/modal/modal.types";
import Modal from "../../_components/modal/Modal";
import CreateGameForm from "./CreateGameForm";
import { X } from "lucide-react";

interface CreateGameModalProps
  extends Omit<ChildModalProps, "isOpen" | "onClose"> {
  show: boolean;
  setShow: (s: boolean) => void;
  selectedCatItems: string[];
}

export const CreateGameModal: React.FC<CreateGameModalProps> = ({
  show,
  setShow,
  selectedCatItems,
}: CreateGameModalProps) => {
  const t = useTranslations("CreateGameForm");
  const handleClose = () => setShow(false);

  return (
    <Modal isOpen={show} onClose={handleClose}>
      <div className=" w-full  h-fit bg-white max-h-[90vh] overflow-y-auto">
        <div className=" w-full m-auto">
          <div className=" w-full bg-white   mx-auto">
            <div style={{ direction: "ltr" }} className=" w-full">
              <p className="text-secondary text-center font-bold text-xl">
                {t("select-team-info")}
              </p>
              <div className="w-8 h-8"></div>
            </div>
            <div className="mt-4">
              <CreateGameForm selectedCatItems={selectedCatItems} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
