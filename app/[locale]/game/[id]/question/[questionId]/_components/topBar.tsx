"use client";

import { Button } from "@/app/[locale]/_components/button/button";
import { TimePauseIcon } from "@/app/[locale]/_components/icons/TimePauseIcon";
import { TimeResetIcon } from "@/app/[locale]/_components/icons/TimeResetIcon";

interface TopBarProps {
  questionPoints: number;
}

export default function TopBar({ questionPoints }: TopBarProps) {
  return (
    <div className="w-full m-auto flex justify-around items-center gap-3 absolute -top-5 lg:-top-7 left-0">
      <div className="bg-light-purple px-5 text-secondary border-[2px] border-secondary font-bold rounded-[6px] text-sm md:text-lg lg:text-xl xl:text-2xl">
        points : {questionPoints}
      </div>
      <div className="flex justify-center items-center gap-1">
        <Button
          variant="secondary"
          isOutline
          shape="square"
          className="!p-1 w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14"
        >
          <TimePauseIcon size={48} />
        </Button>
        <div className="text-secondary border-[2px] border-secondary font-bold rounded-[5px] bg-light-purple px-5 p-1 lg:py-2 text-sm md:text-lg lg:text-xl xl:text-2xl">
          00:59
        </div>
        <Button
          variant="secondary"
          isOutline
          shape="square"
          className="!p-1 w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14"
        >
          <TimeResetIcon size={48} />
        </Button>
      </div>
      <div className="hidden sm:block bg-light-purple px-5 text-secondary border-[2px] border-secondary font-bold rounded-[6px] text-sm md:text-lg lg:text-xl xl:text-2xl">
        points : {questionPoints}
      </div>
    </div>
  );
}
