<?php

namespace App\Models;

use App\Models\Translations\CityTranslation;
use App\Models\Translations\SliderTranslation;
use App\Traits\ScopeFilter;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductColor extends Model
{
    use HasFactory, ScopeFilter;


    protected $table = 'product_colors';


    protected $fillable = [
        'product_id',
        'color',
    ];




    public function getFilterScopes(): array
    {
        return [
            'id' => [
                'hasParam' => true,
                'scopeMethod' => 'id'
            ],
            'status' => [
                'hasParam' => true,
                'scopeMethod' => 'status'
            ],
            'title' => [
                'hasParam' => true,
                'scopeMethod' => 'titleTranslation'
            ]
        ];
    }

    public function files(): MorphMany
    {
        return $this->morphMany(File::class, 'fileable');
    }
    /**
     * @return MorphOne
     */
    public function file(): MorphOne
    {
        return $this->morphOne(File::class, 'fileable');
    }

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
