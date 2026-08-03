# Tasks

Ordered, acceptance-first. Work one task at a time.

---

## T001 — Docs scaffold (00–04 + AGENT_CONTRACT)

**Description:** Add slim operating docs and agent contract around the existing pipeline. No project-logic changes.

**Files likely touched:** `docs/00_MISSION.md`, `docs/01_ARCHITECTURE.md`, `docs/02_TASKS.md`, `docs/03_RISKS.md`, `docs/04_PROGRESS.md`, `AGENT_CONTRACT.md`

**Acceptance:**
- [x] `docs/00`–`04` exist with required sections
- [x] `AGENT_CONTRACT.md` references only the slim doc set
- [x] No `src/` / `schemas/` / package changes in this task

**Verification:** List `docs/` and open each file; confirm sections match mission/architecture/tasks/risks/progress contract.

**Safety / rollback:** Delete `docs/` and `AGENT_CONTRACT.md` if unwanted; no code impact.

---

## T002 — Harden CLI command dispatch

**Description:** `src/index.ts` accepts `all|validate|graph|report` but always calls `runAll()`. Wire args to real mode behavior (or document and implement the smallest useful split).

**Files likely touched:** `src/index.ts`, `src/pipeline.ts`

**Acceptance:**
- [ ] `validate`, `graph`, `report`, and `all`/`dev` produce distinct, documented behavior (or clearly shared stages with correct early exit)
- [ ] Unknown args fail with a short usage message instead of silently running full pipeline
- [ ] `npm run validate` / `graph` / `report` / `all` still succeed on current seed data

**Verification:** Run each npm script; confirm outputs/exits match the intended mode.

**Safety / rollback:** Revert `index.ts` / `pipeline.ts`; default remains full `runAll()`.

---

## T003 — Broken-edge / missing-ref reporting

**Description:** `buildGraph` skips missing `dependencies` / `relates_to` targets silently. Report missing refs in validation or the report so curation gaps are visible.

**Files likely touched:** `src/linkers.ts`, `src/validators.ts` or `src/pipeline.ts`, possibly `dist/report.md` generation

**Acceptance:**
- [ ] Missing dependency or relates_to targets are listed (id + missing ref)
- [ ] Valid edges still built when targets exist
- [ ] Report or console surfaces at least a count of broken refs

**Verification:** Add a temporary YAML item with a fake ref, run pipeline, confirm the missing ref appears; remove the item after.

**Safety / rollback:** Revert linker/validator/report changes; graph edge behavior can stay as today.

---

## T004 — Tests for validators + duplicate-id guard

**Description:** Add a minimal tests surface covering Zod routing by type and duplicate-id rejection.

**Files likely touched:** `tests/` (new), possibly `package.json` (test script — ask before adding deps)

**Acceptance:**
- [ ] At least one passing test for a valid Entity parse path
- [ ] At least one passing test that duplicate ids produce an error and omit those items
- [ ] Test command documented (reuse existing runner if possible; ask before new deps)

**Verification:** Run the chosen test command; all new tests pass.

**Safety / rollback:** Remove `tests/` and any test script; pipeline unchanged.

---

## T005 — Chapter findings pass (docs-led, recurring)

**Description:** After each chapter YAML extraction, write/update `docs-ops/chapter-reviews/SS-chNN-findings.md` **and** `SS-chNN-digest.md` (200–1500 words) per `docs-ops/REVIEW_RUBRIC.md` / `FIELD_GUIDE.md`, update `docs-ops/FRAMEWORK_SOUNDNESS.md`, and append `docs/04_PROGRESS.md`. Track Distinctions, Angle passes, Mechanism chain status, forward plants, leaks, and adjacent echoes (non-equivalence).

**Files likely touched:** `docs-ops/chapter-reviews/SS-chNN-findings.md`, `SS-chNN-digest.md`, `docs-ops/FRAMEWORK_SOUNDNESS.md`, `docs/04_PROGRESS.md`

**Acceptance:**
- [ ] Findings file has all rubric sections (including Angle passes)
- [ ] Digest exists in paragraph voice within ~200–1500 words
- [ ] Forward plants listed; no empty YAML children minted for deferrals
- [ ] Soundness board updated (Distinction axes, Angle stacks, mechanism backlog, tensions)
- [ ] Progress entry appended

**Verification:** Open findings + digest + soundness; confirm YAML ids cited actually exist under `data/seth-speaks/`.

**Safety / rollback:** Delete or revert the findings/digest/soundness edits; graph YAML untouched.

**Status note:** Ch.1–3 findings + digests written (2026-08-03). Recur for Ch.4+.

---

## T006 — Ch.3 extraction + findings

**Description:** Extract Seth Speaks Chapter 3 into `data/seth-speaks/chapter-03.yaml` (Distinctions-first; thicken `thought-to-matter-transformation` and retire/merge the seed stub), then complete T005 for Ch.3.

**Files likely touched:** `data/chapters/SethSpeaks/CHAPTER 3.txt`, `data/seth-speaks/chapter-03.yaml`, `data/seeds/examples.yaml`, `docs-ops/chapter-reviews/SS-ch03-findings.md`, `docs-ops/FRAMEWORK_SOUNDNESS.md`

**Acceptance:**
- [x] Ch.3 YAML ids unique across `data/**/*.yaml`
- [x] Mechanism chains record known vs deferred steps
- [x] T005 acceptance met for Ch.3

**Verification:** Diff ids against Ch.1–2; read findings against rubric.

**Safety / rollback:** Remove `chapter-03.yaml` and Ch.3 findings; restore seed stub if removed.
