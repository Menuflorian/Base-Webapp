var swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-danger swal-btn-last',
    cancelButtonClass: 'btn btn-primary swal-btn-not-last',
    buttonsStyling: false,
});


//Select admin/user
$('#MultiSelect1').multiselect({
    onChange: function() {
        var selected = $('#MultiSelect1 option:selected').val();
        var id = $('#MultiSelect1idArea').val();
        console.log(id);
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
                        showConfirmButton: false,
                        timer: 1500
                    });
                },
                error: function(data) {
                    swalWithBootstrapButtons({
                        position: 'center',
                        type: 'error',
                        title: 'Error',
                        showConfirmButton: false,
                        timer: 1500
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
                        showConfirmButton: false,
                        timer: 1500
                    });
                },
                error: function(data) {
                    swalWithBootstrapButtons({
                        position: 'center',
                        type: 'error',
                        title: 'Error',
                        showConfirmButton: false,
                        timer: 1500
                    });
                },
            });
        }
    }
});


//select validated/unvalidated
$('#MultiSelect2').multiselect({
    onChange: function() {
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
                        showConfirmButton: false,
                        timer: 1500
                    });
                },
                error: function(data) {
                    swalWithBootstrapButtons({
                        position: 'center',
                        type: 'error',
                        title: 'Error',
                        showConfirmButton: false,
                        timer: 1500
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
                        showConfirmButton: false,
                        timer: 1500
                    });
                },
                error: function(data) {
                    swalWithBootstrapButtons({
                        position: 'center',
                        type: 'error',
                        title: 'Error',
                        showConfirmButton: false,
                        timer: 1500
                    });
                },
            });
        }
    }
});

//Delet user
$('#Delet-user-button').on("click", function() {
    var id = $('#DeletidArea').val();

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
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function(result) {
                        location.href = URLUtils.getAbsoluteURL('/admin/admin');
                    });

                },
                error: function(data) {
                    swalWithBootstrapButtons({
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
                'Your User is safe :)',
                'error'
            );
        }
    });
});
