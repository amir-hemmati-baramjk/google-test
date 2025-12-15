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
  selectedCatItems: { id: string; name: string }[] | any;
}

export const CreateGameModal: React.FC<CreateGameModalProps> = ({
  show,
  setShow,
  selectedCatItems,
}: CreateGameModalProps) => {
  const t = useTranslations("index");
  const handleClose = () => setShow(false);

  return (
    <Modal isOpen={show} onClose={handleClose}>
      <div className=" w-full lg:w-[600px] bg-white">
        <div className=" w-full m-auto">
          <div className=" w-full bg-white  overflow-y-scroll no-scrollbar mx-auto">
            <div
              style={{ direction: "ltr" }}
              className="flex justify-between items-center w-full"
            >
              <div
                onClick={handleClose}
                className="w-8 h-8 flex justify-center items-center cursor-pointer text-error"
              >
                <X />
              </div>
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
