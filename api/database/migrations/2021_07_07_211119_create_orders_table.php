<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->id();
            $table->string('detail_id');
            $table->integer('bussines_id')->unsigned();
            $table->string('id_employ_asigned');
            $table->string('client_id');
            $table->integer('total_price_order');
            $table->string('state');

            $table->timestamps();
        });

        // Schema::table('products', function($table)
        // {
        //     $table->foreign('bussines_id')
        //     ->references('id')->on('bussines')
        //     ->onDelete('cascade');

        //     $table->foreign('detail_id')
        //     ->references('id')->on('order_detail')
        //     ->onDelete('cascade');

        //     $table->foreign('id_employ_asigned')
        //     ->references('id')->on('users')
        //     ->onDelete('cascade');

        //     $table->foreign('client_id')
        //     ->references('id')->on('clients')
        //     ->onDelete('cascade');
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
