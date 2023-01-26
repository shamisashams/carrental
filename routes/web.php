<?php
/**
 *  routes/web.php
 *
 * Date-Time: 03.06.21
 * Time: 15:41
 * @author Insite LLC <hello@insite.international>
 */

use App\Http\Controllers\Admin\Auth\LoginController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\LanguageController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\TranslationController;
use App\Http\Controllers\CKEditorController;
use App\Http\Controllers\Client\HomeController;
use App\Http\Controllers\Client\ContactController;
use App\Http\Controllers\Client\AboutUsController;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;

Route::post('ckeditor/image_upload', [CKEditorController::class, 'upload'])->withoutMiddleware('web')->name('upload');

Route::any('bog/callback/status', [\App\BogPay\BogCallbackController::class, 'status'])->withoutMiddleware('web')->name('bogCallbackStatus');
Route::any('bog/callback/refund',[\App\BogPay\BogCallbackController::class, 'refund'])->withoutMiddleware('web')->name('bogCallbackRefund');

Route::any('space/callback/status', [\App\SpacePay\SpaceCallbackController::class, 'status'])->withoutMiddleware('web')->name('spaceCallbackStatus');

Route::any('tbc/callback', [\App\TbcPay\TbcCallbackController::class, 'status'])->withoutMiddleware('web')->name('tbcCallbackStatus');




