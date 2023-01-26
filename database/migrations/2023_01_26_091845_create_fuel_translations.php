<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFuelTranslations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fuel_translations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('fuel_id')->unsigned();
            $table->string('locale')->index();

            $table->string('title')->nullable();
            $table->text('text')->nullable();


            $table->unique(['fuel_id','locale']);
            $table->foreign('fuel_id')
                ->references('id')
                ->on('fuels')
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
        Schema::dropIfExists('fuel_translations');
    }
}
