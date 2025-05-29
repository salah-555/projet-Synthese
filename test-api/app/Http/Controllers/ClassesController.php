<?php

namespace App\Http\Controllers;

use DB;
use App\Models\Classe;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\User;
use Illuminate\Validation\ValidationException;

class ClassesController extends Controller
{
    /**a
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Classe::with('professeur', 'students')->get());
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
        return response()->json($classe->load(['professeur', 'students']));
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
    public function destroy(Classe $classe, $id)
    {
        if (!auth()->check()) {
        return response()->json(['error' => 'Non authentifié'], 401);
    }

    \DB::beginTransaction();
    try {
        $deleted = \DB::table('classes')->where('id', $id)->delete();

        if (!$deleted) {
            throw new \Exception("Aucune ligne supprimée");
        }

        \DB::commit();
        return response()->json([
            'success' => true,
            'deleted_id' => $id
        ]);

    } catch (\Exception $e) {
        \DB::rollBack();
        return response()->json([
            'success' => false,
            'error' => $e->getMessage()
        ], 500);
    }
    }

    public function assignProf(Request $request, Classe $classe )
    {
        $request->validate([
            'prof_id' => 'required|exists:users,id',
        ]);
        // Vérifier que l'utilisateur est bien un professeur
        $professeur = User::where('id', $request->prof_id)
            ->where('role', 'prof')
            ->first();
        
        if (!$professeur) {
            return response()->json([
                'sucess' => false,
                'message' => 'L\'utilisateur n\'est pas un professeur valide.'
            ], 400);
        }
            
        $classe->professeur_id  = $request->prof_id;
        $classe->save();
        
    // Charger la relation professeur pour la réponse
    $classe->load('professeur');

        return response()->json([
        'success' => true,
        'data' => $classe,
        'message' => 'Professeur assigné avec succès'
    ]);
    }


    //Fetcher all the students 
    public function getAllStudents()
    {
        $students = User::where('role', 'eleve')->get();

        return response()->json($students);
    }
    
    public function assignStudents(Request $request, $classeId)
    {
        // try {
        $request->validate([
            'student_ids' => 'required|array',
            'student_ids.*' => 'exists:users,id'
        ]);

        // $classe = Classe::findOrFail($classeId);

        // on s'assur que tous les users sont des eleves 
        $students = User::whereIn('id', $request->student_ids)
            ->where('role', 'eleve')
            ->get();

        // return response()->json([
        //     'message' => 'Élèves trouvés',
        //     'students' => $students
        // ]);

        foreach ($students as $student) {
            $student->classe_id = $classeId;
            $student->save();
        }

        return response()->json([
            'message' => 'Élèves assignés avec succès',
            // 'classe' => $classe->load('students')
        ]);
        // } catch (ValidationException $e) {
        //     return response()->json([
        //         'error' => 'Une erreur est survenue lors de l\'assignation des élèves : ' . $e->errors()
        //     ], 500);
        // }
       
    }


    public function unassigned()
{
    $students = User::where('role', 'eleve')
                    ->whereNull('classe_id')
                    ->get();

    return response()->json($students);
}
}

    



