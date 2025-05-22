<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmploiController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\MatiereController;

// acceder  pour tout le mondes 
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// juste pour les utilisateurs authentifiés
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    //Pour les classes 
    Route::get('/classes', [ClassesController::class, 'index']);
    Route::get('/classes/{classe}', [ClassesController::class, 'show']);


    //pour les matieres 
    Route::get('/matieres', [MatiereController::class, 'index']);
    Route::get('/matieres/{matiere}', [MatiereController::class, 'show']);


    
    // Route pour les admins uniquement 
    Route::middleware('role:admin')->group(function (){
        // pour classes 
        Route::apiResource('/classes', ClassesController::class)->only(['store','update', 'destroy']);
        // pour les matieres
        Route::apiResource('/matieres', MatiereController::class)->only(['store','update', 'destroy']);

        //Accessible pour l'admin pour les gestion d'emploi du temps 
        Route::post('/emplois', [EmploiController::class, 'store']);
        Route::put('/emplois/{id}', [EmploiController::class, 'update']);
        Route::delete('/emplois/{id}', [EmploiController::class, 'destroy']);

        // Assingier une prof au classee 
        Route::put('/classes/{classe}/assign-prof', [ClassesController::class, 'assignProf']);
    });
    // pour un eleve connecte 
    Route::middleware('role:eleve')->get('/emploi-eleve', [EmploiController::class, 'emploiEleve']);

     // pour un prof connecte 
    Route::middleware('role:prof')->get('/emploi-prof', [EmploiController::class, 'emploiProf']);
});



