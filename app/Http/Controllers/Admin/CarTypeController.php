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
use App\Models\Brand;
use App\Models\CarType;
use App\Models\News;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductAttributeValue;
use App\Repositories\CategoryRepositoryInterface;
use App\Repositories\Eloquent\BrandRepository;
use App\Repositories\Eloquent\CarTypeRepository;
use App\Repositories\Eloquent\NewsRepository;
use App\Repositories\Eloquent\ProductAttributeValueRepository;
use App\Repositories\ProductRepositoryInterface;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;
use ReflectionException;
use App\Repositories\Eloquent\AttributeRepository;
use function Symfony\Component\Translation\t;
use Illuminate\Http\Request;

class CarTypeController extends Controller
{




    private $carTypeRepository;


    public function __construct(
        CarTypeRepository $carTypeRepository
    )
    {
        $this->carTypeRepository = $carTypeRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Application|Factory|View
     */
    public function index(ProductRequest $request)
    {
        /*return view('admin.pages.product.index', [
            'products' => $this->productRepository->getData($request, ['translations', 'categories'])
        ]);*/

        return view('admin.nowa.views.car_type.index', [
            'data' => $this->carTypeRepository->getData($request, ['translations'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Application|Factory|View
     */
    public function create()
    {
        $blog = $this->carTypeRepository->model;





        $url = locale_route('car_type.store', [], false);
        $method = 'POST';

        /*return view('admin.pages.product.form', [
            'product' => $product,
            'url' => $url,
            'method' => $method,
            'categories' => $this->categories
        ]);*/

        return view('admin.nowa.views.car_type.form', [
            'model' => $blog,
            'url' => $url,
            'method' => $method,
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
            config('translatable.fallback_locale') . '.title' => 'required',
        ]);
        //dd($request->all());
        $saveData = $request->except('_token');



        $news = $this->carTypeRepository->create($saveData);

        // Save Files
        if ($request->hasFile('images')) {
            $news = $this->carTypeRepository->saveFiles($news->id, $request);
        }






        return redirect(locale_route('car_type.index', $news->id))->with('success', __('admin.create_successfully'));

    }



    /**
     * Show the form for editing the specified resource.
     *
     * @param string $locale
     * @param Category $category
     *
     * @return Application|Factory|View
     */
    public function edit(string $locale, CarType $carType)
    {
        $url = locale_route('car_type.update', $carType->id, false);
        $method = 'PUT';

        /*return view('admin.pages.product.form', [
            'product' => $product,
            'url' => $url,
            'method' => $method,
            'categories' => $this->categories
        ]);*/

        return view('admin.nowa.views.car_type.form', [
            'model' => $carType,
            'url' => $url,
            'method' => $method,
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
    public function update(Request $request, string $locale, CarType $carType)
    {
        $request->validate([
            config('translatable.fallback_locale') . '.title' => 'required',
        ]);
        //dd($request->all());
        $saveData = $request->except('_token');


        //dd($saveData);

        //dd($attributes);

        $this->carTypeRepository->update($carType->id, $saveData);

        $this->carTypeRepository->saveFiles($carType->id, $request);



        //$blog->products()->sync($saveData['product_id'] ?? []);





        return redirect(locale_route('car_type.index', $carType->id))->with('success', __('admin.update_successfully'));
    }


    public function getProducts(Request $request){
        $params = $request->all();
        if(isset($params['term'])){
            $query = Product::where(function ($tQ) use ($params){
                $tQ->whereTranslationLike('title', '%'.$params['term'].'%')
                    ->orWhereTranslationLike('description', '%'.$params['term'].'%');
            });

        }
        $query->where('parent_id',null);

        $data = $query->limit(10)->get();

        $li = '';
        foreach ($data as $item){
            $li .= '<li>';
            $li .= '<a href="javascript:void(0)" data-sel_product="'. $item->id .'">';
            $li .= $item->title;
            $li .= '</a>';
            $li .= '</li>';
        }

        return $li;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $locale
     * @param Product $product
     * @return Application|RedirectResponse|Redirector
     */
    public function destroy(string $locale, CarType $carType)
    {
        if (!$this->carTypeRepository->delete($carType->id)) {
            return redirect(locale_route('car_type.index', $carType->id))->with('danger', __('admin.not_delete_message'));
        }
        return redirect(locale_route('car_type.index'))->with('success', __('admin.delete_message'));
    }
}
