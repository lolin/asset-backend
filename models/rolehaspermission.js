'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleHasPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RoleHasPermission.init({
    roleId: DataTypes.NUMBER,
    permissionId: DataTypes.NUMBER
  }, {
    tableName: 'roles_has_permissions',
    sequelize,
    modelName: 'RoleHasPermission',
  });
  return RoleHasPermission;
};