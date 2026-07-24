import { Problem } from '@/types/Problem';
import ProblemCard from './ProblemCard';

interface AchievementCardsProps {
    problems: Problem[];
}

export default function AchievementCards({
    problems,
}: Readonly<AchievementCardsProps>) {
    return (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {problems.map((problem) => (
                <ProblemCard
                    key={problem.id}
                    problem={problem}
                />
            ))}
        </div>
    );
}
