'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssetAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AssetAccount.hasOne(models.Asset, {
        foreignKey: 'id',
        sourceKey: 'assetId'
      })
    }
  }
  AssetAccount.init({
    assetId: DataTypes.INTEGER,
    accountName: DataTypes.STRING,
    password: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    modifiedBy: DataTypes.STRING
  }, {
    tableName: 'asset_accounts',
    sequelize,
    modelName: 'AssetAccount',
  });
  return AssetAccount;
};