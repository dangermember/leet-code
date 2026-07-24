import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";
import type { DatabaseConnection, DatabaseStatement } from "@/lib/database";

class SQLiteStatement implements DatabaseStatement {
    constructor(private readonly stmt: Database.Statement) {}

    get(...params: unknown[]) {
        return this.stmt.get(...params);
    }

    all(...params: unknown[]) {
        return this.stmt.all(...params);
    }

    run(...params: unknown[]) {
        return this.stmt.run(...params);
    }
}

export class SQLiteDatabase implements DatabaseConnection {
    constructor(private readonly db: Database.Database) {}

    prepare(query: string) {
        return new SQLiteStatement(this.db.prepare(query));
    }

    transaction<T>(fn: () => T): T {
        return this.db.transaction(fn)();
    }

    exec(query: string) {
        this.db.exec(query);
    }

    close() {
        this.db.close();
    }
}

export function createSQLiteConnection() {
    const dbDir = path.join(process.cwd(), "data");

    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }

    const connection = new Database(path.join(dbDir, "leetcode.db"));
    connection.pragma("journal_mode = WAL");
    connection.pragma("foreign_keys = ON");

    return new SQLiteDatabase(connection);
}
