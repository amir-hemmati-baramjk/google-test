"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";
import { Loading } from "../_components/loading/loading";
import TournamentCard from "./_components/TournamentCard";
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
      throw new Error(
        response.errors?.toString() || t("tournament.fetchError")
      );
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.pageIndex + 1 : undefined,
    initialPageParam: 0,
    staleTime: 120000,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleFilterChange = (value: string) => {
    if (value === filter) return;
    startTransition(() => setFilter(value));
  };

  const isGlobalLoading = isLoading && !data;
  const allTournaments = data?.pages.flatMap((page) => page.data) || [];

  if (isError) {
    return (
      <div className="flex justify-center py-20 text-red-500 font-bold">
        {error instanceof Error ? error.message : t("tournament.fetchError")}
      </div>
    );
  }

  const filterOptions = [
    { label: t("all"), value: "All" },
    { label: t("in-progress"), value: "inprogress" },
    { label: t("started"), value: "started" },
    { label: t("upcoming"), value: "upcoming" },
  ];

  return (
    <div className="px-3 pb-20">
      {/* Filter Section */}
      <div className="relative w-full max-w-[500px] m-auto mt-4 border-[2px] border-primary overflow-hidden rounded-[10px] bg-white">
        <div className="flex justify-center items-center gap-2 overflow-x-auto no-scrollbar p-1 lg:p-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              disabled={isPending || isGlobalLoading}
              onClick={() => handleFilterChange(option.value)}
              className={`px-5 lg:px-8 py-2 rounded-[10px] text-sm font-bold transition-all whitespace-nowrap border ${
                filter === option.value
                  ? "bg-primary text-white border-primary shadow-md"
                  : "bg-white text-primary border-transparent"
              } ${
                isPending || isGlobalLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* List Section */}
      <div
        className={`flex flex-col gap-4 mt-6 transition-opacity duration-300 ${
          isPending || isGlobalLoading ? "opacity-50" : "opacity-100"
        }`}
      >
        {isGlobalLoading ? (
          <div className="flex justify-center py-20">
            <Loading size="large" variant="primary" />
          </div>
        ) : allTournaments.length > 0 ? (
          allTournaments.map((tournament) => (
            <TournamentCard
              key={tournament.id}
              {...tournament}
              formatDate={(iso) => new Date(iso).toLocaleString("en-GB")}
            />
          ))
        ) : (
          <div className="text-center py-20 bg-white text-secondary w-full max-w-[500px] m-auto rounded-[10px]">
            {t("noTournaments")}
          </div>
        )}
      </div>

      <div ref={ref} className="h-10" />
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loading size="small" variant="primary" />
        </div>
      )}
    </div>
  );
}
