import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCookieValue, verifySessionCookie } from "@/lib/admin-auth";

function requireAuth(request: NextRequest) {
    const cookieHeader = request.headers.get("cookie");
    const sessionCookie = getCookieValue(cookieHeader, "leet-dashboard-session");

    if (!verifySessionCookie(sessionCookie)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return null;
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const protectedResponse = requireAuth(request);
    if (protectedResponse) {
        return protectedResponse;
    }

    const { id } = await params;
    const body = await request.json();

    const updateProblem = db.prepare(`
        UPDATE problems
        SET number = @number,
            url = @url,
            title = @title,
            description = @description,
            difficulty = @difficulty,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = @id
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
            submitted,
            created_at,
            updated_at
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
            @submitted,
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP
        )
    `);

    updateProblem.run({
        id: Number(id),
        number: Number(body.number),
        url: body.url,
        title: body.title,
        description: body.description,
        difficulty: body.difficulty,
    });

    insertSolution.run({
        problem_id: Number(id),
        language: body.language ?? "Python3",
        solution: body.solution ?? "",
        runtime: body.runtime ?? null,
        memory: body.memory ?? null,
        major_version: body.major_version ?? null,
        minor_version: body.minor_version ?? null,
        patch_version: body.patch_version ?? null,
        submitted: body.submitted ?? true,
    });

    return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const protectedResponse = requireAuth(request);
    if (protectedResponse) {
        return protectedResponse;
    }

    const { id } = await params;
    const deleteProblem = db.prepare(`DELETE FROM problems WHERE id = @id`);
    deleteProblem.run({ id: Number(id) });

    return NextResponse.json({ success: true });
}
