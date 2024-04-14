const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Enter your name"],
        minLength: [3, "Name should exceed more than 3 characters"],
        maxLength: [30, "Name should not exceed more than 3 characters"],
    },
    email : {
        type: String,
        required: [true, "Enter your email"],
        unique: [true, "This email address exists already. Please Login..!"],
        validate: [validator.isEmail, "Invalid email address"],
    },
    password : {
        type: String,
        required: [true, "Enter your password"],
        minLength: [8, "Password should consist more than 8 characters"],
        select: false
    },
    avatar : {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role : {
        type: String,
        default: "user"
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

// Pre Hook
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Generating Password reset token
userSchema.methods.getResetPasswordToken = function() {

    // Generating token
    const resetToken = crypto.randomBytes(20).toString("hex")

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + (1000 * 60 * 15)

    return resetToken
}

module.exports = mongoose.model('User', userSchema)