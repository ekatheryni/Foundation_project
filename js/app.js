$(document).ready(function () {
    $("#datetime").datetimepicker({
        beforeShowDay: function (date) {
            var day = date.getDay();

        }
    });
});