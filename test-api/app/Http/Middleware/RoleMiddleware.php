<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware // Correction du nom (supprimez le "e" après "d")
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // Vérifier si l'utilisateur est authentifié
        $user = $request->user(); 

        if (!$user || !in_array($user->role, $roles)) {
            return response()->json([
                'message' => 'Non autorisé'
            ], 403);
        }

        return $next($request);
    }
}