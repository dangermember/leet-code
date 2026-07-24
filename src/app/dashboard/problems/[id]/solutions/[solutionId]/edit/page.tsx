import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-auth";
import { ProblemRepository } from "@/lib/problem.repository";
import { ProblemAdminRepository } from "@/lib/problem-admin.repository";
import { updateSolutionByIdAction } from "@/app/dashboard/actions";
import { Solution } from "@/types/Solution";
import { ArrowLeft, Edit3 } from "lucide-react";

interface EditSolutionPageProps {
    params: Promise<{ id: string; solutionId: string }>;
}

export default async function EditSolutionPage({ params }: Readonly<EditSolutionPageProps>) {
    await requireAdminSession();

    const { id, solutionId } = await params;
    const problemId = Number(id);
    const solId = Number(solutionId);

    if (isNaN(problemId) || isNaN(solId)) {
        notFound();
    }

    const problem = ProblemRepository.getById(problemId);
    const solution = ProblemAdminRepository.getSolutionById(solId) as Solution | null;

    if (!problem || !solution) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            {/* Navigation */}
            <div className="flex items-center justify-between">
                <Link
                    href={`/dashboard/problems/${problemId}/solutions`}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                    <ArrowLeft className="size-4" />
                    Back to Solutions Tree
                </Link>
            </div>

            {/* Main Form */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl space-y-8">
                <div>
                    <div className="flex items-center gap-3">
                        <Edit3 className="size-6 text-sky-400" />
                        <h1 className="text-2xl font-bold text-white">
                            Edit Solution ({solution.language}) for Problem #{problem.number}
                        </h1>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">
                        Update code implementation, language, version numbers, or benchmark performance stats.
                    </p>
                </div>

                <form action={updateSolutionByIdAction} className="space-y-6">
                    <input type="hidden" name="id" value={solution.id} />
                    <input type="hidden" name="problem_id" value={problemId} />

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Language Selection */}
                        <div>
                            <label htmlFor="language" className="mb-1.5 block text-sm font-medium text-slate-200">
                                Programming Language
                            </label>
                            <select
                                id="language"
                                name="language"
                                defaultValue={solution.language}
                                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            >
                                <option value="Python3">Python3</option>
                                <option value="Python">Python</option>
                                <option value="C++">C++</option>
                                <option value="Java">Java</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="TypeScript">TypeScript</option>
                                <option value="Go">Go</option>
                                <option value="Rust">Rust</option>
                                <option value="C#">C#</option>
                                <option value="Swift">Swift</option>
                                <option value="Kotlin">Kotlin</option>
                            </select>
                        </div>

                        {/* Runtime & Memory Scores */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="runtime" className="mb-1.5 block text-sm font-medium text-slate-200">
                                    Runtime Score (%)
                                </label>
                                <input
                                    id="runtime"
                                    name="runtime"
                                    type="number"
                                    step="0.01"
                                    defaultValue={solution.runtime ?? ""}
                                    className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="memory" className="mb-1.5 block text-sm font-medium text-slate-200">
                                    Memory Score (%)
                                </label>
                                <input
                                    id="memory"
                                    name="memory"
                                    type="number"
                                    step="0.01"
                                    defaultValue={solution.memory ?? ""}
                                    className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                />
                            </div>
                        </div>

                        {/* Solution Code */}
                        <div className="md:col-span-2">
                            <label htmlFor="solution" className="mb-1.5 block text-sm font-medium text-slate-200">
                                Solution Code
                            </label>
                            <textarea
                                id="solution"
                                name="solution"
                                rows={10}
                                required
                                defaultValue={solution.solution}
                                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 font-mono text-sm text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            />
                        </div>

                        {/* Versioning */}
                        <div className="grid grid-cols-3 gap-4 md:col-span-2">
                            <div>
                                <label htmlFor="major_version" className="mb-1.5 block text-sm font-medium text-slate-200">
                                    Major Version
                                </label>
                                <input
                                    id="major_version"
                                    name="major_version"
                                    type="number"
                                    defaultValue={solution.major_version ?? 1}
                                    className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="minor_version" className="mb-1.5 block text-sm font-medium text-slate-200">
                                    Minor Version
                                </label>
                                <input
                                    id="minor_version"
                                    name="minor_version"
                                    type="number"
                                    defaultValue={solution.minor_version ?? 0}
                                    className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="patch_version" className="mb-1.5 block text-sm font-medium text-slate-200">
                                    Patch Version
                                </label>
                                <input
                                    id="patch_version"
                                    name="patch_version"
                                    type="number"
                                    defaultValue={solution.patch_version ?? 0}
                                    className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                />
                            </div>
                        </div>

                        {/* Submission Checkbox */}
                        <div className="flex items-center gap-3 md:col-span-2 pt-2">
                            <input
                                id="submitted"
                                name="submitted"
                                type="checkbox"
                                defaultChecked={Boolean(solution.submitted)}
                                className="size-5 rounded border-white/10 bg-slate-950 text-sky-500 focus:ring-sky-500"
                            />
                            <label htmlFor="submitted" className="text-sm font-medium text-slate-200 cursor-pointer">
                                Mark solution as submitted (visible to public)
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10">
                        <Link
                            href={`/dashboard/problems/${problemId}/solutions`}
                            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="rounded-2xl bg-sky-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-400"
                        >
                            Update Solution
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
