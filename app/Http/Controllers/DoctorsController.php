<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Review;
use App\Models\Time;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DoctorsController extends Controller
{
    public function index()
    {
        $doctors = Doctor::with('user')->get();
        $doctorNames = $doctors->pluck('user.name')->toArray();

        return Inertia::render('Public/DoctorsList', [
            'doctors' => $doctors,
            'doctorNames' => $doctorNames,
        ]);
    }

    public function doc_profile($id){
        $doctor = Doctor::query()->where('id', $id)->first();
        $doctor_info = User::where('id', $doctor->user_id)->first();
        $doc_week = Time::where('doctor_id', $doctor->id)->first();
        $reviews = Review::where('doctor_id', $doctor->id)->latest()->get();
        $ratings = Review::where('doctor_id', $doctor->id)->avg('rating');
        $voteCount = Review::where('doctor_id', $doctor->id)->count();
        return Inertia::render('Public/Doctor_Profile', [
            'doctor' => $doctor,
            'doctor_name' => $doctor_info->name,
            'time' => $doc_week,
            'reviews' => $reviews,
            'ratings' => (int)$ratings,
            'nbr_votes' => $voteCount
        ]);
    }

    public function build_profile()
    {
        $doctor = Doctor::where('user_id', Auth::id())->firstOrFail();
        $shifts = Time::where('doctor_id', $doctor->id)->first();
        
        $formattedShifts = [];
        if ($shifts) {
            foreach (['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as $day) {
                if ($shifts->$day) {
                    list($start, $end) = explode('-', $shifts->$day);
                    $formattedShifts[$day] = [
                        'start_time' => $start,
                        'end_time' => $end
                    ];
                }
            }
        }

        return Inertia::render('Public/Doctors/Build_Profile', [
            'doctor' => $doctor,
            'shifts' => $formattedShifts,
        ]);
    }

    public function update_profile(Request $request)
    {
        $validated = $request->validate([
            'speciality' => 'required|string|max:255',
            'work_place' => 'required|string|max:255',
            'price' => 'required|numeric',
            'who' => 'required|string',
            'shifts' => 'required'
        ]);

        $doctor = Doctor::where('user_id', Auth::id())->firstOrFail();

        $doctor->update([
            'speciality' => $validated['speciality'],
            'work_place' => $validated['work_place'],
            'price' => $validated['price'],
            'who' => $validated['who'],
        ]);

        if ($request->hasFile('image')) {
            if ($doctor->image) {
                Storage::disk('public')->delete($doctor->image);
            }
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

    public function my_appointments(){
        $doc = Doctor::where('user_id', auth()->user()->id)->first();
        $appoint_list = Appointment::where('doctor_id', $doc->id)->get();
        $usertype = auth()->user()->roles->first();
        return Inertia::render('Public/Doctors/Doctor_Appointments', [
            'appointments' => $appoint_list,
            'user_role' => $usertype
        ]);
    }

    public function submitReview(Request $request, Doctor $doctor)
    {
        $validated = $request->validate([
            'rating' => 'integer|min:0|max:5',
            'comment' => 'string|max:1000',
        ]);

        $review = new Review([
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'user_id' => auth()->id(),
            'username' => auth()->user()->name
        ]);

        $doctor->review()->save($review);
    }
}
