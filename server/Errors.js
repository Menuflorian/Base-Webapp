

function ApplicationError(message) {
    this.message = message;
    this.stack = (new Error()).stack;
}
ApplicationError.prototype = Object.create(Error.prototype);
ApplicationError.prototype.toJSON(){
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