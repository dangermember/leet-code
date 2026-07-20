<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Topic extends Model
{
    protected $table = 'topics';

    protected $fillable = [
        'name',
        'slug',
    ];

    /**
     * @return BelongsToMany<Problem, $this, Pivot, 'pivot'>
     */
    public function problems(): BelongsToMany
    {
        return $this->belongsToMany(Problem::class, 'problem_topic', 'topic_id', 'problem_id');
    }
}
