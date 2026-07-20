<?php

namespace App\Http\Controllers;

use App\Models\Problem;

class ProblemsController extends Controller
{
    public function index()
    {
        return Problem::orderBy('number')->paginate(15);
    }

    public function show(Problem $problem)
    {
        return $problem;
    }
}
