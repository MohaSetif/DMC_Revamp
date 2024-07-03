<?php

namespace App\Http\Controllers;

use App\Models\Medication;
use App\Models\Pharmacist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MedicationsController extends Controller
{
    public function index(){
        return Inertia::render('Public/Medic_Form');
    }

    public function medic_list(){ //For users
        $medications_list = Medication::where('user_id', auth()->user()->id)->get();
        $usertype = auth()->user()->roles->first();
        return Inertia::render('Public/Pharmacists/MedicationList', [
            'medications' => $medications_list,
            'user_role' => $usertype
        ]);
    }

    public function our_medications(){ //For pharmacists
        $doc = Pharmacist::where('user_id', auth()->user()->id)->first();
        $medications_list = Medication::where('doctor_id', $doc->id)->get();
        $usertype = auth()->user()->roles->first();
        return Inertia::render('Public/Doctors/Doctor_Appointments', [
            'medications' => $medications_list,
            'user_role' => $usertype
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'phone' => 'required',
            'address' => 'required',
            'description' => 'required',
        ]);

        if ($request->image != null) {
            $slug = Str::slug($request->firstname, '-');
            $ImageName = uniqid() . '-' . $slug . '.' . $request->image->extension();
            $request->image->move(public_path('prescription_image'), $ImageName);
        } else {
            $ImageName = 'no image';
        }

        $user_id = Auth::user()->id;
        $uid = uniqid();

        Medication::create([
            'uniqid' => $uid,
            'user_id' => $user_id,
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
            'description' => $request->input('description'),
            'image' => $ImageName,
            'status' => 'في طور الانتظار',
        ]);
    }

    public function updateStatus(Request $request, Medication $medication)
    {
        $request->validate([
            'status' => 'required|in:مؤكد,مرفوض,في طور الانتظار',
        ]);
        $medication->status = $request->input('status');
        $medication->update();
    
        return back()->with('success', 'Medication status updated successfully.');
    }

}
