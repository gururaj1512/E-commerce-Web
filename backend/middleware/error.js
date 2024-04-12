const ErrorHander = require('../utils/errorHander')

let errorMiddleware = (err, req, res, next) => {
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal server error";

    // Wrong Mongodb Id error
    if (err.name == 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHander(message, 400)
    }

    res.status(err.statuscode).json({
        success: false,
        message: err.message
    })
}

module.exports = errorMiddleware