import type { Entity } from "../schemas/entity.zod";
import type { Mechanism } from "../schemas/mechanism.zod";
import type { Assertion } from "../schemas/assertion.zod";
import type { Distinction } from "../schemas/distinction.zod";

export type NodeLike = Entity | Mechanism | Assertion | Distinction;

export type Graph = {
  nodes: NodeLike[];
  edges: { from: string; to: string; kind: "depends" | "relates" }[];
};
