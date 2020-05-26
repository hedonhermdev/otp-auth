var redis = require('async-redis')

var client = redis.createClient();

client.on('error', function(err) {
    console.log(`Could not connect to Redis server: ${err}`)
})


client.on("ready", function() {
    console.log("Successfully connected to Redis server. ")
})


module.exports = client
