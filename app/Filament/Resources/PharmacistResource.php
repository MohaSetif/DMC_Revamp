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
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Hash;

class PharmacistResource extends Resource
{
    protected static ?string $model = Pharmacist::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
{
    return $form
        ->schema([
            Grid::make()
                ->relationship('user')
                ->schema([
                    Forms\Components\TextInput::make('name')
                        ->required(),
                    Forms\Components\TextInput::make('phone')
                        ->tel()
                        ->required()
                        ->maxLength(255),
                    Forms\Components\TextInput::make('email')
                        ->email()
                        ->required(),
                    Forms\Components\TextInput::make('password')
                        ->password()
                        ->dehydrateStateUsing(fn ($state) => filled($state) ? Hash::make($state) : null)
                        ->dehydrated(fn ($state) => filled($state))
                        ->required(fn (string $context): bool => $context === 'create'),
                ])
                ->columns(2),
            Grid::make()
                ->schema([
                    Forms\Components\TextInput::make('longitude')
                        ->numeric()
                        ->required(),
                    Forms\Components\TextInput::make('latitude')
                        ->numeric()
                        ->required(),
                    Forms\Components\TextInput::make('address')
                        ->required(),
                ])
                ->columns(2),
        ]);
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
