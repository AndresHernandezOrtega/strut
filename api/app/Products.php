<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    protected $fillable = [
        'product_supplier_id',
        "bussines_id",
        'product_supplier_name',
        'product_name',
        "product_stock", 
        "product_price"
    ];

}
