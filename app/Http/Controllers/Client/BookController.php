<?php

namespace App\Http\Controllers\Client;

use App\BogInstallment\BogInstallmentController;
use App\BogPay\BogPay;
use App\BogPay\BogPaymentController;
use App\Cart\Facade\Cart;
use App\Http\Controllers\Controller;
use App\Mail\PromocodeProduct;
use App\Models\Booking;
use App\Models\Car;
use App\Models\Category;
use App\Models\City;
use App\Models\ExtraOption;
use App\Models\MailTemplate;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Page;
use App\Models\Product;
use App\Models\ProductSet;
use App\Models\Setting;
use App\Promocode\Promocode;
use App\SpacePay\SpacePay;
use App\TbcPay\TbcInstallment;
use App\TbcPay\TbcPayment;
use App\TerraPay\TerraPay;
use Doctrine\DBAL\Query\QueryException;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Repositories\Eloquent\ProductRepository;
use Spatie\TranslationLoader\TranslationLoaders\Db;
use Illuminate\Support\Facades\DB as DataBase;
use function Symfony\Component\String\s;
use Barryvdh\DomPDF\Facade\Pdf;

class BookController extends Controller
{

    protected $productRepository;



    public function __construct(ProductRepository $productRepository){
        $this->productRepository = $productRepository;
    }






