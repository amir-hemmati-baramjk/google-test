import { Category } from "@/type/api/game/game.type";
import { X } from "lucide-react";
import { CategoryCard } from "./CategoryCard";

interface SelectedItemsBarProps {
  selectedCategories: Category[];
  onRemove: (id: string) => void;
  t: any;
}

export default function SelectedItemsBar({
  selectedCategories,
  onRemove,
  t,
}: SelectedItemsBarProps) {
  if (selectedCategories.length === 0) return null;

  return (
    <div className="  overflow-hidden  mt-3">
      <div className="flex  justify-center items-center gap-3 px-4 py-3 overflow-x-scroll scrollbar-hide">
        {selectedCategories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center relative bg-secondary border border-secondary/30 text-white  py-1 rounded-md shadow-sm px-5 animate-in zoom-in-95 duration-200"
          >
            <span className="text-sm font-medium whitespace-nowrap">
              {cat.name}
            </span>
            <button
              onClick={() => onRemove(cat.id)}
              className=" hover:bg-red-50 hover:text-red-500 transition-colors absolute -top-2 -left-2 rounded-md bg-white"
            >
              <X className="w-4 h-4 text-error" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
