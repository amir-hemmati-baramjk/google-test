import React from "react";
import { Button } from "../../_components/button/button";
import { useTranslations } from "next-intl";

export default function Banner() {
  const t = useTranslations("GamesPage");

  return (
    <div className="m-auto lg:container w-full bg-primary-bg-gradient p-3 lg:p-12 gap-5 mt-5 flex justify-between items-center text-white rounded-[16px]">
      <div className="flex flex-col gap-5 lg:gap-16 w-full">
        <div className="flex flex-col items-center gap-5 lg:gap-10 w-full">
          <div className="flex flex-col gap-3 lg:gap-5 w-full">
            <p className="text-2xl lg:text-3xl xl:text-5xl font-[700]">
              {t("bannerTitle")}
            </p>
            <p className="max-w-[700px] text-lg lg:text-md xl:text-2xl font-[700]">
              {t("bannerDescription")}
            </p>
          </div>
          <div className="flex items-center gap-5 justify-end w-full mt-10">
            <Button
              className="!font-bold"
              variant="light-purple-gradient"
              size="large"
            >
              {t("buyGames")}
            </Button>
            <Button
              className="!bg-white !text-secondary !font-bold"
              variant="white"
              size="large"
            >
              {t("createGames")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
