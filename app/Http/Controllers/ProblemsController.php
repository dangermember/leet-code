<?php

namespace App\Http\Controllers;

use App\Models\Problem;
use App\Services\ProblemService;
use Illuminate\Pagination\LengthAwarePaginator;

class ProblemsController extends Controller
{
    /**
     * List all problems paginated with size Pagesize
     *
     * @return LengthAwarePaginator<int, Problem>
     */
    public function index(): LengthAwarePaginator
    {
        return ProblemService::getPageinated(15);
    }

    /**
     * Show problem by id
     */
    public function show(Problem $problem): Problem
    {
        return $problem;
    }
}
