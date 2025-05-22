<?php

namespace App\Models;

use App\Models\Classe;
use App\Models\Matiere;
use Illuminate\Foundation\Auth\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EmploiDuTemp extends Model
{
    use HasFactory;

    protected $table = 'emplois_du_temps';

    protected $fillable = [
        'class_id',
        'prof_id',
        'matiere_id',
        'jour',
        'heure_debut',
        'heure_fin',
    ];

    // Relation avec la calsse / 
    public function classe()
    {
        return $this->belongsTo(Classe::class, 'class_id');
    }

    // Relation avec le prof (users role: prof )
     public function prof()
    {
        return $this->belongsTo(User::class, 'prof_id');
    }
    // Relation avec la matiere 
    public function matiere()
    {
        return $this->belongsTo(Matiere::class, 'matiere_id');
    }
}
