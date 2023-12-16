const { Company, Department } = require("../models");
const { Op } = require("sequelize");
class CompanyController {

    static showAll = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await Company.count({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const data = await Company.findAll({
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
            include: [
                {
                    model: Department,
                    attributes: {
                        exclude: ['createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
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
            message: "Get data Companys success",
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
            const data = await Company.findByPk(id);
            res.json({
                message: "Get data Companys success",
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
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }
        try {
            const newCompany = await Company.create({
                name: name,
                createdBy: userId,
                modifiedBy: userId
            });
            res.status(201).json({
                message: "Create company success",
                data: newCompany
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
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }
        const data = await Company.findByPk(id);
        if (!data) {
            return res.status(404).json({
                message: "Company not found"
            })
        }
        try {
            const updateCompany = await Company.update(
                { name: name, modifiedBy: userId, },
                { where: { id: id } }
            );

            const companyUpdate = await Company.findByPk(id);
            res.json({
                message: "Update company success",
                data: companyUpdate
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
        const company = await Company.findByPk(id);
        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            })
        }
        try {
            await Company.destroy({
                where: {
                    id: id
                }
            });
            // await Company.update(
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
                message: "Delete company success",
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
module.exports = CompanyController