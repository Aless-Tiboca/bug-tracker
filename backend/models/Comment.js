const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Bug = require('./Bug');

const Comment = sequelize.define('Comment', {
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bugId: {
        type: DataTypes.INTEGER,
        references: {
            model: Bug,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Bug.hasMany(Comment, { foreignKey: 'bugId', onDelete: 'CASCADE' });
Comment.belongsTo(Bug, { foreignKey: 'bugId' });

module.exports = Comment;
