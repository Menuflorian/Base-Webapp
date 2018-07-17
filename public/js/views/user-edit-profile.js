$('#submitButton').on("click", function() {
    var name = $('#nameTextArea').val();
    var username = $('#usernameTextArea').val();
    var email = $('#emailTextArea').val();
    var id = $('#idArea').val();
    $.ajax({
        type: 'post',
        data: JSON.stringify({
            name: name,
            username: username,
            email: email,
            id: id
        }),
        contentType: 'application/json',
        url: URLUtils.getAbsoluteURL('/users/user-edit-profile/'+id),
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
                title: 'Error',
                showConfirmButton: false,
                timer: 1500
            });
        },
    });

});
