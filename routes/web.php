<?php

use App\Services\ProblemService;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $problems = ProblemService::getPaginated(9);
    $difficulty = ProblemService::groupByDifficulty();
    $topics = ProblemService::groupByTopic();
    $avgRuntime = ProblemService::getAverageRuntime().' ms';
    $avgMemory = ProblemService::getAvgMemory().' MB';

    return Inertia::render('Welcome', [
        'problems' => [
            'data' => $problems->items(),
            'meta' => Arr::except($problems->toArray(), ['data']),
        ],
        'difficulty' => $difficulty,
        'topics' => $topics,
        'avgRuntime' => $avgRuntime,
        'avgMemory' => $avgMemory,
    ]);
})->name('home');

Route::get('/problems', function () {
    $problems = ProblemService::getPaginated(9);

    return Inertia::render('Problems', [
        'problems' => [
            'data' => $problems->items(),
            'meta' => Arr::except($problems->toArray(), ['data']),
        ],
    ]);
})->name('problems');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
