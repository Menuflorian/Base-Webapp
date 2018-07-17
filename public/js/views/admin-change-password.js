$('#changePasswordButton').on("click", function() {
    var password = $('#passwordTextArea').val();
    var password2 = $('#password2TextArea').val();
    var id = $('#idArea').val();
    $.ajax({
        type: 'post',
        data: JSON.stringify({
            password: password,
            password2: password2,
            id: id
        }),
        contentType: 'application/json',
        url: URLUtils.getAbsoluteURL('/admin/admin-change-password/'+id),

        success: function(data) {
            swal({
                position: 'center',
                type: 'success',
                title: 'Password has been changed',
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: function(data) {
            swal({
                position: 'center',
                type: 'error',
                title: "Error, Your password didn't match",
                showConfirmButton: false,
                timer: 1500
            });
        },
    });
});
