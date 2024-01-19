const { Depreciation } = require("../models");
const { Op } = require("sequelize");
const { response, responsePagination } = require('../utility/response');
const cekPagination = require('../utility/cekPagination');
const title = "Depreciation";
class DepreciationController {
    static show = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await Depreciation.count({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await Depreciation.findAll({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            },
            attributes: {
                exclude: ['createdBy', 'modifiedBy', 'createdAt', 'updatedAt']
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
        const result = await Depreciation.findAll({
            attributes: {
                exclude: ['createdBy', 'modifiedBy', 'createdAt', 'updatedAt']
            },
            order: [
                ['name', 'ASC']
            ]
        });
        response(200, result, "Get data " + title + " success", res);
    }
    static getDataById = async (req, res) => {
        const { id } = req.params
        const result = await Depreciation.findByPk(id);
        response(200, result, "Get data " + title + " success", res);
    }
    static store = async (req, res) => {
        const userId = req.userData.id
        const { name, term, floorValue } = req.body;
        const result = await Depreciation.create({
            name: name,
            term: term,
            floorValue: floorValue,
            createdBy: userId,
            modifiedBy: userId
        });
        response(200, result, "Update " + title + " success", res);

    }
    static update = async (req, res) => {
        const userId = req.userData.id
        const { id } = req.params;
        const { name, term, floorValue } = req.body;
        const depresiasi = await Depreciation.findByPk(id);
        if (!depresiasi) {
            response(404, null, "" + title + " not found", res);
        }
        await Depreciation.update(
            { name: name, term: term || null, floorValue: floorValue || null, modifiedBy: userId, },
            { where: { id: id } }
        );
        const result = await Depreciation.findByPk(id);
        response(200, result, "Update " + title + " success", res);
    }
    static destroy = async (req, res) => {
        const userId = req.userData.id
        const { id } = req.params;
        const depresiasi = await Depreciation.findByPk(id);
        if (!depresiasi) {
            response(404, null, "" + title + " not found", res);
        }
        await Depreciation.destroy({
            where: {
                id: id
            }
        });
        response(204, null, "Delete " + title + " success", res);
    }
}
module.exports = DepreciationController