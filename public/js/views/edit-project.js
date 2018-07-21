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
    swalWithBootstrapButtons({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then(function(result) {
        if (result.value) {
            $.ajax({
                type: 'post',
                contentType: 'application/json',
                url: URLUtils.getAbsoluteURL('/exports/userdelete/' + id),
                success: swalsuccess('Project is now deleted').then(function(result) {
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
            swalWithBootstrapButtons(
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

    swalWithBootstrapButtons({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then(function(result) {
        if (result.value) {
            $.ajax({
                type: 'post',
                contentType: 'application/json',
                url: URLUtils.getAbsoluteURL('/exports/admindelete/' + id),
                success: swalsuccess('Project has been extarminated.').then(function(result) {
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
            swalWithBootstrapButtons(
                'Cancelled',
                'Your file is safe :)',
                'error'
            );
        }
    });
});
