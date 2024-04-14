const User = require('../models/userModel')
const ErrorHander = require('../utils/errorHander')
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');


// Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const {name, email, password} = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "This is a sample id",
            url: "profilePicUrl"
        }
    })
    
    sendToken(user, 201, res)
})

// Login a user
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const {email, password} = req.body
    if (!email || !password) {
        return next(new ErrorHander("Please enter Email & Password", 404))
    }

    const user = await User.findOne({email: email}).select("+password")
    if (!user) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    const isPasswordMatched = user.comparePassword(password)
    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    sendToken(user, 200, res)
})

// Logout a user
exports.logoutUser = catchAsyncError(async(req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "User has been logged out"
    })
})

// Forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email})
    if (!user) {
        return next(new ErrorHander("User not found", 404))
    }

    const resetToken = user.getResetPasswordToken() // Get ResetPasswordToken
    await user.save({validateBeforeSave: false}) // Saving user with resetPasswordToken

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email please ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({validateBeforeSave: false})
        return next(new ErrorHander(error.message, 500))
    }
})