"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";

import TournamentCard from "../_components/TournamentCard";
import { Loading } from "../../_components/loading/loading";
import { getJoinedTournaments } from "@/core/tournament/get-joined-tournament-service";

export default function JoinedTournamentsPage() {
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
    queryKey: ["tournament-joined", filter],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getJoinedTournaments(pageParam, 10, filter);
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

  const handleFilterChange = (value: string) => {
    if (value === filter) return;
    startTransition(() => setFilter(value));
  };

  const isGlobalLoading = isLoading && !data;
  const joinedTournaments = data?.pages.flatMap((page) => page.data) || [];

  if (isError) {
    return (
      <div className="flex justify-center py-20 text-red-500 font-bold">
        {error instanceof Error ? error.message : t("fetchError")}
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
    <div className="px-3 pb-20 max-w-[1200px] m-auto">
      {/* Filter Section */}
      <div className="relative w-full max-w-[500px] m-auto mt-4 border-[2px] border-primary overflow-hidden rounded-[10px] bg-white shadow-sm">
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

      {/* Grid List Section */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 transition-opacity duration-300 ${
          isPending || isGlobalLoading ? "opacity-50" : "opacity-100"
        }`}
      >
        {isGlobalLoading ? (
          <div className="col-span-full flex justify-center py-20">
            <Loading size="large" variant="primary" />
          </div>
        ) : joinedTournaments.length > 0 ? (
          joinedTournaments.map((tournament) => (
            <TournamentCard
              key={tournament.id}
              {...tournament}
              formatDate={(iso) => new Date(iso).toLocaleString("en-GB")}
            />
          ))
        ) : (
          /* Centered Empty State */
          <div className="col-span-full flex justify-center items-center">
            <div className="text-center py-20 bg-white text-secondary w-full max-w-[500px] rounded-[10px] shadow-sm border border-gray-50">
              <p className="font-medium">{t("noTournaments")}</p>
            </div>
          </div>
        )}
      </div>

      {/* Infinite Scroll Trigger */}
      <div ref={ref} className="h-10" />

      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loading size="small" variant="primary" />
        </div>
      )}
    </div>
  );
}
