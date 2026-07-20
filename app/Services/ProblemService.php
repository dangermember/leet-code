<?php

namespace App\Services;

use App\Models\Problem;
use App\Models\Topic;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

abstract class ProblemService
{
    /**
     * List all problems
     *
     * @return Collection<int, Problem>
     */
    public static function getAll(): Collection
    {
        return Problem::get();
    }

    /**
     * List all problems paginated with size Pagesize
     *
     * @param  mixed  $pageSize
     * @return LengthAwarePaginator<int, Problem>
     */
    public static function getPageinated($pageSize = 10): LengthAwarePaginator
    {
        return Problem::latest()->paginate($pageSize);
    }

    /**
     * List all difficlties percentage in problems
     *
     * @return Collection<int, string>
     */
    public static function groupByDifficulty(): Collection
    {
        $total = Problem::count();

        return Problem::selectRaw("difficulty as label, COUNT(*)*100/{$total} as value")
            ->groupBy('difficulty')
            ->orderByDesc('value')
            ->orderBy('label')
            ->limit(6)
            ->get(['label', 'value']);
    }

    /**
     * List all topics percentage in problems
     *
     * @return Collection<int, string>
     */
    public static function groupByTopic(): Collection
    {
        $total = Problem::count();

        return Topic::selectRaw("topics.name as label, COUNT(problem_topic.problem_id)*100/{$total} as value")
            ->join('problem_topic', 'topics.id', '=', 'problem_topic.topic_id')
            ->groupBy('topics.name')
            ->orderByDesc('value')
            ->orderBy('label')
            ->limit(6)
            ->get(['label', 'value']);
    }

    /**
     * Get Average Runtime
     */
    public static function getAverageRuntime(): mixed
    {
        return Problem::where('runtime', '>', 0)->avg('runTime');
    }

    /**
     * Get Average Memory
     */
    public static function getAvgMemory(): mixed
    {
        return Problem::where('memory', '>', 0)->avg('memory');
    }
}
