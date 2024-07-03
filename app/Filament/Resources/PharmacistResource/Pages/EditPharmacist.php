<?php

namespace App\Filament\Resources\PharmacistResource\Pages;

use App\Filament\Resources\PharmacistResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class EditPharmacist extends EditRecord
{
    protected static string $resource = PharmacistResource::class;

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
            'longitude' => $data['longitude'] ?? $record->longitude,
            'latitude' => $data['latitude'] ?? $record->latitude,
            'address' => $data['address'] ?? $record->address,
        ]);

        return $record;
    }
}