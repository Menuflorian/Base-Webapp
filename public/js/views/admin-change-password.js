$('#ChangePasswordButton').on("click", function() {
    var password = $('#PasswordTextArea').val();
    var password2 = $('#Password2TextArea').val();
    var id = $('#IdArea').val();
    $.ajax({
        type: 'post',
        data: JSON.stringify({
            password: password,
            password2: password2,
            id: id
        }),
        contentType: 'application/json',
        url: URLUtils.getAbsoluteURL('/admin/admin-change-password/'+id),

        success: function(data) {swalsuccess('Password has been changed.');},
        statusCode: {
            400: function(data) {swalerror400();},
            401: function(data) {swalerror401();},
            402: function(data) {swalerror402();},
            500: function(data) {swalerror500();},
        }
    });
});
