<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Models\Offer;
use App\Models\SiteSetting;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function home()
    {
        $offers = Offer::where('display', true)->get();
        $settings = SiteSetting::pluck('value', 'key');
        $media = Media::get()->mapWithKeys(function ($item) {
            return [
                $item->key => [
                    'path' => $item->path,
                    'alt' => $item->alt,
                ],
            ];
        });
        

        return view('pages.home', compact('offers', 'settings', 'media'));
    }
}
