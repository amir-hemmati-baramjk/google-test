"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { PrizeIcon } from "../../_components/icons/PrizeIcon";
import { ChangeQuestionIcon } from "../../_components/icons/ChangeQuestionIcon";
import { ParticipantsIcon } from "../../_components/icons/ParticipantsIcon";
import { GameStartIcon } from "../../_components/icons/GameStartIcon";
import { useRouter } from "next/navigation";
import { joinTournament } from "@/core/tournament/join-tournament-service";
import { toast } from "react-toastify";

interface TournamentCardProps {
  id: string;
  name: string;
  picture?: { downloadUrl: string };
  prize?: string | number;
  questionCount: number;
  participantCount?: number;
  startAt: string;
  isUserJoined?: boolean;
  formatDate: (iso: string) => string;
}

export default function TournamentCard({
  name,
  picture,
  prize = "1,000",
  questionCount,
  participantCount = 0,
  startAt,
  isUserJoined,
  id,
  formatDate,
}: TournamentCardProps) {
  const t = useTranslations("tournament");
  const router = useRouter();
  const handleJoin = async () => {
    const response = await joinTournament(id);
    if (response?.success) {
      router.push(`/tournament/${id}`);
    } else {
      toast.error(response?.message);
    }
  };
  const handleClick = () => {
    if (isUserJoined) {
      router.push(`/tournament/${id}`);
    } else {
      handleJoin();
    }
  };
  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm p-3 flex flex-col gap-4 border border-gray-50 w-full">
      {/* Banner Image */}
      <div className="relative w-full aspect-[16/9] rounded-[18px] overflow-hidden bg-primary/10">
        <Image
          src={
            picture?.downloadUrl ||
            "/assets/staticImages/default-tournament.png"
          }
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 px-1">
        <h3 className="text-primary text-center text-[20px] font-bold mb-1 truncate max-h-10">
          {name}
        </h3>

        {/* Stats List */}
        <div className="flex flex-col gap-3">
          <StatRow
            icon={<PrizeIcon size={24} className="text-primary" />}
            label={t("prize")}
            value={`$${prize}`}
          />
          <StatRow
            icon={<ChangeQuestionIcon size={24} className="text-primary" />}
            label={t("questions")}
            value={questionCount}
          />
          <StatRow
            icon={<ParticipantsIcon size={24} className="text-primary" />}
            label={t("participants")}
            value={`${participantCount}+`}
          />
          <StatRow
            icon={<GameStartIcon size={24} className="text-primary" />}
            label={t("gameStart")}
            value={formatDate(startAt)}
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-2 flex justify-center">
        <button
          onClick={handleClick}
          className={`w-fit min-w-[160px] py-3 px-8 rounded-full text-[16px] font-medium transition-all ${
            isUserJoined
              ? "bg-[#EBE2FF] text-primary hover:bg-[#decfff]"
              : "bg-primary text-white shadow-md active:scale-95 hover:opacity-90"
          }`}
        >
          {isUserJoined ? t("viewDetails") : t("join-now")}
        </button>
      </div>
    </div>
  );
}

function StatRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-primary font-bold text-[15px]">{label}</span>
      </div>
      <span className="text-primary font-bold text-[15px]">{value}</span>
    </div>
  );
}
