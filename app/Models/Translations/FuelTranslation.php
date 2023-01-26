<?php

namespace App\Models\Translations;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FuelTranslation extends BaseTranslationModel
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description'
    ];
}
