'use strict';
const bcrypt = require('bcrypt');
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

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('hanoman44', salt);
    await queryInterface.bulkInsert('users', [
      {
        name: 'Putu Indrayana',
        email: 'putu.lolin@gmail.com',
        password: hash,
        createdBy: 'Putu Indrayana',
        modifiedBy: 'Putu Indrayana',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  }
};
