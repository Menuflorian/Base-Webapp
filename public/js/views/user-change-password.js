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

        success: function(data) {
            swal({
                position: 'center',
                type: 'success',
                title: 'Password has been changed',
                showConfirmButton: false,
                timer: 1500
            });
        },
        statusCode: {

            400: function(data) {
                swal({
                    position: 'center',
                    type: 'error',
                    title: "Error, Current password didn't match",
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            500: function(data) {
                swal({
                    position: 'center',
                    type: 'error',
                    title: "Error, Changement failed",
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            401: function(data) {
                swal({
                    position: 'center',
                    type: 'error',
                    title: "Error, New and confirmed password didn't match",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    });
});
