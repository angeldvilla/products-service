const sequelize = require('./config/db');
const Product = require('./models/Product');
const Category = require('./models/category');

sequelize.sync({ force: true })
    .then(() => {
        console.log("Base de datos sincronizada correctamente!");
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos:', err);
    });