import { Sparkles } from 'lucide-react';

interface HeroProps {
    totalSolved: number;
    avgRuntime: string;
    avgMemory: string;
}

export default function Hero({ totalSolved, avgRuntime, avgMemory }: Readonly<HeroProps>) {
    return (
        <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <div className="grid gap-8 lg:items-center">
                <div>
                    <p className="mb-3 inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
                        <Sparkles className="mr-2 h-4 w-4" /> LeetCode Achievements
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">My LeetCode portfolio</h1>
                    <p className="mt-4 text-slate-300 sm:text-lg">
                        Showcasing algorithmic excellence through optimized solutions, performance benchmarks, and technical insights that highlight real-world problem-solving ability.
                    </p>
                </div>

                <div className="rounded-3xl bg-slate-950/80 p-6 text-slate-200 ring-1 ring-white/5">
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Performance summary</p>
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Problems solved</p>
                            <p className="mt-2 text-3xl font-semibold text-white">{totalSolved}</p>
                        </div>
                        <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Average runtime</p>
                            <p className="mt-2 text-3xl font-semibold text-white">{avgRuntime}</p>
                        </div>
                        <div className="rounded-3xl bg-slate-900/80 p-4 ring-1 ring-white/10">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Average memory</p>
                            <p className="mt-2 text-2xl font-semibold text-white">{avgMemory}</p>
                        </div>
                        {/* <div className="rounded-3xl bg-slate-900/80 p-4 ring-1 ring-white/10">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Best benchmark</p>
                                    <p className="mt-2 text-lg font-semibold text-white">Fastest runtime & smallest footprint</p>
                                </div>
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-300/15 text-amber-300">
                                    <Sparkles className="h-5 w-5" />
                                </span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