    public function order(Request $request,$locale){
        //dd($request->all());
        /*$request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'phone' => 'required',
            'email' => 'required',
            'city' => 'required',
            'address' => 'required',
            'payment_method' => 'required',
            'payment_type' => 'required_if:payment_method,1'
        ]);*/

        if (!session('shipping')){
            return redirect()->back();
        }


        $data = $request->all();
        //if ($bogInstallment) $data['payment_type'] = 'bog_installment';
        $cart = Arr::pull($data,'cart');
        $cart = Cart::getCart();
        $data['locale'] = app()->getLocale();
        $data['grand_total'] = $cart['total'];

        $user = auth()->user();

        $data['first_name'] = $user->name;
        $data['last_name'] = $user->surname;
        $data['email'] = $user->email;
        $data['city'] = City::query()->where('id',session('shipping.city_id'))->first()->title;
        $data['address'] = session('shipping.address');
        $data['info'] = session('shipping.comment');
        $data['payment_method'] = 1;
        $data['user_id'] = $user->id;
        $data['ship_price'] = session('shipping.ship_price');

        $data['phone'] = session('shipping.phone');


        $grand_t = $data['grand_total'];

        //dd($data);

        $delete_promocode = false;
        $product_promocode = false;
        if($promocode = session('promocode')){


            if($promocode->type == 'product'){
                $promocode_products = $promocode->products()->select('id')->get()->pluck('id')->toArray();
                foreach ($cart['products'] as $item){

                    if(in_array($item['product']->parent->id,$promocode_products)){
                        $item['product']['discount'] = $item['product']->parent->promocode->reward;
                        $delete_promocode = true;
                        $product_promocode = true;
                    }
                }
            }

            if($promocode->type == 'cart'){
                $data['discount'] = $promocode->reward;
                $delete_promocode = true;
            }

        }




        //dd($cart);


        if($cart['count'] > 0){


            try {
                DataBase::beginTransaction();
                $order = Order::create($data);

                $data = [];
                $insert = [];
                $product_images = [];
                $product_models = [];
                $product_urlpath = [];
                foreach ($cart['products'] as $item){

                    $data['order_id'] = $order->id;
                    $data['product_id'] = $item['product']['id'];
                    $data['name'] = $item['product']['title'];
                    $data['qty_ordered'] = $item['quantity'];
                    $data['price'] = $item['product']->special_price ? $item['product']->special_price : $item['product']['price'] ;
                    $data['total'] = $data['price'] * $item['quantity'];
                    $data['attributes'] = json_encode($item['product']['attributes']);
                    if ($item['product']->discount){
                        $data['promocode_discount'] = $item['product']->discount;
                    }
                    $insert[] = $data;
                    $product_images[$item['product']->id] = $item['product']->latestImage ? $item['product']->latestImage->file_full_url : '';
                    $product_models[$item['product']->id] = $item['product']->model;
                    $product_urlpath[$item['product']->id] = $item['product']->url_path;
                }
                //dd($insert);
                OrderItem::insert($insert);

                $total = 0;
                foreach ($cart['collections'] as $item){
                    $collection = $order->collections()->create([
                        'product_set_id' => $item['collection']->id,
                        'title' => $item['collection']->title,
                        'total_price' => $item['collection']->special_price ? $item['collection']->special_price : $item['collection']->price
                    ]);
                    foreach ($item['collection']->products as $_item){

                        $product_attributes = $_item->attribute_values;

                        $result = [];

                        foreach ($product_attributes as $_item_){
                            $options = $_item_->attribute->options;
                            $value = '';
                            foreach ($options as $option){
                                if($_item_->attribute->type == 'select'){
                                    if($_item_->integer_value == $option->id) {
                                        if($_item_->attribute->code == 'size'){
                                            $result[$_item_->attribute->code] = $option->value;
                                        }
                                        elseif ($_item_->attribute->code == 'color'){
                                            $result[$_item_->attribute->code] = $option->color;
                                        }
                                        else {
                                            $result[$_item_->attribute->code] = $option->label;
                                        }
                                    }

                                }
                            }

                        }


                        $collection->items()->create([
                            'product_id' => $_item->id,
                            'title' => $_item->title,
                            'price' => $_item->price,
                            'attributes' => json_encode($result)
                        ]);
                    }

                }









                DataBase::commit();

                /*$pdf = Pdf::loadView('client.order.order',compact('order'),[],'UTF-8');

                $pdf->save('order_'. $order->id .'.pdf');

                Mail::to($request->user())->send(new \App\Mail\Order($order));
                unlink('order_'. $order->id .'.pdf');

                foreach ($order->items as $item){

                    $file = 'warranty_'. $item->id .'.pdf';

                    unlink($file);
                }*/

                $_promocode = \App\Models\PromoCode::query()->where('type','cart')->first();
                //dd($promocode);
                if ($_promocode){
                    if($_promocode->status){
                        $promo_gen = new Promocode();
                        $gen = $promo_gen->generateCode();

                        $request->user()->promocode()->create(['promocode_id' => $_promocode->id, 'promocode' => $gen]);
                        $data['product'] = null;
                        $data['text'] = 'cart promocode';
                        $data['code'] = $gen;
                        //Mail::to($request->user())->send(new PromocodeProduct($data));
                    }

                }

                $partner_reward = Setting::query()->where('key','partner_reward')->first();

                if($user->referrer && $partner_reward->integer_value){
                    $user->referrer()->update(['balance' => \Illuminate\Support\Facades\DB::raw('balance + '. ($grand_t * $partner_reward->integer_value) / 100)]);
                }

                //Cart::destroy();
                if(($promo_code = session('promocode')) && $delete_promocode){
                    //dd($promo_code->userPromocode->promocode, $request->user()->promocode()->where('promocode',$promo_code->userPromocode->promocode)->first());
                    $request->user()->promocode()->where('promocode',$promo_code->userPromocode->promocode)->delete();
                }

                session()->forget('promocode');

                if($order->payment_method == 1 && $order->payment_type == 'bog'){
                    return app(BogPaymentController::class)->make_order($order->id,$order->grand_total);
                } elseif($order->payment_method == 1 && $order->payment_type == 'tbc'){
                    $tbcPay = new TbcPayment('cVcrsvTG7A3MWSslK62G9jlGqKxEAyCI','7000998','SVcfMh6VPFIJV47l');
                    $returnUrl = 'https://sshop.ge/' . app()->getLocale() . '/payments/tbc/status?order_id='.$order->id;

                    $installmentProducts = [];
                    foreach ($order->items as $key => $item){
                        $installmentProducts[] = [
                            'Name' => $item->name,
                            'Price' => $item->price,
                            'Quantity' => $item->qty_ordered
                        ];
                    }

                    $resp = $tbcPay->createPayment($order->grand_total,$returnUrl,$order->id,$installmentProducts,route('tbcCallbackStatus'));
                    $resp = \json_decode($resp,true);
                    if(isset($resp['status'])){
                        if ($resp['status'] == 'Created'){
                            $order->update(['tbc_pay_id' => $resp['payId']]);
                            return Inertia::location($resp['links'][1]['uri']);
                        }
                    }

                    //return redirect(locale_route('order.failure',$order->id));
                }
                elseif($order->payment_method == 1 && $order->payment_type == 'terra'){

                    $terra = new TerraPay('0J04');

                    $terra_products = [];

                    //dd($order->items);
                    foreach ($order->items as $key => $item){
                        $terra_products[$key]['name'] = $item->name;
                        $terra_products[$key]['code'] = '';
                        $terra_products[$key]['quantity'] = $item->qty_ordered;
                        $terra_products[$key]['amount'] = $item->qty_ordered * $item->price;
                        $terra_products[$key]['cashAmount'] = $item->qty_ordered * $item->price;
                    }
                    //dd($terra_products);

                    $data = $terra->makeOrder($order->id,$terra_products);



                    $data = json_decode($data,true);
                    if($data['success']){
                        //dd($data);
                        return Inertia::location($terra->redirectUrl($data['storeSessionId']));
                    }
                }
                elseif($order->payment_method == 1 && $order->payment_type == 'bog_installment'){

                    $bog_products = [];

                    //dd($order->items);
                    foreach ($order->items as $key => $item){
                        $bog_products[$key]['item_description'] = $item->name;
                        $bog_products[$key]['item_vendor_code'] = $product_models[$item->product_id];
                        $bog_products[$key]['total_item_qty'] = $item->qty_ordered;
                        $bog_products[$key]['total_item_amount'] = $item->qty_ordered * $item->price;
                        $bog_products[$key]['product_image_url'] = $product_images[$item->product_id];
                        $bog_products[$key]['item_site_detail_url'] = route('proxy',$product_urlpath[$item->product_id]);
                    }
                    //dd($order->payment_type);


                    return app(BogInstallmentController::class)->make_order($order->id,$bog_products,$request);

                }
                elseif($order->payment_method == 1 && $order->payment_type == 'tbc_installment'){
                    $tbcPay = new TbcInstallment('VzlcvfDPoQhAMAMsLmkGKfyfcEXO4LcG','o3F9HKvmDlk4X7pt');
                    $returnUrl = 'https://sshop.ge/' . app()->getLocale() . '/payments/tbc/status?order_id='.$order->id;

                    $installmentProducts = [];
                    foreach ($order->items as $key => $item){
                        $installmentProducts[] = [
                            'name' => $item->name,
                            'price' => floatval($item->price),
                            'quantity' => $item->qty_ordered
                        ];
                    }

                    $resp = $tbcPay->initiateInstallment('000000000-ce21da5e-da92-48f3-8009-4d438cbcc137',204,floatval($order->grand_total),$installmentProducts,$order->id);


                    $resp_json = \json_decode($resp['json'],true);


                    //dd($resp_json);
                    if(isset($resp_json['sessionId'])){

                        $order->update(['tbc_session_id' => $resp_json['sessionId']]);
                        return Inertia::location($resp['headers']['Location'][0]);

                    }
                }
                 else {
                    return redirect(locale_route('order.success',$order->id));
                }

            } catch (QueryException $exception){
                dd($exception->getMessage());
                DataBase::rollBack();
            }


        }


        return redirect()->route('client.home.index');
    }


