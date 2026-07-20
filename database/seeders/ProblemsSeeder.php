<?php

namespace Database\Seeders;

use App\Models\Problem;
use Illuminate\Database\Seeder;

class ProblemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = database_path('data/problems.json');

        if (!file_exists($path)) {
            $this->command->warn('Problems JSON file not found at ' . $path);

            return;
        }

        $problems = json_decode(file_get_contents($path), true);

        foreach ($problems as $problemData) {
            $problem = Problem::create([
                'number' => $problemData['number'],
                'url' => $problemData['url'],
                'title' => $problemData['title'],
                'difficulty' => $problemData['difficulty'],
                'description' => $problemData['description'],
                'solution' => $problemData['solution'],
                'runtime' => $problemData['runtime'],
                'memory' => $problemData['memory'],
            ]);

            foreach ($problemData['topicNames'] ?? [] as $topicName) {
                $problem->topics()->firstOrCreate([
                    'name' => $topicName,
                ]);
            }
        }
    }
}
