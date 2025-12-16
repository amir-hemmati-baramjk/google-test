import { z } from "zod";

export const getContactUsSchema = (t: (key: string) => string) =>
  z.object({
    FirstName: z.string().min(1, { message: t("required") }),
    LastName: z.string().min(1, { message: t("required") }),
    Email: z
      .string()
      .email(t("invalid-email"))
      .min(1, { message: t("required") }),
    Subject: z.string().min(1, { message: t("required") }),
    Description: z
      .string()
      .min(10, { message: t("min-char-size-for-description") })
      .max(500, { message: t("max-char-size-for-description") }),
  });
