import { z } from "zod";

export const getEditProfileSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string(t("required"))
      .nonempty({ message: t("required") })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: t("invalid-email"),
      }),
    BirthDay: z.string(t("required")).nonempty({
      message: t("required"),
    }),
    fullName: z.string(t("required")).nonempty({
      message: t("required"),
    }),
    phoneNumber: z
      .string()
      .optional()
      .refine((val) => !val || /^(?:\+965)?[5692]\d{7}$/.test(val), {
        message: t("invalid-phone"),
      }),
  });
