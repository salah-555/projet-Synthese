<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Matiere;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;

class MatiereController extends Controller
{
    public function index()
    {   
  
        $matieres = Matiere::with(['professeur', 'eleves'])
            ->get();
        return response()->json($matieres);
       
    }

    public function store(Request $request)
    {
        // if(auth()->user()->role !== 'admin') {
        //      return response()->json(['message' => 'Non autorisé'], 403);
        // }

        $request->validate([
            'name' => 'required|string|max:255|unique:matieres,name',
        ]);

        $matiere = Matiere::create([
            'name' => $request->name,
        ]);

       return response()->json(['message' => 'Matière ajoutée avec succès', 'data' => $matiere]);
    }

    public function show(Matiere $matiere)
    {
        return response()->json($matiere->load(['professeur', 'eleves']));
    }

    public function update(Request $request, Matiere $matiere)
    {
        $request->validate([
            'name' => "required|string|max:255|unique:matieres,name,{$matiere->id}",
        ]);

        $matiere->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $matiere->load(['professeur', 'eleves']),
            'message' => 'Matière modifiée avec succès'
        ]);
    }


    // CORRECTION : "destory" -> "destroy"
    public function destroy(Matiere $matiere)
    {
        // Vérifiez que l'utilisateur est bien authentifié et admin
    // if (!auth()->check() || auth()->user()->role !== 'admin') {
    //     return response()->json(['message' => 'Non autorisé'], 403);
    // }

    // Vérification alternative plus robuste
    if ($matiere->eleves()->count() > 0 || $matiere->professeur) {
        return response()->json([
            'success' => false,
            'message' => 'Impossible de supprimer: matière utilisée'
        ], 400);
    }

    try {
        $matiere->delete();
        return response()->json([
            'success' => true,
            'message' => 'Matière supprimée'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur de suppression',
            'error' => $e->getMessage()
        ], 500);
    }
    }
}