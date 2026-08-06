# ADR-001: AnglePass Representation

## Status

Proposed at the curator checkpoint. No schema change implemented.

## Context

Angle passes are already a first-class review concept in SethStack, but they do not yet exist as YAML or schema data. They currently live in:

- Ch.1 findings: 3 angle-pass rows
- Ch.2 findings: 4 angle-pass rows
- Ch.3 findings: 4 angle-pass rows
- Ch.4 findings: 6 angle-pass rows
- `SG-physical-reality-status.md` ledger: 4 protected passes (A-D) for one stack

Observed count through SS Ch.4:
- 17 chapter-local angle-pass rows in findings
- 4 stack-level ledger passes in the physical-reality guide
- 1 stack guide currently carrying a formal pass ledger

Today angle passes can:
- sharpen chapter findings
- support digests
- drive stack-guide pressure tests and pass ledgers

Today angle passes cannot:
- be schema-validated
- be queried from YAML/graph artifacts
- participate in graph walks or stack-level joins
- be counted or compared without reading multiple review files by hand

That gap is real, but the evidence also shows angle passes are still concentrated in prose review surfaces rather than spread across many stacks in a way that already forces schema.

## Options considered

### A. New node type
Shape: `type: AnglePass` with stack id, pass order, claim pointer.

Pros:
- strongest query surface
- first-class graph nodes and edges
- easiest machine counting once migrated

Cons:
- highest schema and migration cost
- risks ontologizing commentary into graph objects
- adds id and edge burden to a review concept that is still mostly ledger-shaped

### B. Structured field on Assertion/Concept
Shape: e.g. `angle_passes: [{ stack, note, chapter }]` on an existing node.

Pros:
- lower schema cost than a new type
- keeps passes attached to the claims they sharpen
- supports later querying without a parallel pass ontology

Cons:
- still needs schema work and migration
- stack-level walks remain convention-heavy
- only works cleanly when the pass clearly belongs to one existing node

### C. Prose-only plus ledger tables
Shape: findings tables, soundness notes, and stack-guide ledgers.

Pros:
- zero pipeline/schema cost
- already how the project successfully tracks passes
- preserves the difference between ontology and review judgment

Cons:
- no query surface
- cross-stack comparison is manual
- pressure tests require reading multiple files

## Decision

Choose **Option C for now**: keep angle passes in prose review surfaces and stack-guide ledgers.

## Rationale

1. Through Ch.4, the real use of angle passes is still review judgment, not graph traversal.
2. The strongest live stack (`SG-physical-reality-status`) is served adequately by a four-row ledger.
3. The main pain is lookup friction, not representational failure: you can answer angle-pass questions today, but only by reading findings plus stack guides.
4. Adding schema now would solve queryability before the project has shown that queryability is the bottleneck.
5. Option B is the likely next step if that bottleneck becomes real; Option A remains the highest-cost choice and should require stronger evidence.

## Revisit trigger

Revisit this ADR when either condition is met:

1. A single stack reaches **6 protected passes** and they are split across **3 or more review artifacts** (for example, multiple findings files plus a stack guide), or
2. A recurring pressure-test question cannot be answered without manually consulting **3 or more review files** in one sitting more than once.

Those thresholds replace the current vibes-based "query pain is real" standard.

## Consequences

- No schema or YAML migration now.
- `docs-ops/MAYBE.md` remains historical parking context, but this ADR becomes the current recommendation.
- Ch.5+ may keep using findings tables and stack-guide ledgers without interruption.
- If revisit triggers fire, evaluate Option B first, then Option A only if stack-level graph behavior truly needs standalone pass nodes.
