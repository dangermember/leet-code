<?php

use App\Services\ProblemService;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::get('/', function () {
    $problems = ProblemService::getPageinated(10);
    $difficulty = ProblemService::groupByDifficulty();
    return Inertia::render('Welcome', [
        'problems' => $problems,
        'difficulty' => $difficulty,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__ . '/settings.php';
