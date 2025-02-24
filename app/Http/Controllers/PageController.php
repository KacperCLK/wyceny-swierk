<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Models\SiteSetting;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function home()
    {
        $offers = Offer::where('display', true)->get();
        $settings = SiteSetting::pluck('value', 'key');

        return view('pages.home', compact('offers', 'settings'));
    }
}
