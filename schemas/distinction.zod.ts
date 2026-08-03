import { z } from "zod";

export const DistinctionSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.literal("Distinction"),
  axis: z.tuple([z.string(), z.string()]),
  table: z.array(z.tuple([z.string(), z.string()])),
  source: z.string()
});

export type Distinction = z.infer<typeof DistinctionSchema>;
