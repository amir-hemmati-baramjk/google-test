"use client";
import { Category } from "@/type/api/categories/categories.type";
import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { InformationIcon } from "../../_components/icons/InformationIcon";

interface CategoryCardProps {
  data: Category;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
  isSelectionLimitReached: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  data,
  isSelected,
  isDisabled,
  onSelect,
  isSelectionLimitReached,
}) => {
  const [tipOpen, setTipOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isBlocked = isDisabled || isSelectionLimitReached;

  // Lazy load image
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
      {/* Image */}
      <div className="inverted-radius overflow-hidden bg-white relative">
        {isVisible ? (
          <Image
            alt={data.name || "Category image"}
            width={200}
            height={150}
            src={data.picture?.downloadUrl || "/default-image.jpg"}
            className="w-full h-auto object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-32 bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="text-gray-400">Loading...</span>
          </div>
        )}
      </div>

      {/* Category name */}
      <p className="font-[700] text-[20px] mt-3 text-center truncate px-2">
        {data.name || "Unnamed Category"}
      </p>

      {/* Info tooltip */}
      <div className="absolute right-2 top-2 z-20">
        <div className="relative group">
          <button
            type="button"
            aria-label="Category info"
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
            className={`absolute right-0 mt-2 w-56 max-w-[150px] text-center rounded-lg px-3 py-2 text-xs leading-5 bg-white text-primary shadow-xl z-50 transition-all duration-150 border border-gray-200 ${
              tipOpen
                ? "opacity-100 visible scale-100"
                : "opacity-0 invisible scale-95"
            }`}
          >
            {data.description?.trim() || "—"}
          </div>
        </div>
      </div>
    </div>
  );
};

// Memoization to prevent unnecessary rerenders
export default React.memo(CategoryCard, (prev, next) => {
  return (
    prev.data.id === next.data.id &&
    prev.isSelected === next.isSelected &&
    prev.isDisabled === next.isDisabled &&
    prev.isSelectionLimitReached === next.isSelectionLimitReached
  );
});
