<?php

namespace App\Models;

use App\Models\Translations\PageSectionTranslation;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class PageSection extends Model
{
    use HasFactory,Translatable;

    protected $table = "page_sections";

    protected $fillable = [
        'page_id',
        'link',
        'bg_color'
    ];

    protected $translationModel = PageSectionTranslation::class;

    public $translatedAttributes = [
        'title',
        'text',
    ];

    //protected $with = 'file';

    public function page(){
        return $this->belongsTo(Page::class);
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
}
