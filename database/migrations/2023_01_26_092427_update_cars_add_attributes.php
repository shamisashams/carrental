<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateCarsAddAttributes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('cars', function (Blueprint $table) {


            $table->bigInteger('transmission_id')->unsigned()->index()->nullable();
            $table->bigInteger('fuel_id')->unsigned()->index()->nullable();
            $table->bigInteger('bag_id')->unsigned()->index()->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('cars', function (Blueprint $table) {


            $table->dropColumn('transmission_id');
            $table->dropColumn('fuel_id');
            $table->dropColumn('bag_id');

        });
    }
}
