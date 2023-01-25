<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->boolean('status')->default(0);
            $table->year('year')->nullable();
            $table->string('url_path')->nullable();
            $table->decimal('price')->nullable();
            $table->decimal('special_price')->nullable();
            $table->integer('seat')->nullable();
            $table->integer('door')->nullable();
            $table->boolean('air_conditioning')->nullable();
            $table->bigInteger('brand_id')->nullable()->index();
            $table->string('transmission')->default('manual');
            $table->string('fuel')->nullable();
            $table->string('model')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cars');
    }
}
