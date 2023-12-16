'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FieldSet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FieldSet.hasOne(models.AssetModel, {
        foreignKey: 'fieldSetId',
        sourceKey: 'id'
      })
    }
  }
  FieldSet.init({
    name: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    modifiedBy: DataTypes.INTEGER
  }, {
    tableName: 'field_sets',
    sequelize,
    modelName: 'FieldSet',
  });
  return FieldSet;
};