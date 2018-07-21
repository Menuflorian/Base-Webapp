var SwalFunction ={
    swalsucces: function () {
    swal.mixin({
        confirmButtonClass: 'btn btn-danger',
        cancelButtonClass: 'btn btn-primary',
        buttonsStyling: false,
        position: 'center',
        type: 'success',
        title: 'User is now admin.',
        showConfirmButton: true
    });
}
};

var swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-danger swal-btn-last',
    cancelButtonClass: 'btn btn-primary swal-btn-not-last',
    buttonsStyling: false,
});
