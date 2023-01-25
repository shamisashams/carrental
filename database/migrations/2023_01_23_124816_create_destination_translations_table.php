<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDestinationTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('destination_translations', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('destination_id')->unsigned();
            $table->string("locale")->index();

            $table->string("title")->nullable();
            $table->text("short_description")->nullable();
            $table->longText("description")->nullable();
            $table->string("meta_title")->nullable();
            $table->text("meta_description")->nullable();
            $table->string("meta_keyword")->nullable();

            $table->unique(['destination_id','locale']);
            $table->foreign('destination_id')
                ->references('id')
                ->on('destinations')
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
        Schema::dropIfExists('destination_translations');
    }
}
