<?php

namespace App\Http\Controllers;

use App\Models\Fake;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FakeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $fakes = Fake::limit(10)->get();

        return response()->json($fakes);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexAll(): JsonResponse
    {
        $fakes = Fake::limit(1000)->get();

        return response()->json($fakes);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        Auth::user()->can('create');

        $fake = Fake::create($request->only('email', 'name', 'address', 'phone'));

        sleep(rand(1, 20));

        return response()->json('', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $fake = Fake::find($id);

        Auth::user()->can('forceDelete', $fake);

        $fake->delete();

        return response()->json('', 204);
    }
}
