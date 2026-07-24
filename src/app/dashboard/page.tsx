import { requireAdminSession } from "@/lib/admin-auth";
import { ProblemRepository } from "@/lib/problem.repository";
import { createProblemAction, deleteProblemAction, logoutAction, updateProblemAction } from "./actions";

export default async function DashboardPage() {
    await requireAdminSession();

    const problems = ProblemRepository.getAll();

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm tracking-[0.18em] text-slate-400 uppercase">Admin dashboard</p>
                    <h1 className="mt-2 text-3xl font-semibold text-white">Manage problems</h1>
                </div>
                <form action={logoutAction}>
                    <button type="submit" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white">Logout</button>
                </form>
            </div>

            <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                <h2 className="text-xl font-semibold text-white">Create problem</h2>
                <form action={createProblemAction} className="mt-6 grid gap-4 md:grid-cols-2">
                    <input name="number" type="number" placeholder="Number" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
                    <input name="url" placeholder="LeetCode URL" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
                    <input name="title" placeholder="Title" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
                    <select name="difficulty" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white">
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    <textarea name="description" placeholder="Description" rows={4} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white md:col-span-2" />
                    <textarea name="solution" placeholder="Solution" rows={6} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white md:col-span-2" />
                    <input name="runtime" type="number" step="0.01" placeholder="Runtime" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
                    <input name="memory" type="number" step="0.01" placeholder="Memory" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
                    <input name="major_version" type="number" placeholder="Major version" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
                    <input name="minor_version" type="number" placeholder="Minor version" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
                    <input name="patch_version" type="number" placeholder="Patch version" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
                    <div className="md:col-span-2">
                        <button type="submit" className="rounded-2xl bg-sky-500 px-5 py-3 font-semibold text-slate-950">Create problem</button>
                    </div>
                </form>
            </section>

            <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                <h2 className="text-xl font-semibold text-white">Existing problems</h2>
                <div className="mt-6 space-y-4">
                    {problems.map((problem) => (
                        <div key={problem.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-sky-300">#{problem.number}</p>
                                    <h3 className="text-lg font-semibold text-white">{problem.title}</h3>
                                </div>
                                <div className="flex gap-2">
                                    <form action={deleteProblemAction}>
                                        <input type="hidden" name="id" value={problem.id} />
                                        <button type="submit" className="rounded-2xl border border-rose-500/40 px-3 py-2 text-sm text-rose-300">Delete</button>
                                    </form>
                                </div>
                            </div>

                            <form action={updateProblemAction} className="mt-4 grid gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 md:grid-cols-2">
                                <input type="hidden" name="id" value={problem.id} />
                                <input name="number" defaultValue={problem.number} type="number" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
                                <input name="url" defaultValue={problem.url} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
                                <input name="title" defaultValue={problem.title} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
                                <select name="difficulty" defaultValue={problem.difficulty} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white">
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                                <textarea name="description" defaultValue={problem.description} rows={4} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white md:col-span-2" />
                                <textarea name="solution" defaultValue={problem.solutions?.[0]?.solution ?? ""} rows={6} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white md:col-span-2" />
                                <input name="runtime" defaultValue={problem.solutions?.[0]?.runtime ?? ""} type="number" step="0.01" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
                                <input name="memory" defaultValue={problem.solutions?.[0]?.memory ?? ""} type="number" step="0.01" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
                                <input name="major_version" defaultValue={problem.solutions?.[0]?.major_version ?? ""} type="number" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
                                <input name="minor_version" defaultValue={problem.solutions?.[0]?.minor_version ?? ""} type="number" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
                                <input name="patch_version" defaultValue={problem.solutions?.[0]?.patch_version ?? ""} type="number" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
                                <div className="md:col-span-2">
                                    <button type="submit" className="rounded-2xl bg-sky-500 px-4 py-2 font-semibold text-slate-950">Save changes</button>
                                </div>
                            </form>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
