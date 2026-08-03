import fs from "fs";
import path from "path";
import { glob } from "glob";
import yaml from "js-yaml";

export async function loadAllYAML(dir: string) {
  const files = await glob("**/*.yaml", { cwd: dir, absolute: true });
  const items: any[] = [];
  for (const f of files) {
    const text = fs.readFileSync(f, "utf8");
    const doc = yaml.load(text);
    if (Array.isArray(doc)) items.push(...doc);
    else if (doc) items.push(doc);
  }
  return items;
}
