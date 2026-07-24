export interface DatabaseConnection {
    prepare(query: string): DatabaseStatement;
    transaction<T>(fn: () => T): T;
    exec(query: string): void;
    close(): void;
}

export interface DatabaseStatement {
    get(...params: unknown[]): unknown;
    all(...params: unknown[]): unknown[];
    run(...params: unknown[]): { lastInsertRowid: number | bigint; changes: number };
}

export interface RepositoryContext {
    db: DatabaseConnection;
}

/**
 * Singleton — holds a single global DatabaseConnection instance.
 */
export class DatabaseProvider {
    private static instance: DatabaseConnection;

    static setInstance(connection: DatabaseConnection) {
        this.instance = connection;
    }

    static getInstance(): DatabaseConnection {
        if (!this.instance) {
            const provider = process.env.DB_PROVIDER ?? "sqlite";
            this.instance = DatabaseAdapterFactory.create(provider);
        }

        return this.instance;
    }
}

/**
 * Abstract Factory — creates the correct DatabaseConnection
 * based on a provider name string (e.g. "sqlite", "mysql").
 */
export class DatabaseAdapterFactory {
    static create(provider: string): DatabaseConnection {
        // Lazy import to avoid circular dependency
        const { getAdapter } = require("@/lib/adapter-registry");
        const factory = getAdapter(provider);

        if (!factory) {
            throw new Error(
                `Unknown database provider: "${provider}". ` +
                `Register it with registerAdapter() in adapter-registry.ts`
            );
        }

        return factory();
    }
}
