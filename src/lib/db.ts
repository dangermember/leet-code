import { DatabaseAdapterFactory, DatabaseProvider } from "@/lib/database";

// Import the registry so built-in adapters are registered
import "@/lib/adapter-registry";

const provider = process.env.DB_PROVIDER ?? "sqlite";

export const db = DatabaseAdapterFactory.create(provider);
DatabaseProvider.setInstance(db);

export const connection = DatabaseProvider.getInstance();