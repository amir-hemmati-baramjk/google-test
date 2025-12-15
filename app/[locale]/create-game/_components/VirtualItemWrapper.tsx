import { Tag } from "@/type/api/categories/categories.type";
import { useVirtualizer, VirtualItem } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import CategorySection from "./CategorySection";

interface VirtualItemWrapperProps {
  virtualItem: VirtualItem;
  tag: Tag;
  virtualizer: ReturnType<typeof useVirtualizer>;
  gridClass: string;

  selectedMap: Set<string>;
  MAX_SELECTION: number;
  handleSelectCategory: (id: string) => () => void;
}

export default function VirtualItemWrapper({
  virtualItem,
  tag,
  virtualizer,
  gridClass,

  selectedMap,
  MAX_SELECTION,
  handleSelectCategory,
}: VirtualItemWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      virtualizer.measureElement(ref.current);
    }
  }, [tag.categories.length, virtualItem.index, virtualizer, gridClass]);

  return (
    <div
      ref={ref}
      data-index={virtualItem.index}
      style={{ width: "100%", overflow: "hidden" }}
    >
      <CategorySection
        tag={tag}
        gridClass={gridClass}
        selectedMap={selectedMap}
        MAX_SELECTION={MAX_SELECTION}
        handleSelectCategory={handleSelectCategory}
      />
    </div>
  );
}
