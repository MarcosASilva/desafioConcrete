const express = require('express')
const UserController = require('./controllers/UserController')

routes = express.Router()

routes.post('/signup', UserController.create)
routes.post('/signin', UserController.signIn)
routes.get('/find/:id', UserController.searchUser)

module.exports = routes