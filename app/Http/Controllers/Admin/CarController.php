<?php
/**
 *  app/Http/Controllers/Admin/ProductController.php
 *
 * Date-Time: 30.07.21
 * Time: 10:37
 * @author Insite LLC <hello@insite.international>
 */

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProductRequest;
use App\Models\Attribute;
use App\Models\AttributeOption;
use App\Models\Brand;
use App\Models\Car;
use App\Models\CarType;
use App\Models\Category;
use App\Models\CategoryColor;
use App\Models\Product;
use App\Models\ProductAttributeValue;
use App\Models\ProductColor;
use App\Models\ProductSet;
use App\Models\PromoCode;
use App\Models\Stock;
use App\Repositories\CategoryRepositoryInterface;
use App\Repositories\Eloquent\CarRepository;
use App\Repositories\Eloquent\ProductAttributeValueRepository;
use App\Repositories\Eloquent\ProductColorRepository;
use App\Repositories\ProductRepositoryInterface;
use App\Rules\ColorMatch;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use ReflectionException;
use App\Repositories\Eloquent\AttributeRepository;
use function Symfony\Component\Translation\t;
use Illuminate\Database\Eloquent\Builder as Builder_;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class CarController extends Controller
{

    private $carRepository;



    public function __construct(
        CarRepository  $carRepository
    )
    {
        $this->carRepository = $carRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Application|Factory|View
     */
    public function index(Request $request)
    {



        return view('admin.nowa.views.car.index', [
            'data' => $this->carRepository->getData($request, ['translations','latestImage']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Application|Factory|View
     */
    public function create()
    {
        $product = $this->carRepository->model;





        $url = locale_route('car.store', [], false);
        $method = 'POST';

        /*return view('admin.pages.product.form', [
            'product' => $product,
            'url' => $url,
            'method' => $method,
            'categories' => $this->categories
        ]);*/

        return view('admin.nowa.views.car.form', [
            'model' => $product,
            'url' => $url,
            'method' => $method,
            'brands' => Brand::with('translation')->get(),
            'types' => CarType::with('translation')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductRequest $request
     *
     * @return Application|RedirectResponse|Redirector
     * @throws ReflectionException
     */
    public function store(Request $request)
    {


        $request->validate([
            'brand_id' => 'required',
            'car_type_id' => 'required'
        ]);
        //dd($request->all());
        $saveData = $request->except('_token');
        $saveData['status'] = isset($saveData['status']) && (bool)$saveData['status'];





        $product = $this->carRepository->create($saveData);


        // Save Files
        if ($request->hasFile('images')) {
            $product = $this->carRepository->saveFiles($product->id, $request,512,512);
        }

        if ($request->post('base64_img')) {

            $product = $this->carRepository->uploadCropped($request, $product->id);
        }

        $this->carRepository->saveVideo($request);









        return redirect(locale_route('car.edit', $product->id))->with('success', __('admin.create_successfully'));

    }

    /**
     * Display the specified resource.
     *
     * @param string $locale
     * @param Product $product
     *
     * @return Application|Factory|View
     */
    public function show(string $locale, Product $product)
    {
        return view('admin.pages.product.show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param string $locale
     * @param Category $category
     *
     * @return Application|Factory|View
     */
    public function edit(string $locale, Car $car)
    {
        $url = locale_route('car.update', $car->id, false);
        $method = 'PUT';

        /*return view('admin.pages.product.form', [
            'product' => $product,
            'url' => $url,
            'method' => $method,
            'categories' => $this->categories
        ]);*/

        return view('admin.nowa.views.car.form', [
            'model' => $car,
            'url' => $url,
            'method' => $method,
            'brands' => Brand::with('translation')->get(),
            'types' => CarType::with('translation')->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ProductRequest $request
     * @param string $locale
     * @param Product $product
     * @return Application|RedirectResponse|Redirector
     * @throws ReflectionException
     */
    public function update(Request $request, string $locale, Car $car)
    {
        //dd($request->all());

        $request->validate([
            'brand_id' => 'required',
            'car_type_id' => 'required'
        ]);

        //dd($request->all());
        $saveData = Arr::except($request->except('_token'), []);
        $saveData['status'] = isset($saveData['status']) && (bool)$saveData['status'];






        $this->carRepository->update($car->id, $saveData);

        $this->carRepository->saveFiles($car->id, $request, 512,512);









        return redirect(locale_route('car.index', $car->id))->with('success', __('admin.update_successfully'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $locale
     * @param Product $product
     * @return Application|RedirectResponse|Redirector
     */
    public function destroy(string $locale, Product $product)
    {
        if (!$this->productRepository->delete($product->id)) {
            return redirect(locale_route('product.show', $product->id))->with('danger', __('admin.not_delete_message'));
        }
        return redirect(locale_route('product.index'))->with('success', __('admin.delete_message'));
    }


    public function variantCreate(string $locale, Product $product){
        //dd($product);





        $url = locale_route('product.variant.store', [$product], false);
        $method = 'POST';

        /*return view('admin.pages.product.form', [
            'product' => $product,
            'url' => $url,
            'method' => $method,
            'categories' => $this->categories
        ]);*/
        //$product = new Product();

        return view('admin.nowa.views.products.variant-form', [
            'product' => $product,
            'url' => $url,
            'method' => $method,
            'categories' => $this->categories,
            'attributes' => $this->attributeRepository->all(),
            'stocks' => Stock::with('translation')->get(),
            'promocodes' => PromoCode::query()->where('type','product')->get()
        ]);
    }



    public function updateMinMaxPrice($product){
        $prices = [];
        if($product->parent_id === null){
            foreach ($product->variants as $variant){
                $prices[] = $variant->special_price ? $variant->special_price : $variant->price;
            }
            //dd($prices);
            if(!empty($prices)){
                $min_price = min($prices);
                $max_price = max($prices);
                $product->update([
                    'min_price' => $min_price,
                    'max_price' => $max_price
                ]);
            }
        } else {
            foreach ($product->parent->variants as $variant){
                $prices[] = $variant->special_price ? $variant->special_price : $variant->price;
            }
            //dd($prices);
            if(!empty($prices)){
                $min_price = min($prices);
                $max_price = max($prices);
                $product->parent()->update([
                    'min_price' => $min_price,
                    'max_price' => $max_price
                ]);
            }
        }


    }

    public function uploadCropped(Request $request, $locale, Product $product){
        $this->productRepository->uploadCropped($request, $product->id);
    }








}
