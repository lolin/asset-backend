'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      departmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'departments',
          key: 'id'
        },
        allowNull: false,
      },
      assetModelId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'asset_models',
          key: 'id'
        },
        allowNull: false,
      },
      vendorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'vendors',
          key: 'id'
        }
      },
      assetStatusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'asset_statuses',
          key: 'id'
        },
        allowNull: false,
      },
      conditionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'conditions',
          key: 'id'
        },
        allowNull: false,
      },
      serialNumber: {
        type: Sequelize.STRING,
      },
      macAddress: {
        type: Sequelize.STRING,
      },
      assetDetails: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DOUBLE,
      },
      purchaseDate: {
        type: Sequelize.DATE,
      },
      warantyPeriod: {
        type: Sequelize.DATE,
      },
      isDecomissioned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      decommissionedDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      decommissionedReason: {
        type: Sequelize.STRING,
        allowNull: true
      },
      decommissionedBy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deletedBy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      deletedReason: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdBy: {
        type: Sequelize.STRING
      },
      modifiedBy: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('assets');
  }
};