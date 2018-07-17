$('#changePasswordButton').on("click", function() {
    var password = $('#passwordTextArea').val();
    var password2 = $('#password2TextArea').val();
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
            id: id
        }),
        contentType: 'application/json',
        url: URLUtils.getAbsoluteURL('/admin/admin-change-password/'+id),

        success: function(data) {
            swalWithBootstrapButtons({
                position: 'center',
                type: 'success',
                title: 'Password has been changed',
                showConfirmButton: false,
                timer: 1500
            });
        },
        statusCode: {

            400: function(data) {
                swalWithBootstrapButtons({
                    position: 'center',
                    type: 'error',
                    title: "Error, Incorrect password",
                    showConfirmButton: false,
                    timer: 1500
                }).catch(swal.noop);
            },
            401: function(data) {
                swalWithBootstrapButtons({
                    position: 'center',
                    type: 'error',
                    title: "Error, User unknown",
                    showConfirmButton: false,
                    timer: 1500
                }).catch(swal.noop);
            },
            402: function(data) {
                swalWithBootstrapButtons({
                    position: 'center',
                    type: 'error',
                    title: "Error, New password don't match with cofirm password",
                    showConfirmButton: false,
                    timer: 1500
                }).catch(swal.noop);
            },
            500: function(data) {
                swalWithBootstrapButtons({
                    position: 'center',
                    type: 'error',
                    title: "Error, Internal error",
                    showConfirmButton: false,
                    timer: 1500
                }).catch(swal.noop);
            }
        }
    });
});
