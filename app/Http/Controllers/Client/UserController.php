<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Certificate;
use App\Models\Order;
use App\Models\Page;
use App\Repositories\Eloquent\UserRepository;
use App\Rules\MatchOldPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Repositories\Eloquent\GalleryRepository;

class UserController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository){
        $this->userRepository = $userRepository;
    }

    public function index()
    {
        $page = Page::where('key', 'about')->firstOrFail();

        $images = [];
        foreach ($page->sections as $sections){
            if($sections->file){
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }

        }

        $files = [];
        if($page->images) $files = $page->files;

        //dd(Booking::query()->where('user_id',auth()->id())->whereIn('status',['canceled','finished'])->get());

        return Inertia::render('Cabinet/Cabinet', [
            'current_booking' => Booking::query()->where('user_id',auth()->id())->where('status','pending')->orderBy('id','desc')->get(),
            'bookings' => Booking::query()->where('user_id',auth()->id())->whereIn('status',['canceled','finished'])->get(),
            "page" => $page,
            "seo" => [
            "title"=>$page->meta_title,
            "description"=>$page->meta_description,
            "keywords"=>$page->meta_keyword,
            "og_title"=>$page->meta_og_title,
            "og_description"=>$page->meta_og_description,
//            "image" => "imgg",
//            "locale" => App::getLocale()
        ], 'gallery_img' => $files,'images' => $images])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }

    public function saveSettings(Request $request){

        //dd($request->all());
        $data = $request->validate([
            'name' => 'required',
            'surname' => 'required',
            'phone' => 'required',
            'email' => 'required|email|unique:users,email,' . auth()->id(),
        ]);

        if($request->post('password_old')){
            $data = $request->validate([
                'password' => 'min:3',
                'password_repeat' => 'same:password',
                'password_old' => ['required',new MatchOldPassword()]
            ]);

            //dd($data);

            $data['password'] = Hash::make($data['password']);
        }
        //dd($data);

        auth()->user()->update($data);
        return redirect()->back()->with('success',__('client.success_saved'));
    }

    public function cancelBooking(Request $request,$locale, $booking){
        //dd($booking);
        $request->validate([
            'password' => ['required',new MatchOldPassword()]
        ]);
        $book =  Booking::query()->where('id',$booking)->where('user_id',auth()->id())->first();
        if(!$book){
            return back()->with('error','wrong booking');
        }
        $book->update(['status'=>'canceled']);
        return back()->with('success','booking canceled');
    }



    public function orders(){
        $page = Page::where('key', 'about')->firstOrFail();

        $images = [];
        foreach ($page->sections as $sections){
            if($sections->file){
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }

        }

        $files = [];
        if($page->images) $files = $page->files;

        //dd($files);

        return Inertia::render('OrderHistory', [
            "orders" => auth()->user()->orders()->orderBy('created_at','desc')->paginate(1),
            "page" => $page, "seo" => [
            "title"=>$page->meta_title,
            "description"=>$page->meta_description,
            "keywords"=>$page->meta_keyword,
            "og_title"=>$page->meta_og_title,
            "og_description"=>$page->meta_og_description,
//            "image" => "imgg",
//            "locale" => App::getLocale()
        ], 'gallery_img' => $files,'images' => $images])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }
    public function orderDetails($locale, $order_id){
        //dd($order);
        $page = Page::where('key', 'about')->firstOrFail();

        $images = [];
        foreach ($page->sections as $sections){
            if($sections->file){
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }

        }

        $files = [];
        if($page->images) $files = $page->files;


        $order = auth()->user()->orders()->where('id',$order_id)->with(['items','collections','collections.items'])->firstOrFail();

        //dd($order);

        return Inertia::render('RegularOrderDetails', [
            "order" => $order,
            "page" => $page, "seo" => [
            "title"=>$page->meta_title,
            "description"=>$page->meta_description,
            "keywords"=>$page->meta_keyword,
            "og_title"=>$page->meta_og_title,
            "og_description"=>$page->meta_og_description,
//            "image" => "imgg",
//            "locale" => App::getLocale()
        ], 'gallery_img' => $files,'images' => $images])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }

    public function invoice($locale, $order_id){
        //dd($order);
        $page = Page::where('key', 'about')->firstOrFail();

        $images = [];
        foreach ($page->sections as $sections){
            if($sections->file){
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }

        }

        $files = [];
        if($page->images) $files = $page->files;


        $order = auth()->user()->orders()->where('id',$order_id)->with(['items','collections','collections.items'])->firstOrFail();

        //dd($order);

        return Inertia::render('Invoice', [
            "order" => $order,
            "page" => $page, "seo" => [
                "title"=>$page->meta_title,
                "description"=>$page->meta_description,
                "keywords"=>$page->meta_keyword,
                "og_title"=>$page->meta_og_title,
                "og_description"=>$page->meta_og_description,
//            "image" => "imgg",
//            "locale" => App::getLocale()
            ], 'gallery_img' => $files,'images' => $images])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }

    public function uploadImg(Request $request){

        $this->userRepository->uploadId(auth()->user(),$request);
        $this->userRepository->uploadDrl(auth()->user(),$request);
        return back()->with('success','file uploaded');
    }
}
