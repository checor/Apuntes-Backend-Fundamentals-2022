const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const God = require('./gods');

const Realm = sequelize.define('Realm', {
    name: {
        type: DataTypes.CHAR(64)
    },
    description: {
        type: DataTypes.TEXT
    }
});

//Ralcion 1 a muchos
Realm.hasMany(God);
God.belongsTo(Realm);

module.exports = Realm;
