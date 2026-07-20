<?php

namespace Database\Seeders;

use App\Models\Problem;
use App\Models\Topic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Topic::truncate();
        Problem::truncate();
        (new ProblemsSeeder)->run();
    }
}
