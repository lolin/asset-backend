const { Brand } = require("../models");
const { Op } = require("sequelize");
class BrandController {
    static showAll = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await Brand.count({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await Brand.findAll({
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
            message: "Get data Brands success",
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
            const data = await Brand.findByPk(id);
            res.json({
                message: "Get data Brands success",
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
            const newBrand = await Brand.create({
                name: name,
                createdBy: 1,
                modifiedBy: 1
            });
            res.status(201).json({
                message: "Create brand success",
                data: newBrand
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
        const brand = await Brand.findByPk(id);
        if (!brand) {
            return res.status(404).json({
                message: "Brand not found"
            })
        }
        try {
            const updateBrand = await Brand.update(
                { name: name, modifiedBy: 1, },
                { where: { id: id } }
            );

            const brandUpdate = await Brand.findByPk(id);
            res.json({
                message: "Update brand success",
                data: brandUpdate
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
        const brand = await Brand.findByPk(id);
        if (!brand) {
            return res.status(404).json({
                message: "Brand not found"
            })
        }
        // console.log(brand)
        try {
            // hapus langsung
            await Brand.destroy({
                where: {
                    id: id
                }
            });
            // await Brand.update(
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
                message: "Delete brand success",
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
module.exports = BrandController