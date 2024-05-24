const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Bug = sequelize.define('Bug', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'open',
    },
});

module.exports = Bug;
