import { db } from "@/lib/database";
import type { Problem } from "@/types/Problem";
import type { Topic } from "@/types/Topic";
import type { Difficulty } from "@/types/Difficulty";
import { ChartSegment } from "@/types/ChartSegment";

interface GetProblemsOptions {
    page?: number;
    perPage?: number;
    difficulty?: Difficulty;
    topic?: string;
    search?: string;
}

const getTopicsStmt = db.prepare(`
SELECT t.*
FROM topics t
JOIN problem_topic pt
ON pt.topic_id = t.id
WHERE pt.problem_id = ?
ORDER BY t.name
`);

const getProblemCountStmt = db.prepare(`
SELECT COUNT(*) AS total
FROM problems
`);

const groupByDifficultyStmt = db.prepare(`
SELECT
    difficulty AS label,
    COUNT(*) * 100.0 / ? AS value
FROM problems
GROUP BY difficulty
ORDER BY value DESC, label
LIMIT 6
`);

const groupByTopicStmt = db.prepare(`
SELECT
    t.name AS label,
    COUNT(pt.problem_id) * 100.0 / ? AS value
FROM topics t
JOIN problem_topic pt
    ON pt.topic_id = t.id
GROUP BY t.name
ORDER BY value DESC, label
LIMIT 6
`);

const averageRuntimeStmt = db.prepare(`
SELECT AVG(runtime) AS average
FROM problems
WHERE runtime > 0
`);

const averageMemoryStmt = db.prepare(`
SELECT AVG(memory) AS average
FROM problems
WHERE memory > 0
`);

export class ProblemRepository {
    static paginate({
        page = 1,
        perPage = 20,
        difficulty,
        topic,
        search,
    }: GetProblemsOptions = {}) {
        perPage = Math.min(Math.max(perPage, 1), 100);

        const offset = (page - 1) * perPage;

        const where: string[] = [];
        const params: unknown[] = [];

        if (difficulty) {
            where.push("p.difficulty = ?");
            params.push(difficulty);
        }

        if (search) {
            where.push("p.title LIKE ?");
            params.push(`%${search}%`);
        }

        if (topic) {
            where.push(`
                EXISTS (
                    SELECT 1
                    FROM problem_topic pt
                    JOIN topics t
                        ON t.id = pt.topic_id
                    WHERE pt.problem_id = p.id
                      AND t.name = ?
                )
            `);

            params.push(topic);
        }

        const whereClause =
            where.length > 0
                ? `WHERE ${where.join(" AND ")}`
                : "";

        const total = db
            .prepare(`
                SELECT COUNT(*) as total
                FROM problems p
                ${whereClause}
            `)
            .get(...params) as { total: number };

        const problems = db
            .prepare(`
                SELECT *
                FROM problems p
                ${whereClause}
                ORDER BY p.number
                LIMIT ?
                OFFSET ?
            `)
            .all(...params, perPage, offset) as Problem[];

        for (const problem of problems) {
            problem.topics = getTopicsStmt.all(problem.id) as Topic[];
        }

        return {
            data: problems,
            meta: {
                page,
                perPage,
                total: total.total,
                totalPages: Math.ceil(total.total / perPage),
            },
        };
    }

    static getAll(): Problem[] {
        const problems = db
            .prepare(`
                SELECT *
                FROM problems
                ORDER BY number
            `)
            .all() as Problem[];

        for (const problem of problems) {
            problem.topics = getTopicsStmt.all(problem.id) as Topic[];
        }

        return problems;
    }

    static groupByDifficulty(): ChartSegment[] {
        const total = Math.max(
            (getProblemCountStmt.get() as { total: number }).total,
            1
        );

        return groupByDifficultyStmt.all(total) as ChartSegment[];
    }

    static groupByTopic(): ChartSegment[] {
        const total = Math.max(
            (getProblemCountStmt.get() as { total: number }).total,
            1
        );

        return groupByTopicStmt.all(total) as ChartSegment[];
    }

    static getAverageRuntime(): number {
        const result = averageRuntimeStmt.get() as {
            average: number | null;
        };

        return result.average ?? 0;
    }

    static getAverageMemory(): number {
        const result = averageMemoryStmt.get() as {
            average: number | null;
        };

        return result.average ?? 0;
    }
}