"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import PhoneTextbox from "../../_components/inputs/phoneTextbox";
import PasswordTextbox from "../../_components/inputs/passwordTextbox";
import { Link } from "@/i18n/navigation";
import { Button } from "../../_components/button/button";
import { useForm } from "react-hook-form";
import { useUser } from "@/stores/userContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/core/auth/login-service";
import { toast } from "react-toastify";
import { sendAppTokenToServer } from "@/core/auth/set-app-token-notification";
import EmailTextBox from "../../_components/inputs/EmailTextBox";
import { SignIn, SignInWithEmail } from "@/type/api/auth/auth.types";
import { getSignInWithEmailSchema } from "@/type/api/auth/auth.schema";

const LoginForm = () => {
  const t = useTranslations("login-form");
  const locale = useLocale();
  const router = useRouter();
  const { setIsLogin } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInWithEmail>({
    resolver: zodResolver(getSignInWithEmailSchema(t)),
    mode: "onChange",
  });

  const onSubmit = async (data: SignInWithEmail) => {
    setIsLoading(true);
    try {
      const result = await loginUser(data);
      if (result.success) {
        setIsLogin(true);
        await sendAppTokenToServer();
        toast.success(t("login-success"));
        router.push(`/${locale}/login/success`);
      } else {
        toast.error((result.errors as string) || t("login-failed"));
      }
    } catch (error: any) {
      toast.error(error.message || t("login-failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-5 w-full"
    >
      <EmailTextBox
        {...register("userName")}
        name="userName"
        label={t("email-address")}
        placeholder={t("please-enter")}
        error={errors.userName}
        disabled={isLoading}
      />

      <PasswordTextbox
        {...register("password")}
        name="password"
        label={t("password")}
        placeholder={t("please-enter")}
        error={errors.password}
        disabled={isLoading}
      />
      {/* 
      <Link
        href={`/forgetPassword`}
        className="text-error w-full text-start text-sm hover:underline"
      >
        {t("forgot")} {t("password")}?
      </Link> */}

      <Button
        isLoading={isLoading}
        isDisabled={isLoading || !isValid}
        type="submit"
        shape="full"
        size="large"
        className="mt-5 w-full"
        variant="primary"
      >
        {t("login")}
      </Button>
    </form>
  );
};

export default LoginForm;
