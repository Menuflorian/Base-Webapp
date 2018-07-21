$('#ChangePasswordButton').on("click", function() {
    var current = $('#CurrentPasswordTextArea').val();
    var password = $('#PasswordTextArea').val();
    var password2 = $('#Password2TextArea').val();
    var id = $('#idArea').val();
    var swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-danger',
        cancelButtonClass: 'btn btn-primary',
        buttonsStyling: false,
    });
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
            swalWithBootstrapButtons({
                position: 'center',
                type: 'success',
                title: 'Password has been changed',
                showConfirmButton: true,
            });
        },
        statusCode: {

            400: function(data) {
                swalWithBootstrapButtons({
                    position: 'center',
                    type: 'error',
                    title: "Error, Incorrect password",
                    showConfirmButton: true,
                }).catch(swal.noop);
            },
            401: function(data) {
                swalWithBootstrapButtons({
                    position: 'center',
                    type: 'error',
                    title: "Error, User unknown",
                    showConfirmButton: true,
                }).catch(swal.noop);
            },
            402: function(data) {
                swalWithBootstrapButtons({
                    position: 'center',
                    type: 'error',
                    title: "Error, New password don't match with cofirm password",
                    showConfirmButton: true,
                }).catch(swal.noop);
            },
            500: function(data) {
                swalWithBootstrapButtons({
                    position: 'center',
                    type: 'error',
                    title: "Error, Internal error",
                    showConfirmButton: true,
                }).catch(swal.noop);
            }
        }
    });
});
