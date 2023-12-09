'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomField extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CustomField.init({
    fieldSetId: DataTypes.INTEGER,
    fieldName: DataTypes.STRING,
    fieldType: DataTypes.STRING,
    fieldValue: DataTypes.STRING,
    fieldFormat: DataTypes.STRING,
    helperText: DataTypes.STRING
  }, {
    tableName: 'custom_fields',
    sequelize,
    modelName: 'CustomField',
  });
  return CustomField;
};