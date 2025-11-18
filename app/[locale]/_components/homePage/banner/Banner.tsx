import Image from "next/image";
import React from "react";
import { CountriesIcon } from "../../icons/CountriesIcon";
import { TournamentsWonIcon } from "../../icons/TournamentsWonIcon";
import { QuestionsAvailableIcon } from "../../icons/QuestionsAvailableIcon";
import { ProfileIcon } from "../../icons/ProfileIcon";

export default function Banner() {
  const bannerItems = [
    {
      title: "Active Players",
      text: "10,000+",
      icon: <ProfileIcon />,
    },
    {
      title: "Questions Available",
      text: "5,000+",
      icon: <QuestionsAvailableIcon />,
    },
    {
      title: "Tournaments Won",
      text: "10,000+",
      icon: <TournamentsWonIcon />,
    },
    {
      title: "Countries",
      text: "25+",
      icon: <CountriesIcon />,
    },
  ];
  return (
    <div className="m-auto max-w-[1400px] w-full bg-primary-bg-gradient p-3 lg:p-12 gap-5 mt-5 flex justify-between items-center text-white rounded-[16px]">
      <div className="flex flex-col gap-5 lg:gap-16">
        <div className="flex  items-center gap-2 lg:gap-5 ">
          <Image
            alt="falta-logo"
            src="/icons/logo.svg"
            width={40}
            height={40}
            className="w-[40px] h-[40px] lg:w-[80px] lg:h-[80px]"
          />
          <div className="flex flex-col gap-1">
            <p className="text-md lg:text-3xl xl:text-5xl font-[700]">Falta</p>
            <p className="text-xs lg:text-md xl:text-2xl font-[300]">
              The Ultimate Gaming Experience
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-md lg:text-2xl xl:text-4xl font-[700]">
            Browse Game
          </p>
          <p className="text-xs lg:text-md xl:text-xl font-[300]">
            Each User Has One Free Game Through Which You Cantry Existing
            <br />
            Categories And Experience The Thrill Of Competition
          </p>
        </div>
      </div>
      <div className="bg-white p-2 lg:p-5 flex flex-col justify-start items-start gap-2 min-w-[165px] lg:gap-5 rounded-[16px]">
        {bannerItems.map((item, index) => (
          <div
            className="flex justify-center items-center gap-3 lg:gap-5"
            key={index}
          >
            <div className="bg-secondary text-white rounded-[16px] p-2 lg:p-3">
              {item?.icon}
            </div>
            <p className="flex flex-col text-secondary">
              <span className="font-[700] text-sm md:text-md lg:text-xl xl:text-2xl">
                {item?.text}
              </span>
              <span className="font-[400] text-xs md:text-sm lg:text-sm xl:text-lg">
                {item?.title}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
