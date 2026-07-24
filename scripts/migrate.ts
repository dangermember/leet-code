import { db } from "@/lib/db";

export function migrate() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS problems (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            number INTEGER NOT NULL,
            url TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            solution TEXT NOT NULL,
            runtime REAL,
            memory REAL,
            difficulty TEXT NOT NULL CHECK(difficulty IN ('Easy','Medium','Hard')),
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS topics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS problem_topic (
            problem_id INTEGER NOT NULL,
            topic_id INTEGER NOT NULL,

            PRIMARY KEY(problem_id, topic_id),

            FOREIGN KEY(problem_id)
                REFERENCES problems(id)
                ON DELETE CASCADE,

            FOREIGN KEY(topic_id)
                REFERENCES topics(id)
                ON DELETE CASCADE
        );

        CREATE INDEX IF NOT EXISTS idx_problem_number
            ON problems(number);

        CREATE INDEX IF NOT EXISTS idx_problem_difficulty
            ON problems(difficulty);

        CREATE INDEX IF NOT EXISTS idx_problem_topic_problem
            ON problem_topic(problem_id);

        CREATE INDEX IF NOT EXISTS idx_problem_topic_topic
            ON problem_topic(topic_id);
    `);
}
migrate();