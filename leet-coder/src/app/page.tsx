import AchievementCards from "@/components/AchievementCards";
import DifficultyChart from "@/components/DifficultyChart";
import Hero from "@/components/Hero";
import TopicChart from "@/components/TopicChart";
import { PaginatedResult } from "@/types/PaginatedResult";
import { Problem } from "@/types/Problem";
import { Statistics } from "@/types/Statistics";

export default async function Home() {
  const problemsResponse = await fetch(`${process.env.APP_URL}/api/problems`, {

  });
  const problems: PaginatedResult<Problem> = await problemsResponse.json();
  const totalSolved = problems?.meta?.total ?? 0;

  const statisticsResponse = await fetch(`${process.env.APP_URL}/api/statistics`);
  const statistics: Statistics = await statisticsResponse.json();

  return <div className="min-h-screen bg-slate-950 text-white">
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Hero
        totalSolved={totalSolved}
        avgRuntime={statistics.runtime}
        avgMemory={statistics.memory}
      />
      <div className="my-10 grid gap-6 lg:grid-cols-2">
        <DifficultyChart segments={statistics.difficulty} />
        <TopicChart segments={statistics.topics} />
      </div>

      <div className="my-10">
        <div className="my-6">
          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm tracking-[0.18em] text-slate-400 uppercase">
                  Solved problems
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-white">
                  Recent highlights
                </h2>
              </div>
              <p className="text-sm text-slate-500">
                My latest submissions and performance
                metrics.
              </p>
            </div>
            <AchievementCards problems={problems?.data ?? []} />
          </section>
        </div>
      </div>
    </div>
  </div>;
}
