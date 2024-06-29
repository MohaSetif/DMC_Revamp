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
        $record->user->update([
            'name' => $data['user']['name'],
            'email' => $data['user']['email'],
        ]);

        if (isset($data['user']['password'])) {
            $record->user->update([
                'password' => $data['user']['password'],
            ]);
        }

        $record->update([
            'speciality' => $data['speciality'],
            'work_place' => $data['work_place'], 
            'price' => $data['price'], 
            'who' => $data['who'], 
            'image' => $data['image']
        ]);

        return $record;
    }
}
