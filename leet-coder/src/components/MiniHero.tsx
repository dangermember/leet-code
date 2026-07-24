import { Sparkles } from 'lucide-react';

interface HeroProps {
    totalSolved: number;
    avgRuntime: number;
    avgMemory: number;
}

export default function MiniHero({
    totalSolved,
    avgRuntime,
    avgMemory,
}: Readonly<HeroProps>) {
    return (
        <div className="text-slate-200">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
                    <p className="text-sm tracking-[0.18em] text-slate-400 uppercase">
                        Problems solved
                    </p>
                    <p className="mt-1 text-l ps-5 font-semibold text-white">
                        {totalSolved}
                    </p>
                </div>
                <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
                    <p className="text-sm tracking-[0.18em] text-slate-400 uppercase">
                        Average runtime score
                    </p>
                    <p className="mt-1 text-l ps-5 font-semibold text-white">
                        {avgRuntime} %
                    </p>
                </div>
                <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
                    <p className="text-xs tracking-[0.18em] text-slate-400 uppercase">
                        Average memory score
                    </p>
                    <p className="mt-1 text-l ps-5 font-semibold text-white">
                        {avgMemory} %
                    </p>
                </div>
            </div>
        </div>
    );
}
