import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import ProblemCard from '@/components/ProblemCard';
import SolutionModal from '@/components/SolutionModal';
import Footer from '@/components/Footer';
import { PaginatedResponse } from '@/types/PaginatedResponse';
import { problem } from '@/types/problem';

export default function Problems() {
    const { props } = usePage();
    const problems = props.problems as PaginatedResponse<problem>;
    const [open, setOpen] = useState(false);
    const [solution, setSolution] = useState('');
    const [runtimeVal, setRuntimeVal] = useState<number | null>(null);
    const [memoryVal, setMemoryVal] = useState<number | null>(null);
    const [activeTitle, setActiveTitle] = useState('');

    function showSolution(text: string, title: string, runtime?: number | null, memory?: number | null) {
        setSolution(text);
        setActiveTitle(title);
        setRuntimeVal(runtime ?? null);
        setMemoryVal(memory ?? null);
        setOpen(true);
    }

    return (
        <>
            <Head title="Problems" />
            <div className="min-h-screen bg-slate-950 text-white">
                <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-3xl font-semibold">Problems</h1>

                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {problems?.data?.map((p) => (
                            <ProblemCard key={p.id} problem={p} onShowSolution={showSolution} />
                        ))}
                    </div>

                    <div className="my-8 flex items-center justify-center">
                        <nav className="inline-flex items-center gap-2 rounded-md bg-slate-900/70 p-2">
                            {problems?.meta?.links?.map((link: any, idx: number) => (
                                <Link
                                    key={idx}
                                    href={link.url ?? '#'}
                                    className={`px-3 py-1 text-sm ${link.active ? 'bg-sky-500 text-slate-900 rounded' : 'text-slate-300'}`}
                                    as={link.url ? undefined : 'span'}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
                <Footer />

                <SolutionModal
                    open={open}
                    title={activeTitle}
                    solution={solution}
                    runtime={runtimeVal}
                    memory={memoryVal}
                    onClose={() => setOpen(false)}
                />
            </div>
        </>
    );
}
