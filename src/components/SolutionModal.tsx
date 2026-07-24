'use client'
import { Problem } from '@/types/Problem';
import { ChevronDown, Cpu, MemoryStick } from 'lucide-react';
import { useState } from 'react';

interface SolutionModalProps {
    problem: Problem,
    runtime: number,
    memory: number
}

export default function SolutionModal({
    problem,
    runtime,
    memory
}: Readonly<SolutionModalProps>) {
    const [open, setOpen] = useState(false);
    return <>
        <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex w-full items-center justify-center rounded-3xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 sm:w-auto"
        >
            Show solution
        </button>
        {open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm">
            <div className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-slate-950/40">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm tracking-[0.18em] text-slate-400 uppercase">
                            Solution details
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-white">
                            {problem.title || 'Solution'}
                        </h2>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                        <span title='runtime score'
                            className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2"
                        >
                            <Cpu className="size-4" />
                            {runtime != null ? `${runtime} %` : '—'}
                        </span>
                        <span
                            title='memory score'
                            className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2"
                        >
                            <MemoryStick className="size-4" />
                            {memory != null ? `${memory} %` : '—'}
                        </span>
                    </div>
                </div>
                <div className="max-h-[70vh] space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
                    {problem.solutions.map((solution) => (
                        <details
                            key={solution.id}
                            className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60 group"
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between border-b border-slate-800 bg-slate-900/60 px-5 py-3 hover:bg-slate-900">
                                <div className="flex items-center gap-3">
                                    <span className="rounded-md bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
                                        {solution.language}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 text-xs text-slate-400">
                                    {solution.runtime !== null && (
                                        <span className="flex gap-2" title="Runtime score">
                                            <Cpu className="size-4" />
                                            {solution.runtime}%
                                        </span>
                                    )}

                                    {solution.memory !== null && (
                                        <span className="flex gap-2" title="Memory score">
                                            <MemoryStick className="size-4" />
                                            {solution.memory}%
                                        </span>
                                    )}

                                    <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                                </div>
                            </summary>

                            <pre className="max-h-[60vh] overflow-auto bg-slate-950 p-5 text-sm leading-7 text-slate-100 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
                                <code>
                                    {solution.solution ||
                                        "No solutions available for this problem yet."}
                                </code>
                            </pre>
                        </details>
                    ))}
                </div>
                <div className="mt-6 text-right">
                    <button
                        onClick={() => setOpen(false)}
                        className="rounded-3xl bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>}
    </>;
}
