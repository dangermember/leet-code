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
        return this.createSolution(payload);
    }

    static deleteProblem(id: number) {
        return DatabaseProvider.getInstance()
            .prepare(`DELETE FROM problems WHERE id = ?`)
            .run(id);
    }
}
