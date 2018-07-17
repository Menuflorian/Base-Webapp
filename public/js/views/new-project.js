var loadDualboxApp = function(name) {
    (function(callback) {
        var s = document.createElement("script");
        s.setAttribute("src", "https://dualbox.com/loadapp.js");
        s.onload = callback;
        document.body.appendChild(s);
    })(function() {
        /* Dualbox loader code (will load the application nicely) */
        var div = $('#application');
        DualBox.load({
            "app": name,
            "phase": "production",
            "loaderDiv": div,
        }, function() {
            /* The application code is loaded, start it */
            var app = DualBox.start({
                "logLevel": "warn",
                "profiler": false,
                "div": div
            });
            app.start();

            // Build the name for the app removing "-"
            // ex : my-super-customizer --> mySuperCustomizerApp
            var appName = name;
            var i = appName.search("-");
            while (i !== -1 && i !== appName.length - 1) {
                appName = appName.replace(appName[i] + appName[i + 1], appName[i + 1].toUpperCase());
                i = appName.search("-");
            }
            if (i === appName.length - 1) {
                appName = appName.replace(i, "");
            }

            window[appName + "App"] = app;
        });
    });
};

// Fill corp with app export when clicking on save
$('#saveProjectModal').on('show.bs.modal', function(event) {
    var exp = window.iphoneCaseEngraveApp.export();
    delete exp.input.file; // remove the file for now since it's too heavy
    $('#corpTextArea').text(JSON.stringify(exp));

    // Could be a useful jquery example if we decide to remove ids
    // var modal = $(this)
    // modal.find('.modal-title').text('New message to ' + recipient)
    // modal.find('.modal-body input').val(recipient)
});

$('#saveProjectButton').on("click", function() {
    var modal = $('#saveProjectModal');
    var name = $('#nameTextArea').val();
    var exp = window.iphoneCaseEngraveApp.export();
    delete exp.input.file;
    $.ajax({
        type: 'post',
        data: JSON.stringify({
            name: name,
            corp: JSON.stringify(exp)
        }),
        contentType: 'application/json',
        url: URLUtils.getAbsoluteURL("/exports/save"),
        success: function(data) {
            swal({
                position: 'center',
                type: 'success',
                title: 'Your work has been saved',
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

loadDualboxApp("iphone-case-engrave");
