<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'detail_id',
        "bussines_id",
        'id_employ_asigned',
        'client_id',
        "total_price_order"
    ];
}
