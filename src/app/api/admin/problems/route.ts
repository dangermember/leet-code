import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCookieValue, verifySessionCookie } from "@/lib/admin-auth";
import { ProblemRepository } from "@/lib/problem.repository";

function requireAuth(request: NextRequest) {
    const cookieHeader = request.headers.get("cookie");
    const sessionCookie = getCookieValue(cookieHeader, "leet-dashboard-session");

    if (!verifySessionCookie(sessionCookie)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return null;
}

export async function GET(request: NextRequest) {
    const protectedResponse = requireAuth(request);
    if (protectedResponse) {
        return protectedResponse;
    }

    return NextResponse.json(ProblemRepository.getAll());
}

export async function POST(request: NextRequest) {
    const protectedResponse = requireAuth(request);
    if (protectedResponse) {
        return protectedResponse;
    }

    const body = await request.json();
    const insertProblem = db.prepare(`
        INSERT INTO problems (number, url, title, description, difficulty)
        VALUES (@number, @url, @title, @description, @difficulty)
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

    const result = insertProblem.run({
        number: Number(body.number),
        url: body.url,
        title: body.title,
        description: body.description,
        difficulty: body.difficulty,
    });

    const problemId = Number(result.lastInsertRowid);

    insertSolution.run({
        problem_id: problemId,
        language: body.language ?? "Python3",
        solution: body.solution ?? "",
        runtime: body.runtime ?? null,
        memory: body.memory ?? null,
        major_version: body.major_version ?? null,
        minor_version: body.minor_version ?? null,
        patch_version: body.patch_version ?? null,
        submitted: body.submitted ?? true,
    });

    return NextResponse.json({ success: true, id: problemId });
}
