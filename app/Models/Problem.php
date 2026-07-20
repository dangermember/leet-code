<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Problem extends Model
{
    use HasFactory;

    protected $table = 'problems';

    protected $fillable = [
        'number',
        'url',
        'title',
        'description',
        'solution',
        'runtime',
        'memory',
        'difficulty',
    ];

    protected $casts = [
        'number' => 'integer',
    ];
}
