

function ApplicationError(message) {
    this.message = message;
    this.stack = (new Error()).stack;
}
ApplicationError.prototype = Object.create(Error.prototype);
ApplicationError.prototype.toJSON = function(){
    return {
        name:this.name,
        message:this.message
    }
};
ApplicationError.prototype.name = "ApplicationError";
ApplicationError.prototype.constructor = ApplicationError;


function UsernameOrEmailAlreadyUsed(message) {
    ApplicationError.call(this, message || "Username or email already used.")
}
UsernameOrEmailAlreadyUsed.prototype = Object.create(ApplicationError.prototype);
UsernameOrEmailAlreadyUsed.prototype.name = "UsernameOrEmailAlreadyUsed";
UsernameOrEmailAlreadyUsed.prototype.constructor = UsernameOrEmailAlreadyUsed;

module.exports = {
    "ApplicationError":ApplicationError,
    "UsernameOrEmailAlreadyUsed":UsernameOrEmailAlreadyUsed
};

function InvalidForm(message) {
    ApplicationError.call(this, message || "Someting is wrong with the form, incorrect data was sent to server, request failed.")
}
InvalidForm.prototype = Object.create(ApplicationError.prototype);
InvalidForm.prototype.name = "InvalidForm";
InvalidForm.prototype.constructor = InvalidForm;

module.exports = {
    "ApplicationError":ApplicationError,
    "UsernameOrEmailAlreadyUsed":UsernameOrEmailAlreadyUsed,
    "InvalidForm":InvalidForm
};