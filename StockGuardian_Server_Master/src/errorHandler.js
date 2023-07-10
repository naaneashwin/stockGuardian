const { VALIDATION_ERROR, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, SERVER_ERROR, error_codes } = require("./constants");

function errorHandler(err, req, res, next) {
    // console.log('In handler', err, err.message)
    const statusCode = res.statusCode && error_codes.includes(res.statusCode) ? res.statusCode : 500;
    let title;
    switch (statusCode) {
        case VALIDATION_ERROR:
            title = 'Validation Error';
            break;
        case UNAUTHORIZED:
            title = 'Unauthorized';
            break;
        case FORBIDDEN:
            title = 'Forbidden';
            break;
        case NOT_FOUND:
            title = 'Not Found';
            break;
        case SERVER_ERROR:
            title = 'Server Error';
            break;
        default:
            title = 'No error.. All good !!'
            break;
    }
    res.json({
        title: title,
        message: err.message,
        stackTrace: err.stack
    });
    next();
}

module.exports = {
    errorHandler
}