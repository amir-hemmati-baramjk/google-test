// components/TeamScoreCard.tsx
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

  // Determine color scheme based on validQuestionId
  const isQuestionPage = !!validQuestionId;

  // Colors based on context
  const primaryColor = isQuestionPage ? "light-purple" : "primary";
  const textColor = isQuestionPage ? "primary" : "light-purple";
  const borderColor = isQuestionPage ? "light-purple" : "primary";
  const hoverColor = isQuestionPage ? "primary/10" : "light-purple/10";
  const loadingBg = isQuestionPage ? "light-purple/10" : "primary/10";

  // Sync local points with store points
  useEffect(() => {
    setLocalPoints(teamPoints);
    targetPointsRef.current = teamPoints;
  }, [teamPoints]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  // Function to debounce API calls
  const debouncedUpdatePoints = useCallback(
    (change: number) => {
      // Calculate new target points
      const newTargetPoints = targetPointsRef.current + change;

      // Prevent negative points
      if (newTargetPoints < 0) {
        toast.warning("Points cannot be negative");
        return;
      }

      // Update local UI immediately for better UX
      setLocalPoints(newTargetPoints);
      targetPointsRef.current = newTargetPoints;

      // Cancel any pending update
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      // Debounce the API call
      updateTimeoutRef.current = setTimeout(async () => {
        try {
          setIsUpdating(true);

          // Call API with the TOTAL points (not the change)
          const response = await updateTeamPoints({
            id: game.id,
            team: teamNumber,
            points: newTargetPoints, // Send the total points, not the change
          });

          if (response.success) {
            // Update the global store with the new total
            useGameStore
              .getState()
              .updateTeamPoints(game.id, teamNumber, newTargetPoints);
          } else {
            // Revert local changes if API fails
            setLocalPoints(teamPoints);
            targetPointsRef.current = teamPoints;
            toast.error(response.errors || "Failed to update points");
          }
        } catch (error: any) {
          // Revert local changes on error
          setLocalPoints(teamPoints);
          targetPointsRef.current = teamPoints;
          toast.error(error.message || "Network error");
        } finally {
          setIsUpdating(false);
        }
      }, 500); // 500ms debounce delay
    },
    [game.id, teamNumber, teamPoints]
  );

  const handleAddPoints = () => {
    debouncedUpdatePoints(100); // Add 100 points
  };

  const handleSubtractPoints = () => {
    debouncedUpdatePoints(-100); // Subtract 100 points
  };

  return (
    <div
      className={`flex justify-center items-center gap-5 w-full mt-auto ${className}`}
    >
      <div className="w-full text-center gap-1 flex flex-col justify-between items-center lg:gap-2 2xl:gap-3 text-[10px] md:text-[16px] lg:text-[14px] xl:text-[24px]">
        {/* Team Name - Color changes based on context */}
        <p
          className={`font-bold bg-light-purple-gradient text-lg  lg:text-lg xl:text-xl 3xl:text-2xl w-full rounded-[10px] py-1 lg:py-2 xl:py-3 
          ${
            isQuestionPage
              ? "text-white bg-light-purple/20 border border-light-purple md:text-xs"
              : "text-light-purple border border-primary"
          }`}
        >
          {teamName}
        </p>

        <div className="w-full flex justify-between items-center gap-2 p-1 m-auto rounded-[8px] h-fit">
          {/* Subtract Points Button */}
          <Button
            className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7  lg:w-10 lg:h-10 xl:w-14 xl:h-14
             ${!isQuestionPage && "md:w-9 md:h-9"} `}
            variant={isQuestionPage ? "secondary" : "primary"}
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
              className={`border-[2px] text-sm sm:text-md lg:text-lg xl:text-xl 2xl:text-2xl h-full rounded-[8px] w-full  flex justify-center items-center font-[700] min-w-[80px] transition-colors
                ${
                  isQuestionPage
                    ? `border-light-purple !bg-light-purple text-primary bg-light-purple/5 `
                    : `border-primary text-primary bg-transparent hover:bg-primary/5 py-2`
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
            className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 lg:w-10 lg:h-10 xl:w-14 xl:h-14
                 ${!isQuestionPage && "md:w-9 md:h-9"} `}
            variant={isQuestionPage ? "secondary" : "primary"}
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
