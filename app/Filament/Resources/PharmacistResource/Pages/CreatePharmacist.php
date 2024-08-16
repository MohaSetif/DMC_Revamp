<?php

namespace App\Filament\Resources\PharmacistResource\Pages;

use App\Filament\Resources\PharmacistResource;
use App\Models\User;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class CreatePharmacist extends CreateRecord
{
    protected static string $resource = PharmacistResource::class;

    protected function handleRecordCreation(array $data): Model
    {
        $user = User::create([
            'name' => $data['user']['name'],
            'phone' => $data['user']['phone'],
            'email' => $data['user']['email'],
            'password' => Hash::make($data['user']['password'])
        ]);

        $pharmacistRole = Role::findByName('Pharmacist');
        $user->assignRole($pharmacistRole);

        $pharmacist = $user->pharmacist()->create([
            'longitude' => $data['longitude'],
            'latitude' => $data['latitude'],
            'address' => $data['address'],
        ]);

        return $pharmacist;
    }
}