$('#SubmitButton').on("click", function() {
    var ok = true;
    if ($('#Password2TextArea').val() != $('#PasswordTextArea').val()) {
        $('#error410').show();
        ok = false;
    }
    if ($('#Password2TextArea').val() == "") {
        $('#error409').show();
        ok = false;
    }
    if ($('#PasswordTextArea').val() == "") {
        $('#error404').show();
        ok = false;
    }
    if (isEmail($('#EmailTextArea').val()) != true) {
        $('#error405').show();
        ok = false;
    }
    if ($('#EmailTextArea').val() == "") {
        $('#error403').show();
        ok = false;
    }
    if ($('#UsernameTextArea').val() == "") {
        $('#error408').show();
        ok = false;
    }
    if ($('#NameTextArea').val() == "") {
        $('#error407').show();
        ok = false;
    }
    if (ok) {
        var name = $('#NameTextArea').val();
        var username = $('#UsernameTextArea').val();
        var email = $('#EmailTextArea').val();
        var password = $('#PasswordTextArea').val();
        var password2 = $('#Password2TextArea').val();
        $.ajax({
            type: 'post',
            data: JSON.stringify({
                name: name,
                username: username,
                email: email,
                password: password,
                password2: password2
            }),
            contentType: 'application/json',
            url: URLUtils.getAbsoluteURL('/users/register'),

            success: function(result) {
                        location.href = URLUtils.getAbsoluteURL('/users/login');
            },
            statusCode: {
                400: function(data) {swalerror400();},
                401: function(data) {swalerror401();},
                402: function(data) {swalerror402();},
                406: function(data) {swalerror406();},
                500: function(data) {swalerror500();},
            }
        });
    }
});
