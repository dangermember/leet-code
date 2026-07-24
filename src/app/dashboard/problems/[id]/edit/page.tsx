import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-auth";
import { ProblemRepository } from "@/lib/problem.repository";
import { updateProblemAction } from "@/app/dashboard/actions";
import TopicTagInput from "@/components/TopicTagInput";
import { ArrowLeft, Edit3 } from "lucide-react";

interface EditProblemPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditProblemPage({ params }: Readonly<EditProblemPageProps>) {
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

    const existingTopics = ProblemRepository.getAllTopics().map((t) => t.name);
    const initialTopics = problem.topics?.map((t) => t.name) ?? [];
    const primarySolution = problem.solutions?.[0];

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            {/* Top Bar Navigation */}
            <div className="flex items-center justify-between">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                    <ArrowLeft className="size-4" />
                    Back to Dashboard
                </Link>
            </div>

            {/* Main Form Container */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl space-y-8">
                <div>
                    <div className="flex items-center gap-3">
                        <Edit3 className="size-6 text-sky-400" />
                        <h1 className="text-2xl font-bold text-white">
                            Edit Problem #{problem.number}: {problem.title}
                        </h1>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">
                        Update problem metadata, topic tags, and solution details.
                    </p>
                </div>

                <form action={updateProblemAction} className="space-y-6">
                    <input type="hidden" name="id" value={problem.id} />

                    {/* Problem Info Grid */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="number" className="mb-1.5 block text-sm font-medium text-slate-200">
                                Problem Number
                            </label>
                            <input
                                id="number"
                                name="number"
                                type="number"
                                required
                                defaultValue={problem.number}
                                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="url" className="mb-1.5 block text-sm font-medium text-slate-200">
                                LeetCode URL
                            </label>
                            <input
                                id="url"
                                name="url"
                                type="url"
                                required
                                defaultValue={problem.url}
                                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-slate-200">
                                Problem Title
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                defaultValue={problem.title}
                                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="difficulty" className="mb-1.5 block text-sm font-medium text-slate-200">
                                Difficulty Level
                            </label>
                            <select
                                id="difficulty"
                                name="difficulty"
                                defaultValue={problem.difficulty}
                                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>

                        {/* Topics Tag Input */}
                        <div className="md:col-span-2">
                            <TopicTagInput
                                id="topics"
                                name="topics"
                                label="Topics (Tag Input with Autocomplete, separate with comma)"
                                initialTopics={initialTopics}
                                existingTopics={existingTopics}
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-slate-200">
                                Problem Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                defaultValue={problem.description}
                                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            />
                        </div>
                    </div>

                    {/* Solution Details Section */}
                    <div className="pt-6 border-t border-white/10 space-y-6">
                        <h2 className="text-lg font-semibold text-white">Solution Details</h2>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="language" className="mb-1.5 block text-sm font-medium text-slate-200">
                                    Programming Language
                                </label>
                                <select
                                    id="language"
                                    name="language"
                                    defaultValue={primarySolution?.language ?? "Python3"}
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
                                        defaultValue={primarySolution?.runtime ?? ""}
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
                                        defaultValue={primarySolution?.memory ?? ""}
                                        className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="solution" className="mb-1.5 block text-sm font-medium text-slate-200">
                                    Solution Code
                                </label>
                                <textarea
                                    id="solution"
                                    name="solution"
                                    rows={8}
                                    defaultValue={primarySolution?.solution ?? ""}
                                    className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 font-mono text-sm text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                />
                            </div>

                            {/* Version Specs */}
                            <div className="grid grid-cols-3 gap-4 md:col-span-2">
                                <div>
                                    <label htmlFor="major_version" className="mb-1.5 block text-sm font-medium text-slate-200">
                                        Major Version
                                    </label>
                                    <input
                                        id="major_version"
                                        name="major_version"
                                        type="number"
                                        defaultValue={primarySolution?.major_version ?? 1}
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
                                        defaultValue={primarySolution?.minor_version ?? 0}
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
                                        defaultValue={primarySolution?.patch_version ?? 0}
                                        className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10">
                        <Link
                            href="/dashboard"
                            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="rounded-2xl bg-sky-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-400"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
