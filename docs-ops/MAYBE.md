# Maybe

Standing parking lot for deferred sharpenings. Not a backlog that must be done. Items earn their keep only if a later pass shows they would have helped.

---

## Archived: pilot stack guide polish (applied 2026-08-03)

**Applied keeps to** [`stack-guides/SG-physical-reality-status.md`](stack-guides/SG-physical-reality-status.md): Angle Pass Ledger + Pass D, revision trigger, root-assumptions rehomed as future-guide candidate.

**Still deferred (not applied):**

- [ ] Worked pressure-test example (Test 3 / tree) — revisit if teachability gap returns
- [ ] Graph anchors subsection — revisit if agent/graph jump friction appears

---

## AnglePass YAML representation (decision before NPR — not implemented)

Track Angle passes in review today (findings ledgers + digests + stack guides). Before *Nature of Personal Reality* volume forces a choice, pick one representation. **Curator decides; do not implement in this note.**

| Option | Shape | Validation cost | Query / graph cost | “Passes are how the framework thinks” |
|--------|-------|-----------------|--------------------|----------------------------------------|
| **(a) New node type** | e.g. `type: AnglePass` with stack id + pass order + claim pointer | New Zod schema; id uniqueness; risk of minting “pass” nodes that are really commentary | First-class graph nodes/edges; stack walks become queries | Strongest literal match — but may over-ontologize refractive prose |
| **(b) Structured field on Assertion/Concept** | e.g. `angle_passes: [{ stack, note, chapter }]` on the claim node | Extend existing schemas; lighter than a new type; still versioned YAML | Passes hang off claims; stacks need convention/index, not free nodes | Good middle: precision attaches to the claim without a parallel ontology |
| **(c) Prose-only + ledger tables** (current) | Findings / Soundness / stack-guide ledgers only | Zero pipeline change | No graph query; human/agent reads review layer | Honors “how it thinks” in the review layer; weakest for machine pressure-tests at NPR scale |

**Bias to revisit after Ch.5+ and before NPR extraction starts.** Prefer (c) until pass volume makes query pain real; then (b) before (a) unless stack-as-node earns its keep.

---

*(Empty for new parked ideas below.)*
