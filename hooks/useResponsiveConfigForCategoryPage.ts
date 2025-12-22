"use client";
import { useCallback, useEffect, useState } from "react";

export function useResponsiveConfig() {
  const [columnsCount, setColumnsCount] = useState(2);

  const updateColumns = useCallback(() => {
    if (typeof window === "undefined") return;
    const width = window.innerWidth;

    let cols = 2; // Default for mobile (sm)
    if (width >= 1536) cols = 7;
    else if (width >= 1280) cols = 6;
    else if (width >= 1024) cols = 5;
    else if (width >= 768) cols = 4;

    setColumnsCount(cols);
  }, []);

  useEffect(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [updateColumns]);

  // Use a string that matches your columnsCount state perfectly
  const gridClass =
    "grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7";

  return { columnsCount, gridClass };
}
