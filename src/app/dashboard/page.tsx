import { requireAdminSession } from "@/lib/admin-auth";
import { ProblemRepository } from "@/lib/problem.repository";
import { logoutAction } from "./actions";
import ProblemMasterDetail from "@/components/ProblemMasterDetail";

export default async function DashboardPage() {
    await requireAdminSession();

    const problems = ProblemRepository.getAll();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm tracking-[0.18em] text-slate-400 uppercase">Admin dashboard</p>
                    <h1 className="mt-2 text-3xl font-semibold text-white">Manage problems</h1>
                </div>
                <form action={logoutAction}>
                    <button
                        type="submit"
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                        Logout
                    </button>
                </form>
            </div>

            {/* Master-Details view for problems and solutions */}
            <ProblemMasterDetail problems={problems} />
        </div>
    );
}
