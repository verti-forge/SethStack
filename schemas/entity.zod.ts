import { z } from "zod";

export const EntitySchema = z.object({
  id: z.string().min(1),
  label: z.string(),
  type: z.enum(["Concept","Definition","Mechanism","Assertion","Distinction","Note","Relation"]).default("Concept"),
  summary: z.string(),
  source: z.string(),
  first_appearance: z.string(),
  dependencies: z.array(z.string()).default([]),
  relates_to: z.array(z.string()).default([]),
  quotes: z.array(z.string()).default([]),
  status: z.enum(["stable","partial","asserted","complete"]).default("stable"),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([])
});

export type Entity = z.infer<typeof EntitySchema>;
