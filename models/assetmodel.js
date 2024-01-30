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
      AssetModel.hasOne(models.Manufacturer, {
        foreignKey: 'id',
        sourceKey: 'manufacturerId'
      })

      AssetModel.hasOne(models.Category, {
        foreignKey: 'id',
        sourceKey: 'categoryId'
      })

      AssetModel.hasOne(models.FieldSet, {
        foreignKey: 'id',
        sourceKey: 'fieldSetId'
      })

      AssetModel.hasOne(models.Depreciation, {
        foreignKey: 'id',
        sourceKey: 'depreciationId'
      })

    }
  }
  AssetModel.init({
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    modelNumber: DataTypes.STRING,
    manufacturerId: DataTypes.NUMBER,
    categoryId: DataTypes.NUMBER,
    fieldSetId: DataTypes.NUMBER,
    depreciationId: DataTypes.NUMBER,
    notes: DataTypes.STRING
  }, {
    tableName: 'asset_models',
    sequelize,
    modelName: 'AssetModel',
  });
  return AssetModel;
};