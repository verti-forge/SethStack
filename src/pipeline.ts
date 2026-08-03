import fs from "fs";
import { loadAllYAML } from "./loaders";
import { validateItems } from "./validators";
import { buildGraph } from "./linkers";
import { contradictionTracker, mechanismWatchlist } from "./trackers";
import { initDB, writeGraph } from "./db";

export async function runAll() {
  const raw = await loadAllYAML("data");
  const { valid, errors } = validateItems(raw);

  if (errors.length) {
    console.error("Validation errors:", errors.slice(0, 10));
  }

  const graph = buildGraph(valid);
  fs.mkdirSync("dist", { recursive: true });
  fs.writeFileSync("dist/graph.json", JSON.stringify(graph, null, 2), "utf8");

  const mmd = [
    "graph TD",
    ...graph.edges.map((e: any) => `  ${e.from} -- ${e.kind} --> ${e.to}`)
  ].join("\n");
  fs.writeFileSync("dist/graph.mmd", mmd, "utf8");

  const alerts = contradictionTracker(valid as any);
  const missing = mechanismWatchlist(valid as any);

  const db = initDB();
  writeGraph(db, graph);

  const report = [
    "# SethStack Report",
    `- Nodes: ${graph.nodes.length}`,
    `- Edges: ${graph.edges.length}`,
    `- Validation errors: ${errors.length}`,
    `- Contradiction alerts: ${alerts.length}`,
    ...alerts.map(a => `  - ${a}`),
    `- Mechanisms missing: ${missing.join(", ") || "none"}`
  ].join("\n");
  fs.writeFileSync("dist/report.md", report, "utf8");

  console.log("OK → dist/graph.json, dist/graph.mmd, dist/report.md, dist/seth.db");
}
