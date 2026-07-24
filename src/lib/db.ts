import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

const dbDir = path.join(process.cwd(), "data");

if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new Database(path.join(dbDir, "leetcode.db"));

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");