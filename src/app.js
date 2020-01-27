const express = require("express")
const bodyParser = require("body-parser")
const routes = require('./routes')
const mongoose = require('mongoose')
require("dotenv/config")

mongoose.connect("mongodb://marcos:desafioC@desafioconcrete-shard-00-00-zd7zq.mongodb.net:27017,desafioconcrete-shard-00-01-zd7zq.mongodb.net:27017,desafioconcrete-shard-00-02-zd7zq.mongodb.net:27017/test?ssl=true&replicaSet=desafioConcrete-shard-0&authSource=admin&retryWrites=true&w=majority")


const app = express()


app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(routes)

app.listen(process.env.PORT || 3000)