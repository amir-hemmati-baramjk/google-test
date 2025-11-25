"use client";
import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { BackHeaderForsubPages } from "../_components/backHeader/backHeaderForsubPages";
import { useUser } from "@/stores/userContext";
import { getGuestTag } from "@/core/categories/guest-user-categories";
import { useQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useResponsiveConfig } from "@/hooks/useResponsiveConfigForCategoryPage";
import CategorySection from "./_components/CategorySection";
import TagTabs from "./_components/TagsTabs";
import { Tag } from "@/type/api/categories/categories.type";

export default function CategoriesPage() {
  const { isInitialized, isLogin } = useUser();
  const {
    data: TagResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Tag"],
    queryFn: getGuestTag,
    enabled: Boolean(isInitialized && isLogin),
  });

  const parentRef = useRef<HTMLDivElement>(null);
  const { columnsCount, getCardHeight } = useResponsiveConfig();
  const [activeTag, setActiveTag] = useState<string>("");

  const tagSections = useMemo(
    () => (TagResponse as any)?.data || [],
    [TagResponse]
  );

  const getTagSectionHeight = useCallback(
    (tag: Tag) => {
      const headerHeight = 60;
      const padding = 40;
      const rows = Math.ceil((tag.categories?.length || 0) / columnsCount);
      return headerHeight + rows * getCardHeight() + padding;
    },
    [columnsCount, getCardHeight]
  );

  const tagPositions = useMemo(() => {
    const positions: Record<string, number> = {};
    let current = 0;
    tagSections.forEach((tag: Tag) => {
      positions[tag.id] = current;
      current += getTagSectionHeight(tag);
    });
    return positions;
  }, [tagSections, getTagSectionHeight]);

  const virtualizer = useVirtualizer({
    count: tagSections.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => getTagSectionHeight(tagSections[index]),
    overscan: 2,
  });

  const scrollToTag = useCallback(
    (tagId: string) => {
      const position = tagPositions[tagId];
      if (position !== undefined && parentRef.current) {
        parentRef.current.scrollTo({ top: position, behavior: "smooth" });
        setActiveTag(tagId);
      }
    },
    [tagPositions]
  );

  useEffect(() => virtualizer.measure(), [columnsCount, virtualizer]);

  useEffect(() => {
    const scrollEl = parentRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      const scrollTop = scrollEl.scrollTop;
      let activeId = tagSections[0]?.id || "";
      for (let tag of tagSections) {
        if (scrollTop >= tagPositions[tag.id] - 100) activeId = tag.id;
        else break;
      }
      if (activeId !== activeTag) setActiveTag(activeId);
    };

    scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, [tagSections, tagPositions, activeTag]);

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        در حال بارگذاری دسته‌بندی‌ها...
      </div>
    );
  if (error)
    return (
      <div className="h-screen flex items-center justify-center text-red-600">
        خطا در بارگذاری دسته‌بندی‌ها
      </div>
    );
  if (!tagSections.length)
    return (
      <div className="h-screen flex items-center justify-center">
        دسته‌بندی‌ای یافت نشد
      </div>
    );

  return (
    <div className="h-screen flex flex-col">
      <BackHeaderForsubPages title="create game" />
      <TagTabs tags={tagSections} activeTag={activeTag} onClick={scrollToTag} />
      <div
        ref={parentRef}
        className="flex-1 overflow-auto"
        style={{ minHeight: "400px" }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const tag = tagSections[virtualItem.index];
            return (
              <div
                key={tag.id}
                style={{
                  position: "absolute",
                  top: `${virtualItem.start}px`,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                }}
              >
                <CategorySection tag={tag} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
