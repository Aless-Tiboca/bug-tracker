const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Verifier = sequelize.define('Verifier', {
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

module.exports = Verifier;
