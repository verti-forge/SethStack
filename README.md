# SethStack

Minimal but expandable TS container for structuring Seth notes.

## What it does

- Ingests YAML under `data/` → validated objects via Zod
- Builds a dependency/relates graph
- Exports:
  - `dist/graph.json`
  - `dist/graph.mmd` (Mermaid)
  - `dist/report.md`
  - `dist/seth.db` (SQLite)
- Runs:
  - Contradiction tracker
  - Mechanism watchlist

## Usage

```bash
npm install
npm run dev     # or: npm run all
```

Edit YAML in `data/` and rerun to refresh graph + report.
