import { connection } from "@/lib/db";

export function migrate() {
    connection.exec(`
        DROP TABLE IF EXISTS problem_topic;
        DROP TABLE IF EXISTS solutions;
        DROP TABLE IF EXISTS topics;
        DROP TABLE IF EXISTS problems;
        DROP TABLE IF EXISTS users;

        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'admin',
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS problems (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            number INTEGER NOT NULL UNIQUE,
            url TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            difficulty TEXT NOT NULL CHECK(difficulty IN ('Easy','Medium','Hard')),
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS solutions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                problem_id INTEGER NOT NULL,
                language TEXT NOT NULL CHECK(language IN ('C++','Java','Python3','Python','JavaScript','TypeScript','C#','C','Go','Kotlin','Swift','Rust','Ruby','PHP','Dart','Scala','Elixir','Erlang','Racket')),
                solution TEXT NOT NULL,
                runtime REAL,
                memory REAL,
                major_version INTEGER,
                minor_version INTEGER,
                patch_version INTEGER,
                submitted BOOLEAN NOT NULL DEFAULT 1,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(problem_id)
                    REFERENCES problems(id)
                    ON DELETE CASCADE
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

        CREATE INDEX IF NOT EXISTS idx_solutions_problem_id
            ON solutions(problem_id);
    `);

    console.log("Migration completed successfully.");
}
migrate();