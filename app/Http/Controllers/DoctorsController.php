<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Time;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DoctorsController extends Controller
{
    public function index()
    {
        $doctors = Doctor::all();
        return Inertia::render('Public/DoctorsList', [
            'doctors' => $doctors
        ]);
    }

    public function doc_profile($id){
        $doctor = Doctor::query()->where('id', $id)->first();
        return Inertia::render('Public/Doctor_Profile', [
            'doctor' => $doctor
        ]);
    }

    public function build_profile(){
        $doctor = Doctor::where('user_id', Auth::id())->firstOrFail();
        $shifts = Time::where('doctor_id', $doctor->id)->first();

        return Inertia::render('Public/Doctors/Build_Profile', [
            'doctor' => $doctor,
            'shifts' => $shifts ? $shifts->only(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']) : [],
        ]);
    }

    public function update_profile(Request $request)
    {
        $validated = $request->validate([
            'speciality' => 'required|string|max:255',
            'work_place' => 'required|string|max:255',
            'price' => 'required|numeric',
            'who' => 'required|string',
            'image' => 'string',
            'shifts' => 'required|array',
            'shifts.*.day' => 'required|string|in:sunday,monday,tuesday,wednesday,thursday,friday,saturday',
            'shifts.*.start_time' => 'required|date_format:H:i',
            'shifts.*.end_time' => 'required|date_format:H:i|after:shifts.*.start_time',
        ]);
    
        $doctor = Doctor::where('user_id', Auth::id())->firstOrFail();
    
        $doctor->update([
            'speciality' => $validated['speciality'],
            'work_place' => $validated['work_place'],
            'price' => $validated['price'],
            'who' => $validated['who'],
        ]);
    
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('doctor_images', 'public');
            $doctor->update(['image' => $imagePath]);
        }
    
        $shifts = [];
        foreach ($validated['shifts'] as $shift) {
            $shifts[$shift['day']] = [
                'start_time' => $shift['start_time'],
                'end_time' => $shift['end_time'],
            ];
        }

        $flattenedShifts = [];
        foreach ($shifts as $day => $shift) {
            $flattenedShifts[$day] = $shift['start_time'] . '-' . $shift['end_time'];
        }

    
        Time::updateOrCreate(
            ['doctor_id' => $doctor->id],
            $flattenedShifts
        );
    
        return redirect()->back()->with('success', 'Profile updated successfully');
    }
}
