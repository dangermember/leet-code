import fs from "node:fs";
import path from "node:path";
import { db } from "@/lib/db";
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

const insertProblem = db.prepare(`
INSERT INTO problems (
    number,
    url,
    title,
    description,
    difficulty
)
VALUES (
    @number,
    @url,
    @title,
    @description,
    @difficulty
)
`);

const insertSolution = db.prepare(`
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
VALUES (
    @problem_id,
    @language,
    @solution,
    @runtime,
    @memory,
    @major_version,
    @minor_version,
    @patch_version,
    @submitted
)
`);

const findTopic = db.prepare(`
SELECT id
FROM topics
WHERE name = ?
`);

const insertTopic = db.prepare(`
INSERT INTO topics (name)
VALUES (?)
`);

const attachTopic = db.prepare(`
INSERT OR IGNORE INTO problem_topic (
    problem_id,
    topic_id
)
VALUES (?, ?)
`);

const seed = db.transaction(() => {
    const file = path.join(process.cwd(), "data", "problems.json");

    if (!fs.existsSync(file)) {
        throw new Error(`Missing ${file}`);
    }

    const problems = JSON.parse(
        fs.readFileSync(file, "utf8")
    ) as ProblemJson[];
    db.exec(`
        DELETE FROM problem_topic;
        DELETE FROM solutions;
        DELETE FROM topics;
        DELETE FROM problems;

        DELETE FROM sqlite_sequence
        WHERE name IN ('problems', 'topics', 'solutions');
    `);

    for (const problem of problems) {
        const result = insertProblem.run({
            number: problem.number,
            url: problem.url,
            title: problem.title,
            description: problem.description,
            difficulty: problem.difficulty,
        });

        const problemId = Number(result.lastInsertRowid);

        for (const solution of problem.solutions ?? []) {
            insertSolution.run({
                problem_id: problemId,
                language: solution.language,
                solution: solution.solution,
                runtime: solution.runtime,
                memory: solution.memory,
                major_version: solution.major_version,
                minor_version: solution.minor_version,
                patch_version: solution.patch_version,
                submitted: solution.submitted ? 1 : 0,
            });
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

seed();