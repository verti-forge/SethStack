import { z } from "zod";

export const MechanismSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.literal("Mechanism/Process"),
  summary: z.string(),
  source: z.string(),
  first_appearance: z.string(),
  dependencies: z.array(z.string()).default([]),
  relates_to: z.array(z.string()).default([]),
  quotes: z.array(z.string()).default([]),
  status: z.enum(["partial","complete","asserted"]).default("partial"),
  notes: z.string().optional()
});

export type Mechanism = z.infer<typeof MechanismSchema>;
