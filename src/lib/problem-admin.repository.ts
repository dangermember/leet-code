import { DatabaseProvider } from "@/lib/database";

export class ProblemAdminRepository {
    static createProblem(payload: {
        number: number;
        url: string;
        title: string;
        description: string;
        difficulty: string;
    }) {
        return DatabaseProvider.getInstance()
            .prepare(`
                INSERT INTO problems (number, url, title, description, difficulty)
                VALUES (?, ?, ?, ?, ?)
            `)
            .run(payload.number, payload.url, payload.title, payload.description, payload.difficulty);
    }

    static createSolution(payload: {
        problemId: number;
        language: string;
        solution: string;
        runtime: number | null;
        memory: number | null;
        majorVersion: number | null;
        minorVersion: number | null;
        patchVersion: number | null;
        submitted: boolean;
    }) {
        return DatabaseProvider.getInstance()
            .prepare(`
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
            `)
            .run(
                payload.problemId,
                payload.language,
                payload.solution,
                payload.runtime,
                payload.memory,
                payload.majorVersion,
                payload.minorVersion,
                payload.patchVersion,
                payload.submitted ? 1 : 0
            );
    }

    static updateProblem(payload: {
        id: number;
        number: number;
        url: string;
        title: string;
        description: string;
        difficulty: string;
    }) {
        return DatabaseProvider.getInstance()
            .prepare(`
                UPDATE problems
                SET number = ?,
                    url = ?,
                    title = ?,
                    description = ?,
                    difficulty = ?,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `)
            .run(payload.number, payload.url, payload.title, payload.description, payload.difficulty, payload.id);
    }

    static syncTopics(problemId: number, topics: string[]) {
        const db = DatabaseProvider.getInstance();
        db.prepare(`DELETE FROM problem_topic WHERE problem_id = ?`).run(problemId);

        for (const name of topics) {
            const trimmed = name.trim();
            if (!trimmed) continue;

            let topic = db.prepare(`SELECT id FROM topics WHERE name = ?`).get(trimmed) as { id: number } | undefined;
            if (!topic) {
                const inserted = db.prepare(`INSERT INTO topics (name) VALUES (?)`).run(trimmed);
                topic = { id: Number(inserted.lastInsertRowid) };
            }

            db.prepare(`INSERT OR IGNORE INTO problem_topic (problem_id, topic_id) VALUES (?, ?)`).run(problemId, topic.id);
        }
    }

    static saveSolution(payload: {
        problemId: number;
        language: string;
        solution: string;
        runtime: number | null;
        memory: number | null;
        majorVersion: number | null;
        minorVersion: number | null;
        patchVersion: number | null;
        submitted: boolean;
    }) {
        const db = DatabaseProvider.getInstance();
        const existing = db.prepare(`SELECT id FROM solutions WHERE problem_id = ? ORDER BY id ASC LIMIT 1`).get(payload.problemId) as { id: number } | undefined;

        if (existing) {
            return db.prepare(`
                UPDATE solutions
                SET language = ?,
                    solution = ?,
                    runtime = ?,
                    memory = ?,
                    major_version = ?,
                    minor_version = ?,
                    patch_version = ?,
                    submitted = ?,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `).run(
                payload.language,
                payload.solution,
                payload.runtime,
                payload.memory,
                payload.majorVersion,
                payload.minorVersion,
                payload.patchVersion,
                payload.submitted ? 1 : 0,
                existing.id
            );
        }

        return this.createSolution(payload);
    }

    static createSolutionForProblem(payload: {
        problemId: number;
        language: string;
        solution: string;
        runtime: number | null;
        memory: number | null;
        majorVersion: number | null;
        minorVersion: number | null;
        patchVersion: number | null;
        submitted: boolean;
    }) {
        return this.saveSolution(payload);
    }

    static getSolutionsForProblem(problemId: number) {
        return DatabaseProvider.getInstance()
            .prepare(`
                SELECT *
                FROM solutions
                WHERE problem_id = ?
                ORDER BY created_at DESC, id DESC
            `)
            .all(problemId);
    }

    static getSolutionById(id: number) {
        return DatabaseProvider.getInstance()
            .prepare(`
                SELECT *
                FROM solutions
                WHERE id = ?
            `)
            .get(id);
    }

    static updateSolution(payload: {
        id: number;
        language: string;
        solution: string;
        runtime: number | null;
        memory: number | null;
        majorVersion: number | null;
        minorVersion: number | null;
        patchVersion: number | null;
        submitted: boolean;
    }) {
        return DatabaseProvider.getInstance()
            .prepare(`
                UPDATE solutions
                SET language = ?,
                    solution = ?,
                    runtime = ?,
                    memory = ?,
                    major_version = ?,
                    minor_version = ?,
                    patch_version = ?,
                    submitted = ?,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `)
            .run(
                payload.language,
                payload.solution,
                payload.runtime,
                payload.memory,
                payload.majorVersion,
                payload.minorVersion,
                payload.patchVersion,
                payload.submitted ? 1 : 0,
                payload.id
            );
    }

    static deleteSolution(id: number) {
        return DatabaseProvider.getInstance()
            .prepare(`DELETE FROM solutions WHERE id = ?`)
            .run(id);
    }

    static deleteProblem(id: number) {
        return DatabaseProvider.getInstance()
            .prepare(`DELETE FROM problems WHERE id = ?`)
            .run(id);
    }
}
