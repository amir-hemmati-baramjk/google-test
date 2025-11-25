import React from "react";

interface Props {
  tags: { id: string; name: string }[];
  activeTag: string;
  onClick: (id: string) => void;
}

export default function TagTabs({ tags, activeTag, onClick }: Props) {
  return (
    <div className="sticky top-0 z-50 shadow-sm ">
      <div className="flex overflow-x-auto scrollbar-hide py-3 px-4 gap-2">
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => onClick(tag.id)}
            className={`flex-shrink-0 px-4 py-2 text-sm font-[700] rounded-[10px] whitespace-nowrap transition-colors ${
              activeTag === tag.id
                ? "bg-secondary text-white shadow-md"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}
