<?php

namespace App\Http\Controllers\Client;

use App\Cart\Facade\Cart;
use App\Http\Controllers\Controller;
use App\Mail\PromocodeProduct;
use App\Models\Category;
use App\Models\Destination;
use App\Models\MailTemplate;
use App\Models\Page;
use App\Models\Product;
use App\Promocode\Promocode;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\Eloquent\ProductRepository;
use Spatie\TranslationLoader\TranslationLoaders\Db;
use Illuminate\Support\Facades\Mail;

class DestinationController extends Controller
{



    public function __construct(){

    }

    /**
     * @param string $locale
     * @param Request $request
     * @return Application|Factory|View
     */
    public function index(string $locale, Request $request)
    {
        $page = Page::where('key', 'destinations')->firstOrFail();


        $images = [];
        foreach ($page->sections as $sections){
            if($sections->file){
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }

        }





            //dd($wishlist);
        //dd($products);
        return Inertia::render('Destinations/Destinations',[
            'images' => $images,
            'page' => $page,
            "seo" => [
                "title"=>$page->meta_title,
                "description"=>$page->meta_description,
                "keywords"=>$page->meta_keyword,
                "og_title"=>$page->meta_og_title,
                "og_description"=>$page->meta_og_description,
//            "image" => "imgg",
//            "locale" => App::getLocale()
            ]
        ])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }


    public function show(string $locale, string $slug)
    {
        //\Illuminate\Support\Facades\DB::enableQueryLog();


        $blog = Destination::query()->where('slug',$slug)->with(['translation','latestImage'])->firstOrFail();

        //$related_blogs = News::query()->where('id','!=',$blog->id)->with(['translation','latestImage'])->limit(4)->inRandomOrder()->get();

        /*foreach ($blog->products as $product){
            $prices = [];

            foreach ($product->variants as $variant){
                $prices[] = $variant->special_price ? $variant->special_price : $variant->price;
            }

            $product['min_price'] = !empty($prices) ? min($prices) : 0;
        }*/

        return Inertia::render('Destinations/SingleDestination',[
            'product' => null,
            'category_path' => null,
            'similar_products' => null,
            'product_images' => null,
            'product_attributes' => null,
            'news' => $blog,
            "seo" => [
                "title"=>$blog->meta_title,
                "description"=>$blog->meta_description,
                "keywords"=>$blog->meta_keyword,
                "og_title"=>$blog->meta_title,
                "og_description"=>$blog->meta_description,
//            "image" => "imgg",
//            "locale" => App::getLocale()
            ]
        ])->withViewData([
            'meta_title' => $blog->meta_title,
            'meta_description' => $blog->meta_description,
            'meta_keyword' => $blog->meta_keyword,
            "image" => null,
            'og_title' => $blog->meta_title,
            'og_description' => $blog->meta_description,
        ]);
    }


}
