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
      createdBy: 1,
      modifiedBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PC',
      createdBy: 1,
      modifiedBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Monitor',
      createdBy: 1,
      modifiedBy: 1,
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
