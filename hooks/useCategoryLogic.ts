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

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const [selectedCatItems, setSelectedCatItems] = useState<string[]>(() => {
    const stored = SelectedCategoryForCreateGameLs.get();
    return stored ? JSON.parse(stored as string) : [];
  });

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
        const newItems = prev.includes(id)
          ? prev.filter((item) => item !== id)
          : prev.length < MAX_SELECTION
          ? [...prev, id]
          : prev;

        SelectedCategoryForCreateGameLs.set(JSON.stringify(newItems));
        return newItems;
      });
    },
    [MAX_SELECTION]
  );

  const handleRandomSelect = useCallback(() => {
    const remaining = MAX_SELECTION - selectedCatItems.length;
    if (remaining <= 0) return;

    const availablePool: string[] = [];
    const seenIds = new Set(selectedCatItems);

    rawTags.forEach((tag: Tag) => {
      tag.categories?.forEach((cat) => {
        if (!seenIds.has(cat.id) && !cat?.allQuestionUsed) {
          seenIds.add(cat.id);
          availablePool.push(cat.id);
        }
      });
    });

    const randomPicks = [...availablePool]
      .sort(() => 0.5 - Math.random())
      .slice(0, remaining);

    const finalSelection = [...selectedCatItems, ...randomPicks];
    setSelectedCatItems(finalSelection);
    SelectedCategoryForCreateGameLs.set(JSON.stringify(finalSelection));
  }, [MAX_SELECTION, selectedCatItems, rawTags]);

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
  };
}
