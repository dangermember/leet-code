<?php

namespace App\Services;

use App\Models\Problem;
use Illuminate\Support\Facades\DB;

abstract class ProblemService
{
    /**
     * List all problems
     * @return \Illuminate\Database\Eloquent\Collection<int, Problem>|\Illuminate\Support\Collection<int, \stdClass>
     */
    public static function getAll()
    {
        return Problem::get();
    }

    /**
     * List all problems paginated with size Pagesize
     * @param mixed $pageSize
     * @return \Illuminate\Pagination\LengthAwarePaginator<int, Problem>
     */
    public static function getPageinated($pageSize = 10)
    {
        return Problem::latest()->paginate($pageSize);
    }

    /**
     * List all difficlties percentage in problems
     * @return \Illuminate\Database\Eloquent\Collection<int, Problem>|\Illuminate\Support\Collection<int, \stdClass>
     */
    public static function groupByDifficulty()
    {
        $total = Problem::count();
        return Problem::selectRaw("difficulty as label, COUNT(*)*100/{$total} as value")
            ->groupBy('difficulty')
            ->get();
    }

    /**
     * List all topics percentage in problems
     * @return \Illuminate\Database\Eloquent\Collection<int, string>
     */
    public static function groupByTopic()
    {
        $total = Problem::count();

        return DB::table('topics')
            ->selectRaw("topics.name as label, COUNT(problem_topic.problem_id)*100/{$total} as value")
            ->join('problem_topic', 'topics.id', '=', 'problem_topic.topic_id')
            ->groupBy('topics.name')
            ->orderByDesc('value')
            ->orderBy('label')
            ->limit(6)
            ->get();
    }
    
}
