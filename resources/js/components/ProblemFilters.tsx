interface ProblemFiltersProps {
    totalSolved: number;
}

export default function ProblemFilters({ totalSolved }: ProblemFiltersProps) {
    return (
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-slate-200">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Problem filters</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950/70 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Solved count</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{totalSolved}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/70 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Difficulty</p>
                    <p className="mt-2 text-2xl font-semibold text-white">All levels</p>
                </div>
            </div>
        </div>
    );
}
