<?php

use App\Http\Controllers\ProblemsController;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::get('/', function () {
    $problems = (new ProblemsController())->index();
    return Inertia::render('welcome', [
        'problems' => $problems,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__ . '/settings.php';
