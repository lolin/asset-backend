const { Asset, Company, Department, CustomField, Category, AssetStatus, Manufacturer, Vendor, Condition, AssetModel, AssetHasCustomField } = require("../models");
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
                    },
                },
                {
                    model: AssetModel,
                    attributes: {
                        exclude: excludeData
                    },
                    include: [{
                        model: Category,
                        attributes: {
                            exclude: excludeData
                        }
                    }],
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
                },
                {
                    model: AssetStatus,
                    attributes: {
                        exclude: excludeData
                    }
                },
                {
                    model: AssetHasCustomField,
                    attributes: {
                        include: ['id', 'customFieldId', 'customFieldValue', 'assetId'],
                        exclude: ['isActive', 'isDeleted', 'createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
                    },
                    include: [
                        {
                            model: CustomField,
                            attributes: {
                                include: ['fieldName'],
                                exclude: ['isActive', 'isDeleted', 'createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
                            }
                        }
                    ]
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
                    model: AssetModel,
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
            ],
            order: [
                ['name', 'ASC']
            ]
        });
        response(200, result, "Get data " + title + " success", res);
    }
    static getDataById = async (req, res) => {
        const { id } = req.params
        const result = await Asset.findByPk(id, {
            attributes: {
                exclude: excludeData2
            },
            include: [
                {
                    model: Department,
                    attributes: {
                        exclude: excludeData
                    },
                    include: [{
                        model: Company,
                        attributes: {
                            exclude: excludeData
                        }
                    }]
                },
                {
                    model: AssetModel,
                    attributes: {
                        exclude: excludeData
                    },
                    include: [{
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
                    ],
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
                },
                {
                    model: AssetStatus,
                    attributes: {
                        exclude: excludeData
                    }
                },
                {
                    model: AssetHasCustomField,
                    attributes: {
                        include: ['id', 'customFieldId', 'customFieldValue', 'assetId'],
                        exclude: ['isActive', 'isDeleted', 'createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
                    },
                    include: [
                        {
                            model: CustomField,
                            attributes: {
                                include: ['fieldName'],
                                exclude: ['isActive', 'isDeleted', 'createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
                            }
                        }
                    ]
                }
            ],
        });
        response(200, result, "Get data " + title + " success", res);
    }
    static store = async (req, res) => {
        const userName = req.userData.name
        const {
            name,
            departmentId,
            assetModelId,
            vendorId,
            assetStatusId,
            assetConditionId,
            serialNumber,
            macAddress,
            assetDetails,
            price,
            purchaseDate,
            warantyPeriod,
            customFields

        } = req.body;
        const result = await Asset.create({
            name: name,
            departmentId: departmentId,
            vendorId: vendorId,
            assetModelId: assetModelId,
            assetStatusId: assetStatusId,
            conditionId: assetConditionId,
            serialNumber: serialNumber,
            macAddress: macAddress,
            assetDetails: assetDetails,
            price: price,
            purchaseDate: purchaseDate,
            warantyPeriod: warantyPeriod,
            createdBy: userName,
            modifiedBy: userName
        });
        if (result) {
            customFields.length > 0 && customFields.map(async (item) => {
                await AssetHasCustomField.create({
                    assetId: result.dataValues.id,
                    customFieldId: item.fieldId,
                    customFieldValue: item.inputValue,
                    createdBy: userName,
                    modifiedBy: userName
                })
            })
        }
        response(201, result, "Create " + title + " success", res);
    }
    static update = async (req, res) => {

        const { id } = req.params;
        const userName = req.userData.name
        const {
            departmentId,
            assetModelId,
            vendorId,
            assetStatusId,
            assetConditionId,
            serialNumber,
            macAddress,
            assetDetails,
            price,
            purchaseDate,
            warantyPeriod,
            customFields
        } = req.body;

        const asset = await Asset.findByPk(id);
        if (!asset) {
            response(404, null, "" + title + " not found", res);
        }
        await Asset.update(
            {
                departmentId: departmentId,
                vendorId: vendorId,
                assetModelId: assetModelId,
                assetStatusId: assetStatusId,
                conditionId: assetConditionId,
                serialNumber: serialNumber,
                macAddress: macAddress,
                assetDetails: assetDetails,
                price: price,
                purchaseDate: purchaseDate,
                warantyPeriod: warantyPeriod,
                modifiedBy: userName
            },
            { where: { id: id } }
        );
        customFields.length > 0 && customFields.map(async (item) => {
            await AssetHasCustomField.update({
                customFieldValue: item.inputValue,
                modifiedBy: userName
            }, {
                where: {
                    assetId: id,
                    customFieldId: item.fieldId
                }
            })
        })

        const result = await Asset.findByPk(id);
        response(200, result, "Update " + title + " success", res);
    }
    static destroy = async (req, res) => {
        const userName = req.userData.name
        const { id } = req.params;
        const asset = await Asset.findByPk(id);
        if (!asset) {
            response(404, null, "" + title + " not found", res);
        }
        // await Asset.update(
        //     {
        //         isDeleted: true,
        //         isActive: false,
        //         deletedBy: userName,
        //         deletedAt: new Date(),
        //         modifiedBy: userName
        //     },
        //     { where: { id: id } }
        // );
        await Asset.destroy({
            where: {
                id: id
            }
        });
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