import { z } from "zod";

export const AssertionSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.literal("Assertion"),
  summary: z.string(),
  source: z.string(),
  first_appearance: z.string(),
  dependencies: z.array(z.string()).default([]),
  relates_to: z.array(z.string()).default([]),
  quotes: z.array(z.string()).default([]),
  status: z.enum(["stable","contested"]).default("stable"),
  notes: z.string().optional()
});

export type Assertion = z.infer<typeof AssertionSchema>;
