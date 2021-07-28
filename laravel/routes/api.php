<?php

use App\Http\Controllers\FakeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/fake/all', [FakeController::class, 'indexAll']);
    Route::get('/fake', [FakeController::class, 'index']);
    Route::post('/fake', [FakeController::class, 'store']);
    Route::delete('/fake/{id}', [FakeController::class, 'destroy']);
    Route::get('/fake/complexity', [FakeController::class, 'complexity']);
});


