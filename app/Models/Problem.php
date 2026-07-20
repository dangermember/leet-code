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

    public function topics()
    {
        return $this->belongsToMany(Topic::class, 'problem_topic', 'problem_id', 'topic_id');
    }
}
