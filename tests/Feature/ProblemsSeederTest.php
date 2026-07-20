<?php

use App\Models\Problem;
use Database\Seeders\ProblemsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('the problems seeder loads problems from the json data file', function () {
    $this->seed(ProblemsSeeder::class);

    $problem = Problem::where('number', 1260)->first();

    expect($problem)->not->toBeNull()
        ->and($problem->title)->toBe('Shift 2D Grid')
        ->and($problem->difficulty)->toBe('Easy')
        ->and($problem->topics->pluck('name')->all())->toContain('Array', 'Simulation');
});
