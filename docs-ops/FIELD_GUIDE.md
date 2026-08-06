# SethStack Field Guide

This is the readable layer. The tables and id-lists in findings and `FRAMEWORK_SOUNDNESS.md` are for soundness testing and agent continuity. This guide is for you - how we read Seth here, why the graph looks the way it does, and how not to lose the plot when he seems to say the same thing again.

## What we are trying to prove

SethStack is not a quote museum. It is a local tool for structuring Seth notes into a validated graph so we can ask a harder question: **does the framework stay sound as the angles multiply?**

We ingest YAML, validate it, link depends/relates edges, and export graphs and reports. Beside that pipeline we keep chapter findings (compressed) and chapter digests (prose). The graph holds the claims. The review layer holds the judgment.

If a chapter only adds pretty Concepts, we failed. If it stresses a Distinction until it bends, or tightens a claim through a new Angle pass, we learned something.

## Start here (and when you re-enter)

**Full start-here** (cold re-entry):

1. This Field Guide (once, then as needed)
2. The latest `SS-chNN-digest.md` under `docs-ops/chapter-reviews/`
3. Relevant **stack guide** if you are pressure-testing a known Angle stack (`docs-ops/stack-guides/`)
4. The "Overall read" at the top of `docs-ops/FRAMEWORK_SOUNDNESS.md`
5. YAML when curating, minting, editing, checking quotes, or following a train of thought in the graph

**Five-minute re-entry** (you already know the project): Progress tail -> Soundness overall -> latest digest. Add a stack guide only if today's work touches that stack.

**Curation path** (different from read path): chapter text -> YAML (train of thought) -> findings -> digest -> soundness -> promote/update stack guide when the promotion rule fires. If you are closing out work for another human, you may surface one chair-friendly exercise from `docs-ops/EXERCISES.md`; do not invent one ad hoc.

## How a chapter pass works

We read the chapter text. We extract high-signal nodes into `data/seth-speaks/chapter-NN.yaml` - Distinctions when the text contrasts, Mechanisms when a process is claimed, Assertions when a load-bearing claim is stated, Concepts when a named structure needs a home.

Then we write two review files:

- **Findings** - compressed registers: Distinctions, Mechanisms, Angle passes, forward plants, leaks. Good for boards and agents.
- **Digest** - paragraphs, about 200-1500 words depending on density. Good for remembering what the chapter *did* to the framework without crushing the joints into slogans.

We update the rolling soundness board and append Progress. We do not invent empty graph nodes for "later I will explain."

## Distinctions vs Angle passes

This is the heart of the method.

**A Distinction** is contrastive precision. Seth splits a muddle into poles and the framework has to keep that joint honest. Inner ego vs outer ego. Mind influences matter vs mind creates matter. Physical as mere falsehood vs physical as a purposive form of a greater reality. Distinctions are where soundness is testable: if a later chapter collapses the poles without acknowledging the cost, the framework is drifting.

**An Angle pass** is refractive precision. Seth seems to repeat himself. He is not. Each pass looks at the same claim from a new angle and **adds constraint** - cuts off a misread, tightens scope, or stacks precision without needing a new binary axis. You will feel this more in *The Nature of Personal Reality*, but it already shows up in *Seth Speaks*. Example stack: physical form as camouflage -> the physical picture as one guise among many -> "illusion" only if you remember it is caused by a greater reality and has purpose. Same territory. Three angles. More precision each time.

Use a Distinction node when the text is actually bipolar. Use an Angle pass (in findings and digests) when the text is mono-claim, multi-aspect. Do not force every sharpening into a false binary. Do not treat every restatement as redundancy to delete.

Distinctions and Angle passes beat hoarding Concepts. Concepts are nouns. These two are how the framework *thinks*.

## Mechanisms and forward plants

A Mechanism is a how-chain: thought and emotion become electromagnetic units; intensity sets strength and permanency; you act as a transformer into physical objects. When Seth only announces the chain and defers the steps, we mark it `partial` and list the deferral as a **forward plant**.

