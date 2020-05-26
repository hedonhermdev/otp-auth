const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/otp-auth', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(
    () => console.log("Successfully connected to MongoDB database. "),
    (err) => console.log(err)
)
