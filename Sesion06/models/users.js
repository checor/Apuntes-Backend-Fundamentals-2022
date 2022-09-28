const crypto = require('crypto');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        unique: true,
        validate: {
            isLowercase: true,
            is: /^[a-zA-Z0-9_-]+$/
        }
    },
    name: {
        type: DataTypes.CHAR(64),
        allowNull: false
    },
    surname: {
        type: DataTypes.CHAR(128),
        allowNull: false
    },
    email: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password_hash: {
        type: DataTypes.CHAR(64),
        allowNull: true,
    },
    password_salt: {
        type: DataTypes.CHAR(64),
        allowNull: true,
    },
    tarjeta: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        validate: {
            isCreditCard: true
        }
    },
    tipo_tarjeta: {type: DataTypes.CHAR(64) }
});

User.createPassword = function(plainText) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(plainText, salt, 10000, 512, "sha512")
        .toString("hex");
    return {salt: salt, hash: hash}
}

User.validatePassword = function(password, user_salt, user_hash) {
    const hash = crypto
        .pbkdf2Sync(password, user_salt, 10000, 512, "sha512")
        .toString("hex");
    return user_hash === hash;
}

module.exports = User;
