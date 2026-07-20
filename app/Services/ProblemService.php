<?php

namespace App\Services;

use App\Models\Problem;
use DB;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

abstract class ProblemService
{
    /**
     * @return EloquentCollection<int, Problem>
     */
    public static function getAll(): EloquentCollection
    {
        return Problem::all();
    }

    /**
     * @return LengthAwarePaginator<int, Problem>
     */
    public static function getPaginated(int $pageSize = 10): LengthAwarePaginator
    {
        return Problem::query()
            ->latest()
            ->paginate($pageSize);
    }

    
    /**
     * @return Collection<int, \stdClass>
     */
    public static function groupByDifficulty(): Collection
    {
        $total = max(Problem::count(), 1);

        return DB::table('problems')
            ->select('difficulty as label')
            ->selectRaw('COUNT(*) * 100 / ? as value', [$total])
            ->groupBy('difficulty')
            ->orderByDesc('value')
            ->orderBy('label')
            ->limit(6)
            ->get();
    }

    /**
     * @return Collection<int, \stdClass>
     */
    public static function groupByTopic(): Collection
    {
        $total = max(Problem::count(), 1);

        return DB::table('topics')
            ->select('topics.name as label')
            ->selectRaw('COUNT(problem_topic.problem_id) * 100 / ? as value', [$total])
            ->join('problem_topic', 'topics.id', '=', 'problem_topic.topic_id')
            ->groupBy('topics.name')
            ->orderByDesc('value')
            ->orderBy('label')
            ->limit(6)
            ->get();
    }

    public static function getAverageRuntime(): float
    {
        return (float) Problem::query()
            ->where('runtime', '>', 0)
            ->avg('runtime');
    }

    public static function getAvgMemory(): float
    {
        return (float) Problem::query()
            ->where('memory', '>', 0)
            ->avg('memory');
    }
}
