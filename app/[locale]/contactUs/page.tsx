import React from "react";
import { BackHeaderForsubPages } from "../_components/backHeader/backHeaderForsubPages";
import ContactForm from "./_components/ContactForm";
import { ContactUsIcon } from "../_components/icons/ContactUsIcon";
import Link from "next/link";
import { InstagramIcon } from "../_components/icons/Instagram";
import { TikTokIcon } from "../_components/icons/TikTokIcon";
import { WhatsAppIcon } from "../_components/icons/WhatsAppIcon";
import { useTranslations } from "next-intl";

export default function page() {
  const t = useTranslations("contactUs");
  return (
    <div className="pb-10">
      <BackHeaderForsubPages title="Contact Us" />
      <div className="p-5 lg:container m-auto">
        <ContactForm />
      </div>
      <div className="flex flex-col items-center gap-[14px] lg:mt-[35px] font-medium text-white">
        <p className="">{t("contact-management")}</p>
        <Link
          className="bg-secondary text-white p-1 rounded-[10px]"
          href={
            "https://api.whatsapp.com/send/?phone=96555598118&text&type=phone_number&app_absent=0"
          }
        >
          <WhatsAppIcon size={36} />
        </Link>
      </div>
      <div className="flex flex-col items-center mt-3 gap-4 text-white">
        <p className="">{t("social-media")}</p>
        <div className="w-full flex justify-center items-center gap-[18px]">
          <Link
            className="bg-secondary text-white p-1 rounded-[10px]"
            href={"https://www.tiktok.com/@befalta?_t=ZS-8z0D8DXnpBZ&_r=1"}
          >
            <TikTokIcon size={36} />
          </Link>
          <Link
            className="bg-secondary text-white p-1 rounded-[10px]"
            href={"https://www.instagram.com/befalta?igsh=YWl0amFrYmRpcWg4"}
          >
            <InstagramIcon size={36} />
          </Link>
        </div>
      </div>
    </div>
  );
}
