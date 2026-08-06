# Risks

## Technical

- Schema drift across Entity vs Mechanism/Assertion/Distinction — shared fields diverge silently. Mitigation: keep a shared base shape or cross-check schemas when adding fields.
- Partial graphs from continuing past validation errors — mitigated: stages exit nonzero on Zod/duplicate-id errors and (by default) dangling refs.
- Missing refs — mitigated: T003 reports dangling depends/relates; fail by default with `--allow-dangling` escape.
- CLI mode confusion — mitigated: T002 stage dispatch + usage exit.
- `better-sqlite3` major upgrades (9→13) can change DB API/defaults — smoke `npm run all` after bumps; patch `src/db.ts`, do not couple validate to SQLite.
- No automated tests covering graph export / SQLite stages yet — T004 covers validators + dangling collector only.
- False confidence from a “full” graph while Mechanism chains remain `partial` and forward plants are open. Mitigation: findings + `FRAMEWORK_SOUNDNESS.md` required each chapter.

## Product

- Scope creep into hosted UI or corpus tooling before local graph loop is solid. Mitigation: honor non-goals in `00_MISSION.md`.
- Seed/example YAML becomes the de facto ontology without review. Mitigation: treat `data/seeds/` as examples; curated chapters live under `data/seth-speaks/`; findings review required.
- Equating Seth with adjacent frameworks (idealism, Buddhism, process philosophy, etc.). Mitigation: echoes only; rubric forbids equivalence claims.
- Minting empty nodes for “later I will explain” deferrals. Mitigation: forward-plant ledger in findings; no placeholder children.

## Security

- Local-only by design, but accidental network or credential deps could land via packages. Mitigation: ask before dependencies; keep `.env` gitignored.
- Generated `dist/` may hold notes you do not want shared. Mitigation: keep `dist` ignored; do not commit secrets or private quotes dumps.

## Unknowns

- How strictly validation should fail the run (warn vs exit non-zero) for day-to-day curation — currently fail-fast; revisit if too noisy.
- Long-term shape of “contradiction” detection beyond id/type and naive summary heuristics.
- When Mechanism `steps[]` (or similar) should graduate from findings prose into schema — through Ch.4 volume still lives in findings/soundness; graduate only when chain volume forces it.
- How hard to press cross-framework echoes without drifting into comparative theology.
- AnglePass YAML representation before NPR — decision parked in `docs-ops/MAYBE.md` (not implemented).
