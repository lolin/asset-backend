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
    await queryInterface.bulkInsert('vendors', [
      {
        name: 'Blessing',
        phone: '098765',
        email: 'test@email.com',
        address: 'denpasar',
        website: 'blessing.com',
        onlineShop: 'http://tokopedia.com/blessing',
        picName: 'wayan',
        picPhone: '098765',
        picEmail: 'test@email.com',
        createdBy: 'Putu Indrayana',
        modifiedBy: 'Putu Indrayana',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
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
