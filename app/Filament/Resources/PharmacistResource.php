<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PharmacistResource\Pages;
use App\Filament\Resources\PharmacistResource\RelationManagers;
use App\Models\Pharmacist;
use Filament\Forms;
use Filament\Forms\Components\Fieldset;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class PharmacistResource extends Resource
{
    protected static ?string $model = Pharmacist::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

        public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make("Pharmacist's Information")
                    ->schema([
                        TextInput::make('user.name')
                            ->required()
                            ->label('Name'),
                        TextInput::make('user.phone')
                            ->tel()
                            ->required()
                            ->label('Phone'),
                        TextInput::make('user.email')
                            ->email()
                            ->required()
                            ->label('Email'),
                        TextInput::make('user.password')
                            ->password()
                            ->required()
                            ->label('Password')
                    ])
                    ->columns(2),
                Section::make('More Details')
                    ->schema([
                        TextInput::make('longitude')
                            ->numeric()
                            ->required(),
                        TextInput::make('latitude')
                            ->numeric()
                            ->required(),
                        TextInput::make('address')
                            ->required(),
                    ])
                    ->columns(2),
            ]);
        }

        public static function getEloquentQuery(): \Illuminate\Database\Eloquent\Builder
        {
            return parent::getEloquentQuery()->with('user');
        }

        public static function table(Table $table): Table
        {
            return $table
                ->columns([
                    TextColumn::make('user.name'),
                    TextColumn::make('user.phone'),
                    TextColumn::make('address'),
                ])
                ->searchable()
                ->filters([
                    //
                ])
                ->actions([
                    Tables\Actions\EditAction::make(),
                ])
                ->bulkActions([
                    Tables\Actions\BulkActionGroup::make([
                        Tables\Actions\DeleteBulkAction::make(),
                    ]),
                ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPharmacists::route('/'),
            'create' => Pages\CreatePharmacist::route('/create'),
            'edit' => Pages\EditPharmacist::route('/{record}/edit'),
        ];
    }
}
