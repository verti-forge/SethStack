Goal: Ingest YAML under /data, validate with Zod, build dependency/relates graph, export Mermaid + SQLite, run trackers.

Steps:
1. Install deps: npm i
2. Run pipeline: npm run dev
3. Verify outputs in dist/: graph.json, graph.mmd, report.md, seth.db
4. Extend validators with new rubric fields if needed (e.g., 'status_reason', 'evidence_level')
5. Use `npm run all` to chain validate → graph → report.

Constraints:
- Preserve ids from YAML; fail if duplicate ids (add rule later).
- No network access; pure local.
