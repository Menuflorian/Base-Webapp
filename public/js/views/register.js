$('#SubmitButton').on("click", function() {
    var username = $('#UsernameTextArea').val();
    var email = $('#EmailTextArea').val();
    var password = $('#PasswordTextArea').val();
    var password2 = $('#Password2TextArea').val();

    var ok = true;
    if (password2 != password) {
        $('#ErrorPasswordDontMatch').show();
        ok = false;
    }else{
        $('#ErrorPasswordDontMatch').hide();
    }

    if (password2 == "") {
        $('#ErrorPassword2Empty').show();
        ok = false;
    }else{
        $('#ErrorPassword2Empty').hide();
    }

    if (password == "") {
        $('#ErrorPasswordEmpty').show();
        ok = false;
    }else{
        $('#ErrorPasswordEmpty').hide();
    }

    if (EmailUtils.isEmail(email) != true) {
        $('#ErrorEmailInvalid').show();
        ok = false;
    }else{
        $('#ErrorEmailInvalid').hide();
    }

    if (email == "") {
        $('#ErrorEmailEmpty').show();
        ok = false;
    }else{
        $('#ErrorEmailEmpty').hide();
    }

    if (username == "") {
        $('#ErrorUserNameEmpty').show();
        ok = false;
    }else{
        $('#ErrorUserNameEmpty').hide();
    }

    if (password == "") {
        $('#ErrorPasswordEmpty').show();
        ok = false;
    }else{
        $('#ErrorPasswordEmpty').hide();
    }

    if (ok) {
        var name = username.replace(username[0],username[0].toUpperCase()).replace(new RegExp("[.]","g")," ").replace(new RegExp(" [a-zA-Z]","g"), function(s){return s.toUpperCase();});
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
                400: function(data) {
                    SwalUtils.ServerError(data.responseJSON.message);
                },
                409: function(data) {
                    SwalUtils.ServerError(data.responseJSON.message);
                },
                500: function(data) {
                    SwalUtils.ServerError(data.responseJSON.message);
                }
            }
        });
    }
});
