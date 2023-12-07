const { User } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class AuthController {

    static login = async (req, res) => {
        const { username, password } = req.body
        // console.log(username, password)
        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password is required"
            })
        }
        const user = await User.findOne({
            where: {
                email: username
            }
        })

        if (!user) {
            return res.status(400).json({
                message: "Username not found"
            })
        }

        if (!user.password) {
            return res.status(400).json({
                message: "Passowrd not set"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Wrong password"
            })
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        }
        const secret = process.env.SECRET_KEY
        const jwtExpires = 60 * 60 * 12

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
        try {
            const data = await Auth.findByPk(id);
            res.json({
                message: "Get data Auths success",
                data: data
            })
        } catch (error) {
            res.status(500).json({
                message: "Server error",
                serverMessage: error
            })
        }
    }
}
module.exports = AuthController