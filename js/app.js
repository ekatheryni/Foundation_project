$(function () {

    $('#filter-date').datetimepicker();


    $('#submit-service').click(function () {
       // console.log("ready1");
        var input = $('#client-name').val();
        $("#welcome-name").text(input);
        var date_input = $('#filter-date').val();
        $('#welcome-date').text(date_input);
    });

    var GoogleMap = require('GoogleMaps');
    //Коли сторінка завантажилась
    google.maps.event.addDomListener(window, 'load', GoogleMap.initialize);

});

