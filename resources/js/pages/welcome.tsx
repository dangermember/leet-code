import { PaginatedResponse } from '@/types/PaginatedResponse';
import { problem } from '@/types/problem';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Clock, Cpu, Sparkles, Trophy } from 'lucide-react';

export default function Welcome() {
    const { props } = usePage();
    const problems: PaginatedResponse<problem> = props.problems as PaginatedResponse<problem>;
    const [open, setOpen] = useState(false);
    const [solution, setSolution] = useState('');
    const [runtimeVal, setRuntimeVal] = useState<number | null>(null);
    const [memoryVal, setMemoryVal] = useState<number | null>(null);
    const [activeTitle, setActiveTitle] = useState('');

    const totalSolved = problems?.meta?.total ?? problems?.data?.length ?? 0;
    const averageRuntime = problems?.data?.filter((p) => p.runtime != null).reduce((sum, p) => sum + (p.runtime ?? 0), 0);
    const avgRuntimeLabel = problems?.data?.filter((p) => p.runtime != null).length
        ? `${Math.round(averageRuntime / problems.data.filter((p) => p.runtime != null).length)} ms`
        : '—';
    const averageMemory = problems?.data?.filter((p) => p.memory != null).reduce((sum, p) => sum + (p.memory ?? 0), 0);
    const avgMemoryLabel = problems?.data?.filter((p) => p.memory != null).length
        ? `${Math.round(averageMemory / problems.data.filter((p) => p.memory != null).length)} MB`
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
                    <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
                        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
                            <div>
                                <p className="mb-3 inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
                                    <Sparkles className="mr-2 h-4 w-4" /> LeetCode Achievements
                                </p>
                                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">My LeetCode portfolio</h1>
                                <p className="mt-4 max-w-xl text-slate-300 sm:text-lg">
                                    A curated showcase of solved problems with runtime and memory metrics, ready to share with recruiters, team leads, or any coding challenge audience.
                                </p>
                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                                        <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Problems solved</p>
                                        <p className="mt-2 text-3xl font-semibold text-white">{totalSolved}</p>
                                    </div>
                                    <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                                        <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Average runtime</p>
                                        <p className="mt-2 text-3xl font-semibold text-white">{avgRuntimeLabel}</p>
                                        <p className="mt-1 text-sm text-slate-400">Based on problems with runtime data</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl bg-slate-950/80 p-6 text-slate-200 ring-1 ring-white/5">
                                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Performance summary</p>
                                <div className="mt-6 grid gap-4">
                                    <div className="rounded-3xl bg-slate-900/80 p-4 ring-1 ring-white/10">
                                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Average memory</p>
                                        <p className="mt-2 text-2xl font-semibold text-white">{avgMemoryLabel}</p>
                                    </div>
                                    <div className="rounded-3xl bg-slate-900/80 p-4 ring-1 ring-white/10">
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Best benchmark</p>
                                                <p className="mt-2 text-lg font-semibold text-white">Fastest runtime & smallest footprint</p>
                                            </div>
                                            <Trophy className="h-6 w-6 text-amber-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mt-10">
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Solved problems</p>
                                <h2 className="text-3xl font-semibold text-white">Recent highlights</h2>
                            </div>
                            <div className="text-sm text-slate-500">My latest submissions and performance metrics.</div>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {problems?.data?.map((p: any) => (
                                <article key={p.id} className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-sky-500/30 hover:bg-slate-900">
                                    <div className="mb-4 flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">#{p.number}</p>
                                            <h3 className="mt-2 text-xl font-semibold text-white">{p.title}</h3>
                                        </div>
                                        <div className="space-y-2 text-right text-sm text-slate-400">
                                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-800/70 px-3 py-1">
                                                <Clock className="size-4" />
                                                {p.runtime != null ? `${p.runtime} ms` : 'N/A'}
                                            </span>
                                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-800/70 px-3 py-1">
                                                <Cpu className="size-4" />
                                                {p.memory != null ? `${p.memory} MB` : 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="mb-6 min-h-[5rem] text-sm leading-6 text-slate-300 line-clamp-4">{p.description}</p>
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <button
                                            type="button"
                                            onClick={() => showSolution(p.solution, p.title, p.runtime, p.memory)}
                                            className="inline-flex w-full items-center justify-center rounded-3xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 sm:w-auto"
                                        >
                                            Show solution
                                        </button>
                                        <a
                                            href={p.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex w-full items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                                        >
                                            Go to leet
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>

                {open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm">
                        <div className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-slate-950/40">
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Solution details</p>
                                    <h2 className="mt-2 text-2xl font-semibold text-white">{activeTitle || 'Solution'}</h2>
                                </div>
                                <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                                    <span title={runtimeVal != null ? `Runtime: ${runtimeVal} ms` : 'Runtime unknown'} className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2">
                                        <Clock className="size-4" /> {runtimeVal != null ? `${runtimeVal} ms` : '—'}
                                    </span>
                                    <span title={memoryVal != null ? `Memory: ${memoryVal} MB` : 'Memory unknown'} className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2">
                                        <Cpu className="size-4" /> {memoryVal != null ? `${memoryVal} MB` : '—'}
                                    </span>
                                </div>
                            </div>
                            <pre className="max-h-[60vh] overflow-auto rounded-3xl bg-slate-900/80 p-5 text-sm leading-6 text-slate-100">{solution}</pre>
                            <div className="mt-6 text-right">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="rounded-3xl bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
