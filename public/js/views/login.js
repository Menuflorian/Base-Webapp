$('#SubmitButton').on("click", function() {

    var ok = true;

    if ($('#UsernameTextArea').val() == "") {
        $('#ErrorUsernameEmpty').show();
        ok = false;
    }else{
        $('#ErrorUsernameEmpty').hide();
    }

    if ($('#PasswordTextArea').val() == "") {
        $('#ErrorPasswordEmpty').show();
        ok = false;
    }else{
        $('#ErrorPasswordEmpty').hide();
    }

    if (ok) {
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
            success: function(result) {
                location.href = URLUtils.getAbsoluteURL('/');
            },
            statusCode: {
                200: function(data) {
                    location.href = URLUtils.getAbsoluteURL('/');
                },
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
