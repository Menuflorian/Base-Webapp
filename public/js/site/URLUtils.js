
var URLUtils = {
    getAbsoluteURL:function(path){
        if(path[0] !== "/"){
            console.error("Error in URLUtils : please provide a path starting with /");
        }
        var port = window.location.port;
        if(port !== ""){
            port = ":"+port;
        }
        return window.location.protocol + "//" + window.location.hostname + port + path;
    }
};
