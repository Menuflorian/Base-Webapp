var swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-danger swal-btn-last',
    cancelButtonClass: 'btn btn-primary swal-btn-not-last',
    buttonsStyling: false,
});


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
                    swalWithBootstrapButtons({
                        position: 'center',
                        type: 'success',
                        title: 'User is now admin.',
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
                    swalWithBootstrapButtons({
                        position: 'center',
                        type: 'success',
                        title: 'Admin is now user',
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
                    swalWithBootstrapButtons({
                        position: 'center',
                        type: 'success',
                        title: 'User is now valedated.',
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
                    swalWithBootstrapButtons({
                        position: 'center',
                        type: 'success',
                        title: 'User no longer validated',
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
        }
    });


//Delet user
$('#Delete-user-button').on("click", function() {
    var id = $('#DeleteidArea').val();

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
                data: JSON.stringify({
                    id: id
                }),
                contentType: 'application/json',
                url: URLUtils.getAbsoluteURL('/admin/admin-delete-user/' + id),
                success: function(data) {
                    swalWithBootstrapButtons({
                        position: 'center',
                        showCancelButton: false,
                        type: 'success',
                        title: 'User has been deleted',
                        showConfirmButton: true,
                    }).then(function(result) {
                        location.href = URLUtils.getAbsoluteURL('/admin/admin');
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
                'Your User is safe :)',
                'error'
            );
        }
    });
});
