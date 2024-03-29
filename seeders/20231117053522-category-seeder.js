'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('categories', [{
      name: 'Laptop',
      assetTypeId: 1,
      createdBy: 'Putu Indrayana',
      modifiedBy: 'Putu Indrayana',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PC',
      assetTypeId: 1,
      createdBy: 'Putu Indrayana',
      modifiedBy: 'Putu Indrayana',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Monitor',
      assetTypeId: 1,
      createdBy: 'Putu Indrayana',
      modifiedBy: 'Putu Indrayana',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
