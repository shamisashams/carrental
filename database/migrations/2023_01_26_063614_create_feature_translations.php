<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFeatureTranslations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('feature_translations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('feature_id')->unsigned();
            $table->string('locale')->index();

            $table->string('title')->nullable();
            $table->text('text')->nullable();


            $table->unique(['feature_id','locale']);
            $table->foreign('feature_id')
                ->references('id')
                ->on('features')
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
        Schema::dropIfExists('feature_translations');
    }
}
