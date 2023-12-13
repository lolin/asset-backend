const { Department, Company } = require("../models");
const { Op } = require("sequelize");
class DepartmentController {
    static showAll = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await Department.count({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const data = await Department.findAll({
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
                    model: Company,
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
            message: "Get data Departments success",
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
            const data = await Department.findByPk(id);
            res.json({
                message: "Get data Departments success",
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
        const { name, companyId } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }
        if (!companyId) {
            return res.status(400).json({
                message: "Company is required"
            })
        }
        try {
            const newDepartment = await Department.create({
                name: name,
                companyId: companyId,
                createdBy: userId,
                modifiedBy: userId
            });
            res.status(201).json({
                message: "Create department success",
                data: newDepartment
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
        const { name, companyId } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }
        if (!companyId) {
            return res.status(400).json({
                message: "Company is required"
            })
        }
        const department = await Department.findByPk(id);
        if (!department) {
            return res.status(404).json({
                message: "Department not found"
            })
        }
        try {
            await Department.update(
                { name: name, companyId: companyId, modifiedBy: userId, },
                { where: { id: id } }
            );

            const departmentUpdate = await Department.findByPk(id);
            res.json({
                message: "Update department success",
                data: departmentUpdate
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
        const department = await Department.findByPk(id);
        if (!department) {
            return res.status(404).json({
                message: "Department not found"
            })
        }
        try {
            // await Department.update(
            //     {
            //         isDeleted: true,
            //         isActive: false,
            //         deletedBy: userId,
            //         deletedAt: new Date(),
            //         modifiedBy: userId
            //     },
            //     { where: { id: id } }
            // );
            await Department.destroy({
                where: {
                    id: id
                }
            });
            res.json({
                message: "Delete department success",
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
module.exports = DepartmentController