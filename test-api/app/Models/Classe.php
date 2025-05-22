<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Classe extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'niveau',
        'professeur_id',
    ];

    public function eleves()
    {
        return $this->hasMany(User::class)->where('role', 'eleve');
    }

    public function professeur()
    {
        return $this->belongsT0(User::class, 'professeur_id');
    }
}
