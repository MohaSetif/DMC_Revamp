<?php

namespace App\Http\Controllers;

use App\Models\Medication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MedicationsController extends Controller
{
    public function index(){
        return Inertia::render('Public/Medic_Form');
    }

    public function store(Request $request)
    {
        $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
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
            'firstname' => $request->input('firstname'),
            'lastname' => $request->input('lastname'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
            'description' => $request->input('description'),
            'image' => $ImageName,
            'user_id' => $user_id,
            'status' => 'في طور الانتظار',
            'pharmacien' => 'no',
            'latitude' => 'no',
            'longitude' => 'no',
        ]);
    }

}
