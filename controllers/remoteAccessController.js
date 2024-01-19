const { AssetRemoteAccess } = require("../models");
const { Op } = require("sequelize");
const { response, responsePagination } = require('../utility/response');
const cekPagination = require('../utility/cekPagination');
const title = "Remote Access";
class AssetRemoteAccessController {
    static show = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await AssetRemoteAccess.count({
            where: {
                [Op.or]: [{
                    remoteType: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await AssetRemoteAccess.findAll({
            where: {
                [Op.or]: [{
                    remoteType: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            },
            attributes: {
                exclude: ['createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
            },
            offset: offset,
            limit: limit,
            order: [
                ['id', 'ASC']
            ]
        });
        let next = cekPagination(page, totalPage).next;
        let prev = cekPagination(page, totalPage).prev;
        responsePagination(200, result, page, limit, totalRows, totalPage, prev, next, "Get data " + title + " success", res);
    }
    static showAll = async (req, res) => {
        const result = await AssetRemoteAccess.findAll({
            order: [
                ['id', 'ASC']
            ],
            attributes: {
                exclude: ['createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
            }
        });
        response(200, result, "Get data " + title + " success", res);
    }
    static getDataById = async (req, res) => {
        const { id } = req.params
        const result = await AssetRemoteAccess.findByPk(id);
        response(200, result, "Get data " + title + " success", res);
    }
    static store = async (req, res) => {
        const userId = req.userData.id
        const { assetId, remoteType, remoteId, password } = req.body;
        const newAssetRemoteAccess = await AssetRemoteAccess.create({
            assetId: assetId,
            remoteType: remoteType,
            remoteId: remoteId,
            password: password,
            createdBy: userId,
            modifiedBy: userId
        });
        response(201, result, "Create " + title + " success", res);
    }
    static update = async (req, res) => {
        const userId = req.userData.id
        const { id } = req.params;
        const { assetId, remoteType, remoteId, password } = req.body;
        const remoteaccess = await AssetRemoteAccess.findByPk(id);
        if (!remoteaccess) {
            response(404, null, "" + title + " not found", res);
        }
        await AssetRemoteAccess.update(
            {
                assetId: assetId,
                remoteType: remoteType,
                remoteId: remoteId,
                password: password,
                modifiedBy: userId,
            },
            { where: { id: id } }
        );
        const result = await AssetRemoteAccess.findByPk(id);
        response(200, result, "Update " + title + " success", res);
    }
    static destroy = async (req, res) => {
        const userId = req.userData.id
        const { id } = req.params;
        const AssetRemoteAccess = await AssetRemoteAccess.findByPk(id);
        if (!AssetRemoteAccess) {
            response(404, null, "" + title + " not found", res);
        }
        await AssetRemoteAccess.update(
            {
                isDeleted: true,
                isActive: false,
                deletedBy: userId,
                deletedAt: new Date(),
                modifiedBy: userId
            },
            { where: { id: id } }
        );
        response(204, null, "Delete " + title + " success", res);
    }
}
module.exports = AssetRemoteAccessController