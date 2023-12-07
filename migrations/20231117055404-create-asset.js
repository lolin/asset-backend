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
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
        },
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
      brandId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'brands',
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
      conditionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'conditions',
          key: 'id'
        },
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING
      },
      serialNumber: {
        type: Sequelize.STRING,
      },
      macAddress: {
        type: Sequelize.STRING,
      },
      ipAddress: {
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
        allowNull: true
      },
      deletedReason: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      modifiedBy: {
        type: Sequelize.INTEGER
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