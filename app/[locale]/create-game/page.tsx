"use client";

import { useRef, useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Search, X, LayoutGrid, List, Wand2 } from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { useUser } from "@/stores/userContext";
import { useResponsiveConfig } from "@/hooks/useResponsiveConfigForCategoryPage";
import { useCategoryLogic } from "@/hooks/useCategoryLogic";

import VirtualItemWrapper from "./_components/VirtualItemWrapper";
import VirtualGridWrapper from "./_components/VirtualGridWrapper";
import SelectedItemsBar from "./_components/SelectedItemsBar";
import LogoMotionLoading from "../_components/logoMotionLoading/LogoMotionLoading";
import { BackHeaderForsubPages } from "../_components/backHeader/backHeaderForsubPages";
import { TagFilter } from "./_components/TagFilter";
import { PlayActionBar } from "./_components/PlayActionBar";

export default function CategoriesPage() {
  const t = useTranslations("CategoriesPage");
  const parentRef = useRef<HTMLDivElement>(null);
  const { isInitialized, isLogin, user } = useUser();
  const { columnsCount, gridClass } = useResponsiveConfig();

  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTagId, setActiveTagId] = useState("");

  const {
    tagSections,
    allUniqueCategories,
    selectedCatItems,
    selectedObjects,
    handleCategoryToggle,
    handleRandomSelect,
    isLoading,
    MAX_SELECTION,
  } = useCategoryLogic(searchTerm, isLogin, isInitialized, user);

  // --- FILTERING LOGIC ---
  const filteredData = useMemo(() => {
    // If no tag is selected, show everything
    if (!activeTagId)
      return { sections: tagSections, grid: allUniqueCategories };

    // Filter sections for List View
    const sections = tagSections.filter((tag: any) => tag.id === activeTagId);

    // Filter categories for Grid View (Flattened)
    const gridItems = sections.length > 0 ? sections[0].categories : [];

    return { sections, grid: gridItems };
  }, [tagSections, allUniqueCategories, activeTagId]);

  const rowCount =
    viewMode === "list"
      ? filteredData.sections.length
      : Math.ceil(filteredData.grid.length / columnsCount);

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (viewMode === "list" ? 450 : 200),
    overscan: 5,
  });

  const handleTagSelect = (tagId: string) => {
    setActiveTagId(tagId);
    // Reset scroll to top so user sees the start of the filtered results
    virtualizer.scrollToOffset(0);
  };

  if (isLoading || !isInitialized) return <LogoMotionLoading />;

  return (
    <div className="min-h-screen flex flex-col bg-primary overflow-hidden">
      <BackHeaderForsubPages title={t("createGame")} />

      {/* Header Toolbar */}
      <div className="px-4 mt-3 sticky top-0 left-0 z-40">
        <div className="px-4 py-3 bg-light-purple z-20 rounded-lg">
          <div className="flex items-center gap-1.5 md:gap-3">
            {/* Desktop Search */}
            <div className="hidden md:flex relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full bg-white text-primary px-10 py-2 rounded-full outline-none text-[16px] font-medium border border-primary/20"
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40"
                size={18}
              />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 bg-white rounded-full border border-primary text-primary"
            >
              <Search size={20} />
            </button>

            {/* View Switcher */}
            <div className="flex bg-white/10 p-1 rounded-full border border-white/10 shrink-0 gap-1.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-full ${
                  viewMode === "grid" ? "bg-primary text-white" : "text-primary"
                }`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-full ${
                  viewMode === "list" ? "bg-primary text-white" : "text-primary"
                }`}
              >
                <List size={18} />
              </button>
            </div>

            {/* Tag Filter */}
            <TagFilter
              tags={tagSections}
              activeTagId={activeTagId}
              label={t("tags")}
              onSelect={handleTagSelect}
            />

            {/* Random Pick */}
            <button
              onClick={handleRandomSelect}
              className="bg-secondary text-white p-2.5 rounded-full shadow-md shrink-0 active:scale-90 transition-transform"
            >
              <Wand2 size={18} />
            </button>
          </div>

          {/* Mobile Search Drawer */}
          {isSearchOpen && (
            <div className="md:hidden mt-3 relative animate-in slide-in-from-top-2 duration-200">
              <input
                autoFocus
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full bg-white text-primary px-10 py-2.5 rounded-xl outline-none shadow-xl border border-primary/20 text-[16px]"
              />
              <button
                onClick={() => {
                  setSearchTerm("");
                  setIsSearchOpen(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
          )}

          <SelectedItemsBar
            selectedCategories={selectedObjects}
            onRemove={handleCategoryToggle}
            t={t}
          />
        </div>
      </div>

      {/* Main Virtual List */}
      <div
        ref={parentRef}
        className="flex-1 overflow-y-auto relative md:px-4 pb-40 scroll-smooth h-[calc(100vh-200px)]"
      >
        {filteredData.grid.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-white/50">
            <Search size={48} className="mb-4 opacity-20" />
            <p>{t("noResults")}</p>
          </div>
        ) : (
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              position: "relative",
              width: "100%",
            }}
          >
            {virtualizer
              .getVirtualItems()
              .map((virtualItem) =>
                viewMode === "list" ? (
                  <VirtualItemWrapper
                    key={`list-${activeTagId}-${virtualItem.index}`}
                    virtualItem={virtualItem}
                    tag={filteredData.sections[virtualItem.index]}
                    virtualizer={virtualizer}
                    gridClass={gridClass}
                    selectedMap={new Set(selectedCatItems)}
                    MAX_SELECTION={MAX_SELECTION}
                    onToggle={handleCategoryToggle}
                  />
                ) : (
                  <VirtualGridWrapper
                    key={`grid-${activeTagId}-${virtualItem.index}`}
                    virtualItem={virtualItem}
                    allCategories={filteredData.grid}
                    columns={columnsCount}
                    virtualizer={virtualizer}
                    selectedMap={new Set(selectedCatItems)}
                    MAX_SELECTION={MAX_SELECTION}
                    onToggle={handleCategoryToggle}
                  />
                )
              )}
          </div>
        )}
      </div>

      <PlayActionBar
        selectedCount={selectedCatItems.length}
        selectedCatItems={selectedCatItems}
        maxCount={MAX_SELECTION}
        isLogin={isLogin}
        t={t}
      />
    </div>
  );
}
