<?php
/**
 *  app/Repositories/Eloquent/ProductRepository.php
 *
 * Date-Time: 30.07.21
 * Time: 10:36
 * @author Insite LLC <hello@insite.international>
 */

namespace App\Repositories\Eloquent;


use App\Models\Brand;
use App\Models\CarType;
use App\Models\Product;
use App\Models\Slider;

use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\SliderRepositoryInterface;

/**
 * Class LanguageRepository
 * @package App\Repositories\Eloquent
 */
class CarTypeRepository extends BaseRepository
{

    public function __construct(CarType $model)
    {
        parent::__construct($model);
    }

}
