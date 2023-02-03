<?php

namespace App\Models\Translations;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CountryTranslation extends BaseTranslationModel
{
    use HasFactory;
    protected $fillable = [
        'title',
    ];
}
