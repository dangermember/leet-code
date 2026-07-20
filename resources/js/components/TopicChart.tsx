import { ChartSegment } from "@/types/ChartSegment";

interface TopicChartProps {
    segments?: ChartSegment[];
}

export default function TopicChart({ segments }: Readonly<TopicChartProps>) {
    return (
        <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-slate-200 ring-1 ring-white/5">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Topic insight</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">Popular tags</h3>
                </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
                {segments?.map((topic) => (
                    <div key={topic.label} className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/10">
                        <p className="text-sm text-slate-400">{topic.label}</p>
                        <p className="mt-3 text-xl font-semibold text-white">{topic.value}%</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
