<?php

namespace App\Models;

use App\Traits\ScopeFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

class Booking extends Model
{
    use HasFactory, ScopeFilter;

    protected $table = 'bookings';

    protected $fillable = [
        'name',
        'surname',
        'phone',
        'email',
        'locale',
        'grand_total',
        'payment_type',
        'user_id',
        'status',
        'car',
        'car_id',
        'options',
        'pickup_loc',
        'dropoff_loc',
        'pickup_date',
        'dropoff_date',
        'payment_method',
        'period',
        'same_address',
        'car_price'
    ];

    protected $appends = [
        'formatted_date'
    ];

    public function getFilterScopes(): array
    {
        return [
            'id' => [
                'hasParam' => true,
                'scopeMethod' => 'id'
            ],
            'status' => [
                'hasParam' => true,
                'scopeMethod' => 'status'
            ],
            'price' => [
                'hasParam' => true,
                'scopeMethod' => 'price'
            ],
            'name' => [
                'hasParam' => true,
                'scopeMethod' => 'firstLastName'
            ],
            'email' => [
                'hasParam' => true,
                'scopeMethod' => 'email'
            ],
            'phone' => [
                'hasParam' => true,
                'scopeMethod' => 'phone'
            ],
            'from' => [
                'hasParam' => true,
                'scopeMethod' => 'from'
            ],
            'to' => [
                'hasParam' => true,
                'scopeMethod' => 'to'
            ],
        ];
    }



    public function getFormattedDateAttribute(){
        return (new Carbon($this->created_at))->format('d.m.Y');
    }

}
