"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ChildModalProps } from "@/app/[locale]/_components/modal/modal.types";
import { Button } from "@/app/[locale]/_components/button/button";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { reportQuestion } from "@/core/game/report-question-service";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

const Modal = dynamic(() => import("../../../../../_components/modal/Modal"), {
  ssr: false,
});

export default function ReportQuestionModal({
  isOpen,
  onClose,
}: ChildModalProps) {
  const t = useTranslations("report-qa");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [customText, setCustomText] = useState<string>("");
  const { questionId } = useParams();
  const reportItems = [
    t("question-not-clear"),
    t("wrong-media"),
    t("wrong-answer"),
  ];

  const handleSubmit = async () => {
    const finalDescription =
      selectedItem && customText
        ? `${selectedItem} - ${customText}`
        : selectedItem || customText;

    if (!finalDescription) return;

    const response = await reportQuestion({
      QuestionId: questionId as string,
      Description: finalDescription,
    });
    if (response?.success) {
      toast.success("question reported successfully");
    } else {
      toast.error(response?.errors);
    }
    setSelectedItem("");
    setCustomText("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full  ">
        {/* Header */}
        <div className="flex items-center justify-end mb-4 ">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-error transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-primary mb-6 font-bold">
          {t("wrong-question-or-answer")}
        </p>

        {/* Options Grid */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          {reportItems.map((item, index) => (
            <motion.div key={index}>
              <Button
                variant={selectedItem === item ? "primary" : "secondary"}
                isOutline={selectedItem !== item}
                className={`w-full !justify-start font-bold transition-all ${
                  selectedItem === item ? "border-[2px] border-primary" : ""
                }`}
                size="large"
                onClick={() => setSelectedItem(item)}
              >
                {item}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Text Area */}
        <div className="relative mb-6">
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder={t("write-your-message")}
            className="w-full border-2 border-gray-300 outline-none focus:border-primary rounded-2xl p-4 text-sm min-h-[120px] transition-all bg-gray-50/50"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <Button
            onClick={onClose}
            variant="secondary"
            isOutline
            className="flex-1 !h-14 font-black"
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={handleSubmit}
            variant="primary"
            disabled={!selectedItem && !customText}
            className="flex-1 !h-14 font-black shadow-xl disabled:opacity-50"
          >
            {t("submit")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