    public function createBook(Request $request){
        if (!session('booking')){
            return redirect()->back();
        }


        $_data = $request->all();

        $data = [];
        $data['locale'] = app()->getLocale();

        $user = auth()->user();

        $data['name'] = $user->name;
        $data['surname'] = $user->surname;
        $data['email'] = $user->email;
        $data['user_id'] = $user->id;
        $data['phone'] = $user->phone;
        $data['car_id'] = session('booking.car_id');

        $car = Car::with(['translation','latestImage','brand.translation'])->where('id',session('booking.car_id'))->first();

        $options = ExtraOption::with('translation')->whereIn('id',session('booking.options'))->get();

        $data['car'] = ($car->brand?$car->brand->title:'') . ' ' . $car->model;

        $opt_data = [];
        $opt_total_price = 0;
        foreach ($options as $item){
            $opt_data['options'][] = [
                'id' => $item->id,
                'title' => $item->text,
                'price' => $item->price
            ];
            $opt_total_price += $item->price;
        }
        $data['options'] = json_encode($opt_data);

        $diff = Carbon::parse(session('booking.pickup_date'))->diffInDays(session('booking.dropoff_date'));

        $data['grand_total'] = ($diff * $car->price) + $opt_total_price;
        //$data['payment_type'] = $request->post('payment_type');

        Booking::query()->create($data);

    }

    public function bogResponse(Request $request){
        //dump($request->order_id);
        $order = Order::query()->where('id',$request->get('order_id'))->first();

        //dd($order);
        if($order->status == 'success') return redirect(locale_route('order.success',$order->id));
        else if($order->status == 'error') return redirect(route('order.failure'));
        else {
            sleep(3);
            return redirect('https://sshop.ge/' . app()->getLocale() . '/payments/bog/status?order_id='.$order->id);
        }
    }

    public function tbcResponse(Request $request){
        //dump($request->order_id);
        $order = Order::query()->where('id',$request->get('order_id'))->first();

        //dd($order);
        if($order->status == 'success') return redirect(locale_route('order.success',$order->id));
        else if($order->status == 'error') return redirect(route('order.failure'));
        else {
            sleep(3);
            return redirect('https://sshop.ge/' . app()->getLocale() . '/payments/tbc/status?order_id='.$order->id);
        }
    }

    public function statusSuccess($order_id){
        $order = Order::query()->where('id',$order_id)->with('items')->first();
        return Inertia::render('PaymentSuccess',['order' => $order])->withViewData([
            'meta_title' => 'success',
            'meta_description' => 'success',
            'meta_keyword' => 'success',
            "image" => '',
            'og_title' => 'success',
            'og_description' => 'success',
        ]);
    }

    public function statusFail($order_id){
        return Inertia::render('PaymentFail',[])->withViewData([
            'meta_title' => 'success',
            'meta_description' => 'success',
            'meta_keyword' => 'success',
            "image" => '',
            'og_title' => 'success',
            'og_description' => 'success',
        ]);
    }

}
