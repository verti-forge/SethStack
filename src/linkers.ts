import type { Graph } from "./types";

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
