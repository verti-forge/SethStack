import type { Graph } from "./types";

export type MissingRef = {
  from: string;
  kind: "depends" | "relates";
  missing: string;
};

export function collectMissingRefs(nodes: any[]): MissingRef[] {
  const byId = new Set(nodes.map((n: any) => n.id).filter(Boolean));
  const missing: MissingRef[] = [];

  for (const n of nodes) {
    for (const d of n.dependencies ?? []) {
      if (!byId.has(d)) missing.push({ from: n.id, kind: "depends", missing: d });
    }
    for (const r of n.relates_to ?? []) {
      if (!byId.has(r)) missing.push({ from: n.id, kind: "relates", missing: r });
    }
  }
  return missing;
}

export function buildGraph(nodes: any[]): Graph {
  const edges: Graph["edges"] = [];
  const byId = new Map(nodes.map((n: any) => [n.id, n]));

  for (const n of nodes) {
    for (const d of n.dependencies ?? []) {
      if (byId.has(d)) edges.push({ from: n.id, to: d, kind: "depends" });
    }
    for (const r of n.relates_to ?? []) {
      if (byId.has(r)) edges.push({ from: n.id, to: r, kind: "relates" });
    }
  }
  return { nodes, edges };
}
