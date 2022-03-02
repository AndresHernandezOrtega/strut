<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Client;

class ClientsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        return Client::where("bussines_id", "=" , $id)->get();
    } 

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Client::create($request->all());
        return response()->json([
            "res" => true,
            "messege" => "Cliente registrado"
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
        $client = Client::where("client_name", "like" , "%$name%")->get();
        return response()->json([
            "res" => true,
            "producto" => $client
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Client $id)
    {
        $id->update($request->all());
        return response()->json([
            "res" => true,
            "msj" => "Datos del Cliente actualizado correctamente"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $id)
    {
        $id->delete();
        return response()->json([
            "res" => true,
            "msj" => "Cliente eliminado satisfactoriamete"
        ], 200);
    }
}
