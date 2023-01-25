<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\Page;
use App\Models\Partner;
use App\Models\Product;
use App\Models\ProductSet;
use App\Models\Slider;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use App\Repositories\Eloquent\ProductRepository;


class HomeController extends Controller
{
    public function index()
    {


        $page = Page::with(['sections.translation'])->where('key', 'home')->firstOrFail();

        $images = [];
        $sections = [];
        foreach ($page->sections as $section){
            if($section->file){
                $images[] = asset($section->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }
            $sections[] = $section;
        }


        $sliders = Slider::query()->where("status", 1)->with(['file', 'translations','desktop','mobile'])->get();
//


        return Inertia::render('Home/Home', ["sliders" => $sliders,
            "page" => $page, "seo" => [
            "title"=>$page->meta_title,
            "description"=>$page->meta_description,
            "keywords"=>$page->meta_keyword,
            "og_title"=>$page->meta_og_title,
            "og_description"=>$page->meta_og_description,

//            "image" => "imgg",
//            "locale" => App::getLocale()
        ],
            'images' => $images,
            'sections' => $sections,
        ])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);

    }


}
