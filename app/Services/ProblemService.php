<?php

namespace App\Services;

use App\Models\Problem;

abstract class ProblemService
{
    public static function getAll()
    {
        return Problem::get();
    }
    public static function getPageinated($pageSize = 10)
    {
        return Problem::latest()->paginate($pageSize);
    }
    public static function groupByDifficulty()
    {
        $total = Problem::count();
        return Problem::selectRaw("difficulty as label, COUNT(*)*100/{$total} as value")
            ->groupBy('difficulty')
            ->get();
    }
}
