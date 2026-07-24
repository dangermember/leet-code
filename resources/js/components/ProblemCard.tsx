import { Clock, Cpu } from 'lucide-react';
import type { problem } from '@/types/problem';

interface ProblemCardProps {
    problem: problem;
    onShowSolution: (
        solution: string,
        title: string,
        runtime?: number | null,
        memory?: number | null,
    ) => void;
}

export default function ProblemCard({
    problem,
    onShowSolution,
}: Readonly<ProblemCardProps>) {
    return (
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-sky-500/30 hover:bg-slate-900">
            <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold tracking-[0.18em] text-sky-300 uppercase">
                        #{problem.number}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                        {problem.title}
                    </h3>
                </div>
                <div className="space-y-2 text-right text-sm text-slate-400">
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-800/70 px-3 py-1">
                        <Clock className="size-4" />
                        {problem.runtime != null
                            ? `${problem.runtime} ms`
                            : 'N/A'}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-800/70 px-3 py-1">
                        <Cpu className="size-4" />
                        {problem.memory != null
                            ? `${problem.memory}`
                            : '—'}
                    </span>
                </div>
            </div>
            <p className="mb-6 line-clamp-4 min-h-[5rem] text-sm leading-6 text-slate-300">
                {problem.description}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                    type="button"
                    onClick={() =>
                        onShowSolution(
                            problem.solution,
                            problem.title,
                            problem.runtime,
                            problem.memory,
                        )
                    }
                    className="inline-flex w-full items-center justify-center rounded-3xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 sm:w-auto"
                >
                    Show solution
                </button>
                <a
                    href={problem.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                >
                    Go to leet
                </a>
            </div>
        </div>
    );
}
