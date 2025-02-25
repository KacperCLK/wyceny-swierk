@extends('layouts.main-layout')

@section('title', 'Wyceny - Paweł Świerk')

@section('content')

<div class="section section__home">
    <div class="section__home__description">
        <h1 class="section__home__header">{{$settings['homeSec_header']}}</h1>
        <h2>{{$settings['homeSec_caption']}}</h2>
    
        
        <a href="#contact-section" class="section__home__link link-btn">{{$settings['homeSec_button']}}</a>
    </div>
    <div class="section__home__img-containter">
        <img class="section__home__img" src="{{ asset('storage/images/'.$media['homeSec_photo']['path'])}}" alt="{{$media['homeSec_photo']['alt']}}">
    </div>
</div>

<div class="section section__about">
    <h1 class="section__about__header">{{$settings['aboutSec_header']}}</h1>

    <p>{{$settings['aboutSec_paragraph_1']}}</p>
    <p>{{$settings['aboutSec_paragraph_2']}}</p>
    <p>{{$settings['aboutSec_paragraph_3']}}</p>
</div>

<div class="section section__offer">
    <h1 class="section__offer__title">{{$settings['offerSec_header']}}</h1>

    <div class="section__offer__cards">
        @foreach ($offers as $offer)
            <div class="section__offer__card">
                <i class="{{$offer->icon}} section__offer__card__icon"></i>
                <h3 class="section__offer__card__title">{{$offer->title}}</h3>
                <p class="section__offer__card__description">{{$offer->description}}</p>
            </div>
        @endforeach
    </div>
</div>

<div class="section section__slogan">
    <h1 class="section__slogan__header">{{$settings['sloganSec_header']}}</h1>

    <div class="section__slogan__img-containter">
        <img class="section__slogan__img" src="{{ asset('storage/images/'.$media['sloganSec_photo']['path']) }}" alt="{{$media['sloganSec_photo']['alt']}}">
    </div>
</div>

<div id="contact-section" class="section section__contact">
    <div class="section__contact__img-containter">
        <img class="section__contact__img" src="{{ asset('storage/images/'.$media['contactSec_photo']['path']) }}" alt="{{$media['contactSec_photo']['alt']}}">
    </div>
    
    <div class="section__contact__text">
        <h1  class="section__contact__header">{{$settings['contactSec_header']}}</h1>

        <div class="section__contact__contact-info">
            <h2>{{$settings['tag_contact']}}</h2>
            <p>{{$settings['phoneNumber']}}</p>
            <a href="mailto:{{$settings['mail']}}" class="link-inline">{{$settings['mail']}}</a>
        </div>
    </div>
</div>
@endsection