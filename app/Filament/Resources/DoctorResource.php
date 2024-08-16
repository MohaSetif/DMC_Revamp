<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DoctorResource\Pages;
use App\Filament\Resources\DoctorResource\RelationManagers;
use App\Models\Doctor;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;

class DoctorResource extends Resource
{
    protected static ?string $model = Doctor::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make("Doctors's Information'")
                    ->schema([
                        TextInput::make('user.name')
                            ->required()
                            ->label('Name'),
                        TextInput::make('user.email')
                            ->email()
                            ->required()
                            ->label('Email'),
                        TextInput::make('user.phone')
                            ->tel()
                            ->required()
                            ->label('Phone'),
                        TextInput::make('user.password')
                            ->password()
                            ->required()
                            ->label('Password')
                    ]),
                Section::make('More Details')
                    ->schema([
                        TextInput::make('speciality')
                            ->required(),
                        TextInput::make('work_place')
                            ->required(),
                        TextInput::make('price')
                            ->required()
                            ->numeric(),
                        Textarea::make('who')
                            ->required(),
                        FileUpload::make('image')
                            ->image()
                            ->required(),
                    ]),
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
