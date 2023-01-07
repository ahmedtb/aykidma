<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Models\ServiceProvider;
use App\Http\Controllers\Controller;
use App\Filters\ServiceProviderFilters;
use App\Models\ProviderEnrollmentRequest;
use Illuminate\Support\Facades\Validator;
use App\Filters\ProviderEnrollmentRequestFilters;
use App\Notifications\user\ProviderAccountActivated;
use App\Notifications\user\ProviderEnrolled;
use Illuminate\Validation\ValidationException;

class ProvidersController extends Controller
{
    public function show(Request $request, $id)
    {
        return ServiceProvider::where('id', $id)->first();
    }
    public function index(Request $request, ServiceProviderFilters $filters)
    {
        return ServiceProvider::filter($filters)->get();
    }

    public function enrollmentRequest(Request $request, ProviderEnrollmentRequestFilters $filters)
    {
        return ProviderEnrollmentRequest::filter($filters)->get();
    }

    public function approveProviderEnrollment($id)
    {

        $enrollmentRequest = ProviderEnrollmentRequest::where('id', $id)->first();
        if (!$enrollmentRequest)
            throw ValidationException::withMessages(['error' => 'there is no Provider Enrollment Request with id ' . $id]);

        $provider = ServiceProvider::where('id', $enrollmentRequest->user_id)->first();

        if (!$provider)
            $provider = ServiceProvider::create([
                'name' => $enrollmentRequest->name,
                'coverage' => $enrollmentRequest->coverage,
                'user_id' => $enrollmentRequest->user_id,
                'activated' => true,
            ]);
        else
            $provider->update([
                'name' => $enrollmentRequest->name,
                'coverage' => $enrollmentRequest->coverage,
                'user_id' => $enrollmentRequest->user_id,
                'activated' => true,
            ]);
        $enrollmentRequest->delete();
        $provider->user->notify(new ProviderEnrolled($provider));

        return ['success' => 'the provider enrollment request has been approved'];
    }

    public function rejectProviderEnrollment($id)
    {
        $enrollmentRequest = ProviderEnrollmentRequest::where('id', $id)->first();
        if (!$enrollmentRequest)
            throw ValidationException::withMessages(['error' => 'there is no Provider Enrollment Request with id ' . $id]);
        $enrollmentRequest->delete();

        return ['success' => 'Provider Enrollment Request is rejected'];
    }

    public function activateProvider($id)
    {
        Validator::validate([
            'id' => $id
        ], [
            'id' => 'required|exists:service_providers,id'
        ]);
        $provider = ServiceProvider::where('id', $id)->first();
        $provider->update([
            'activated' => true
        ]);

        $provider->user->notify(new ProviderAccountActivated($provider));

        return ['success' => 'the provider has been activated'];
    }
}
