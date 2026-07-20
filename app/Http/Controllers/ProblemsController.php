<?php

namespace App\Http\Controllers;

use App\Models\Problem;
use App\Services\ProblemService;

class ProblemsController extends Controller
{
    public function index()
    {
        return ProblemService::getPageinated(15);
    }

    public function show(Problem $problem)
    {
        return $problem;
    }
}
