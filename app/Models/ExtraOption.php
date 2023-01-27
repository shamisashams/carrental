<?php

namespace App\Models;

use App\Models\Translations\ExtraOptionTranslation;
use App\Models\Translations\FaqTranslation;
use App\Models\Translations\SettingTranslation;
use App\Traits\ScopeFilter;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class ExtraOption extends Model
{
    use Translatable, HasFactory, ScopeFilter;


    protected $table = 'extra_options';


    protected $fillable = [
        'status',
        'price',
        'price_per_day'
    ];


    protected $translationModel = ExtraOptionTranslation::class;

    public $translatedAttributes = [
        'title',
        'text'
    ];




    public function getFilterScopes(): array
    {
        return [
            'id' => [
                'hasParam' => true,
                'scopeMethod' => 'id'
            ],
            'key' => [
                'hasParam' => true,
                'scopeMethod' => 'key'
            ],
            'value' => [
                'hasParam' => true,
                'scopeMethod' => 'valueTranslation'
            ]
        ];
    }


}
