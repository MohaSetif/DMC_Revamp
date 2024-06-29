<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory, Authenticatable;

    protected $fillable =[
        'user_id' , 'speciality' , 'work_place'  , 'price' , 'who', 'image'
    ];

    
    public function user(){
        return $this->belongsTo(User::class);
    }
    
    public function time(){
        return $this->hasOne(Time::class , 'user_id');
    }


    public function review(){
        return $this->hasMany(Review::class);
    }
}
