<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        $record->update([
            'name' => $data['name'] ?? $record->name,
            'email' => $data['email'] ?? $record->email,
            'phone' => $data['phone'] ?? $record->phone,
            'password' => Hash::make($data['password']) ?? $record->password,
        ]);

        if($record->doctor){
            $record->doctor->update([
                'name' => $data['doctor']['name'] ?? $record->doctor->name,
                'email' => $data['doctor']['email'] ?? $record->doctor->email,
                'phone' => $data['doctor']['phone'] ?? $record->doctor->phone,
                'password' => $data['doctor']['password'] ?? $record->doctor->password
            ]);
        }

        return $record;
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
