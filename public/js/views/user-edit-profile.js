//Edit profile from user or admin
$('#SubmitButton').on("click", function() {
    var name = $('#NameTextArea').val();
    var username = $('#UsernameTextArea').val();
    var email = $('#EmailTextArea').val();
    var id = $('#IdArea').val();

    var ok = true;

    if (EmailUtils.isEmail(email) != true) {
        $('#ErrorEmailInvalid').show();
        ok = false;
    }else{
        $('#ErrorEmailInvalid').hide();
    }

    if (email == "") {
        $('#ErrorEmailEmpty').show();
        ok = false;
    }else{
        $('#ErrorEmailEmpty').hide();
    }

    if (username == "") {
        $('#ErrorUserNameEmpty').show();
        ok = false;
    }else{
        $('#ErrorUserNameEmpty').hide();
    }

    if (name == "") {
        $('#ErrorNameEmpty').show();
        ok = false;
    }else{
        $('#ErrorNameEmpty').hide();
    }

    if (ok){
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
                SwalUtils.Success('Profile updated.');
            },
            statusCode: {
                400: function(data) {
                    SwalUtils.ServerError(data.responseJSON.message);
                },
                409: function(data) {
                    SwalUtils.ServerError(data.responseJSON.message);
                },
                500: function(data) {
                    SwalUtils.ServerError(data.responseJSON.message);
                }
            }
        });
    }
});
