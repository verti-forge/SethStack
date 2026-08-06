# Agent Contract

Rules for humans and agents continuing work in this repo. Operating surface: `docs/00`-`docs/04`, this file, and `docs-ops/` for review / soundness / readable guide.

## Mandatory rules

1. Work **one task at a time** from `docs/02_TASKS.md`.
2. **No silent refactors.** Stay inside the active task's acceptance criteria.
3. **Ask before adding dependencies.**
4. Task classes are explicit:
   - **Docs-led:** scaffold, spec/design, decision record, safety gate, irreversible-risk review, handoff/reentry, chapter findings/digests. Docs (and docs-ops) are the deliverable.
   - **Implementation-led:** inspect first, implement the smallest working slice, verify acceptance, then update progress as needed.
5. On **stop or handoff**, append an entry to `docs/04_PROGRESS.md` using:

   ```
   ### YYYY-MM-DD HH:MM
   STATE:
   OPEN LOOPS:
   NEXT 3:
   ```

   One optional closeout item may surface a single "try this from your chair" exercise, but only from `docs-ops/EXERCISES.md` entries explicitly marked `Chair-friendly: yes`.
6. If confused: ask **at most 3** precise questions.
7. If context bloats: propose a clean session handoff including:
   - active task ID
   - reference to the latest `docs/04_PROGRESS.md` entry
   - reference to latest `docs-ops/FRAMEWORK_SOUNDNESS.md` if curation was active
   - blockers
8. Chapter curation follows `docs-ops/REVIEW_RUBRIC.md` and `docs-ops/FIELD_GUIDE.md`:
   - Distinctions (contrast) and **Angle passes** (same claim, new precision) are both first-class
   - Every chapter pass produces **findings + digest** (digest ~200-1500 words, density-scaled)
   - Track Mechanism chain completeness; record forward plants in findings - **do not mint empty YAML nodes for deferrals**
   - Adjacent-framework notes are echoes only, never equivalence`r`n   - `docs-ops/PRACTICE_VAULT.md` is never read or written during chapter extraction or curation work

## Doc map

| File | Role |
|------|------|
| `docs/00_MISSION.md` | Purpose, user, done, non-goals |
| `docs/01_ARCHITECTURE.md` | Components, flow, contracts, invariants, failures |
| `docs/02_TASKS.md` | Ordered tasks with acceptance |
| `docs/03_RISKS.md` | Technical / product / security / unknowns |
| `docs/04_PROGRESS.md` | Append-only session summaries |
| `docs-ops/FIELD_GUIDE.md` | Paragraph orientation (start here for humans) |
| `docs-ops/REVIEW_RUBRIC.md` | Chapter extraction/review discipline |
| `docs-ops/FRAMEWORK_SOUNDNESS.md` | Rolling Distinction/Mechanism/Angle board |
| `docs-ops/EXERCISES.md` | Capture-only catalog of reader-directed exercises |`r`n| `docs-ops/PRACTICE_VAULT.md` | Private append-only results log for EX-* attempts |
| `docs-ops/chapter-reviews/` | Per-chapter findings + digests |
| `docs-ops/stack-guides/` | Cross-chapter stack instruments (pilot: physical reality status) |

## Boundaries

- `src/` = source code
- `schemas/` = Zod contracts
- `data/` = YAML inputs (`data/seth-speaks/` curated chapters)
- `scripts/` = helper notes/scripts
- `docs/` = canonical operating docs (`00`-`04`)
- `docs-ops/` = field guide, rubric, findings, digests, stack guides, soundness board
- `dist/` = generated outputs (not source of truth)

Do not invent `docs/05`-`08` requirements unless the human expands the scaffold.

