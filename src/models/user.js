const mongoose = require('mongoose')
const validator = require('validator')
const otpGenerator = require('otp-generator')
const redisClient = require('../data/redis')


userSchema = mongoose.Schema({
    "username": {
        "type": String,
        "required": true,
        "trim": true,
        "unique": true
    },
    "email": {
        "type": String,
        "required": true,
        "trim": true,
        "unique": true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address.")
            }
        }
    }
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    return userObject
}

userSchema.methods.generateOTP = async function () {
    const user = this

    const email = user.email

    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false })

    await redisClient.set(email, otp)
    await redisClient.expire(email, 50000)

    return otp
}

userSchema.statics.validateOTPWithEmail = async function (email, otp) {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('User not found')
    }
    const actualOTP = await redisClient.get(email)
    console.log(actualOTP)
    console.log(otp)
    console.log(otp == actualOTP )
    if (actualOTP != otp) {
        throw new Error("Invalid OTP")
    }
    return true
}

const User = mongoose.model('User', userSchema)


module.exports = User

