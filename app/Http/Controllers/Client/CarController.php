<?php

namespace App\Http\Controllers\Client;

use App\Cart\Facade\Cart;
use App\Http\Controllers\Controller;
use App\Mail\PromocodeProduct;
use App\Models\Bag;
use App\Models\Car;
use App\Models\CarType;
use App\Models\Category;
use App\Models\ExtraOption;
use App\Models\Feature;
use App\Models\Fuel;
use App\Models\MailTemplate;
use App\Models\Page;
use App\Models\Product;
use App\Models\Transmission;
use App\Promocode\Promocode;
use App\Repositories\Eloquent\CarRepository;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\Eloquent\ProductRepository;
use Spatie\TranslationLoader\TranslationLoaders\Db;
use Illuminate\Support\Facades\Mail;

class CarController extends Controller
{

    protected $carRepository;

    public function __construct(CarRepository $carRepository){
        $this->carRepository = $carRepository;
    }

    /**
     * @param string $locale
     * @param Request $request
     * @return Application|Factory|View
     */
    public function index(string $locale, Request $request)
    {
        $page = Page::where('key', 'cars')->firstOrFail();
        $cars = $this->carRepository->getAll();

        $images = [];
        foreach ($page->sections as $sections){
            if($sections->file){
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }

        }

        //dd($cars);

        $carTypes = CarType::with('translation')->has('cars')->get();

        $fuelTypes = Fuel::with('translation')->has('cars')->get();

        $transmissions = Transmission::with('translation')->has('cars')->get();

        $bagTypes = Bag::with('translation')->has('cars')->get();


            //dd($wishlist);
        //dd($products);
        return Inertia::render('Cars/Cars',[
            'carTypes' => $carTypes,
            'fuelTypes' => $fuelTypes,
            'transmissions' => $transmissions,
            'bagTypes' => $bagTypes,
            'cars' => $cars,
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


    /**
     * @param string $locale
     * @param string $slug
     * @return Application|Factory|View
     */
    public function show(string $locale, string $slug)
    {
        //\Illuminate\Support\Facades\DB::enableQueryLog();

        //dd($slug);
        $product = Car::where(['status' => true, 'slug' => $slug])->with(['translation','latestImage','brand.translation'])->firstOrFail();

        $features = Feature::with('translation')->where('status',1)->get();

        $extra_options = ExtraOption::with('translation')->get();


        return Inertia::render('SingleCar/SingleCar',[
            'features' => $features,
            'extra_options' => $extra_options,
            'car' => $product,
            "seo" => [
                "title"=>$product->meta_title,
                "description"=>$product->meta_description,
                "keywords"=>$product->meta_keyword,
                "og_title"=>$product->meta_og_title,
                "og_description"=>$product->meta_og_description,
//            "image" => "imgg",
//            "locale" => App::getLocale()
            ]
        ])->withViewData([
            'meta_title' => $product->meta_title,
            'meta_description' => $product->meta_description,
            'meta_keyword' => $product->meta_keyword,
            "image" => $product->file,
            'og_title' => $product->meta_og_title,
            'og_description' => $product->meta_og_description
        ]);
    }





}
