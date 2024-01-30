'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssetHasCustomField extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AssetHasCustomField.hasOne(models.Asset, {
        foreignKey: 'id',
        sourceKey: 'assetId'
      })
      AssetHasCustomField.hasOne(models.CustomField, {
        foreignKey: 'id',
        sourceKey: 'customFieldId'
      })
    }
  }
  AssetHasCustomField.init({
    assetId: {
      type: DataTypes.NUMBER,
      references: {
        model: 'asset',
        key: 'id'
      }
    },
    customFieldId: {
      type: DataTypes.NUMBER,
      references: {
        model: 'custom_field',
        key: 'id'
      }
    },
    customFieldValue: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    modifiedBy: DataTypes.STRING
  }, {
    tableName: 'asset_has_custom_fields',
    sequelize,
    modelName: 'AssetHasCustomField',
  });
  return AssetHasCustomField;
};