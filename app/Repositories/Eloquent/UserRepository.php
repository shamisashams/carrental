<?php
/**
 *  app/Repositories/Eloquent/ProductRepository.php
 *
 * Date-Time: 30.07.21
 * Time: 10:36
 * @author Insite LLC <hello@insite.international>
 */

namespace App\Repositories\Eloquent;


use App\Models\File;
use App\Models\Product;
use App\Models\Slider;
use App\Models\User;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\SliderRepositoryInterface;
use Illuminate\Http\Request;
use ReflectionClass;

/**
 * Class LanguageRepository
 * @package App\Repositories\Eloquent
 */
class UserRepository extends BaseRepository
{

    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    public function uploadId($model, $request){
        $this->model = $model;
        //dd($this->model);
        // Get Name Of model
        $reflection = new ReflectionClass(get_class($this->model));
        $modelName = $reflection->getShortName();
        $destination = base_path() . '/storage/app/public/' . $modelName . '/' . $this->model->id . '/id';
        if ($request->hasFile('id_1')) {

            $imagename = date('Ymhs') . str_replace(' ', '', $request->file('id_1')->getClientOriginalName());

            $request->file('id_1')->move($destination, $imagename);
            $this->model->files()->create([
                'title' => $imagename,
                'path' => 'storage/' . $modelName . '/' . $this->model->id . '/cv',
                'format' => $request->file('id_1')->getClientOriginalExtension(),
                'type' => File::ID1,
                'main' => 0
            ]);

        }
        if ($request->hasFile('id_2')) {

            $imagename = date('Ymhs') . str_replace(' ', '', $request->file('id_2')->getClientOriginalName());
            $request->file('id_2')->move($destination, $imagename);
            $this->model->files()->create([
                'title' => $imagename,
                'path' => 'storage/' . $modelName . '/' . $this->model->id . '/cv',
                'format' => $request->file('id_2')->getClientOriginalExtension(),
                'type' => File::ID2,
                'main' => 0
            ]);

        }

        return $this->model;
    }

    public function uploadDrl($model, $request){
        $this->model = $model;
        //dd($this->model);
        // Get Name Of model
        $reflection = new ReflectionClass(get_class($this->model));
        $modelName = $reflection->getShortName();
        $destination = base_path() . '/storage/app/public/' . $modelName . '/' . $this->model->id . '/drl';
        if ($request->hasFile('drl_1')) {

            $imagename = date('Ymhs') . str_replace(' ', '', $request->file('drl_1')->getClientOriginalName());

            $request->file('drl_1')->move($destination, $imagename);
            $this->model->files()->create([
                'title' => $imagename,
                'path' => 'storage/' . $modelName . '/' . $this->model->id . '/drl',
                'format' => $request->file('drl_1')->getClientOriginalExtension(),
                'type' => File::DRL1,
                'main' => 0
            ]);

        }
        if ($request->hasFile('drl_2')) {

            $imagename = date('Ymhs') . str_replace(' ', '', $request->file('drl_2')->getClientOriginalName());
            $request->file('drl_2')->move($destination, $imagename);
            $this->model->files()->create([
                'title' => $imagename,
                'path' => 'storage/' . $modelName . '/' . $this->model->id . '/drl',
                'format' => $request->file('drl_2')->getClientOriginalExtension(),
                'type' => File::DRL2,
                'main' => 0
            ]);

        }

        return $this->model;
    }





}
