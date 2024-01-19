const { Condition } = require("../models");
const { Op } = require("sequelize");
const excludeData = ['createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt'];
const { response, responsePagination } = require('../utility/response');
const cekPagination = require('../utility/cekPagination');
const title = "Condition";
class ConditionController {
    static show = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await Condition.count({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await Condition.findAll({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            },
            attributes: {
                exclude: excludeData
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
        const result = await Condition.findAll({
            attributes: {
                exclude: excludeData
            },
            order: [
                ['name', 'ASC']
            ]
        });
        response(200, result, "Get data " + title + " success", res);
    }
    static getDataById = async (req, res) => {
        const { id } = req.params
        const result = await Condition.findByPk(id);
        response(200, result, "Get data " + title + " success", res);
    }
    static store = async (req, res) => {
        const userId = req.userData.id
        const { name, description } = req.body;
        const result = await Condition.create({
            name: name,
            description: description,
            createdBy: userId,
            modifiedBy: userId
        });
        response(201, result, "Create " + title + " success", res);
    }
    static update = async (req, res) => {
        const userId = req.userData.id
        const { id } = req.params;
        const { name, description } = req.body;
        const data = await Condition.findByPk(id);
        if (!data) {
            response(404, null, "" + title + " not found", res);
        }
        await Condition.update(
            {
                name: name,
                description: description,
                modifiedBy: userId,
            },
            { where: { id: id } }
        );
        const result = await Condition.findByPk(id);
        response(200, result, "Update " + title + " success", res);
    }
    static destroy = async (req, res) => {
        const userId = req.userData.id
        const { id } = req.params;
        const condition = await Condition.findByPk(id);
        if (!condition) {
            response(404, null, "" + title + " not found", res);
        }
        await Condition.destroy({
            where: {
                id: id
            }
        });
        response(204, null, "Delete " + title + " success", res);
    }
}
module.exports = ConditionController