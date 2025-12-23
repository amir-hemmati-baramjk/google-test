import Image from "next/image";
import React, { useCallback, useState } from "react";
import { InformationIcon } from "../../_components/icons/InformationIcon";
import { useTranslations } from "next-intl";

export const CategoryCard = React.memo(
  ({
    data,
    isSelected,
    isDisabled,
    onSelect,
    isSelectionLimitReached,
  }: any) => {
    const t = useTranslations("CategoriesPage");
    const [tipOpen, setTipOpen] = useState(false);
    const isBlocked = isDisabled || isSelectionLimitReached;

    return (
      <div
        onClick={() => !isBlocked && onSelect()}
        className={` relative  cursor-pointer transition-all rounded-[10px] overflow-hidden  ${
          isBlocked ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"
        }`}
      >
        <div
          className={`inverted-radius overflow-hidden  relative aspect-video ${
            isSelected ? "bg-primary-bg-gradient" : "bg-white"
          }`}
        >
          <Image
            alt={data.name || "category"}
            fill
            src={data.picture?.downloadUrl || "/default-image.jpg"}
            className="object-cover"
          />
        </div>

        <p
          className={`font-bold text-[18px]  text-center line-clamp-2 h-[54px] px-2 leading-tight flex justify-center items-center ${
            isSelected
              ? "bg-category-card-bg-gradient text-white"
              : "bg-light-blue"
          }`}
        >
          {data.name || t("unnamedCategory")}
        </p>

        <div className="absolute right-0 top-0 z-20">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setTipOpen(!tipOpen);
            }}
            onBlur={() => setTipOpen(false)}
            className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-white"
          >
            <InformationIcon className="w-4 h-4" />
          </button>
          {tipOpen && (
            <div className="absolute right-0 mt-2 w-48 p-2 rounded-lg bg-white text-primary text-xs shadow-xl border z-50">
              {data.description || t("noDescription")}
            </div>
          )}
        </div>
      </div>
    );
  },
  (p, n) =>
    p.isSelected === n.isSelected &&
    p.isDisabled === n.isDisabled &&
    p.isSelectionLimitReached === n.isSelectionLimitReached
);
