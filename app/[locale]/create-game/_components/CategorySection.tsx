import { Tag } from "@/type/api/categories/categories.type";
import { Category } from "@/type/api/game/game.type";
import { CategoryCard } from "./CategoryCard";
import { useTranslations } from "next-intl";

interface CategorySectionProps {
  tag: Tag;
  gridClass: string;
  selectedMap: Set<string>;
  MAX_SELECTION: number;
  handleSelectCategory: (id: string) => () => void;
}

export default function CategorySection({
  tag,
  gridClass,

  selectedMap,
  MAX_SELECTION,
  handleSelectCategory,
}: CategorySectionProps) {
  const t = useTranslations("CategoriesPage");

  if (!tag.categories || tag.categories.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 h-[180px] flex items-center justify-center">
        {t("noCategoriesInTag", { tagName: tag.name })}{" "}
      </div>
    );
  }

  return (
    <div className="my-5 px-5">
      <div
        id={`tag-${tag.id}`}
        className="py-4 bg-light-purple text-primary text-center font-bold text-lg shadow-md rounded-lg"
      >
        {tag.name}
      </div>
      <div className={`grid ${gridClass} gap-4 my-5 `}>
        {tag.categories.map((category) => {
          const isSelected = selectedMap.has(category.id);

          const isDisabled = category.allQuestionUsed || false;

          const isSelectionLimitReached =
            !isSelected && selectedMap.size >= MAX_SELECTION;

          return (
            <CategoryCard
              key={category.id}
              data={category as Category}
              isSelected={isSelected}
              isDisabled={isDisabled}
              isSelectionLimitReached={isSelectionLimitReached}
              onSelect={handleSelectCategory(category.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
