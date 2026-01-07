import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SelectedCategoryForCreateGameLs } from "@/localeStorage/storage";
import { getUserTag } from "@/core/categories/loged-in-user-categories";
import { getGuestTag } from "@/core/categories/guest-user-categories";
import { Tag } from "@/type/api/categories/categories.type";

export function useCategoryLogic(
  searchTerm: string,
  isLogin: boolean,
  isInitialized: boolean,
  user: any
) {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [blacklist, setBlacklist] = useState<Set<string>>(new Set());
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const [selectedCatItems, setSelectedCatItems] = useState<string[]>(() => {
    const stored = SelectedCategoryForCreateGameLs.get();
    return stored ? JSON.parse(stored as string) : [];
  });
  const clearAll = useCallback(() => {
    setBlacklist((prevSet) => {
      const newSet = new Set(prevSet);
      selectedCatItems.forEach((id) => newSet.add(id));
      return newSet;
    });

    setSelectedCatItems([]);
    SelectedCategoryForCreateGameLs.set(JSON.stringify([]));
  }, [selectedCatItems]);
  const { data: tagResponse, isLoading } = useQuery({
    queryKey: ["Tag", isLogin],
    queryFn: isLogin ? getUserTag : getGuestTag,
    enabled: Boolean(isInitialized),
  });

  const rawTags = (tagResponse as any)?.data || [];

  const tagSections = useMemo(() => {
    return rawTags
      .filter((tag: Tag) => tag.id !== "00000000-0000-0000-0000-000000000000")
      .map((tag: Tag) => ({
        ...tag,
        categories: tag.categories?.filter((cat) =>
          cat.name?.toLowerCase().includes(debouncedSearch.toLowerCase())
        ),
      }))
      .filter((tag: Tag) => tag.categories && tag.categories.length > 0);
  }, [rawTags, debouncedSearch]);

  const allUniqueCategories = useMemo(() => {
    const categoriesMap = new Map();
    rawTags.forEach((tag: Tag) => {
      tag.categories?.forEach((cat) => {
        if (!categoriesMap.has(cat.id)) categoriesMap.set(cat.id, cat);
      });
    });
    return Array.from(categoriesMap.values()).filter((cat: any) =>
      cat.name?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [rawTags, debouncedSearch]);

  const selectedObjects = useMemo(() => {
    const allAvailable: any[] = [];
    const seenIds = new Set();
    rawTags.forEach((tag: Tag) => {
      tag.categories?.forEach((cat) => {
        if (!seenIds.has(cat.id)) {
          seenIds.add(cat.id);
          allAvailable.push(cat);
        }
      });
    });
    return allAvailable.filter((cat) => selectedCatItems.includes(cat.id));
  }, [rawTags, selectedCatItems]);

  const MAX_SELECTION = user?.maxCategoriesAllowed ?? 6;

  const handleCategoryToggle = useCallback(
    (id: string) => {
      setSelectedCatItems((prev) => {
        const isRemoving = prev.includes(id);

        if (isRemoving) {
          // Add to blacklist so "Random" won't pick it again this session
          setBlacklist((prevSet) => new Set(prevSet).add(id));
          const newItems = prev.filter((item) => item !== id);
          SelectedCategoryForCreateGameLs.set(JSON.stringify(newItems));
          return newItems;
        } else {
          // If adding, remove from blacklist in case it was there
          setBlacklist((prevSet) => {
            const newSet = new Set(prevSet);
            newSet.delete(id);
            return newSet;
          });
          if (prev.length < MAX_SELECTION) {
            const newItems = [...prev, id];
            SelectedCategoryForCreateGameLs.set(JSON.stringify(newItems));
            return newItems;
          }
          return prev;
        }
      });
    },
    [MAX_SELECTION]
  );

  const handleRandomSelect = useCallback(() => {
    const remaining = MAX_SELECTION - selectedCatItems.length;
    if (remaining <= 0) return;

    const currentSelection = new Set(selectedCatItems);
    const availablePool: string[] = [];

    rawTags.forEach((tag: Tag) => {
      tag.categories?.forEach((cat) => {
        if (
          !currentSelection.has(cat.id) &&
          !blacklist.has(cat.id) && // CHECK BLACKLIST
          !cat?.allQuestionUsed
        ) {
          availablePool.push(cat.id);
        }
      });
    });

    // Remove duplicates from pool
    const uniquePool = Array.from(new Set(availablePool));

    const randomPicks = uniquePool
      .sort(() => 0.5 - Math.random())
      .slice(0, remaining);

    const finalSelection = [...selectedCatItems, ...randomPicks];
    setSelectedCatItems(finalSelection);
    SelectedCategoryForCreateGameLs.set(JSON.stringify(finalSelection));
  }, [MAX_SELECTION, selectedCatItems, rawTags, blacklist]);

  return {
    tagSections,
    allUniqueCategories,
    selectedCatItems,
    selectedObjects,
    handleCategoryToggle,
    handleRandomSelect,
    isLoading,
    MAX_SELECTION,
    debouncedSearch,
    clearAll,
  };
}
