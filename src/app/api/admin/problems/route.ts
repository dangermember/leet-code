import { NextRequest, NextResponse } from "next/server";
import { getCookieValue, verifySessionCookie } from "@/lib/admin-auth";
import { ProblemRepository } from "@/lib/problem.repository";
import { ProblemAdminRepository } from "@/lib/problem-admin.repository";

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

    const result = ProblemAdminRepository.createProblem({
        number: Number(body.number),
        url: body.url,
        title: body.title,
        description: body.description,
        difficulty: body.difficulty,
    });

    const problemId = Number(result.lastInsertRowid);

    ProblemAdminRepository.createSolution({
        problemId,
        language: body.language ?? "Python3",
        solution: body.solution ?? "",
        runtime: body.runtime ?? null,
        memory: body.memory ?? null,
        majorVersion: body.major_version ?? null,
        minorVersion: body.minor_version ?? null,
        patchVersion: body.patch_version ?? null,
        submitted: body.submitted ?? true,
    });

    if (body.topics) {
        const topicList = Array.isArray(body.topics)
            ? body.topics
            : String(body.topics).split(",").map(t => t.trim()).filter(Boolean);
        ProblemAdminRepository.syncTopics(problemId, topicList);
    }

    return NextResponse.json({ success: true, id: problemId });
}
