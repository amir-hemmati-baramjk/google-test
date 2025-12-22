"use client";
import { useLayoutEffect, useRef } from "react";
import { CategoryCard } from "./CategoryCard";

export default function VirtualGridWrapper({
  virtualItem,
  allCategories,
  columns,
  selectedMap,
  MAX_SELECTION,
  onToggle,
  virtualizer,
}: any) {
  const elementRef = useRef<HTMLDivElement>(null);
  const startIndex = virtualItem.index * columns;
  const rowItems = allCategories.slice(startIndex, startIndex + columns);

  useLayoutEffect(() => {
    if (elementRef.current) {
      virtualizer.measureElement(elementRef.current);
    }
  }, [virtualizer, columns, rowItems.length]);

  return (
    <div
      ref={elementRef}
      data-index={virtualItem.index}
      className="absolute top-0 left-0 w-full grid gap-4 p-4"
      style={{
        transform: `translateY(${virtualItem.start}px)`,
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {rowItems.map((cat: any) => (
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
  );
}
