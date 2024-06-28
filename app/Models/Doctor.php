<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable =[
        'name', 'phone' , 'speciality' , 'work_place'  , 'price' , 'who', 'image'
    ];

    
    // public function user(){
    //     return $this->belongsTo(User::class);
    // }
    
    public function time(){
        return $this->hasOne(Time::class , 'userId');
    }


    public function review(){
        return $this->hasMany(Review::class);
    }
}
