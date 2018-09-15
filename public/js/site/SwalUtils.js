
var SwalUtils = {
    ServerError:function(title){
        swal.mixin({
            confirmButtonClass: 'btn btn-danger swal-btn-last',
            buttonsStyling: false,
        })({
            position: 'center',
            type: 'error',
            title: title,
            showConfirmButton: true,
        });
    },
    Success:function(title){
        swal.mixin({
            confirmButtonClass: 'btn btn-success swal-btn-last',
            buttonsStyling: false,
        })({
            position: 'center',
            type: 'success',
            title: title,
            showConfirmButton: true,
        });
    },
    DangerousConfirm:function(title, text){
        swal.mixin({
            confirmButtonClass: 'btn btn-danger swal-btn-last',
            cancelButtonClass: 'btn btn-primary swal-btn-not-last',
            buttonsStyling: false,
        })({
            title: title,
            text: text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, do it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        });
    }
};