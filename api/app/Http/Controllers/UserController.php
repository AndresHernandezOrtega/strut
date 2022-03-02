<?php

namespace App\Http\Controllers;


use App\Products;
use Illuminate\Http\Request;
use App\User;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($email, $password)
    {
        return User::where("email", "=" , $email)
        ->where("password", "=", $password)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        User::create($request->all());

        return response()->json([
            "res" => true,
            "messege" => "Usuario registrado"
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($bussines_id)
    {
        return User::where("bussines_id", "=" , $bussines_id)->get();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($request, User $id)
    {
        $id->update($request->all());
        return response()->json([
            "res" => true,
            "msj" => "Usuario actualizado correctamente"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $id)
    {
        $id->delete();
        return response()->json([
            "res" => true,
            "msj" => "Usuario eliminado satisfactoriamete"
        ], 200);
    }
}
