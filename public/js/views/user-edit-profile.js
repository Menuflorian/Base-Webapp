//Edit profile from user.
$('#SubmitButton').on("click", function() {
    if ((isEmail($('#EmailTextArea').val()) != true) && ($('#EmailTextArea').val()) !== "") {
        swalerror405();
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
            url: URLUtils.getAbsoluteURL('/users/user-edit-profile/' + id),
            success: function(data) {swalsuccess('Profile has been changed');},
            statusCode: {
                400: function(data) {swalerror400();},
                401: function(data) {swalerror401();},
                402: function(data) {swalerror402();},
                404: function(data) {swalerror404();},
                405: function(data) {swalerror405();},
                406: function(data) {swalerror406();},
                500: function(data) {swalerror500();},
            }
        });
    }
});
