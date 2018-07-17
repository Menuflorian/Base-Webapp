$('#SubmitButton').on("click", function() {
    if ($('#UsernameTextArea').val() == "") {
        swal({
            position: 'center',
            type: 'error',
            title: "Error, E-mail can't be empty.",
            showConfirmButton: false,
            showCancelButton: true,
        }).catch(swal.noop);
    }
    if ($('#PasswordTextArea').val() == "") {
        swal({
            position: 'center',
            type: 'error',
            title: "Error, Password can't be empty.",
            showConfirmButton: false,
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
            url: 'http://localhost:3000/users/login',
            success: function(data) {
                swal({
                    position: 'center',
                    showCancelButton: false,
                    type: 'success',
                    title: 'You are now logged',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function(result) {
                    location.href = URLUtils.getAbsoluteURL('/');
                });
            },
            statusCode: {

                400: function(data) {
                    swal({
                        position: 'center',
                        type: 'error',
                        title: "Error, Incorrect password",
                        showConfirmButton: false,
                        timer: 1500
                    });
                },
                500: function(data) {
                    swal({
                        position: 'center',
                        type: 'error',
                        title: "Error, User unknown",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    }

});
