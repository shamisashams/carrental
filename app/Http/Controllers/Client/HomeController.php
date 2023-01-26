<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\Category;
use App\Models\Destination;
use App\Models\News;
use App\Models\Page;
use App\Models\Partner;
use App\Models\Product;
use App\Models\ProductSet;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use App\Repositories\Eloquent\ProductRepository;


class HomeController extends Controller
{
    public function index(Request $request)
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

        $destinations_q = Destination::with(['translation','latestImage']);

        if($tags = $request->get('tag')){
            $tags = explode(',',$tags);
            $destinations_q->leftJoin('destination_categories','destination_categories.destination_id','destinations.id');
            $destinations_q->whereIn('destination_categories.category_id',$tags);
            $destinations_q->groupBy('destinations.id');
        }

        $destinations = $destinations_q->limit(3)->inRandomOrder()->get();
        //dd($destinations);

        $categories = Category::with('translation')->where('status',1)->get();

        $cars = Car::with(['translation','latestImage','brand.translation','carType.translation','bag.translation','transmission.translation','fuel.translation'])->where('special',1)->limit(6)->inRandomOrder()->get();


        return Inertia::render('Home/Home', [
            'cars' => $cars,
            'destinations' => $destinations,
            'categories' => $categories,
            "sliders" => $sliders,
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
