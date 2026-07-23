import { Problem } from '@/types/Problem';
import ProblemCard from './ProblemCard';

interface AchievementCardsProps {
    problems: Problem[];
    onShowSolution: (
        solution: string,
        title: string,
        runtime?: number | null,
        memory?: number | null,
    ) => void;
}

export default function AchievementCards({
    problems,
    onShowSolution,
}: Readonly<AchievementCardsProps>) {
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
