// importing express module
const express = require('express')
// calling the express function 
const server = express()
// importing routes files
const routes = require('./routes')

// setting the ejs to template engine
server.set('view engine', 'ejs')

// allowing statics files on public folder
server.use(express.static("public"))

// routes
server.use(routes)

// running the server on port 3000
server.listen(3000, () => console.log('rodando'))