<?php

namespace App\Filament\Resources\PharmacistResource\Pages;

use App\Filament\Resources\PharmacistResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Database\Eloquent\Model;

class EditPharmacist extends EditRecord
{
    protected static string $resource = PharmacistResource::class;

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
            'longitude' => $data['longitude'],
            'latitude' => $data['latitude'], 
            'address' => $data['address'], 
        ]);

        return $record;
    }
}
