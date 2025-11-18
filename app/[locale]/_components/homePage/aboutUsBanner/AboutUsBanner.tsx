import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { ChangeQuestionIcon } from "../../icons/ChangeQuestionIcon";
import { DoublePointsIcon } from "../../icons/DoublePointsIcon";
import { TakePointsIcon } from "../../icons/TakePointsIcon";
import { SkipQuestionIcon } from "../../icons/SkipQuestionIcon";
import { FiftyByFiftyIcon } from "../../icons/FiftyByFiftyIcon";

export default function AboutUsBanner() {
  const t = useTranslations("homepage.Assistance");

  // **Map برای گرادیِنت‌ها**
  const gradientMap: Record<string, string> = {
    "secondary-gradient": "bg-secondary-gradient",
    "light-orange-gradient": "bg-light-orange-gradient",
    "light-blue-gradient": "bg-light-blue-gradient",
    "light-purple-gradient": "bg-light-purple-gradient",
    "light-green-gradient": "bg-light-green-gradient",
  };

  const assistanceItems = [
    {
      icon: <ChangeQuestionIcon size={50} />,
      name: t("change-question"),
      description: t("change-question-hint"),
      varient: "secondary-gradient",
    },
    {
      icon: <DoublePointsIcon size={50} />,
      name: t("double-points"),
      description: t("double-point-hint"),
      varient: "light-orange-gradient",
    },
    {
      icon: <SkipQuestionIcon size={50} />,
      name: t("skip-question"),
      description: t("skip-question-hint"),
      varient: "light-blue-gradient",
    },
    {
      icon: <TakePointsIcon size={50} />,
      name: t("take-points"),
      description: t("take-point-hint"),
      varient: "light-purple-gradient",
    },
    {
      icon: <FiftyByFiftyIcon size={50} />,
      name: t("remove-two-options"),
      description: t("remove-two-options-hint"),
      varient: "light-green-gradient",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      {/* SECTION 1 */}
      <div className="flex justify-between items-center gap-5 max-w-[1400px] mx-auto mt-10 flex-col lg:flex-row">
        <Image
          alt=""
          className="w-full lg:w-1/2"
          width={1000}
          height={1000}
          src={"/staticImages/about-falta.png"}
        />
        <div className="flex flex-col justify-center items-center gap-5 w-full lg:w-1/2">
          <h2 className="text-3xl lg:text-4xl font-[700] text-white text-center">
            Falta Is The Ultimate Trivia Game
          </h2>
          <p className="text-white text-center text-md lg:text-xl max-w-lg">
            We’re A Kuwaiti Team That Believes...
          </p>
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="flex justify-between items-center gap-5 max-w-[1400px] mx-auto mt-5 flex-col lg:flex-row">
        <Image
          alt=""
          className="w-full lg:w-1/2"
          width={1000}
          height={1000}
          src={"/staticImages/assistancebanner.png"}
        />

        {/* GRID ITEMS */}
        <div className="text-secondary text-center w-full lg:w-1/2">
          <h2 className="text-xl text-white font-[700] lg:text-2xl xl:font-3xl mb-4">
            {t("means-of-assistance")}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 justify-items-center">
            {assistanceItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white p-3 rounded-xl w-full max-w-full "
              >
                <div
                  className={`p-3 rounded-xl text-white flex justify-center items-center ${
                    gradientMap[item.varient]
                  }`}
                >
                  {item.icon}
                </div>

                <div className="text-left">
                  <h3 className="text-lg font-[700]">{item.name}</h3>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
