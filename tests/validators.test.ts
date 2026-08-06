import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";
import { validateItems } from "../src/validators";
import { collectMissingRefs } from "../src/linkers";
import { EntitySchema } from "../schemas/entity.zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixtures = path.join(__dirname, "fixtures");

function loadFixture(name: string): any[] {
  const text = fs.readFileSync(path.join(fixtures, name), "utf8");
  const doc = yaml.load(text);
  return Array.isArray(doc) ? doc : [doc];
}

describe("validators", () => {
  it("parses a valid Entity (Concept) happy path", () => {
    const raw = loadFixture("happy-entity.yaml");
    const { valid, errors } = validateItems(raw);
    assert.equal(errors.length, 0);
    assert.equal(valid.length, 1);
    assert.equal(valid[0].id, "test-happy-concept");
    assert.equal(valid[0].type, "Concept");
  });

  it("rejects a malformed node missing required fields", () => {
    assert.throws(() => EntitySchema.parse({ id: "x", type: "Concept" }), /required|invalid/i);
    const { valid, errors } = validateItems([{ id: "bad-node", type: "Concept" }]);
    assert.equal(valid.length, 0);
    assert.ok(errors.some((e) => e.id === "bad-node"));
  });

  it("rejects duplicate ids within one list and omits them", () => {
    const item = {
      id: "dup-local",
      label: "Dup",
      type: "Concept",
      summary: "dup",
      source: "t",
      first_appearance: "t"
    };
    const { valid, errors } = validateItems([item, { ...item, label: "Dup2" }]);
    assert.equal(valid.length, 0);
    assert.ok(errors.some((e) => e.id === "dup-local" && /Duplicate id/i.test(e.error)));
  });

  it("rejects duplicate ids across chapter-like fixture files", () => {
    const merged = [...loadFixture("dup-a.yaml"), ...loadFixture("dup-b.yaml")];
    const { valid, errors } = validateItems(merged);
    assert.equal(valid.length, 0);
    assert.ok(errors.some((e) => e.id === "shared-dup-id" && /Duplicate id/i.test(e.error)));
  });
});

describe("dangling refs (T003)", () => {
  it("collects missing dependency and relates_to targets", () => {
    const raw = loadFixture("dangling.yaml");
    const { valid, errors } = validateItems(raw);
    assert.equal(errors.length, 0);
    assert.equal(valid.length, 1);
    const missing = collectMissingRefs(valid);
    assert.equal(missing.length, 2);
    assert.ok(missing.some((m) => m.kind === "depends" && m.missing === "nonexistent-target-id"));
    assert.ok(missing.some((m) => m.kind === "relates" && m.missing === "also-missing-target"));
  });
});
