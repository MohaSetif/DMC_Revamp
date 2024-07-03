<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DoctorResource\Pages;
use App\Filament\Resources\DoctorResource\RelationManagers;
use App\Models\Doctor;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Hash;

class DoctorResource extends Resource
{
    protected static ?string $model = Doctor::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Grid::make()
                ->relationship('user')
                ->schema([
                    TextInput::make('name')
                        ->required(),
                    TextInput::make('phone')
                        ->tel()
                        ->required()
                        ->maxLength(255),
                    TextInput::make('email')
                        ->email()
                        ->required(),
                    TextInput::make('password')
                        ->password()
                        ->dehydrateStateUsing(fn ($state) => filled($state) ? Hash::make($state) : null)
                        ->dehydrated(fn ($state) => filled($state))
                        ->required(fn (string $context): bool => $context === 'create'),
                ])
                ->columns(2),
                Grid::make()
                    ->schema([
                        TextInput::make('speciality')
                        ->required()
                        ->maxLength(255),
                        TextInput::make('work_place')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('price')
                            ->required()
                            ->numeric()
                            ->minValue(0),
                        Textarea::make('who')
                            ->required()
                            ->maxLength(65535),
                        FileUpload::make('image')
                            ->image()
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
                TextColumn::make('speciality'),
                TextColumn::make('work_place'),
                TextColumn::make('price'),
                ImageColumn::make('image'),
            ])
            ->searchable()
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
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
            'index' => Pages\ListDoctors::route('/'),
            'create' => Pages\CreateDoctor::route('/create'),
            'edit' => Pages\EditDoctor::route('/{record}/edit'),
        ];
    }    
}
