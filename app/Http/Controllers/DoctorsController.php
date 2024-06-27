<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DoctorsController extends Controller
{
    public function index(){
        return Inertia::render('Public/DoctorsList');
    }
}
