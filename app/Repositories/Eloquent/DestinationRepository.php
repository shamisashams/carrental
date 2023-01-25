<?php
/**
 *  app/Repositories/Eloquent/ProductRepository.php
 *
 * Date-Time: 30.07.21
 * Time: 10:36
 * @author Vakho Batsikadze <vakhobatsikadze@gmail.com>
 */

namespace App\Repositories\Eloquent;


use App\Models\Destination;
use App\Models\Faq;
use App\Models\Page;

use App\Repositories\Eloquent\Base\BaseRepository;



class DestinationRepository extends BaseRepository
{
    /**
     * @param Faq $model
     */
    public function __construct(Destination $model)
    {
        parent::__construct($model);
    }


}
