<?php
/**
 *  app/Repositories/Eloquent/ProductRepository.php
 *
 * Date-Time: 30.07.21
 * Time: 10:36
 * @author Vakho Batsikadze <vakhobatsikadze@gmail.com>
 */

namespace App\Repositories\Eloquent;


use App\Models\Faq;
use App\Models\Page;
use App\Repositories\BlogRepositoryInterface;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\FaqRepositoryInterface;


class FaqRepository extends BaseRepository
{
    /**
     * @param Faq $model
     */
    public function __construct(Faq $model)
    {
        parent::__construct($model);
    }


}
