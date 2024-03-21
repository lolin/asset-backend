'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmailList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EmailList.hasOne(models.Department, {
        foreignKey: 'id',
        sourceKey: 'departmentId'
      })
    }
  }
  EmailList.init({
    employeeName: DataTypes.STRING,
    departmentId: DataTypes.NUMBER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    modifiedBy: DataTypes.STRING
  }, {
    tableName: 'email_lists',
    sequelize,
    modelName: 'EmailList',
  });
  return EmailList;
};