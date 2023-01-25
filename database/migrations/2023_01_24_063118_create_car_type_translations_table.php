<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarTypeTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('car_type_translations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('car_type_id')->unsigned();
            $table->string('locale')->index();

            $table->string('title')->nullable();
            $table->text('description')->nullable();


            $table->unique(['car_type_id','locale']);
            $table->foreign('car_type_id')
                ->references('id')
                ->on('car_types')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('car_type_translations');
    }
}
