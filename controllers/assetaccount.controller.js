const { AssetAccount } = require("../models");

class AssetAccountController {
    static showAll = async (req, res) => {
        try {
            const data = await AssetAccount.findAll({
                order: [
                    ['id', 'ASC']
                ],
                attributes: {
                    exclude: ['createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
                }
            });
            res.json({
                message: "Get data Asset Account success",
                data: data
            })
        } catch (error) {
            res.status(500).json({
                message: "Server error",
                serverMessage: error
            })
        }
    }
    static getDataById = async (req, res) => {
        const { id } = req.params
        try {
            const data = await AssetAccount.findByPk(id);
            res.json({
                message: "Get data Asset Account success",
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
        const { assetId, accountName, password } = req.body;
        try {
            const newAssetAccount = await AssetAccount.create({
                assetId: assetId,
                accountName: accountName,
                password: password,
                createdBy: userId,
                modifiedBy: userId
            });
            res.status(201).json({
                message: "Create Asset Account success",
                data: newAssetAccount
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
        const { assetId, accountName, password } = req.body;

        const remoteaccess = await AssetAccount.findByPk(id);

        if (!remoteaccess) {
            return res.status(404).json({
                message: "Asset Account not found"
            })
        }
        try {
            const updateAssetAccount = await AssetAccount.update(
                {
                    assetId: assetId,
                    accountName: accountName,
                    password: password,
                    modifiedBy: userId,
                },
                { where: { id: id } }
            );

            const AssetAccountUpdate = await AssetAccount.findByPk(id);
            res.json({
                message: "Update Asset Account success",
                data: AssetAccountUpdate
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
        // const { reason } = req.body;
        const AssetAccount = await AssetAccount.findByPk(id);
        if (!AssetAccount) {
            return res.status(404).json({
                message: "Asset Account not found"
            })
        }
        try {
            await AssetAccount.destroy({
                where: {
                    id: id
                }
            });
            res.json({
                message: "Delete Asset Account success",
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
module.exports = AssetAccountController