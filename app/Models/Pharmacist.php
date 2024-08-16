<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pharmacist extends Model
{
    use HasFactory, Authenticatable;

    protected $fillable =[
        'user_id' , 'address' , 'longitude' , 'latitude'
    ];

    
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function medication(){
        return $this->hasMany(Medication::class);
    }
}
