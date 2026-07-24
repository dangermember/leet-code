import { NextRequest, NextResponse } from "next/server";
import { getCookieValue, verifySessionCookie } from "@/lib/admin-auth";
import { ProblemAdminRepository } from "@/lib/problem-admin.repository";

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

    ProblemAdminRepository.updateProblem({
        id: Number(id),
        number: Number(body.number),
        url: body.url,
        title: body.title,
        description: body.description,
        difficulty: body.difficulty,
    });

    ProblemAdminRepository.createSolutionForProblem({
        problemId: Number(id),
        language: body.language ?? "Python3",
        solution: body.solution ?? "",
        runtime: body.runtime ?? null,
        memory: body.memory ?? null,
        majorVersion: body.major_version ?? null,
        minorVersion: body.minor_version ?? null,
        patchVersion: body.patch_version ?? null,
        submitted: body.submitted ?? true,
    });

    if (body.topics !== undefined) {
        const topicList = Array.isArray(body.topics)
            ? body.topics
            : String(body.topics).split(",").map(t => t.trim()).filter(Boolean);
        ProblemAdminRepository.syncTopics(Number(id), topicList);
    }

    return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const protectedResponse = requireAuth(request);
    if (protectedResponse) {
        return protectedResponse;
    }

    const { id } = await params;
    ProblemAdminRepository.deleteProblem(Number(id));

    return NextResponse.json({ success: true });
}
