import { z } from "zod";

// Sign In Schema with translation
export const getSignInSchema = (t: (key: string) => string) =>
  z.object({
    userName: z.string().regex(/^(?:\+965)?[5692]\d{7}$/, {
      message: t("invalid-phone"),
    }),
    password: z.string().min(6, {
      message: t("invalid-password"),
    }),
  });

export const getSignInWithEmailSchema = (t: (key: string) => string) =>
  z.object({
    userName: z.string().email({ message: t("invalid-email") }),
    password: z.string().min(6, {
      message: t("invalid-password"),
    }),
  });

// Sign Up Schema with translation
export const getSignUpSchema = (t: (key: string) => string) =>
  z.object({
    phoneNumber: z.string().regex(/^(?:\+965)?[5692]\d{7}$/, {
      message: t("invalid-phone"),
    }),
  });

export const getSignUpWithEmailSchema = (t: any) =>
  z
    .object({
      Name: z.string().min(1, t("required")),
      Email: z.string().email(t("invalid-email")),
      CountryCode: z.string().min(1),
      PhoneNumber: z.string().optional(),
      Password: z.string().min(6, t("password-too-short")),

      // Add ConfirmPassword ONLY for validation purposes
      ConfirmPassword: z.string().min(6, t("password-too-short")),
    })
    .refine((data) => data.Password === data.ConfirmPassword, {
      message: t("passwords-dont-match"),
      path: ["ConfirmPassword"],
    });

// Verify Schema with translation
export const getVerifySchema = (t: (key: string) => string) =>
  z.object({
    phoneNumber: z.string().regex(/^(?:\+965)?[5692]\d{7}$/, {
      message: t("invalid-phone"),
    }),
    otp: z.string().length(6, {
      message: t("invalid-otp"),
    }),
  });

export const getForgetpassSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email({ message: t("invalid-email") }),
  });
export const getVerifyForgetpassSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email({ message: t("invalid-email") }),
    otp: z.string().length(6, {
      message: t("invalid-otp"),
    }),
  });
