//Edit profile from admin.
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
            url: URLUtils.getAbsoluteURL('/admin/admin-edit-profile/' + id),
            success: function(data) {swalsuccess('Profile has been changed');},
            error: function(data) {
                    swalerror406();
                },
        });
    }
});
