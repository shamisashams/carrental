<?php

namespace App\Http\Controllers\Client;

use App\Cart\Facade\Cart;
use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\Category;
use App\Models\City;
use App\Models\ExtraOption;
use App\Models\Page;
use App\Models\Product;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\Eloquent\ProductRepository;
use Spatie\TranslationLoader\TranslationLoaders\Db;

class PaymentController extends Controller
{

    protected $productRepository;

    public function __construct(ProductRepository $productRepository){

        $this->productRepository = $productRepository;

    }

    /**
     * @param string $locale
     * @param Request $request
     * @return Application|Factory|View
     */
    public function index(string $locale, Request $request)
    {



        if(!session('booking')) return redirect()->back()->with('error','fill all');
        $page = Page::where('key', 'payment')->firstOrFail();


        $images = [];
        foreach ($page->sections as $sections){
            if($sections->file){
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }

        }

        $booking = [];

        $car = Car::with(['translation','latestImage','brand.translation'])->where('id',session('booking.car_id'))->first();

        if($car){
            $booking['car'] = $car;
        } else session()->forget('booking');
        if(!empty(session('booking.options'))){
            $booking['options'] = ExtraOption::with('translation')->whereIn('id',session('booking.options'))->get();
        }

        //dd($products);
        return Inertia::render('Payment/Payment',[
            'images' => $images,
            'page' => $page,
            'booking' => $booking,
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




    public function createBooking(Request $request){
        $request->validate([
            'car_id' => 'required',
            //'pickup_loc' => 'required',
            //dropoff_loc' => 'required',
            //'pickup_date' => 'required',
            //'dropoff_date' => 'required'
        ]);

        session()->put(['booking' => $request->all()]);
        if(session('booking')) return redirect()->route('client.payment.index');
    }

}
