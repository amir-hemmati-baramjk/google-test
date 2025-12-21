"use client";

import { useQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { useUser } from "@/stores/userContext";
import { useResponsiveConfig } from "@/hooks/useResponsiveConfigForCategoryPage";
import { SelectedCategoryForCreateGameLs } from "@/localeStorage/storage";
import { getUserTag } from "@/core/categories/loged-in-user-categories";
import { getGuestTag } from "@/core/categories/guest-user-categories";
import { Tag } from "@/type/api/categories/categories.type";
import { Category } from "@/type/api/game/game.type";

import TagTabs from "./_components/TagsTabs";
import VirtualItemWrapper from "./_components/VirtualItemWrapper";
import { BackHeaderForsubPages } from "../_components/backHeader/backHeaderForsubPages";
import { Loading } from "../_components/loading/loading";
import { CreateGameModal } from "./_components/CreateGameModal";
import LoginModal from "./_components/LoginModal";
import PaymentModal from "./_components/PaymentModal";
import SelectedItemsBar from "./_components/SelectedItemsBar";
import LogoMotionLoading from "../_components/logoMotionLoading/LogoMotionLoading";

export default function CategoriesPage() {
  const { isInitialized, isLogin, user } = useUser();
  const t = useTranslations("CategoriesPage");
  const parentRef = useRef<HTMLDivElement>(null);

  const [activeTagIndex, setActiveTagIndex] = useState(0);
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

  const { data: tagResponse, isLoading } = useQuery({
    queryKey: ["Tag", isLogin],
    queryFn: isLogin ? getUserTag : getGuestTag,
    enabled: Boolean(isInitialized),
  });

  const { gridClass } = useResponsiveConfig();

  const tagSections = useMemo(() => {
    const rawTags = (tagResponse as any)?.data || [];
    return rawTags.filter(
      (tag: Tag) => tag.id !== "00000000-0000-0000-0000-000000000000"
    );
  }, [tagResponse]);

  const MAX_SELECTION = user?.maxCategoriesAllowed ?? 6;

  const virtualizer = useVirtualizer({
    count: tagSections.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400,
    overscan: 2,
    onChange: (instance) => {
      const scrollOffset = parentRef.current?.scrollTop || 0;
      const items = instance.getVirtualItems();
      if (items.length > 0) {
        const active = items.find((item) => {
          const itemBottom = item.start + item.size;
          return itemBottom > scrollOffset + 120;
        });
        if (active && active.index !== activeTagIndex) {
          setActiveTagIndex(active.index);
        }
      }
    },
  });

  const handleCategoryToggle = useCallback(
    (id: string) => {
      setSelectedCatItems((prev) => {
        if (prev.includes(id)) return prev.filter((item) => item !== id);
        if (prev.length >= MAX_SELECTION) return prev;
        return [...prev, id];
      });
    },
    [MAX_SELECTION]
  );

  const scrollToTag = useCallback(
    (index: number) => {
      virtualizer.scrollToIndex(index, { align: "start", behavior: "smooth" });
    },
    [virtualizer]
  );

  const handleNextAction = () => {
    SelectedCategoryForCreateGameLs.set(JSON.stringify(selectedCatItems));
    if (!isLogin) return setShowLoginModal(true);
    if (
      (user?.gPoint || 0) < 100 &&
      process.env.NEXT_PUBLIC_DISABLE_PAYMENT !== "true"
    ) {
      return setShowPaymentModal(true);
    }
    setShowCreateGameModal(true);
  };

  useEffect(() => {
    SelectedCategoryForCreateGameLs.set(JSON.stringify(selectedCatItems));
  }, [selectedCatItems]);
  const selectedObjects = useMemo(() => {
    const selected: Category[] = [];
    tagSections.forEach((tag: Tag) => {
      tag.categories?.forEach((cat) => {
        if (selectedCatItems.includes(cat.id)) {
          if (!selected.find((s) => s.id === cat.id)) {
            selected.push(cat as Category);
          }
        }
      });
    });
    return selected;
  }, [tagSections, selectedCatItems]);
  if (isLoading || !isInitialized) {
    return (
      <div className="flex justify-center py-20 w-screen h-screen items-center backdrop-blur-3xl absolute top-0 left-0 z-[1000]">
        <LogoMotionLoading />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-primary overflow-hidden">
      <BackHeaderForsubPages title={t("createGame")} />

      <TagTabs
        tags={tagSections}
        activeIndex={activeTagIndex}
        onTabClick={scrollToTag}
      />
      <SelectedItemsBar
        selectedCategories={selectedObjects}
        onRemove={handleCategoryToggle}
        t={t}
      />
      <div ref={parentRef} className="flex-1 overflow-auto relative px-4 pb-32">
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            position: "relative",
            width: "100%",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => (
            <VirtualItemWrapper
              key={virtualItem.key}
              virtualItem={virtualItem}
              tag={tagSections[virtualItem.index]}
              virtualizer={virtualizer}
              gridClass={gridClass}
              selectedMap={new Set(selectedCatItems)}
              MAX_SELECTION={MAX_SELECTION}
              onToggle={handleCategoryToggle}
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xs px-4">
        <button
          onClick={handleNextAction}
          disabled={selectedCatItems.length === 0}
          className={`w-full flex items-center justify-between p-1  rounded-xl font-bold transition-all shadow-xl ${
            selectedCatItems.length > 0
              ? "bg-secondary text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          <span className="text-xl">
            {t("remaining")} ({MAX_SELECTION - selectedCatItems.length})
          </span>
          <div className="bg-light-purple text-secondary px-6 py-2 rounded-lg uppercase">
            {t("play")}
          </div>
        </button>
      </div>

      <CreateGameModal
        show={showCreateGameModal}
        setShow={() => setShowCreateGameModal(false)}
        selectedCatItems={selectedCatItems}
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
