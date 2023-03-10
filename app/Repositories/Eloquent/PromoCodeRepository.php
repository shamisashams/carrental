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
use App\Models\PromoCode;
use App\Models\Slider;
use App\Models\User;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\SliderRepositoryInterface;
use ReflectionClass;

/**
 * Class LanguageRepository
 * @package App\Repositories\Eloquent
 */
class PromoCodeRepository extends BaseRepository
{

    public function __construct(PromoCode $model)
    {
        parent::__construct($model);
    }



}
