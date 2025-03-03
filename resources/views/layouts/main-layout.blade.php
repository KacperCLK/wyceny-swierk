<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title', 'Wyceny - Paweł Świerk | Kraków')</title>

    <link rel="icon" type="image/png" href="{{ asset('storage/images/'.$media['logo']['path']) }}">

    <meta charset="utf-8">

    <meta name="title" content="Profesjonalne Wyceny Budowlane – Szybko i Dokładnie | Paweł Świerk">
    <meta name="description"
        content="Kosztorysy budowlane 🛠️
            Kraków | Małopolska: wstępne, inwestorskie, ofertowe, przedmiary, obmiary i weryfikacja kosztorysów 💼">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Forum&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">

    <!-- Styles / Scripts -->
    @vite(['resources/css/app.css', 'resources/scss/app.scss', 'resources/js/app.js'])
    <script src="https://kit.fontawesome.com/530790a84d.js" crossorigin="anonymous"></script>
</head>

<body class="main-layout">
    <div class="home">
        @yield('content')
    </div>
</body>

</html>