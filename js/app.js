$(function () {

    //DATE-TIME-PICKER

    $('#filter-date').datetimepicker();

    $('#submit-service').click(function () {
        // console.log("ready1");
        var input = $('#client-name').val();
        $("#welcome-name").text(input);
        var date_input = $('#filter-date').val();
        $('#welcome-date').text(date_input);
    });

    //DATE-TIME-PICKER END!

    // GOOGLE MAPS

    function initialize() {
//Тут починаємо працювати з картою
        var point = {lat: 50.45073399000806, lng: 30.494437170753713};
        home = new google.maps.LatLng(point);

        var mapProp = {
            center: home,
            zoom: 16
        };
        var html_element = document.getElementById("googleMap");
        mapp = new google.maps.Map(html_element, mapProp);

        var marker = new google.maps.Marker({
            position: point,
            map: mapp,
            title: "We are here!"
        });

//Карта створена і показана
    }

//Коли сторінка завантажилась
    google.maps.event.addDomListener(window, 'load', initialize);

    // GOOGLE MAPS END!

    // SCROLL BUTTONS

    $('.about-click').click(function () {
        $('html,body').animate({
                scrollTop: $('.about-us').offset().top - 90
            },
            'slow');
    });

    $('.services-click').click(function () {
        $('html,body').animate({
                scrollTop: $('.services').offset().top - 90
            },
            'slow');
    });

    $('.gallery-click').click(function () {
        $('html,body').animate({
                scrollTop: $('.gallery').offset().top - 90
            },
            'slow');
    });

    $('.contacts-click').click(function () {
        $('html,body').animate({
                scrollTop: $('.contacts').offset().top - 90
            },
            'slow');
    });

    $('.book-click').click(function () {
        $('html,body').animate({
                scrollTop: $('.book-now').offset().top - 90
            },
            'slow');
    });

    // SCROLL BUTTONS END!

});

