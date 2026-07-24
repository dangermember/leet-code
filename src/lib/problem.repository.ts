import { DatabaseProvider } from "@/lib/database";
import type { Problem } from "@/types/Problem";
import type { Topic } from "@/types/Topic";
import type { Difficulty } from "@/types/Difficulty";
import type { Solution } from "@/types/Solution";
import { ChartSegment } from "@/types/ChartSegment";

interface GetProblemsOptions {
    page?: number;
    perPage?: number;
    difficulty?: Difficulty;
    topic?: string;
    search?: string;
}

export class ProblemRepository {
    private static get db() {
        return DatabaseProvider.getInstance();
    }

    private static getTopicsForProblem(problemId: number): Topic[] {
        return this.db
            .prepare(`
                SELECT t.*
                FROM topics t
                JOIN problem_topic pt
                ON pt.topic_id = t.id
                WHERE pt.problem_id = ?
                ORDER BY t.name
            `)
            .all(problemId) as Topic[];
    }

    private static getSolutionsForProblem(problemId: number): Solution[] {
        return this.db
            .prepare(`
                SELECT *
                FROM solutions
                WHERE problem_id = ? and submitted = 1
                ORDER BY created_at DESC, id DESC
            `)
            .all(problemId) as Solution[];
    }

    private static enrichProblems(problems: Problem[]): void {
        for (const problem of problems) {
            problem.topics = this.getTopicsForProblem(problem.id);
            problem.solutions = this.getSolutionsForProblem(problem.id);
        }
    }

    private static getProblemCount(): number {
        const result = this.db
            .prepare(`SELECT COUNT(*) AS total FROM problems`)
            .get() as { total: number };

        return result.total;
    }

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

        const total = this.db
            .prepare(`
                SELECT COUNT(*) as total
                FROM problems p
                ${whereClause}
            `)
            .get(...params) as { total: number };

        const problems = this.db
            .prepare(`
                SELECT *
                FROM problems p
                ${whereClause}
                ORDER BY p.number
                LIMIT ?
                OFFSET ?
            `)
            .all(...params, perPage, offset) as Problem[];

        this.enrichProblems(problems);

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
        const problems = this.db
            .prepare(`
                SELECT *
                FROM problems
                ORDER BY number
            `)
            .all() as Problem[];

        this.enrichProblems(problems);

        return problems;
    }

    static getById(id: number): Problem | null {
        const problem = this.db
            .prepare(`
                SELECT *
                FROM problems
                WHERE id = ?
            `)
            .get(id) as Problem | undefined;

        if (!problem) return null;

        this.enrichProblems([problem]);

        return problem;
    }

    static getAllTopics(): Topic[] {
        return this.db
            .prepare(`
                SELECT *
                FROM topics
                ORDER BY name ASC
            `)
            .all() as Topic[];
    }

    static groupByDifficulty(): ChartSegment[] {
        const total = Math.max(this.getProblemCount(), 1);

        return this.db
            .prepare(`
                SELECT
                    difficulty AS label,
                    COUNT(*) * 100.0 / ? AS value
                FROM problems
                GROUP BY difficulty
                ORDER BY value DESC, label
                LIMIT 6
            `)
            .all(total) as ChartSegment[];
    }

    static groupByTopic(): ChartSegment[] {
        const total = Math.max(this.getProblemCount(), 1);

        return this.db
            .prepare(`
                SELECT
                    t.name AS label,
                    COUNT(pt.problem_id) * 100.0 / ? AS value
                FROM topics t
                JOIN problem_topic pt
                    ON pt.topic_id = t.id
                GROUP BY t.name
                ORDER BY value DESC, label
                LIMIT 6
            `)
            .all(total) as ChartSegment[];
    }

    static getAverageRuntime(): number {
        const result = this.db
            .prepare(`
                SELECT AVG(runtime) AS average
                FROM solutions
                WHERE runtime > 0 and submitted = 1
            `)
            .get() as { average: number | null };

        return result.average ?? 0;
    }

    static getAverageMemory(): number {
        const result = this.db
            .prepare(`
                SELECT AVG(memory) AS average
                FROM solutions
                WHERE memory > 0 and submitted = 1
            `)
            .get() as { average: number | null };

        return result.average ?? 0;
    }
}