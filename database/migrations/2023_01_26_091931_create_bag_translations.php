<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBagTranslations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bag_translations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('bag_id')->unsigned();
            $table->string('locale')->index();

            $table->string('title')->nullable();
            $table->text('text')->nullable();


            $table->unique(['bag_id','locale']);
            $table->foreign('bag_id')
                ->references('id')
                ->on('bags')
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
        Schema::dropIfExists('bag_translations');
    }
}
