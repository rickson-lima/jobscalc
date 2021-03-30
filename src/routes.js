const express = require('express')
// calling Router function from express module to routes const
const routes = express.Router()
// views folder's path
const views = __dirname + '/views/'
// pseudo-database
const profile = {
   name: "Rickson Lima",
   avatar: "https://avatars.githubusercontent.com/u/63025293?v=4",
   "monthly-budget": 2400,
   "days-per-week": 5,
   "hours-per-day": 6,
   "vacation-per-year": 3,
}

// returning pages on each router with profile object
routes.get('/', (req, res) => res.render(views + 'index', { profile }))
routes.get('/job', (req, res) => res.render(views + 'job'))
routes.get('/job/edit', (req, res) => res.render(views + 'job-edit'))
routes.get('/profile', (req, res) => res.render(views + 'profile', { profile }))

// exporting routes file
module.exports = routes;