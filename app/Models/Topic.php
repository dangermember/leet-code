<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;

    protected $table = 'topics';

    protected $fillable = [
        'name',
        'slug',
    ];

    public function problems()
    {
        return $this->belongsToMany(Problem::class, 'problem_topic', 'topic_id', 'problem_id');
    }
}
