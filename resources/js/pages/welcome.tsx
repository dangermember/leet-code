import { PaginatedResponse } from '@/types/PaginatedResponse';
import { problem } from '@/types/problem';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Clock, Cpu } from 'lucide-react';

export default function Welcome() {
    const { props } = usePage();
    const problems:PaginatedResponse<problem> = props.problems as PaginatedResponse<problem>;
    const [open, setOpen] = useState(false);
    const [solution, setSolution] = useState('');

    function showSolution(text: string) {
        setSolution(text);
        setOpen(true);
    }

    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[800px] flex-col gap-4">
                        <h1 className="text-2xl font-semibold">Problems</h1>
                        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                            {problems?.data?.map((p: any) => (
                                <div key={p.id} className="rounded-lg border p-4 shadow-sm">
                                    <div className="mb-2 flex items-center justify-between">
                                        <div>
                                            <div className="text-sm text-muted-foreground">#{p.number}</div>
                                            <div className="text-lg font-medium">{p.title}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="flex items-center gap-2">
                                                <span title={p.runtime != null ? `Runtime: ${p.runtime} ms` : 'Runtime unknown'} className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-sm">
                                                    <Clock className="size-4" />{p.runtime != null ? `${p.runtime} ms` : '—'}
                                                </span>
                                                <span title={p.memory != null ? `Memory: ${p.memory} MB` : 'Memory unknown'} className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-sm">
                                                    <Cpu className="size-4" />{p.memory != null ? `${p.memory} MB` : '—'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <pre className="w-90 mb-2 text-sm text-gray-600 dark:text-gray-300 overflow-auto">{p.description}</pre>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => showSolution(p.solution)}
                                            className="rounded bg-gray-800 px-3 py-1 text-white hover:bg-gray-700"
                                        >
                                            Show solution
                                        </button>
                                        <a
                                            href={p.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded border px-3 py-1 text-sm hover:bg-gray-50"
                                        >
                                            Go to leet
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>

                <div className="hidden h-14.5 lg:block"></div>

                {open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="mx-4 max-w-2xl rounded bg-white p-6 dark:bg-gray-900">
                            <h2 className="mb-4 text-lg font-semibold">Solution</h2>
                            <pre className="whitespace-pre-wrap max-h-96 overflow-auto text-sm">{solution}</pre>
                            <div className="mt-4 text-right">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="rounded bg-gray-800 px-3 py-1 text-white hover:bg-gray-700"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
