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
// Route::get('/matieres', [MatiereController::class, 'index']);


 Route::apiResource('/matieres', MatiereController::class)
            ->only(['store', 'update', 'destroy']);

//  Route::get('/students/unassigned', [ClassesController::class, 'unassigned']);



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

        //  Route::apiResource('/matieres', MatiereController::class)
        //     ->only(['store', 'update', 'destroy']);

    
        // pour les profs - CORRIGEZ CETTE LIGNE
        Route::get('/users', function (Request $request) {
            if ($request->has('role')) {
                return User::where('role', $request->role)->get();
            }
            return User::all();
        });


        // pour les profs 
        Route::get('/profs', function () {
        return User::where('role', 'prof')->get();
        });

        // pour classes 
        Route::apiResource('/classes', ClassesController::class)->only(['store','update', 'destroy']);
        // pour les matieres
       // Écriture des matières réservée aux admins
       
        Route::get('/students/unassigned', [ClassesController::class, 'unassigned']); 

            
        //Accessible pour l'admin pour les gestion d'emploi du temps 
        Route::post('/emplois', [EmploiController::class, 'store']);
        Route::put('/emplois/{id}', [EmploiController::class, 'update']);
        Route::delete('/emplois/{id}', [EmploiController::class, 'destroy']);

        // Assingier une prof au classee 
        Route::put('/classes/{classe}/assign-prof', [ClassesController::class, 'assignProf']);
    });

    // fetch all students 
    Route::get('/students', [ClassesController::class, 'getAllStudents']);
    Route::put('/classes/{id}/assign-students', [ClassesController::class, 'assignStudents']);
    


    
    
    // pour un eleve connecte 
    Route::middleware('role:eleve')->get('/emploi-eleve', [EmploiController::class, 'emploiEleve']);

    
     // pour un prof connecte 
    Route::middleware('role:prof')->get('/emploi-prof', [EmploiController::class, 'emploiProf']);
});



