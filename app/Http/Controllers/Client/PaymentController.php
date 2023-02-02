<?php

namespace App\Http\Controllers\Client;

use App\Cart\Facade\Cart;
use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\Booking;
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
use Illuminate\Support\Carbon;

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

        $options = ExtraOption::with('translation')->whereIn('id',session('booking.options'))->get();

        if($car){
            $booking['car'] = $car;
        } else session()->forget('booking');
        if(!empty(session('booking.options'))){
            $booking['options'] = ExtraOption::with('translation')->whereIn('id',session('booking.options'))->get();
        }
        $diff = Carbon::parse(session('booking.pickup_date'))->diffInDays(session('booking.dropoff_date'));

        $opt_total_price = 0;
        $opt_data = [];
        foreach ($options as $item){
            $opt_data[] = [
                'id' => $item->id,
                'title' => $item->text,
                'price' => $item->price_per_day?$item->price * $diff:$item->price,
                'per_day' => $item->price_per_day,
            ];
            $opt_total_price += $item->price_per_day?$item->price * $diff:$item->price;
        }

        $pickup_address = Address::with('translation')->where('id',session('booking.pickup_id'))->first();
        $dropoff_address = Address::with('translation')->where('id',session('booking.dropoff_id'))->first();

        $booking['drop_pay'] = null;

        if (session('booking.pickup_id') != session('booking.dropoff_id')){
            $booking['drop_pay'] = $dropoff_address;
        }

        $drop_pay = 0;
        if($booking['drop_pay'])$drop_pay = $booking['drop_pay']->price;

        $booking['car_price_total'] = ($diff * $car->price);
        $booking['options'] = $opt_data;
        $booking['grand_total'] = $booking['car_price_total'] + $opt_total_price + $drop_pay;
        $booking['period'] = $diff;

        $booking['pickup_address'] = $pickup_address;
        $booking['dropoff_address'] = $dropoff_address;

        $booking['pickup_date'] = date('M d, Y',strtotime(session('booking.pickup_date')));
        $booking['pickup_time'] = date('H:i',strtotime(session('booking.pickup_date')));
        $booking['dropoff_date'] = date('M d, Y',strtotime(session('booking.dropoff_date')));
        $booking['dropoff_time'] = date('H:i',strtotime(session('booking.dropoff_date')));

        //dd(session('booking'),$diff,$booking);


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
        dd($request->all());
        $data = $request->validate([
            'car_id' => 'required',
            'pickup_id' => 'required',
            'pickup_date' => 'required',
            'dropoff_date' => 'required',
            'pickup_time' => 'required',
            'dropoff_time' => 'required'
        ]);

        if ($request['same_address']){
            $data['dropoff_id'] = $data['pickup_id'];
        } else {
            $request->validate([
                'dropoff_id' => 'required',
            ]);
            $data['dropoff_id'] = $request->post('dropoff_id');
        }

        //dd($data);
        //$booking_count = Booking::query()->where('car_id',$data['car_id'])->whereIn('status',['pending'])->count();
        //if ($booking_count > 0) return redirect()->back()->with('error','not available now');

        $data['pickup_date'] = $data['pickup_date'].' '.$data['pickup_time'] . ':00';
        $data['dropoff_date'] = $data['dropoff_date'].' '.$data['dropoff_time'] . ':00';
        //$data['pickup_id'] = 1;
        //$data['dropoff_id'] = 2;
        unset($data['pickup_time'],$data['dropoff_time']);
        $data['options'] = $request->post('options');

        //dd($data);

        session()->put(['booking' => $data]);
        if(session('booking')) return redirect()->route('client.payment.index');
    }

}
