<?php

namespace App\Models;

use App\Models\Translations\FaqTranslation;
use App\Models\Translations\SettingTranslation;
use App\Traits\ScopeFilter;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class Faq extends Model
{
    use Translatable, HasFactory, ScopeFilter;


    protected $table = 'faqs';

    protected $guarded = [
        'created_at',
        'updated_at'
    ];


    protected $translationModel = FaqTranslation::class;

    public $translatedAttributes = [
        'question',
        'answer'
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
