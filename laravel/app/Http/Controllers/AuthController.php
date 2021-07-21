<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request) {
        if (Auth::attempt($request->only('email', 'password'))) {
            return response()->json('', 204 );
        }

        return response()->json([
            'error' => 'invalid_credentials'
        ], 403);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();
    }
}
