import Database from "better-sqlite3";
import fs from "fs";

export function initDB(path = "dist/seth.db") {
  fs.mkdirSync("dist", { recursive: true });
  const db = new Database(path);
  db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS nodes(
      id TEXT PRIMARY KEY,
      type TEXT,
      label TEXT,
      summary TEXT,
      source TEXT
    );
    CREATE TABLE IF NOT EXISTS edges(
      from_id TEXT,
      to_id TEXT,
      kind TEXT
    );
  `);
  return db;
}

export function writeGraph(db: any, graph: any) {
  const insNode = db.prepare(
    "INSERT OR REPLACE INTO nodes(id,type,label,summary,source) VALUES(?,?,?,?,?)"
  );
  const insEdge = db.prepare(
    "INSERT INTO edges(from_id,to_id,kind) VALUES(?,?,?)"
  );
  const tx = db.transaction(() => {
    db.exec("DELETE FROM nodes; DELETE FROM edges;");
    for (const n of graph.nodes) {
      insNode.run(n.id, n.type, n.label, n.summary ?? "", n.source ?? "");
    }
    for (const e of graph.edges) {
      insEdge.run(e.from, e.to, e.kind);
    }
  });
  tx();
}
