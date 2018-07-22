//Save edit
$('#btn-save').on("click", function() {
    var corp = $('#CorpTextArea').val();
    var id = $('#IdSaveArea').val();
    $.ajax({
        type: 'post',
        data: JSON.stringify({
            corp: corp
        }),
        contentType: 'application/json',
        url: URLUtils.getAbsoluteURL('/exports/edit/' + id),
            success: function(data) {swalsuccess('Project has been changed');},
            error: function(data) {
                    swalerrorgen();
                },
    });
});

//Delet project from user (change argument in database)
$('#btn-delete-user').on("click", function() {
    var id = $('#IdDeleteArea').val();
    confirmdeleteproject(buttondeleteproject).then(function(result) {
        if (result.value) {
            $.ajax({
                type: 'post',
                contentType: 'application/json',
                url: URLUtils.getAbsoluteURL('/exports/userdelete/' + id),
                success: swalsuccessbutton({
                    position: 'center',
                    type: 'success',
                    title: 'Project is now deleted',
                    showConfirmButton: true,
                }).then(function(result) {
                        location.href = URLUtils.getAbsoluteURL('/');
                    }),
                error: function(data) {
                        swalerrorgen();
                    },
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
    var id = $('#IdRestoreArea').val();
    $.ajax({
        type: 'post',
        contentType: 'application/json',
        url: URLUtils.getAbsoluteURL('/exports/restore/' + id),
        success: function(data) {swalsuccess('Project is restored');},
        error: function(data) {
                swalerror406();
            },
    });
});

//delet project from admin (delet from database)
$('#btn-finaldelete').on("click", function() {
    var id = $('#IdFinalDeleteArea').val();
    confirmdeleteproject(buttondeleteproject).then(function(result) {
        if (result.value) {
            $.ajax({
                type: 'post',
                contentType: 'application/json',
                url: URLUtils.getAbsoluteURL('/exports/admindelete/' + id),
                success: swalsuccessbutton({
                    position: 'center',
                    type: 'success',
                    title: 'Project is defenitly deleted',
                    showConfirmButton: true,
                }).then(function(result) {
                        location.href = URLUtils.getAbsoluteURL('/exports/projects4');
                    }),
                error: function(data) {
                    swalerrorgen();
                },
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
