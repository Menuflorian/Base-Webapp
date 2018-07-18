function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

$('#SubmitButton').on("click", function() {
    var name = $('#NameTextArea').val();
    var username = $('#UsernameTextArea').val();
    var email = $('#EmailTextArea').val();
    var id = $('#IdArea').val();

        $.ajax({
            type: 'post',
            data: JSON.stringify({
                name: name,
                username: username,
                email: email,
                id: id
            }),
            contentType: 'application/json',
            url: URLUtils.getAbsoluteURL('/users/user-edit-profile/' + id),
            success: function(data) {
                swal({
                    position: 'center',
                    type: 'success',
                    title: 'Profile has been changed',
                    showConfirmButton: false,
                    timer: 1500
                });

            },
            error: function(data) {
                swal({
                    position: 'center',
                    type: 'error',
                    title: 'Error, Username or Email already taken',
                    showConfirmButton: false,
                    timer: 1500
                });
            },
        });
});
