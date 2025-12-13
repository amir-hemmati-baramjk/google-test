import { Button } from "@/app/[locale]/_components/button/button";
import PasswordTextbox from "@/app/[locale]/_components/inputs/passwordTextbox";
import { changeUserProfileService } from "@/core/user/change-user-password-service";
import { useRouter } from "@/i18n/navigation";
import { getChangePassSchema } from "@/type/api/profile/changePass.schema";
import { changePass } from "@/type/api/profile/changePass.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ChangePasswordForm() {
  const t = useTranslations("change-password-form");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<changePass>({
    resolver: zodResolver(getChangePassSchema(t)),
  });
  const onSubmit = async (data: changePass) => {
    const response = await changeUserProfileService({
      OldPassword: data?.OldPassword,
      NewPassword: data.NewPassword,
    });
    if (response.success) {
      toast.success(t("password-update-successfully-message"));
      router.back();
    } else {
      toast.error(response.message || t("password-update-failed-message"), {});
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-5 w-full max-w-[450px] m-auto mt-5"
    >
      <PasswordTextbox
        {...register("OldPassword")}
        name={"OldPassword"}
        label={`${t("password")}`}
        placeholder={`${t("please-enter")}`}
        error={errors.OldPassword}
      />
      <PasswordTextbox
        {...register("NewPassword")}
        name={"NewPassword"}
        label={`${t("new-password")}`}
        placeholder={`${t("please-enter")}`}
        error={errors.NewPassword}
      />
      <PasswordTextbox
        {...register("ConfirmNewPassword")}
        name={"ConfirmNewPassword"}
        label={`${t("confirm-new-password")}`}
        placeholder={`${t("please-enter")}`}
        error={errors.ConfirmNewPassword}
      />

      <Button
        isLoading={isLoading}
        isDisabled={isLoading || !isValid}
        type="submit"
        shape="full"
        variant="primary"
      >
        {t("submit")}
      </Button>
    </form>
  );
}
