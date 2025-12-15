// categories/CategoriesPage.tsx

"use client";
import { useQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BackHeaderForsubPages } from "../_components/backHeader/backHeaderForsubPages";
import { useResponsiveConfig } from "@/hooks/useResponsiveConfigForCategoryPage";
import TagTabs from "./_components/TagsTabs";
import VirtualItemWrapper from "./_components/VirtualItemWrapper";
import { useUser } from "@/stores/userContext";
import { Tag } from "@/type/api/categories/categories.type";
import { Category } from "@/type/api/game/game.type";
import { useTranslations } from "next-intl";
import { SelectedCategoryForCreateGameLs } from "@/localeStorage/storage";
import { getUserTag } from "@/core/categories/loged-in-user-categories";
import { getGuestTag } from "@/core/categories/guest-user-categories";
import { Loading } from "../_components/loading/loading";
import { CreateGameModal } from "./_components/CreateGameModal";
import LoginModal from "./_components/LoginModal";
import PaymentModal from "./_components/PaymentModal";

const toast = { error: (msg: string) => console.error("Toast Error:", msg) };

const MAX_CATEGORY_SELECTION = 6;

export default function CategoriesPage() {
  const { isInitialized, isLogin, user } = useUser();
  const t = useTranslations("CategoriesPage");

  const parentRef = useRef<HTMLDivElement>(null);
  const [activeTag, setActiveTag] = useState<string>("");
  const [showCreateGameModal, setShowCreateGameModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCatItems, setSelectedCatItems] = useState<string[]>(() => {
    try {
      const stored = SelectedCategoryForCreateGameLs.get();
      return stored ? JSON.parse(stored as string) : [];
    } catch {
      return [];
    }
  });

  // 2. Max Selection (from user data or default)
  const MAX_SELECTION = useMemo(() => {
    if (!isInitialized) return MAX_CATEGORY_SELECTION;
    const fromUser = user?.maxCategoriesAllowed;
    return Number.isFinite(fromUser as number)
      ? (fromUser as number)
      : MAX_CATEGORY_SELECTION;
  }, [isInitialized, user?.maxCategoriesAllowed]);

  // 3. Selection Map for fast lookups
  const selectedMap = useMemo(
    () => new Set(selectedCatItems),
    [selectedCatItems]
  );

  // --- Data Fetching ---
  const {
    data: TagResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Tag", isLogin], // Added isLogin to queryKey
    queryFn: isLogin ? getUserTag : getGuestTag,
    enabled: Boolean(isInitialized), // Enabled when initialized
  });

  // --- Data Processing ---
  const { columnsCount, getCardHeight, gridClass } = useResponsiveConfig();

  const allSections = useMemo(() => {
    const rawTags = (TagResponse as any)?.data || [];

    const uniqueCategoriesMap = new Map<string, Category>();

    rawTags.forEach((tag: Tag) => {
      if (tag.id === "00000000-0000-0000-0000-000000000000") {
        return;
      }

      tag.categories?.forEach((category: any) => {
        if (category?.id && !uniqueCategoriesMap.has(category.id)) {
          // Type assertion for consistency with game.type.ts Category
          uniqueCategoriesMap.set(category.id, category as Category);
        }
      });
    });

    const allUniqueCategories = Array.from(uniqueCategoriesMap.values());

    const untaggedSection: Tag = {
      id: "all-categories",
      name: t("allCategories"),
      categories: allUniqueCategories,
      isShowable: true,
      displayOrder: 0,
    };

    const filteredRawTags = rawTags.filter(
      (tag: Tag) => tag.id !== "00000000-0000-0000-0000-000000000000"
    );

    return [untaggedSection, ...filteredRawTags];
  }, [TagResponse, t]) as Tag[];

  const tagSections = allSections; // Source of truth for virtualization and lookups

  // Detailed Selected Categories Map (full objects)
  const selectedCategories = useMemo(() => {
    const map = new Map<string, Category>();
    tagSections.forEach((tag) => {
      tag.categories?.forEach((cat) => {
        if (cat?.id && selectedMap.has(cat.id)) {
          map.set(cat.id, cat as Category);
        }
      });
    });
    return map;
  }, [tagSections, selectedMap]);

  // --- Handlers & Callbacks ---

  const handleCategoryToggle = useCallback(
    (id: string) => {
      setSelectedCatItems((prev) => {
        // Deselect
        if (prev.includes(id)) return prev.filter((item) => item !== id);

        // Selection limit check
        if (prev.length >= MAX_SELECTION) {
          return prev;
        }

        // Select
        return [...prev, id];
      });
    },
    [MAX_SELECTION, t]
  );

  // Handler 2: Curried handler for use in the card component
  const handleSelectCategory = useCallback(
    (id: string) => () => handleCategoryToggle(id),
    [handleCategoryToggle]
  );

  // Handler 3: Next Action (Modal/Navigation Logic)
  const handleNextAction = useCallback(() => {
    SelectedCategoryForCreateGameLs.set(JSON.stringify(selectedCatItems));

    try {
      if (!isLogin) {
        setShowLoginModal(true);
      } else if (
        (user?.gPoint || 0) < 100 &&
        process.env.NEXT_PUBLIC_DISABLE_PAYMENT !== "true"
      ) {
        setShowPaymentModal(true);
      } else setShowCreateGameModal(true); // Proceed to game creation modal
    } catch {
      toast.error(t("somethingWentWrong"));
    }
  }, [isLogin, user, selectedCatItems, t]);

  // Effect 1: Local Storage Persistence
  useEffect(() => {
    SelectedCategoryForCreateGameLs.set(JSON.stringify(selectedCatItems));
  }, [selectedCatItems]);

  // Effect 2: Remove invalid categories (e.g., all questions used)
  useEffect(() => {
    if (!tagSections || tagSections.length === 0) return;

    const invalidCatIds = new Set<string>();
    tagSections.forEach((tag) => {
      tag.categories?.forEach((cat) => {
        if (cat.allQuestionUsed) invalidCatIds.add(cat.id);
      });
    });

    if (invalidCatIds.size > 0) {
      setSelectedCatItems((prev) =>
        prev.filter((id) => !invalidCatIds.has(id))
      );
    }
  }, [tagSections]);

  //  Virtualization & Scroll Logic ---
  const getTagSectionHeight = useCallback(
    (tag: Tag) => {
      if (!tag.categories || tag.categories.length === 0) return 180;
      const headerHeight = 40;
      const gridGap = 16;
      const internalGridPadding = 40;
      const separationBuffer = 20;
      const rows = Math.ceil(tag.categories.length / columnsCount);
      const cardHeight = getCardHeight();
      const cardsContainerHeight = rows * cardHeight + (rows - 1) * gridGap;

      return (
        headerHeight +
        cardsContainerHeight +
        internalGridPadding +
        separationBuffer
      );
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

  // Scroll measurement and active tag detection effects
  useEffect(() => {
    virtualizer.measure();
  }, [columnsCount, virtualizer]);

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

  // Filtered list for tabs (excluding "All Categories")
  const tagTabList = useMemo(() => {
    return tagSections.filter((tag) => tag.id !== "all-categories");
  }, [tagSections]);

  // Loading/Error States
  if (isLoading || !isInitialized)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading size="large" variant="light-blue-gradient" />
      </div>
    );

  return (
    <div className="h-screen flex flex-col">
      <BackHeaderForsubPages title={t("createGame")} />

      {/* Tag navigation bar */}
      <TagTabs tags={tagTabList} activeTag={activeTag} onClick={scrollToTag} />

      <div
        ref={parentRef}
        className="flex-1 overflow-auto relative"
        style={{ minHeight: "400px" }}
      >
        {/* Virtualized content wrapper */}
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
                }}
              >
                <VirtualItemWrapper
                  virtualItem={virtualItem}
                  tag={tag}
                  virtualizer={virtualizer as any}
                  gridClass={gridClass}
                  selectedMap={selectedMap}
                  MAX_SELECTION={MAX_SELECTION}
                  handleSelectCategory={handleSelectCategory}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Example of a Next Action Button (You need to implement this button) */}
      <div className=" fixed left-1/2 -translate-x-1/2 bottom-10 w-[260px] flex justify-center items-center">
        <button
          onClick={handleNextAction}
          disabled={selectedCatItems.length === 0}
          className={`w-full py-2 font-bold text-xl rounded-lg transition-all px-3 flex justify-center items-center gap-3 ${
            selectedCatItems.length > 0
              ? "bg-secondary text-white hover:bg-accent"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {t("remaining")} ({MAX_SELECTION - selectedCatItems.length}){" "}
          <div
            className={` py-1.5 px-5 rounded-lg  ${
              selectedCatItems.length > 0
                ? "bg-light-purple text-primary"
                : "bg-light-purple text-gray-500 cursor-not-allowed"
            }`}
          >
            {t("play")}
          </div>
        </button>
      </div>

      <CreateGameModal
        selectedCatItems={selectedCategories}
        setShow={() => setShowCreateGameModal(false)}
        show={showCreateGameModal}
      />
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      />
    </div>
  );
}
