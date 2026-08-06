# Chapter Review Rubric

Operating rules for each Seth Speaks (or adjacent) chapter pass. Graph YAML stays lean; soundness judgment lives in findings + `FRAMEWORK_SOUNDNESS.md`. Human memory lives in digests + `FIELD_GUIDE.md`.

## Purpose

Test whether the framework holds as Seth expands from new angles. **Distinctions** are the primary contrastive joint test. **Angle passes** are the primary refractive precision test (same claim, new angle, more constraint). **Mechanisms** are the primary “how” test. Forward plants (“later I will explain”) are first-class open loops — never mint empty child nodes for them.

Every chapter pass produces **both**:

- `SS-chNN-findings.md` — compressed boards
- `SS-chNN-digest.md` — paragraph guide voice, **200–1500 words**, scaled to conceptual density (do not slogan-crush dense Distinctions or Angle stacks)

## Tracking surfaces (peer discipline)

| Surface | Role | Capture where |
|---------|------|----------------|
| **Distinctions** | Contrastive joints; risk if poles collapse later | YAML `Distinction` + findings + digest prose |
| **Angle passes** | Refractive precision on one claim; adds constraint without requiring a binary | Findings + digest (YAML type deferred) |
| **Mechanisms** | Causal/process chains; soundness = step completeness | YAML `Mechanism/Process` + findings chain status |
| **Load-bearing Assertions** | Claims the rest depends on | YAML `Assertion` + findings load rank |
| **Identity architecture** | Entity / fragment / ego / portion maps | Concepts + findings |
| **Perception stack** | Senses → camouflage → environment | Distinctions + Angle passes + Concepts |
| **Forward plants** | Deferred explanations | Findings only (no empty YAML children) |
| **Testable claims** | Specific enough to be wrong; historical, physiological, or world-checkable claims | Findings only (capture + falsifier, never adjudicate in-pass) |
| **Cross-chapter tensions** | Claim restated, narrowed, or stressed | Findings + `FRAMEWORK_SOUNDNESS.md` |
| **Leak audit** | Wisely not graphed | Findings + digest |

## Distinctions vs Angle passes

- Use a **Distinction** when the text is bipolar / contrastive.
- Use an **Angle pass** when the text revisits one claim from a new aspect and sharpens it (NPR-heavy pattern; already present in SS).
- Do not force every sharpening into a false binary.
- Do not treat Angle passes as redundant restatement to delete.

For each Angle pass in findings, record: **claim** (id or short name) → **angle** → **what got sharper / which misread was cut**.

## Mechanism register (parallel to Distinction rigor)

For each Mechanism in findings, record:

- **Announced steps** — what the text promises
- **Known steps** — what this chapter actually specifies
- **Missing / deferred** — what waits on later text
- **Depends on Distinction(s)** — which axis must hold for the chain to make sense
- **Status** — align with YAML: `partial` | `complete` | `asserted`

## Testable-claims register

For each testable claim in findings, record:

- **id/anchor** — node id or chapter+passage anchor
- **Claim (compressed)** — one line only
- **What would falsify it** — written at capture time; mandatory
- **Status** — `uncheckable` | `unchecked` | `checked-hit` | `checked-miss`

Rules:

- Capture only. Do not research or adjudicate during a chapter pass.
- Empty section is valid.
- If you cannot write a falsification condition, the claim does not belong in this register and should remain ordinary framework material.

## Extraction posture

1. Distinctions first when the text defines by contrast.
2. Angle passes when the text refracts a stable claim.
3. Mechanisms next when a process/chain is claimed.
4. One load-bearing quote per claim when possible.
5. Reuse existing ids; do not re-mint restated Assertions — `relates_to` / notes / Angle-pass register instead.
6. Leak filter: session color, jokes, pure analogies, reader rhetoric → omit or `notes` only.
7. Adjacent framework notes are **echoes / structural parallels**, never equivalence claims.

## Adjacent framework set (fixed)

Use only these unless the human expands the set:

1. Process philosophy (form as event; creativity)
2. Idealist / mind-dependent appearance
3. Dependent origination / emptiness-of-inherent-form (Buddhist-adjacent; careful)
4. Observer/system dependence (systems / second-order cybernetics)
5. James / radical empiricism (experience primary; dream/wake continuum)

## Per-chapter findings template

Create `docs-ops/chapter-reviews/SS-chNN-findings.md` with:

1. Chapter brief
2. Distinction register
3. Angle passes (claim → angle → sharpening)
4. Mechanism register (chain status)
5. Load-bearing assertions (ranked)
6. Identity / perception stack
7. Forward plants
8. Testable claims
9. Leak audit
10. Adjacent echoes (≤5 bullets from the fixed set)
11. Ongoing findings (append-only dated bullets)
12. Open questions (≤5)
13. Exercises captured: `EX-NN, ...` or `none`

## Per-chapter digest template

Create `docs-ops/chapter-reviews/SS-chNN-digest.md` (paragraphs, 200–1500 words):

1. What this chapter is doing
2. Joints that matter (Distinctions in prose)
3. Angle passes (same claim, new precision)
4. What got operational vs still promised
5. What we deliberately didn’t graph
6. What to watch next
7. Pointer to matching findings + graph paths

After each chapter pair: update `docs-ops/FRAMEWORK_SOUNDNESS.md` and append `docs/04_PROGRESS.md`.

**Stack guides:** when an Angle stack has ≥3 protected passes across chapters, **or** is listed under Angle stacks to protect on Soundness, promote or update a guide under `docs-ops/stack-guides/` (see that folder’s README). Digests stay chapter-local; stack guides stay cross-chapter. Do not write Concept essays.

Readable orientation: `docs-ops/FIELD_GUIDE.md`.

## Status vocabulary

Align with YAML where applicable:

- Concepts/Entities: `stable` | `partial` | `asserted` | `complete`
- Assertions: `stable` | `contested`
- Mechanisms: `partial` | `complete` | `asserted`
- Distinction soundness (findings only): `holds` | `thin` | `at-risk` | `unresolved`
