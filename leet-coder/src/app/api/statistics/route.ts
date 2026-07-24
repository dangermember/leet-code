import { NextRequest, NextResponse } from "next/server";
import { ProblemRepository } from "@/lib/problem.repository";

export async function GET(request: NextRequest) {

    return NextResponse.json({
        difficulty: ProblemRepository.groupByDifficulty(),
        topics: ProblemRepository.groupByTopic(),
        runtime: ProblemRepository.getAverageRuntime(),
        memory: ProblemRepository.getAverageMemory()
    });
}