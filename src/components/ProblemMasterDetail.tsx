"use client";

import { useState } from "react";
import Link from "next/link";
import { Problem } from "@/types/Problem";
import { Solution } from "@/types/Solution";
import { deleteProblemAction } from "@/app/dashboard/actions";
import { 
    Search, 
    ExternalLink, 
    Edit, 
    Trash2, 
    Cpu, 
    MemoryStick, 
    Code2, 
    Plus, 
    FileCode, 
    Layers,
    Tag,
    Check,
    Copy
} from "lucide-react";

interface ProblemMasterDetailProps {
    problems: Problem[];
}

export default function ProblemMasterDetail({ problems }: Readonly<ProblemMasterDetailProps>) {
    const [selectedProblemId, setSelectedProblemId] = useState<number>(
        problems.length > 0 ? problems[0].id : 0
    );
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedSolutionIndex, setSelectedSolutionIndex] = useState<number>(0);
    const [copied, setCopied] = useState<boolean>(false);

    // Filter problems by search query
    const filteredProblems = problems.filter((problem) => {
        const query = searchQuery.toLowerCase();
        const matchesTitle = problem.title.toLowerCase().includes(query);
        const matchesNumber = problem.number.toString().includes(query);
        const matchesTopic = problem.topics?.some((t) => t.name.toLowerCase().includes(query));
        return matchesTitle || matchesNumber || matchesTopic;
    });

    // Find currently selected problem
    const selectedProblem = problems.find((p) => p.id === selectedProblemId) ?? filteredProblems[0] ?? problems[0];

    const getDifficultyBadge = (difficulty: string) => {
        switch (difficulty) {
            case "Easy":
                return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
            case "Medium":
                return "bg-amber-500/10 text-amber-400 border-amber-500/30";
            case "Hard":
                return "bg-rose-500/10 text-rose-400 border-rose-500/30";
            default:
                return "bg-slate-500/10 text-slate-400 border-slate-500/30";
        }
    };

    const copySolutionCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (problems.length === 0) {
        return (
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-12 text-center shadow-xl backdrop-blur-xl">
                <FileCode className="mx-auto size-12 text-slate-500" />
                <h3 className="mt-4 text-xl font-semibold text-white">No problems found</h3>
                <p className="mt-2 text-slate-400">Get started by creating your first LeetCode problem entry.</p>
                <Link
                    href="/dashboard/problems/new"
                    className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-sky-400"
                >
                    <Plus className="size-5" />
                    Create First Problem
                </Link>
            </div>
        );
    }

    const currentSolution: Solution | undefined = selectedProblem?.solutions?.[selectedSolutionIndex] ?? selectedProblem?.solutions?.[0];

    return (
        <div className="grid gap-6 lg:grid-cols-12">
            {/* Master Panel - Left Side */}
            <div className="flex flex-col rounded-3xl border border-white/10 bg-slate-900/80 shadow-xl backdrop-blur-xl lg:col-span-4 xl:col-span-4">
                <div className="border-b border-white/10 p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Layers className="size-5 text-sky-400" />
                            <h2 className="text-lg font-semibold text-white">Problems ({filteredProblems.length})</h2>
                        </div>
                        <Link
                            href="/dashboard/problems/new"
                            className="inline-flex items-center gap-1.5 rounded-xl bg-sky-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-sky-400"
                        >
                            <Plus className="size-4" />
                            Add Problem
                        </Link>
                    </div>

                    {/* Filter Input with Label */}
                    <div>
                        <label htmlFor="problem-search" className="mb-1.5 block text-xs font-medium text-slate-400">
                            Filter problems
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                            <input
                                id="problem-search"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by number, title, or topic..."
                                className="w-full rounded-2xl border border-white/10 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Master Problem List */}
                <div className="max-h-[700px] overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-slate-700">
                    {filteredProblems.length === 0 ? (
                        <p className="p-4 text-center text-sm text-slate-400">No matching problems found.</p>
                    ) : (
                        filteredProblems.map((problem) => {
                            const isSelected = problem.id === selectedProblem.id;
                            const solCount = problem.solutions?.length ?? 0;

                            return (
                                <button
                                    key={problem.id}
                                    type="button"
                                    onClick={() => {
                                        setSelectedProblemId(problem.id);
                                        setSelectedSolutionIndex(0);
                                    }}
                                    className={`w-full rounded-2xl p-4 text-left transition ${
                                        isSelected
                                            ? "border border-sky-500/50 bg-sky-500/10 shadow-lg shadow-sky-500/5"
                                            : "border border-white/5 bg-slate-950/40 hover:border-white/20 hover:bg-slate-950/80"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <span className="text-xs font-bold text-sky-400">#{problem.number}</span>
                                        <span
                                            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${getDifficultyBadge(
                                                problem.difficulty
                                            )}`}
                                        >
                                            {problem.difficulty}
                                        </span>
                                    </div>
                                    <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-white">{problem.title}</h3>

                                    <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                                        <span className="inline-flex items-center gap-1">
                                            <Code2 className="size-3.5 text-slate-400" />
                                            {solCount} {solCount === 1 ? "solution" : "solutions"}
                                        </span>
                                        {problem.topics && problem.topics.length > 0 && (
                                            <span className="truncate max-w-[120px] text-[11px] text-slate-400">
                                                {problem.topics.map((t) => t.name).join(", ")}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Detail Panel - Right Side */}
            <div className="flex flex-col rounded-3xl border border-white/10 bg-slate-900/80 shadow-xl backdrop-blur-xl lg:col-span-8 xl:col-span-8">
                {selectedProblem ? (
                    <div className="p-6 space-y-6">
                        {/* Header & Actions */}
                        <div className="flex flex-col gap-4 pb-6 border-b border-white/10 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-sm font-bold text-sky-400">#{selectedProblem.number}</span>
                                    <span
                                        className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${getDifficultyBadge(
                                            selectedProblem.difficulty
                                        )}`}
                                    >
                                        {selectedProblem.difficulty}
                                    </span>
                                    {selectedProblem.url && (
                                        <a
                                            href={selectedProblem.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-sky-400"
                                        >
                                            LeetCode <ExternalLink className="size-3" />
                                        </a>
                                    )}
                                </div>
                                <h1 className="mt-2 text-2xl font-bold text-white">{selectedProblem.title}</h1>

                                {/* Topics */}
                                {selectedProblem.topics && selectedProblem.topics.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {selectedProblem.topics.map((t) => (
                                            <span
                                                key={t.id}
                                                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-slate-950 px-3 py-1 text-xs text-slate-300"
                                            >
                                                <Tag className="size-3 text-sky-400" />
                                                {t.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 shrink-0">
                                <Link
                                    href={`/dashboard/problems/${selectedProblem.id}/edit`}
                                    className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
                                >
                                    <Edit className="size-4" />
                                    Edit
                                </Link>
                                <form
                                    action={deleteProblemAction}
                                    onSubmit={(e) => {
                                        if (!confirm(`Are you sure you want to delete "${selectedProblem.title}"?`)) {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    <input type="hidden" name="id" value={selectedProblem.id} />
                                    <button
                                        type="submit"
                                        className="inline-flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/20"
                                    >
                                        <Trash2 className="size-4" />
                                        Delete
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Description Section */}
                        {selectedProblem.description && (
                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">Description</h3>
                                <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">
                                    {selectedProblem.description}
                                </div>
                            </div>
                        )}

                        {/* Solutions Section (Master Details View for Solutions) */}
                        <div className="space-y-4 pt-4 border-t border-white/10">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Solutions & Submissions</h3>
                                    <p className="text-xs text-slate-400">Master-detail view of solution code and performance statistics</p>
                                </div>
                            </div>

                            {selectedProblem.solutions && selectedProblem.solutions.length > 0 ? (
                                <div className="space-y-4">
                                    {/* Solutions Selector / Tabs if multiple */}
                                    {selectedProblem.solutions.length > 1 && (
                                        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
                                            {selectedProblem.solutions.map((sol, index) => (
                                                <button
                                                    key={sol.id}
                                                    type="button"
                                                    onClick={() => setSelectedSolutionIndex(index)}
                                                    className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                                                        selectedSolutionIndex === index
                                                            ? "bg-sky-500 text-slate-950"
                                                            : "bg-slate-950 text-slate-300 hover:bg-slate-800"
                                                    }`}
                                                >
                                                    {sol.language} {sol.major_version != null ? `v${sol.major_version}.${sol.minor_version ?? 0}` : ""}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {currentSolution && (
                                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
                                            {/* Solution Sub-Header */}
                                            <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-slate-900/90 px-5 py-3 gap-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="rounded-lg bg-sky-500/10 px-3 py-1 text-xs font-bold text-sky-400 border border-sky-500/20">
                                                        {currentSolution.language}
                                                    </span>
                                                    {(currentSolution.major_version != null || currentSolution.minor_version != null) && (
                                                        <span className="text-xs text-slate-400 font-mono">
                                                            v{currentSolution.major_version ?? 1}.{currentSolution.minor_version ?? 0}.{currentSolution.patch_version ?? 0}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-4 text-xs">
                                                    {currentSolution.runtime != null && (
                                                        <span className="inline-flex items-center gap-1.5 text-slate-300">
                                                            <Cpu className="size-3.5 text-sky-400" />
                                                            Runtime: <strong className="text-white">{currentSolution.runtime}%</strong>
                                                        </span>
                                                    )}
                                                    {currentSolution.memory != null && (
                                                        <span className="inline-flex items-center gap-1.5 text-slate-300">
                                                            <MemoryStick className="size-3.5 text-purple-400" />
                                                            Memory: <strong className="text-white">{currentSolution.memory}%</strong>
                                                        </span>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => copySolutionCode(currentSolution.solution)}
                                                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-800 px-3 py-1 text-xs text-slate-300 hover:bg-slate-700 hover:text-white"
                                                    >
                                                        {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                                                        {copied ? "Copied" : "Copy"}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Code Block */}
                                            <pre className="max-h-[500px] overflow-auto p-5 text-sm font-mono leading-relaxed text-slate-100 scrollbar-thin scrollbar-thumb-slate-700">
                                                <code>{currentSolution.solution || "// No code available"}</code>
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center">
                                    <p className="text-sm text-slate-400">No solution added for this problem yet.</p>
                                    <Link
                                        href={`/dashboard/problems/${selectedProblem.id}/edit`}
                                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:underline"
                                    >
                                        <Plus className="size-3.5" /> Add Solution
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="p-12 text-center text-slate-400">Select a problem from the list to view details and solutions.</div>
                )}
            </div>
        </div>
    );
}
