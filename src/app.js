const express = require("express")
const bodyParser = require("body-parser")
const routes = require('./routes')
const mongoose = require('mongoose')
require("dotenv/config")

mongoose.connect(process.env.MONGO_URL)


const app = express()


app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(routes)

app.listen(process.env.PORT || 3000)