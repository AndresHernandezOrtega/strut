<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Products;
use Mockery\Matcher\Type;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        return Products::where("bussines_id", "=" , $id)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        Products::create($request->all());
        return response()->json([
            "res" => true,
            "messege" => "Producto registrado"
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($name)
    {
        $product = Products::where("product_name", "like" , "%$name%")->get();
        return response()->json([
            "res" => true,
            "producto" => $product
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Products $id)
    {
        $id->update($request->all());
        return response()->json([
            "res" => true,
            "msj" => "Datos del Producto actualizado correctamente"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Products $id)
    {
        $id->delete();
        return response()->json([
            "res" => true,
            "msj" => "Producto eliminado satisfactoriamete"
        ], 200);
    }
}
