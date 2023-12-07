const { User } = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { Op } = require("sequelize");
class UserController {
    static showAll = async (req, res) => {
        try {
            const data = await User.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            res.json({
                message: "Get data Users success",
                data: data
            })
        } catch (error) {
            res.status(500).json({
                message: "Server error",
                serverMessage: error
            })
        }
    }
    static getDataById = async (req, res) => {
        const { id } = req.params
        try {
            const data = await User.findByPk(id);
            res.json({
                message: "Get data Users success",
                data: data
            })
        } catch (error) {
            res.status(500).json({
                message: "Server error",
                serverMessage: error
            })
        }
    }
    static store = async (req, res) => {
        const { name, email, password } = req.body;
        const hash = bcrypt.hashSync(password, saltRounds)
        if (!name) {
            return res.status(400).json({
                message: "Name cannot be empty"
            })
        }
        if (!email) {
            return res.status(400).json({
                message: "Email cannot be empty"
            })
        }
        if (!password) {
            return res.status(400).json({
                message: "Password cannot be empty"
            })
        }

        const checkEmail = await User.findOne({ where: { email: email } });
        if (checkEmail) {
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        try {
            const newUser = await User.create({
                name: name,
                email: email,
                password: hash,
                createdBy: 1,
                modifiedBy: 1
            });
            res.status(201).json({
                message: "Create user success",
                data: newUser
            })
        } catch (error) {
            res.status(500).json({
                message: "Server error",
                serverMessage: error
            })
        }
    }
    static update = async (req, res) => {
        const { id } = req.params;
        const { name, email, password } = req.body;
        var hash = null;
        if (password) {
            hash = bcrypt.hashSync(password, saltRounds)
        }
        if (email) {
            const checkEmail = await User.findOne({
                where: {
                    email: email,
                    [Op.not]: [{
                        id: id
                    }]
                }
            });
            if (checkEmail) {
                return res.status(400).json({
                    message: "Email already exists"
                })
            }
        }
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        try {
            const updateUser = await User.update(
                { name: name, email: email, password: hash, modifiedBy: 1, },
                { where: { id: id } }
            );

            const userUpdate = await User.findByPk(id);
            res.json({
                message: "Update user success",
                data: userUpdate
            })
        } catch (error) {
            res.status(500).json({
                message: "Server error",
                serverMessage: error
            })
        }
    }
    static destroy = async (req, res) => {
        const { id } = req.params;
        // const { reason } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        // console.log(user)
        try {
            // hapus langsung
            await User.destroy({
                where: {
                    id: id
                }
            });
            res.json({
                message: "Delete user success",
                data: null
            })
        } catch (error) {
            res.status(500).json({
                message: "Server error",
                serverMessage: error
            })
        }

    }
}
module.exports = UserController