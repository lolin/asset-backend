'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssetModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AssetModel.init({
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    modelNumber: DataTypes.STRING,
    manufaturerId: DataTypes.NUMBER,
    categoryId: DataTypes.NUMBER,
    fieldSetId: DataTypes.NUMBER,
    depreciationId: DataTypes.NUMBER,
    eol: DataTypes.NUMBER,
    notes: DataTypes.STRING
  }, {
    tableName: 'asset_models',
    sequelize,
    modelName: 'AssetModel',
  });
  return AssetModel;
};