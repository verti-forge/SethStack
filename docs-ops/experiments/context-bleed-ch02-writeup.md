# Ch.2 Context-Bleed Writeup

## Setup

Source chapter: `data/chapters/SethSpeaks/CHAPTER 2.txt`

Control context:
- `AGENT_CONTRACT.md`
- `docs-ops/REVIEW_RUBRIC.md`
- `docs-ops/FIELD_GUIDE.md`

Treatment context:
- same as control
- plus `docs-ops/ECHO_INDEX.md`

Constraint: neither pass was allowed to consult canonical Ch.2 YAML or Ch.2 findings during extraction drafting. Canonical comparison happened afterward against `data/seth-speaks/chapter-02.yaml`.

## Canonical baseline

Canonical Ch.2 currently contains:
- 6 distinctions
- 4 mechanisms
- 12 assertions/concepts

It centers on `form-vs-identity-stability`, `physical-senses-vs-inner-senses`, `time-continuity-vs-associative-continuity`, `conscious-vs-unconscious-cocreation`, `permanent-form-vs-joyfully-changing`, `post-death-plane-vs-seth-plane`, plus `moment-point`, `inner-senses`, `psychological-time`, `intensities-of-experience`, `form-follows-consciousness`, `multiple-simultaneous-forms`, `thermal-electromagnetic-communication`, `dream-environment-manipulation`, `creation-perception-intimacy`, and related identity/perception concepts.

## Control vs treatment

### Counts

- Control: 8 distinctions / 6 mechanisms / 12 assertions-concepts
- Treatment: 7 distinctions / 7 mechanisms / 10 assertions-concepts
- Canonical: 6 distinctions / 4 mechanisms / 12 assertions-concepts

Both experimental passes over-extracted relative to canonical Ch.2. Treatment over-extracted mechanisms more aggressively than control.

### Node-selection differences

Control leaned toward chapter-local operational abstractions:
- `D-psychological-time-vs-clock-time`
- `D-associative-perception-vs-sequential-perception`
- `M-moment-point-probability-processing`
- `A-telepathy-basis-of-language`
- `C-camouflage-system`

Treatment leaned toward cross-chapter echo-rich abstractions and naming reuse:
- `camouflage-vs-uncamouflaged-perception`
- `objective-reality-vs-consciousness-created-reality`
- `outer-ego-awareness-vs-inner-awareness`
- `whole-consciousness`
- `teacher-adaptation-across-systems`
- direct reuse of `consciousness-creates-form`, `camouflage`, `physical-senses`, and `form-vs-identity-stability`

### Wording drift

Treatment shows clear drift toward echo vocabulary already present in the index:
- "camouflage"
- "objective reality"
- "whole consciousness"
- stronger mind-dependent phrasing for environment/perception claims

Control still drifted beyond canonical Ch.2, but mostly by generalizing the chapter's own local material. Treatment generalized in a way that looked more cross-chapter and echo-conditioned.

### Preferential expansion of echo-rich material

Yes, modestly.

The treatment pass elevated echo-index-friendly material into first-class distinctions and concepts more readily than the control pass, especially around camouflage, consciousness-created reality, and broader identity/awareness framing. Meanwhile, canonical Ch.2 gives more weight to `moment-point`, `psychological-time`, and `associative-perception` as chapter-local structuring moves.

## Verdict

**Bleed detected.**

Not catastrophic, but enough to matter: adding the echo index to extraction context nudged naming and selection toward echo-rich, cross-chapter-rhyme material instead of staying as tightly chapter-local as the canonical pass.

## Recommendation

Keep the never-in-context rule.

Use `docs-ops/ECHO_INDEX.md` only for deliberate post-pass consolidation or separate comparative work, not during extraction. If this experiment is rerun later, repeat on a denser later chapter with a pre-declared scoring rubric for chapter-local fidelity vs cross-chapter drift.
