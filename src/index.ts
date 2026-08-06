import { runAll, runGraph, runReport, runValidate, type PipelineOptions } from "./pipeline";

const USAGE = `Usage: tsx src/index.ts <command> [--allow-dangling]

Commands:
  validate  Load YAML and validate (Zod + duplicate ids). No exports.
  graph     Validate + write dist/graph.json and dist/graph.mmd
  report    Validate + graph exports + dist/report.md
  all       Full pipeline including SQLite (dist/seth.db)
  dev       Alias for all

Options:
  --allow-dangling  Warn on missing dependency/relates_to targets instead of failing
`;

function parseArgs(argv: string[]): { cmd: string; opts: PipelineOptions } {
  const flags = new Set(argv.filter((a) => a.startsWith("--")));
  const positional = argv.filter((a) => !a.startsWith("--"));
  const cmd = positional[0] ?? "all";
  return {
    cmd,
    opts: { allowDangling: flags.has("--allow-dangling") }
  };
}

async function main() {
  const { cmd, opts } = parseArgs(process.argv.slice(2));

  let code: number;
  switch (cmd) {
    case "validate":
      code = await runValidate(opts);
      break;
    case "graph":
      code = await runGraph(opts);
      break;
    case "report":
      code = await runReport(opts);
      break;
    case "all":
    case "dev":
      code = await runAll(opts);
      break;
    default:
      console.error(USAGE);
      console.error(`Unknown command: ${cmd}`);
      code = 1;
  }
  process.exit(code);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
