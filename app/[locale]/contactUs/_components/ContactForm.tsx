"use client";
import React, { useState, useTransition } from "react";
import Textbox from "../../_components/inputs/textBox";
import { Button } from "../../_components/button/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { getContactUsSchema } from "@/type/api/contactUs/contactUs.schema";
import { contactUs as ContactUsType } from "@/type/api/contactUs/contactUs.types";

import { toast } from "react-toastify";
import classNames from "classnames";
import { contactUsService } from "@/core/contactUs/contact-us-service";

export default function ContactForm() {
  const t = useTranslations("contactUs");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactUsType>({
    resolver: zodResolver(getContactUsSchema(t)),
    defaultValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Subject: "",
      Description: "",
    },
  });

  const onSubmit = (data: ContactUsType) => {
    startTransition(async () => {
      const response = await contactUsService(data);

      if (response.success) {
        toast.success(
          t("message-sent-success") || "Message sent successfully!"
        );
        reset();
      } else {
        const errorMessage =
          typeof response.errors === "string"
            ? response.errors
            : t("something-went-wrong");
        toast.error(errorMessage);
      }
    });
  };

  return (
    <form
      className="flex flex-col justify-center items-center gap-5 mt-5 lg:mt-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-4 w-full">
        <Textbox
          {...register("Email")}
          name={"Email"}
          type="email"
          label={`${t("email-address")}`}
          placeholder={`${t("please-enter")}`}
          error={errors.Email}
          disabled={isPending}
        />

        <Textbox
          {...register("FirstName")}
          name={"FirstName"}
          label={`${t("first-name")}*`}
          placeholder={`${t("please-enter")}`}
          error={errors.FirstName}
          disabled={isPending}
        />

        <Textbox
          {...register("LastName")}
          name={"LastName"}
          label={`${t("last-name")}*`}
          placeholder={`${t("please-enter")}`}
          error={errors.LastName}
          disabled={isPending}
        />

        <Textbox
          {...register("Subject")}
          name={"Subject"}
          label={`${t("subject")}`}
          placeholder={`${t("please-enter")}`}
          error={errors.Subject}
          disabled={isPending}
        />

        <div className="w-full">
          <label
            className={classNames(
              "label-ghost font-medium block mx-1 mb-1 text-[14px]",
              isPending && "opacity-50"
            )}
          >
            {t("description")}*
          </label>
          <textarea
            {...register("Description")}
            placeholder={`${t("please-enter")}`}
            rows={10}
            disabled={isPending}
            className={classNames(
              "textbox textbox-ghost min-h-[150px]",
              errors.Description && "border-error"
            )}
          />
          {errors.Description && (
            <p className="text-error text-[12px] mt-1">
              {errors.Description?.message}
            </p>
          )}
        </div>
        <div></div>
      </div>
      <Button
        variant={"secondary"}
        className="w-full md:w-1/2"
        type="submit"
        size="large"
        isLoading={isPending}
        disabled={isPending}
      >
        {t("submit")}
      </Button>
    </form>
  );
}
