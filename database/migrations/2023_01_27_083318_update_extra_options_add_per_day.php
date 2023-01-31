<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateExtraOptionsAddPerDay extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('extra_options', function (Blueprint $table) {

            $table->boolean('price_per_day')->default(0)->after('special_price');

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
        Schema::table('extra_options', function (Blueprint $table) {

            $table->dropColumn('price_per_day');

        });
    }
}
