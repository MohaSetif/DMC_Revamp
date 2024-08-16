<?php

namespace App\Filament\Resources\PharmacistResource\Pages;

use App\Filament\Resources\PharmacistResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class EditPharmacist extends EditRecord
{
    protected static string $resource = PharmacistResource::class;

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $data['user'] = $this->record->user->toArray();
        return $data;
    }

    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        $userData = $data['user'] ?? [];
        $record->user->update([
            'name' => $userData['name'] ?? $record->user->name,
            'email' => $userData['email'] ?? $record->user->email,
            'phone' => $userData['phone'] ?? $record->user->phone,
            'password' => Hash::make($userData['password']) ?? $record->user->password,
        ]);

        $record->update([
            'longitude' => $data['longitude'] ?? $record->longitude,
            'latitude' => $data['latitude'] ?? $record->latitude,
            'address' => $data['address'] ?? $record->address,
        ]);

        return $record;
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}