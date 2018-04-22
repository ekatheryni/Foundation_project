jQuery(document).ready(function () {
    'use strict';
    jQuery('#filter-date').datetimepicker();

    $('#submit-service').click(oknoAppears);

    var $CLIENT_TEMPLATE = $('.login-box').html();

    var $CLIENT_EMAIL = $('#client-email');
    var $CLIENT_CODE = $('#client-code');
    var $CLIENT_DATE = $('#filter-date');
    var $CLIENT_NAME = $('#client-name');

    var $NAME_INPUT = $('.client-name-submit');

    function oknoAppears() {
        var client_name = $CLIENT_NAME.val();
        var client_date = $CLIENT_DATE.getDate()
        var client_time = $CLIENT_DATE.getTime();
        ывапролджэ
    }

});

