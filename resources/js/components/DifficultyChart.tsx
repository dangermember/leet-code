interface ChartSegment {
    label: string;
    value: number;
    color: string;
}

interface DifficultyChartProps {
    segments?: ChartSegment[];
}

const defaultData: ChartSegment[] = [
    { label: 'Easy', value: 46, color: 'bg-emerald-500' },
    { label: 'Medium', value: 34, color: 'bg-sky-500' },
    { label: 'Hard', value: 20, color: 'bg-violet-500' },
];

export default function DifficultyChart({ segments = defaultData }: Readonly<DifficultyChartProps>) {
    return (
        <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-slate-200 ring-1 ring-white/5">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Difficulty distribution</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">Solved by difficulty</h3>
                </div>
            </div>
            <div className="space-y-4">
                {segments.map((segment) => (
                    <div key={segment.label} className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-slate-300">
                            <span>{segment.label}</span>
                            <span>{segment.value}%</span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                            <div className={`${segment.color} h-full`} style={{ width: `${segment.value}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
