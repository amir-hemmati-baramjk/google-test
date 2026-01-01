"use client";
import React, { useEffect } from "react";
import { BackHeaderForsubPages } from "../../_components/backHeader/backHeaderForsubPages";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getTournamentById } from "@/core/tournament/get-tournament-by-id-service";
import { getTournamentQuestionsById } from "@/core/tournament/get-tournament-question-service";
import { useTournamentStore } from "@/stores/tournamentStore";
import LogoMotionLoading from "../../_components/logoMotionLoading/LogoMotionLoading";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { setTournament, setQuestions } = useTournamentStore();

  const { data: tournament, isLoading: isTournamentLoading } = useQuery({
    queryKey: ["tournament", id],
    queryFn: async () => {
      const res = await getTournamentById(id);
      if (res.success && res.data) return res.data;
      throw new Error(res?.message);
    },
    enabled: !!id,
    refetchInterval: (query) => {
      const data = query.state.data;
      return data?.isFinishedByUser || data?.isFinished ? false : 5000;
    },
  });

  const { data: questions } = useQuery({
    queryKey: ["questions", id],
    queryFn: async () => {
      const res = await getTournamentQuestionsById(id);
      if (res.success && Array.isArray(res.data)) return res.data;
      throw new Error(res?.message);
    },
    enabled:
      !!tournament &&
      !tournament?.isFinishedByUser &&
      !tournament?.isFinished &&
      (!!tournament.isInProgress ||
        new Date(tournament.startAt).getTime() <= Date.now()),
  });

  useEffect(() => {
    if (tournament) setTournament(tournament);
  }, [tournament, setTournament]);

  useEffect(() => {
    if (!questions || questions.length === 0 || tournament?.isFinishedByUser)
      return;
    setQuestions(questions);
    const pathParts = window.location.pathname.split("/");
    if (pathParts.length === 4) {
      router.replace(`/tournament/${id}/${questions[0].id}`);
    }
  }, [questions, id, setQuestions, router, tournament?.isFinishedByUser]);

  useEffect(() => {
    if (tournament?.isFinishedByUser || tournament?.isFinished) {
      router.replace(`/tournament/${id}/leaderboard`);
    }
  }, [tournament?.isFinishedByUser, tournament?.isFinished, id, router]);

  if (isTournamentLoading || !tournament) {
    return (
      <div className="fixed top-0 left-0 w-full h-full z-[9999] backdrop-blur-md bg-black/40 flex items-center justify-center">
        <LogoMotionLoading />
      </div>
    );
  }

  return (
    <div className="pb-32">
      <BackHeaderForsubPages to="/tournament/joined" title={tournament?.name} />
      {children}
    </div>
  );
}
