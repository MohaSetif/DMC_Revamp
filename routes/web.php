<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DoctorsController;
use App\Http\Controllers\MedicationsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $usertype = auth()->user()->roles->first();
    return Inertia::render('Dashboard', [
        'usertype' => $usertype
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/doctors', [DoctorsController::class, 'index'])->name('doctors.index');
    Route::get('/doctors/build_profile', [DoctorsController::class, 'build_profile'])->name('doctor.build_profile');
    Route::put('/doctors/post_building', [DoctorsController::class, 'update_profile'])->name('doctor.update_profile');
    Route::get('/your_appointments', [DoctorsController::class, 'my_appointments'])->name('doctor.appoint_list');
    Route::get('/doctors/{id}', [DoctorsController::class, 'doc_profile'])->name('doctor.profile');

    Route::get('/appointments/{id}', [AppointmentController::class, 'index'])->name('appointment.index');
    Route::get('/my_appointments', [AppointmentController::class, 'getUserAppointments'])->name('appointment.for_user');
    Route::post('/schedule_appointment', [AppointmentController::class, 'store'])->name('appointment.store');
    Route::put('/appointments/{appointment}/update-status', [AppointmentController::class, 'updateStatus'])->name('appointments.updateStatus');

    Route::get('/medications_form', [MedicationsController::class, 'index'])->name('medications.index');
    Route::post('/medications_store', [MedicationsController::class, 'store'])->name('medications.store');
});

require __DIR__.'/auth.php';
