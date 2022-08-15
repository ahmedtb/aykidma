<?php

namespace App\Filters;

class ServiceProviderFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'activated',
        'with'
    ];

    protected function activated($bool)
    {
        return $this->builder->where('activated', $bool == 'true');
    }

    protected function with($with)
    {
        return $this->builder->with($with);
    }
}
