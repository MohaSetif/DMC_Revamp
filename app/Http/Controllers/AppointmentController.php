<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function store(Request $request)
    { 
        $request->validate([
            'doctor'=>'required',
            'name'=>'required',
            'age'=>'required',
            'phone'=>'required',
            'time'=> 'required',
            'description'=> 'required',
        ]);
        
        $command = new Command;
       
        $uid = uniqid();
        
        $case = $request->input('case');
        
        $command->userid=Auth::user()->id;
        $command->doctor=strip_tags($request->input('doctor'));
        $command->name = strip_tags($request->input('name'));
        $command->age = strip_tags($request->input('age'));
        $command->uniqid= $uid;
        $command->phone = strip_tags($request->input('phone'));
        $command->latitude = strip_tags($request->input('latitude'));
        $command->longitude = strip_tags($request->input('longitude'));
        $command->localisation = strip_tags($request->input('localisation'));
        $command->time = strip_tags($request->input('time'));
        $command->description = strip_tags($request->input('description'));
        $command->status = 'في طور الانتظار';

        $command->save();
    }
}
