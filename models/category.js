'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasOne(models.AssetType, {
        foreignKey: 'id',
        sourceKey: 'assetTypeId'
      })
    }
  }
  Category.init({
    name: DataTypes.STRING,
    assetTypeId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE,
    deletedBy: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    modifiedBy: DataTypes.INTEGER
  }, {
    tableName: 'categories',
    sequelize,
    modelName: 'Category',
  });
  return Category;
};