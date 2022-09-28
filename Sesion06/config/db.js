const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sqlite://db.sqlite');

module.exports = sequelize;