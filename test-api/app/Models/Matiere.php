<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Matiere extends Model
{
    use HasFactory;
    protected $fillable = [
        "id",
        "name"
    ];

     // Relation avec les élèves (many-to-many)
    public function eleves(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'eleve_matiere', 'matiere_id', 'user_id')
                    ->where('role', 'eleve');
    }

    // Relation avec le professeur (many-to-one)
    public function professeur()
    {
        return $this->belongsTo(User::class, 'professeur_id')
                   ->where('role', 'prof');
    }

 
}
