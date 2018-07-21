var swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-warning',
    cancelButtonClass: 'btn btn-primary',
    buttonsStyling: false,
});

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
        success: function(data) {
            swalWithBootstrapButtons({
                position: 'center',
                type: 'success',
                title: 'Project has been changed',
                showConfirmButton: true,
            });
        },
        error: function(data) {
            swalWithBootstrapButtons({
                position: 'center',
                type: 'error',
                title: 'Error',
                showConfirmButton: true,
            });
        },
    });
});


//Delet project from user (change argument in database)
$('#btn-delete-user').on("click", function() {
    var id = $('#IdDeletArea').val();


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
                success: function(data) {
                    swalWithBootstrapButtons({
                        position: 'center',
                        type: 'success',
                        title: 'Project is now deleted',
                        showConfirmButton: true,
                    }).then(function(result) {
                        location.href = URLUtils.getAbsoluteURL('/');
                    });
                },
                error: function(data) {
                    swalWithBootstrapButtons({
                        position: 'center',
                        type: 'error',
                        title: 'Error',
                        showConfirmButton: true,
                    });
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
        success: function(data) {
            swalWithBootstrapButtons({
                position: 'center',
                type: 'success',
                title: 'Project is restored',
                showConfirmButton: true,
            });
        },
        error: function(data) {
            swalWithBootstrapButtons({
                position: 'center',
                type: 'error',
                title: 'Error',
                showConfirmButton: true,
            });
        },
    });
});


//delet project from admin (delet from database)
$('#btn-finaldelet').on("click", function() {
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
                success: function(data) {
                    swalWithBootstrapButtons({
                        position: 'center',
                        showCancelButton: false,
                        type: 'success',
                        title: 'Project has been extarminated.',
                        showConfirmButton: true,
                    }).then(function(result) {
                        location.href = URLUtils.getAbsoluteURL('/exports/projects4');
                    });
                },
                error: function(data) {
                    swalWithBootstrapButtons({
                        position: 'center',
                        type: 'error',
                        title: 'Error',
                        showConfirmButton: true,
                    });
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
