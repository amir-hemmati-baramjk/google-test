"use client";

import { forwardRef, useImperativeHandle, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import classNames from "classnames";

export type TimerRef = {
  start: () => void;
  pause: () => void;
  restart: (expiryTimestamp: Date) => void;
  resume: () => void;
};

export type TimerProps = {
  expiryTimestamp: Date;
  autoStart?: boolean;
  showTitle?: boolean;
  showDays?: boolean;
  showHours?: boolean;
  onExpire?: () => void;
  showMinuts?: boolean;
};

export const TimerCountDown = forwardRef<TimerRef, TimerProps>(
  (
    {
      showMinuts = true,
      expiryTimestamp,
      autoStart = true, // Default to true
      onExpire,
      showTitle = true,
      showDays = true,
      showHours = true,
    },
    ref
  ) => {
    // 1. Remove autoStart from the settings object
    const { days, hours, minutes, seconds, start, pause, resume, restart } =
      useTimer({
        expiryTimestamp: expiryTimestamp.getTime(),
        onExpire,
      });

    // 2. Handle autoStart logic manually
    useEffect(() => {
      if (!autoStart) {
        pause();
      }
    }, [autoStart, pause]);

    useImperativeHandle(ref, () => ({
      start,
      pause,
      resume,
      restart: (newTime: Date) => restart(newTime.getTime()),
    }));

    const renderTimerProgress = (unit: number, datePart: string) => {
      const showBorder = !(datePart === "days" || datePart === "seconds");

      return (
        <div
          key={datePart}
          className={classNames(
            "bg-light-purple text-secondary flex flex-col items-center justify-center flex-1 text-center py-2 min-w-[50px]",
            {
              "border-x-[0.5px] border-white": showBorder,
            }
          )}
        >
          <span className="text-2xl font-bold">
            {String(unit).padStart(2, "0")}
          </span>
          {showTitle && (
            <span className="text-[10px] mt-1 capitalize">{datePart}</span>
          )}
        </div>
      );
    };

    const timeUnits = [
      { show: showDays, unit: days, datePart: "days" },
      { show: showHours, unit: hours, datePart: "hours" },
      { show: showMinuts, unit: minutes, datePart: "minutes" },
      { show: true, unit: seconds, datePart: "seconds" },
    ];

    return (
      <div
        dir="ltr"
        className="flex flex-row overflow-hidden bg-white rounded-[20px] border-[3px] border-secondary w-full"
      >
        {timeUnits.map(({ show, unit, datePart }) =>
          show ? renderTimerProgress(unit, datePart) : null
        )}
      </div>
    );
  }
);

TimerCountDown.displayName = "TimerCountDown";
