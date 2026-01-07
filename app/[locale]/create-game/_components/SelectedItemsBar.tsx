import { Category } from "@/type/api/game/game.type";
import { X } from "lucide-react";
import { CategoryCard } from "./CategoryCard";

interface SelectedItemsBarProps {
  selectedCategories: Category[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
  t: any;
}

export default function SelectedItemsBar({
  selectedCategories,
  onRemove,
  onClearAll,
  t,
}: SelectedItemsBarProps) {
  if (selectedCategories.length === 0) return null;

  return (
    <div className=" border-t border-white/10 pt-3  bg-light-purple  w-full ">
      <div className="flex justify-between items-center mb-2 px-1">
        <span className="text-sm lg:text-md uppercase  font-bold text-primary/50">
          {t("selectedItems") || "Selected"}
        </span>
        <button
          onClick={onClearAll}
          className="text-md lg:text-lg font-bold text-error hover:text-red-600 transition-colors"
        >
          {t("removeAll") || "Remove All"}
        </button>
      </div>
      <div className="flex items-center gap-3 overflow-x-auto py-2 scrollbar-hide">
        {selectedCategories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center relative bg-secondary border border-secondary/30 text-white py-1.5 rounded-lg shadow-sm px-5 shrink-0 animate-in zoom-in-95"
          >
            <span className="text-sm font-medium whitespace-nowrap">
              {cat.name}
            </span>
            <button
              onClick={() => onRemove(cat.id)}
              className="absolute -top-2 -left-2 rounded-full bg-white shadow-md p-0.5 z-10 hover:scale-110 transition-transform"
            >
              <X className="w-[18px] h-[18px] lg:w-3.5 lg:h-3.5 text-error" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
