import { z } from "zod";
import { getChangePassSchema } from "./changePass.schema";

const t = (key: string) => key;

export type changePass = z.infer<ReturnType<typeof getChangePassSchema>>;
