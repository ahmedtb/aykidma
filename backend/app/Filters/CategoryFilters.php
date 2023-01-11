<?php

namespace App\Filters;

class CategoryFilters extends Filters
{
    
    protected $filters = [
        'with'
    ];

    public function with($with){
        // dd($with);
        return $this->builder->with($with);
    }
}
