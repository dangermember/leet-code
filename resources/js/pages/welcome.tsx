import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Hero from '@/components/Hero';
import AchievementCards from '@/components/AchievementCards';
import DifficultyChart from '@/components/DifficultyChart';
import TopicChart from '@/components/TopicChart';
import ProblemFilters from '@/components/ProblemFilters';
import SolutionModal from '@/components/SolutionModal';
import Footer from '@/components/Footer';
import { PaginatedResponse } from '@/types/PaginatedResponse';
import { problem } from '@/types/problem';
import { ChartSegment } from '@/types/ChartSegment';

export default function Welcome() {
    const { props } = usePage();
    const problems = props.problems as PaginatedResponse<problem>;
    const difficulty = props.difficulty as ChartSegment[];
    const [open, setOpen] = useState(false);
    const [solution, setSolution] = useState('');
    const [runtimeVal, setRuntimeVal] = useState<number | null>(null);
    const [memoryVal, setMemoryVal] = useState<number | null>(null);
    const [activeTitle, setActiveTitle] = useState('');

    const totalSolved = problems?.meta?.total ?? problems?.data?.length ?? 0;
    const runtimeProblems = problems?.data?.filter((p) => p.runtime != null) ?? [];
    const memoryProblems = problems?.data?.filter((p) => p.memory != null) ?? [];

    const avgRuntime = runtimeProblems.length
        ? `${Math.round(runtimeProblems.reduce((sum, p) => sum + (p.runtime ?? 0), 0) / runtimeProblems.length)} ms`
        : '—';
    const avgMemory = memoryProblems.length
        ? `${Math.round(memoryProblems.reduce((sum, p) => sum + (p.memory ?? 0), 0) / memoryProblems.length)} MB`
        : '—';

    function showSolution(text: string, title: string, runtime?: number | null, memory?: number | null) {
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
                    <Hero totalSolved={totalSolved} avgRuntime={avgRuntime} avgMemory={avgMemory} />
                    <div className="my-10 grid gap-6 lg:grid-cols-2">
                        <DifficultyChart segments={difficulty} />
                        <TopicChart />
                    </div>

                    <div className="my-10">
                        <div className="my-6">
                            <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Solved problems</p>
                                        <h2 className="mt-2 text-3xl font-semibold text-white">Recent highlights</h2>
                                    </div>
                                    <p className="text-sm text-slate-500">My latest submissions and performance metrics.</p>
                                </div>
                                <aside className="my-6">
                                    <ProblemFilters totalSolved={totalSolved} />
                                </aside>
                                <AchievementCards problems={problems?.data ?? []} onShowSolution={showSolution} />
                            </section>

                        </div>

                    </div>
                </div>
                <Footer />

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
