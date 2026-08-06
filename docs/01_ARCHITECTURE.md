# Architecture

## Components

| Component | Role |
|-----------|------|
| `src/loaders.ts` | Load all `data/**/*.yaml` into raw objects |
| `src/validators.ts` | Route by `type` to Zod schemas; reject duplicate ids |
| `schemas/*.zod.ts` | Contracts for Entity, Mechanism, Assertion, Distinction |
| `src/linkers.ts` | Build `depends` / `relates` edges; collect missing-ref reports |
| `src/trackers.ts` | Contradiction alerts + mechanism watchlist |
| `src/db.ts` | SQLite write of nodes/edges to `dist/seth.db` |
| `src/pipeline.ts` | Staged: validate → graph → report → all (+ SQLite) |
| `src/index.ts` | CLI entry (`validate` / `graph` / `report` / `all` / `dev`) |
| `tests/` | `node:test` fixtures for validators + dangling refs |
| `docs-ops/REVIEW_RUBRIC.md` | Extraction/review discipline (Distinctions, Angle passes, forward plants) |
| `docs-ops/FIELD_GUIDE.md` | Paragraph/forum orientation for humans |
| `docs-ops/chapter-reviews/` | Per-chapter findings (compressed) + digests (prose) |
| `docs-ops/FRAMEWORK_SOUNDNESS.md` | Rolling cross-chapter Distinction/Mechanism/Angle board |
| `docs-ops/stack-guides/` | Cross-chapter instruments for protected Angle stacks / Distinction families |

## Data flow

```
data/**/*.yaml
  → loadAllYAML
  → validateItems (Zod + duplicate-id guard)
  → collectMissingRefs (fail unless --allow-dangling)
  → buildGraph (depends / relates edges; only existing targets)
  → dist/graph.json
  → dist/graph.mmd
  → contradictionTracker + mechanismWatchlist → dist/report.md
  → initDB / writeGraph → dist/seth.db   (all / dev only)

parallel (human/agent curation, not pipeline):
  chapter text + YAML
  → docs-ops/chapter-reviews/SS-chNN-findings.md (compressed)
  → docs-ops/chapter-reviews/SS-chNN-digest.md (paragraphs, 200–1500 words)
  → docs-ops/FRAMEWORK_SOUNDNESS.md
  → docs-ops/stack-guides/ (promote/update when promotion rule fires)
  readable entry: docs-ops/FIELD_GUIDE.md
```

## Interfaces / contracts

- **Zod schemas** (`schemas/`) are the validation contracts for node shapes.
- **`Graph`** (`src/types.ts`): `{ nodes: NodeLike[]; edges: { from; to; kind: "depends" | "relates" }[] }`.
- **Node kinds**: Entity (default Concept and related), Mechanism (`type: "Mechanism/Process"`), Assertion, Distinction.
- **Review layer**: findings + digests reference YAML ids; they are not ingested by the pipeline.
- **CLI scripts** (`package.json`): `npm run validate|graph|report|all|dev|test` — each command runs only its stage(s); unknown args exit 1 with usage.

## Curation stack (soundness)

Priority order for chapter passes (see `docs-ops/REVIEW_RUBRIC.md` and `docs-ops/FIELD_GUIDE.md`):

1. **Distinctions** — contrastive framework joints
2. **Angle passes** — refractive precision on one claim (no false binary required)
3. **Mechanisms** — process chains; status `partial` until steps land
4. **Load-bearing Assertions** — dependency spine
5. **Forward plants** — deferred text; findings only
6. **Leak audit** — what stays out of the graph

Dual track: findings stay compressed; digests carry human-readable memory.

## Invariants

1. YAML `id` values are preserved; they are the primary node keys.
2. Duplicate ids are validation errors and do not enter the graph.
3. Pipeline is local-filesystem only; no network access.
4. Invalid items are excluded from the graph; errors are reported (pipeline continues with valid items).
5. Edges are only emitted when the target id exists among validated nodes.
6. SQLite is rebuilt from the current graph on each run (`DELETE` then insert).
7. Mechanism watchlist ids are explicit required set members, not inferred.
8. Forward plants do not mint empty placeholder nodes.
9. Adjacent-framework notes are echoes only — never equivalence claims.
10. Angle passes are tracked in review even without a dedicated YAML type (yet).

## Failure modes

1. Zod parse failure for a YAML item → item omitted; error listed.
2. Duplicate id across valid items → all copies of that id omitted; error listed.
3. Malformed or empty YAML → load may throw or yield no items.
4. Missing dependency / relates_to targets → listed as dangling refs; fail by default (`--allow-dangling` warns only); edges still only emit for existing targets.
5. `better-sqlite3` native install or write failure → `all`/`dev` fails at DB step; `validate`/`graph`/`report` unaffected.
6. Unknown CLI command → usage message and nonzero exit.
7. Schema drift between Entity and specialized schemas → inconsistent field/status enums across types.
8. Graph looks complete while Mechanism chains and forward plants are still open → false confidence (mitigate via findings + soundness board).
