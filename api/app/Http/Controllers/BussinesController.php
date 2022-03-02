<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\bussines;

class BussinesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return bussines::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return bussines::create($request->all());
        response()->json([
            "res" => true,
            "messege" => "Negocio Registrado"
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(bussines $id)
    {
        return response()->json([
            "res" => true,
            "negocio" => $id
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, bussines $id)
    {
        $id->update($request->all());
        return response()->json([
            "res" => true,
            "msj" => "Datos del negocio actualizado correctamente"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(bussines $id)
    {
        $id->delete();
        return response()->json([
            "res" => true,
            "msj" => "Negocio eliminado satisfactoriamete"
        ], 200);
    }
}
