<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('problem_topic', function (Blueprint $table) {
            $table->unsignedBigInteger('problem_id');
            $table->unsignedBigInteger('topic_id');
            $table->primary(['problem_id', 'topic_id']);

            $table->foreign('problem_id')->references('id')->on('problems')->onDelete('cascade');
            $table->foreign('topic_id')->references('id')->on('topics')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('problem_topic');
    }
};
