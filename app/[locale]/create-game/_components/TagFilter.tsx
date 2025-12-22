"use client";

import { ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface TagFilterProps {
  tags: any[];
  onSelect: (id: string) => void;
  activeTagId: string;
  label: string;
}

export const TagFilter = ({
  tags,
  onSelect,
  activeTagId,
  label,
}: TagFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTag = tags.find((t) => t.id === activeTagId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative shrink-0 min-w-[150px] lg:min-w-[220px]"
      ref={containerRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-2 bg-white text-primary px-4 py-2 rounded-full font-bold text-xs sm:text-sm shadow-sm border border-primary min-w-[120px]"
      >
        <span className="truncate ">{activeTag?.name || label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-56 bg-white rounded-2xl shadow-2xl border border-primary/10 z-[60] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="max-h-72 overflow-y-auto no-scrollbar">
            <button
              onClick={() => {
                onSelect("");
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm hover:bg-light-purple/20 flex justify-between items-center transition-colors"
            >
              <span>{label}</span>
              {!activeTagId && <Check size={16} className="text-secondary" />}
            </button>
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => {
                  onSelect(tag.id);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-sm hover:bg-light-purple/20 border-t border-gray-50 flex justify-between items-center transition-colors"
              >
                <span
                  className={
                    activeTagId === tag.id ? "font-bold text-secondary" : ""
                  }
                >
                  {tag.name}
                </span>
                {activeTagId === tag.id && (
                  <Check size={16} className="text-secondary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
