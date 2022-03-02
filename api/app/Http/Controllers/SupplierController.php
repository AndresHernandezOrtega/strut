<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Supplier;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        return Supplier::where("bussines_id", "=" , $id)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Supplier::create($request->all());
        return response()->json([
            "res" => true,
            "messege" => "Proveedor registrado"
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
        $supplier = Supplier::where("supplier_name", "like" , "%$name%")->get();
        return response()->json([
            "res" => true,
            "supplier" => $supplier
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,Supplier $id)
    {
        $id->update($request->all());
        return response()->json([
            "res" => true,
            "msj" => "Datos del Proveedor actualizado correctamente"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Supplier $id)
    {
        $id->delete();
        return response()->json([
            "res" => true,
            "msj" => "Proveedor eliminado satisfactoriamete"
        ], 200);
    }
}
