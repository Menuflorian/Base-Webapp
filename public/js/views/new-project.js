
var loadDualboxApp = function(name){
    (function(callback) {
        var s = document.createElement("script");
        s.setAttribute("src", "https://dualbox.com/loadapp.js");
        s.onload=callback; document.body.appendChild(s);
    })(function() {
        /* Dualbox loader code (will load the application nicely) */
        var div = $('#application');
        DualBox.load({
            "app"  : name,
            "phase": "production",
            "loaderDiv": div,
        }, function() {
            /* The application code is loaded, start it */
            var app = DualBox.start({
                "logLevel": "warn",
                "profiler": false,
                "div" : div
            });
            app.start();

            // Build the name for the app removing "-"
            // ex : my-super-customizer --> mySuperCustomizerApp
            var appName = name;
            var i = appName.search("-");
            while(i !== -1 && i !== appName.length-1){
                appName = appName.replace(appName[i]+appName[i+1], appName[i+1].toUpperCase());
                i = appName.search("-");
            }
            if(i === appName.length-1){
                appName = appName.replace(i,"");
            }

            window[appName+"App"] = app;
        });
    });
};
