import fs from "fs";
import { loadAllYAML } from "./loaders";
import { validateItems } from "./validators";
import { buildGraph, collectMissingRefs, type MissingRef } from "./linkers";
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

function printMissingRefs(missing: MissingRef[], asWarning: boolean) {
  if (!missing.length) return;
  const label = asWarning
    ? `Dangling refs (${missing.length}) — allowed via --allow-dangling`
    : `Dangling refs (${missing.length})`;
  const out = asWarning ? console.warn.bind(console) : console.error.bind(console);
  out(label + ":");
  for (const m of missing.slice(0, 50)) {
    out(`  - ${m.from} --${m.kind}--> ${m.missing} (missing)`);
  }
  if (missing.length > 50) {
    out(`  … and ${missing.length - 50} more`);
  }
}

function reportMissingSection(missing: MissingRef[]): string[] {
  if (!missing.length) return ["- Dangling refs: none"];
  return [
    `- Dangling refs: ${missing.length}`,
    ...missing.map((m) => `  - ${m.from} --${m.kind}--> ${m.missing}`)
  ];
}

/** After Zod validate: collect dangling refs. Returns exit code contribution (0 ok, 1 fail). */
function handleMissingRefs(valid: any[], opts: PipelineOptions): { missing: MissingRef[]; code: number } {
  const missing = collectMissingRefs(valid);
  if (!missing.length) return { missing, code: 0 };
  if (opts.allowDangling) {
    printMissingRefs(missing, true);
    return { missing, code: 0 };
  }
  printMissingRefs(missing, false);
  return { missing, code: 1 };
}

/** Load + Zod/duplicate-id validate (+ dangling refs). No graph/report/SQLite. */
export async function runValidate(opts: PipelineOptions = {}): Promise<number> {
  const { valid, errors } = await loadAndValidate();
  printValidationErrors(errors);
  if (errors.length) {
    console.error(`FAIL → ${errors.length} validation error(s); ${valid.length} valid item(s)`);
    return 1;
  }
  const { missing, code } = handleMissingRefs(valid, opts);
  if (code) {
    console.error(`FAIL → ${missing.length} dangling ref(s)`);
    return 1;
  }
  console.log(`OK → validate (${valid.length} items${missing.length ? `, ${missing.length} dangling warned` : ""})`);
  return 0;
}

async function validatedGraph(opts: PipelineOptions): Promise<
  | { ok: false; code: number }
  | { ok: true; valid: any[]; errors: ValidateResult["errors"]; missing: MissingRef[]; graph: ReturnType<typeof buildGraph> }
> {
  const { valid, errors } = await loadAndValidate();
  printValidationErrors(errors);
  if (errors.length) return { ok: false, code: 1 };
  const { missing, code } = handleMissingRefs(valid, opts);
  if (code) return { ok: false, code: 1 };
  return { ok: true, valid, errors, missing, graph: buildGraph(valid) };
}

function writeGraphFiles(graph: ReturnType<typeof buildGraph>) {
  fs.mkdirSync("dist", { recursive: true });
  fs.writeFileSync("dist/graph.json", JSON.stringify(graph, null, 2), "utf8");
  const mmd = [
    "graph TD",
    ...graph.edges.map((e: any) => `  ${e.from} -- ${e.kind} --> ${e.to}`)
  ].join("\n");
  fs.writeFileSync("dist/graph.mmd", mmd, "utf8");
}

/** Validate + build graph exports (json/mmd). No SQLite. */
export async function runGraph(opts: PipelineOptions = {}): Promise<number> {
  const result = await validatedGraph(opts);
  if (!result.ok) return result.code;
  writeGraphFiles(result.graph);
  console.log(
    `OK → dist/graph.json, dist/graph.mmd (${result.graph.nodes.length} nodes, ${result.graph.edges.length} edges)`
  );
  return 0;
}

function writeReport(
  graph: ReturnType<typeof buildGraph>,
  valid: any[],
  errors: ValidateResult["errors"],
  missing: MissingRef[]
) {
  const alerts = contradictionTracker(valid as any);
  const mechMissing = mechanismWatchlist(valid as any);
  const report = [
    "# SethStack Report",
    `- Nodes: ${graph.nodes.length}`,
    `- Edges: ${graph.edges.length}`,
    `- Validation errors: ${errors.length}`,
    ...reportMissingSection(missing),
    `- Contradiction alerts: ${alerts.length}`,
    ...alerts.map((a) => `  - ${a}`),
    `- Mechanisms missing: ${mechMissing.join(", ") || "none"}`
  ].join("\n");
  fs.writeFileSync("dist/report.md", report, "utf8");
}

/** Graph path + trackers → report.md. No SQLite. */
export async function runReport(opts: PipelineOptions = {}): Promise<number> {
  const result = await validatedGraph(opts);
  if (!result.ok) return result.code;
  writeGraphFiles(result.graph);
  writeReport(result.graph, result.valid, result.errors, result.missing);
  console.log("OK → dist/graph.json, dist/graph.mmd, dist/report.md");
  return 0;
}

/** Full pipeline including SQLite. */
export async function runAll(opts: PipelineOptions = {}): Promise<number> {
  const result = await validatedGraph(opts);
  if (!result.ok) return result.code;
  writeGraphFiles(result.graph);

  const { initDB, writeGraph } = await import("./db");
  const db = initDB();
  writeGraph(db, result.graph);

  writeReport(result.graph, result.valid, result.errors, result.missing);
  console.log("OK → dist/graph.json, dist/graph.mmd, dist/report.md, dist/seth.db");
  return 0;
}
