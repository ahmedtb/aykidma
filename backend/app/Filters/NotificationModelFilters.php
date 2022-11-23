<?php

namespace App\Filters;

use App\Models\Admin;
use App\Models\User;
use Carbon\Carbon;

class NotificationModelFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'name',
        'with',
        'future',
        'latest',
        'notifiable_type',
        'notifiable_id',
        'admin_id',
        'user_id'
    ];

    protected function name($name)
    {
        return $this->builder->where('name', 'LIKE', "%{$name}%");
    }

    protected function with($with)
    {
        return $this->builder->with($with);
    }

    protected function future()
    {
        return $this->builder->whereDate('date', '>', Carbon::now());
    }
    protected function latest()
    {
        return $this->builder->latest();
    }

    protected function notifiable_type($notifiable_type)
    {
        return $this->builder->where('notifiable_type',  $notifiable_type);
    }

    protected function notifiable_id($notifiable_id)
    {
        return $this->builder->where('notifiable_id',  $notifiable_id);
    }

    protected function admin_id($admin_id)
    {
        return $this->builder->where('notifiable_type', Admin::class)->where('notifiable_id', $admin_id);
    }


    protected function user_id($user_id)
    {
        return $this->builder->where('notifiable_type', User::class)->where('notifiable_id', $user_id);;
    }
}
