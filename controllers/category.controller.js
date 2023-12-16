const { Category, AssetType } = require("../models");
const { Op } = require("sequelize");
class CategoryController {
    static showAll = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await Category.count({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await Category.findAll({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            },
            include: [
                {
                    model: AssetType,
                    attributes: {
                        exclude: ['createdBy', 'modifiedBy', 'createdAt', 'updatedAt']
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
            message: "Get data Categorys success",
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
            const data = await Category.findByPk(id);
            res.json({
                message: "Get data categories success",
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
        const { name, assetTypeId } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }
        try {
            const newCategory = await Category.create(
                {
                    name: name,
                    assetTypeId: assetTypeId,
                    createdBy: userId,
                    modifiedBy: userId
                }
            );
            res.status(201).json({
                message: "Create category success",
                data: newCategory
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
        const { name, assetTypeId } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        }
        try {
            await Category.update({ name: name, assetTypeId: assetTypeId, modifiedBy: userId },
                { where: { id: id } }
            );

            const categoryUpdate = await Category.findByPk(id);
            res.json({
                message: "Update category success",
                data: categoryUpdate
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
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        }
        try {
            // await Category.update(
            //     {
            //         isDeleted: true,
            //         isActive: false,
            //         deletedBy: userId,
            //         deletedAt: new Date(),
            //         modifiedBy: userId
            //     },
            //     { where: { id: id } }
            // );
            await Category.destroy({
                where: {
                    id: id
                }
            });
            res.json({
                message: "Delete category success",
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
module.exports = CategoryController