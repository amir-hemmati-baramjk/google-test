import React from "react";
import AssistanceBox from "../../../_components/AssistanceBox";

export default function GameQuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center gap-5 flex-col sm:flex-row p-3 h-full">
      {children}
      <div className="flex flex-row sm:flex-col xl:justify-around gap-3 md:gap-8  w-full sm:w-1/3 sm:py-5">
        <div className="w-1/2 sm:w-full flex flex-col gap-3">
          <p className="text-sm text-center md:text-md lg:text-lg xl:text-xl text-white">
            baramjk
          </p>
          <div className="w-full text-md md:text-lg lg:text-xl xl:text-2xl text-center rounded-[10px] bg-light-purple text-secondary border-[2px] border-secondary text-secondry py-1">
            1000
          </div>
          <AssistanceBox />
        </div>
        <div className="w-1/2 sm:w-full flex flex-col gap-3">
          <p className="text-sm text-center md:text-md lg:text-lg xl:text-xl text-white">
            baramjk
          </p>
          <div className="w-full text-md md:text-lg lg:text-xl xl:text-2xl text-center rounded-[10px] bg-light-purple text-secondary border-[2px] border-secondary text-secondry py-1">
            1000
          </div>
          <AssistanceBox />
        </div>
      </div>
    </div>
  );
}
