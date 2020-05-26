const express = require('express')
const redis = require('redis')

require('./data/mongoose')
require('./data/redis')

const authRouter = require('./routers/auth')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(authRouter)


app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`)    
})
