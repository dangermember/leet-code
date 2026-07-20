<?php

use App\Services\ProblemService;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::get('/', function () {
    $problems = ProblemService::getPageinated(9);
    $difficulty = ProblemService::groupByDifficulty();
    $topics = ProblemService::groupByTopic();
    return Inertia::render('Welcome', [
        'problems' => $problems,
        'difficulty' => $difficulty,
        'topics' => $topics,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__ . '/settings.php';