Forward plants are first-class. Seth defers a lot. That is data, not a mess. What we refuse to do is mint placeholder children for explanations that have not arrived. Empty nodes fake completeness. Partial status plus a plant ledger tells the truth.

Testable claims are a separate capture register: if a claim is specific enough to be wrong, write its falsifier at capture time and leave adjudication for another day. `docs-ops/EXERCISES.md` is the capture-only exercise catalog; results never go there.

## The leak filter

Session color (the rocker, the cat, the cold night), jokes, pure analogies, and reader-address rhetoric usually stay out of the graph. Put them in notes or leave them in the chapter text. The graph is for claims that have to keep working later.

Analogies are especially sneaky. Onion skins, computers, TV screens, Empire State Building - useful in digests as teaching color, dangerous as ontology nodes.

## One-stack reminders (so far)

Canonical index as stacks multiply: `docs-ops/stack-guides/README.md`.

- **Thought-form and EM units** are one stack, not two rival systems: emotional counterparts / thought-forms sit beneath matter intensity; EM units are the substrate language. *(Guide candidate - not written yet.)*
- **Camouflage / guise / purposive illusion** is one Angle stack on physical reality's status - protect it; do not flatten to "all fake" or "all solid." **Guide live:** `docs-ops/stack-guides/SG-physical-reality-status.md`
- **Consciousness creates form** (ontology) and **you create your physical reality** (responsibility) stay separate Assertions even when they rhyme.

## Stack guides

When an Angle stack earns >=3 protected passes (or is listed on Soundness), promote a **stack guide**: deep practical prose for pressure-testing later chapters. Index and promotion rule: `docs-ops/stack-guides/README.md`. Digests stay chapter-local; stack guides stay cross-chapter.

## Adjacent frameworks

We sometimes note structural echoes - process philosophy, idealist appearance, careful Buddhist-adjacent emptiness-of-inherent-form, observer/system dependence, James-style empiricism. Echo means rhyme. It never means Seth = X. If a parallel starts doing identity work, cut it.

Cross-chapter rhyme data consolidates in docs-ops/ECHO_INDEX.md; consult it deliberately, and never load it into extraction context.

## YAML, digests, and handoff

**YAML** is the curation notebook: train of thought, graph source of truth for nodes, place to think in ids and quotes. Keep it endearing; do not exile thinking from it.

**Findings / digests / stack guides** are isolated handoff deliverables - compressed boards, chapter memory, and reusable stack instruments. Do not hand off *only* in YAML; do not pretend YAML is useless for narrative scaffolding while you curate.

Open YAML freely to curate. Reach for a digest or stack guide when you need orientation or pressure tests without rebuilding the argument from nodes.

## Glossary (plain English)

- **Distinction** - a named contrast with two poles; a framework joint.
- **Angle pass** - a new-angle restatement of the same claim that adds precision or cuts a misread.
- **Assertion** - a load-bearing claim (stable or contested).
- **Concept** - a named structure that needs a graph home without yet being a contrast, process, or load-bearing claim.
- **Mechanism** - a process chain with steps; often partial while Seth defers.
- **Forward plant** - an explicit "later" promise tracked in review, not as an empty node.
- **Leak** / **leak filter** - material we wisely leave out of the graph (session color, jokes, pure analogies, rhetoric).
- **Root assumptions** - built-in agreements a reality system runs on (e.g. space and time), in Seth's vocabulary.
- **Camouflage** - physical form as a specialized appearance of a deeper vitality/reality.
- **Findings** - compressed chapter review.
- **Digest** - paragraph chapter review (200-1500 words, density-scaled).
- **Stack guide** - cross-chapter practical instrument for an Angle stack or Distinction family.

## Later (not this pass)

A first-class YAML type for Angle passes may earn its keep when *Nature of Personal Reality* volume forces it. Public blog export and auto-generated digests can wait. For now: teach the idea, track it in review, narrate it in digests.


