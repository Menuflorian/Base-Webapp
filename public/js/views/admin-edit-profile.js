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

    if (isEmail($('#EmailTextArea').val()) != true) {
        swalWithBootstrapButtons({
            position: 'center',
            type: 'error',
            title: "Error, Email Must be an email form valid",
            showConfirmButton: false,
            showCancelButton: true,
        }).catch(swal.noop);
    }
    else{
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
        url: URLUtils.getAbsoluteURL('/admin/admin-edit-profile/'+id),
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
    }
});
