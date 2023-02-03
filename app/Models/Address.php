<?php

namespace App\Models;

use App\Models\Translations\AddressTranslation;
use App\Models\Translations\FaqTranslation;
use App\Models\Translations\SettingTranslation;
use App\Traits\ScopeFilter;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use Translatable, HasFactory, ScopeFilter;


    protected $table = 'addresses';

    protected $fillable = [
        'status',
        'data',
        'price'
    ];


    protected $translationModel = AddressTranslation::class;

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

    public function country(){
        return $this->belongsTo(Country::class);
    }

    public function city(){
        return $this->belongsTo(City::class);
    }

}
