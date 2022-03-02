<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'client_name',
        "client_lastName",
        'bussines_id',
        'client_phone_number',
        "client_addres"
    ];
}
