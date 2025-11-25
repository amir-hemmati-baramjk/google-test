import { useState, useEffect, useCallback, useMemo } from "react";

export function useResponsiveConfig() {
  const [columnsCount, setColumnsCount] = useState(3);

  const breakpoints = useMemo(
    () => [
      { minWidth: 1536, columns: 7 },
      { minWidth: 1280, columns: 6 },
      { minWidth: 1024, columns: 5 },
      { minWidth: 768, columns: 4 },
      { minWidth: 640, columns: 3 },
      { minWidth: 0, columns: 2 },
    ],
    []
  );

  const updateColumns = useCallback(
    (width: number) => {
      const bp =
        breakpoints.find((bp) => width >= bp.minWidth) ||
        breakpoints[breakpoints.length - 1];
      setColumnsCount(bp.columns);
    },
    [breakpoints]
  );

  useEffect(() => {
    const handleResize = () => updateColumns(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateColumns]);

  const getCardHeight = useCallback(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1200;
    if (width >= 1536) return 360;
    if (width >= 1280) return 320;
    if (width >= 1024) return 300;
    if (width >= 768) return 280;
    if (width >= 640) return 270;
    return 240;
  }, []);

  const gridClass = useMemo(() => {
    const gridClasses: Record<number, string> = {
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-3 md:grid-cols-4",
      5: "grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
      6: "grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
      7: "grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7",
    };
    return gridClasses[columnsCount] || "grid-cols-3";
  }, [columnsCount]);

  return { columnsCount, getCardHeight, gridClass };
}
