<?php

namespace App\Http\Controllers;

use App\Models\EmploiDuTemp;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;


class EmploiController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            "class_id" => "required|exists:classes,id",
            "prof_id" => "required|exists:users,id",
            "matiere_id" => "required|exists:matieres,id",
            "jour" => "required|date",
            "heure_debut" => "required",
            "heure_fin" => "required",
        ]);

        $emploi  = EmploiDuTemp::create($validated);
        return response()->json(['emploi' => $emploi], 201);
    }

    //Voir l'emploi du temps d'un eleve

    public function emploiEleve(Request $request)
    {
        $eleve = $request->user();
        $emplois = EmploiDuTemp::where('class_id', $eleve->classe_id)->get();

        return response()->json($emplois);

    } 

    //Voir l'emploi du temps d'un prof 
    public function emploiProf(Request $request)
    {
        $prof = $request->user();
        $emplois = EmploiDuTemp::where('prof', $prof->id)->get();

        return response()->json($emplois);
    }
}
