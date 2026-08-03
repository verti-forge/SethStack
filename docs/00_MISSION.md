# Mission

## Purpose

SethStack is a local TypeScript tool for structuring Seth notes into a validated, graphable knowledge base — and for testing whether that knowledge framework stays sound as source angles multiply. YAML under `data/` is ingested, checked with Zod schemas, linked into a depends/relates graph, exported to JSON/Mermaid/SQLite, and scanned by lightweight trackers. Chapter findings and a rolling soundness board in `docs-ops/` judge Distinctions, Mechanisms, forward plants, and cross-chapter tension — without bloating the graph.

## Target user

Travis (or an assisting agent) curating Seth concepts, mechanisms, assertions, and distinctions from local YAML — no hosted service required.

## Definition of Done

- Ingest YAML from `data/**/*.yaml`
- Validate items with the appropriate Zod schema; surface clear validation and duplicate-id errors
- Build a depends/relates graph and refresh `dist/graph.json`, `dist/graph.mmd`, `dist/report.md`, and `dist/seth.db`
- Schemas remain expandable without breaking preserved YAML ids
- Each curated chapter has a findings review **and** a paragraph digest under `docs-ops/chapter-reviews/`, plus an update to `docs-ops/FRAMEWORK_SOUNDNESS.md`
- Forward plants (“later I will explain”) are tracked in findings — not as empty graph nodes
- Distinctions (contrast) and Angle passes (same claim, new precision) are both first-class review surfaces
- Stack guides exist for protected Angle stacks / Distinction families (`docs-ops/stack-guides/`) when promotion rules fire

## Non-goals

- Hosted or multi-user app
- Network sync or remote APIs
- LLM/runtime agent orchestration inside the pipeline
- Full-text corpus or ebook management
- Equating Seth with other philosophies (adjacent echoes only, never identity claims)
