// importing express module
const express = require('express')
// calling the express function 
const server = express()
// importing routes file
const routes = require('./routes')
const path = require("path")

// setting the ejs to template engine
server.set('view engine', 'ejs')

// changing the views folder locale
server.set('views', path.join(__dirname, 'views'))

// allowing statics files on public folder
server.use(express.static("public"))

// allowing req.body
server.use(express.urlencoded({ extended: true }))

// routes
server.use(routes)

// running the server on port 3000
server.listen(3000, () => console.log('Server listenning on port 3000'))