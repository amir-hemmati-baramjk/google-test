"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Loading } from "../../_components/loading/loading";
import TournamentCard from "../_components/TournamentCard";
import { getTournaments } from "@/core/tournament/get-tournament-service";

export default function TournamentPage() {
  const t = useTranslations("tournament");
  const { ref, inView } = useInView();
  const [filter, setFilter] = useState("All");
  const [isPending, startTransition] = useTransition();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["tournament-available", filter],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getTournaments("available", pageParam, 10, filter);
      if (response.success && response.data) return response.data;
      throw new Error(response.errors?.toString() || t("fetchError"));
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.pageIndex + 1 : undefined,
    initialPageParam: 0,
    staleTime: 120000,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allTournaments = data?.pages.flatMap((page) => page.data) || [];
  const isGlobalLoading = isLoading && !data;

  return (
    <div className="px-3 pb-20 max-w-[1200px] m-auto">
      {/* Filter Buttons Section */}
      <div className="relative w-full max-w-[500px] m-auto mt-4 border-[2px] border-primary overflow-hidden rounded-[10px] bg-white">
        <div className="flex justify-center items-center gap-2 overflow-x-auto no-scrollbar p-1 lg:p-2">
          {["All", "in-progress", "started", "upcoming"].map((val) => (
            <button
              key={val}
              onClick={() => startTransition(() => setFilter(val))}
              className={`px-5 py-2 rounded-[10px] text-sm font-bold transition-all ${
                filter === val ? "bg-primary text-white" : "text-primary"
              }`}
            >
              {t(val.toLowerCase())}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="flex justify-center flex-wrap items-center gap-4 mt-6"
      >
        {isGlobalLoading ? (
          <div className="py-20">
            <Loading size="large" variant="primary" />
          </div>
        ) : allTournaments.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {allTournaments.map((tournament, index) => (
              <motion.div
                className="w-full md:w-[48%] lg:w-[30%]"
                key={tournament.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <TournamentCard
                  {...tournament}
                  formatDate={(iso) => new Date(iso).toLocaleString("en-GB")}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          /* EMPTY STATE RESTORED */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-[10px] mt-6 text-gray-400 border border-dashed w-full max-w-[500px]"
          >
            {t("noTournaments")}
          </motion.div>
        )}
      </motion.div>

      <div ref={ref} className="h-10" />
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loading size="small" variant="primary" />
        </div>
      )}
    </div>
  );
}
