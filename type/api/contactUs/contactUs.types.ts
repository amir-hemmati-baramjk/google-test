import { z } from "zod";
import { getContactUsSchema } from "./contactUs.schema";

const t = (key: string) => key;

const _contactUsSchema = getContactUsSchema(t);

export type contactUs = z.infer<typeof _contactUsSchema>;
