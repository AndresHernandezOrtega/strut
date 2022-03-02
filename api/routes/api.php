<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\BussinesController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ClientsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use League\CommonMark\Block\Element\IndentedCode;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// ROUTES USERS
Route::get("users/{email}/{password}", [UserController::class, "index"]);
Route::post("users", [UserController::class, "store"]);
Route::get("users/{bussines_id}", [UserController::class, "show"]);
Route::put("users/{id}", [UserController::class, "update"]);
Route::delete("users/{id}", [UserController::class, "destroy"]);

// ROUTES BUSSINES
Route::get("bussines", [BussinesController::class, "index"]);
Route::post("bussines", [BussinesController::class, "store"]);
Route::get("bussines/{id}", [BussinesController::class, "show"]);
Route::put("bussines/{id}", [BussinesController::class, "update"]);
Route::delete("bussines/{id}", [BussinesController::class, "destroy"]);

// ROUTES PRODUCTS
Route::get("getBussinesProducts/{id}", [ProductsController::class, "index"]);
Route::post("products", [ProductsController::class, "store"]);
Route::get("products/{name}", [ProductsController::class, "show"]);
Route::put("products/{id}", [ProductsController::class, "update"]);
Route::delete("products/{id}", [ProductsController::class, "destroy"]);

// ROUTES  SUPPLIERS
Route::get("getBussinesSuppliers/{id}", [SupplierController::class, "index"]);
Route::post("supplier", [SupplierController::class, "store"]);
Route::get("supplier/{name}", [SupplierController::class, "show"]);
Route::put("supplier/{id}", [SupplierController::class, "update"]);
Route::delete("supplier/{id}", [SupplierController::class, "destroy"]);

// ROUTES ORDERS
Route::get("getBussinesOrders/{id}", [OrdersController::class, "index"]);
Route::post("orders", [OrdersController::class, "store"]);
Route::get("orders/{employ_id}",[OrdersController::class, "show"] );
Route::put("orders/{id}", [OrdersController::class, "update"]);
Route::delete("orders/{id}", [OrdersController::class, "destroy"]);

// ROUTES CLIENTS
Route::get("getBussinesClients/{id}", [ClientsController::class, "index"]);
Route::post("clients", [ClientsController::class, "store"]);
Route::get("clients/{name}", [ClientsController::class, "show"]);
Route::put("clients/{id}", [ClientsController::class, "update"]);
Route::delete("clients/{id}", [ClientsController::class, "destroy"]);

// ROUTES DETAIL
Route::get("getBussinesDetails/{id}", [OrderDetailController::class, "index"]);
Route::post("detail", [OrderDetailController::class, "store"]);
Route::get("detail/{order_id}", [OrderDetailController::class, "show"]);
Route::delete("detail/{id}", [OrderDetailController::class, "destroy"]);