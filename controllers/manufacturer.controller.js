const { Manufacturer } = require("../models");
const { Op } = require("sequelize");
class ManufacturerController {
    static showAll = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await Manufacturer.count({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await Manufacturer.findAll({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            },
            offset: offset,
            limit: limit,
            order: [
                ['name', 'ASC']
            ]
        });
        res.json({
            message: "Get data Manufacturers success",
            data: result,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage
        });
    }
    static getDataById = async (req, res) => {
        const { id } = req.params
        try {
            const data = await Manufacturer.findByPk(id);
            res.json({
                message: "Get data Manufacturers success",
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
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }
        try {
            const newManufacturer = await Manufacturer.create({
                name: name,
                createdBy: 1,
                modifiedBy: 1
            });
            res.status(201).json({
                message: "Create Manufacturer success",
                data: newManufacturer
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
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }
        const Manufacturer = await Manufacturer.findByPk(id);
        if (!Manufacturer) {
            return res.status(404).json({
                message: "Manufacturer not found"
            })
        }
        try {
            const updateManufacturer = await Manufacturer.update(
                { name: name, modifiedBy: 1, },
                { where: { id: id } }
            );

            const ManufacturerUpdate = await Manufacturer.findByPk(id);
            res.json({
                message: "Update Manufacturer success",
                data: ManufacturerUpdate
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
        const Manufacturer = await Manufacturer.findByPk(id);
        if (!Manufacturer) {
            return res.status(404).json({
                message: "Manufacturer not found"
            })
        }
        // console.log(Manufacturer)
        try {
            // hapus langsung
            await Manufacturer.destroy({
                where: {
                    id: id
                }
            });
            // await Manufacturer.update(
            //     {
            //         isDeleted: true,
            //         isActive: false,
            //         deletedBy: 1,
            //         deletedAt: new Date(),
            //         modifiedBy: 1
            //     },
            //     { where: { id: id } }
            // );
            res.json({
                message: "Delete Manufacturer success",
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
module.exports = ManufacturerController