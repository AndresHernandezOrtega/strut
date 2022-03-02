<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        return Order::where("bussines_id", "=" , $id)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Order::create($request->all());
        return response()->json([
            "res" => true,
            "messege" => Order::latest('id')->first()
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order = Order::where("id_employ_asigned", "=" , "$id")->get();
        return response()->json([
            "res" => true,
            "order" => $order
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {   

        $newState = $request->input("state");
        Order::where('id', $id)->update(array('state' => $newState));
        return response()->json([
            "res" => true,
            "msj" => "Estado de la orden actualizado"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $id)
    {
        $id->delete();
        return response()->json([
            "res" => true,
            "msj" => "Orden eliminado satisfactoriamete"
        ], 200);
    }
}
