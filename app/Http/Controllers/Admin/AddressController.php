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
use App\Models\Address;
use App\Models\Attribute;
use App\Models\Blog;
use App\Models\Category;
use App\Models\Faq;
use App\Models\Product;
use App\Models\ProductAttributeValue;
use App\Repositories\CategoryRepositoryInterface;
use App\Repositories\Eloquent\AddressRepository;
use App\Repositories\Eloquent\BlogRepository;
use App\Repositories\Eloquent\FaqRepository;
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

class AddressController extends Controller
{




    private $addressRepository;


    public function __construct(
        AddressRepository $addressRepository
    )
    {
        $this->addressRepository = $addressRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Application|Factory|View
     */
    public function index(Request $request)
    {
        /*return view('admin.pages.product.index', [
            'products' => $this->productRepository->getData($request, ['translations', 'categories'])
        ]);*/

        return view('admin.nowa.views.address.index', [
            'data' => $this->addressRepository->getData($request, ['translations'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Application|Factory|View
     */
    public function create()
    {
        $faq = $this->addressRepository->model;





        $url = locale_route('address.store', [], false);
        $method = 'POST';

        /*return view('admin.pages.product.form', [
            'product' => $product,
            'url' => $url,
            'method' => $method,
            'categories' => $this->categories
        ]);*/

        return view('admin.nowa.views.address.form', [
            'model' => $faq,
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

        ]);
        //dd($request->all());
        $saveData = Arr::except($request->except('_token'), []);




        $product = $this->addressRepository->create($saveData);

        // Save Files
        if ($request->hasFile('images')) {
            $product = $this->addressRepository->saveFiles($product->id, $request);
        }






        return redirect(locale_route('address.index', $product->id))->with('success', __('admin.create_successfully'));

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
        return view('admin.pages.address.show', [
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
    public function edit(string $locale, Address $address)
    {
        $url = locale_route('address.update', $address->id, false);
        $method = 'PUT';

        /*return view('admin.pages.product.form', [
            'product' => $product,
            'url' => $url,
            'method' => $method,
            'categories' => $this->categories
        ]);*/

        return view('admin.nowa.views.address.form', [
            'model' => $address,
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
    public function update(Request $request, string $locale, Address $address)
    {
        //dd($request->all());
        $saveData = Arr::except($request->except('_token'), []);


        //dd($saveData);

        //dd($attributes);

        $this->addressRepository->update($address->id, $saveData);






        return redirect(locale_route('address.index', $address->id))->with('success', __('admin.update_successfully'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $locale
     * @param Product $product
     * @return Application|RedirectResponse|Redirector
     */
    public function destroy(string $locale, Address $address)
    {
        if (!$this->addressRepository->delete($address->id)) {
            return redirect(locale_route('address.index', $address->id))->with('danger', __('admin.not_delete_message'));
        }
        return redirect(locale_route('address.index'))->with('success', __('admin.delete_message'));
    }
}
