<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Time;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index($id){
        $doctor = Doctor::where('id', $id)->firstOrFail();
        $time = Time::where('doctor_id', $doctor->id)->first();

        return Inertia::render('Public/Doctors/Appointments', [
            'doctor' => $doctor,
            'time' => $time ?? "",
        ]);
    }

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
