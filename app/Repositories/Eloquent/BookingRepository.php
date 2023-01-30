<?php

namespace App\Repositories\Eloquent;


use App\Models\Booking;
use App\Models\Order;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\OrderRepositoryInterface;


class BookingRepository extends BaseRepository
{

    public function __construct(Booking $model)
    {
        parent::__construct($model);
    }


}
