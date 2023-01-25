<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateCarsAddCarTypeId extends Migration
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

            $table->after('model',function ($table){
                $table->bigInteger('car_type_id')->nullable();

            });
            $table->index('car_type_id');

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

            $table->dropIndex('cars_car_type_id_index');
            $table->dropColumn('car_type_id');

        });
    }
}
