import React, { useMemo } from "react";
import CategoryCard from "./CategoryCard";
import { useResponsiveConfig } from "@/hooks/useResponsiveConfigForCategoryPage";

interface Tag {
  id: string;
  name: string;
  categories: any[];
}

interface Props {
  tag: Tag;
}

export default function CategorySection({ tag }: Props) {
  const { gridClass } = useResponsiveConfig();

  if (!tag.categories || tag.categories.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {tag.name} دسته‌ای ندارد
      </div>
    );
  }

  return (
    <div className="my-5">
      <div
        id={`tag-${tag.id}`}
        className="py-4 bg-turquoise-gradient text-white text-center font-bold text-lg shadow-md"
      >
        {tag.name}
      </div>
      <div className={`grid ${gridClass} gap-4 my-5 px-5`}>
        {tag.categories.map((category) => (
          <CategoryCard
            key={category.id}
            data={category}
            isDisabled={false}
            isSelected={false}
            isSelectionLimitReached={false}
            onSelect={() => console.log("Selected:", category.name)}
          />
        ))}
      </div>
    </div>
  );
}
