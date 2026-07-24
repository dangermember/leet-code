import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-auth";
import { ProblemRepository } from "@/lib/problem.repository";
import { ProblemAdminRepository } from "@/lib/problem-admin.repository";
import { deleteSolutionByIdAction } from "@/app/dashboard/actions";
import { Solution } from "@/types/Solution";
import { 
    ArrowLeft, 
    GitFork, 
    Plus, 
    Edit, 
    Trash2, 
    Cpu, 
    MemoryStick, 
    Code2, 
    CheckCircle2, 
    XCircle,
    Calendar
} from "lucide-react";

interface SolutionsPageProps {
    params: Promise<{ id: string }>;
}

export default async function SolutionsPage({ params }: Readonly<SolutionsPageProps>) {
    await requireAdminSession();

    const { id } = await params;
    const problemId = Number(id);

    if (isNaN(problemId)) {
        notFound();
    }

    const problem = ProblemRepository.getById(problemId);

    if (!problem) {
        notFound();
    }

    const solutions = (ProblemAdminRepository.getSolutionsForProblem(problemId) as Solution[]) ?? [];

    return (
        <div className="mx-auto max-w-5xl space-y-8">
            {/* Top Navigation */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                    <ArrowLeft className="size-4" />
                    Back to Dashboard
                </Link>

                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-sky-400">#{problem.number}</span>
                    <h2 className="text-sm font-semibold text-slate-200 truncate max-w-xs">{problem.title}</h2>
                </div>
            </div>

            {/* Page Header */}
            <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-3 text-sky-400">
                            <GitFork className="size-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Solutions Tree & Management</h1>
                            <p className="mt-1 text-sm text-slate-400">
                                Manage multiple solutions, languages, versions, and benchmarks for Problem #{problem.number}.
                            </p>
                        </div>
                    </div>
                </div>

                <Link
                    href={`/dashboard/problems/${problemId}/solutions/new`}
                    className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-sky-400 shrink-0"
                >
                    <Plus className="size-5" />
                    Add New Solution
                </Link>
            </div>

            {/* Solutions Tree List */}
            <div className="space-y-6">
                {solutions.length === 0 ? (
                    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-12 text-center shadow-xl">
                        <Code2 className="mx-auto size-12 text-slate-500" />
                        <h3 className="mt-4 text-xl font-semibold text-white">No solutions found</h3>
                        <p className="mt-2 text-slate-400">Add the first solution entry for this problem.</p>
                        <Link
                            href={`/dashboard/problems/${problemId}/solutions/new`}
                            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-sky-400"
                        >
                            <Plus className="size-5" />
                            Add Solution
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {solutions.map((sol, index) => (
                            <div
                                key={sol.id}
                                className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-xl backdrop-blur-xl"
                            >
                                {/* Solution Item Header */}
                                <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-slate-950/60 px-6 py-4 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center rounded-xl bg-sky-500/10 px-3.5 py-1.5 text-xs font-bold text-sky-400 border border-sky-500/30">
                                            {sol.language}
                                        </div>

                                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-mono text-slate-300">
                                            v{sol.major_version ?? 1}.{sol.minor_version ?? 0}.{sol.patch_version ?? 0}
                                        </span>

                                        {sol.submitted ? (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                                                <CheckCircle2 className="size-3.5" /> Submitted
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400">
                                                <XCircle className="size-3.5" /> Draft
                                            </span>
                                        )}
                                    </div>

                                    {/* Stats & Actions */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-4 text-xs">
                                            {sol.runtime != null && (
                                                <span className="inline-flex items-center gap-1.5 text-slate-300">
                                                    <Cpu className="size-3.5 text-sky-400" />
                                                    Runtime: <strong className="text-white">{sol.runtime}%</strong>
                                                </span>
                                            )}
                                            {sol.memory != null && (
                                                <span className="inline-flex items-center gap-1.5 text-slate-300">
                                                    <MemoryStick className="size-3.5 text-purple-400" />
                                                    Memory: <strong className="text-white">{sol.memory}%</strong>
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 pl-4 border-l border-white/10">
                                            <Link
                                                href={`/dashboard/problems/${problemId}/solutions/${sol.id}/edit`}
                                                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 transition"
                                            >
                                                <Edit className="size-3.5" /> Edit
                                            </Link>

                                            <form
                                                action={deleteSolutionByIdAction}
                                                onSubmit={(e) => {
                                                    if (!confirm("Are you sure you want to delete this solution?")) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                <input type="hidden" name="id" value={sol.id} />
                                                <input type="hidden" name="problem_id" value={problemId} />
                                                <button
                                                    type="submit"
                                                    className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition"
                                                >
                                                    <Trash2 className="size-3.5" /> Delete
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                {/* Code Body */}
                                <div className="p-6">
                                    <pre className="max-h-[400px] overflow-auto rounded-2xl border border-white/5 bg-slate-950 p-4 text-sm font-mono leading-relaxed text-slate-100 scrollbar-thin scrollbar-thumb-slate-700">
                                        <code>{sol.solution || "// Empty solution code"}</code>
                                    </pre>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
