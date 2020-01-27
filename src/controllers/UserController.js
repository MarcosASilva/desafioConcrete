const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv/config')

module.exports = {
    async create(req, res) {

        const {
            email
        } = req.body
        if (await User.findOne({
                email
            })) {
            return res.status(400).send({
                error: 'Email já existente'
            });
        }

        const user = await User.create(req.body)

        return res.status(201).json(user)
    },
    async signIn(req, res) {

        const {
            email,
            senha
        } = req.body
        const user = await User.findOne({
            email
        })
        if (user) {
            if (bcrypt.compareSync(req.body.senha, user.senha)) {
                const id = user._id
                const token = jwt.sign({
                    id
                }, process.env.SECRET, {
                    expiresIn: 86400
                })
                const ultimo_login = Date.now()
                user.set({
                    ultimo_login: ultimo_login,
                    token: token
                })
                await user.save()
                return res.status(201).json(user)
            } else {
                // Passwords don't match
                return res.status(400).send({
                    error: 'Senha não correspondente'
                });
            }


        } else {
            return res.status(401).send({
                error: 'Usuario não existente'
            });
        }

        // const user = await User.create(req.body)


    },
    async searchUser(req, res) {

        token = req.headers.token
        if (token&&token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
            user1 = await User.findOne({
                token: token
            })
            if (user1) {
                user2 = await User.findOne({_id : req.params.id})
                if (user1.token == user2.token) {
                    timeNow = Date.now()
                    if ((timeNow - user2.ultimo_login) > 1800000) {
                        res.status(403).send({
                            error: 'Sessão Inválida'
                        })
                    } else {
                        res.status(403).json(user2)
                        //res.status(200).json(user2)
                    }

                } else {
                    res.status(401).send({
                        error: 'Não Autorizado'
                    })
                }
            } else {
                res.status(401).send({
                    error: 'Não Autorizado'
                })
            }
        } else {
            res.status(401).send({
                error: 'Não Autorizado'
            })
        }

    }
}