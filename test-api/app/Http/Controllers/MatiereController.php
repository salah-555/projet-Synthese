<?php

namespace App\Http\Controllers;

use App\Models\Matiere;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class MatiereController extends Controller
{
    public function index()
    {
        return response()->json(Matiere::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $matiere = Matiere::create($request->all());

        return response()->json($matiere, 201);
    }

    public function show(Matiere $matiere)
    {
        return response()->json($matiere);
    }

    public function update(Request $request, Matiere $matiere)
    {
        $request->validate([
            'name' => "required|string|,ax:255",
        ]);

        $matiere->update($request->all());

        return response()->json($matiere);
    }

    public function destory(Matiere $matiere)
    {
        $matiere->delete();
        return response()->json(['message' => 'Matiere deleted successfully']);
    }
}
