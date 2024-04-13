const User = require('../models/userModel')
const ErrorHander = require('../utils/errorHander')
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');


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