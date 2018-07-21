var swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-danger',
    cancelButtonClass: 'btn btn-primary',
    buttonsStyling: false,
});

$('#SubmitButton').on("click", function() {
    var swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-danger',
        cancelButtonClass: 'btn btn-primary',
        buttonsStyling: false,
    });
    if ($('#UsernameTextArea').val() == "") {
        swalWithBootstrapButtons({
            position: 'center',
            type: 'error',
            title: "Error, E-mail can't be empty.",
            showConfirmButton: true,
            showCancelButton: true,
        }).catch(swal.noop);
    }
    if ($('#PasswordTextArea').val() == "") {
        swalWithBootstrapButtons({
            position: 'center',
            type: 'error',
            title: "Error, Password can't be empty.",
            showConfirmButton: true,
            showCancelButton: true,
        }).catch(swal.noop);
    }
    if ($('#PasswordTextArea').val() && $('#UsernameTextArea').val() != "") {
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
            success: function(data) {
                        location.href = URLUtils.getAbsoluteURL('/');
                    },
            statusCode: {

                400: function(data) {
                    swalWithBootstrapButtons({
                        position: 'center',
                        type: 'error',
                        title: "Error, Incorrect password",
                        showConfirmButton: true,
                    });
                },
                401: function(data) {
                    swalWithBootstrapButtons({
                        position: 'center',
                        type: 'error',
                        title: "Error, User unknown",
                        showConfirmButton: true,
                    });
                },
                402: function(data) {
                    swalWithBootstrapButtons({
                        position: 'center',
                        type: 'error',
                        title: "Error, New password don't match with cofirm password",
                        showConfirmButton: true,
                    });
                },
                500: function(data) {
                    swalWithBootstrapButtons({
                        position: 'center',
                        type: 'error',
                        title: "Error, Internal error",
                        showConfirmButton: true,
                    });
                }
            }
        });
    }

});
