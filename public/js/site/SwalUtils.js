//Pop-up Success
var swalsuccess = function(title) {
    swalsuccessbutton({
        position: 'center',
        type: 'success',
        title: title,
        showConfirmButton: true,
    });
};
var swalsuccessbutton = swal.mixin({
    confirmButtonClass: 'btn btn-success swal-btn-last',
    buttonsStyling: false,
});

//pop-up Error
var swalerrorgen = function(title) {
    swalerrorbutton({
        position: 'center',
        type: 'error',
        title: title,
        showConfirmButton: true,
    });
};
var swalerrorbutton = swal.mixin({
    confirmButtonClass: 'btn btn-danger swal-btn-last',
    buttonsStyling: false,
});


//pop-up Error 400
var swalerror400 = function(title) {
    swalerror400button({
        position: 'center',
        type: 'error',
        title: "Error, Incorrect password",
        showConfirmButton: true,
    });
};
var swalerror400button = swal.mixin({
    confirmButtonClass: 'btn btn-danger swal-btn-last',
    buttonsStyling: false,
});

//error 400
var show400 = function(data) {
        var x = document.getElementById("error400");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }};


//pop-up Error 401
var swalerror401 = function(title) {
    swalerror401button({
        position: 'center',
        type: 'error',
        title: "Error, User unknown",
        showConfirmButton: true,
    });
};
var swalerror401button = swal.mixin({
    confirmButtonClass: 'btn btn-danger swal-btn-last',
    buttonsStyling: false,
});

//error 401
var show401 = function(data) {
        var x = document.getElementById("error401");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }};


//pop-up Error 402
var swalerror402 = function(title) {
    swalerror402button({
        position: 'center',
        type: 'error',
        title: "Error, New password don't match with cofirm password",
        showConfirmButton: true,
    });
};
var swalerror402button = swal.mixin({
    confirmButtonClass: 'btn btn-danger swal-btn-last',
    buttonsStyling: false,
});

//error 402
var show402 = function(data) {
        var x = document.getElementById("error402");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }};


//pop-up Error 403
var swalerror403 = function(title) {
    swalerror403button({
        position: 'center',
        type: 'error',
        title: "Error, E-mail can't be empty.",
        showConfirmButton: true,
        showCancelButton: false,
    });
};
var swalerror403button = swal.mixin({
    confirmButtonClass: 'btn btn-danger swal-btn-last',
    buttonsStyling: false,
});

//error 403
var show403 = function(data) {
        var x = document.getElementById("error403");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }};


//pop-up Error 404
var swalerror404 = function(title) {
    swalerror404button({
        position: 'center',
        type: 'error',
        title: "Error, Password can't be empty.",
        showConfirmButton: true,
        showCancelButton: false,
    });
};
var swalerror404button = swal.mixin({
    confirmButtonClass: 'btn btn-danger swal-btn-last',
    buttonsStyling: false,
});

//error 404
var show404 = function(data) {
        var x = document.getElementById("error404");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }};


//pop-up Error 405
var swalerror405 = function(title) {
    swalerror405button({
        position: 'center',
        type: 'error',
        title: "Error, Email Must be an email form valid",
        showConfirmButton: true,
        showCancelButton: false,
    });
};
var swalerror405button = swal.mixin({
    confirmButtonClass: 'btn btn-danger swal-btn-last',
    buttonsStyling: false,
});

//error 405
var show405 = function(data) {
        var x = document.getElementById("error405");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }};


//pop-up Error 406
var swalerror406 = function(title) {
    swalerror406button({
        position: 'center',
        type: 'error',
        title: 'Error, Username and/or Email is already use.',
        showConfirmButton: true,
        showCancelButton: false,
    });
};
var swalerror406button = swal.mixin({
    confirmButtonClass: 'btn btn-danger swal-btn-last',
    buttonsStyling: false,
});

//error 406
var show406 = function(data) {
        var x = document.getElementById("error406");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }};


//pop-up Error 407
var swalerror407 = function(title) {
    swalerror407button({
        position: 'center',
        type: 'error',
        title: "Error, Name can't be empty.",
        showConfirmButton: true,
        showCancelButton: false,
    });
};
var swalerror407button = swal.mixin({
    confirmButtonClass: 'btn btn-danger swal-btn-last',
    buttonsStyling: false,
});

//error 407
var show407 = function(data) {
        var x = document.getElementById("error407");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }};


//pop-up Error 408
var swalerror408 = function(title) {
    swalerror408button({
        position: 'center',
        type: 'error',
        title: "Error, Username can't be empty.",
        showConfirmButton: true,
        showCancelButton: false,
    });
};
var swalerror408button = swal.mixin({
    confirmButtonClass: 'btn btn-danger swal-btn-last',
    buttonsStyling: false,
});

//error 408
var show408 = function(data) {
        var x = document.getElementById("error408");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }};


//pop-up Error 409
var swalerror409 = function(title) {
    swalerror409button({
        position: 'center',
        type: 'error',
        title: "Error, Confirm password can't be empty.",
        showConfirmButton: true,
        showCancelButton: false,
    });
};
var swalerror409button = swal.mixin({
    confirmButtonClass: 'btn btn-danger swal-btn-last',
    buttonsStyling: false,
});

//error 409
var show409 = function(data) {
        var x = document.getElementById("error409");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }};


//pop-up Error 410
var swalerror410 = function(title) {
    swalerror410button({
        position: 'center',
        type: 'error',
        title: "Error, Password don't match with cofirm password",
        showConfirmButton: true,
        showCancelButton: false,
    });
};
var swalerror410button = swal.mixin({
    confirmButtonClass: 'btn btn-danger swal-btn-last',
    buttonsStyling: false,
});

//error 410
var show410 = function(data) {
        var x = document.getElementById("error410");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }};


//pop-up Error 500
var swalerror500 = function(title) {
    swalerror500button({
        position: 'center',
        type: 'error',
        title: "Error, Internal error",
        showConfirmButton: true,
    });
};
var swalerror500button = swal.mixin({
    confirmButtonClass: 'btn btn-danger swal-btn-last',
    buttonsStyling: false,
});

//error 500
var show500 = function(data) {
        var x = document.getElementById("error500");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }};


//pop-up prompt delete User or admin project
var confirmdeleteproject = swal.mixin({
    confirmButtonClass: 'btn btn-danger swal-btn-last',
    cancelButtonClass: 'btn btn-primary swal-btn-not-last',
    buttonsStyling: false,
});
var buttondeleteproject = {
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
};

//pop-up prompt delete user by admin
var confirmdeleteuser = swal.mixin({
    confirmButtonClass: 'btn btn-danger swal-btn-last',
    cancelButtonClass: 'btn btn-primary swal-btn-not-last',
    buttonsStyling: false,
});
var buttondeleteuser = {
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
};

//other function
//isEmail
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
