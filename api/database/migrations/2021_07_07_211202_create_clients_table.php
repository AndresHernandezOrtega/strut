<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->id();
            $table->string('client_name');
            $table->string('client_lastName');
            $table->integer('bussines_id')->unsigned();
            $table->string('client_phone_number', 15);
            $table->integer('client_addres');

            $table->timestamps();

        });

        // Schema::table('clients', function($table)
        // {
        //     $table->foreign('bussines_id')
        //     ->references('id')->on('bussines')
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
        Schema::dropIfExists('clients');
    }
}
