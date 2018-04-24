$(function () {

    //DATE-TIME-PICKER

    var $filterDate = $('#filter-date');

    $filterDate.datetimepicker();

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

    // API
    var API_URL = "http://localhost:63342";

    function backendGet(url, callback) {
        $.ajax({
            url: API_URL + url,
            type: 'GET',
            success: function (data) {
                callback(null, data);
            },
            error: function () {
                callback(new Error("Ajax Failed"));
            }
        })
    }

    function backendPost(url, data, callback) {
        $.ajax({
            url: API_URL + url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data) {
                callback(null, data);
            },
            error: function () {
                callback(new Error("Ajax Failed"));
            }
        })
    }

    // API END!

    // BOOKING

    function validateMail(mail) {

    }

    function checkCode(code) {

    }

    function bookClient(name, date) {

    }

    var $emailSubmitButton = $('#email_submit');
    var $idClientCode = $('#id-client-code');
    var $codeSubmitButton = $('#code_submit');

    $emailSubmitButton.click(function () {
        var mail = $('#client-email').val();
        if (mail.length > 0) {
            validateMail(mail);
            $idClientCode.removeAttr('disabled');
            $codeSubmitButton.removeAttr('disabled');
            console.log("mail validated");
        }
    });

    var $clientName = $('#client-name');

    $codeSubmitButton.click(function () {
        var code = $idClientCode.val();
        if (code.length = 4) {
            checkCode(code);
            $filterDate.removeAttr('disabled');
            $submitService.removeAttr('disabled');
            $clientName.removeAttr('disabled');
        }
    });

    var $submitService = $('#submit-service');

    $submitService.click(function () {
        // console.log("ready1");
        var name = $clientName.val();
        $("#welcome-name").text(name);
        var date = $filterDate.val();
        $('#welcome-date').text(date);


        if(name.length !==0 && date.length !== 0){
            bookClient(name, date);
        }
    });

    // BOOKING END!

});

