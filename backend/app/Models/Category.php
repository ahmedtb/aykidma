<?php

namespace App\Models;

use App\Filters\CategoryFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['parent_id', 'name', 'image'];

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }
    public function services()
    {
        return $this->hasMany(Service::class);
    }
    public function scopeFilter($query, CategoryFilters $filters)
    {
        return $filters->apply($query);
    }
}
