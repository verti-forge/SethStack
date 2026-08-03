import { EntitySchema } from "../schemas/entity.zod";
import { MechanismSchema } from "../schemas/mechanism.zod";
import { AssertionSchema } from "../schemas/assertion.zod";
import { DistinctionSchema } from "../schemas/distinction.zod";

export function validateItems(raw: any[]) {
  const valid: any[] = [];
  const errors: { id?: string; error: string }[] = [];

  // Schema-level validation
  for (const item of raw) {
    try {
      if (item.type === "Mechanism/Process") valid.push(MechanismSchema.parse(item));
      else if (item.type === "Assertion") valid.push(AssertionSchema.parse(item));
      else if (item.type === "Distinction") valid.push(DistinctionSchema.parse(item));
      else valid.push(EntitySchema.parse(item));
    } catch (e: any) {
      errors.push({ id: (item as any)?.id, error: e.message });
    }
  }

  // Duplicate id guardrail: preserve ids from YAML, but treat duplicates as validation errors.
  const byId = new Map<string, any[]>();
  for (const v of valid) {
    const id = (v as any)?.id;
    if (!id) continue;
    const arr = byId.get(id) ?? [];
    arr.push(v);
    byId.set(id, arr);
  }

  const deduped: any[] = [];
  for (const [id, arr] of byId) {
    if (arr.length === 1) {
      deduped.push(arr[0]);
    } else {
      errors.push({ id, error: `Duplicate id '${id}' (${arr.length} items)` });
    }
  }

  return { valid: deduped, errors };
}
