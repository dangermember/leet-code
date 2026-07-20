import ProblemCard from '@/components/ProblemCard';
import type { problem } from '@/types/problem';

interface AchievementCardsProps {
    problems: problem[];
    onShowSolution: (solution: string, title: string, runtime?: number | null, memory?: number | null) => void;
}

export default function AchievementCards({ problems, onShowSolution }: Readonly<AchievementCardsProps>) {
    return (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {problems.map((problem) => (
                <ProblemCard
                    key={problem.id}
                    problem={problem}
                    onShowSolution={onShowSolution}
                />
            ))}
        </div>
    );
}
