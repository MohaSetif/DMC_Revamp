<?php
namespace App\Filament\Resources\DoctorResource\Pages;

use App\Filament\Resources\DoctorResource;
use App\Models\Doctor;
use App\Models\Time;
use App\Models\User;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class CreateDoctor extends CreateRecord
{
    protected static string $resource = DoctorResource::class;

    protected function handleRecordCreation(array $data): Model
    {
        $user = User::create([
            'name' => $data['user']['name'],
            'email' => $data['user']['email'],
            'phone' => $data['user']['phone'],
            'password' => Hash::make($data['user']['password']),
        ]);

        $doctorRole = Role::findByName('Doctor');
        $user->assignRole($doctorRole);

        $doctor = $user->doctor()->create([
            'speciality' => $data['speciality'],
            'work_place' => $data['work_place'],
            'price' => $data['price'],
            'who' => $data['who'],
            'image' => $data['image']
        ]);

        Time::create([
            'doctor_id' => $doctor->id,
            'saturday' => '',
            'sunday' => '',
            'monday' => '',
            'tuesday' => '',
            'wednesday' => '',
            'thursday' => '',
            'friday' => '',
        ]);

        return $doctor;
    }
}