// Tiny JSON-file "database" so the project runs with zero setup.
// For production replace this module with MongoDB / PostgreSQL (see docs/ARCHITECTURE.md).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.join(__dirname, "db.json");

function load() {
  if (!fs.existsSync(FILE)) return { users: [], projects: [], messages: [] };
  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

function save(db) {
  fs.writeFileSync(FILE, JSON.stringify(db, null, 2));
}

export const store = {
  all(collection) {
    return load()[collection];
  },
  find(collection, predicate) {
    return load()[collection].find(predicate);
  },
  filter(collection, predicate) {
    return load()[collection].filter(predicate);
  },
  insert(collection, item) {
    const db = load();
    db[collection].push(item);
    save(db);
    return item;
  },
  update(collection, id, patch) {
    const db = load();
    const i = db[collection].findIndex((x) => x.id === id);
    if (i === -1) return null;
    db[collection][i] = { ...db[collection][i], ...patch };
    save(db);
    return db[collection][i];
  },
};
