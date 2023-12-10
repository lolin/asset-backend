const { Depreciation } = require("../models");
const { Op } = require("sequelize");
class DepreciationController {
    static showAll = async (req, res) => {
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
        const data = await Depreciation.findAll({
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

        res.json({
            message: "Get data Depreciations success",
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
            const data = await Depreciation.findByPk(id);
            res.json({
                message: "Get data Depreciations success",
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
        const { name, term, floorValue } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }

        try {
            const newDepreciation = await Depreciation.create({
                name: name,
                term: term,
                floorValue: floorValue,
                createdBy: 1,
                modifiedBy: 1
            });
            res.status(201).json({
                message: "Create Depreciation success",
                data: newDepreciation
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
        const { name, term, floorValue } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }

        const depresiasi = await Depreciation.findByPk(id);
        if (!depresiasi) {
            return res.status(404).json({
                message: "Depreciation not found"
            })
        }
        try {
            await Depreciation.update(
                { name: name, term: term, floorValue: floorValue, modifiedBy: 1, },
                { where: { id: id } }
            );

            const DepreciationUpdate = await Depreciation.findByPk(id);
            res.json({
                message: "Update Depreciation success",
                data: DepreciationUpdate
            })
        } catch (error) {
            res.status(500).json({
                message: "Server error",
                serverMessage: error
            })
        }
    }
    static destroy = async (req, res) => {
        console.log("depresaisi: ", req.params)
        const { id } = req.params;
        const depresiasi = await Depreciation.findByPk(id);
        if (!depresiasi) {
            return res.status(404).json({
                message: "Depreciation not found"
            })
        }
        try {
            // await Depreciation.update(
            //     {
            //         isDeleted: true,
            //         isActive: false,
            //         deletedBy: 1,
            //         deletedAt: new Date(),
            //         modifiedBy: 1
            //     },
            //     { where: { id: id } }
            // );
            await Depreciation.destroy({
                where: {
                    id: id
                }
            });
            res.json({
                message: "Delete Depreciation success",
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
module.exports = DepreciationController