<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $fillable = [
        'supplier_name',
        "suppplier_nit",
        'supplier_phone',
        'supplier_addres',
        "bussines_id", 
    ];
}
