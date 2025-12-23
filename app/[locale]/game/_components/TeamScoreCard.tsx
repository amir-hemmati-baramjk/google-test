"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "../../_components/button/button";
import { PlusIcon, MinusIcon } from "lucide-react";
import { useGameStore } from "@/stores/gameStore";
import { toast } from "react-toastify";
import { updateTeamPoints } from "@/core/game/change-team-points";
import { useParams } from "next/navigation";

interface TeamScoreCardProps {
  teamName: string;
  teamNumber: 1 | 2;
  className?: string;
}

export default function TeamScoreCard({
  teamName,
  teamNumber,
  className = "",
}: TeamScoreCardProps) {
  const game = useGameStore();
  const teamPoints = teamNumber === 1 ? game.teamOnePoints : game.teamTwoPoints;

  const [localPoints, setLocalPoints] = useState(teamPoints);
  const [isUpdating, setIsUpdating] = useState(false);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const targetPointsRef = useRef<number>(teamPoints);
  const { questionId } = useParams();

  const validQuestionId = Array.isArray(questionId)
    ? questionId[0]
    : questionId;

  const isQuestionPage = !!validQuestionId;

  const primaryColor = isQuestionPage ? "light-purple" : "primary";
  const textColor = isQuestionPage ? "primary" : "light-purple";
  const borderColor = isQuestionPage ? "light-purple" : "primary";
  const hoverColor = isQuestionPage ? "primary/10" : "light-purple/10";
  const loadingBg = isQuestionPage ? "light-purple/10" : "primary/10";

  useEffect(() => {
    setLocalPoints(teamPoints);
    targetPointsRef.current = teamPoints;
  }, [teamPoints]);

  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  const debouncedUpdatePoints = useCallback(
    (change: number) => {
      const newTargetPoints = targetPointsRef.current + change;

      if (newTargetPoints < 0) {
        toast.warning("Points cannot be negative");
        return;
      }

      setLocalPoints(newTargetPoints);
      targetPointsRef.current = newTargetPoints;

      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      updateTimeoutRef.current = setTimeout(async () => {
        try {
          setIsUpdating(true);

          const response = await updateTeamPoints({
            id: game.id,
            team: teamNumber,
            points: newTargetPoints,
          });

          if (response.success) {
            useGameStore
              .getState()
              .updateTeamPoints(game.id, teamNumber, newTargetPoints);
          } else {
            setLocalPoints(teamPoints);
            targetPointsRef.current = teamPoints;
            toast.error(response.errors || "Failed to update points");
          }
        } catch (error: any) {
          setLocalPoints(teamPoints);
          targetPointsRef.current = teamPoints;
          toast.error(error.message || "Network error");
        } finally {
          setIsUpdating(false);
        }
      }, 500);
    },
    [game.id, teamNumber, teamPoints]
  );

  const handleAddPoints = () => {
    debouncedUpdatePoints(100);
  };

  const handleSubtractPoints = () => {
    debouncedUpdatePoints(-100);
  };

  return (
    <div
      className={`flex justify-center items-center gap-5 w-full mt-auto ${className}`}
    >
      <div className="w-full text-center gap-1 flex flex-col justify-between items-center lg:gap-2 3xl:gap-2 text-[10px] md:text-[16px] lg:text-[14px] xl:text-[24px]">
        <p
          className={`font-bold  text-lg sm:text-md sm:py-0 lg:text-lg xl:text-xl 3xl:text-2xl w-full rounded-[10px] py-1 lg:py-2 3xl:py-3 
          ${
            teamNumber == 1
              ? "bg-primary-gradient text-white"
              : "bg-orange-gradient text-white"
          }`}
        >
          {teamName}
        </p>

        <div className="w-full flex justify-between items-center gap-2 p-1 m-auto rounded-[8px] h-fit">
          {/* Subtract Points Button */}
          <Button
            className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7  lg:w-10 lg:h-10 3xl:w-14 3xl:h-14
               ${
                 !isQuestionPage &&
                 game?.layoutType === "version2" &&
                 "md:w-9 md:h-9"
               }`}
            variant={teamNumber == 2 ? "orange-gradient" : "primary-gradient"}
            shape="square"
            onClick={handleSubtractPoints}
            disabled={isUpdating || localPoints <= 0}
            isLoading={isUpdating}
          >
            <MinusIcon size={20} />
          </Button>

          {/* Points Display */}
          <div className="relative w-[80%]">
            <div
              className={`border-[2px] text-sm sm:text-md lg:text-lg xl:text-xl 3xl:text-2xl h-full rounded-[8px] w-full  flex justify-center items-center font-[700] min-w-[80px] transition-colors
                ${
                  teamNumber == 2
                    ? `border-orange-600 !bg-white text-orange-600 bg-light-purple/5 py-1`
                    : `border-secondary text-primary bg-white py-1`
                }
                ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {localPoints}
            </div>
            {isUpdating && (
              <div
                className={`absolute inset-0 flex items-center justify-center rounded-[8px] ${loadingBg}`}
              >
                <div
                  className={`animate-spin rounded-full h-6 w-6 border-b-2 ${
                    isQuestionPage ? "border-light-purple" : "border-primary"
                  }`}
                ></div>
              </div>
            )}
          </div>

          {/* Add Points Button */}
          <Button
            className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 lg:w-10 lg:h-10 3xl:w-14 3xl:h-14
                 ${
                   !isQuestionPage &&
                   game?.layoutType === "version2" &&
                   "md:!w-9 md:!h-9"
                 } `}
            variant={teamNumber == 2 ? "orange-gradient" : "primary-gradient"}
            shape="square"
            onClick={handleAddPoints}
            disabled={isUpdating}
            isLoading={isUpdating}
          >
            <PlusIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
