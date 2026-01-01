"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { padWithZero } from "@/utils/string";

export type TimerProgressProps = {
  value: number;
  maxValue: number;
  showTitle?: boolean;
  datePart: string;
  showMinuts?: boolean;
  children: ReactNode;
};

export const LineTimerProgress: React.FC<TimerProgressProps> = ({
  value,
  maxValue,
  children,
  datePart,
  showTitle = true,
}) => {
  const [progressPercent, setProgressPercent] = useState(
    Math.min(100, (value / maxValue) * 100)
  );

  useEffect(() => {
    setProgressPercent(Math.min(100, (value / maxValue) * 100));
  }, [value, maxValue]);

  // Format children as MM : SS
  const formattedTime =
    typeof children === "number"
      ? (() => {
          const minutes = Math.floor(children / 60);
          const seconds = children % 60;
          return `${padWithZero(minutes.toString(), 2)} : ${padWithZero(
            seconds.toString(),
            2
          )}`;
        })()
      : "";

  return (
    <div>
      {showTitle && (
        <label className="line-timer-progress-date-part mb-1 block text-center text-xs text-white font-semibold">
          {datePart}
        </label>
      )}

      <div dir="ltr" className="flex items-center gap-2 w-full">
        <div
          className={`flex-1 border-[.5px] border-white bg-white rounded-full overflow-hidden relative `}
        >
          <div
            className={`bg-error rounded-full transition-all ease-linear h-2 duration-500 `}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="text-sm text-white font-semibold whitespace-nowrap min-w-[60px] text-[10px] text-center">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};
