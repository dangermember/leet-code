interface StatisticsProps {
    title: string;
    subtitle: string;
    value: string;
}

export default function Statistics({
    title,
    subtitle,
    value,
}: StatisticsProps) {
    return (
        <div className="rounded-3xl bg-slate-950/80 p-6 text-slate-200 ring-1 ring-white/5">
            <p className="text-xs tracking-[0.18em] text-slate-400 uppercase">
                {title}
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
            <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
        </div>
    );
}
