const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('catalog_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
