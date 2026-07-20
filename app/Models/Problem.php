<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Problem extends Model
{
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

    /**
     * @return BelongsToMany<Topic, $this>
     */
    public function topics(): BelongsToMany
    {
        return $this->belongsToMany(Topic::class, 'problem_topic', 'problem_id', 'topic_id');
    }
}
