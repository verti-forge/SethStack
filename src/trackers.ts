type Row = { id: string; type: string; summary?: string; quotes?: string[] };

export function contradictionTracker(rows: Row[]) {
  const alerts: string[] = [];
  const index = new Map<string, Row[]>();

  for (const r of rows) {
    const key = r.id;
    const arr = index.get(key) ?? [];
    arr.push(r);
    index.set(key, arr);
  }

  for (const [id, arr] of index) {
    const kinds = new Set(arr.map(a => a.type));
    if (kinds.size > 1) alerts.push(`Type mismatch for ${id}: ${[...kinds].join(", ")}`);
  }

  for (const r of rows) {
    if (r.summary?.match(/\bdoes not exist\b/i) && r.summary?.match(/\bexists\b/i)) {
      alerts.push(`Possible self-contradiction in ${r.id}`);
    }
  }
  return alerts;
}

export function mechanismWatchlist(rows: Row[]) {
  const required = [
    "thought-to-matter-transformation",
    "body-as-thought-materialization",
    "environment-as-consciousness-extension"
  ];
  const have = new Set(rows.map(r => r.id));
  return required.filter(k => !have.has(k));
}
