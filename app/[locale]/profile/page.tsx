import React from "react";
import { TournamentIcon } from "../_components/icons/TournamentIcon";
import { QuestionsAvailableIcon } from "../_components/icons/QuestionsAvailableIcon";
import { AverageRatingIcon } from "../_components/icons/AverageRatingIcon";
import { WinRateIcon } from "../_components/icons/WinRateIcon";
import { ProfileIcon } from "../_components/icons/ProfileIcon";
import { WalletIcon } from "../_components/icons/WalletIcon";
import { ChangePasswordIcon } from "../_components/icons/ChangePasswordIcon";
import { NotificationIcon } from "../_components/icons/NotificationIcon";
import { ContactUsIcon } from "../_components/icons/ContactUsIcon";
import { LanguageIcon } from "../_components/icons/LanguageIcon";
import { PrivacyPolicyIcon } from "../_components/icons/PrivacyPolicyIcon";
import { ArrowRightIcon } from "../_components/icons/ArrowRightIcon";
import { useTranslations } from "next-intl";

export default function ProfilePage() {
  const t = useTranslations("profile");
  const tMenu = useTranslations("profile.menuItems");

  return (
    <div className="flex justify-center items-center text-white flex-col gap-5 lg:container px-5 mx-auto mt-10">
      <p className="text-2xl font-bold lg:text-4xl">{t("title")}</p>
      <p className="text-lg font-bold lg:text-2xl">{t("subtitle")}</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-5">
        <div className="bg-white rounded-[20px] w-full p-4 flex flex-col gap-4 justify-center items-center">
          <div className="bg-green-gradient w-fit p-3 rounded-full">
            <TournamentIcon size={36} />
          </div>
          <p className="text-primary font-bold">15000</p>
          <p className="text-primary font-bold">{t("stats.tournament")}</p>
        </div>
        <div className="bg-white rounded-[20px] w-full p-4 flex flex-col gap-4 justify-center items-center">
          <div className="bg-light-blue-gradient w-fit p-3 rounded-full">
            <QuestionsAvailableIcon size={36} />
          </div>
          <p className="text-primary font-bold">15000</p>
          <p className="text-primary font-bold">
            {t("stats.questionsAvailable")}
          </p>
        </div>
        <div className="bg-white rounded-[20px] w-full p-4 flex flex-col gap-4 justify-center items-center">
          <div className="bg-light-purple-gradient w-fit p-3 rounded-full">
            <AverageRatingIcon size={36} />
          </div>
          <p className="text-primary font-bold">15000</p>
          <p className="text-primary font-bold">{t("stats.averageRating")}</p>
        </div>
        <div className="bg-white rounded-[20px] w-full p-4 flex flex-col gap-4 justify-center items-center">
          <div className="bg-light-orange-gradient w-fit p-3 rounded-full">
            <WinRateIcon size={36} />
          </div>
          <p className="text-primary font-bold">15000</p>
          <p className="text-primary font-bold">{t("stats.winRate")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {/* Personal Information */}
        <div className="bg-white rounded-[20px] px-4 py-6 flex gap-4 justify-between items-center w-full">
          <div className="flex gap-5 items-center">
            <div className="bg-light-blue-gradient w-fit p-2 rounded-xl">
              <ProfileIcon size={36} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-primary font-bold">
                {tMenu("personalInformation.title")}
              </p>
              <p className="text-primary text-[14px]">
                {tMenu("personalInformation.description")}
              </p>
            </div>
          </div>
          <ArrowRightIcon size={36} className="text-secondary" />
        </div>

        {/* Wallet */}
        <div className="bg-white rounded-[20px] px-4 py-6 flex gap-4 justify-between items-center w-full">
          <div className="flex gap-5 items-center">
            <div className="bg-green-gradient w-fit p-2 rounded-xl">
              <WalletIcon size={36} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-primary font-bold">{tMenu("wallet.title")}</p>
              <p className="text-primary text-[14px]">
                {tMenu("wallet.description")}
              </p>
            </div>
          </div>
          <ArrowRightIcon size={36} className="text-secondary" />
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-[20px] px-4 py-6 flex gap-4 justify-between items-center w-full">
          <div className="flex gap-5 items-center">
            <div className="bg-red w-fit p-2 rounded-xl">
              <ChangePasswordIcon size={36} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-primary font-bold">
                {tMenu("changePassword.title")}
              </p>
              <p className="text-primary text-[14px]">
                {tMenu("changePassword.description")}
              </p>
            </div>
          </div>
          <ArrowRightIcon size={36} className="text-secondary" />
        </div>

        {/* About Falta */}
        <div className="bg-white rounded-[20px] px-4 py-6 flex gap-4 justify-between items-center w-full">
          <div className="flex gap-5 items-center">
            <div className="bg-light-purple-gradient w-fit p-2 rounded-xl">
              <ChangePasswordIcon size={36} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-primary font-bold">
                {tMenu("aboutFalta.title")}
              </p>
              <p className="text-primary text-[14px]">
                {tMenu("aboutFalta.description")}
              </p>
            </div>
          </div>
          <ArrowRightIcon size={36} className="text-secondary" />
        </div>

        {/* Notification */}
        <div className="bg-white rounded-[20px] px-4 py-6 flex gap-4 justify-between items-center w-full">
          <div className="flex gap-5 items-center">
            <div className="bg-yellow w-fit p-2 rounded-xl">
              <NotificationIcon size={36} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-primary font-bold">
                {tMenu("notification.title")}
              </p>
              <p className="text-primary text-[14px]">
                {tMenu("notification.description")}
              </p>
            </div>
          </div>
          <ArrowRightIcon size={36} className="text-secondary" />
        </div>

        {/* Contact Us */}
        <div className="bg-white rounded-[20px] px-4 py-6 flex gap-4 justify-between items-center w-full">
          <div className="flex gap-5 items-center">
            <div className="bg-emerald-600 w-fit p-2 rounded-xl">
              <ContactUsIcon size={36} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-primary font-bold">
                {tMenu("contactUs.title")}
              </p>
              <p className="text-primary text-[14px]">
                {tMenu("contactUs.description")}
              </p>
            </div>
          </div>
          <ArrowRightIcon size={36} className="text-secondary" />
        </div>

        {/* Language */}
        <div className="bg-white rounded-[20px] px-4 py-6 flex gap-4 justify-between items-center w-full">
          <div className="flex gap-5 items-center">
            <div className="bg-primary-bg-gradient w-fit p-2 rounded-xl">
              <LanguageIcon size={36} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-primary font-bold">
                {tMenu("language.title")}
              </p>
              <p className="text-primary text-[14px]">
                {tMenu("language.description")}
              </p>
            </div>
          </div>
          <ArrowRightIcon size={36} className="text-secondary" />
        </div>

        {/* Privacy Policy */}
        <div className="bg-white rounded-[20px] px-4 py-6 flex gap-4 justify-between items-center w-full">
          <div className="flex gap-5 items-center">
            <div className="bg-gray-500 w-fit p-2 rounded-xl">
              <PrivacyPolicyIcon size={36} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-primary font-bold">
                {tMenu("privacyPolicy.title")}
              </p>
              <p className="text-primary text-[14px]">
                {tMenu("privacyPolicy.description")}
              </p>
            </div>
          </div>
          <ArrowRightIcon size={36} className="text-secondary" />
        </div>
      </div>
    </div>
  );
}
