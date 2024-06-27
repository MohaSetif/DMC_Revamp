<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medication extends Model
{
    use HasFactory;

    protected $fillable =[
        'uniqid', 'firstname' , 'lastname', 'phone' ,'address', 'description'  , 'image' , 'status' , 'user_id', 'pharmacien' ,'latitude','longitude'
     ];
 
 
     public function user(){
         return $this->belongsTo(User::class);
     }
 
     public function pharmacist(){
         return $this->belongsTo(Pharmacist::class);
     }
}
