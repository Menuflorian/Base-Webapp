$('#multiSelect1').multiselect({
    onChange: function() {
        var selected = $('#multiSelect1 option:selected').val();
        var id = $('#idArea').val();
        if (selected == 1) {
            $.ajax({
                type: "post",
                data: JSON.stringify({
                    id:id
                }),
                url: URLUtils.getAbsoluteURL("/admin/admin-makeadmin-user"),
                contentType: "application/json",
                success:    function(data) {
                    swal({
                      position: 'center',
                      type: 'success',
                      title: 'User is now admin',
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
        }
        if (selected == 2) {
            $.ajax({
                type: "post",
                data: JSON.stringify({
                    id:id
                }),
                url: URLUtils.getAbsoluteURL("/admin/admin-removeadmin-user"),
                contentType: "application/json",
                success:    function(data) {
                    swal({
                      position: 'center',
                      type: 'success',
                      title: 'Admin is now user',
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
        }
    }
});
