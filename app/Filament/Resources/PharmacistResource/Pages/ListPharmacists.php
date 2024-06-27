<?php

namespace App\Filament\Resources\PharmacistResource\Pages;

use App\Filament\Resources\PharmacistResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPharmacists extends ListRecords
{
    protected static string $resource = PharmacistResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
