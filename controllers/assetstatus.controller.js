const { AssetStatus } = require("../models");
const { Op } = require("sequelize");
class AssetStatusController {

    static showAll = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await AssetStatus.count({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const data = await AssetStatus.findAll({
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
        res.json({
            message: "Get data AssetStatuss success",
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
            const data = await AssetStatus.findByPk(id);
            res.json({
                message: "Get data AssetStatuss success",
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
        const userId = req.userData.id
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }
        try {
            const newAssetStatus = await AssetStatus.create({
                name: name,
                description: description,
                createdBy: userId,
                modifiedBy: userId
            });
            res.status(201).json({
                message: "Create Asset Status success",
                data: newAssetStatus
            })
        } catch (error) {
            res.status(500).json({
                message: "Server error",
                serverMessage: error
            })
        }
    }
    static update = async (req, res) => {
        const userId = req.userData.id
        const { id } = req.params;
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }
        const data = await AssetStatus.findByPk(id);
        if (!data) {
            return res.status(404).json({
                message: "Asset Status not found"
            })
        }
        try {
            const updateAssetStatus = await AssetStatus.update(
                { name: name, description: description, modifiedBy: userId, },
                { where: { id: id } }
            );

            const AssetStatusUpdate = await AssetStatus.findByPk(id);
            res.json({
                message: "Update AssetStatus success",
                data: AssetStatusUpdate
            })
        } catch (error) {
            res.status(500).json({
                message: "Server error",
                serverMessage: error
            })
        }
    }
    static destroy = async (req, res) => {
        const userId = req.userData.id
        const { id } = req.params;
        const AssetStatus = await AssetStatus.findByPk(id);
        if (!AssetStatus) {
            return res.status(404).json({
                message: "AssetStatus not found"
            })
        }
        try {
            await AssetStatus.destroy({
                where: {
                    id: id
                }
            });
            // await AssetStatus.update(
            //     {
            //         isDeleted: true,
            //         isActive: false,
            //         deletedBy: userId,
            //         deletedAt: new Date(),
            //         modifiedBy: userId
            //     },
            //     { where: { id: id } }
            // );
            res.json({
                message: "Delete AssetStatus success",
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
module.exports = AssetStatusController