import fs from "node:fs";
import path from "node:path";
import { connection } from "@/lib/db";
import { Solution } from "@/types/Solution";

interface ProblemJson {
    number: number;
    url: string;
    title: string;
    description: string;
    solutions: Solution[];
    runtime: string | null;
    memory: string | null;
    difficulty: "Easy" | "Medium" | "Hard";
    topicNames?: string[];
}

const insertProblem = connection.prepare(`
INSERT INTO problems (
    number,
    url,
    title,
    description,
    difficulty
)
VALUES (?, ?, ?, ?, ?)
`);

const insertSolution = connection.prepare(`
INSERT INTO solutions (
    problem_id,
    language,
    solution,
    runtime,
    memory,
    major_version,
    minor_version,
    patch_version,
    submitted
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const findTopic = connection.prepare(`
SELECT id
FROM topics
WHERE name = ?
`);

const insertTopic = connection.prepare(`
INSERT INTO topics (name)
VALUES (?)
`);

const attachTopic = connection.prepare(`
INSERT OR IGNORE INTO problem_topic (
    problem_id,
    topic_id
)
VALUES (?, ?)
`);

const seed = connection.transaction(() => {
    const file = path.join(process.cwd(), "data", "problems.json");

    if (!fs.existsSync(file)) {
        throw new Error(`Missing ${file}`);
    }

    const problems = JSON.parse(
        fs.readFileSync(file, "utf8")
    ) as ProblemJson[];
    connection.exec(`
        DELETE FROM problem_topic;
        DELETE FROM solutions;
        DELETE FROM topics;
        DELETE FROM problems;
    `);

    for (const problem of problems) {
        const result = insertProblem.run(
            problem.number,
            problem.url,
            problem.title,
            problem.description,
            problem.difficulty,
        );

        const problemId = Number(result.lastInsertRowid);

        for (const solution of problem.solutions ?? []) {
            insertSolution.run(
                problemId,
                solution.language,
                solution.solution,
                solution.runtime,
                solution.memory,
                solution.major_version,
                solution.minor_version,
                solution.patch_version,
                solution.submitted ? 1 : 0,
            );
        }
        for (const topicName of problem.topicNames ?? []) {
            let topic = findTopic.get(topicName) as
                | { id: number }
                | undefined;

            if (!topic) {
                const inserted = insertTopic.run(topicName);

                topic = {
                    id: Number(inserted.lastInsertRowid),
                };
            }

            attachTopic.run(problemId, topic.id);
        }
    }

    console.log(`Seeded ${problems.length} problems.`);
});