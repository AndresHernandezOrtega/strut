<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order_detail extends Model
{
    protected $fillable = [
        'product_id',
        "order_id",
        'amount',
        "bussines_id"
    ];
}
