import AchievementCards from "@/components/AchievementCards";
import DifficultyChart from "@/components/DifficultyChart";
import Hero from "@/components/Hero";
import TopicChart from "@/components/TopicChart";
import { ChartSegment } from "@/types/ChartSegment";
import { PaginatedResult } from "@/types/PaginatedResult";
import { Problem } from "@/types/Problem";

export default async function Home() {
  const problemsResponse = await fetch(`${process.env.APP_URL}/api/problems`, {

  });
  const problems: PaginatedResult<Problem> = await problemsResponse.json();
  const totalSolved = 0;//problems?.meta?.total ?? 0;
  const difficulty = [{
    "label": "Easy",
    "value": 100
  }] as ChartSegment[];//problems.difficulty as ChartSegment[];
  const topics = [{
    "label": "Easy",
    "value": 100
  }] as ChartSegment[];//problems.topics as ChartSegment[];
  const avgRuntime = "0ms";//problems.avgRuntime as string;
  const avgMemory = "0mb";//problems.avgMemory as string;

  return <div className="min-h-screen bg-slate-950 text-white">
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Hero
        totalSolved={totalSolved}
        avgRuntime={avgRuntime}
        avgMemory={avgMemory}
      />
      <div className="my-10 grid gap-6 lg:grid-cols-2">
        <DifficultyChart segments={difficulty} />
        <TopicChart segments={topics} />
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
