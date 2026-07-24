import { NextRequest, NextResponse } from "next/server";
import { ProblemRepository } from "@/lib/problem.repository";
import { Difficulty } from "@/types/Difficulty";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const page = Number(searchParams.get("page") ?? "1");
    const perPage = Number(searchParams.get("perPage") ?? "20");
    const difficulty = searchParams.get("difficulty") ?? undefined;
    const topic = searchParams.get("topic") ?? undefined;
    const search = searchParams.get("search") ?? undefined;

    const result = ProblemRepository.paginate({
        page,
        perPage,
        difficulty: difficulty as Difficulty | undefined,
        topic,
        search,
    });

    return NextResponse.json(result);
}