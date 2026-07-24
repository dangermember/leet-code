import AchievementCards from "@/components/AchievementCards";
import MiniHero from "@/components/MiniHero";
import { PaginatedResult } from "@/types/PaginatedResult";
import { Problem } from "@/types/Problem";
import { Statistics } from "@/types/Statistics";

export default async function Problems() {
  const problemsResponse = await fetch(`${process.env.APP_URL}/api/problems`);
  const problems: PaginatedResult<Problem> = await problemsResponse.json();
  const totalSolved = problems?.meta?.total ?? 0;
  const statisticsResponse = await fetch(`${process.env.APP_URL}/api/statistics`);
  const statistics: Statistics = await statisticsResponse.json();

  return <div className="min-h-screen bg-slate-950 text-white">
    <div className="mx-auto max-w-6xl px-4">
      <MiniHero
        totalSolved={totalSolved}
        avgRuntime={statistics.runtime}
        avgMemory={statistics.memory}
      />
      <div className="my-6">
        <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                Solved problems
              </h2>
            </div>
          </div>
          <AchievementCards problems={problems?.data ?? []} />
        </section>
      </div>
    </div>
  </div>;
}
