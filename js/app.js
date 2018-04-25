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
        minDate: '+1970/01/01',
        maxDate: '+1970/02/02'
    });

    /*var logic = function( currentDateTime ){
     // 'this' is jquery object datetimepicker
     if( currentDateTime.getDay()==6 ){
       this.setOptions({
         minTime:'11:00'
       });
     }else
       this.setOptions({
         minTime:'8:00'
       });
   };
   */

    //DATE-TIME-PICKER END!
    //////////////////////////////////////////////////////////////////////////////////////
    // GOOGLE MAPS

    function initialize() {

//Тут починаємо працювати з картою
        var point = {lat:  50.450083, lng: 30.495375};
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
    function backendGet(url, callback) {
        $.ajax({
            url: url,
            type: 'GET',
            method: "get",
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
    var email;
    var $clientName = $('#client-name');
    var $clientPhone = $('#client-phone');
    var $emailSubmitButton = $('#email_submit');
    var $idClientCode = $('#id-client-code');
    var $codeSubmitButton = $('#code_submit');
    var $submitService = $('#submit-service');


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

    function validateMail(mail) {
        email = mail;
        var data = {email: mail};
        $.ajax({
            url: '/emailVerification',
            type: 'POST',
            method: "post",
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data) {
                if (data == true) {
                    $idClientCode.removeAttr('disabled');
                    $codeSubmitButton.removeAttr('disabled');
                    console.log("mail validated in post method");
                } else {
                    alert("Your email is incorrect. Please try again.");
                }
            },
            error: function () {
                alert("An error has occurred. Please try again.");
            }
        });
    }

    function checkCode(code) {
        var data = {
            email: email,
            code: code
        };
        $.ajax({
            url: '/finalVerification',
            type: 'POST',
            method: "post",
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data) {
                if (data == true) {
                    $filterDate.removeAttr('disabled');
                    $submitService.removeAttr('disabled');
                    $clientName.removeAttr('disabled');
                    $clientPhone.removeAttr('disabled');
                } else {
                    alert("You have entered the wrong code. Please try again.");
                }
            },
            error: function () {
                //console.log("error post");
                alert("An error has occurred. Please try again.");
            }
        });
    }

    function bookClient(name, phone, date, time) {
        var client = {
            phone: phone,
            email: email,
            name: name
        };
        var data = {
            client: client,
            service: service,
            date: date,
            time: time
        };
        $.ajax({
            url: '/registration/addClientAndReservations',
            type: 'POST',
            method: "post",
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data) {
            },
            error: function () {
                alert("An error has occurred. Please try again.");
            }
        });
    }

    $emailSubmitButton.click(function () {
        var mail = $('#client-email').val();
        if (mail.length > 0) {
            //validateMail(mail);
            $idClientCode.removeAttr('disabled');
            $codeSubmitButton.removeAttr('disabled');
            console.log("mail validated");
        }
    });

    $codeSubmitButton.click(function () {
        var code = $idClientCode.val();
        if (code.length == 4) {
            checkCode(code);
            $filterDate.removeAttr('disabled');
            $submitService.removeAttr('disabled');
            $clientName.removeAttr('disabled');
            $clientPhone.removeAttr('disabled');
        }
    });


    $submitService.click(function () {
        var name = $clientName.val();
        // $("#welcome-name").text(name);
        var date = $filterDate.val();
        // $('#welcome-date').text(date);
        var phone = $clientPhone.val();

        if (name.length !== 0 && date.length !== 0) {
            bookClient(name, phone, date);
        }
    });

    // BOOKING END!
    /////////////////////////////////////////////
    // EDIT

    var emailEdit;
    var $emailSubmitEdit = $('#email_submit-edit');
    var $idClientCodeEdit = $('#id-client-code-edit');
    var $codeSubmitEdit = $('#code_submit-edit');

    $emailSubmitEdit.click(function () {
        var mail = $('#client-email-edit').val();
        if (mail.length > 0) {
            //validateMailEdit(mail);
            console.log("mail validated");
            getBookings(null);
        }
    });

    function getBookings(data) {
        data = {
            "makeUp": [
                {
                    "date": "2010-01-13",
                    "time": "22:30:00"
                },
                {
                    "date": "2000-01-15",
                    "time": "07:00:00"
                }
            ],
            "brows": [],
            "nails": [
                {
                    "date": "1997-01-14",
                    "time": "14:30:00"
                },
                {
                    "date": "2018-04-25",
                    "time": "15:00:00"
                },
                {
                    "date": "2010-01-13",
                    "time": "22:30:00"
                }
            ]
        };


        data.makeUp.forEach(function (value) {
            var ser = "Make Up";
            var date = value.date;
            var time = value.time.slice(0, 5);
            var space = " ";
            $('#booking-list').append("<div class=\"one-reservation\">\n" +
                "                        <span class=\"service-ed\">" + ser + "</span>\n" +
                "                        <span class=\"data-edit\">" + date + space + time + "</span>\n" +
                "<div class=\"edit-icons\">\n"+
                "                        <button class=\"ed-icon\"><i class=\"step fi-pencil size-21\"></i></button>\n" +
                "                        <button class=\"del-icon\"><i class=\"step fi-x size-21\"></i></button>\n" +
                "</div>"+
                "                    </div>");
        });
        data.brows.forEach(function (value) {
            var ser = "Brows";
            var date = value.date;
            var time = value.time.slice(0, 5);
            var space = " ";
            $('#booking-list').append("<div class=\"one-reservation\">\n" +
                "                        <span class=\"service-ed\">" + ser + "</span>\n" +
                "                        <span class=\"data-edit\">" + date + space + time + "</span>\n" +
                "<div class=\"edit-icons\">\n"+
                "                        <button class=\"ed-icon\"><i class=\"step fi-pencil size-21\"></i></button>\n" +
                "                        <button class=\"del-icon\"><i class=\"step fi-x size-21\"></i></button>\n" +
                "</div>"+
                "                    </div>");
        });
        data.nails.forEach(function (value) {
            var ser = "Nails";
            var date = value.date;
            var time = value.time.slice(0, 5);
            var space = " ";
            $('#booking-list').append("<div class=\"one-reservation\">\n" +
                "                        <span class=\"service-ed\">" + ser + "</span>\n" +
                "                        <span class=\"data-edit\">" + date + space + time + "</span>\n" +
                "<div class=\"edit-icons\">\n"+
                "                        <button class=\"ed-icon\"><i class=\"step fi-pencil size-21\"></i></button>\n" +
                "                        <button class=\"del-icon\"><i class=\"step fi-x size-21\"></i></button>\n" +
                "</div>"+
                "                    </div>");
        });
    }


    function validateMailEdit(mail) {
        emailEdit = mail;
        var data = {email: mail};
        $.ajax({
            url: '/edit/getClientReservations',
            type: 'POST',
            method: "post",
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data) {
                getBookings(data);
            },
            error: function () {
                alert("An error has occurred. Please try again.");
            }
        });
    }

    function deleteBooking(date, time, mail, service) {
        var data = {
            email: mail,
            service: service,
            date: date,
            time: time
        };
        $.ajax({
            url: '/delete/removeReservation',
            type: 'POST',
            method: "post",
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data) {
            },
            error: function () {
                alert("An error has occurred. Please try again.");
            }
        });
    }

    function editBooking(date, time, mail, service, newDate, newTime) {
        var data = {
            email: mail,
            service: service,
            old_date: date,
            old_time: time,
            new_date: newDate,
            new_time: newTime
        };
        $.ajax({
            url: '/edit/updateClientReservation ',
            type: 'PUT',
            method: "put",
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data) {
            },
            error: function () {
                alert("An error has occurred. Please try again.");
            }
        });
    }

    var $bookingList = $('#booking-list');

    $bookingList.on('click', '.ed-icon', function () {
        var service = $(this).parent().siblings('.service-ed').text();
        var date = $(this).parent().siblings('.data-edit').text();
        var oldDate = date.substr(0, 10);
        var oldTime = date.substr(11, 16);
        console.log("EDIT " + service + " " + oldDate + " " + oldTime);


        var newDate;
        var newTime;
        //editBooking(oldDate, oldTime, emailEdit, service, newDate, newTime);
    });

    $bookingList.on('click', '.del-icon', function () {
        var service = $(this).parent().siblings('.service-ed').text();
        var dateD = $(this).parent().siblings('.data-edit').text();
        var date = dateD.substr(0, 10);
        var time = dateD.substr(11, 16);
        console.log("DEL " + service + " " + date + " " + time);
        //deleteBooking(date, time, emailEdit, service);
    });


    // EDIT END!
    ////////////////////////////////////////


});