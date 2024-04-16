const ErrorHander = require('../utils/errorHander')

let errorMiddleware = (err, req, res, next) => {
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal server error";

    // Wrong Mongodb Id error
    if (err.name == 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHander(message, 400)
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHander(message, 400)
    }

    // JsonWebToken Wrong error
    if (err.code === 'JsonWebToken') {
        const message = `Json web token is Invalid, Try again`
        err = new ErrorHander(message, 400)
    }

    // JsonWebToken Expire error
    if (err.code === 'TokenExpiredError') {
        const message = `Json web token is Expired, Try again`
        err = new ErrorHander(message, 400)
    }

    res.status(err.statuscode).json({
        success: false,
        message: err.message
    })
}

module.exports = errorMiddleware