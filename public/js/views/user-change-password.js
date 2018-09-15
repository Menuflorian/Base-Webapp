$('#ChangePasswordButton').on("click", function() {
    var current = $('#CurrentPasswordTextArea')[0] ? $('#CurrentPasswordTextArea').val() : null;
    var password = $('#PasswordTextArea').val();
    var password2 = $('#Password2TextArea').val();
    var id = $('#IDArea').val();

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

    if(ok){
        $.ajax({
            type: 'post',
            data: JSON.stringify({
                password: password,
                password2: password2,
                userpassword: current,
                id: id
            }),
            contentType: 'application/json',
            url: URLUtils.getAbsoluteURL('/users/user-change-password'),

            success: function(data) {
                SwalUtils.Success('Password updated.');
            },
            statusCode: {
                400: function(data) {
                    SwalUtils.ServerError(data.responseJSON.message);
                },
                500: function(data) {
                    SwalUtils.ServerError(data.responseJSON.message);
                }
            }
        });
    }
});
