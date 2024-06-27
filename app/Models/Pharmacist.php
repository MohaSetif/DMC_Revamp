<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pharmacist extends Model
{
    use HasFactory;

    protected $fillable =[
        'name', 'phone' , 'address' , 'longitude' , 'latitude' , 'user_id'
    ];

    
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function medication(){
        return $this->hasMany(Medication::class);
    }
}
