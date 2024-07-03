<?php

namespace App\Filament\Resources\DoctorResource\Pages;

use App\Filament\Resources\DoctorResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Database\Eloquent\Model;

class EditDoctor extends EditRecord
{
    protected static string $resource = DoctorResource::class;
    
    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        $userData = $data['user'] ?? $data;
        $record->user->update([
            'name' => $userData['name'] ?? $record->user->name,
            'email' => $userData['email'] ?? $record->user->email,
            'phone' => $userData['phone'] ?? $record->user->phone,
        ]);

        if (!empty($userData['password'])) {
            $record->user->update([
                'password' => bcrypt($userData['password']),
            ]);
        }

        $record->update([
            'speciality' => $data['speciality'] ?? $record->speciality,
            'work_place' => $data['work_place'] ?? $record->work_place, 
            'price' => $data['price'] ?? $record->price, 
            'who' => $data['who'] ?? $record->who, 
            'image' => $data['image'] ?? $record->image
        ]);

        return $record;
    }
}
