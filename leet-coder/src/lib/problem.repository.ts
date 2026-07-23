import { db } from "./database";
import type { Problem } from "@/types/Problem";
import type { Topic } from "@/types/Topic";

const getProblemStmt = db.prepare(`
SELECT *
FROM problems
WHERE id = ?
`);

const getTopicsStmt = db.prepare(`
SELECT t.*
FROM topics t
JOIN problem_topic pt
ON pt.topic_id = t.id
WHERE pt.problem_id = ?
ORDER BY t.name
`);

export class ProblemRepository {
    static find(id: number): Problem | null {
        const problem = getProblemStmt.get(id) as Problem | undefined;

        if (!problem) {
            return null;
        }

        problem.topics = getTopicsStmt.all(id) as Topic[];

        return problem;
    }

    static all(): Problem[] {
        const problems = db
            .prepare("SELECT * FROM problems ORDER BY number")
            .all() as Problem[];

        for (const problem of problems) {
            problem.topics = getTopicsStmt.all(problem.id) as Topic[];
        }

        return problems;
    }

    static create(problem: Omit<Problem, "id" | "created_at" | "updated_at" | "topics">) {
        return db.prepare(`
            INSERT INTO problems (
                number,
                url,
                title,
                description,
                solution,
                runtime,
                memory,
                difficulty
            )
            VALUES (
                @number,
                @url,
                @title,
                @description,
                @solution,
                @runtime,
                @memory,
                @difficulty
            )
        `).run(problem);
    }
}