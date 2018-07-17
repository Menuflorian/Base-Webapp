

$('#btn-save').on("click", function() {
    var corp = $('#CorpTextArea').val();
    var id = $('#IdSaveArea').val();
    $.ajax({
        type: 'post',
        data: JSON.stringify({
            corp:corp
        }),
        contentType: 'application/json',
        url: "http://localhost:3000/exports/edit/" + id,
        success:    function(data) {
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
    $.ajax({
        type: 'post',
        contentType: 'application/json',
        url: "http://localhost:3000/exports/userdelete/" + id,
        success:    function(data) {
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
});

$('#btn-restore').on("click", function() {
    var id = $('#IdRestoreArea').val();
    $.ajax({
        type: 'post',
        contentType: 'application/json',
        url: "http://localhost:3000/exports/restore/" + id,
        success:    function(data) {
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
