import React from "react";
import { TournamentIcon } from "../_components/icons/TournamentIcon";
import { QuestionsAvailableIcon } from "../_components/icons/QuestionsAvailableIcon";
import { AverageRatingIcon } from "../_components/icons/AverageRatingIcon";
import { WinRateIcon } from "../_components/icons/WinRateIcon";

export default function index() {
  return (
    <div className="flex justify-center items-center text-white flex-col gap-5 container mx-auto">
      <p className=" text-2xl font-bold lg:text-4xl">MY Profile</p>
      <p className=" text-lg font-bold lg:text-2xl">
        Accounting And Personal Information
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-5">
        <div className="bg-white rounded-[20px] w-full p-4 flex flex-col gap-4 justify-center items-center">
          <div className="bg-green-gradient w-fit p-3 rounded-full">
            <TournamentIcon size={36} />
          </div>
          <p className="text-primary font-bold">Tournament</p>
        </div>
        <div className="bg-white rounded-[20px] w-full p-4 flex flex-col gap-4 justify-center items-center">
          <div className="bg-light-blue-gradient w-fit p-3 rounded-full">
            <QuestionsAvailableIcon size={36} />
          </div>
          <p className="text-primary font-bold">Questions Available </p>
        </div>
        <div className="bg-white rounded-[20px] w-full p-4 flex flex-col gap-4 justify-center items-center">
          <div className="bg-light-purple-gradient w-fit p-3 rounded-full">
            <AverageRatingIcon size={36} />
          </div>
          <p className="text-primary font-bold">Average Rating </p>
        </div>
        <div className="bg-white rounded-[20px] w-full p-4 flex flex-col gap-4 justify-center items-center">
          <div className="bg-light-orange-gradient w-fit p-3 rounded-full">
            <WinRateIcon size={36} />
          </div>
          <p className="text-primary font-bold">Win Rate </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2"></div>
    </div>
  );
}
