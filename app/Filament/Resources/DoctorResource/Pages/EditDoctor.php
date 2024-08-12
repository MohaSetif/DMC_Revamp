<?php
namespace App\Filament\Resources\DoctorResource\Pages;

use App\Filament\Resources\DoctorResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class EditDoctor extends EditRecord
{
    protected static string $resource = DoctorResource::class;

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
            'speciality' => $data['speciality'] ?? $record->speciality,
            'work_place' => $data['work_place'] ?? $record->work_place,
            'price' => $data['price'] ?? $record->price,
            'who' => $data['who'] ?? $record->who,
            'image' => $data['image'] ?? $record->image
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