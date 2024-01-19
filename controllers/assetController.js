const { Asset, Department, Category, Manufacturer, Vendor, Condition } = require("../models");
const { Op } = require("sequelize");
const excludeData = ['isActive', 'isDeleted', 'createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt'];
const excludeData2 = ['createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt'];
const { response, responsePagination } = require('../utility/response');
const cekPagination = require('../utility/cekPagination');
const title = "Asset";
class AssetController {
    static show = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await Asset.count({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await Asset.findAll({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            },
            attributes: {
                exclude: excludeData2
            },
            include: [
                {
                    model: Department,
                    attributes: {
                        exclude: excludeData
                    }
                },
                {
                    model: Category,
                    attributes: {
                        exclude: excludeData
                    }
                },
                {
                    model: Manufacturer,
                    attributes: {
                        exclude: excludeData
                    }
                },
                {
                    model: Vendor,
                    attributes: {
                        exclude: excludeData
                    }
                },
                {
                    model: Condition,
                    attributes: {
                        exclude: excludeData
                    }
                }
            ],
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
        const result = await Asset.findAll({
            attributes: {
                exclude: excludeData2
            },
            include: [
                {
                    model: Department,
                    attributes: {
                        exclude: excludeData
                    }
                },
                {
                    model: Category,
                    attributes: {
                        exclude: excludeData
                    }
                },
                {
                    model: Manufacturer,
                    attributes: {
                        exclude: excludeData
                    }
                },
                {
                    model: Vendor,
                    attributes: {
                        exclude: excludeData
                    }
                },
                {
                    model: Condition,
                    attributes: {
                        exclude: excludeData
                    }
                }
            ],
            order: [
                ['name', 'ASC']
            ]
        });
        response(200, result, "Get data " + title + " success", res);
    }
    static getDataById = async (req, res) => {
        const { id } = req.params
        const result = await Asset.findByPk(id);
        response(200, result, "Get data " + title + " success", res);
    }
    static store = async (req, res) => {
        const userId = req.userData.id
        const {
            name,
            categoryId,
            departmentId,
            manufacturerId,
            vendorId,
            conditionId,
            model,
            macAddress,
            serialNumber,
            ipAddress,
            assetDetails,
            price,
            purchaseDate,
            warrantyPeriod
        } = req.body;

        const result = await Asset.create({
            name: name,
            categoryId: categoryId,
            departmentId: departmentId,
            manufacturerId: manufacturerId,
            vendorId: vendorId,
            conditionId: conditionId,
            model: model,
            serialNumber: serialNumber,
            macAddress: macAddress,
            ipAddress: ipAddress,
            assetDetails: assetDetails,
            price: price,
            purchaseDate: purchaseDate,
            warrantyPeriod: warrantyPeriod,
            createdBy: userId,
            modifiedBy: userId
        });
        response(201, result, "Create " + title + " success", res);
    }
    static update = async (req, res) => {
        const { id } = req.params;
        const {
            name,
            categoryId,
            departmentId,
            manufacturerId,
            vendorId,
            conditionId,
            model,
            macAddress,
            serialNumber,
            ipAddress,
            assetDetails,
            price,
            purchaseDate,
            warantyPeriod
        } = req.body;

        const asset = await Asset.findByPk(id);
        if (!asset) {
            response(404, null, "" + title + " not found", res);
        }
        const updateAsset = await Asset.update(
            {
                name: name,
                categoryId: categoryId,
                departmentId: departmentId,
                manufacturerId: manufacturerId,
                vendorId: vendorId,
                conditionId: conditionId,
                model: model,
                serialNumber: serialNumber,
                macAddress: macAddress,
                ipAddress: ipAddress,
                assetDetails: assetDetails,
                price: price,
                purchaseDate: purchaseDate,
                warantyPeriod: warantyPeriod,
                modifiedBy: 1,
            },
            { where: { id: id } }
        );

        const result = await Asset.findByPk(id);
        response(200, result, "Update " + title + " success", res);
    }
    static destroy = async (req, res) => {
        const { id } = req.params;
        const asset = await Asset.findByPk(id);
        if (!asset) {
            response(404, null, "" + title + " not found", res);
        }
        await Asset.update(
            {
                isDeleted: true,
                isActive: false,
                deletedBy: 1,
                deletedAt: new Date(),
                modifiedBy: 1
            },
            { where: { id: id } }
        );
        response(204, null, "Delete " + title + " success", res);
    }
    static getLastId = async (req, res) => {
        const result = await Asset.findAll(
            {
                order: [['id', 'DESC']],
                limit: 1,
                attributes: ['id']
            },
        );
        response(200, result, "Get last ID success", res);
    }
}
module.exports = AssetController