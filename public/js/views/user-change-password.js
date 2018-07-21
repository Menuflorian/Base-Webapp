$('#ChangePasswordButton').on("click", function() {
    var current = $('#CurrentPasswordTextArea').val();
    var password = $('#PasswordTextArea').val();
    var password2 = $('#Password2TextArea').val();
    var id = $('#idArea').val();
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

        success: function(data) {swalsuccess('Password has been changed.');},
        statusCode: {
            400: function(data) {swalerror400();},
            401: function(data) {swalerror401();},
            402: function(data) {swalerror402();},
            404: function(data) {swalerror404();},
            500: function(data) {swalerror500();},
        }
    });
});
