# SethStack

Local TypeScript tool for structuring Seth notes into a validated, graphable knowledge base — and for testing whether that framework stays sound as source angles multiply.

## What it does

**Pipeline**

- Ingests YAML under `data/` → validated objects via Zod
- Builds a depends/relates graph
- Exports `dist/graph.json`, `dist/graph.mmd` (Mermaid), `dist/report.md`, `dist/seth.db` (SQLite)
- Runs contradiction tracker + mechanism watchlist

**Curation (docs-ops, not ingested)**

- Distinctions-first chapter extraction with Angle passes, findings, and paragraph digests
- Rolling soundness board + stack guides for protected Angle stacks

## Current status

- Curated through **Seth Speaks Ch.4** with findings, digests, and pilot stack guide `docs-ops/stack-guides/SG-physical-reality-status.md`
- Local validate restored on Windows (Node 24 + `better-sqlite3` 13.x); Ch.1–4 YAML validates (86 items). **`dist/` regenerable** via `npm run all`.
- Eng T002–T004 closed (2026-08-05). Next curation: T007 Ch.5.

## Usage

```bash
npm install
npm run validate   # Zod + duplicate-id check only (no exports)
npm run graph      # validate + dist/graph.json + dist/graph.mmd
npm run report     # validate + graph exports + dist/report.md
npm run all        # full pipeline including dist/seth.db
npm run dev        # alias for all
npm test           # node:test suite (after T004)
```

Edit YAML in `data/` and rerun the stage you need. Unknown CLI commands print usage and exit nonzero.

Optional: `--allow-dangling` warns on missing dependency/relates_to targets instead of failing (default: fail).

## Re-enter

Five-minute path: [docs-ops/FIELD_GUIDE.md](docs-ops/FIELD_GUIDE.md) → latest `docs-ops/chapter-reviews/SS-chNN-digest.md` → Overall read in [docs-ops/FRAMEWORK_SOUNDNESS.md](docs-ops/FRAMEWORK_SOUNDNESS.md).

## Docs

| Surface | Role |
|---------|------|
| [AGENT_CONTRACT.md](AGENT_CONTRACT.md) | Rules for humans/agents |
| [docs/00_MISSION.md](docs/00_MISSION.md) … [docs/04_PROGRESS.md](docs/04_PROGRESS.md) | Mission, architecture, tasks, risks, progress |
| [docs-ops/](docs-ops/) | Field guide, rubric, findings, digests, stack guides, soundness |
