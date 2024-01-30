const { User } = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { Op } = require("sequelize");
const { response, responsePagination } = require('../utility/response');
const cekPagination = require('../utility/cekPagination');
const title = "User";
class UserController {
    static show = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await User.count({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await User.findAll({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            },
            offset: offset,
            limit: limit,
            order: [
                ['name', 'ASC']
            ]
        });
        let next = cekPagination(page, totalPage).next;
        let prev = cekPagination(page, totalPage).prev;
        responsePagination(200, result, page, limit, totalRows, totalPage, prev, next, "Get data " + title + " success", res);
    }
    static showAll = async (req, res) => {
        const result = await User.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        response(200, result, "Get data " + title + " success", res);
    }
    static getDataById = async (req, res) => {
        const { id } = req.params
        const result = await User.findByPk(id);
        response(200, result, "Get data " + title + " success", res);
    }
    static store = async (req, res) => {
        const userId = 1
        const { name, email, password } = req.body;
        const hash = bcrypt.hashSync(password, saltRounds)
        const checkEmail = await User.findOne({ where: { email: email } });
        if (checkEmail) {
            response(404, null, "Email already exists", res);
        }
        const result = await User.create({
            name: name,
            email: email,
            password: hash,
            createdBy: userName,
            modifiedBy: userName
        });
        response(201, result, "Create " + title + " success", res);
    }
    static update = async (req, res) => {
        const userName = req.userData.name
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
                response(404, null, "Email already exists", res);
            }
        }
        const user = await User.findByPk(id);
        if (!user) {
            response(404, null, "" + title + " not found", res);
        }
        await User.update(
            { name: name, email: email, password: hash, modifiedBy: userName, },
            { where: { id: id } }
        );
        const result = await User.findByPk(id);
        response(200, result, "Update " + title + " success", res);

    }
    static destroy = async (req, res) => {
        const userName = req.userData.name
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            response(404, null, "" + title + " not found", res);
        }
        await User.destroy({
            where: {
                id: id
            }
        });
        response(204, null, "Delete " + title + " success", res);
    }
}
module.exports = UserController