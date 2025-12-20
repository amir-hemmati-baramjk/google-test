import { useEffect, useRef } from "react";

export default function TagTabs({ tags, activeIndex, onTabClick }: any) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeChild = container.children[activeIndex] as HTMLElement;
    if (activeChild) {
      const scrollLeft =
        activeChild.offsetLeft -
        container.offsetWidth / 2 +
        activeChild.offsetWidth / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  return (
    <div className=" sticky top-0 z-40">
      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide py-4 px-4 gap-2"
      >
        {tags.map((tag: any, index: number) => (
          <button
            key={tag.id}
            onClick={() => onTabClick(index)}
            className={`flex-shrink-0 px-5 py-2 text-sm font-bold transition-all rounded-lg whitespace-nowrap ${
              activeIndex === index
                ? "bg-secondary text-white shadow-md scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}
