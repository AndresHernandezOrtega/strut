<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_details', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->id();
            $table->string('product_id');
            $table->string('order_id');
            $table->integer('amount');
            $table->integer('bussines_id')->unsigned();

            $table->timestamps();
        });
        
        // Schema::table('order_detail', function($table)
        // {
        //     $table->foreign('bussines_id')
        //     ->references('id')->on('bussines')
        //     ->onDelete('cascade');
    
        //     $table->foreign('order_id')
        //     ->references('id')->on('order')
        //     ->onDelete('cascade');
    
        //     $table->foreign('product_id')
        //     ->references('id')->on('products')
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
        Schema::dropIfExists('order_detail');
    }
}
