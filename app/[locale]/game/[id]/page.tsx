"use client";
import { useGameStore } from "@/stores/gameStore";
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import SponsorsAds from "../_components/SponsorsAds";
import AssistanceBox from "../_components/AssistanceBox";
import TeamScoreCard from "../_components/TeamScoreCard";
import NavigationControls from "../_components/NavigationControls";
import CategoryGrid from "../_components/CategoryGrid";
import NewCategoryGrid from "../_components/NewCategoryGrid";

const calculateVersion1Config = (w: number, h: number) => {
  if (w < 640) return { items: 3, shift: 3 };
  if (h < 900) return { items: 4, shift: 4 };
  return { items: 6, shift: 6 };
};

const calculateVersion2Config = (w: number, h: number) => {
  if (w < 640) return { items: 2, shift: 2 };
  if (w < 768) return { items: 2, shift: 2 };
  if (w < 1024) return { items: 4, shift: 4 };
  return { items: 5, shift: 5 };
};

const gridVariants: Variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    scale: 0.95,
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

export default function Page() {
  const router = useRouter();
  const {
    currentPage,
    setCurrentPage,
    layoutType,
    categories,
    id,
    setPendingDoublePoint,
    setPendingTakePoint,
    setPendingSilence,
  } = useGameStore();

  const [config, setConfig] = useState({ items: 6, shift: 6 });
  const [isMounted, setIsMounted] = useState(false);
  const [direction, setDirection] = useState(0);
  const prevLayoutRef = useRef(layoutType);

  console.log("layout type: ", layoutType);
  const handleConfigUpdate = useCallback(() => {
    if (typeof window === "undefined") return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    const newConfig =
      layoutType === "version1"
        ? calculateVersion1Config(w, h)
        : calculateVersion2Config(w, h);

    setConfig(newConfig);

    if (prevLayoutRef.current !== layoutType) {
      setCurrentPage(0);
      prevLayoutRef.current = layoutType;
    }
  }, [layoutType, setCurrentPage]);

  useEffect(() => {
    setIsMounted(true);
    handleConfigUpdate();

    const orientationMediaQuery = window.matchMedia("(orientation: portrait)");

    const onResize = () => handleConfigUpdate();

    window.addEventListener("resize", onResize);
    orientationMediaQuery.addEventListener("change", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      orientationMediaQuery.removeEventListener("change", onResize);
    };
  }, [handleConfigUpdate]);

  const totalPages = useMemo(() => {
    const totalItems = categories?.length || 0;
    if (totalItems <= config.items) return 1;
    return Math.ceil((totalItems - config.items) / config.shift) + 1;
  }, [categories, config]);

  useEffect(() => {
    if (isMounted && currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
    }
  }, [totalPages, currentPage, isMounted, setCurrentPage]);

  const handlePageChange = (newIdx: number) => {
    if (newIdx >= 0 && newIdx < totalPages) {
      setDirection(newIdx > currentPage ? 1 : -1);
      setCurrentPage(newIdx);
    }
  };

  const onDragEnd = (_: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) handlePageChange(currentPage + 1);
    else if (info.offset.x > threshold) handlePageChange(currentPage - 1);
  };

  const handleQuestionClick = (questionId: string) => {
    const state = useGameStore.getState();
    let url = `/game/${id}/question/${questionId}`;

    if (state.pendingDoublePoint) {
      url += "?assistant=doublePoint";
      setPendingDoublePoint(false);
    } else if (state.pendingTakePoint) {
      url += "?assistant=takePoint";
      setPendingTakePoint(false);
    } else if (state.pendingSilence) {
      url += "?assistant=silence";
      setPendingSilence(false);
    }

    router.push(url);
  };

  if (!isMounted) return null;

  const sharedGridProps = {
    categories: categories || [],
    currentPage: currentPage,
    itemsPerPage: config.items,
    shiftAmount: config.shift,
    onQuestionClick: handleQuestionClick,
    game: useGameStore.getState(),
  };

  return (
    <div className="h-full sm:h-fit lg:h-full w-full overflow-x-hidden">
      {layoutType === "version1" ? (
        <div className="flex justify-between sm:justify-center items-center gap-5 sm:gap-1 lg:gap-5 flex-col sm:flex-row h-full md:px-11">
          <div className="flex flex-col justify-center h-full items-center w-full relative">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={onDragEnd}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`v1-${currentPage}-${config.items}`}
                  custom={direction}
                  variants={gridVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full h-full"
                >
                  <NewCategoryGrid {...sharedGridProps} />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <NavigationControls
              className="flex sm:hidden"
              currentPage={currentPage}
              totalPages={totalPages}
              onPrev={() => handlePageChange(currentPage - 1)}
              onNext={() => handlePageChange(currentPage + 1)}
            />
          </div>
          <NavigationControls
            className="hidden sm:flex sm:flex-col"
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={() => handlePageChange(currentPage - 1)}
            onNext={() => handlePageChange(currentPage + 1)}
          />
          <div className="flex flex-row sm:flex-col gap-3 md:gap-10 3xl:gap-14 w-full sm:w-1/3 bg-light-purple sm:bg-transparent p-2 py-1 pb-10 md:pb-1">
            <div className="w-1/2 sm:w-full flex flex-col gap-2">
              <TeamScoreCard
                teamName={useGameStore.getState().teamOneName}
                teamNumber={1}
              />
              <AssistanceBox team={1} context="gameboard" />
            </div>
            <div className="w-1/2 sm:w-full flex flex-col gap-2">
              <TeamScoreCard
                teamName={useGameStore.getState().teamTwoName}
                teamNumber={2}
              />
              <AssistanceBox team={2} context="gameboard" />
            </div>
            <div className="hidden lg:block">
              <SponsorsAds />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:h-full w-full xl:mt-10 lg:mt-0">
          <div className="py-2 flex flex-col justify-around h-full my-auto md:px-10 relative">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={onDragEnd}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`v2-${currentPage}-${config.items}`}
                  custom={direction}
                  variants={gridVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full h-full"
                >
                  <CategoryGrid
                    handlePageChange={handlePageChange}
                    {...sharedGridProps}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <NavigationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPrev={() => handlePageChange(currentPage - 1)}
              onNext={() => handlePageChange(currentPage + 1)}
            />
          </div>
          <div className="p-2 py-1 lg:py-3 xl:py-5 bg-light-purple w-full flex justify-center items-center h-fit pb-10 md:pb-1 md:px-10">
            <div className="w-1/2 sm:w-2/5 px-2 flex gap-2 justify-center items-center flex-col sm:flex-row ">
              <TeamScoreCard
                teamName={useGameStore.getState().teamOneName}
                teamNumber={1}
              />
              <div className="w-full sm:w-2/3">
                <AssistanceBox team={1} context="gameboard" />
              </div>
            </div>
            <SponsorsAds />
            <div className="w-1/2 sm:w-2/5 px-2 flex gap-2 justify-center items-center flex-col-reverse sm:flex-row">
              <div className="w-full sm:w-2/3">
                <AssistanceBox team={2} context="gameboard" />
              </div>
              <TeamScoreCard
                teamName={useGameStore.getState().teamTwoName}
                teamNumber={2}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
