import { z } from "zod";

// @ts-expect-error: expected
export const createGameSchema = (t) =>
  z.object({
    Name: z.string().min(1, { message: t("nameRequired") }),
    teamOneName: z.string().min(1, { message: t("teamOneNameRequired") }),
    teamOnePlayerCount: z
      .number()
      .min(1, { message: t("teamOneShouldHave1Player") })
      .max(500, { message: t("teamOneMaxPlayers") }),
    teamTwoName: z.string().min(1, { message: t("teamTwoNameRequired") }),
    teamTwoPlayerCount: z
      .number()
      .min(1, { message: t("teamTwoShouldHave1Player") })
      .max(500, { message: t("teamTwoMaxPlayers") }),
    assistants: z
      .array(z.string())
      .length(3, { message: t("selectExactlyThreeOption") }),
    time200: z
      .number()
      .min(0, { message: t("timeRequired") || "Time is required" })
      .max(12000, { message: t("timeMax") || "Time cannot exceed 60 seconds" }),
    time400: z
      .number()
      .min(0, { message: t("timeRequired") || "Time is required" })
      .max(18000, { message: t("timeMax") || "Time cannot exceed 60 seconds" }),
    time600: z
      .number()
      .min(0, { message: t("timeRequired") || "Time is required" })
      .max(30000, { message: t("timeMax") || "Time cannot exceed 60 seconds" }),
  });

export const createGameBaseSchema = z.object({
  Name: z.string(),
  teamOneName: z.string(),
  teamOnePlayerCount: z.number(),
  teamTwoName: z.string(),
  teamTwoPlayerCount: z.number(),
  assistants: z.array(z.string()),
  time200: z.number(),
  time400: z.number(),
  time600: z.number(),
});
