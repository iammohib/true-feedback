import { z } from "zod";

export const verificationSchema = z.object({
  code: z.string().length(6, { message: "Verification code must be 6 digits" }),
});
