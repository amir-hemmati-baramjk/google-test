import React from "react";
import { BackHeaderForsubPages } from "../../_components/backHeader/backHeaderForsubPages";
import LoginForm from "../_components/LoginForm";
import LoginButtons from "../_components/SocialLoginButtons";
import SignupForm from "../_components/SignUpForm";
import { useTranslations } from "next-intl";

export default function page() {
  const t = useTranslations("sign-up-form");
  return (
    <div>
      <BackHeaderForsubPages title={t("sign-up")} />
      <div className="max-w-[600px] m-auto mt-10 lg:mt-20">
        <SignupForm />
        <LoginButtons />
      </div>
    </div>
  );
}
