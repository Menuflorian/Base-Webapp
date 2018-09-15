//Select admin/user
$('#MultiSelect1').change(function () {
        var selected = $('#MultiSelect1 option:selected').val();
        var id = $('#MultiSelect1idArea').val();
        if (selected == 1) { //select on admin
            $.ajax({
                type: "post",
                data: JSON.stringify({
                    id: id
                }),
                url: URLUtils.getAbsoluteURL("/admin/admin-makeadmin-user/" + id),
                contentType: "application/json",
                success: function(data) {
                    SwalUtils.Success('Admin rights were given to this user.')
                },
                statusCode: {
                    500: function(data) {
                        SwalUtils.ServerError(data.responseJSON.message);
                    }
                }
            });
        }
        if (selected == 2) { //select on user
            $.ajax({
                type: "post",
                data: JSON.stringify({
                    id: id
                }),
                url: URLUtils.getAbsoluteURL("/admin/admin-removeadmin-user/" + id),
                contentType: "application/json",
                success: function(data) {
                    SwalUtils.Success('Admin rights removed for this user.')
                },
                statusCode: {
                    500: function(data) {
                        SwalUtils.ServerError(data.responseJSON.message);
                    }
                }
            });
        }
    });

//select validated/unvalidated
$('#MultiSelect2').change(function () {
        var selected = $('#MultiSelect2 option:selected').val();
        var id = $('#MultiSelect1idArea').val();
        if (selected == 3) { //select on validatred
            $.ajax({
                type: "post",
                data: JSON.stringify({
                    id: id
                }),
                url: URLUtils.getAbsoluteURL("/admin/admin-validate-user/" + id),
                contentType: "application/json",
                success: function(data) {
                    SwalUtils.Success('User is now validated.')
                },
                statusCode: {
                    500: function(data) {
                        SwalUtils.ServerError(data.responseJSON.message);
                    }
                }
            });
        }
        if (selected == 4) { //select on unvalidated
            $.ajax({
                type: "post",
                data: JSON.stringify({
                    id: id
                }),
                url: URLUtils.getAbsoluteURL("/admin/admin-unvalidate-user/" + id),
                contentType: "application/json",
                success: function(data) {
                    SwalUtils.Success('User is no longer validated.')
                },
                statusCode: {
                    500: function(data) {
                        SwalUtils.ServerError(data.responseJSON.message);
                    }
                }

            });
        }
    });


//Delet user
$('#Delete-user-button').on("click", function() {
    var id = $('#DeletedArea').val();

    SwalUtils.DangerousConfirm("Are you sure you want to do this?", "The user will be permanently deleted.").then(function(result) {
        if (result.value) {
            $.ajax({
                type: 'post',
                data: JSON.stringify({
                    id: id
                }),
                contentType: 'application/json',
                url: URLUtils.getAbsoluteURL('/admin/admin-delete-user/' + id),
                success: function(data) {
                    SwalUtils.Success('User has been permanently deleted.').then(function(result) {
                        location.href = URLUtils.getAbsoluteURL('/admin/admin');
                    });
                },
                statusCode: {
                    500: function(data) {
                        SwalUtils.ServerError(data.responseJSON.message);
                    }
                }
            });
        }else if (result.dismiss === swal.DismissReason.cancel)// Read more about handling dismissals
        {
            SwalUtils.Error("Cancelled : the user is safe :)");
        }
    });
});
