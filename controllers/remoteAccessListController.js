const { RemoteAccessList, Company, Asset } = require("../models");
const { Op } = require("sequelize");
const excludeData = ['createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt'];
const { response, responsePagination } = require('../utility/response');
const cekPagination = require('../utility/cekPagination');
const title = "RemoteAccessList";
class RemoteAccessListController {
    static show = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await RemoteAccessList.count({
            where: {
                [Op.or]: [{
                    alias: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await RemoteAccessList.findAll({
            where: {
                [Op.or]: [{
                    alias: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            },
            attributes: {
                exclude: excludeData
            },
            include: [
                {
                    model: Asset,
                    attributes: {
                        exclude: excludeData
                    }
                }
            ],
            offset: offset,
            limit: limit,
            order: [
                ['alias', 'ASC']
            ]
        });
        let next = cekPagination(page, totalPage).next;
        let prev = cekPagination(page, totalPage).prev;
        responsePagination(200, result, page, limit, totalRows, totalPage, prev, next, "Get data " + title + " success", res);
    }
    static showAll = async (req, res) => {
        const result = await RemoteAccessList.findAll({
            attributes: {
                exclude: excludeData
            },
            include: [
                {
                    model: Asset,
                    attributes: {
                        exclude: excludeData
                    }
                }
            ],
            order: [
                ['alias', 'ASC']
            ]
        });
        response(200, result, "Get data " + title + " success", res);
    }
    static getDataById = async (req, res) => {
        const { id } = req.params
        const result = await RemoteAccessList.findByPk(id);
        response(200, result, "Get data " + title + " success", res);
    }
    static store = async (req, res) => {
        const nameUser = req.userData.alias
        const { alias, assetId, remoteId, remoteUser, remotePassword, remoteSource } = req.body;
        const result = await RemoteAccessList.create({
            assetId: assetId,
            alias: alias,
            remoteId: remoteId,
            remoteUser: remoteUser,
            remotePassword: remotePassword,
            remoteSource: remoteSource,
            createdBy: nameUser,
            modifiedBy: nameUser
        });
        response(201, result, "Create " + title + " success", res);
    }
    static update = async (req, res) => {
        const nameUser = req.userData.alias
        const { id } = req.params;
        const { alias, assetId, remoteId, remoteUser, remotePassword, remoteSource } = req.body;
        const data = await RemoteAccessList.findByPk(id);
        if (!data) {
            response(404, null, "" + title + " not found", res);
        }
        await RemoteAccessList.update(
            {
                alias: alias,
                assetId: assetId,
                remoteId: remoteId,
                remoteUser: remoteUser,
                remotePassword: remotePassword,
                remoteSource: remoteSource,
                modifiedBy: nameUser,
            },
            { where: { id: id } }
        );
        const result = await RemoteAccessList.findByPk(id);
        response(200, result, "Update " + title + " success", res);
    }
    static destroy = async (req, res) => {
        const nameUser = req.userData.alias
        const { id } = req.params;
        const data = await RemoteAccessList.findByPk(id);
        if (!data) {
            response(404, null, "" + title + " not found", res);
        }
        await RemoteAccessList.destroy({
            where: {
                id: id
            }
        });
        response(204, null, "Delete " + title + " success", res);
    }
}
module.exports = RemoteAccessListController