$('#SubmitButton').on("click", function() {
    if ($('#Password2TextArea').val() != $('#PasswordTextArea').val()) {
        show410();
    }
    if ($('#Password2TextArea').val() == "") {
        show409();
    }
    if ($('#PasswordTextArea').val() == "") {
        show404();
    }
    if (isEmail($('#EmailTextArea').val()) != true) {
        show405();
    }
    if ($('#EmailTextArea').val() == "") {
        show403();
    }
    if ($('#UsernameTextArea').val() == "") {
        show408();
    }
    if ($('#NameTextArea').val() == "") {
        show407();
    }
    if ($('#NameTextArea').val() && $('#UsernameTextArea').val() && $('#EmailTextArea').val() && $('#PasswordTextArea').val() && $('#Password2TextArea').val() != "") {
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
