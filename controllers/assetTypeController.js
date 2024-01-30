const { AssetType } = require("../models");
const { Op } = require("sequelize");
const { response, responsePagination } = require('../utility/response');
const cekPagination = require('../utility/cekPagination');
const title = "Asset Type";
class AssetTypeController {
    static show = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await AssetType.count({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await AssetType.findAll({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            },
            order: [
                ['id', 'ASC']
            ],
            attributes: {
                exclude: ['createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
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
        const result = await AssetType.findAll({
            order: [
                ['id', 'ASC']
            ],
            attributes: {
                exclude: ['createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
            },
            order: [
                ['name', 'ASC']
            ]
        });
        response(200, result, "Get data " + title + " success", res);
    }

    static getDataById = async (req, res) => {
        const { id } = req.params
        const result = await AssetType.findByPk(id);
        response(200, result, "Get data " + title + " success", res);
    }
    static store = async (req, res) => {
        const userName = req.userData.name
        const { name, description } = req.body;
        const result = await AssetType.create({
            name: name,
            description: description,
            createdBy: userName,
            modifiedBy: userName
        });
        response(201, result, "Create " + title + " success", res);
    }
    static update = async (req, res) => {
        const userName = req.userData.name
        const { id } = req.params;
        const { name, description } = req.body;
        const data = await AssetType.findByPk(id);
        if (!data) {
            response(404, null, "" + title + " not found", res);
        }
        await AssetType.update(
            { name: name, description: description, modifiedBy: userName, },
            { where: { id: id } }
        );
        const result = await AssetType.findByPk(id);
        response(200, result, "Update " + title + " success", res);

    }
    static destroy = async (req, res) => {
        const userName = req.userData.name
        const { id } = req.params;
        const data = await AssetType.findByPk(id);
        if (!data) {
            response(404, null, "" + title + " not found", res);
        }
        await AssetType.destroy({
            where: {
                id: id
            }
        });
        response(204, null, "Delete " + title + " success", res);
    }
}
module.exports = AssetTypeController