import { z } from "zod";
import { getEditProfileSchema } from "./profile.schema";

const t = (key: string) => key;
export type editProfile = z.infer<ReturnType<typeof getEditProfileSchema>>;
