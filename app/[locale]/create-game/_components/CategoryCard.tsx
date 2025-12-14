import { Category } from "@/type/api/game/game.type";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { InformationIcon } from "../../_components/icons/InformationIcon";
import { useTranslations } from "next-intl";

interface CategoryCardProps {
  data: Category;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
  isSelectionLimitReached: boolean;
}

export const CategoryCard = React.memo(
  ({
    data,
    isSelected,
    isDisabled,
    onSelect,
    isSelectionLimitReached,
  }: CategoryCardProps) => {
    const t = useTranslations("CategoriesPage");
    const [tipOpen, setTipOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const isBlocked = isDisabled || isSelectionLimitReached;

    useEffect(() => {
      if (!ref.current) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
            }
          });
        },
        { rootMargin: "300px" }
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    const handleClick = useCallback(() => {
      if (!isBlocked) onSelect();
    }, [isBlocked, onSelect]);

    const toggleTip = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      setTipOpen((v) => !v);
    }, []);

    return (
      <div
        ref={ref}
        onClick={handleClick}
        className={`p-3 relative rounded-[10px] cursor-pointer ${
          isSelected
            ? "bg-category-card-bg-gradient text-white"
            : "bg-[#B9C6F3] text-primary"
        } ${isBlocked ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="inverted-radius overflow-hidden bg-white relative">
          {isVisible ? (
            <Image
              alt={data.name || t("altImage")}
              width={200}
              height={150}
              src={data.picture?.downloadUrl || "/default-image.jpg"}
              className="w-full h-auto object-cover transition-opacity duration-300"
            />
          ) : (
            <div className="w-full h-32 bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-gray-400">{t("loading")}</span>{" "}
            </div>
          )}
        </div>

        <p className="font-[700] text-[20px] mt-3 text-center h-[60px] px-2">
          {data.name || t("unnamedCategory")} {/* Unnamed Category */}
        </p>

        <div className="absolute right-2 top-2 z-20">
          <div className="relative group">
            <button
              type="button"
              aria-label={t("categoryInfo")}
              onClick={toggleTip}
              onBlur={() => setTipOpen(false)}
              className={`flex items-center justify-center w-6 h-6 p-1 rounded-full bg-secondary backdrop-blur transition-all hover:scale-110 ${
                isSelected ? "text-white" : "text-[#2E2D2F]"
              }`}
            >
              <InformationIcon className="w-4 h-4 text-white" />
            </button>

            <div
              role="tooltip"
              className={`absolute  right-0 mt-2 w-56 max-w-[150px] text-center rounded-lg px-3 py-2 text-xs leading-5 bg-white text-primary shadow-xl z-50 transition-all duration-150 border border-gray-200 ${
                tipOpen
                  ? "opacity-100 visible scale-100"
                  : "opacity-0 invisible scale-95"
              }`}
            >
              {data.description?.trim() || t("noDescription")} {/* — */}
            </div>
          </div>
        </div>
      </div>
    );
  },
  (prev, next) => {
    return (
      prev.data.id === next.data.id &&
      prev.isSelected === next.isSelected &&
      prev.isDisabled === next.isDisabled &&
      prev.isSelectionLimitReached === next.isSelectionLimitReached
    );
  }
);
