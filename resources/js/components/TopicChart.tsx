interface TopicData {
    topic: string;
    value: number;
}

interface TopicChartProps {
    topics?: TopicData[];
}

const defaultTopics: TopicData[] = [
    { topic: 'Arrays', value: 32 },
    { topic: 'Graphs', value: 18 },
    { topic: 'Dynamic Programming', value: 25 },
    { topic: 'Strings', value: 15 },
    { topic: 'Trees', value: 10 },
];

export default function TopicChart({ topics = defaultTopics }: TopicChartProps) {
    return (
        <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-slate-200 ring-1 ring-white/5">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Topic insight</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">Popular tags</h3>
                </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
                {topics.map((topic) => (
                    <div key={topic.topic} className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/10">
                        <p className="text-sm text-slate-400">{topic.topic}</p>
                        <p className="mt-3 text-2xl font-semibold text-white">{topic.value}%</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
