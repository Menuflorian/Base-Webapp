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

    if ((isEmail($('#EmailTextArea').val()) != true) && ($('#EmailTextArea').val()) !== "") {
        swalWithBootstrapButtons({
            position: 'center',
            type: 'error',
            title: "Error, Email Must be an email form valid",
            showConfirmButton: true,
            showCancelButton: true,
        }).catch(swal.noop);
    } else {
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
            url: URLUtils.getAbsoluteURL('/admin/admin-edit-profile/' + id),

            success: function(data) {
                swalWithBootstrapButtons({
                    position: 'center',
                    type: 'success',
                    title: 'Profile has been changed',
                    showConfirmButton: true,
                });
            },

            error: function(data) {
                swalWithBootstrapButtons({
                    position: 'center',
                    type: 'error',
                    title: 'Error, Username and/or Email is already use.',
                    showConfirmButton: true,
                });
            },
        });
    }
});
