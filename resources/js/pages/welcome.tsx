import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AchievementCards from '@/components/AchievementCards';
import DifficultyChart from '@/components/DifficultyChart';
import Hero from '@/components/Hero';
import SolutionModal from '@/components/SolutionModal';
import TopicChart from '@/components/TopicChart';
import type { ChartSegment } from '@/types/ChartSegment';
import type { PaginatedResponse } from '@/types/PaginatedResponse';
import type { problem } from '@/types/problem';

export default function Welcome() {
    const { props } = usePage();
    const problems = props.problems as PaginatedResponse<problem>;
    const totalSolved = problems?.meta?.total ?? 0;
    const difficulty = props.difficulty as ChartSegment[];
    const topics = props.topics as ChartSegment[];
    const avgRuntime = props.avgRuntime as string;
    const avgMemory = props.avgMemory as string;
    const [open, setOpen] = useState(false);
    const [solution, setSolution] = useState('');
    const [runtimeVal, setRuntimeVal] = useState<number | null>(null);
    const [memoryVal, setMemoryVal] = useState<number | null>(null);
    const [activeTitle, setActiveTitle] = useState('');

    function showSolution(
        text: string,
        title: string,
        runtime?: number | null,
        memory?: number | null,
    ) {
        setSolution(text);
        setActiveTitle(title);
        setRuntimeVal(runtime ?? null);
        setMemoryVal(memory ?? null);
        setOpen(true);
    }

    return (
        <>
            <Head title="LeetCode Achievements" />
            <div className="min-h-screen bg-slate-950 text-white">
                <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                    <Hero
                        totalSolved={totalSolved}
                        avgRuntime={avgRuntime}
                        avgMemory={avgMemory}
                    />
                    <div className="my-10 grid gap-6 lg:grid-cols-2">
                        <DifficultyChart segments={difficulty} />
                        <TopicChart segments={topics} />
                    </div>

                    <div className="my-10">
                        <div className="my-6">
                            <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm tracking-[0.18em] text-slate-400 uppercase">
                                            Solved problems
                                        </p>
                                        <h2 className="mt-2 text-3xl font-semibold text-white">
                                            Recent highlights
                                        </h2>
                                    </div>
                                    <p className="text-sm text-slate-500">
                                        My latest submissions and performance
                                        metrics.
                                    </p>
                                </div>
                                <AchievementCards
                                    problems={problems?.data ?? []}
                                    onShowSolution={showSolution}
                                />
                            </section>
                        </div>
                    </div>
                </div>

                <SolutionModal
                    open={open}
                    title={activeTitle}
                    solution={solution}
                    runtime={runtimeVal}
                    memory={memoryVal}
                    onClose={() => setOpen(false)}
                />
            </div>
        </>
    );
}
