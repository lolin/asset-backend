const { User } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { responseSimple } = require('../utility/response');
const { secret } = require('../config/config.js')
const { jwtExpires } = require('../config/config.js')
class AuthController {

    static login = async (req, res) => {
        const { username, password } = req.body
        if (!username || !password) {
            responseSimple(400, result, "Username and password is required", res);
        }
        const user = await User.findOne({
            where: {
                email: username
            }
        })
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            responseSimple(400, result, "Email or password is invalid", res);
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        }
        const token = jwt.sign(payload, secret, { expiresIn: jwtExpires })
        res.json({
            message: "Login success",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token: token
        })
    }
    static logout = async (req, res) => {
        const { id } = req.params
        const data = await Auth.findByPk(id);
        res.json({
            message: "Get data Auths success",
            data: data
        })
    }
}
module.exports = AuthController