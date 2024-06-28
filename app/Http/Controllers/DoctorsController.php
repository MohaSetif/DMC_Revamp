<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;
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
}
