//Save edit
$('#btn-save').on("click", function() {
    var corp = $('#CorpTextArea').val();
    var id = window.projectId;
    $.ajax({
        type: 'post',
        data: JSON.stringify({
            corp: corp
        }),
        contentType: 'application/json',
        url: URLUtils.getAbsoluteURL('/projects/save/' + id),
        success: function(data) {
            SwalUtils.Success('Project has been saved.')
        },
        statusCode: {
            500: function(data) {
                SwalUtils.ServerError(data.responseJSON.message);
            }
        }
    });
});

//Delet project from user (change argument in database)
$('#btn-delete-user').on("click", function() {
    var id = window.projectId;
    confirmdeleteproject(buttondeleteproject).then(function(result) {
        if (result.value) {
            $.ajax({
                type: 'post',
                contentType: 'application/json',
                url: URLUtils.getAbsoluteURL('/projects/userdelete/' + id),
                success: function(data) {
                    SwalUtils.Success('Project has been deleted.').then(function(result) {
                        location.href = URLUtils.getAbsoluteURL('/');
                    })
                },
                statusCode: {
                    500: function(data) {
                        SwalUtils.ServerError(data.responseJSON.message);
                    }
                }
            });
        } else if (
            // Read more about handling dismissals
            result.dismiss === swal.DismissReason.cancel
        ) {
            confirmdeleteproject(
                'Cancelled',
                'Your file is safe :)',
                'error'
            );
        }
    });
});

//Restor project
$('#btn-restore').on("click", function() {
    var id = window.projectId;
    $.ajax({
        type: 'post',
        contentType: 'application/json',
        url: URLUtils.getAbsoluteURL('/projects/restore/' + id),
        success: function(data) {
            SwalUtils.Success('Project has been restored.');
        },
        statusCode: {
            500: function(data) {
                SwalUtils.ServerError(data.responseJSON.message);
            }
        }
    });
});

//delet project from admin (delet from database)
$('#btn-finaldelete').on("click", function() {
    var id = window.projectId;
    SwalUtils.DangerousConfirm("Are you sure you want to do this?", "The project will be permanently deleted.").then(function(result) {
        if (result.value) {
            $.ajax({
                type: 'post',
                contentType: 'application/json',
                url: URLUtils.getAbsoluteURL('/projects/admindelete/' + id),
                success: function(data) {
                    SwalUtils.Success('Project has been permanently deleted.').then(function(result) {
                        location.href = URLUtils.getAbsoluteURL('/projects/list4');
                    });
                },
                statusCode: {
                    500: function(data) {
                        SwalUtils.ServerError(data.responseJSON.message);
                    }
                }
            });
        } else if (result.dismiss === swal.DismissReason.cancel)// Read more about handling dismissals
        {
            SwalUtils.Error("Cancelled : the project is safe :)");
        }
    });
});
