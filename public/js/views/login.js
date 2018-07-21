$('#SubmitButton').on("click", function() {
    if ($('#UsernameTextArea').val() == "") {
        swalerror403();
    }
    if ($('#PasswordTextArea').val() == "") {
        swalerror404();
    }
    if ($('#PasswordTextArea').val() && $('#UsernameTextArea').val() != "") {
        var pass = $('#PasswordTextArea').val();
        var username = $('#UsernameTextArea').val();
        $.ajax({
            type: 'post',
            data: JSON.stringify({
                username: username,
                password: pass
            }),
            contentType: 'application/json',
            url: URLUtils.getAbsoluteURL('/users/login'),
            statusCode: {

                200: function(data) {location.href = URLUtils.getAbsoluteURL('/');},
                400: function(data) {swalerror400();},
                401: function(data) {swalerror401();},
                402: function(data) {swalerror402();},
                500: function(data) {swalerror500();},
            }
        });
    }
});
