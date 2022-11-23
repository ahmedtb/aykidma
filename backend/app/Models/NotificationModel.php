<?php

namespace App\Models;

use App\Casts\Json;
use App\Filters\NotificationModelFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationModel extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'data' => Json::class,
        'id' => 'string'
    ];
    protected $table = 'notifications';

    public function scopeFilter($query, NotificationModelFilters $filters)
    {
        return $filters->apply($query);
    }

    public function notifiable(){
        return $this->morphTo();
    }
}
