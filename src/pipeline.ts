import fs from "fs";
import { loadAllYAML } from "./loaders";
import { validateItems } from "./validators";
import { buildGraph } from "./linkers";
import { contradictionTracker, mechanismWatchlist } from "./trackers";

export type PipelineOptions = {
  allowDangling?: boolean;
};

type ValidateResult = {
  valid: any[];
  errors: { id?: string; error: string }[];
};

async function loadAndValidate(): Promise<ValidateResult> {
  const raw = await loadAllYAML("data");
  return validateItems(raw);
}

function printValidationErrors(errors: ValidateResult["errors"]) {
  if (!errors.length) return;
  console.error(`Validation errors (${errors.length}):`);
  for (const e of errors.slice(0, 50)) {
    console.error(`  - ${e.id ?? "(no id)"}: ${e.error}`);
  }
  if (errors.length > 50) {
    console.error(`  … and ${errors.length - 50} more`);
  }
}

/** Load + Zod/duplicate-id validate. No graph, report, or SQLite. Exit 1 on errors. */
export async function runValidate(_opts: PipelineOptions = {}): Promise<number> {
  const { valid, errors } = await loadAndValidate();
  printValidationErrors(errors);
  if (errors.length) {
    console.error(`FAIL → ${errors.length} validation error(s); ${valid.length} valid item(s) kept out of graph path`);
    return 1;
  }
  console.log(`OK → validate (${valid.length} items)`);
  return 0;
}

/** Validate + build graph exports (json/mmd). No SQLite. */
export async function runGraph(_opts: PipelineOptions = {}): Promise<number> {
  const { valid, errors } = await loadAndValidate();
  printValidationErrors(errors);
  if (errors.length) return 1;

  const graph = buildGraph(valid);
  fs.mkdirSync("dist", { recursive: true });
  fs.writeFileSync("dist/graph.json", JSON.stringify(graph, null, 2), "utf8");

  const mmd = [
    "graph TD",
    ...graph.edges.map((e: any) => `  ${e.from} -- ${e.kind} --> ${e.to}`)
  ].join("\n");
  fs.writeFileSync("dist/graph.mmd", mmd, "utf8");

  console.log(`OK → dist/graph.json, dist/graph.mmd (${graph.nodes.length} nodes, ${graph.edges.length} edges)`);
  return 0;
}

/** Graph path + trackers → report.md. No SQLite. */
export async function runReport(_opts: PipelineOptions = {}): Promise<number> {
  const { valid, errors } = await loadAndValidate();
  printValidationErrors(errors);
  if (errors.length) return 1;

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

  console.log("OK → dist/graph.json, dist/graph.mmd, dist/report.md");
  return 0;
}

/** Full pipeline including SQLite. */
export async function runAll(_opts: PipelineOptions = {}): Promise<number> {
  const { valid, errors } = await loadAndValidate();
  printValidationErrors(errors);
  if (errors.length) return 1;

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

  const { initDB, writeGraph } = await import("./db");
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
  return 0;
}
