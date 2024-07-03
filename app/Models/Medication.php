<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medication extends Model
{
    use HasFactory;

    protected $fillable =[
        'uniqid', 'user_id', 'pharmacist_id', 'phone' ,'address', 'description'  , 'image' , 'status'
     ];
 
 
     public function user(){
         return $this->belongsTo(User::class, 'user_id');
     }
 
     public function pharmacist(){
         return $this->belongsTo(Pharmacist::class, 'pharmacist_id');
     }
}
