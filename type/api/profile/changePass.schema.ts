import { z } from "zod";

export const getChangePassSchema = (t: (key: string) => string) =>
  z
    .object({
      OldPassword: z
        .string(t("required"))
        .nonempty({ message: t("required") })
        .min(6, { message: t("password-length") }),

      NewPassword: z
        .string(t("required"))
        .nonempty({ message: t("required") })
        .min(6, { message: t("password-length") }),

      ConfirmNewPassword: z
        .string(t("required"))
        .nonempty({ message: t("required") })
        .min(6, { message: t("password-length") }),
    })
    .refine((data) => data.NewPassword === data.ConfirmNewPassword, {
      message: t("passwords-must-match"),
      path: ["ConfirmNewPassword"],
    });
