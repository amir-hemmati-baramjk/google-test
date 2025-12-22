"use client";
import { useLayoutEffect, useRef } from "react";
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

  useLayoutEffect(() => {
    if (elementRef.current) {
      virtualizer.measureElement(elementRef.current);
    }
  }, [tag.categories?.length, virtualizer]);

  return (
    <div
      ref={elementRef}
      data-index={virtualItem.index}
      className="absolute top-0 left-0 w-full p-4"
      style={{ transform: `translateY(${virtualItem.start}px)` }}
    >
      <div className="bg-light-purple rounded-2xl p-4 border border-white/5">
        <h2 className="text-lg font-bold text-white mb-4  px-6 py-2 rounded-full block bg-secondary mx-auto w-fit">
          {tag.name}
        </h2>
        <div
          className={`grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7`}
        >
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
    </div>
  );
}
