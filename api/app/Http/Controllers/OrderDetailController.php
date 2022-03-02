<?php

namespace App\Http\Controllers;

use App\Order;
use Illuminate\Http\Request;
use App\Order_detail;

class OrderDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        return Order_detail::where("bussines_id", "=" , $id)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Order_detail::create($request->all());
        return response()->json([
            "res" => true,
            "messege" => "detalle registrado"
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($order_id)
    {
        $detail = Order_detail::where("order_id", "=" , "$order_id")->get();
        return response()->json([
            "res" => true,
            "detail" => $detail
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order_detail $id)
    {
        $id->delete();
        return response()->json([
            "res" => true,
            "msj" => "Detalle eliminado satisfactoriamete"
        ], 200);
    }
}
