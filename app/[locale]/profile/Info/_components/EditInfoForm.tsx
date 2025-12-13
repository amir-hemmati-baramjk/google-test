"use client";
import { Button } from "@/app/[locale]/_components/button/button";
import DateTextBox from "@/app/[locale]/_components/inputs/DateTextBox";
import EmailTextBox from "@/app/[locale]/_components/inputs/EmailTextBox";
import PhoneTextbox from "@/app/[locale]/_components/inputs/phoneTextbox";
import Textbox from "@/app/[locale]/_components/inputs/textBox";
import { editProfileService } from "@/core/user/edit-user-profile-service";
import { useUser } from "@/stores/userContext";
import { getEditProfileSchema } from "@/type/api/profile/profile.schema";
import { editProfile } from "@/type/api/profile/profile.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditInfoForm() {
  const { isInitialized, user, isLogin, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("edit-info-form");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<editProfile>({
    resolver: zodResolver(getEditProfileSchema(t)),
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmit = async (data: editProfile) => {
    setIsLoading(true);
    try {
      const response = await editProfileService(data);

      if (response.success) {
        toast.success(t("editProfile-success"));
      } else {
        toast.error(response.message || t("faild-to-editProfile"));
      }
    } catch (error: any) {
      toast.error(error.message || t("faild-to-editProfile"));
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isInitialized) {
      if (isLogin) {
        setValue("email", user?.email ? user?.email : "");
        setValue("phoneNumber", user?.phoneNumber ? user?.phoneNumber : "");
        setValue("BirthDay", user?.birthDay ? user.birthDay.split("T")[0] : "");
        setValue("fullName", user?.fullName ? user?.fullName : "");
      }
    }
  }, [isInitialized]);
  return (
    <form
      className="flex flex-col justify-center items-center gap-5 mt-5 lg:mt-10 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        <Textbox
          {...register("fullName")}
          name={"fullName"}
          label={t("full-name")}
          placeholder={t("please-enter")}
          error={errors.fullName}
        />
        <EmailTextBox
          {...register("email")}
          name="email"
          disabled={true}
          label={t("email-address")}
          placeholder={t("please-enter")}
          error={errors.email}
        />
        <PhoneTextbox
          {...register("phoneNumber")}
          name={"phoneNumber"}
          disabled={false}
          label={t("phone-number")}
          placeholder={`${t("please-enter")}`}
          error={errors.phoneNumber}
        />
        <DateTextBox
          {...register("BirthDay")}
          name={"BirthDay"}
          label={t("date-of-birth")}
          placeholder={`${t("please-enter")}`}
          error={errors.BirthDay}
        />
      </div>

      <Button
        isLoading={isLoading}
        isDisabled={isLoading || !isValid}
        type="submit"
        shape="default"
        variant="primary"
        size="large"
        className="w-full md:w-1/2 mt-5"
      >
        {t("submit")}
      </Button>
    </form>
  );
}
