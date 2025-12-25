import React from "react";
import { BackHeaderForsubPages } from "../../_components/backHeader/backHeaderForsubPages";
import LoginForm from "../_components/LoginForm";
import LoginButtons from "../_components/SocialLoginButtons";
import { useTranslations } from "next-intl";

export default function page() {
  const t = useTranslations("login-form");
  return (
    <>
      <BackHeaderForsubPages title={t("login")} />
      <div className="w-full max-w-[600px] m-auto mt-10 lg:mt-20">
        <LoginForm />
        <LoginButtons />
      </div>
    </>
  );
}
