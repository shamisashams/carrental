<?php
/**
 *  app/Repositories/Eloquent/ProductRepository.php
 *
 * Date-Time: 30.07.21
 * Time: 10:36
 * @author Insite LLC <hello@insite.international>
 */

namespace App\Repositories\Eloquent;


use App\Models\Car;
use App\Models\Product;
use App\Models\ProductAttributeValue;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\ProductRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;

/**
 * Class LanguageRepository
 * @package App\Repositories\Eloquent
 */
class CarRepository extends BaseRepository
{




    public function __construct(Car $car)
    {
        parent::__construct($car);

    }






    public function getAll($special = null){


        //dd(request()->post());
        $params = request()->input();

        $query =  $this->model->select('cars.*');


        if ($special !== null){
            $query->where('cars.special',1);
        }


        if (isset($params['type'])){
            $types = explode(',',$params['type']);
            $query->leftJoin('car_types','car_types.id','cars.car_type_id');
            $query->whereIn('car_types.id',$types);
        }

        if (isset($params['transmission'])){
            $transmissions = explode(',',$params['transmission']);
            $query->leftJoin('transmissions','transmissions.id','cars.transmission_id');
            $query->whereIn('transmissions.id',$transmissions);
        }

        if (isset($params['fuel'])){
            $fuels = explode(',',$params['fuel']);
            $query->leftJoin('fuels','fuels.id','cars.fuel_id');
            $query->whereIn('fuels.id',$fuels);
        }

        if (isset($params['bag'])){
            $bags = explode(',',$params['bag']);
            $query->leftJoin('bags','bags.id','cars.bag_id');
            $query->whereIn('bags.id',$bags);
        }

        if (isset($params['seat'])){
            $seats = explode(',',$params['seat']);
            $query->whereIn('cars.seat',$seats);
        }

        if (isset($params['door'])){
            $doors = explode(',',$params['door']);
            $query->whereIn('cars.door',$doors);
        }

        if (isset($params['air_conditioning'])){

            $query->where('cars.air_conditioning',1);
        }



        $query->where('cars.status',1);
        $query->orderBy('id','desc');


        return $query->with(['translation','latestImage', 'brand.translation','transmission.translation','fuel.translation','bag.translation','carType.translation'])->paginate('6')->withQueryString();
    }





    public function search($term){
        return $this->model->whereTranslationLike('title', '%'.$term.'%')
            ->orWhereTranslationLike('description', '%'.$term.'%')
            ->with('latestImage')->paginate(16);
    }


}
