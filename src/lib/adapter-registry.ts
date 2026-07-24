import type { DatabaseConnection } from "@/lib/database";
import { createSQLiteConnection } from "@/lib/sqlite-adapter";

type AdapterFactory = () => DatabaseConnection;

/**
 * Registry mapping provider names to their factory functions.
 * 
 * To add a new database provider:
 *   1. Create a new adapter file (e.g. mysql-adapter.ts)
 *   2. Call registerAdapter("mysql", createMySQLConnection)
 *   3. Set DB_PROVIDER=mysql in .env
 */
const adapters = new Map<string, AdapterFactory>();

// Register built-in adapters
adapters.set("sqlite", createSQLiteConnection);

export function registerAdapter(name: string, factory: AdapterFactory): void {
    adapters.set(name, factory);
}

export function getAdapter(name: string): AdapterFactory | undefined {
    return adapters.get(name);
}

export function getRegisteredAdapters(): string[] {
    return Array.from(adapters.keys());
}
