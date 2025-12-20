import { useEffect, useRef } from "react";
import { CategoryCard } from "./CategoryCard";

export default function VirtualItemWrapper({
  virtualItem,
  tag,
  virtualizer,
  gridClass,
  selectedMap,
  MAX_SELECTION,
  onToggle,
}: any) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      virtualizer.measureElement(elementRef.current);
    }
  }, [virtualizer, gridClass, tag.categories.length]);

  return (
    <div
      ref={elementRef}
      data-index={virtualItem.index}
      className="absolute top-0 left-0 w-full pt-6"
      style={{ transform: `translateY(${virtualItem.start}px)` }}
    >
      <h2 className="text-lg font-bold mb-4 text-primary bg-light-purple px-1 py-2 text-center rounded-lg">
        {tag.name}
      </h2>
      <div className={`grid gap-4 ${gridClass} `}>
        {tag.categories?.map((cat: any) => (
          <CategoryCard
            key={cat.id}
            data={cat}
            isSelected={selectedMap.has(cat.id)}
            isDisabled={cat.allQuestionUsed}
            isSelectionLimitReached={
              selectedMap.size >= MAX_SELECTION && !selectedMap.has(cat.id)
            }
            onSelect={() => onToggle(cat.id)}
          />
        ))}
      </div>
    </div>
  );
}
