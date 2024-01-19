require('dotenv').config();
const { dbUrl } = require('../config/config.js')
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(dbUrl)
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
module.exports = sequelize