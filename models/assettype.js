'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssetType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AssetType.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    modifiedBy: DataTypes.INTEGER
  }, {
    tableName: 'asset_types',
    sequelize,
    modelName: 'AssetType',
  });
  return AssetType;
};