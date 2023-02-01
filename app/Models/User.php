<?php

namespace App\Models;

use App\Traits\ScopeFilter;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, ScopeFilter;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'surname',
        'is_partner',
        'id_number',
        'phone',
        'affiliate_id',
        'referred_by',
        'address',
        'status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = [
        'personal_files'
    ];


    /*protected $with = [
      'referrals'
    ];*/

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getFilterScopes(): array
    {
        return [
            'id' => [
                'hasParam' => true,
                'scopeMethod' => 'id'
            ],
            'email' => [
                'hasParam' => true,
                'scopeMethod' => 'email'
            ],
            'name' => [
                'hasParam' => true,
                'scopeMethod' => 'fullName'
            ],
        ];
    }


    public function files(): MorphMany
    {
        return $this->morphMany(File::class, 'fileable');
    }





    public function referrals(): HasMany{
        return $this->hasMany(self::class,'referred_by','affiliate_id');
    }

    public function referrer(){
        return $this->belongsTo(self::class, 'referred_by','affiliate_id');
    }


    public function personalFiles(){
        return $this->morphMany(File::class, 'fileable')->whereIn('type',[File::ID1,File::ID2,File::DRL1,File::DRL2]);
    }


    public function orders(){
        return $this->hasMany(Order::class);
    }


    public function getPersonalFilesAttribute(){
        $files = $this->personalFiles()->get();

        $result = [];
        $result['id1'] = null;
        $result['id2'] = null;
        $result['drl1'] = null;
        $result['drl2'] = null;

        foreach ($files as $item){
            switch ($item->type){
                case File::ID1:
                    $result['id1'] = $item->file_full_url;
                    break;
                case File::ID2:
                    $result['id2'] = $item->file_full_url;
                    break;
                case File::DRL1:
                    $result['drl1'] = $item->file_full_url;
                    break;
                case File::DRL2:
                    $result['drl2'] = $item->file_full_url;
                    break;
            }
        }
        return $result;
    }



}
