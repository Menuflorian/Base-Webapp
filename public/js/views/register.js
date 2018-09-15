$('#SubmitButton').on("click", function() {
    var ok = true;
    if ($('#Password2TextArea').val() != $('#PasswordTextArea').val()) {
        $('#ErrorPasswordDontMatch').show();
        ok = false;
    }
    if ($('#Password2TextArea').val() == "") {
        $('#ErrorPassword2Empty').show();
        ok = false;
    }
    if ($('#PasswordTextArea').val() == "") {
        $('#ErrorPasswordEmpty').show();
        ok = false;
    }
    if (isEmail($('#EmailTextArea').val()) != true) {
        $('#ErrorEmailInvalid').show();
        ok = false;
    }
    if ($('#EmailTextArea').val() == "") {
        $('#ErrorEmailEmpty').show();
        ok = false;
    }
    if ($('#UsernameTextArea').val() == "") {
        $('#ErrorUserNameEmpty').show();
        ok = false;
    }
    if ($('#UsernameTextArea').val() == "") {
        $('#ErrorUserNameEmpty').show();
        ok = false;
    }
    //if ($('#NameTextArea').val() == "") {
    //    $('#ErrorNameEmpty').show();
    //    ok = false;
    //}
    if (ok) {
        var username = $('#UsernameTextArea').val();
        var name = username.replace(username[0],username[0].toUpperCase()).replace(new RegExp("[.]","g")," ").replace(new RegExp(" [a-zA-Z]","g"), function(s){return s.toUpperCase();});
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
                500: function(data) {
                    SwalUtils.ServerError(data.responseJSON.message);
                }
            }
        });
    }
});
