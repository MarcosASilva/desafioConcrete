const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv/config")
const saltRounds = 10;
UserSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
    telefones: [{
        numero: String,
        ddd: String
    }],
    data_criacao: {
        type: Date,
        default: Date.now
    },
    data_atualizacao: {
        type: Date,
        default: Date.now
    },
    ultimo_login: {
        type: Date,
        default: Date.now
    },
    token: String
})
UserSchema.pre('save', function (next) {
    id = process.env.SECRET
    this.senha = bcrypt.hashSync(this.senha,10);
    this.token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 86400 
    });
     
    next();
});

module.exports = mongoose.model("User", UserSchema)