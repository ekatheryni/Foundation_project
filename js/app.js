$(document).ready(function () {
    $("#datetime").datetimepicker({
        beforeShowDay: function (date) {
            var date = date.getDay();

        }
    });
});