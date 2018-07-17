function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

$('#SubmitButton').on("click", function() {
    var swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-danger',
        cancelButtonClass: 'btn btn-primary',
        buttonsStyling: false,
    });

    if ($('#Password2TextArea').val() != $('#PasswordTextArea').val()) {
        swalWithBootstrapButtons({
            position: 'center',
            type: 'error',
            title: "Error, Password and confirm password don't match.",
            showConfirmButton: false,
            showCancelButton: true,
        }).catch(swal.noop);
    }
    if ($('#Password2TextArea').val() == "") {
        swalWithBootstrapButtons({
            position: 'center',
            type: 'error',
            title: "Error, Confirm password can't be empty.",
            showConfirmButton: false,
            showCancelButton: true,
        }).catch(swal.noop);
    }
    if ($('#PasswordTextArea').val() == "") {
        swalWithBootstrapButtons({
            position: 'center',
            type: 'error',
            title: "Error, Password can't be empty.",
            showConfirmButton: false,
            showCancelButton: true,
        }).catch(swal.noop);
    }
    if (isEmail($('#EmailTextArea').val()) != true) {
        swalWithBootstrapButtons({
            position: 'center',
            type: 'error',
            title: "Error, Email Must be an email form valid",
            showConfirmButton: false,
            showCancelButton: true,
        }).catch(swal.noop);
    }
    if ($('#EmailTextArea').val() == "") {
        swalWithBootstrapButtons({
            position: 'center',
            type: 'error',
            title: "Error, Email can't be empty.",
            showConfirmButton: false,
            showCancelButton: true,
        }).catch(swal.noop);
    }
    if ($('#UsernameTextArea').val() == "") {
        swalWithBootstrapButtons({
            position: 'center',
            type: 'error',
            title: "Error, Username can't be empty.",
            showConfirmButton: false,
            showCancelButton: true,
        }).catch(swal.noop);
    }
    if ($('#NameTextArea').val() == "") {
        swalWithBootstrapButtons({
            position: 'center',
            type: 'error',
            title: "Error, Name can't be empty.",
            showConfirmButton: false,
            showCancelButton: true,
        }).catch(swal.noop);
    }
    if ($('#NameTextArea').val() && $('#UsernameTextArea').val() && $('#EmailTextArea').val() && $('#PasswordTextArea').val() && $('#Password2TextArea').val() != "") {
        var name = $('#NameTextArea').val();
        var username = $('#UsernameTextArea').val();
        var email = $('#EmailTextArea').val();
        var password = $('#PasswordTextArea').val();
        var password2 = $('#Password2TextArea').val();
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

            success: function(data) {
                swal({
                    position: 'center',
                    type: 'success',
                    title: 'Password has been changed',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function(result) {
					location.href = URLUtils.getAbsoluteURL('/users/login');
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
				405: function(data) {
					swalWithBootstrapButtons({
						position: 'center',
						type: 'error',
						title: "Error, User or email already used",
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
    }
});
