<?php

namespace Database\Seeders;

use App\Models\Problem;
use Illuminate\Database\Seeder;

class ProblemsSeeder1260 extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Problem::truncate();
        Problem::create([
            "number" => 1260,
            "url" => "https://leetcode.com/problems/shift-2d-grid/description/",
            "title" => "Shift 2D Grid",
            "difficulty" => "Easy",
            "description" => <<<'EOD'
Given a 2D grid of size m x n and an integer k. You need to shift the grid k times.

In one shift operation:

Element at grid[i][j] moves to grid[i][j + 1].
Element at grid[i][n - 1] moves to grid[i + 1][0].
Element at grid[m - 1][n - 1] moves to grid[0][0].
Return the 2D grid after applying shift operation k times.
EOD,
            "solution" => <<<'EOD'
<?php
class Solution {
    public function shiftGrid($grid, $k) {
        $m = count($grid);
        $n = count($grid[0]);
        $total = $m * $n;
        $output = array_fill(0, $m, array_fill(0, $n, 0));
        for($i = 0;$i < $m;$i++)
        {
            for($j = 0;$j < $n;$j++)
            {
                $newPositionFixed = ($i * $n + $j + $k) % $total;
                $output[intDiv($newPositionFixed, $n)][$newPositionFixed % $n] = $grid[$i][$j];
            }
        }
        return $output;
    }
}
EOD,
            "runtime" => "3",
            "memory" => "20.7",
        ]);
    }
}
