const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bug-tracker', 'postgres', 'ordnasela2001', {
    host: 'localhost',
    dialect: 'postgres',
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDB };
