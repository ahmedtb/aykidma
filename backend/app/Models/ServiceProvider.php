<?php

namespace App\Models;

use App\casts\Json;
use App\Models\Order;
use App\Models\Service;
use App\Filters\ServiceProviderFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ServiceProvider extends Model
{
    use HasFactory, Notifiable;

    protected $casts = [
        // 'address' => Json::class,
        'coverage' => Json::class,
        'meta_data' => Json::class,
    ];

    protected $hidden = [
        // 'password',
        // 'image',
        'user_id'
    ];

    protected $guarded = [];

    public function Services()
    {
        return $this->hasMany(Service::class);
    }
    public function approvedServices()
    {
        return $this->hasMany(Service::class)->where('approved', true);
    }

    public function orders()
    {
        return $this->hasManyThrough(Order::class, Service::class);
    }


    public function routeNotificationForExpoApp()
    {
        return $this->user->expoTokens();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeActivated($query, $bool = true)
    {
        return $query->where('activated', $bool);
    }

    public function scopeFilter($query, ServiceProviderFilters $filters)
    {
        return $filters->apply($query);
    }
}
