<?php
/**
 *  app/Repositories/Eloquent/ProductRepository.php
 *
 * Date-Time: 30.07.21
 * Time: 10:36
 * @author Vakho Batsikadze <vakhobatsikadze@gmail.com>
 */

namespace App\Repositories\Eloquent;


use App\Models\News;
use App\Models\Page;
use App\Repositories\BlogRepositoryInterface;
use App\Repositories\Eloquent\Base\BaseRepository;



class NewsRepository extends BaseRepository
{
    /**
     * @param News $model
     */
    public function __construct(News $model)
    {
        parent::__construct($model);
    }


}
