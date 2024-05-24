const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Programmer = sequelize.define('Programmer', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

module.exports = Programmer;
