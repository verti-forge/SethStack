# Risks

## Technical

- Schema drift across Entity vs Mechanism/Assertion/Distinction — shared fields diverge silently. Mitigation: keep a shared base shape or cross-check schemas when adding fields.
- Pipeline continues after validation errors — partial graphs can look “OK”. Mitigation: optional fail-fast flag or non-zero exit when errors.length > 0.
- Missing refs skipped with no report — curation holes stay invisible. Mitigation: T003 broken-edge reporting.
- CLI args ignored — wrong mental model of modes. Mitigation: T002 dispatch harden.
- `better-sqlite3` native build friction on some Windows setups. Mitigation: document install/prereqs; consider pure-JS fallback only if needed (ask first).
- No automated tests yet — regressions in validators go unnoticed. Mitigation: T004.
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

- How strictly validation should fail the run (warn vs exit non-zero) for day-to-day curation.
- Whether CLI modes need true stage splits or just clearer aliases of `runAll`.
- Long-term shape of “contradiction” detection beyond id/type and naive summary heuristics.
- When Mechanism `steps[]` (or similar) should graduate from findings prose into schema — defer until Ch.3+ chain volume forces it.
- How hard to press cross-framework echoes without drifting into comparative theology.
