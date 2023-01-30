<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateBookingsAddExtra extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('bookings', function (Blueprint $table) {

            $table->after('dropoff_date',function ($table){
                $table->boolean('same_address')->default(1);
                $table->string('period')->nullable();
                $table->string('locale')->nullable();
                $table->string('payment_method')->default('bank')->nullable();
                $table->string('payment_type')->nullable();
            });


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
        Schema::table('bookings', function (Blueprint $table) {


            $table->dropColumn('same_address');
            $table->dropColumn('period');
            $table->dropColumn('locale');
            $table->dropColumn('payment_method');
            $table->dropColumn('payment_type');



        });
    }
}
