<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ClassesController extends Controller
{
    /**a
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Classe::all());
    }

    /**
     * Ajouter une classe (admin uniquement)
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'niveau' => 'required|string|max:255',
        ]);

        $classe = Classe::create($request->only(['name', 'niveau']));

        return response()->json($classe, 201);
    }

    /**
     * Voir une classe
     */
    public function show(Classe $classe)
    {
        return response()->json($classe);
    }

    /**
     * Modifier une classe (admin uniquement)
     */
    public function update(Request $request, Classe $classe)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'niveau' => 'sometimes|required|string|max:255',
        ]);

        $classe->update($request->only(['name', 'niveau']));

        return response()->json($classe);
    }

    /**
     * Supprimer une classe (admin uniquement)
     */
    public function destroy(Classe $classe)
    {
        $classe->delete();
        return response()->json(['message' => 'classe supprimee'], 204);
    }

    public function assignProf(Request $request, Classe $classe )
    {
        $reuqest->vallidate([
            'prof_id' => 'required|exists:users,id',
        ]);
        $classe->professeur_id  = $request->prof_id;
        $classe->save();

        return response()->json($classe);
    }
}


