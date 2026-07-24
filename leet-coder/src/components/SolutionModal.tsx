import { Clock, Cpu } from 'lucide-react';

interface SolutionModalProps {
    open: boolean;
    title: string;
    solution: string;
    runtime?: number | null;
    memory?: number | null;
    onClose: () => void;
}

export default function SolutionModal({
    open,
    title,
    solution,
    runtime,
    memory,
    onClose,
}: Readonly<SolutionModalProps>) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm">
            <div className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-slate-950/40">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm tracking-[0.18em] text-slate-400 uppercase">
                            Solution details
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-white">
                            {title || 'Solution'}
                        </h2>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                        <span
                            title={
                                runtime != null
                                    ? `Runtime: ${runtime} %`
                                    : '—'
                            }
                            className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2"
                        >
                            <Clock className="size-4" />
                            {runtime != null ? `${runtime} %` : '—'}
                        </span>
                        <span
                            title={
                                memory != null
                                    ? `Memory: ${memory} %`
                                    : '—'
                            }
                            className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2"
                        >
                            <Cpu className="size-4" />
                            {memory != null ? `${memory} %` : '—'}
                        </span>
                    </div>
                </div>
                <pre className="max-h-[60vh] overflow-auto rounded-3xl bg-slate-900/80 p-5 text-sm leading-6 text-slate-100">
                    {solution}
                </pre>
                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="rounded-3xl bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
