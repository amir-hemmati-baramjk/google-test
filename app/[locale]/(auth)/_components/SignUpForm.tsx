"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "../../_components/button/button";

import { useForm } from "react-hook-form";
import { useUser } from "@/stores/userContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { sendAppTokenToServer } from "@/core/auth/set-app-token-notification";
import { registerWithEmail } from "@/core/auth/sign-up-service";

import Textbox from "../../_components/inputs/textBox";
import EmailTextBox from "../../_components/inputs/EmailTextBox";
import PasswordTextbox from "../../_components/inputs/passwordTextbox";
import PhoneTextbox from "../../_components/inputs/phoneTextbox";
import { SignUpWithEmail } from "@/type/api/auth/auth.types";
import { getSignUpWithEmailSchema } from "@/type/api/auth/auth.schema";

const SignupForm = () => {
  const t = useTranslations("sign-up-form");
  const locale = useLocale();
  const router = useRouter();
  const { setIsLogin } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpWithEmail>({
    resolver: zodResolver(getSignUpWithEmailSchema(t)),
    mode: "onChange",
    defaultValues: {
      CountryCode: "+965",
    },
  });

  const onSubmit = async (data: SignUpWithEmail) => {
    setIsLoading(true);
    try {
      const result = await registerWithEmail(data);
      if (result.success) {
        setIsLogin(true);
        await sendAppTokenToServer();
        toast.success(t("registration-success"));
        router.push(`/${locale}/login/success`);
      } else {
        toast.error((result.errors as string) || t("registration-failed"));
      }
    } catch (error: any) {
      toast.error(error.message || t("registration-failed"));
    } finally {
      setIsLoading(false);
    }
  };

  const countryCode = watch("CountryCode") || "+965";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-5 w-full"
    >
      <Textbox
        {...register("Name")}
        name="Name"
        label={t("full-name")}
        placeholder={t("please-enter")}
        error={errors.Name}
        disabled={isLoading}
      />

      <EmailTextBox
        {...register("Email")}
        name="Email"
        label={t("email-address")}
        type="email"
        placeholder={t("please-enter")}
        error={errors.Email}
        disabled={isLoading}
      />

      <PhoneTextbox
        {...register("PhoneNumber")}
        name="PhoneNumber"
        label={`${t("phone-number")} (${t("optional")})`}
        placeholder={t("please-enter")}
        error={errors.PhoneNumber}
        countryCode={countryCode}
        disabled={isLoading}
      />

      <PasswordTextbox
        {...register("Password")}
        name="Password"
        label={t("password")}
        placeholder={t("please-enter")}
        error={errors.Password}
        disabled={isLoading}
      />

      <PasswordTextbox
        {...register("ConfirmPassword")}
        name="ConfirmPassword"
        label={t("confirm-password")}
        placeholder={t("please-enter")}
        error={errors.ConfirmPassword}
        disabled={isLoading}
      />

      <Button
        isLoading={isLoading}
        isDisabled={isLoading || !isValid}
        type="submit"
        shape="full"
        size="large"
        className="mt-5 w-full"
        variant="secondary"
      >
        {t("sign-up")}
      </Button>
      <Button
        onClick={() => router.push("/login")}
        shape="full"
        size="large"
        className="w-full "
        variant="secondary"
        isOutline
      >
        {t("login")}
      </Button>
    </form>
  );
};

export default SignupForm;
