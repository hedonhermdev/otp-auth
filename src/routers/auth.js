const express = require('express')
const User = require('../models/user')

const router = new express.Router()


router.post('/register', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        return res.status(201).send({ user })
    } catch(e) {
        return res.status(400).send(e)
    }
})


router.post('/requestOTP', async (req, res) => {
    let email = ""
    try {
        email = req.body.email
    } catch(e) {
        res.status(400).send()
    }

    user = await User.findOne({ email })

    if (!user) {
        return res.status(400).send({ "error": "User with email address not found. " })
    }
    console.log(user)

    const otp = await user.generateOTP()

    console.log(otp)

    return res.status(200).send({ "message": "Successfully generated and sent OTP to email. "})
})


router.post('/validateOTP', async (req, res) => {
    try {
        isValid = await User.validateOTPWithEmail(req.body.email, req.body.otp)
        return res.status(200).send({"message": "OTP is valid "})
    } catch(e) {
        return res.status(401).send({"error": e })
    }
})




module.exports = router
