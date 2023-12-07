const { Asset, Department, Category, Brand, Vendor, Condition } = require("../models");
const { Op } = require("sequelize");
class AssetController {
    static showAll = async (req, res) => {
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
        const data = await Asset.findAll({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            },
            attributes: {
                exclude: ['createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
            },
            include: [
                {
                    model: Department,
                    attributes: {
                        exclude: ['isActive', 'isDeleted', 'createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
                    }
                },
                {
                    model: Category,
                    attributes: {
                        exclude: ['isActive', 'isDeleted', 'createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
                    }
                },
                {
                    model: Brand,
                    attributes: {
                        exclude: ['isActive', 'isDeleted', 'createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
                    }
                },
                {
                    model: Vendor,
                    attributes: {
                        exclude: ['isActive', 'isDeleted', 'createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
                    }
                },
                {
                    model: Condition,
                    attributes: {
                        exclude: ['isActive', 'isDeleted', 'createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
                    }
                }
            ],
            offset: offset,
            limit: limit,
            order: [
                ['name', 'ASC']
            ]
        });
        res.json({
            message: "Get data Assets success",
            data: data,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage
        })

    }
    static getDataById = async (req, res) => {
        const { id } = req.params
        try {
            const data = await Asset.findByPk(id);
            res.json({
                message: "Get data Assets success",
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
        const {
            name,
            categoryId,
            departmentId,
            brandId,
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
        try {
            const newAsset = await Asset.create({
                name: name,
                categoryId: categoryId,
                departmentId: departmentId,
                brandId: brandId,
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
                createdBy: 1,
                modifiedBy: 1
            });
            res.status(201).json({
                message: "Create asset success",
                data: newAsset
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
        const {
            name,
            categoryId,
            departmentId,
            brandId,
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
            return res.status(404).json({
                message: "Asset not found"
            })
        }
        try {
            const updateAsset = await Asset.update(
                {
                    name: name,
                    categoryId: categoryId,
                    departmentId: departmentId,
                    brandId: brandId,
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

            const assetUpdate = await Asset.findByPk(id);
            res.json({
                message: "Update asset success",
                data: assetUpdate
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
        const asset = await Asset.findByPk(id);
        if (!asset) {
            return res.status(404).json({
                message: "Asset not found"
            })
        }
        try {
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
            res.json({
                message: "Delete asset success",
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
module.exports = AssetController