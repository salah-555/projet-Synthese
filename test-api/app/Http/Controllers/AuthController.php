<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Inscription 
    public function register(Request $request)
    {
        $request->validate([
            "name"     => "required|string|max:255",
            "lastname" => "required|string|max:255",
            "email"    => "required|email|unique:users",
            'password' => "required|string|min:8|confirmed",
            'role'     => "required|in:admin,prof,eleve",
         ]);

         $user = User::create([
            "name" => $request->name,
            "lastname" => $request->lastname,
            "email" => $request->email,
            "role" => $request->role,
            "password" => bcrypt($request->password),    
         ]);

         $token = $user->createToken('auth_token')->plainTextToken;

         return response()->json([
            'user' => $user,
            'token' => $token,
         ], 201);
    }

    //Connexion
    public function login(Request $request)
    {
        $request->validate([
            "email" => "required|email",
            "password" => "required|min:8"
        ]);

        $user = User::where('email', $request->email)->first();

        if(! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Identifiants invalides.'],
            ]);
        }

        $token = $user->createToken("auth_token")->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    // Deconnexion 
    public function logout(Request $request)
    {

         $request->user()->currentAccessToken()->delete();

        return response()->json(["msg" => "Déconnexion réussie"], 200);
        // $request->user()->tokens()->delete();
        // return response()->json(['message' => 'Déconnexion réussie'], 200);
    }

      // Infos utilisateur connecté
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
