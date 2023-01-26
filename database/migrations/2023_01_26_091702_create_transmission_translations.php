<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransmissionTranslations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transmission_translations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('transmission_id')->unsigned();
            $table->string('locale')->index();

            $table->string('title')->nullable();
            $table->text('text')->nullable();


            $table->unique(['transmission_id','locale']);
            $table->foreign('transmission_id')
                ->references('id')
                ->on('transmissions')
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
        Schema::dropIfExists('transmission_translations');
    }
}
