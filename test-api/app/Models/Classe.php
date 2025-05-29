<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Classe extends Model
{
    use HasFactory;

    protected $table = 'classes';


    protected $fillable = [
        'name',
        'niveau',
        'professeur_id'
    ];

     public function students()
    {
        return $this->hasMany(User::class, 'classe_id')->where('role', 'eleve');
    }

    public function professeur()
    {
        return $this->belongsTo(User::class, 'professeur_id');
    }

    // public function classesAssignees()
    // {
    //     return $this->hasMany(Classe::class, 'professeur_id');
    // }

    public function forceDelete()
{
    \DB::statement('SET FOREIGN_KEY_CHECKS=0');
    parent::forceDelete();
    \DB::statement('SET FOREIGN_KEY_CHECKS=1');
}
}
