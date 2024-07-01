<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Time;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index($id)
    {
        $doctor = Doctor::where('id', $id)->firstOrFail();
        $doctor_info = User::where('id', $doctor->user_id)->firstOrFail();
        $time = Time::where('doctor_id', $doctor->id)->first();
        
        return Inertia::render('Public/Doctors/Appointments', [
            'doctor_id' => $doctor->id,
            'doctor_info' => $doctor_info,
            'time' => $time
        ]);
    }

    public function store(Request $request)
    { 
        $request->validate([
            'user_id' => 'required',
            'doctor_id' => 'required',
            'name' => 'required',
            'age' => 'required',
            'phone' => 'required',
            'time' => 'required',
            'description' => 'required',
        ]);

        return Appointment::create([
            'user_id' => $request->user_id,
            'doctor_id' => $request->doctor_id,
            'name' => $request->name,
            'age' => $request->age,
            'phone' => $request->phone,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'localisation' => $request->localisation,
            'time' => $request->time,
            'description' => $request->description,
        ]);
    }

    public function updateStatus(Request $request, Appointment $appointment)
    {
        $request->validate([
            'status' => 'required|in:مؤكد,ملغي,في طور الانتظار',
        ]);

        $appointment->status = $request->status;
        $appointment->update();
    }
}
