$(function () {

    //DATE-TIME-PICKER

    var logic = function (currentDateTime) {
        // 'this' is jquery object datetimepicker
        if (currentDateTime.getDay() == 6) {
            this.setOptions({
                minTime: '11:00'
            });
        } else
            this.setOptions({
                minTime: '8:00'
            });
    };


    var $filterDate = $('#filter-date');

    $filterDate.datetimepicker({
        onChangeDateTime: logic,
        onShow: logic,
        maxDate:'+1970/02/02'
    });

    //DATE-TIME-PICKER END!
    //////////////////////////////////////////////////////////////////////////////////////
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
    /////////////////////////////////////////////////////////////////////////////////////////////
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
    ///////////////////////////////////////////////////////////////////////////////////////////
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

    function backendPost(url, data) {
        $.ajax({
            url: url,
            type: 'POST',
            method: "post",
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data) {
                console.log("success post");
                // callback(null, data);
            },
            error: function () {
                // callback(new Error("Ajax Failed"));
                console.log("error post");
            }
        })
    }

    // API END!
    ////////////////////////////////////////////////////////////////////////
    // BOOKING

    var service;

    $('#nails-service, #brows-service, #makeup-service').click(function () {
        if (this.id == 'nails-service') {
            service = "Nails";
        }
        else if (this.id == 'brows-service') {
            service = "Brows";
        }
        else if (this.id == 'makeup-service') {
            service = "MakeUp";
        }
        console.log(service);
    });

    var email;

    function validateMail(mail) {
        email = mail;
        var val = {mail: mail};
        backendPost(url, val);
    }

    function checkCode(code) {
        var val = {
            email: email,
            code: code
        };
        backendPost(url, val)
    }

    function bookClient(name, phone, date, time) {
        var client = {
            email: email,
            name: name,
            phone: phone
        };
        var val = {
            client: client,
            date: date,
            time: time,
            service: service
        };
        backendPost(url, val);
    }

    var $emailSubmitButton = $('#email_submit');
    var $idClientCode = $('#id-client-code');
    var $codeSubmitButton = $('#code_submit');

    $emailSubmitButton.click(function () {
        var mail = $('#client-email').val();
        if (mail.length > 0) {
            //validateMail(mail);
            $idClientCode.removeAttr('disabled');
            $codeSubmitButton.removeAttr('disabled');
            console.log("mail validated");
        }
    });

    var $clientName = $('#client-name');
    var $clientPhone = $('#client-phone');

    $codeSubmitButton.click(function () {
        var code = $idClientCode.val();
        if (code.length = 4) {
            //checkCode(code);
            $filterDate.removeAttr('disabled');
            $submitService.removeAttr('disabled');
            $clientName.removeAttr('disabled');
            $clientPhone.removeAttr('disabled');
        }
    });

    var $submitService = $('#submit-service');

    $submitService.click(function () {
        // console.log("ready1");
        var name = $clientName.val();
        $("#welcome-name").text(name);
        var date = $filterDate.val();
        $('#welcome-date').text(date);

        var phone = $clientPhone.val();

        if (name.length !== 0 && date.length !== 0) {
            bookClient(name, phone, date);
        }
    });

    // BOOKING END!

});