Route::redirect('', config('translatable.fallback_locale'));
Route::prefix('{locale?}')
    ->group(function () {
        Route::prefix('adminpanel')->group(function () {
            Route::get('login', [LoginController::class, 'loginView'])->name('loginView');
            Route::post('login', [LoginController::class, 'login'])->name('login');


            Route::middleware(['auth','is_admin'])->group(function () {
                Route::get('logout', [LoginController::class, 'logout'])->name('logout');

                Route::redirect('', 'adminpanel/car');

                // Language
                Route::resource('language', LanguageController::class);
                Route::get('language/{language}/destroy', [LanguageController::class, 'destroy'])->name('language.destroy');

                // Translation
                Route::resource('translation', TranslationController::class);

                // Category
                Route::resource('category', \App\Http\Controllers\Admin\CategoryController::class);
                Route::get('category/{category}/destroy', [\App\Http\Controllers\Admin\CategoryController::class, 'destroy'])->name('category.destroy');

//
                // Product
                Route::resource('car', \App\Http\Controllers\Admin\CarController::class);
                Route::get('car/{car}/destroy', [\App\Http\Controllers\Admin\CarController::class, 'destroy'])->name('car.destroy');

//
                Route::resource('faq', \App\Http\Controllers\Admin\FaqController::class);
                Route::get('faq/{faq}/destroy', [\App\Http\Controllers\Admin\FaqController::class, 'destroy'])->name('faq.destroy');

                Route::resource('address', \App\Http\Controllers\Admin\AddressController::class);
                Route::get('address/{address}/destroy', [\App\Http\Controllers\Admin\AddressController::class, 'destroy'])->name('address.destroy');

                Route::resource('extra_option', \App\Http\Controllers\Admin\ExtraOptionController::class);
                Route::get('extra_option/{extra_option}/destroy', [\App\Http\Controllers\Admin\ExtraOptionController::class, 'destroy'])->name('extra_option.destroy');

                Route::resource('feature', \App\Http\Controllers\Admin\FeatureController::class);
                Route::get('feature/{feature}/destroy', [\App\Http\Controllers\Admin\FeatureController::class, 'destroy'])->name('feature.destroy');

                Route::resource('destination', \App\Http\Controllers\Admin\DestinationController::class);
                Route::get('destination/{destination}/destroy', [\App\Http\Controllers\Admin\DestinationController::class, 'destroy'])->name('destination.destroy');


//                // Gallery
                Route::resource('gallery', GalleryController::class);
                Route::get('gallery/{gallery}/destroy', [GalleryController::class, 'destroy'])->name('gallery.destroy');



                // Slider
                Route::resource('slider', SliderController::class);
                Route::get('slider/{slider}/destroy', [SliderController::class, 'destroy'])->name('slider.destroy');

                // Page
                Route::resource('page', PageController::class);
                Route::get('page/{page}/destroy', [PageController::class, 'destroy'])->name('page.destroy');


                Route::get('setting/active',[SettingController::class,'setActive'])->name('setting.active');
                // Setting
                Route::resource('setting', SettingController::class);
                Route::get('setting/{setting}/destroy', [SettingController::class, 'destroy'])->name('setting.destroy');




                // Password
                Route::get('password', [\App\Http\Controllers\Admin\PasswordController::class, 'index'])->name('password.index');
                Route::post('password', [\App\Http\Controllers\Admin\PasswordController::class, 'update'])->name('password.update');

                Route::resource('attribute', \App\Http\Controllers\Admin\AttributeController::class);
                Route::get('attribute/{attribute}/destroy', [\App\Http\Controllers\Admin\AttributeController::class, 'destroy'])->name('attribute.destroy');

                Route::resource('brand', \App\Http\Controllers\Admin\BrandController::class);
                Route::get('brand/{brand}/destroy', [\App\Http\Controllers\Admin\BrandController::class, 'destroy'])->name('brand.destroy');


                Route::resource('car_type', \App\Http\Controllers\Admin\CarTypeController::class);
                Route::get('car_type/{car_type}/destroy', [\App\Http\Controllers\Admin\CarTypeController::class, 'destroy'])->name('car_type.destroy');

                Route::resource('transmission', \App\Http\Controllers\Admin\TransmissionController::class);
                Route::get('transmission/{transmission}/destroy', [\App\Http\Controllers\Admin\TransmissionController::class, 'destroy'])->name('transmission.destroy');

                Route::resource('fuel', \App\Http\Controllers\Admin\TransmissionController::class);
                Route::get('fuel/{fuel}/destroy', [\App\Http\Controllers\Admin\TransmissionController::class, 'destroy'])->name('fuel.destroy');



                Route::resource('user', \App\Http\Controllers\Admin\UserController::class);
                Route::get('user/{user}/destroy', [\App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('user.destroy');





                Route::get('mail-templates',[\App\Http\Controllers\Admin\MailTemplateController::class,'index'])->name('mail-template.index');
                Route::put('mail-templates/update',[\App\Http\Controllers\Admin\MailTemplateController::class,'update'])->name('mail-template.update');



            });
        });


        Route::get('login',[\App\Http\Controllers\Client\AuthController::class,'loginView'])->name('client.login.index')->middleware('guest_client');
        Route::post('login',[\App\Http\Controllers\Client\AuthController::class,'login'])->name('client.login');
        Route::get('registration',[\App\Http\Controllers\Client\AuthController::class,'registrationView'])->name('client.registration.index');
        Route::post('registration',[\App\Http\Controllers\Client\AuthController::class,'createAccount'])->name('client.register');

        Route::get('registration/success',[\App\Http\Controllers\Client\AuthController::class,'registerSuccess'])->name('client.register.success');

        Route::get('logout',[\App\Http\Controllers\Client\AuthController::class,'logout'])->name('logout');





        Route::get('/forgot-password', [\App\Http\Controllers\Client\AuthController::class,'forgotPassword'])->middleware('guest')->name('password.request');

        Route::post('/forgot-password', function (Request $request) {
            //dd($request->all());
            $request->validate(['email' => 'required|email']);

            $status = Password::sendResetLink(
                $request->only('email')
            );

            //dd($status);
            return $status === Password::RESET_LINK_SENT
                ? back()->with(['success' => __($status)])
                : back()->withErrors(['email' => __($status)]);
        })->middleware('guest')->name('password.email');

        Route::get('/reset-password/{token}', [\App\Http\Controllers\Client\AuthController::class,'resetPassword'])->middleware('guest')->name('password.reset');

        Route::post('/reset-password', function (Request $request) {
            //dd($request->all());
            $request->validate([
                'token' => 'required',
                'email' => 'required|email',
                'password' => 'required|min:8|confirmed',
            ]);

            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function ($user, $password) {
                    $user->forceFill([
                        'password' => Hash::make($password)
                    ])->setRememberToken(Str::random(60));

                    $user->save();

                    event(new PasswordReset($user));
                }
            );

            //dd($status);

            return $status === Password::PASSWORD_RESET
                ? redirect()->route('client.login')->with('success', __($status))
                : back()->withErrors(['email' => [__($status)]]);
        })->middleware('guest')->name('password.update');



        Route::middleware(['auth_client'])->group(function (){
            Route::get('account',[\App\Http\Controllers\Client\UserController::class,'index'])->name('client.cabinet');
            Route::get('account/orders',[\App\Http\Controllers\Client\UserController::class,'orders'])->name('client.orders');
            Route::get('account/order/{order}/details',[\App\Http\Controllers\Client\UserController::class,'orderDetails'])->name('client.order-details');
            Route::get('favorites',[\App\Http\Controllers\Client\CarController::class,'index'])->name('client.favorite.index');
            Route::post('favorites',[\App\Http\Controllers\Client\CarController::class,'addToWishlist'])->name('client.favorite.add');
            Route::post('favorites-set',[\App\Http\Controllers\Client\CarController::class,'addToWishlistCollection'])->name('client.favorite.add-set');
            Route::get('favorites/remove',[\App\Http\Controllers\Client\CarController::class,'removeFromWishlist'])->name('client.favorite.remove');
            Route::post('apply-promocode',[\App\Http\Controllers\Client\CartController::class,'applyPromocode'])->name('apply-promocode');

            Route::post('checkout',[\App\Http\Controllers\Client\OrderController::class,'order'])->name('client.checkout.order');
            Route::post('settings',[\App\Http\Controllers\Client\UserController::class,'saveSettings'])->name('client.save-settings');
            Route::get('invoice/{order}',[\App\Http\Controllers\Client\UserController::class,'invoice'])->name('client.invoice');
        });
        Route::post('shipping-submit',[\App\Http\Controllers\Client\ShippingController::class,'submitShipping'])->name('shipping-submit');



        Route::get('sipping',[\App\Http\Controllers\Client\ShippingController::class,'index'])->name('client.shipping.index');

        Route::get('payment',[\App\Http\Controllers\Client\PaymentController::class,'index'])->name('client.payment.index');

        Route::any('bog/installment',[\App\Http\Controllers\Client\OrderController::class,'order'])->name('bogInstallment')->middleware('auth_client');



            // Home Page
            Route::get('', [HomeController::class, 'index'])->name('client.home.index');



            // Contact Page
            Route::get('/contact', [ContactController::class, 'index'])->name('client.contact.index');
            Route::post('/contact-us', [ContactController::class, 'mail'])->name('client.contact.mail');


            // About Page
            Route::get('about', [AboutUsController::class, 'index'])->name('client.about.index');

        Route::get('FAQ', [\App\Http\Controllers\Client\FaqController::class, 'index'])->name('client.faq.index');

        Route::get('cars', [\App\Http\Controllers\Client\CarController::class, 'index'])->name('client.car.index');
        Route::get('car/{car}', [\App\Http\Controllers\Client\CarController::class, 'show'])->name('client.car.show');

            Route::get('terms-conditions', [\App\Http\Controllers\Client\TermController::class, 'index'])->name('client.terms');



            Route::get('news', [\App\Http\Controllers\Client\NewsController::class, 'index'])->name('client.news.index');
            Route::get('news/{news}', [\App\Http\Controllers\Client\NewsController::class, 'show'])->name('client.news.show');

        Route::get('destinations', [\App\Http\Controllers\Client\DestinationController::class, 'index'])->name('client.destination.index');
        Route::get('destination/{destination}', [\App\Http\Controllers\Client\DestinationController::class, 'show'])->name('client.destination.show');



            //checkout

            Route::get('checkout',[\App\Http\Controllers\Client\OrderController::class,'index'])->name('client.checkout.index');

            Route::get('order/success',[\App\Http\Controllers\Client\OrderController::class,'statusSuccess'])->name('order.success');
            Route::get('order/failure',[\App\Http\Controllers\Client\OrderController::class,'statusFail'])->name('order.failure');

            Route::get('search', [\App\Http\Controllers\Client\SearchController::class, 'index'])->name('search.index');

            Route::any('payments/bog/status',[\App\Http\Controllers\Client\OrderController::class, 'bogResponse'])->name('bogResponse');

            Route::any('payments/tbc/status',[\App\Http\Controllers\Client\OrderController::class, 'tbcResponse'])->name('tbcResponse');

            /*Route::get('test/{method}',function ($locale,$method,\App\Http\Controllers\TestController $testController){

                return $testController->{$method}();
            });

            Route::post('test/filter',[\App\Http\Controllers\TestController::class,'filter']);*/
            Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
                $request->fulfill();

                return redirect(route('client.cabinet'));
            })->middleware(['auth_client', /*'signed'*/])->name('verification.verify');

            Route::post('/email/verification-notification', function (Request $request) {
                $request->user()->sendEmailVerificationNotification();

                return back()->with('success', 'Verification link sent!');
            })->middleware(['auth_client', 'throttle:6,1'])->name('verification.send');




        //Social-------------------------------------------------------
        Route::get('/auth/facebook/redirect', function () {
            return Socialite::driver('facebook')->redirect();
        })->name('fb-redirect');

        Route::get('/auth/facebook/callback', function () {
            //dd('jdfhgjdhjf urkl');
            $facebookUser = Socialite::driver('facebook')->stateless()->user();

            //dd($facebookUser);

            if ($facebookUser->email !== null) {
                $email = $facebookUser->email;

                $user = User::query()->where('email', $email)->first();

                if($user){
                    $user->update([
                        //'name' => $facebookUser->name,
                        'facebook_id' => $facebookUser->id,
                        'facebook_token' => $facebookUser->token,
                        'facebook_refresh_token' => $facebookUser->refreshToken,
                        'avatar' => $facebookUser->avatar
                    ]);
                } else {
                    $user = User::query()->create([
                        'email' => $email,
                        'name' => $facebookUser->name,
                        'facebook_id' => $facebookUser->id,
                        'facebook_token' => $facebookUser->token,
                        'facebook_refresh_token' => $facebookUser->refreshToken,
                        'avatar' => $facebookUser->avatar,
                        'affiliate_id' => (string) Str::uuid()
                    ]);
                }
            } else {


                $user = User::query()->where('facebook_id', $facebookUser->id)->first();

                if($user){
                    $user->update([
                        //'name' => $facebookUser->name,
                        'facebook_token' => $facebookUser->token,
                        'facebook_refresh_token' => $facebookUser->refreshToken,
                        'avatar' => $facebookUser->avatar
                    ]);
                } else {
                    $email = uniqid();
                    $user = User::query()->create([
                        'email' => $email,
                        'name' => $facebookUser->name,
                        'facebook_id' => $facebookUser->id,
                        'facebook_token' => $facebookUser->token,
                        'facebook_refresh_token' => $facebookUser->refreshToken,
                        'avatar' => $facebookUser->avatar,
                        'affiliate_id' => (string) Str::uuid()
                    ]);
                }
            }




            //dd($user);

            Auth::login($user);

            return redirect(route('client.cabinet'));
        })->name('fb-callback');

        Route::get('/auth/google/redirect', function () {
            return Socialite::driver('google')->redirect();
        })->name('google-redirect');

        Route::get('/auth/google/callback', function () {
            $googleUser = Socialite::driver('google')->user();

            $user = User::query()->where('email', $googleUser->email)->first();

            if($user){
                $user->update([
                    //'name' => $googleUser->name,
                    'google_id' => $googleUser->id,
                    'google_token' => $googleUser->token,
                    'google_refresh_token' => $googleUser->refreshToken,
                    'avatar' => $googleUser->avatar,
                ]);
            } else {
                $user = User::query()->create([
                    'email' => $googleUser->email,
                    'name' => $googleUser->name,
                    'google_id' => $googleUser->id,
                    'google_token' => $googleUser->token,
                    'google_refresh_token' => $googleUser->refreshToken,
                    'avatar' => $googleUser->avatar,
                    'affiliate_id' => (string) Str::uuid()
                ]);
            }

            //dd($googleUser);



            //dd($user);

            Auth::login($user);

            return redirect(route('client.cabinet'));
        })->name('google-callback');
        //--------------------------------------------------------------------------



        Route::fallback(\App\Http\Controllers\Client\ProxyController::class . '@index')->name('proxy');
    });


