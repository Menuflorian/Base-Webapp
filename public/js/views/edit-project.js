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
            swal({
                position: 'center',
                type: 'success',
                title: 'Project has been changed',
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
});

$('#btn-delete-user').on("click", function() {
    var id = $('#IdDeletArea').val();
    var swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-warning',
        cancelButtonClass: 'btn btn-primary',
        buttonsStyling: false,
    });

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
                    swal({
                        position: 'center',
                        type: 'success',
                        title: 'Project is now deleted',
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




$('#btn-restore').on("click", function() {
    var id = $('#IdRestoreArea').val();
    $.ajax({
        type: 'post',
        contentType: 'application/json',
        url: URLUtils.getAbsoluteURL('/exports/restore/' + id),
        success: function(data) {
            swal({
                position: 'center',
                type: 'success',
                title: 'Project is restored',
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
});

$('#btn-finaldelet').on("click", function() {
    var id = $('#IdFinalDeleteArea').val();
    var swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-primary',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
    });

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
                    swal({
                        position: 'center',
                        showCancelButton: false,
                        type: 'success',
                        title: 'Project has been extarminated.',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function(result) {
                        location.href = URLUtils.getAbsoluteURL('/exports/projects4');
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
