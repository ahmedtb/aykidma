<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Category;
use App\Rules\Base64Rule;
use Illuminate\Http\Request;
use App\Filters\CategoryFilters;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Illuminate\Database\Eloquent\Collection
     */
    public function index(Request $request, CategoryFilters $filters)
    {
        return Category::filter($filters)
            ->paginate($request->input('page_size') ?? 10)
            ->appends(request()->except('page'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // return $request->all();
        $validatedData = $this->validate($request, [
            'name'      => 'required|min:3|max:255|string',
            'image' => ['required', new Base64Rule(12000000)],
            'parent_id' => 'sometimes|nullable|exists:categories,id'
        ]);

        // $imagePath = storeBase64PngFile($request->image);

        Category::create($validatedData);

        return response(['success' => 'You have successfully created a Category!']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $validatedData = $this->validate($request, [
            'name'  => 'sometimes|min:3|max:255|string',
            'image' =>  ['required', new Base64Rule(12000000)]
        ]);

        $category->update($validatedData);

        return response(['success' => 'You have successfully updated a Category!']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        // dd($category);
        $category->children()->delete();
        $category->delete();

        return response()->json(['success' => 'You have successfully deleted a Category!']);
    }
}
